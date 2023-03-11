import { loginfo, ncidinfo, uptime, type INcidRequest } from './store';
import { InfoHandler } from './infoHandler';

export function ncidClient(url: string) {
	let currentRequest: INcidRequest | undefined = undefined;
	const sendQ: (string | INcidRequest)[] = [];
	const socket: WebSocket = new WebSocket(url); // 'ws://127.0.0.1:8080/ws'

	console.log('opening webSocket to:', url);

	const interval = setInterval(() => {
		if (currentRequest !== undefined) return;

		const request = sendQ.pop();

		if (typeof request === 'string') {
			console.log('client.send:', request);
			socket.send(new Blob([request]));
		}

		if (typeof request === 'object') {
			currentRequest = request;
			console.log('client.request:', request.sendRequest);
			socket.send(new Blob([request.sendRequest]));
		}
	}, 50);

	socket.addEventListener('open', () => {
		uptime.set(new Date().toString());
		console.log('Connection Established');
		sendQ.push('REQ: REREAD\n');
	});

	socket.addEventListener('error', async () => {
		console.log('Connection Error');
		sendQ.push('REQ: REREAD\n');

		await new Promise((r) => setTimeout(r, 5000));
		window.location.reload();
	});

	socket.addEventListener('close', () => {
		console.log('Connection Closed');
		//timestamp.set('Connection lost to NCID server...');
		ncidinfo.set([]);
		loginfo.set([]);
	});

	socket.addEventListener('message', async (event: any) => {
		const text: string = await event.data.text();

		text.split('\n').forEach((t) => {
			const line = t.trim();
			if (line.length > 0) {
				if (ncidinfo_handler(line)) return;

				// console.log('client.rx:', line);

				if (currentRequest) {
					const flag = currentRequest.handler(line);
					if (currentRequest.complete) currentRequest = undefined;
					if (flag) return;
				}

				append_to_log_handler(line);
			}
		});
	});

    // message handlers
	const ncidinfo_handler = (text: string): boolean => {
		// if this is a caller data row
		if (
			text.startsWith('CIDLOG:') ||
			text.startsWith('HUPLOG:') ||
			text.startsWith('CID:') ||
			text.startsWith('HUP:')
		) {
			const items = text.split('*'); // break into a list of items
			const msgType = items[0].trim(); // msgType is used as the Topic

			let info: { [id: string]: string } = {};
			info.Topic = msgType;

			for (let i = 1; i < items.length; i += 2) if (items[i] != '') info[items[i]] = items[i + 1];

			// add in ID
			info.ID = info.DATE + info.TIME + info.NMBR;

			// add the request to the info request queue
			sendQ.push(new InfoHandler(`REQ: INFO ${info.NMBR}&&${info.NAME}\n`));

			// console.log('info:', info, text)
			ncidinfo.update((items) => {
				const newItems = items.filter((item) => item.ID != info.ID);
				newItems.unshift(info);
				return newItems;
			});
			return true;
		}
		return false;
	};

	const append_to_log_handler = (text: string): void => {
		loginfo.update((items) => {
			items.push(text);
			return items;
		});
	};

	return {
		close() {
			console.log('Closing Client');
			clearInterval(interval);
			socket.close();
		},
		send(text: string) {
			sendQ.push(text);
		}
	};
}
