import { ncidinfo, type INcidRequest } from './store';

export class InfoHandler implements INcidRequest {
    sendRequest: string;
    complete: boolean = false;
    infoLines: string[] = [];

    constructor( request: string) {
        this.sendRequest = request;
    }

    handler(text: string): boolean {
        if (text.startsWith('403 ')) {
            this.infoLines.length = 0;
            return true;
        }
        if (text.startsWith('411 ')) {
            this.complete = true;
            return true;
        }

        // process the info messages
        if (text.startsWith('INFO: ')) {
            this.infoLines.push(text);

            if (text.startsWith('INFO: dial')) {
                const nmbr = text.slice(11, text.indexOf('&&'));

                ncidinfo.update((items) => {
                    const newItems = items.map((i) => {
                        if (i.NMBR === nmbr) {
                            i.status = this.infoLines[1].slice(6);
                            i.alias = this.infoLines[0].slice(12);
                        }

                        return i;
                    });

                    return newItems;
                });
            }
            return true;
        }
        return false;
    };
};
