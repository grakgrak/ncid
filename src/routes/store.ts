import {writable} from 'svelte/store';

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface INcidRequest {
	getRequest: () => string;
    handler(text: string): {suppress: boolean, isFinished:boolean};
}


export const loginfo = writable<string[]>([]);
export const ncidinfo = writable<Dictionary<string>[]>([]); // array of Info objects
export const ncidStatusCache = writable<Dictionary<string>>({}); // status by number

export const selected = writable<Dictionary<string>>();
export const timestamp = writable('');
export const uptime = writable('');

export const maxRows = writable<number>(20);
export const theme = writable<string>("dark");

// const initialMaxRows = browser ? Number(localStorage.maxRows || 20) : 20;
// export let maxRows = writable<number>(initialMaxRows);
// maxRows.subscribe((value) => { if (browser) localStorage.maxRows = String(value);});

// const initialTheme = browser ? localStorage.theme : 'dark';
// export const theme = writable<string>(initialTheme);
// theme.subscribe((value) => { if (browser) localStorage.theme = value});