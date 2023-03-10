import {loginfo, ncidinfo, uptime} from './store';

export function ncidClient(url:string) {
    const infoLines: string[] = [];
    const ncidstatusQ: string[] = [];
    const socket: WebSocket = new WebSocket(url); // 'ws://127.0.0.1:8080/ws'
    console.log("opening webSocket to:", url)

    const interval = setInterval(() => {
        const request = ncidstatusQ.pop();
        if (request)
            sendText(request);
    }, 100);
    
    socket.addEventListener("message", async (event:any) => {
        const text: string = await event.data.text();

        text.split('\r\n').forEach(t => {
            if (t.trim().length > 0)
                process_data(t.trim());
        })
    });

    socket.addEventListener("open", () => { 
        uptime.set( new Date().toString());
        console.log('Connection Established'); 
        sendText("REQ: REREAD\n")
    });

    socket.addEventListener("error", async () => { 
        console.log('Connection Error'); 
        sendText("REQ: REREAD\n")

        await new Promise(r => setTimeout(r, 5000));
        window.location.reload()
    });
    
    socket.addEventListener("close", () => { 
        console.log('Connection Closed');
        //timestamp.set('Connection lost to NCID server...');
        ncidinfo.set([]);
        loginfo.set([]);
    });
    
    const process_data = (text: string) => {
        // if this is a caller data row
        if (text.startsWith('CIDLOG:') || text.startsWith('HUPLOG:') || text.startsWith('CID:') || text.startsWith('HUP:')) {
            const items = text.split('*') // break into a list of items
            const msgType = items[0].trim() // msgType is used as the Topic
            if (msgType === "")
                return;

            let info: { [id: string] : string; } = {};
            info.Topic = msgType;

            for (let i = 1; i < items.length; i += 2)
                if (items[i] != "")
                    info[items[i]] = items[i+1]

            // add in ID
            info.ID = info.DATE+info.TIME+info.NMBR;

            // add the request to the info request queue
            ncidstatusQ.push(`REQ: INFO ${info.NMBR}&&${info.NAME}\n`)

            // console.log('info:', info, text)
            ncidinfo.update( items => {
                const newItems = items.filter((item) => item.ID != info.ID)
                newItems.unshift(info);
                return newItems;
            });
        }
        else {
            if (text.startsWith('403 ')) {
                infoLines.length = 0;
                return;
            }
            if (text.startsWith('411 ')) {
                return;
            }

            if (text.startsWith('INFO: ')) {
                infoLines.push(text);

                if (text.startsWith('INFO: dial')) {

                    const nmbr = text.slice(11, text.indexOf('&&'));

                    ncidinfo.update( items => {
                        const newItems = items.map( i => { 
                            if (i.NMBR === nmbr)
                                i.status = infoLines[1].slice(6);

                            return i;
                        });

                        return newItems;
                    });
                }
                return;
            }

            loginfo.update( items => {
                items.push(text);
                return items;
            });
        }
    };

    const sendText = (text: string) => {
        //console.log('send:', text)
        socket.send(new Blob([text]))
    };

    const getInfo = (name:string, nmbr: string) => {
        return new Promise<string>((resolve, reject) => {
            sendText('REQ: INFO ' + nmbr + '&&' + name + '\n');

            setTimeout(() => {
                console.log('infoLines:', infoLines)
                if (infoLines.length === 3)
                    resolve(infoLines[1])
                else
                    reject('timeout');
                }, 200);
        });
    }
    
    return {
        close() {console.log('Closing Client'); clearInterval(interval); socket.close();},
        send(text: string) { sendText(text);},
        info(name:string, nmbr: string): Promise<string> { return getInfo(name, nmbr);}
    };
  }

