<script lang="ts">
	import { fetchConfigValue } from "$lib/client/db";

let VORON_PRINTER: string;

(async () => { 
    VORON_PRINTER = await fetchConfigValue('VORON_PRINTER'); 
})();

</script>

<svelte:head>
	<title>Voron</title>
	<meta name="description" content="Voron Mainsail" />
</svelte:head>

<div class="viewbox">
	<iframe src={VORON_PRINTER} title="voron" width="100%" height="100%" frameborder="0" />
</div>

<style>
	.viewbox {
		overflow: auto;
		display: flex;
		flex-direction: column;
		height: calc(100vh - 80px);
	}
</style>
