<script lang="ts">
	import '../../app.css';
	import { flip } from 'svelte/animate';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import type { Task } from '$lib/server/db/types';
	import type { PageServerData } from './$types';
	import { TaskState } from '$lib/TaskState';

	export let data: PageServerData;

	const flipDurationMs = 200;
	const columnTitles = ['Todo', 'In progress', 'Done'];

	async function updateState(id: number, state: TaskState) {
		const data = new FormData();
		data.append('id', String(id));
		data.append('state', String(state));

		const response = await fetch('?/updateState', {
			method: 'POST',
			body: data
		});

		const result = await response.json();
		console.log(result);
	}

	async function updateItemOrder(tasks: Task[]) {
		const data = new FormData();
		const ids = tasks.map((t) => t.id);
		data.append('ids', JSON.stringify(ids));

		const response = await fetch('?/renumberTasks', {
			method: 'POST',
			body: data
		});

		const result = await response.json();
		console.log(result);
	}

	function handleConsider(e: CustomEvent<DndEvent<Task>>, state: TaskState): void {
		taskList[state] = e.detail.items;
	}

	function handleFinalize(e: CustomEvent<DndEvent<Task>>, state: TaskState): void {
		const list = e.detail.items;
		// update the tasks state if needed
		list.forEach((item) => {
			if (item.state !== state) {
				item.state = state;
				updateState(item.id, state);
			}
		});
		// renumber the tasks in the list
		console.log('Finalize', list);
		updateItemOrder(list);
		taskList[state] = list;
	}

	let newItem = '';
	let taskList: Task[][] = [
		data.tasks.filter((t) => t.state === TaskState.TODO),
		data.tasks.filter((t) => t.state === TaskState.INPROGRESS),
		data.tasks.filter((t) => t.state === TaskState.DONE)
	];

	console.log('Tasks', data.tasks);
</script>

<svelte:head>
	<title>To do</title>
	<meta name="description" content="To do list" />
</svelte:head>

<form method="POST" action="?/newtask">
	<input
		name="task"
		class="m-3 p-1 w-96"
		bind:value={newItem}
		type="text"
		placeholder="new todo item.."
		autofocus
	/>
	<button class="btn-sm btn-primary">Add</button>
</form>

<div class="h-full overflow-hidden flex flex-row">
	{#each taskList as list, idx}
		<div class="h-full flex flex-col w-1/3">
			<h1 class="text-2xl font-bold ml-2">{columnTitles[idx]}</h1>
			<section
				class="flex flex-col bg-slate-600 p-1 m-1 h-full rounded-md overflow-y-auto scrollbar-thin scrollbar-track-rounded hover:scrollbar-thumb-slate-500 scrollbar-thumb-rounded scrollbar-thumb-gray-600 scrollbar-track-gray-200"
				use:dndzone={{ items: list, flipDurationMs }}
				on:consider={(e) => handleConsider(e, idx)}
				on:finalize={(e) => handleFinalize(e, idx)}
			>
				{#each list as item (item.id)}
					<div class="card bg-slate-700 m-2" animate:flip={{ duration: flipDurationMs }}>
						<form class="m-3 card-title" method="POST" action="?/updateState">
							<span
								class="w-full decoration-red-500"
								class:line-through={item.state === TaskState.DONE}>{item.task}</span
							>
							<button type="submit" formaction="?/removeTask">❌</button>
							<input type="hidden" name="id" value={item.id} />
						</form>
					</div>
				{/each}
			</section>
		</div>
	{/each}
</div>
