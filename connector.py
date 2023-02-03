import asyncio
import time

class Connector():
    def init(self, webSock, ncid):
        self.webSock = webSock
        self.ncid = ncid
    
    # utility functions
    def log(self, *args) -> None:
        timestamp = time.strftime('%H:%M:%S')
        print(timestamp, *args)

    # WebSock functions
    def webSock_publish(self, topic, info) -> asyncio.Future:
        return self.webSock.publish(topic, info)
    
    # ncid functions
    def ncid_close(self) -> asyncio.Future:
        return self.ncid.close()

    def ncid_connect(self) -> asyncio.Future:
        return self.ncid.connect()

    def ncid_write(self, data: str) -> None:
        self.ncid.write(data)

