import type { PageServerLoad } from './$types';
import { DB_PATH } from '$env/static/private';

import { error } from '@sveltejs/kit';

import Database from 'better-sqlite3';

export const load = (() => {
	const db = new Database(DB_PATH + 'superheroes.db', { verbose: console.log });

	const query = 'aqua';

	if (!query) {
		throw error(401, 'Query (`?q=`) is required');
	}
	const stmt = db.prepare('select * from superheroes where name like ?');

	return {
		post: stmt.all(`%${query}%`)
	};
}) satisfies PageServerLoad;
