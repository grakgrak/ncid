import asyncio
import sys
import time
from connector import Connector

class InfoFilter:
    def __init__(self) -> None:
        self.gettingInfo = False
        self.info_data = []
        self.cache = {}

    def requestByKey(self, key: str) -> str:
        self.cache[key] = "unknown"
        return 'REQ: INFO ' + key + '\n';

    def request(self, nmbr: str, name: str) -> str:
        return self.requestByKey(nmbr + '&&' + name)

    def query(self, nmbr: str, name: str) -> str:
        key = nmbr + '&&' + name
        if key not in self.cache:
            self.cache[key] = "request"
        return self.cache[key]

    def filter(self, msgType: str, info: dict) -> bool:
        if msgType == "403 Start of data defining permitted requests":
            self.gettingInfo = True
            self.info_data = []
            return False

        if msgType == "411 End of response":
            self.gettingInfo = False

            key = self.info_data[2]
            self.cache[key[5:]] = self.info_data[1]

            return False

        if self.gettingInfo:
            if msgType.startswith("INFO:"):
                self.info_data.append(msgType[6:])
                return False

        return True;



class NCID:
    def __init__(self, connector: Connector, server_addr: str, server_port: int) -> None:
        self.SERVER = server_addr
        self.PORT = server_port
        self.connector = connector
        self.ncidWriter = None
        self.ncidReader = None
        self.info_filter = InfoFilter()
        self.writeQ = asyncio.Queue()
        self.lastReadTime = time.time()

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
            # await self.ncidWriter.wait_closed()
            self.connector.log('Connection to NCID server is closed')
        self.ncidReader = None
        self.ncidWriter = None

    def blacklist(self, nmbr: str) -> None:
        self.write('REQ: black add "' + nmbr + '" ""\n')

    async def info(self, nmbr: str, name: str) -> str:
        for x in range(4):
            status = self.info_filter.query(nmbr, name)
            if status == "request":
                self.write(self.info_filter.request(nmbr, name));
            elif status == "unknown":
                await asyncio.sleep(0.5)
            else:
                return status
        else:
            return "unknown"

    def reload(self) -> None:
        self.info_filter.cache.clear()
        self.write("REQ: RELOAD\n")

    async def _process_data(self, text: str) -> None:
        # print(text)
        items = text.split('*') # break into a list of items
        msgType = items[0].strip() # msgType is used as the Topic
        if msgType == "":
            raise ValueError("Message Type is missing: " + text)

        info = dict(zip(items[1::2], items[2::2])) # build the info dictionary

        # filter out the INFO data
        if self.info_filter.filter(msgType, info):
            info["ID"] = hash(str(info)) # add a unique ID to the NCID data
            if "NMBR" in info and "NAME" in info:
                info["status"] = self.info_filter.query(info["NMBR"], info["NAME"])
            await self.connector.webSock_publish(msgType, info)


    # task to listen for NCID messages
    async def _handler(self) -> None:
        while True:
            try:
                if not self.ncidReader:
                    await asyncio.sleep(1)
                    continue;

                data = await self.ncidReader.readline()
                if data == "":
                    await asyncio.sleep(1)
                    continue;

                self.lastReadTime = time.time()
                await self._process_data(data.decode().strip())
            except KeyboardInterrupt:
                raise
            except asyncio.CancelledError:
                raise
            except: 
                self.connector.log('ncid_handler', sys.exc_info())
                await self.connect()

    # task to write to the NCID server
    async def _writer(self) -> None:
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
                self.connector.log('ncid_writer', sys.exc_info())
                await self.connect()

    # task to write to the NCID server
    async def _info_check(self) -> None:
        while True:
            try:
                await asyncio.sleep(1)

                # wait for 1 second then add all the requests
                if time.time() - self.lastReadTime > 1:
                    for k, v in self.info_filter.cache.items():
                        if v == "request":
                            self.write(self.info_filter.requestByKey(k))

            except KeyboardInterrupt:
                raise
            except:
                self.connector.log('ncid_info_check', sys.exc_info())
                await self.connect()

    # dictionary of named tasks to be added to the main loop
    def tasks(self) -> dict[str, asyncio.Future]:
        return {
            'ncid_listener': self._handler(), 
            'ncid_writer': self._writer(),
            'ncid_info': self._info_check()
        };