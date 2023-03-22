<script lang="ts">
    import "../app.css";
    import Vscroll from "./vscroll.svelte";
	import Modal from "../lib/modal.svelte";
    import { loginfo, ncidinfo, selected, type Dictionary } from './store';
	import { onMount } from "svelte";
	import { ncidClient } from "./ncidClient";
	import { WaitHandler } from "./infoHandler";

    let aliasText: string = '';
    let showModal: boolean = false;
    let client: any;

    onMount(()=>{
        client = ncidClient('ws://192.168.1.231:3334');
        return client.close;
    })

    const edit = async (item: Dictionary<string>) => {
        client.send(new WaitHandler(`REQ: INFO ${item.NMBR}&&${item.NAME}\n`, '411'));
        $selected = item;
        aliasText = $selected.NAME;
        showModal = true;
    }

    const alias = async () => {
        if ($selected.alias === "NOALIAS")
            client.send(new WaitHandler(`REQ: alias add "${$selected.NMBR}&&${aliasText}" "NAMEDEP&&${$selected.NAME}"\n`, '411'));
        else
            client.send(new WaitHandler(`REQ: alias modify "${$selected.NMBR}&&${aliasText}" "NAMEDEP&&${$selected.NAME}"\n`, '411'));

        client.send(new WaitHandler('REQ: UPDATE\n', '410'));
        client.send('WRK: ACCEPT LOG\n');
        client.send(new WaitHandler('REQ: RELOAD\n', '410'));
        client.send(new WaitHandler('REQ: REREAD\n', '250'));
    }

    const blacklist = () => {
        client.send(new WaitHandler(`REQ: black add "${$selected.NMBR}" ""\n`, '411'));
        client.send(new WaitHandler('REQ: RELOAD\n', '410'));
        client.send(new WaitHandler('REQ: REREAD\n', '250'));
    }

    const getLink = (item: Dictionary<string>) => {
        const text: string = item.NMBR + (item.Topic === 'HUPLOG:' ? ' (hangup)' : '');
        if (item.NAME == "NO NAME")
            return `<a class="text-red-500 hover:text-teal-500" target="_whocalled_" href="https://who-called.co.uk/Number/${item.NMBR}">${text}</a>`;
        return text;
    };

    const formatDate = (date: string) => `${date.slice(2,4)}-${date.slice(0,2)}-${date.slice(4)}`;
    const formatTime = (time: string) => `${time.slice(0,2)}:${time.slice(2)}`;
</script>

<div class="flex text-grey-300">
    <Vscroll width="w-3/4">
        <table class="table table-compact table-zebra">
            <tbody>
                <tr>
                    <th class="w-10"></th>
                    <th class="text-left p-2">Date</th>
                    <th class="text-left p-2">Time</th>
                    <th class="text-left p-2">Number</th>
                    <th class="text-left p-2">Alias</th>
                    <th class="text-left p-2 w-28">ID</th>
                </tr>
        {#each $ncidinfo as data (data.ID)}
            <tr class="hover">
                <th>
                    <button class="btn-xs btn-primary rounded w-8" class:bg-black={data.status === 'black number'} on:click={() => edit(data)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                            <path d="M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm3.83-2.06L4.47 9.76l8-8 1.77 1.77-8 8z"/>
                        </svg>
                    </button>
                </th>
                <td class="text-xs pl-2">{formatDate(data.DATE)}</td>
                <td class="text-xs pl-2">{formatTime(data.TIME)}</td>
                <td class="text-xs pl-2">{@html getLink(data)}</td>
                <td class:text-red-500={data.NAME === "NO NAME"} class="text-xs pl-2">{data.NAME}</td>
                <td class="text-xs pl-2">{data.ID}</td>
            </tr>
        {/each}
            </tbody>
        </table>
    </Vscroll>
    
    <Vscroll width="w-1/4">
        <div>
            <button class="btn-sm btn-secondary rounded" on:click={()=>client.send(new WaitHandler('REQ: REREAD\n', '250'))}>Reread</button>
            <button class="btn-sm btn-accent rounded" on:click={()=>client.send(new WaitHandler('REQ: RELOAD\n', '410'))}>Reload</button>
            <button class="btn-sm btn-accent rounded" on:click={()=>loginfo.set([])}>Clear Log</button>
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

<Modal bind:showModal>
	<h2 slot="header" class="text-orange-500 m-3">
        {$selected !== undefined ? $selected.NAME : ''}
	</h2>

    <form class="flex flex-col m-3" method="dialog">
        <label for="alias" class="text-slate-400 pl-1">Enter new Alias</label>
        <input type="text" id="alias" placeholder="Alias" class="pl-1 m-1 rounded" bind:value={aliasText} />
        <button type="submit" class="btn-primary m-1 rounded" on:click={alias}>Save Alias</button>
        <button type="submit" class="btn-primary m-1 rounded" on:click={blacklist}>Save Blacklist</button>
    </form>
</Modal>

