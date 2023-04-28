<!-- AgGrid.svelte -->
<script lang="ts">
    import {timestamp} from '../store';
    import "../../app.css";
    import type { PageData } from './$types';
    import { json, error } from "@sveltejs/kit";
    import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
    import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
    import AgGridSvelte from 'ag-grid-svelte';

    export let data: PageData;

    let counter = 1;
    let gridApi: any;
    let gridColumnApi: any;

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

    const columnDefs = [
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' }
    ];

    const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,

        defaultColDef: {
        resizable: true,
        sortable: true
        }
    };

    const handleClick = () => {
        counter = counter + 1;
    }
</script>

<div class="p-2">
    {counter}<button class="btn-primary btn rounded ml-2" on:click={handleClick}>click</button>
    {$timestamp}
</div>

<div class="ag-theme-alpine" style:height="300px">
    <AgGridSvelte gridOptions={gridOptions} :api={gridApi} :columnApi={gridColumnApi}/>
</div>

<ul>
{#each data.post as d}
    <li class="text-sm">{d.name} {d.hair_color} {d.appearance_count}</li>
{/each}
</ul>
 