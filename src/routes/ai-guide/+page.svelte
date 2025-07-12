<script>
	import axios from 'axios';
	import { onMount } from 'svelte';

	let prompt = '';
	let answer = '';
	let loading = false;
	let error = '';

	const askMentor = async () => {
		if (!prompt.trim()) return;
		loading = true;
		error = '';
		answer = '';

		try {
			const res = await axios.post('https://backend1-vwd5.onrender.com/ai-guide', { prompt });
			answer = res.data.answer || 'No answer received.';
		} catch (err) {
			console.error('AI Guide Error:', err);
			error = 'Failed to get AI response. Try again.';
		} finally {
			loading = false;
		}
	};
</script>

<svelte:head>
	<title>AI Guide – FailEd</title>
</svelte:head>

<div class="container mt-5">
	<h1 class="text-center mb-4">🧠 AI Mentor Guide</h1>

	<div class="mb-3">
		<label for="prompt" class="form-label">Ask your question:</label>
		<input
			type="text"
			id="prompt"
			class="form-control"
			bind:value={prompt}
			placeholder="e.g. How can I restart my career after failing exams?" />
	</div>

	<button class="btn btn-primary" on:click={askMentor} disabled={loading}>
		{#if loading}⏳ Thinking...{/if}
		{#if !loading}🎯 Ask AI Mentor{/if}
	</button>

	{#if error}
		<div class="alert alert-danger mt-3">{error}</div>
	{/if}

	{#if answer}
		<div class="alert alert-success mt-4">
			<strong>AI Mentor says:</strong>
			<p>{answer}</p>
		</div>
	{/if}
</div>
