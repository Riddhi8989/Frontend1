<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import axios from 'axios';

	let email = '';
	let password = '';
	let error = '';

	const handleLogin = async () => {
		error = '';
		try {
			const res = await axios.post('http://127.0.0.1:5000/login', {
				email: email.toLowerCase(),
				password
			});

			localStorage.setItem('user', JSON.stringify(res.data.user));
			user.set(res.data.user);
			goto('/dashboard');
		} catch (err) {
			error = err.response?.data?.error || '❌ Login failed. Please try again.';
		}
	};
</script>

<div class="container mt-5">
	<div class="row justify-content-center">
		<div class="col-md-6">
			<div class="card shadow">
				<div class="card-body p-4">
					<h2 class="text-center text-primary mb-4">Login</h2>

					{#if error}
						<div class="alert alert-danger text-center">{error}</div>
					{/if}

					<form on:submit|preventDefault={handleLogin} autocomplete="off">
						<div class="mb-3">
							<label for="email" class="form-label">Email address</label>
							<input
								id="email"
								type="email"
								class="form-control"
								bind:value={email}
								required
								placeholder="you@example.com"
							/>
						</div>

						<div class="mb-3">
							<label for="password" class="form-label">Password</label>
							<input
								id="password"
								type="password"
								class="form-control"
								bind:value={password}
								required
								placeholder="••••••••"
							/>
						</div>

						<button class="btn btn-primary w-100" type="submit">Login</button>
					</form>

					<p class="text-center mt-3 text-muted">
						Don't have an account?
						<a href="/register" class="text-decoration-none">Register here</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
