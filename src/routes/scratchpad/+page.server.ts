import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';

import Database from 'better-sqlite3';

export const load:PageServerLoad = async () => {
	const db = new Database("./data/" + 'superheroes.db', { verbose: console.log });

	const query = 'aqua';

	if (!query) {
		error(401, 'Query (`?q=`) is required');
	}
	const stmt = db.prepare('select * from superheroes where name like ?');

	return {
		post: stmt.all(`%${query}%`)
	};
};
