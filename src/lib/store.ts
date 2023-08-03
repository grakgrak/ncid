import { writable } from 'svelte/store';

export const timestamp = writable('');
export const uptime = writable('');
export const maxRows = writable<number>(20);

export const theme = writable<string>('dark');

// const initialMaxRows = browser ? Number(localStorage.maxRows || 20) : 20;
// export let maxRows = writable<number>(initialMaxRows);
// maxRows.subscribe((value) => { if (browser) localStorage.maxRows = String(value);});

// const initialTheme = browser ? localStorage.theme : 'dark';
// export const theme = writable<string>(initialTheme);
// theme.subscribe((value) => { if (browser) localStorage.theme = value});
