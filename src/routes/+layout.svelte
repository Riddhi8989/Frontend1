<script>
	import { user } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import 'bootstrap/dist/css/bootstrap.min.css';
	import 'bootstrap-icons/font/bootstrap-icons.css';



	let currentPath = '';
	let currentUser = null;

	// Auto-load path and user on client
	onMount(async () => {
		if (browser) {
			currentUser = JSON.parse(localStorage.getItem('user') || 'null');
			currentPath = window.location.pathname;
			await import('bootstrap/dist/js/bootstrap.bundle.min.js');
		}
	});

	const logout = () => {
		localStorage.removeItem('user');
		user.set(null);
		goto('/login');
	};
</script>

<div class="min-vh-100 d-flex flex-column bg-light">
	<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top border-bottom py-2">
		<div class="container-fluid px-4">
			<a class="navbar-brand fw-bold d-flex flex-column text-primary text-decoration-none" href="/">
				<div class="d-flex align-items-center gap-2">
					<span class="fs-4">Fail</span><span class="text-dark fs-4">Ed</span>
				</div>
				<div class="small fw-normal text-muted">Turn Setbacks into Career Comebacks.</div>
				<div class="small text-muted fst-italic">Your Past Doesn’t Limit Your Future.</div>
			</a>

			<div class="d-flex align-items-center gap-4">
				{#each [
					{ href: '/dashboard', label: 'Dashboard' },
					{ href: '/stories', label: 'Stories' },
					{ href: '/career-paths', label: 'Careers' },
					{ href: '/ai', label: 'AI Guide' },
					{ href: '/profile', label: 'Profile' }
				] as nav}
					<a
						href={nav.href}
						class="nav-link fw-semibold"
						class:text-primary={currentPath === nav.href}
						class:fw-bold={currentPath === nav.href}
					>
						{nav.label}
					</a>
				{/each}

				{#if $user}
					<button
						on:click={logout}
						class="btn btn-outline-primary rounded-pill px-4 py-1 fw-semibold shadow-sm"
					>
						Logout
					</button>
				{:else}
					<a
						href="/login"
						class="btn btn-primary rounded-pill px-4 py-1 fw-semibold shadow-sm"
					>
						Login
					</a>
				{/if}
			</div>
		</div>
	</nav>

	<main class="container py-5 flex-grow-1">
		<slot />
	</main>

	<footer class="text-center py-3 small bg-white border-top text-muted">
		&copy; 2025 <strong>FailEd</strong> | Empowering Growth Through Mistakes 🚀
	</footer>
</div>

<style global>
	@import '../app.css';

	a.nav-link {
		transition: all 0.3s;
	}
	a.nav-link:hover {
		text-decoration: underline;
		color: #0d6efd !important;
	}
</style>

