<script lang="ts">
	import '../app.css';
	import Modal from '$lib/components/Modal.svelte';
	import Link from '$lib/components/Link.svelte';
	import { maxRows } from '$lib/store';
	import { browser } from '$app/environment';
	import { fetchAllConfig, fetchConfigValue } from '$lib/client/db';
	import { onMount } from 'svelte';

    let VORON_PRINTER: string;

    onMount(async () => {
        VORON_PRINTER = await fetchConfigValue('VORON_PRINTER'); 
    });

	const updateTheme = (theme: string): void => {
		if (browser) document?.querySelector('[data-theme]')?.setAttribute('data-theme', theme);
	};

	let darkTheme = true;
	$: updateTheme(darkTheme ? 'dark' : 'light');

	let showAllRows = false;
	$: $maxRows = showAllRows ? 999 : 100;

	let showModal = false;

	let configPromise = fetchAllConfig();

	async function edit(nv: { name: string; value: string }) {
		const value = prompt('URL', nv.value);

		if (value) {
			await fetch(`/api/setConfig?name=${nv.name}&value=${value}`);
			configPromise = fetchAllConfig();
		}
	}
</script>

<div class="w-full h-full flex flex-col overflow-hidden" >
<header class="font-bold rounded-lg m-2 bg-gray-300 h-11">
	<ul class="flex justify-around pt-2 text-gray-700 px-2">
		<li><Link href="/">Caller ID</Link></li>
		<li><Link href="/todo">To do</Link></li>
		<li><Link href="/graphana">Graphana</Link></li>
		<li><Link href="/voron">Voron</Link></li>
		<li><Link href="/mqtt">MQTT</Link></li>
		<li><Link href="/scratchpad">ScratchPad</Link></li>
		<li>
			<Link target="__VoronPi__" href={VORON_PRINTER}>[VoronPi]</Link>
		</li>
		<li><Link target="__ZeroBlocker__" href="https://192.168.1.231:4200">[ZeroBlocker]</Link></li>
		<li><Link target="__NodeRedPi__" href="https://192.168.1.210:4200">[NodeRedPi]</Link></li>
		<li><Link target="__Synology__" href="https://synology:5001">[Synology]</Link></li>
		<li><Link target="__BT_Hub__" href="http://192.168.1.254">[BT Hub]</Link></li>
		<li><Link target="__Rpi4__" href="https://192.168.1.140:4200">[Rpi 4]</Link></li>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div class="p-1 hover:bg-teal-500 hover:text-white rounded" on:click={() => (showModal = true)}>
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M19.85 8.75l4.15.83v4.84l-4.15.83 2.35 3.52-3.43 3.43-3.52-2.35-.83 4.15H9.58l-.83-4.15-3.52 2.35-3.43-3.43 2.35-3.52L0 14.42V9.58l4.15-.83L1.8 5.23 5.23 1.8l3.52 2.35L9.58 0h4.84l.83 4.15 3.52-2.35 3.43 3.43-2.35 3.52zm-1.57 5.07l4-.81v-2l-4-.81-.54-1.3 2.29-3.43-1.43-1.43-3.43 2.29-1.3-.54-.81-4h-2l-.81 4-1.3.54-3.43-2.29-1.43 1.43L6.38 8.9l-.54 1.3-4 .81v2l4 .81.54 1.3-2.29 3.43 1.43 1.43 3.43-2.29 1.3.54.81 4h2l.81-4 1.3-.54 3.43 2.29 1.43-1.43-2.29-3.43.54-1.3zm-8.186-4.672A3.43 3.43 0 0 1 12 8.57 3.44 3.44 0 0 1 15.43 12a3.43 3.43 0 1 1-5.336-2.852zm.956 4.274c.281.188.612.288.95.288A1.7 1.7 0 0 0 13.71 12a1.71 1.71 0 1 0-2.66 1.422z"
				/>
			</svg>
		</div>
	</ul>
</header>

<slot />

</div>

<Modal bind:showModal>
	<h2 slot="header" class="text-orange-500 m-3 w-44">Settings</h2>

	<div class="form-control">
		<label class="label cursor-pointer">
			<div class="label-text">Show all NCID rows:</div>
			<input type="checkbox" class="toggle toggle-sm" bind:checked={showAllRows} />
		</label>
		<label class="label cursor-pointer">
			<div class="label-text">Dark theme:</div>
			<input type="checkbox" class="toggle toggle-sm" bind:checked={darkTheme} />
		</label>

		<ul>
			{#await configPromise}
				<p>Loading...</p>
			{:then config}
				{#each config as nv}
					<li>
						<button class="btn btn-sm my-1" on:click={() => edit(nv)}>{nv.name} = {nv.value}</button
						>
					</li>
				{/each}
			{/await}
		</ul>
	</div>
</Modal>
