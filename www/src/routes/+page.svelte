<script lang="ts">
	import Modal from "./modal.svelte";
	import { onMount } from "svelte";
    import { loginfo, ncid, selected, type Dictionary } from './store';
    import { ncidClient } from './ncidClient';

    let showModal: boolean = false;
    let client: any;

    onMount(()=>{
        client = ncidClient('ws://127.0.0.1:8080/ws');
        return client.close;
    })

    const getLink = (item: Dictionary<string>) => {
        const text: string = item.NMBR + (item.Topic === 'HUPLOG:' ? ' (hangup)' : '');
        if (item.NAME == "NO NAME")
            return '<a target="_whocalled_" href="' + 'https://who-called.co.uk/Number/' + item.NMBR + '">' + text + '</a>';
        return text;
    };

    const rereadServer = () => {
        client.send("REQ: REREAD" + "\n")
    }

    const reloadServer = () => {
        fetch('http://localhost:8080/ncid/reload')
        .then((resp) => client.send("REQ: REREAD" + "\n"))
    }

    const edit = (item: Dictionary<string>) => {
        $selected = item;
        showModal = true;
    }

    const blacklist = () => {
        fetch('http://localhost:8080/ncid/blacklist/' + $selected.NAME + '/' + $selected.NMBR)
            .then((resp) => resp.text())
            .then((text) => alert(text));
    }

    const info = () => {
        fetch('http://localhost:8080/ncid/info/' + $selected.NAME + '/' + $selected.NMBR)
            .then((resp) => resp.text())
            .then((text) => alert(text));
    }

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
                </tr>
        {#each $ncid as data}
            <tr>
                <td>
                    <button class="pure-button button-success" class:button-black={data.status === 'black number'} on:click={() => edit(data)}>Edit</button>
                </td>
                <td class="text">{data.DATE}</td>
                <td class="text">{data.TIME}</td>
                <td class="text">{@html getLink(data)}</td>
                <td class:noname={data.NAME === "NO NAME"} class="text">{data.NAME}</td>
            </tr>
        {/each}
            </tbody>
        </table>
    </div>
    <div class="pure-u-1-4 vscroll">
        <div class="pure-g buttons">
            <button class="pure-button button-success" on:click={rereadServer}>Reread</button>
            <button class="pure-button button-secondary" on:click={reloadServer}>Reload</button>
        </div>
        <table class="pure-table otherTable">
            <tbody>
                {#each $loginfo as log}
                    <tr>
                        <td class="text">{log.Topic}</td>
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
        <input type="text" id="alias" placeholder="Alias" />
        <button type="submit" class="pure-button button-primary">Save Alias</button>
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
</style>