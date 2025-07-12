// src/lib/stores.js
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const user = writable(null);
export const token = writable('');

if (browser) {
	// Restore user
	const storedUser = localStorage.getItem('user');
	if (storedUser) {
		user.set(JSON.parse(storedUser));
	}

	// Restore token
	const storedToken = localStorage.getItem('token');
	if (storedToken) {
		token.set(storedToken);
	}

	// Persist user to localStorage
	user.subscribe((value) => {
		if (value) {
			localStorage.setItem('user', JSON.stringify(value));
		} else {
			localStorage.removeItem('user');
		}
	});

	// Persist token to localStorage
	token.subscribe((value) => {
		if (value) {
			localStorage.setItem('token', value);
		} else {
			localStorage.removeItem('token');
		}
	});
}
