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
        try:
            if len(data) > 0:
                self.ncidWriter.write(data.encode()) # send to NCID server
                self.connector.log(data.strip())
        except:
            self.connector.log('Failed to get write')
            self.connect()

    async def close(self) -> None:
        if self.ncidWriter:
            self.connector.log('Closing connection to NCID server...')
            self.ncidWriter.close()
            await self.ncidWriter.wait_closed()
            self.connector.log('Connection to NCID server is closed')
        self.ncidReader = None
        self.ncidWriter = None

    # listen for NCID messages
    async def handler(self) -> None:
        while True:
            try:
                if not self.ncidReader:
                    await asyncio.sleep(1)
                    continue;

                data = await self.ncidReader.readline()
                text = data.decode().strip()
                if text == "":
                    await asyncio.sleep(1)
                    continue;
                    #await self.connect()
                else:
                    # convert to a json object
                    items = text.split('*')
                    keys = items[1::2]
                    values = items[2::2]
                    info = dict(zip(keys,values))

                    await self.connector.webSock_publish(items[0].strip(), info)
            except KeyboardInterrupt:
                raise
            except: 
                self.connector.log('ncidHandler', sys.exc_info())
                await self.connect()
