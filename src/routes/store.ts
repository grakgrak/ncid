import {readable, writable} from 'svelte/store';

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface INcidRequest {
	getRequest: () => string;
    handler(text: string): {suppress: boolean, isFinished:boolean};
}


export const loginfo = writable<string[]>([]);
export let ncidinfo = writable<Dictionary<string>[]>([]);

export let selected = writable<Dictionary<string>>();
export let timestamp = writable('');
export let uptime = writable('');
