<script lang="ts">
	import { onMount } from 'svelte';

	let server_messages: string[] = [];

    let pirDR: string = 'Q';
    let pirLR: string = 'Q';
    let pirHW: string = 'Q';
    let alarmStatus: string = '';


	onMount(() => {
		const sse = new EventSource('/mqtt?topic=alarm/sensor/%23&topic=alarm/status&topic=tele/%23');
		
        sse.onmessage = (e) => {
            const data: string = e.data;

            const topic = data.slice(0, data.indexOf(' '));
            const msg = data.slice(data.indexOf(' ') + 1);

            if (topic === 'alarm/sensor/pirDR')
                pirDR = msg;
            if (topic === 'alarm/sensor/pirLR')
                pirLR = msg;
            if (topic === 'alarm/sensor/pirHW')
                pirHW = msg;
            if (topic === 'alarm/status')
                alarmStatus = msg;

            if (server_messages.length > 20)
                server_messages.pop();
            server_messages.unshift(e.data);
            server_messages = server_messages;
		};

		return () => sse.close();
	});
</script>

<div class="indicators">
    <span class="lamp" class:lampOn={pirDR === 'T'}>PirDR</span>
    <span class="lamp" class:lampOn={pirHW === 'T'}>PirHW</span>
    <span class="lamp" class:lampOn={pirLR === 'T'}>PirLR</span>
    <span class="lamp" class:lampOn={alarmStatus === 'online'}>Alarm</span>
</div>
<ul>
    {#each server_messages as msg}
    <li>{msg}</li>
    {/each}
</ul>

<style>
    .indicators {
        padding: 10px;
    }
    .lamp {
        padding: 8px;
        border-radius: 9px;
        background-color: gray;
    }
    .lampOn {
        background-color: green;
    }
</style>