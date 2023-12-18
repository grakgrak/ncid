import mqtt from 'mqtt';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getConfig } from '$lib/server/db';

const MQTT_SERVER = getConfig('MQTT_SERVER');

export const GET = (({ url }) => {
	const topics = url.searchParams.getAll('topic');

	if (topics.length === 0) error(404, 'Bad topic');

	console.log('Open MQTT:', topics);

	const client = mqtt.connect(MQTT_SERVER);

	const stream = new ReadableStream({
		start(controller) {
			client.on('connect', function () {
				topics.forEach((topic) => client.subscribe(topic));
			});

			client.on('message', function (topic, message) {
				const data = `event: message\ndata: ${topic} ${message.toString()}\n\n`;
				controller.enqueue(data);
			});
		},

		cancel() {
			console.log('Close MQTT');
			client.end();
		}
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
			'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
}) satisfies RequestHandler;
