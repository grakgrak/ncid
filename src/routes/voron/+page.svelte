<svelte:head>
	<title>Voron</title>
	<meta name="description" content="Voron Mainsail" />
</svelte:head>

<div class="viewbox">
	<iframe src="http://192.168.1.141" title="voron" width="100%" height="100%" frameborder="0" />
</div>

<style>
	.viewbox {
		overflow: auto;
		display: flex;
		flex-direction: column;
		height: calc(100vh - 80px);
	}
</style>
