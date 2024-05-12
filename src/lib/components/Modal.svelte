<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../../app.css';

	type Props = {
		showModal: boolean;
		header?: Snippet;
		children: any;
	};

	let { showModal = $bindable(false), header, children }: Props = $props();
	let dialog: HTMLDialogElement;

	$effect(() => {
		if (dialog && showModal) dialog.showModal();
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	class="p-5 rounded-lg"
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={() => dialog.close()}
>
	<div>
		<div
			class="absolute m-1 right-0 top-0 w-5 focus:outline-none hover:bg-neutral-content rounded-sm"
			onclick={(ev:Event) => {ev.stopPropagation(); dialog.close()}}
		>
			<svg
				width="20"
				height="20"
				viewBox="0 0 16 16"
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"
				/>
			</svg>
		</div>
		{#if header}
			{@render header()}
		{/if}
		<hr />
		{@render children()}
	</div>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
