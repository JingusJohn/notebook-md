<script lang="ts">
	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageServerData;
	//export let form: ActionData;
	let { profileData } = data;

	let showNewNote: boolean = false;

	const noteTypes: string[] = ['markdown', 'text'];
	const extensionMap: Map<string, string> = new Map();
	extensionMap.set('markdown', 'md');
	extensionMap.set('text', 'txt');

	$: showNewNote = profileData?.notes.length == 0 ? true : showNewNote;

</script>

<div class="px-4 flex flex-col space-y-2 select-none md:w-[80vw] lg:w-[65vw] xl:w-[50vw] md:m-auto">
	{#if showNewNote || profileData?.notes.length == 0}
		<h1 class="dark:text-white text-center text-3xl">New Note</h1>
		<form
			action="?/create_note"
			method="POST"
			class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm: sm:space-x-2 sm:justify-between"
			use:enhance
		>
			<div class="flex flex-col sm:flex-row justify-center">
				<div
					class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-center sm:items-center sm:grow"
				>
					<label for="title" class="dark:text-white text-sm">Title</label>
					<input
						type="text"
						name="title"
						required
						class="h-10 px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200"
						placeholder="syllabus_notes"
					/>
				</div>
				<div
					class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 justify-center sm:items-center"
				>
					<label for="type" class="dark:text-white text-sm">Type</label>
					<select
						name="type"
						class="bg-gray-200 dark:bg-slate-800 dark:text-gray-400 rounded-lg h-10 px-2 hover:cursor-pointer"
					>
						{#each noteTypes as noteType}
							<option value={noteType}>{noteType}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="flex flex-row justify-center space-x-2">
				<button type="submit" class="bg-blue-500 h-10 rounded-lg text-white sm:px-2 grow"
					>Confirm</button
				>
				<button
					on:click={() => (showNewNote = false)}
					class="bg-gray-300 dark:bg-slate-700 h-10 rounded-lg text-black dark:text-white px-2"
					>Cancel</button
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
		{:else}
			<h1
				class={`dark:text-white text-center text-3xl ${showNewNote == true ? 'text-center' : ''}`}
			>
				Your Notes
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
		{#each profileData?.notes as note, i}
			<div>
				<a href="/notes/{note.id}">
					<div
						class="rounded-t-lg md:rounded-t-xl bg-gray-200 dark:bg-slate-700 py-2 text-center text-black dark:text-white"
					>
						{note.title}<span class="text-gray-400 dark:text-slate-500"
							>.{extensionMap.get(note.type)}</span
						>
					</div>
				</a>
				<div class="flex flex-row justify-between rounded-lg">
					<!-- Add query params to send user to the right tab -->
					<a
						class="grow bg-gray-300 dark:bg-slate-300 text-center py-1 rounded-bl-lg md:rounded-bl-xl"
						href="/notes/{note.id}">EDIT</a
					>
					{#if note.type == 'markdown'}
						<a
							class="grow bg-gray-500 dark:bg-slate-500 text-white text-center py-1"
							href="/notes/{note.id}?mode=md-preview">READ</a
						>
					{/if}
					<button
						class="grow bg-red-500 text-white rounded-br-lg md:rounded-br-xl"
						type="submit"
						form="form-{note.id}">DELETE</button
					>
				</div>
			</div>
			<form
				id="form-{note.id}"
				class="hidden"
				method="POST"
				action="?/delete_note"
				use:enhance
			>
				<input name="id" value={note.id} />
			</form>
		{/each}
	{/if}
	{#if profileData?.notes.length == 0}
		<div
			class="dark:text-gray-400 bg-gray-200 dark:bg-slate-700 rounded-lg md:rounded-xl text-center h-10"
		>
			You have no notes
		</div>
	{/if}
</div>
