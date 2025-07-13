// src/lib/stores.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const user = writable(null);
export const token = writable('');

if (browser) {
	// Run in browser only
	import('svelte').then(({ onMount }) => {
		onMount(() => {
			const storedUser = localStorage.getItem('user');
			if (storedUser) user.set(JSON.parse(storedUser));

			const storedToken = localStorage.getItem('token');
			if (storedToken) token.set(storedToken);

			user.subscribe((value) => {
				if (value) {
					localStorage.setItem('user', JSON.stringify(value));
				} else {
					localStorage.removeItem('user');
				}
			});

			token.subscribe((value) => {
				if (value) {
					localStorage.setItem('token', value);
				} else {
					localStorage.removeItem('token');
				}
			});
		});
	});
}
