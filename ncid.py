import asyncio
import sys
from connector import Connector

class NCID:
    def __init__(self, connector: Connector, server_addr: str, server_port: int) -> None:
        self.SERVER = server_addr
        self.PORT = server_port
        self.connector = connector
        self.ncidWriter = None
        self.ncidReader = None
        self.gettingInfo = False
        self.writeQ = asyncio.Queue()

    async def connect(self) -> None:
        await self.close()
        while True:
            try:
                await self.connector.webSock_publish('ncid connecting', {})
                self.connector.log('Connecting to NCID server...')
                self.ncidReader, self.ncidWriter = await asyncio.open_connection(self.SERVER, self.PORT)
                self.connector.log('Connected to NCID server')
                await asyncio.sleep(1)
                await self.connector.webSock_publish('ncid connected', {})
                return
            except:
                self.connector.log('Failed to get connection')
                await self.connector.webSock_publish('ncid connection failed', {})
                await asyncio.sleep(5)

    def write(self, data):
        if len(data) > 0:
            self.writeQ.put_nowait(data)

    async def close(self) -> None:
        if self.ncidWriter:
            self.connector.log('Closing connection to NCID server...')
            self.ncidWriter.close()
            await self.ncidWriter.wait_closed()
            self.connector.log('Connection to NCID server is closed')
        self.ncidReader = None
        self.ncidWriter = None

    def info(self, nmbr: str, name: str):
        self.gettingInfo = True
        self.write('REQ: INFO ' + nmbr + '&&' + name + '\n');

    async def filter_data(self, msgType: str, info: dict) -> bool:
        if msgType == "403 Start of data defining permitted requests":
            self.gettingInfo = True 
            return False
        if msgType == "411 End of response":
            self.gettingInfo = False 
            return False
        return True

    async def process_data(self, text: str):
        # convert to a dictionary
        items = text.split('*') # break into a list of items
        msgType = items[0].strip()
        if msgType == "":
            raise ValueError("Message Type is missing: " + text)

        info = dict(zip(items[1::2], items[2::2]))
        if await self.filter_data(msgType, info):
            await self.connector.webSock_publish(msgType, info)

    # listen for NCID messages
    async def handler(self) -> None:
        while True:
            try:
                if not self.ncidReader:
                    await asyncio.sleep(1)
                    continue;

                data = await self.ncidReader.readline()
                if data == "":
                    await asyncio.sleep(1)
                    continue;

                await self.process_data(data.decode().strip())
            except KeyboardInterrupt:
                raise
            except: 
                self.connector.log('ncidHandler', sys.exc_info())
                await self.connect()

    # write to the NCID server
    async def writer(self) -> None:
        while True:
            try:
                if self.ncidWriter != None:
                    data = await self.writeQ.get()
                    self.ncidWriter.write(data.encode()) # send to NCID server
                    self.connector.log(data.strip())
                else:
                    await asyncio.sleep(1)
            except KeyboardInterrupt:
                raise
            except:
                self.connector.log('Failed to get write')
                await self.connect()

    def tasks(self) -> dict[str, asyncio.Future]:
        return {'ncid_listener': self.handler(), 'ncid_writer': self.writer()};