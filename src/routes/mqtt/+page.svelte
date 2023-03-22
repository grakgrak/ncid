<script lang="ts">
    import "../../app.css";
	import { onMount } from 'svelte';

	let server_messages: string[] = [];

    let pirDR: string = 'Q';
    let pirLR: string = 'Q';
    let pirHW: string = 'Q';
    let pirDoor: string = 'Q';
    let alarmStatus: string = '';
    let heartbeat: any = {};

    $: uptime = toUptime(heartbeat.UpTime);

    function toUptime(secs: number): string {
        const days = Math.floor(secs / (60*60*24));  
        secs -= days * (60*60*24);  

        const hours = Math.floor(secs / (60*60));  
        secs -= hours * (60*60);  

        const minutes = Math.floor(secs / 60 );  
        secs -= minutes * 60;  

        const as2Digit = (v: number): string => {
            const num = v.toString()
            return v < 10 ? '0' + num : num;
        }

        return `Uptime: ${days} days ${as2Digit(hours)}:${as2Digit(minutes)}:${as2Digit(secs)}`;
    }

	onMount(() => {
		const sse = new EventSource('/mqtt?topic=alarm/sensor/%23&topic=alarm/status&topic=alarm/heartbeat');
		
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
            if (topic === 'alarm/sensor/door')
                pirDoor = msg;
            if (topic === 'alarm/status')
                alarmStatus = msg;
            if (topic === 'alarm/heartbeat') {
                heartbeat = JSON.parse(msg);
                return;
            }

            if (server_messages.length > 20)
                server_messages.pop();
            server_messages.unshift(e.data);
            server_messages = server_messages;
		};

		return () => sse.close();
	});
</script>

<div class="flex h-96">
<div class="flex flex-col justify-between w-50 p-1">
    <div>{uptime}</div>
    <span class:bg-green-700={pirDR === 'T'} class="p-2 rounded-lg bg-slate-200">Dining Room</span>
    <span class:bg-green-700={pirHW === 'T'} class="p-2 rounded-lg bg-slate-200">Hallway</span>
    <span class:bg-green-700={pirLR === 'T'} class="p-2 rounded-lg bg-slate-200">Living Room</span>
    <span class:bg-green-700={pirDoor === 'T'} class="p-2 rounded-lg bg-slate-200">Door</span>
    <span class:bg-green-700={alarmStatus === 'online'} class="p-2 rounded-lg bg-slate-200">Alarm</span>
</div>

<ul class="ml-2 text-white">
    {#each server_messages as msg}
    <li>{msg}</li>
    {/each}
</ul>
</div>