import {readable, writable} from 'svelte/store';

export interface Dictionary<T> {
    [Key: string]: T;
}

export const loginfo = writable<Dictionary<string>[]>([]);
export let ncid = writable<Dictionary<string>[]>([]);

export let selected = writable<Dictionary<string>>();
export let timestamp = writable('');
export let uptime = writable('');

