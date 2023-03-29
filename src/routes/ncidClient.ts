import { loginfo, maxRows, ncidinfo, ncidStatusCache, uptime, type Dictionary, type INcidRequest } from './store';
import { get } from 'svelte/store';
import { InfoHandler } from './infoHandler';

const FILTER_DAYS = 30;

export function ncidClient(url: string) {
    let currentRequest: INcidRequest | undefined = undefined;
    const sendQ: (string | INcidRequest)[] = [];
    const socket: WebSocket = new WebSocket(url); // 'ws://127.0.0.1:8080/ws'

    console.log('opening webSocket to:', url);

    const interval = setInterval(() => {
        while (currentRequest === undefined) {
            const request = sendQ.shift();

            if (request === undefined) // nothing else to do
                break;

            if (typeof request === 'string') {
                loginfo.update((items) => {
                    items.push("Send: " + request);
                    return items;
                });
                socket.send(new Blob([request]));
            }

            if (typeof request === 'object') {
                const text = request.getRequest();
                if (text) {
                    console.log('client.request:', text);
                    currentRequest = request;
                    socket.send(new Blob([text]));
                }
            }
        }
    }, 50);

    socket.addEventListener('open', () => {
        uptime.set(new Date().toString());
        console.log('Connection Established');
        sendQ.push('REQ: REREAD\n');
    });

    socket.addEventListener('error', async () => {
        console.log('Connection Error');
        sendQ.push('REQ: REREAD\n');

        await new Promise((r) => setTimeout(r, 5000));
        window.location.reload();
    });

    socket.addEventListener('close', () => {
        console.log('Connection Closed');
        //timestamp.set('Connection lost to NCID server...');
        ncidinfo.set([]);
        loginfo.set([]);
    });

    socket.addEventListener('message', async (event: any) => {
        const text: string = await event.data.text();

        // the received data may contain multiple lines
        text.split('\n').forEach((t) => {
            
            const line = t.trim();
            
            if (line.length > 0) {
                if (ncidinfo_handler(line)) 
                    return;

                if (currentRequest) {
                    const {suppress, isFinished } = currentRequest.handler(line);
                    if (isFinished) 
                        currentRequest = undefined;
                    if (suppress) 
                        return;
                }

                // add the line to the log
                loginfo.update((items) => {
                    items.push(line);
                    return items;
                });
            }
        });
    });

    const isCurrentDate = (info:any): boolean => {
        const date = new Date( Number(info.DATE.slice(4)), Number(info.DATE.slice(0,2)) - 1, Number(info.DATE.slice(2,4)));
        const dateOffset = (24*60*60*1000) * FILTER_DAYS;
        return date.getTime() >= ((new Date()).getTime() - dateOffset);
    }

    // message handlers
    const ncidinfo_handler = (line: string): boolean => {
        // console.log('client.rx:', line);

        // if this is a caller data row
        if ( line.startsWith('CIDLOG:') || line.startsWith('HUPLOG:') || line.startsWith('CID:') || line.startsWith('HUP:')) {
            const info: Dictionary<string> = {};
            const items = line.split('*'); // break into a list of items
            const msgType = items[0].trim(); // msgType is used as the Topic

            info.Topic = msgType;

            for (let i = 1; i < items.length; i += 2)
                if (items[i] != '')
                    info[items[i]] = items[i + 1];

            // add in ID
            info.ID = info.DATE + info.TIME + info.NMBR;

            // console.log('info:', info, text)
            const maxRowCount = get(maxRows);
            ncidinfo.update((items) => {
                const newItems = items.filter((item) => item.ID != info.ID);

                if (isCurrentDate(info))
                    newItems.unshift(info); // add in the new row

                while (newItems.length > maxRowCount)   // limit the length of the list
                    newItems.pop();

                return newItems;
            });

            info.status = get(ncidStatusCache)[info.NMBR];
            
            // add the fetch info request to the queue but only for NO NAME rows
            if (info.NAME === 'NO NAME' && info.status === undefined)
                sendQ.push(new InfoHandler(info.ID));

            return true;
        }
        return false;
    };

    return {
        close() {
            console.log('Closing Client');
            clearInterval(interval);
            socket.close();
        },
        send(text: string) {
            sendQ.push(text);
        }
    };
}
