<script lang="ts">
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { profileData } = data;

	let showDelete: boolean = false;
</script>

{#if profileData}
	<div class="flex w-screen flex-col justify-center md:items-center">
		<h1 class="text-3xl dark:text-white text-center">Profile Settings</h1>
		<form action="?/updateProfileInfo" method="POST" class="flex flex-col px-2 md:w-[50vw]">
			<label for="firstName" class="dark:text-white">First Name</label>
			<input
				type="text"
				name="firstName"
				class="h-10 px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200"
				value={form?.data?.firstName ?? profileData.firstName}
			/>
			{#if form?.errors?.firstName}
				<label for="firstName" class="text-red-500">{form.errors.firstName[0]}</label>
			{/if}
			<label for="lastName" class="dark:text-white">Last Name</label>
			<input
				type="text"
				name="lastName"
				class="h-10 px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200"
				value={form?.data?.lastName ?? profileData.lastName}
			/>
			{#if form?.errors?.lastName}
				<label for="lastName" class="text-red-500">{form.errors.lastName[0]}</label>
			{/if}
			<button type="submit" class="text-white bg-blue-500 rounded-lg mt-4 h-10"
				>Update Profile</button
			>
		</form>
	</div>
	<div class="flex w-screen flex-col justify-center md:items-center">
		<h1 class="text-3xl dark:text-white text-center">Profile Actions</h1>
		<form action="?/deleteProfile" method="POST" class="flex flex-col px-2 md:w-[50vw]">
			{#if !showDelete}
				<button
					type="button"
					class="text-white bg-red-500 rounded-lg mt-4 h-10"
					on:click={() => (showDelete = true)}>Delete Profile</button
				>
			{:else}
        <label for="firstName" class="dark:text-white">
          Deleting your account will also delete your profile and all of the associated notes. If you
          do not wish to lose your markdown files, please back them up to another service.
          Unfortunately, we do not have any integrated migration support.</label
        >
				<button type="submit" class="text-white font-bold bg-red-500 rounded-lg mt-4 h-10"
					>Delete my account</button
				>
			{/if}
		</form>
	</div>
{/if}
