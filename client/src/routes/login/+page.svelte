<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="flex w-screen flex-col justify-center md:items-center px-2">
	<h1 class="text-3xl dark:text-white text-center">Log In</h1>
  {#if form?.accountError}
    <p class="text-red-500">Invalid login credentials. Ensure their validity.</p>
  {/if}
	{#if form?.emailError}
    <p class="text-red-500">Check your email to verify your account. Then try logging in again.</p>
  {/if}
	<form action="?/login" method="POST" class="flex flex-col md:w-[50vw]">
		<label for="email" class="dark:text-white">Email</label>
		<input
			type="text"
			name="email"
			required
			placeholder="johnsmith@example.com"
			class="h-10 px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200"
		/>
		{#if form?.errors?.email}
			<label for="email" class="text-red-500">{form.errors.email[0]}</label>
		{/if}
		<!-- <label for="" class="dark:text-white">First Name</label> -->
		<!-- <input type="text" name="firstName" class="px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200" /> -->
		<label for="password" class="dark:text-white">Password</label>
		<input
			type="password"
			name="password"
			required
			placeholder="password"
			class="h-10 px-2 rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-white focus:outline-red-200"
		/>
		{#if form?.errors?.password}
			<label for="password" class="text-red-500">{form.errors.password[0]}</label>
		{/if}
		<button type="submit" class="h-10 text-white bg-blue-500 hover:bg-blue-800 rounded-lg mt-4"
			>Login</button
		>
	</form>

	<div class="dark:text-white pt-2 text-center">
		Don't already have an account? <a class="text-blue-500" href="signup">Create one!</a>
	</div>
	<!-- TODO: Need to handle and show errors when user provides bad input -->
</div>
