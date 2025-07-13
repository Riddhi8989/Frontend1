import adapter from '@sveltejs/adapter-auto';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$lib: path.resolve('src/lib') // 👈 Add this line to fix the error
		}
	}
};

export default config;
