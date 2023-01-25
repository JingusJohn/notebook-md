<script lang="ts">
	import type { ActionData, PageServerData } from './$types';

	export let data: PageServerData;
	export let form: ActionData;
	let { profileData } = data;

	let showNewNote: boolean = false;

	const noteTypes: string[] = ['markdown', 'text'];
</script>

<div class="px-4 flex flex-col space-y-2">
	{#if showNewNote}
		<h1 class="dark:text-white text-center text-3xl">New Note</h1>
		<form class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm: sm:space-x-2 sm:justify-between">
			<div class="flex flex-col sm:flex-row justify-center">
				<div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-center sm:items-center">
					<label for="email" class="dark:text-white text-sm">Title</label>
					<input
						type="text"
						name="title"
						required
						class="h-10 px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200"
						placeholder="syllabus_notes"
					/>
				</div>
				<div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-center sm:items-center">
					<label for="type" class="dark:text-white text-sm">Type</label>
					<select
						name="type"
						class="bg-gray-200 dark:bg-slate-800 dark:text-gray-400 rounded-lg h-10 px-2"
					>
						{#each noteTypes as noteType}
							<option value={noteType}>{noteType}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="flex flex-row justify-center space-x-2">
				<button type="submit" class="bg-blue-500 h-10 rounded-lg text-white sm:px-2 grow">Confirm</button>
				<button
					on:click={() => (showNewNote = false)}
					class="bg-slate-700 h-10 rounded-lg text-white px-2">Cancel</button
				>
			</div>
		</form>
	{/if}
	<div class={`${showNewNote ? '' : 'flex flex-row'} justify-between`}>
		{#if profileData?.firstName}
			<h1
				class={`dark:text-white text-center text-3xl ${showNewNote == true ? 'text-center' : ''}`}
			>
				{profileData?.firstName}'s Notes
			</h1>
		{/if}
		{#if !showNewNote}
			<button
				on:click={() => (showNewNote = true)}
				class="bg-blue-500 h-10 rounded-lg text-white px-2">Create Note</button
			>
		{/if}
	</div>
	{#if profileData}
		{#each profileData?.notes as note}
			<div class="rounded-lg md:rounded-xl dark:bg-slate-700">
				<p>{note.title}<span>{note.type}</span></p>
			</div>
		{/each}
	{/if}
	{#if profileData?.notes.length == 0}
		<div class="dark:text-gray-400 dark:bg-slate-700 rounded-lg md:rounded-xl text-center h-10">
			Your Notes will Appear Here
		</div>
	{/if}
</div>
