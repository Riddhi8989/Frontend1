<script>
	import { onMount } from 'svelte';
	import axios from 'axios';

	let stories = [];
	let error = '';

	onMount(async () => {
		try {
			const res = await axios.get('http://127.0.0.1:5000/ai-stories');
			stories = res.data.stories;
		} catch (err) {
			console.error('Error loading stories:', err);
			error = 'Failed to load stories. Please try again later.';
		}
	});
</script>

<svelte:head>
	<title>Real Stories – FailEd</title>
</svelte:head>

<div class="container mt-5">
	<h2 class="text-center mb-4">📖 Real Failures, Real Growth (AI Stories)</h2>

	{#if error}
		<div class="alert alert-danger text-center">{error}</div>
	{:else if stories.length === 0}
		<p class="text-muted text-center">Loading inspiring stories...</p>
	{:else}
		<div class="row row-cols-1 row-cols-md-2 g-4">
			{#each stories as story}
				<div class="col">
					<div class="card shadow-sm h-100">
						<div class="card-body">
							<h5 class="card-title text-primary">{story.title}</h5>
							<p class="card-text" style="white-space: pre-line">{story.story}</p>

							{#if story.tags}
								<div class="mt-3">
									{#each story.tags as tag}
										<span class="badge bg-secondary me-1">{tag}</span>
									{/each}
								</div>
							{/if}
						</div>
						<div class="card-footer text-muted text-end">🤖 AI Generated</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.card {
		border-radius: 12px;
	}
</style>
