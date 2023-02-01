import aiohttp
import json
import re
from aiohttp import web
from connector import Connector

class WebSock:
    def __init__(self, connector: Connector) -> None:
        self.CONNECTIONS = set()
        self.connector = connector

    async def handler(self, request) -> None:
        self.connector.log('websocket connection opened')
        ws = web.WebSocketResponse()
        self.CONNECTIONS.add(ws)
        await ws.prepare(request)

        if len(self.CONNECTIONS) == 1:
            await self.connector.ncid_connect()

        try:
            async for msg in ws:
                if msg.type == aiohttp.WSMsgType.TEXT:
                    if msg.data == 'close':
                        await ws.close()
                    else:
                        self.connector.ncid_write(msg.data) # send a command to the NCID server

                elif msg.type == aiohttp.WSMsgType.ERROR:
                    self.connector.log('ws connection closed with exception %s' %
                        ws.exception())
        finally:
            self.connector.log('websocket connection closed')
            self.CONNECTIONS.remove(ws)
            if len(self.CONNECTIONS) == 0:
                await self.connector.ncid_close()

    async def publish(self, topic: str, info: dict):
        # reformat the date and time fields
        if "DATE" in info:
            m = re.match(r"(\d{2})(\d{2})(\d{4})", info["DATE"])
            info["DATE"] = m.group(3) + '-' + m.group(2) + '-' + m.group(1)

        if "TIME" in info:
            t = info["TIME"]
            if len(t) == 4:
                info["TIME"] = t[:2] + ':' + t[2:4]

        info["Topic"] = topic

        message = json.dumps(info).strip() # convert to json
        try:
            for ws in self.CONNECTIONS:
                await ws.send_str(message)

            if topic != "Timestamp":
                self.connector.log(message)
        except:
            pass
