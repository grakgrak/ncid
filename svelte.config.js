import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter()
	},
    csrf: {
            trustedOrigins: [
                'http://127.0.0.1:3000',
                'http://localhost:3000',
                'http://127.0.0.1:3001',
                'http://localhost:3001',
                'http://localhost:5173',
                'http://localhost:5174']
        },
};

export default config;
