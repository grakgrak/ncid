import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	console.log(`NEW REQUEST FROM ${event.url.pathname}`);

	const response = await resolve(event);

	console.log(`SENDING RESPONSE`);
	return response;
};
