<script lang="ts">
    export let href:string = "";
    export let target:string = "";
</script>

<a class="p-1 hover:bg-teal-500 hover:text-white rounded" target={target} href={href}>
    <slot></slot>
</a>
