<script lang="ts">
    import type { Snippet } from 'svelte';

    type Props = {
        width?: string;
        height?: string;
        children: Snippet;
    };
    let { width = '', height = '', children }: Props = $props();
</script>

<div
    class="
    {width}
    {height}
    flex
    flex-col
    h-full
    m-1
    scrollbar-thin
    scrollbar-thumb-rounded
    scrollbar-track-rounded
    scrollbar-thumb-gray-500
    hover:scrollbar-thumb-gray-600
    scrollbar-track-gray-200
    overflow-auto
    vscroll"
>
    {@render children()}
</div>
