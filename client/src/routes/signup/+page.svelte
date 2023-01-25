<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;

  let passwordEntries: string[] = ["", ""];
</script>

<div class="flex w-screen flex-col justify-center md:items-center px-2">
	<h1 class="text-3xl dark:text-white text-center">Create Account</h1>
	<form action="?/signup" method="POST" class="flex flex-col md:w-[50vw]" autocomplete="off">
		<label for="email" class="dark:text-white">Email</label>
		<input
			type="text"
			name="email"
			required
			class="h-10 px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200"
			value={form?.data?.email ?? ''}
      placeholder="JohnSmith@example.com"
		/>
		{#if form?.errors?.email}
			<label for="email" class="text-red-500">{form.errors.email[0]}</label>
		{/if}
		<!-- <label for="" class="dark:text-white">First Name</label> -->
		<!-- <input type="text" name="firstName" class="px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200" /> -->
		<label for="" class="dark:text-white">Password</label>
		<input
			type="password"
			name="password"
      autocomplete="off"
			required
			class="h-10 px-2 rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-white focus:outline-red-200"
      bind:value={passwordEntries[0]}
      placeholder="6 characters"
		/>
		{#if form?.errors?.password}
			<label for="password" class="text-red-500">{form.errors.password[0]}</label>
		{/if}
		<label for="" class="dark:text-white">Confirm Password</label>
		<input
			type="password"
			name="passwordConfirm"
      autocomplete="off"
			required
			class="h-10 px-2 rounded-lg bg-gray-200 dark:bg-slate-800 dark:text-white focus:outline-red-200 {passwordEntries[0] == passwordEntries[1] ? 'outline-red-500' : ''}"
      bind:value={passwordEntries[1]}
      placeholder="6 characters"
		/>
		<!-- {#if form?.matchError} -->
		<!-- 	<label for="passwordConfirm" class="text-red-500">{form.matchError}</label> -->
		<!-- {/if} -->
    {#if passwordEntries[0] != passwordEntries[1]}
			<label for="passwordConfirm" class="text-red-500">Passwords do not match</label>
    {/if}
		<button disabled={passwordEntries[0] != passwordEntries[1]} type="submit" class="h-10 text-white bg-blue-500 rounded-lg mt-4 disabled:dark:bg-slate-800 disabled:text-black disabled:dark:text-white disabled:bg-gray-200 disabled:hover:cursor-not-allowed hover:bg-blue-800">Sign Up</button>
	</form>

	<div class="dark:text-white pt-2 text-center">
		Already have an account? <a class="text-blue-500" href="/login">Sign In</a>
	</div>

	<!-- TODO: Need to handle and show errors when user provides bad input -->
</div>
