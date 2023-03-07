<script lang="ts">
    import {timestamp} from './store';

</script>
<h2 class="header">NCID Caller ID<span class="timestamp">{$timestamp}</span></h2>
<slot></slot>
<style>
    .header {
        border-radius: 5pt;
        background-color: silver;
        padding: 16px;
        margin: 0;
    }

    .timestamp {
        margin-left: 20em;
        color:blueviolet;
        font-size: large;
    }
</style>    