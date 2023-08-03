import type { Actions, PageServerLoad } from './$types';

import { addTask, getAllTasks, renumberTasks, setTaskState } from '$lib/server/db';

import { TaskState } from '$lib/TaskState';

export const load: PageServerLoad = async () => {
	return {
		tasks: getAllTasks()
	};
};

export const actions = {
	newtask: async ({ request }) => {
		const data: FormData = await request.formData();
		const task = String(data.get('task'));
		addTask(String(task));

		return { success: true };
	},

	removeTask: async ({ request }) => {
		const data: FormData = await request.formData();
		const id = Number(data.get('id'));
		setTaskState(Number(id), TaskState.DELETED);
	},

	updateState: async ({ request }) => {
		const data: FormData = await request.formData();
		const id = Number(data.get('id'));
		const state = Number(data.get('state'));

		setTaskState(Number(id), Number(state));
	},

	renumberTasks: async ({ request }) => {
		const data: FormData = await request.formData();
		const ids = data.get('ids');
		renumberTasks(JSON.parse(String(ids) ?? '[]'));
	}
} satisfies Actions;
