<script lang="ts">
	import Modal from "./modal.svelte";
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
            return `<a target="_whocalled_" href="https://who-called.co.uk/Number/${item.NMBR}">${text}</a>`;
        return text;
    };

    const formatDate = (date: string) => `${date.slice(2,4)}-${date.slice(0,2)}-${date.slice(4)}`;
    const formatTime = (time: string) => `${time.slice(0,2)}:${time.slice(2)}`;
</script>

<div class="pure-g main">
    <div class="pure-u-3-4 vscroll">
        <table class="pure-table-striped">
            <tbody>
                <tr>
                    <th style="width: 40px"></th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Number</th>
                    <th>Alias</th>
                    <th style="width: 120px">ID</th>
                </tr>
        {#each $ncidinfo as data (data.ID)}
            <tr>
                <td>
                    <button class="pure-button button-success" class:button-black={data.status === 'black number'} on:click={() => edit(data)}>Edit</button>
                </td>
                <td class="text">{formatDate(data.DATE)}</td>
                <td class="text">{formatTime(data.TIME)}</td>
                <td class="text">{@html getLink(data)}</td>
                <td class:noname={data.NAME === "NO NAME"} class="text">{data.NAME}</td>
                <td class="text">{data.ID}</td>
            </tr>
        {/each}
            </tbody>
        </table>
    </div>
    
    <div class="pure-u-1-4 vscroll">
        <div class="pure-g buttons">
            <button class="pure-button button-success" on:click={()=>client.send(new WaitHandler('REQ: REREAD\n', '250'))}>Reread</button>
            <button class="pure-button button-secondary" on:click={()=>client.send(new WaitHandler('REQ: RELOAD\n', '410'))}>Reload</button>
            <button class="pure-button button-secondary" on:click={()=>loginfo.set([])}>Clear Log</button>
        </div>
        <table class="pure-table otherTable">
            <tbody>
                {#each $loginfo as log}
                    <tr>
                        <td class="text">{log}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<Modal bind:showModal>
	<h2 slot="header">
        {$selected !== undefined ? $selected.NAME : ''}
	</h2>

    <form class="pure-form-stacked" method="dialog">
        <label for="alias">Enter new Alias</label>
        <input type="text" id="alias" placeholder="Alias" bind:value={aliasText} />
        <button type="submit" class="pure-button button-primary" on:click={alias}>Save Alias</button>
        <button type="submit" class="pure-button button-primary" on:click={blacklist}>Save Blacklist</button>
    </form>
</Modal>

<style>
.main { margin-top: 4px;}
.text {
    font-size: small;
    font-weight: 600;
    padding: 1px 8px;
}
.noname {
    font-size: small;
    font-weight: 600;
    padding: 1px 8px;
    color: darkred;
}

.button-black,
.button-success,
.button-primary,
.button-secondary {
    color: white;
    border-radius: 5px;
    padding: 4px 16px;
    margin: 1px 4px 1px 0;
    font-size: 80%;
}

.button-secondary {
    background: rgb(207, 94, 19);
}

.button-success,
.button-primary {
    background: rgb(28, 184, 65);
}

.button-black {
    background: black;
}

.vscroll {
    overflow: auto;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 100px);
}

/* .header {
    border-radius: 5pt;
    background-color: silver;
    padding: 16px;
    margin: 0;
}

.timestamp {
    margin-left: 20em;
    color:blueviolet;
    font-size: large;
} */

::-webkit-scrollbar-track
{
	background-color: rgb(192, 192, 192);
	border-radius: 10px;
}

::-webkit-scrollbar
{
	width: 10px;
	background-color: rgb(222, 226, 234);
}

::-webkit-scrollbar-thumb
{
	border-radius: 10px;
    background-color: rgb(104, 101, 101);
}

th {
    text-align: left;
    padding-left: 8px;
}
</style>