import type { Actions, PageServerLoad } from './$types';

import {addTask, getAllTasks, removeTask, renumberTasks, setTaskState} from '$lib/server/db';
import { TaskState } from '$lib/TaskState';

export const load = (({ params:any }) => {
    return {
        tasks: getAllTasks()
    };
}) satisfies PageServerLoad;


export const actions = {

    newtask: async ({ request }) => {
        const data: FormData = await request.formData();
        const task = data.get('task');
        addTask( String(task));
        return { success: true };
    },

    removeTask: async ({request}) => {
        const data: FormData = await request.formData();
        const id = data.get('id');
        setTaskState( Number(id), TaskState.DELETED);
    },

    updateState: async ({request}) => {
        const data: FormData = await request.formData();
        const id = data.get('id');
        const state = data.get('state');
        setTaskState( Number(id), Number(state));
    },

    renumberTasks: async ({request}) => {
        const data: FormData = await request.formData();
        const ids = data.get('ids');
        renumberTasks(JSON.parse(String(ids) ?? "[]"));
    }
} satisfies Actions;
