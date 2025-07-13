<script>
	import { onMount } from 'svelte';
	import { fetchCareerPaths } from '$lib/api.js';
	import { user } from '$lib/stores';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';

	let careers = [];
	let error = '';
	let loading = true;
	let field = 'technology';
	let keyword = '';

	onMount(async () => {
		await loadCareerSuggestions();
	});

	const loadCareerSuggestions = async () => {
		loading = true;
		error = '';
		careers = [];

		try {
			const data = await fetchCareerPaths(keyword || field);
			if (Array.isArray(data) && data.length > 0) {
				careers = data;
			} else {
				error = 'No valid career suggestions received from AI.';
			}
		} catch (err) {
			console.error('Career Fetch Error:', err);
			error = 'Failed to load career suggestions.';
		} finally {
			loading = false;
		}
	};

	const selectCareer = async (career) => {
		try {
			const u = get(user);
			if (!u || !u.email) {
				alert('User not found. Please login again.');
				goto('/login');
				return;
			}

			const res = await fetch('https://backend1-vwd5.onrender.com/save-career', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: u.email,
					title: career.title,
					description: career.description,
					steps: career.steps,
					pitfalls: career.pitfalls,
					resources: career.resources
				})
			});

			if (res.ok) {
				alert('🎉 Career saved successfully!');
				goto('/dashboard');
			} else {
				throw new Error('Failed to save');
			}
		} catch (err) {
			console.error('Save Career Error:', err);
			alert('❌ Error saving career to your profile.');
		}
	};
</script>

<svelte:head>
	<title>Career Suggestions</title>
</svelte:head>

<style>
	.text-gradient {
		background: linear-gradient(to right, #3b82f6, #06b6d4);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
</style>

<div class="container py-5">
	<!-- Hero Section -->
	<section class="bg-light rounded-4 shadow-sm p-5 mb-5 text-center">
		<h1 class="fw-bold display-4 text-gradient mb-3">
			🚀 Explore Your Career Possibilities
		</h1>
		<p class="lead text-secondary">
			AI-curated paths for <span class="fw-semibold text-dark">dreamers</span>,
			<span class="fw-semibold text-dark">doers</span>, and
			<span class="fw-semibold text-dark">comeback champions</span> 🎓
		</p>
		<p class="mb-4 text-muted small">
			Whether you stumbled or soared in school — your next chapter starts here.
		</p>

		<h5 class="fw-semibold mb-3 text-dark">
			✨ Choose a field or search your passion — we’ll uncover hidden gems for you!
		</h5>

		<div class="d-flex flex-wrap justify-content-center align-items-center gap-3">
			<select
				bind:value={field}
				class="form-select rounded-pill px-4 py-2 border-primary text-primary fw-bold shadow-sm w-auto"
			>
				<option value="technology">💻 Technology — Build the Future</option>
				<option value="design">🎨 Design — Shape the World</option>
				<option value="art">🖌️ Art — Express & Inspire</option>
				<option value="business">📊 Business — Lead & Grow</option>
				<option value="general">🌈 General — Explore All Possibilities</option>
			</select>

			<input
				bind:value={keyword}
				placeholder="Or type your interest (e.g., AI, photography)..."
				class="form-control rounded-pill px-4 w-auto"
				style="min-width: 300px"
			/>

			<button
				class="btn btn-outline-primary rounded-pill px-4 fw-semibold shadow-sm"
				on:click={loadCareerSuggestions}
			>
				🔍 Discover Careers
			</button>
		</div>
	</section>

	<!-- Loading / Error / Results -->
	{#if loading}
		<div class="text-center my-5">
			<div class="spinner-border text-primary" role="status"></div>
			<p class="mt-3 text-muted">Fetching career ideas just for you... ✨</p>
		</div>
	{:else if error}
		<div class="alert alert-danger text-center">{error}</div>
	{:else}
		<div class="row row-cols-1 row-cols-md-2 g-4">
			{#each careers as c}
				<div class="col">
					<div class="card h-100 shadow-sm border-0 rounded-4">
						<div class="card-body">
							<h5 class="card-title text-primary fw-bold">🎯 {c.title}</h5>
							<p class="card-text text-muted mb-3">{c.description}</p>

							<h6 class="mt-3 text-success fw-semibold">📌 Steps to Follow</h6>
							<ul>{#each c.steps as step}<li>{step}</li>{/each}</ul>

							<h6 class="mt-3 text-warning fw-semibold">⚠️ Common Pitfalls</h6>
							<ul>{#each c.pitfalls as p}<li>{p}</li>{/each}</ul>

							<h6 class="mt-3 text-info fw-semibold">📚 Free Resources</h6>
							<ul>
								{#each c.resources as r}
									<li>
										<a href={r} target="_blank" rel="noopener noreferrer" class="text-decoration-none">
											{r}
										</a>
									</li>
								{/each}
							</ul>

							<div class="text-end mt-4">
								<button class="btn btn-primary rounded-pill px-4 fw-semibold" on:click={() => selectCareer(c)}>
									💾 Save this Career
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
