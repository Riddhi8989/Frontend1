<script>
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { user } from '$lib/stores';
	import { goto } from '$app/navigation';

	let email = '';
	let profile = null;
	let career = null;
	let quote = '';
	let error = '';

	const API_BASE = 'https://failed-2.onrender.com';

	$user;

	onMount(async () => {
		email = $user?.email;

		if (!email) {
			error = 'Please log in to view your dashboard.';
			goto('/login');
			return;
		}

		try {
			const res = await axios.get(`${API_BASE}/me?email=${email}`);
			profile = res.data.user;

			if (profile?.career_title) {
				career = {
					title: profile.career_title,
					description: profile.career_description,
					steps: profile.career_steps || [],
					pitfalls: profile.career_pitfalls || [],
					resources: profile.career_resources || []
				};
			} else {
				const qres = await axios.post(`${API_BASE}/ai-quote`, {
					prompt: 'Give a short motivational quote for a failed student'
				});
				quote = qres.data.quote;
			}
		} catch (err) {
			console.error('Dashboard Error:', err);
			error = 'Failed to load dashboard. Please try again.';
		}
	});
</script>

<svelte:head>
	<title>Dashboard – FailEd</title>
</svelte:head>

<div class="container mt-5 text-center">
	{#if error}
		<div class="alert alert-danger">{error}</div>
	{:else if !profile}
		<p class="text-muted">Loading your dashboard...</p>
	{:else}
		<h1 class="mb-3">Welcome, {profile.name} 👋</h1>

		{#if career}
			<div class="card p-4 text-start shadow-sm mb-4">
				<h3 class="text-primary">🎯 Your Career Path: {career.title}</h3>
				<p class="text-muted">{career.description}</p>

				<h5 class="mt-3 text-success fw-semibold">📌 Steps to Follow</h5>
				<ul>{#each career.steps as step}<li>{step}</li>{/each}</ul>

				<h5 class="mt-3 text-warning fw-semibold">⚠️ Common Pitfalls</h5>
				<ul>{#each career.pitfalls as pit}<li>{pit}</li>{/each}</ul>

				<h5 class="mt-3 text-info fw-semibold">📚 Free Resources</h5>
				<ul>
					{#each career.resources as res}
						<li><a href={res} target="_blank" rel="noopener noreferrer" class="text-decoration-none">{res}</a></li>
					{/each}
				</ul>

				<button class="btn btn-outline-primary mt-3" on:click={() => goto('/career-paths')}>
					🔁 Change Career
				</button>
			</div>
		{:else}
			<div class="card p-4 shadow-sm bg-light mb-4">
				<h3 class="text-secondary">💡 Motivation for You</h3>
				<blockquote class="blockquote mt-3">
					<p>{quote}</p>
				</blockquote>

				<button class="btn btn-primary mt-3" on:click={() => goto('/career-paths')}>
					🔍 Explore Careers
				</button>
			</div>
		{/if}

		<button class="btn btn-outline-dark" on:click={() => goto('/ai-guide')}>
			🧠 Ask AI Mentor
		</button>
	{/if}
</div>

<style>
	.card {
		border-radius: 15px;
	}
</style>
