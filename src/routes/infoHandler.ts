import { ncidinfo, type INcidRequest } from './store';

export class InfoHandler implements INcidRequest {
    sendRequest: string;
    infoLines: string[] = [];

    constructor( request: string) {
        this.sendRequest = request;
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

    handler(line: string): {suppress: boolean, isFinished:boolean} {
        return { suppress: false, isFinished: line.startsWith(this.waitText) };
    };
};
