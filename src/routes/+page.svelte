<script lang="ts">
	import '../app.css';
	import Vscroll from '$lib/components/VScroll.svelte';
	import { loginfo, ncidinfo, type Dictionary } from '$lib/ncidStores';
	import { onMount } from 'svelte';
	import { ncidClient } from '$lib/ncidClient';
	import { WaitHandler } from '$lib/infoHandler';
	import EditButton from '$lib/components/EditButton.svelte';
	import { PUBLIC_NCID_SERVER } from '$env/static/public';

	let client = ncidClient(PUBLIC_NCID_SERVER); //  'ws://192.168.1.231:3334'

	onMount(() => {
		client.connect();
		return client.close;
	});

	const getLink = (item: Dictionary<string>) => {
		const text: string = item.NMBR + (item.Topic === 'HUPLOG:' ? ' (hangup)' : '');
		if (item.NAME == 'NO NAME')
			return `<a class="text-red-500 hover:text-teal-500" target="_whocalled_" href="https://who-called.co.uk/Number/${item.NMBR}">${text}</a>`;
		return text;
	};

	const formatDateTime = (date: string, time: string) =>
		`${date.slice(2, 4)}-${date.slice(0, 2)}-${date.slice(4)} ${time.slice(0, 2)}:${time.slice(2)}`;

	const tooltipData = (item: Dictionary<string>) => {
		return 'Hi ' + item.NAME;
	};

	// let sortedData = (key: string, asc: boolean) : Dictionary<string>[] => {
	//     const modifier = asc ? 1 : -1;
	//     return $ncidinfo.sort((a,b) => {
	//         const left = String(a[key]);
	//         const right = String(b[key]);
	//         const res = (left === right) ? 0 : (left < right) ? -1 : 1;
	//         return res * modifier;
	//     });
	// };
</script>

<svelte:head>
	<title>NCID</title>
	<meta name="description" content="Caller ID" />
</svelte:head>

<div class="flex text-grey-300 relative bottom-0">
	<!-- <Vscroll width="w-1/2" height="h-[calc(100vh-80px)]"> -->
	<Vscroll width="w-1/2" height="h-full">
		<table class="table table-sm table-zebra">
			<thead>
				<tr class="sticky top-0">
					<th class="w-10" />
					<th class="text-left p-2">Date Time</th>
					<th class="text-left p-2">Number</th>
					<th class="text-left p-2">Alias</th>
					<th class="text-left p-2 w-28">ID</th>
				</tr>
			</thead>
			<tbody>
				{#each $ncidinfo as data (data.ID)}
					<tr class="hover">
						<td class="pt-0 pb-0">
							<EditButton {client} {data} />
						</td>
						<td class="text-xs pl-2">{formatDateTime(data.DATE, data.TIME)}</td>
						<td class="text-xs pl-2">{@html getLink(data)}</td>
						<td
							class:text-red-500={data.NAME === 'NO NAME'}
							class="tooltip tooltip-bottom tooltip-accent text-xs pl-2"
							data-tip={tooltipData(data)}>{data.NAME}</td
						>
						<td class="text-xs pl-2">{data.ID}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Vscroll>
	<Vscroll width="w-1/2" height="h-[calc(100vh-80px)]">
		<div>
			<button
				class="btn-sm btn-secondary rounded"
				on:click={() => client.send(new WaitHandler('REQ: REREAD\n', '250'))}>Reread</button
			>
			<button
				class="btn-sm btn-accent rounded"
				on:click={() => client.send(new WaitHandler('REQ: RELOAD\n', '410'))}>Reload</button
			>
			<button class="btn-sm btn-accent rounded" on:click={() => loginfo.set([])}>Clear Log</button>
		</div>
		<table class="mt-3">
			<tbody>
				{#each $loginfo as log}
					<tr>
						<td class="text-sm">{log}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</Vscroll>
</div>
