import axios from 'axios';

const API_BASE = 'https://backend1-vwd5.onrender.com';

// 🔐 Auth headers
function getAuthHeaders() {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user && user.token) {
		return {
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		};
	}
	return {};
}

// 📦 Auth
export async function login(email, password) {
	return axios.post(`${API_BASE}/login`, { email, password });
}

export async function register(name, email, password) {
	return axios.post(`${API_BASE}/register`, { name, email, password });
}

// 🤖 AI Features
export async function fetchAiStories() {
	return axios.get(`${API_BASE}/ai-motivation-feed`);
}

export async function fetchAiCareers() {
	return axios.get(`${API_BASE}/ai-careers`);
}

// 👤 Profile
export async function fetchProfile(email) {
	return axios.get(`${API_BASE}/profile`, {
		params: { email }
	});
}

export async function putProfile(data) {
	return axios.put(`${API_BASE}/profile`, data);
}

// ✅ Default export
export default {
	login,
	register,
	fetchAiStories,
	fetchAiCareers,
	fetchProfile,
	putProfile
};
