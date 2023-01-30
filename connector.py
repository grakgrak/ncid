import asyncio
import time

class Connector():
    def init(self, webSock, ncid):
        self.webSock = webSock
        self.ncid = ncid
    
    def webSock_publish(self, topic, info) -> asyncio.Future:
        return self.webSock.publish(topic, info)
    
    def webSock_handler(self, request) -> asyncio.Future:
        return self.webSock.handler(request)

    def ncid_close(self) -> asyncio.Future:
        return self.ncid.close()

    def ncid_connect(self) -> asyncio.Future:
        return self.ncid.connect()

    def ncid_write(self, data: str) -> None:
        self.ncid.write(data)
    
    def ncid_info(self, nmbr: str, name: str) -> None:
        self.ncid.info(nmbr, name)

    def ncid_tasks(self) -> dict[str, asyncio.Future]:
        return self.ncid.tasks()
    
    def log(self, *args) -> None:
        timestamp = time.strftime('%H:%M:%S')
        print(timestamp, *args)

