<script lang="ts">
	type Props = {
		href?: string;
		target?: string;
		class?: string;
		children: any;
	};
	let { href, target, class: _class, children }: Props = $props();
</script>

<a class="{_class} p-1 hover:bg-teal-500 hover:text-white rounded" {href} {target}>
	{@render children()}
</a>
