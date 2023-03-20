<script lang="ts">
    import "../../app.css";
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

<div class="m-3">
    <span class:lampOn={pirDR === 'T'} class="p-2 rounded-lg bg-slate-200">PirDR</span>
    <span class:lampOn={pirHW === 'T'} class="p-2 rounded-lg bg-slate-200">PirHW</span>
    <span class:lampOn={pirLR === 'T'} class="p-2 rounded-lg bg-slate-200">PirLR</span>
    <span class:lampOn={alarmStatus === 'online'} class="p-2 rounded-lg bg-slate-200">Alarm</span>
</div>
<ul class="ml-2">
    {#each server_messages as msg}
    <li>{msg}</li>
    {/each}
</ul>

<style>
    .lampOn {
        background-color: green;
    }
</style>