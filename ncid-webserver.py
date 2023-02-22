import aiohttp_cors
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
ncid = NCID(connector, NCID_SERVER, NCID_PORT)
webSock = WebSock(connector)
connector.init(webSock, ncid)

async def timestamp() -> None:
    while True:
        timestamp = {
            'timestamp': time.asctime(),
            'uptime': time.process_time()
        }
        await webSock.publish( "Timestamp", timestamp)
        await asyncio.sleep(1)

# website handlers
async def index(request) -> None:
    raise web.HTTPFound(location = '/index.html')

async def ncid_blacklist(request):
    ncid.blacklist(request.match_info['nmbr'], request.match_info['name'])
    return web.Response(text='ok')

async def ncid_info(request):
    status = await ncid.info(request.match_info['nmbr'], request.match_info['name'])
    print('info status: ' + status)
    return web.Response(text='ok info ' + status)

async def ncid_reload(request):
    ncid.reload()
    return web.Response(text='ok')


# main entry point to program
async def app_main():
    # add in the tasks
    active_tasks.add(asyncio.create_task(timestamp(), name='timestamp'))
    for k, v in ncid.tasks().items():
        active_tasks.add(asyncio.create_task(v, name=k))

    app = web.Application()
    cors = aiohttp_cors.setup(app, defaults={
    "*": aiohttp_cors.ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
            allow_methods="*",
        )
    })

     # setup the routing
    #app.router.add_get('/', index)
    app.router.add_get('/ncid/blacklist/{name}/{nmbr}', ncid_blacklist)
    app.router.add_get('/ncid/info/{name}/{nmbr}', ncid_info)
    app.router.add_get('/ncid/reload', ncid_reload)
    app.router.add_get('/ws', webSock.handler)
    #app.router.add_static('/', path='./www', name='static')

    for route in list(app.router.routes()):
        cors.add(route)

    return app


connector.log("Starting....")
try:
    web.run_app(app_main())
except KeyboardInterrupt:
    connector.log("Keyboard Interrupt.")

connector.log("Finished.")
