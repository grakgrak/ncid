<script lang="ts">
    export let width:string = "";
</script>

<div class="
 {width}
 flex
 flex-col
 m-1
 scrollbar-thin
 scrollbar-thumb-rounded
 scrollbar-track-rounded
 scrollbar-thumb-gray-500
 hover:scrollbar-thumb-gray-600
 scrollbar-track-gray-200
 overflow-auto
 vscroll">
    <slot></slot>
</div>

<style>
    .vscroll {
        height: calc(100vh - 100px);
    }
</style>