<script lang="ts">
	import { onMount } from 'svelte';

	let server_message: string;

	function subscribe() {
		const sse = new EventSource('/test?topic=hello');
		
        sse.onmessage = (e) => {
			server_message = e.data;
		};

		return () => sse.close();
	}

	onMount(() => {
		const unsub = subscribe();

		return unsub;
	});
</script>

TEST MQTT {server_message}
