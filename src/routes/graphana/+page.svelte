<svelte:head>
	<title>Graphana</title>
	<meta name="description" content="Home Graphana" />
</svelte:head>

<div class="viewbox">
	<iframe
		src="http://192.168.1.224:3000/d/LHC28MJnk/home?orgId=1&refresh=5m&kiosk=tv"
		title="Graphana"
		width="100%"
		height="100%"
		frameborder="0"
	/>
</div>

<style>
	.viewbox {
		overflow: auto;
		display: flex;
		flex-direction: column;
		height: calc(100vh - 80px);
	}
</style>
