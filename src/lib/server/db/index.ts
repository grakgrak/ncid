import Database from 'better-sqlite3';
import { TaskState } from '$lib/TaskState';
import type { Task } from './types';

const db = new Database('./data/todo.db', { verbose: console.log });

db.pragma('journal_mode = WAL');
db.prepare(
	`CREATE TABLE IF NOT EXISTS ToDo ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        task TEXT NOT NULL,
        state INTEGER NOT NULL,
        itemOrder REAL NOT NULL);`
).run();

db.prepare(
	`CREATE TABLE IF NOT EXISTS Config ( 
        name TEXT PRIMARY KEY,
        value TEXT NOT NULL);`
).run();

export function getAllTasks(): Task[] {
	const sql = `select id, task, state, itemOrder from todo where state != ${TaskState.DELETED} order by itemOrder`;
	const stmt = db.prepare(sql);
	const tasks = stmt.all();
	return tasks as Task[];
}

export function addTask(newtask: string) {
	const insert = db.prepare(
		`insert into ToDo (id, task, state, itemOrder) values (NULL, ?, ${TaskState.TODO}, 0)`
	);
	insert.run(newtask);

	const ids = db.prepare(`select id from ToDo where state == ${TaskState.TODO}`).all();
	console.log(ids);

	//db.exec(`insert into ToDo (id, task, state, itemOrder) values (NULL, '${newtask}', ${TaskState.TODO}, 0);`);
}

export function removeTask(id: number) {
	const del = db.prepare('delete from ToDo where id = ?');
	del.run(id);

	// db.exec(`delete from ToDo where id = ${id};`);
}

export function setTaskState(id: number, newState: TaskState) {
	const update = db.prepare('update ToDo set state = ? where id = ?');
	update.run(newState, id);

	// db.exec(`update ToDo set state = ${newState} where id = ${id};`);
}

export function renumberTasks(ids: number[]) {
	const update = db.prepare('UPDATE ToDo SET itemOrder = ? WHERE id = ?');

	const updateMany = db.transaction((ids: number[]) => {
		let itemOrder = 0;
		ids.forEach((id) => {
			itemOrder += 1;
			update.run(itemOrder, id);
		});
	});
	updateMany(ids);

	// let itemOrder: number = 0;
	// ids.forEach((id) => {
	//     itemOrder += 1;
	//     update.run(itemOrder, id);
	//     //db.exec(`UPDATE ToDo SET itemOrder = ${itemOrder} WHERE id = ${id};`);
	// })
}

type NV = {
    name:string;
    value:string;
}

export function setConfig( name: string, value: string) {
    db.prepare(
		'UPDATE Config SET value = @value WHERE name = @name'
	).run({name, value});
}

export function getConfig(name: string): string {
    const row = db.prepare(
		'SELECT value FROM Config WHERE name = @name'
	).get({name}) as { value:string };

    return row.value;
}

export function getAllConfig(): NV[] {
    return db.prepare(
		'SELECT name, value FROM Config'
	).all() as NV[];
}