<script lang="ts">
    import "../app.css";

	export let showModal: boolean = false; // boolean

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
    class="rounded-lg text-white"
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
        <button class="btn-xs absolute right-0 top-0 w-7" on:click={() => dialog.close()}>
            <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"/>
            </svg>
        </button>
		<slot name="header" />
		<hr />
		<slot />
	</div>
</dialog>

<style>
	/* dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0 8pt;
	} */
	/* dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	} */
	/* dialog > div {
		padding: 0 1em 1.5em 1em;
	} */
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
