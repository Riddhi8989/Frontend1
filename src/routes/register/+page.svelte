<script>
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import axios from 'axios';

	let name = '';
	let email = '';
	let password = '';
	let bio = '';
	let error = '';
	let success = '';

	const handleRegister = async () => {
		error = '';
		success = '';

		try {
			const res = await axios.post('http://127.0.0.1:5000/register', {
				name,
				email: email.toLowerCase(),
				password,
				bio
			});

			localStorage.setItem('user', JSON.stringify(res.data.user));
			user.set(res.data.user);
			success = '✅ Registration successful! Redirecting to Login...';

			// Optional: reset form
			name = '';
			email = '';
			password = '';
			bio = '';

			setTimeout(() => goto('/login'), 1500);
		} catch (err) {
			error = err.response?.data?.error || '❌ Registration failed';
		}
	};
</script>

<div class="container mt-5">
	<div class="row justify-content-center">
		<div class="col-md-6">
			<div class="card shadow">
				<div class="card-body p-4">
					<h2 class="text-center text-primary mb-4">Register</h2>

					{#if error}
						<div class="alert alert-danger text-center">{error}</div>
					{/if}
					{#if success}
						<div class="alert alert-success text-center">{success}</div>
					{/if}

					<form on:submit|preventDefault={handleRegister} autocomplete="off">
						<div class="mb-3">
							<label for="name" class="form-label">Name</label>
							<input id="name" class="form-control" bind:value={name} required placeholder="Your full name" />
						</div>

						<div class="mb-3">
							<label for="email" class="form-label">Email</label>
							<input id="email" class="form-control" type="email" bind:value={email} required placeholder="example@email.com" />
						</div>

						<div class="mb-3">
							<label for="password" class="form-label">Password</label>
							<input id="password" class="form-control" type="password" bind:value={password} required placeholder="Choose a password" />
						</div>

						<div class="mb-3">
							<label for="bio" class="form-label">Bio</label>
							<textarea id="bio" class="form-control" bind:value={bio} rows="3" placeholder="Tell us something about yourself..."></textarea>
						</div>

						<button type="submit" class="btn btn-primary w-100">Register</button>
					</form>

					<p class="text-center mt-3 text-muted">
						Already registered? <a href="/login" class="text-decoration-none">Login</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
