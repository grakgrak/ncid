<script lang="ts">
	import Vscroll from '$lib/components/VScroll.svelte';
	import { loginfo, ncidinfo, type Dictionary } from '$lib/ncidStores';
	import { ncidClient, type NcidClient } from '$lib/ncidClient';
	import { WaitHandler } from '$lib/infoHandler';
	import EditButton from '$lib/components/EditButton.svelte';
	import { fetchConfigValue } from '$lib/client/db';

	const client = $state(ncidClient());

	$effect(() => {
		const init = async () => {
			const url = await fetchConfigValue('NCID_SERVER');
			client.connect(url);
		};
		init();
		return () => client.close();
	});

	const getLink = (item: Dictionary<string>) => {
		const text: string = item.NMBR + (item.Topic === 'HUPLOG:' ? ' (hangup)' : '');
		if (item.NAME === 'NO NAME' || item.NAME === 'OUT-OF-AREA' || item.NAME === 'Nuisance ?')
			return `<a class="text-red-500 hover:text-teal-500" target="_whocalled_" href="https://who-called.co.uk/Number/${item.NMBR}">${text}</a>`;

		const count = $ncidinfo.filter((i) => i.NMBR === item.NMBR).length;
		return text + ` (${count})`;
	};

	const formatDateTime = (date: string, time: string) =>
		`${date.slice(2, 4)}-${date.slice(0, 2)}-${date.slice(4)} ${time.slice(0, 2)}:${time.slice(2)}`;

	const tooltipData = (item: Dictionary<string>) => {
		return 'Hi ' + item.NAME;
	};
</script>

<svelte:head>
	<title>NCID</title>
	<meta name="description" content="Caller ID" />
</svelte:head>

<div class="flex flex-col h-full">
	<div class="flex flex-row">
		<Vscroll width="w-1/2" height="h-[calc(100vh-6rem)]">
			<table class="table table-xs w-full">
				<thead class="sticky top-0 z-10 bg-slate-700 rounded-md">
					<tr>
						<th></th>
						<th>Date Time</th>
						<th>Number</th>
						<th>Alias</th>
						<th>ID</th>
					</tr>
				</thead>
				<tbody>
					{#each $ncidinfo as item}
						<tr>
							<td class="pt-1 pb-1"><EditButton {client} data={item} /></td>
							<td>{formatDateTime(item.DATE, item.TIME)}</td>
							<td>{@html getLink(item)}</td>
							<td
								class:text-red-500={item.NAME === 'NO NAME' ||
									item.NAME === 'OUT-OF-AREA' ||
									item.NAME === 'Nuisance ?'}
								class="tooltip tooltip-bottom tooltip-accent">{item.NAME}</td
							>
							<td>{item.ID}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Vscroll>
		<Vscroll width="w-1/2" height="h-[calc(100vh-6rem)]">
			<div>
				<button
					class="btn btn-sm btn-secondary rounded"
					onclick={() => client.send(new WaitHandler('REQ: REREAD\n', '250'))}>Reread</button
				>
				<button
					class="btn btn-sm btn-neutral rounded"
					onclick={() => client.send(new WaitHandler('REQ: RELOAD\n', '410'))}>Reload</button
				>
				<button class="btn btn-sm btn-neutral rounded" onclick={() => loginfo.set([])}
					>Clear Log</button
				>
			</div>
			<table class="mt-3">
				<tbody>
					{#each $loginfo as item}
						<tr>
							<td class="text-sm">{item}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</Vscroll>
	</div>
</div>
