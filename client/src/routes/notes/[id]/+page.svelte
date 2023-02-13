<script lang="ts">
	import type { ActionData, PageServerData } from './$types';
	import { marked } from 'marked';
	import { enhance } from '$app/forms';
	import { highlight, getLanguage } from 'highlightjs';

  marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: function(code, lang) {
      const language = getLanguage(lang) ? lang : 'plaintext';
      return highlight(language, code).value
    },
    langPrefix: 'hljs language-'
  });

	export let data: PageServerData;
	export let form: ActionData;
	let { note } = data;
	let { note: loadedNote } = JSON.parse(JSON.stringify(data));

	let tab: string = data?.mode ?? 'raw';
	$: preview = note != null ? marked.parse(note.content!) : '';
	$: rows = note != null ? countLines(note.content!) : 1;
  let showSavedMessage: boolean = false;

	const countLines = (input: string) => {
		return input.split('\n').length + 1;
	};

	const handleSubmit = ({ form, data, action, cancel }: any) => {
    loadedNote.content = JSON.parse(JSON.stringify(note?.content));
		return async ({ result, update }: any) => {
      showSavedMessage = true;
      setTimeout(() => {
        showSavedMessage = false;
      }, 3000);
    };
	};
</script>

<div class="flex flex-col px-4">
	<!-- heading -->
	<h1 class="dark:text-white text-3xl pb-2">{note?.title}</h1>
	<!-- navigation and actions -->
	<div class="select-none flex flex-row justify-between">
		<!-- Navigation -->
		<div class="flex flex-row space-x-2">
			<a class="bg-gray-200 rounded-lg px-2 py-1" href="/notes">Back</a>
			<button
				class="px-2 {tab == 'raw' ? 'bg-blue-500 rounded-t-lg text-white' : 'dark:text-white'}"
				on:click={() => (tab = 'raw')}>Editor</button
			>
			{#if note?.type === 'markdown'}
				<button
					class="px-2 {tab == 'md-preview'
						? 'bg-blue-500 rounded-t-lg text-white'
						: 'dark:text-white'}"
					on:click={() => (tab = 'md-preview')}>Preview</button
				>
			{/if}
		</div>
		<!-- Actions -->
		<div>
			<!-- In the future, this would ideally be done automatically following changes made to the text -->
			<button
				disabled={loadedNote.content === note?.content}
				class="rounded-lg py-1 px-2 disabled:bg-gray-200 disabled:text-black disabled:dark:text-white text-white bg-blue-500 disabled:dark:bg-slate-700 disabled:opacity-20"
				type="submit"
				form="note-content">Save</button
			>
		</div>
	</div>
	{#if tab === 'raw' && note}
		<form id="note-content" action="?/save_note" method="POST" use:enhance={handleSubmit}>
			<textarea
				placeholder={note?.type === 'markdown' ? '# Awesome heading' : 'Awesome heading'}
				name="content"
				{rows}
				class="bg-gray-100 dark:bg-slate-800 rounded-xl px-2 dark:text-white w-full"
				bind:value={note.content}
			/>
		</form>
	{/if}
	{#if tab === 'md-preview'}
		<article class="prose dark:prose-invert font-sans dark:text-white max-w-none pt-2 sm:px-8">
			{@html preview}
			{#if preview.trim() == ''}
				<h1>Nothing here yet!</h1>
				<p>Use the editor to type some markdown</p>
				<a href="https://www.markdownguide.org/basic-syntax/">Syntax</a>
			{/if}
		</article>
		{#if note}
			<form id="note-content" action="?/save_note" method="POST" use:enhance={handleSubmit} class="hidden">
				<textarea
					placeholder={note?.type === 'markdown' ? '# Awesome heading' : 'Awesome heading'}
					name="content"
					{rows}
					class="bg-gray-100 dark:bg-slate-800 rounded-xl px-2 dark:text-white w-full"
					bind:value={note.content}
				/>
			</form>
		{/if}
	{/if}
  {#if form?.message}
    <p>{form.message}</p>
  {/if}
  {#if showSavedMessage}
    <p class="text-center dark:text-white text-black">Saved Changes</p>
  {/if}
</div>
