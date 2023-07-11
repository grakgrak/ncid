import { ncidinfo, ncidStatusCache, type INcidRequest } from './store';
import { get } from 'svelte/store';

export class InfoHandler implements INcidRequest {
    id: string;
    infoLines: string[] = [];

    constructor( id: string ) {
        this.id = id;
    }

    getRequest(): string {
        const tmp = get(ncidinfo);
        if (tmp) {
            const info = tmp.find((value) => value.ID === this.id);

            if (info)
                return `REQ: INFO ${info.NMBR}&&${info.NAME}\n`;
        }
        return '';
    }

    handler(line: string): {suppress: boolean, isFinished:boolean} {

        if (line.startsWith('403 ')) {
            this.infoLines.length = 0;
            return { suppress: true, isFinished: false };
        }
        if (line.startsWith('411 '))
            return { suppress: true, isFinished: true };

        // process the info messages
        if (line.startsWith('INFO: ')) {
            this.infoLines.push(line);

            if (line.startsWith('INFO: dial')) {
                const nmbr = line.slice(11, line.indexOf('&&'));
                const status = this.infoLines[1].slice(6);
                const alias = this.infoLines[0].slice(12);

                // update the cached status
                if (status === 'black number')
                    ncidStatusCache.update((cache) => {
                        cache[nmbr] = status;
                        return cache;
                    });

                ncidinfo.update((items) => {
                    const newItems = items.map((i) => {
                        if (i.NMBR === nmbr) {
                            i.status = status;
                            i.alias = alias;
                        }

                        return i;
                    });

                    return newItems;
                });
            }
            return { suppress: true, isFinished: false };
        }

        return { suppress: false, isFinished: false };
    };
};

export class WaitHandler implements INcidRequest {
    sendRequest: string;
    waitText: string;

    constructor( request: string, waitText:string) {
        this.sendRequest = request;
        this.waitText = waitText;
    }

    getRequest(): string {
        return this.sendRequest;
    }

    handler(line: string): {suppress: boolean, isFinished:boolean} {
        return { suppress: false, isFinished: line.startsWith(this.waitText) };
    };
};
