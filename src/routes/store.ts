import {readable, writable} from 'svelte/store';

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface INcidRequest {
	sendRequest: string;
	complete: boolean;
    handler(text: string): boolean;
}


export const loginfo = writable<string[]>([]);
export let ncidinfo = writable<Dictionary<string>[]>([]);

export let selected = writable<Dictionary<string>>();
export let timestamp = writable('');
export let uptime = writable('');
