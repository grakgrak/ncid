import Database from 'better-sqlite3';
import { DB_PATH } from '$env/static/private';
import { TaskState } from '$lib/TaskState';
import type { Task } from './types';

const db = new Database(DB_PATH + 'todo.db', { verbose: console.log });

db.pragma('journal_mode = WAL');
console.log('Create DB', db.prepare(
    `CREATE TABLE IF NOT EXISTS ToDo ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        state INTEGER NOT NULL,
        itemOrder REAL NOT NULL);`
    ).run());

export function getAllTasks(): Task[] {
    const sql = `select id, task, state, itemOrder from todo where state != ${TaskState.DELETED} order by itemOrder`;
    const stmt = db.prepare(sql);
    const tasks = stmt.all();
    return tasks as Task[];
}

export function updateAllTasks(tasks: Task[]) {
    let itemOrder: number = 0;
    tasks.forEach((t) => {
        db.exec(`UPDATE ToDo
        SET task = ${t.task}, state = ${t.state}, itemOrder = ${itemOrder}
        WHERE id = ${t.id};`);
        itemOrder += 1;
    });
}

export function addTask(newtask: string) {
    db.exec(`insert into ToDo (id, task, state, itemOrder) values (NULL, '${newtask}', ${TaskState.TODO}, 0.0);`);
}

export function removeTask(id: number) {
    db.exec(`delete from ToDo where id = ${id};`);
}

export function setTaskState(id: number, newState: TaskState) {
    db.exec(`update ToDo set state = ${newState} where id = ${id};`);
}

export function renumberTasks(ids: number[]) {
    let itemOrder: number = 0;
    ids.forEach((id) => {
        db.exec(`UPDATE ToDo SET itemOrder = ${itemOrder} WHERE id = ${id};`);
        itemOrder += 1;
    })
}
