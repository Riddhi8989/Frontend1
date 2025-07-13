<script>
	import { onMount } from 'svelte';
	import API from '$lib/api';

	let profile = null;
	let error = '';
	let editName = '';
	let editBio = '';

	onMount(async () => {
		try {
			const bootstrap = await import('bootstrap/dist/js/bootstrap.bundle.min.js');
			window.bootstrap = bootstrap; // ✅ allow modal to work

			const savedUser = JSON.parse(localStorage.getItem('user'));
			if (!savedUser?.email) {
				error = 'User email not found.';
				return;
			}

			const res = await API.fetchProfile(savedUser.email); // ✅ Correct API call
			profile = res.data;
		} catch (err) {
			error = err?.response?.data?.error || 'Failed to load profile.';
		}
	});

	const openEditModal = () => {
		if (window.bootstrap?.Modal) {
			editName = profile.name;
			editBio = profile.bio;

			const modal = new window.bootstrap.Modal(document.getElementById('editModal'));
			modal.show();
		} else {
			alert('Bootstrap not loaded.');
		}
	};

	const saveChanges = async () => {
		try {
			const res = await API.putProfile('/profile', {
				email: profile.email,
				name: editName,
				bio: editBio
			});
			profile = res.data.user;

			const modalEl = document.getElementById('editModal');
			const modal = window.bootstrap.Modal.getInstance(modalEl);
			modal.hide();
		} catch (err) {
			alert('Failed to update profile.');
		}
	};
</script>

<svelte:head>
	<title>My Profile</title>
</svelte:head>

<div class="container py-5">
	{#if error}
		<div class="alert alert-danger text-center">{error}</div>
	{:else if !profile}
		<div class="text-muted text-center">Loading profile...</div>
	{:else}
		<div class="card shadow-lg p-4 border-0 rounded-4 bg-white mb-4">
			<div class="text-center mb-4 border-bottom pb-3">
				<i class="bi bi-person-fill text-primary fs-1 mb-2"></i>
				<h2 class="fw-bold mb-1">{profile.name}</h2>
				<span class="text-muted text-capitalize">{profile.role} Account</span>
			</div>

			<div class="mb-4">
				<h6 class="text-uppercase text-primary fw-bold small mb-1">Email Address</h6>
				<div class="px-3 py-2 bg-light rounded border text-muted">{profile.email}</div>
			</div>

			<div class="mb-4">
				<h6 class="text-uppercase text-primary fw-bold small mb-1">User Role</h6>
				<span class="badge bg-secondary px-3 py-2 text-capitalize fs-6">{profile.role}</span>
			</div>

			<div class="mb-4">
				<h6 class="text-uppercase text-primary fw-bold small mb-1">About Me</h6>
				<p class="border-start border-3 border-primary ps-3 fst-italic text-muted mb-0">
					{profile.bio || 'No bio provided.'}
				</p>
			</div>

			<div class="text-end mt-3">
				<button class="btn btn-outline-secondary" on:click={openEditModal}>
					<i class="bi bi-pencil-square me-2"></i>Edit Profile
				</button>
			</div>
		</div>
	{/if}
</div>

<!-- ✅ Edit Modal -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content rounded-4 shadow">
			<div class="modal-header">
				<h5 class="modal-title" id="editModalLabel">Edit Profile</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<div class="modal-body">
				<div class="mb-3">
					<label for="nameInput" class="form-label">Name</label>
					<input id="nameInput" type="text" bind:value={editName} class="form-control" />
				</div>
				<div class="mb-3">
					<label for="bioInput" class="form-label">Bio</label>
					<textarea id="bioInput" class="form-control" rows="3" bind:value={editBio}></textarea>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
				<button type="button" class="btn btn-primary" on:click={saveChanges}>Save Changes</button>
			</div>
		</div>
	</div>
</div>
