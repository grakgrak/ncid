import {
    loginfo,
    ncidinfo,
    ncidStatusCache,
    type Dictionary,
    type INcidRequest
} from './ncidStores';
import { InfoHandler } from './infoHandler';
import { maxRows, uptime } from './store';
import { get } from 'svelte/store';

const FILTER_DAYS = 30;

export type NcidClient = {
    close(): void;
    connect(url: string): void;
    send(text: string | INcidRequest): void;
};

export function ncidClient(): NcidClient {
    let connectionURL: string;
    let socket: WebSocket; // 'ws://127.0.0.1:8080/ws'
    let currentRequest: INcidRequest | undefined = undefined;
    const sendQ: (string | INcidRequest)[] = [];

    // process the sendQ
    const sendInterval = setInterval(() => {
        if (socket === undefined || socket.readyState !== WebSocket.OPEN) return;

        while (currentRequest === undefined) {
            const request = sendQ.shift();

            if (request === undefined)
                // nothing else to do
                break;

            if (typeof request === 'string') {
                loginfo.update((items) => {
                    items.push('Send: ' + request);
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

    // test date of NCID data
    const isCurrentDate = (info: Dictionary<string>): boolean => {
        const date = new Date(
            Number(info.DATE.slice(4)),
            Number(info.DATE.slice(0, 2)) - 1,
            Number(info.DATE.slice(2, 4))
        );
        const dateOffset = 24 * 60 * 60 * 1000 * FILTER_DAYS;
        return date.getTime() >= new Date().getTime() - dateOffset;
    };

    // message handlers
    const ncidinfo_handler = (line: string): boolean => {
        // console.log('client.rx:', line);

        // if this is a caller data row
        if (
            line.startsWith('CIDLOG:') ||
            line.startsWith('HUPLOG:') ||
            line.startsWith('CID:') ||
            line.startsWith('HUP:')
        ) {
            const info: Dictionary<string> = {};
            const items = line.split('*'); // break into a list of items
            const msgType = items[0].trim(); // msgType is used as the Topic

            info.Topic = msgType;

            for (let i = 1; i < items.length; i += 2) if (items[i] != '') info[items[i]] = items[i + 1];

            // add in ID - reformat the date into YYYYMMDD
            const date = info.DATE;
            info.ID = date.slice(4, 8) + date.slice(0, 4) + info.TIME + info.NMBR;

            // console.log('info:', info, text)
            const maxRowCount = get(maxRows);
            ncidinfo.update((items) => {
                const newItems = items.filter((item) => item.ID != info.ID);

                if (isCurrentDate(info)) newItems.unshift(info); // add in the new row

                while (newItems.length > maxRowCount)
                    // limit the length of the list
                    newItems.pop();

                return newItems;
            });

            info.status = get(ncidStatusCache)[info.NMBR];

            // add the fetch info request to the queue but only for NO NAME or OUT-OF-AREA rows
            if ((info.NAME === 'NO NAME' || info.NAME === 'OUT-OF-AREA' || info.NAME === 'Nuisance ?') && info.status === undefined)
                sendQ.push(new InfoHandler(info.ID));

            return true;
        }
        return false;
    };

    // process the incomming NCID data
    const processMessage = (text: string) => {
        // the received data may contain multiple lines
        text.split('\n').forEach((t) => {
            const line = t.trim();

            if (line.length > 0) {
                if (ncidinfo_handler(line)) return;

                if (currentRequest) {
                    const { suppress, isFinished } = currentRequest.handler(line);
                    if (isFinished) currentRequest = undefined;
                    if (suppress) return;
                }

                // add the line to the log
                loginfo.update((items) => {
                    items.push(line);
                    return items;
                });
            }
        });
    };

    // setup the websocket connection
    const connectToWebSocket = () => {
        console.log('Opening webSocket to:', connectionURL);

        socket = new WebSocket(connectionURL); // 'ws://127.0.0.1:8080/ws'

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

            // ncidinfo.set([]);
            // loginfo.set([]);

            //setTimeout(connectToWebSocket, 5000); // reconnect to websocket after 5 seconds
        });

        socket.addEventListener('message', async (event: MessageEvent) => {
            const text: string = await event.data.text();
            processMessage(text);
        });
    };

    // returns functions to the caller
    return {
        close(): void {
            console.log('Closing Client');
            clearInterval(sendInterval);
            socket.close();
        },
        connect(url: string): void {
            connectionURL = url;
            connectToWebSocket();
        },
        send(text: string | INcidRequest): void {
            sendQ.push(text);
        }
    };
}
