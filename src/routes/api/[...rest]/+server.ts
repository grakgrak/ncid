import { getAllConfig, getConfig, setConfig } from "$lib/server/db";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ url }) => {

    switch (url.pathname) {
        case '/api/setConfig':
            {
                const name = url.searchParams.get('name');
                const value = url.searchParams.get('value');

                if (name && value) {
                    console.log(name, value);
                    setConfig(name, value);
                }
                return json({ status: 200, body: '' });
            }
        case '/api/getConfig':
            {
                const name = url.searchParams.get('name') ?? '';
                return json({ status: 200, body: getConfig(name) });
            }
        case '/api/getAllConfig':
            return json({ status: 200, body: getAllConfig() });
        default:
            return json({ status: 404, body: 'Not Found.' });
    }
};