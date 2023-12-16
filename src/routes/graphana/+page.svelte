<script lang="ts">
	import { fetchConfigValue } from "$lib/client/db";
	import { onMount } from "svelte";

    let PUBLIC_GRAPHANA: string;

    onMount(async () => {
        PUBLIC_GRAPHANA = await fetchConfigValue('GRAPHANA'); 
        console.log(PUBLIC_GRAPHANA)
    });


</script>

<svelte:head>
	<title>Graphana</title>
	<meta name="description" content="Home Graphana" />
</svelte:head>

{#if PUBLIC_GRAPHANA}
<div class="viewbox">
	<iframe
		src={PUBLIC_GRAPHANA + '/d/LHC28MJnk/home?orgId=1&refresh=5m&kiosk=tv'}
		title="Graphana"
		width="100%"
		height="100%"
		frameborder="0"
	/>
</div>
{/if}

<style>
	.viewbox {
		overflow: auto;
		display: flex;
		flex-direction: column;
		height: calc(100vh - 80px);
	}
</style>
