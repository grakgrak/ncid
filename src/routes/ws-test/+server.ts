import mqtt from 'mqtt';
import type { RequestHandler } from './$types';
import { getConfig } from '$lib/server/db';

const MQTT_SERVER = getConfig('MQTT_SERVER');

export const GET = (({ url }) => {
	const topic = url.searchParams.get('topic');
	console.log('Open MQTT:', topic);

	const client = mqtt.connect(MQTT_SERVER);

	const stream = new ReadableStream({
		start(controller) {
			client.on('connect', function () {
				client.subscribe('alarm/heartbeat', (err) => {
					console.log(err || 'No Error.');
				});
			});

			client.on('message', function (topic, message) {
				const data = `event: message\ndata: ${topic} ${message.toString()}\n\n`;
				// console.log(data);
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
