<!-- AgGrid.svelte -->
<script lang="ts">
	import { timestamp } from '../../lib/store';
	import '../../app.css';
	import type { PageData } from './$types';

	export let data: PageData;

	let counter = 1;

	const rowData = [
		{ make: 'Toyota', model: 'Celica', price: 35000 },
		{ make: 'Toyota', model: 'Rav 4', price: 35000 },
		{ make: 'Toyota', model: 'Auris', price: 35000 },
		{ make: 'Ford', model: 'Mondeo', price: 32000 },
		{ make: 'Ford', model: 'Escort', price: 32000 },
		{ make: 'Ford', model: 'Capri', price: 32000 },
		{ make: 'Porsche', model: 'Boxter', price: 72000 },
		{ make: 'Porsche', model: 'Taycan', price: 72000 },
		{ make: 'Porsche', model: '911', price: 72000 }
	];

	// const columnDefs: ColDef[] = [
	// 	{ headerName: 'Make', field: 'make' },
	// 	{ headerName: 'Model', field: 'model' },
	// 	{ headerName: 'Price', field: 'price' }
	// ];

	// const gridOptions = {
	// 	columnDefs: columnDefs,
	// 	rowData: rowData,

	// 	defaultColDef: {
	// 		resizable: true,
	// 		sortable: true
	// 	}
	// };

	const handleClick = () => {
		counter = counter + 1;
	};
</script>

<svelte:head>
	<title>ScratchPad</title>
	<meta name="description" content="ScratchPad" />
</svelte:head>

<div class="p-2">
	{counter}<button class="btn btn-primary rounded ml-2" on:click={handleClick}>click</button>
	{$timestamp}
</div>

<!-- <div class="ag-theme-alpine" style:height="300px">
	<AgGridSvelte {gridOptions} {gridApi} columnApi={gridColumnApi} />
</div> -->

<!-- <ul>
	{#each data.post as d}
		<li class="text-sm">{d.name} {d.hair_color} {d.appearance_count}</li>
	{/each}
</ul> -->
