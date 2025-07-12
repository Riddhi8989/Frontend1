<script>
	import { onMount } from 'svelte';
	import axios from 'axios';

	let input = '';
	let result = '';
	let error = '';
	let user = null;

	onMount(() => {
		const stored = localStorage.getItem('user');
		if (stored) {
			user = JSON.parse(stored);
		}
	});

	async function getGuidance() {
		error = '';
		result = '';

		if (!user?.email || !input.trim()) {
			error = 'Login and input required';
			return;
		}

		try {
			const res = await axios.post('https://backend1-vwd5.onrender.com/ai-guidance', {
				text: input,
				email: user.email
			});
			result = res.data.result;
		} catch (err) {
			error = err.response?.data?.error || 'AI request failed.';
		}
	}
</script>

<section class="min-vh-100 bg-light py-5 px-3 d-flex justify-content-center align-items-start">
	<div class="container" style="max-width: 800px;">
		<div class="card shadow border-primary">
			<div class="card-body p-4">
				<h2 class="card-title text-center text-primary fw-bold mb-3">🤖 AI Career Guidance</h2>
				<p class="text-muted text-center mb-4">Describe your current challenge or goal and receive advice from our AI assistant.</p>

				{#if error}
					<div class="alert alert-danger text-center">{error}</div>
				{/if}

				<div class="mb-3">
					<textarea
						class="form-control"
						bind:value={input}
						rows="4"
						placeholder="e.g., I failed UPSC twice and feel lost. What should I do next?"
					></textarea>
				</div>

				<div class="text-center mb-4">
					<button on:click={getGuidance} class="btn btn-primary px-4 fw-semibold">
						Get AI Advice
					</button>
				</div>

				{#if result}
					<div class="alert alert-info">
						<h5 class="text-primary fw-semibold mb-2">💬 AI Response:</h5>
						<p class="mb-0 whitespace-pre-line">{result}</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
