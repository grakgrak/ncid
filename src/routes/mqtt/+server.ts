import mqtt from 'mqtt';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (({url}) => {

    const topics = url.searchParams.getAll('topic');

    if (topics.length === 0)
        throw error(404, "Bad topic");

    console.log('Open MQTT:', topics)

    const client  = mqtt.connect('ws://192.168.1.210:9001')

	const stream = new ReadableStream({
		start(controller) {
            client.on('connect', function () {
                topics.forEach((topic) => {
                    client.subscribe(topic, (err) => {console.log(err || 'No Error.')});
                });
            });
        
            client.on('message', function (topic, message) {
                const data = `event: message\ndata: ${topic} ${message.toString()}\n\n`;
                // console.log(data);
				controller.enqueue(data);
            });
        },
		cancel() { console.log('Close MQTT'); client.end(); }
	});

	return new Response(stream, {
		headers: {
			'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
			Connection: 'keep-alive'
		}
	});
}) satisfies RequestHandler;
