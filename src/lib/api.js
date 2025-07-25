const BASE_URL = 'https://backend1-vwd5.onrender.com';

export async function signup(data) {
	const res = await fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error('Signup failed');
	return res.json();
}

export async function login(data) {
	const res = await fetch(`${BASE_URL}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error('Login failed');
	return res.json();
}

export async function fetchUser(email) {
	const res = await fetch(`${BASE_URL}/user?email=${encodeURIComponent(email)}`);
	if (!res.ok) throw new Error('User fetch failed');
	return res.json();
}

export async function fetchCareerPaths(keyword) {
	try {
		const res = await fetch(`${BASE_URL}/ai-career?keyword=${encodeURIComponent(keyword)}`);
		if (!res.ok) throw new Error('Career fetch failed');
		return await res.json();
	} catch (err) {
		console.error('Career API Error:', err);
		return [];
	}
}

export async function fetchAICareers(keyword) {
	try {
		const res = await fetch(`${BASE_URL}/ai-career?keyword=${encodeURIComponent(keyword)}`);
		if (!res.ok) throw new Error('AI Career fetch failed');
		return await res.json();
	} catch (err) {
		console.error('AI Career Fetch Error:', err);
		return { careers: [] };
	}
}

export async function fetchProfile(email) {
	const res = await fetch(`${BASE_URL}/user?email=${encodeURIComponent(email)}`);
	if (!res.ok) throw new Error('Profile fetch failed');
	return res.json();
}

export async function putProfile(data) {
	const res = await fetch(`${BASE_URL}/update-profile`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});
	if (!res.ok) throw new Error('Profile update failed');
	return res.json();
}

export { BASE_URL };
