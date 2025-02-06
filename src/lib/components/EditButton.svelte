<script lang="ts">
	import { selected, type Dictionary } from '$lib/ncidStores';
	import Modal from '$lib/components/Modal.svelte';
	import { WaitHandler } from '../infoHandler';
	import type { NcidClient } from '$lib/ncidClient';

	let { data, client } = $props<{
		data: Dictionary<string>;
		client: NcidClient;
	}>();

	let aliasText = $state('');
	let showModal = $state(false);

	const edit = async (item: Dictionary<string>) => {
		client.send(new WaitHandler(`REQ: INFO ${item.NMBR}&&${item.NAME}\n`, '411'));
		selected.set(item);  
		aliasText = item.NAME;
		showModal = true;
	};

	const alias = async () => {
		const selectedValue = $selected;  
		if (selectedValue.alias === 'NOALIAS')
			client.send(
				new WaitHandler(
					`REQ: alias add "${selectedValue.NMBR}&&${aliasText}" "NAMEDEP&&${selectedValue.NAME}"\n`,
					'411'
				)
			);
		else
			client.send(
				new WaitHandler(
					`REQ: alias modify "${selectedValue.NMBR}&&${aliasText}" "NAMEDEP&&${selectedValue.NAME}"\n`,
					'411'
				)
			);

		client.send(new WaitHandler('REQ: UPDATE\n', '410'));
		client.send('WRK: ACCEPT LOG\n');
		client.send(new WaitHandler('REQ: RELOAD\n', '410'));
		client.send(new WaitHandler('REQ: REREAD\n', '250'));
	};

	const blacklist = () => {
		const selectedValue = $selected;  
		client.send(new WaitHandler(`REQ: black add "${selectedValue.NMBR}" ""\n`, '411'));
		client.send(new WaitHandler('REQ: RELOAD\n', '410'));
		client.send(new WaitHandler('REQ: REREAD\n', '250'));
	};
</script>

<button
	class="btn btn-xs btn-primary rounded w-8 text-white"
	class:bg-black={data.status === 'black number'}
	onclick={() => edit(data)}
>
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		xmlns="http://www.w3.org/2000/svg"
		fill="currentColor"
	>
		<path
			d="M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm3.83-2.06L4.47 9.76l8-8 1.77 1.77-8 8z"
		/>
	</svg>
</button>

<Modal bind:showModal>
	<h2 slot="header" class="text-orange-500 m-3">
		{$selected !== undefined ? $selected.NAME : ''}
	</h2>

	<form class="flex flex-col m-3" method="dialog">
		<label for="alias" class="text-slate-400 pl-1">Enter new Alias</label>
		<input
			type="text"
			id="alias"
			placeholder="Alias"
			class="pl-1 p-2 m-1 rounded"
			bind:value={aliasText}
		/>
		<button type="submit" class="btn btn-sm btn-primary m-1 rounded" onclick={alias}
			>Save Alias</button
		>
		<button type="submit" class="btn btn-sm btn-primary m-1 rounded" onclick={blacklist}
			>Save Blacklist</button
		>
	</form>
</Modal>
