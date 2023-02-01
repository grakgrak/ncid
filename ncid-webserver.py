import asyncio
import time

from aiohttp import web
from connector import Connector
from ncid import NCID
from websock import WebSock


NCID_SERVER = "192.168.1.231"
NCID_PORT = 3333

active_tasks = set()
connector = Connector()
connector.init(WebSock(connector), NCID(connector, NCID_SERVER, NCID_PORT))


async def timestamp() -> None:
    while True:
        timestamp = {
            'timestamp': time.asctime(),
            'uptime': time.process_time()
        }
        await connector.webSock_publish( "Timestamp", timestamp)
        await asyncio.sleep(1)


async def index(request) -> None:
    raise web.HTTPFound(location = '/index.html')


async def info(request):
    status = await connector.ncid_info(request.match_info['nmbr'], request.match_info['name']);
    print('info status: ' + status)
    return web.Response(text='ok info ' + status)


async def app_main():
    # add in the tasks
    active_tasks.add(asyncio.create_task(timestamp(), name='timestamp'))
    for k, v in connector.ncid_tasks().items():
        active_tasks.add(asyncio.create_task(v, name=k))

    app = web.Application()

    # setup the routing
    app.router.add_get('/', index)
    app.router.add_get('/info/{name}/{nmbr}', info)
    app.router.add_get('/ws', connector.webSock_handler)
    app.router.add_static('/', path='./www', name='static')

    return app


connector.log("Starting....")
try:
    web.run_app(app_main())
except KeyboardInterrupt:
    connector.log("Keyboard Interrupt.")

connector.log("Finished.")
