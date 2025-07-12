<script>
	import { goto } from '$app/navigation';
</script>

<section class="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
	<div class="text-center bg-white p-5 rounded-4 shadow-lg border border-primary-subtle w-100" style="max-width: 600px;">

		<!-- LOGO IMAGE -->
		<img src="/logo.png" alt="FailEd Logo" class="mb-4" style="max-width: 100px;" />

		<h1 class="display-5 fw-bold text-primary mb-3">
			🚀 Welcome to <span class="text-dark">FailEd</span>
		</h1>

		<p class="lead text-muted mb-4">
			Turn your failures into success stories. Your second chance starts here.
		</p>

		<div class="d-flex flex-column flex-sm-row justify-content-center gap-3">
			<button
				type="button"
				class="btn btn-primary px-4 py-2 rounded-pill"
				on:click={() => goto('/login')}
				aria-label="Navigate to Login Page"
			>
				Login
			</button>

			<button
				type="button"
				class="btn btn-outline-primary px-4 py-2 rounded-pill"
				on:click={() => goto('/register')}
				aria-label="Navigate to Register Page"
			>
				Register
			</button>
		</div>
	</div>
</section>
