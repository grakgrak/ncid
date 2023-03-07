import {loginfo, ncid, timestamp, uptime, type Dictionary} from './store';

export function ncidClient(url:string) {
    const socket: WebSocket = new WebSocket(url); // 'ws://127.0.0.1:8080/ws'

    console.log("opening webSocket to:", url)
    
    socket.addEventListener("open", () => { 
        uptime.set( new Date().toString());
        console.log('Connection Established'); 
        socket.send("REQ: REREAD" + "\n")
    });

    socket.addEventListener("error", async () => { 
        console.log('Connection Error'); 
        socket.send("REQ: REREAD" + "\n")

        await new Promise(r => setTimeout(r, 5000));
        window.location.reload()
    });
    
    socket.addEventListener("close", () => { 
        console.log('Connection Closed');
        timestamp.set('Connection lost to NCID server...');
        ncid.set([]);
        loginfo.set([]);
    });
    
    socket.addEventListener("message", (event:any) => {
        const data: Dictionary<string> = JSON.parse(event.data)
    
        // handle timestamp message
        if (data.Topic === 'Timestamp') {
            timestamp.set(data.timestamp);
            return
        }
    
        if (data.Topic === 'CIDLOG:' || data.Topic === 'HUPLOG:' || data.Topic === 'CID:' || data.Topic === 'HUP:') {
            ncid.update( items => {
                items.filter((item) => item.ID != data.ID)
                items.unshift(data);
                return items;
            })
        }
        else {
            loginfo.update( items => {
                items.push(data);
                return items;
            });
        }
    });

    return {
        close() {console.log('Closing Client'); socket.close();},
        send(text: string){ socket.send(text)},
    };
  }

