import type { PageServerLoad } from './$types';
 
import { json, error } from "@sveltejs/kit";

import Database from "better-sqlite3";
import fs from "node:fs";

export const load = (({ params:any }) => {
    let db = new Database(fs.readFileSync("superheroes.db"));

    const query = "aqua";

    if (!query) {
        throw error(401, "Query (`?q=`) is required");
    }
    const stmt = db.prepare("select * from superheroes where name like ?");
  
    return {
        post: stmt.all(`%${query}%`)
    };
}) satisfies PageServerLoad;