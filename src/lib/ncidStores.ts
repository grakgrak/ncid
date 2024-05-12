import { writable } from 'svelte/store';

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface INcidRequest {
    getRequest: () => string;
    handler(text: string): { suppress: boolean; isFinished: boolean };
}

export const loginfo = writable<string[]>([]);
export const ncidinfo = writable<Dictionary<string>[]>([]); // array of Info objects
export const ncidStatusCache = writable<Dictionary<string>>({}); // status by number

export const selected = writable<Dictionary<string>>();
