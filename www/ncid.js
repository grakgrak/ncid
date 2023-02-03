document.addEventListener('alpine:init', () => {
    Alpine.data('ncidData', () => ({
        socket: undefined,
        timestamp: '',
        uptime: '',
        open: false,
        blacklist: {},
        ncid: [],
        ncid_shadow: [],
        ncidLog: [],
        timerID: 0,
        delayID: 0,
        aliasName: undefined,
        selectedItem: undefined,
        infoQueue: [],

        isOpen() {
            this.open = this.socket && this.socket.readyState === this.socket.OPEN;
            return this.open;
        },

        delayedUpdate() {
            this.delayID = 0; 
            this.ncid = this.ncid_shadow;
        },

        checkBlacklisted(item) {
            // check for a cached value for this item.ID
            if (this.blacklist[item.NMBR] !== undefined)
                return;
            // if not found then add to cache and Queue an info request for the item
            // this.infoQueue.push(item.NMBR)
        },

        async init() {
            console.log('Create new socket')
            this.socket = new WebSocket('ws://127.0.0.1:8080/ws');

            this.socket.addEventListener("open", () => {
                console.log('Connection Established');
            });

            this.socket.addEventListener("message", (event) => {
                const data = JSON.parse(event.data)

                // handle timestamp message
                if (data.Topic === 'Timestamp') {
                    this.timestamp = data.timestamp;
                    this.uptime = data.uptime;
                    return
                }

                // handle NCID messages
                if (data.Topic === 'CIDLOG:' || data.Topic === 'HUPLOG:' || data.Topic === 'CID:' || data.Topic === 'HUP:') {
                    if (this.ncid_shadow.length == 0)
                        this.ncid_shadow = this.ncid;

                    this.blacklist[data.NMBR] = data.status == 'black number';

                    this.ncid_shadow = this.ncid_shadow.filter((item) => item.ID != data.ID)
                    this.ncid_shadow.unshift(data);

                    if (this.delayID)
                        clearTimeout(this.delayID)
                    this.delayID = setTimeout(this.delayedUpdate.bind(this), 250);
                }
                else {
                    this.ncidLog.push(data);
                }
                console.log(event.data);
            });

            // wait for connection to establish
            let retries = 0;
            while (!this.isOpen()) {
                this.timestamp = ('Waiting for connection to NCID server...');
                await new Promise(r => setTimeout(r, 1000));
                if (++retries > 5)
                    window.location.reload()
            }
            this.keepAlive()
            this.rereadServer()
        },

        keepAlive() { 
            if (this.isOpen()) {
                this.socket.send('');
                this.timerId = setTimeout(this.keepAlive.bind(this), 20000);  
            }
            else
                window.location.reload()
        },

        cancelKeepAlive() {  
            if (timerId) {  
                clearTimeout(timerId);  
            }  
        },

        checkConnection() {
            console.log('check connection')
            if (this.isOpen())
                setTimeout(checkConnection, 5000)
            else
                window.location.reload()
        },

        getLink(item) {
            const text = item.NMBR + (item.Topic === 'HUPLOG:' ? ' (hangup)' : '');
            if (item.NAME == "NO NAME")
                return '<a target="_whocalled_" href="' + 'https://who-called.co.uk/Number/' + item.NMBR + '">' + text + '</a>';
            return text;
        },

        sendCommand(command, clearNcid) {
            if (this.isOpen()) {
                if (clearNcid)
                    this.ncid = [];
                this.ncidLog = [];
                this.socket.send(command + "\n");
                console.log(command)
            }
        },

        reloadServer() {
            fetch('/ncid/reload')
            .then((resp) => resp.text())
            .then((text) => { console.log(text); this.sendCommand("REQ: REREAD", false); })
            // this.sendCommand("REQ: RELOAD", true);
            // setTimeout(() => this.sendCommand("REQ: REREAD", false), 2000);
        },

        rereadServer() {
            this.sendCommand("REQ: REREAD", false);
        },

        test() {
            this.ncid.forEach( item => {
                console.log(item["NAME"]);
                item["STATUS"] = "I";
            });
        },

        async info(item) {
            fetch('/ncid/info/' + item.NAME + '/' + item.NMBR)
            .then((resp) => resp.text())
            .then((text) => console.log(text))
            //this.sendCommand("REQ: INFO " + item.NMBR + "&&" + item.NAME, false);
        },

        alias(item) {
            this.selectedItem = JSON.parse(JSON.stringify(item));
            this.aliasName = item.NAME;

            this.info(item)

            const modal = document.querySelector('.modal');
            modal.showModal();
        },

        saveAlias() {
            if (this.aliasName != this.selectedItem.NAME) {
                this.sendCommand("REQ: alias modify \"" + this.selectedItem.NMBR + "&&" + this.aliasName + "\" \"NAMEDEP&&" + this.selectedItem.NAME + "\"", false);
            }
        },

        async saveBlacklist() {
            fetch('/ncid/blacklist/' + this.selectedItem.NMBR)
            .then((resp) => resp.text())
            .then((text) => console.log(text))
            //this.sendCommand("REQ: black add \"" + this.selectedItem.NMBR + "\" \"\"", false);
        },

        requestUpdates() {
            this.sendCommand("REQ: UPDATES", false);
        },

        acceptLogs() {
            this.sendCommand("WRK: ACCEPT LOGS", false);
        },
    }))

})
