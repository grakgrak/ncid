<script lang="ts">
	export let href = '';
	export let target = '';
</script>

<a class="p-1 hover:bg-teal-500 hover:text-white rounded" {href} {target}>
	<slot />
</a>
