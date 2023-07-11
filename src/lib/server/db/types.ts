import type { TaskState } from "$lib/TaskState";

export type Task = {
    id: number;
    task: string;
    state: TaskState;
    itemOrder: string;
};