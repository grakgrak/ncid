import { loginfo, ncidinfo, uptime, type INcidRequest } from './store';
import { InfoHandler } from './infoHandler';

const MAX_ITEMS = 30; // limit the length of the ncidInfo list

export function ncidClient(url: string) {
    let currentRequest: INcidRequest | undefined = undefined;
    const sendQ: (string | INcidRequest)[] = [];
    const socket: WebSocket = new WebSocket(url); // 'ws://127.0.0.1:8080/ws'

    console.log('opening webSocket to:', url);

    const interval = setInterval(() => {
        if (currentRequest !== undefined) return;

        const request = sendQ.shift();

        if (typeof request === 'string') {
            //console.log('client.send:', request);
            socket.send(new Blob([request]));
        }

        if (typeof request === 'object') {
            currentRequest = request;
            //console.log('client.request:', request.sendRequest);
            socket.send(new Blob([request.sendRequest]));
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

    // message handlers
    const ncidinfo_handler = (line: string): boolean => {
        // console.log('client.rx:', line);

        // if this is a caller data row
        if ( line.startsWith('CIDLOG:') || line.startsWith('HUPLOG:') || line.startsWith('CID:') || line.startsWith('HUP:')) {
            const info: { [id: string]: string; } = {};
            const items = line.split('*'); // break into a list of items
            const msgType = items[0].trim(); // msgType is used as the Topic

            info.Topic = msgType;

            for (let i = 1; i < items.length; i += 2)
                if (items[i] != '')
                    info[items[i]] = items[i + 1];

            // add in ID
            info.ID = info.DATE + info.TIME + info.NMBR;

            // add the request to the info request queue
            sendQ.push(new InfoHandler(`REQ: INFO ${info.NMBR}&&${info.NAME}\n`));

            // console.log('info:', info, text)
            ncidinfo.update((items) => {
                const newItems = items.filter((item) => item.ID != info.ID);
                newItems.unshift(info);
                if (newItems.length > MAX_ITEMS)   // limit the length of the list
                    newItems.pop();
                return newItems;
            });
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
