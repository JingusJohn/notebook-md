<script lang="ts">
	import type { PageServerData } from "./$types";
  import { marked } from 'marked';

  export let data: PageServerData;
  let { note } = data;

  let tab: string = "raw";
  $: preview = note != null ? marked.parse(note.content) : "";
  $: rows = note != null ? countLines(note.content) : 1;

  const countLines = (input: string) => {
    return input.split("\n").length;
  }
</script>

<div class="flex flex-col px-4">
  <!-- heading -->
  <h1 class="dark:text-white text-3xl pb-2">{note?.title}</h1>
  <div class="select-none flex flex-row space-x-2">
    <a class="bg-gray-200 rounded-lg px-2 py-1" href="/notes">Back</a>
    <button class="px-2 {tab == 'raw' ? 'bg-blue-500 rounded-t-lg text-white' : 'dark:text-white'}" on:click={() => tab = "raw"}>Editor</button>
    {#if note?.type === "markdown"}
      <button class="px-2 {tab == 'md-preview' ? 'bg-blue-500 rounded-t-lg text-white' : 'dark:text-white'}" on:click={() => tab = "md-preview"}>Preview</button>
    {/if}
  </div>
  {#if tab === "raw" && note}
    <form>
      <textarea placeholder={note?.type === "markdown" ? "# Awesome heading" : "Awesome heading"} name="content" rows={rows} class="bg-gray-100 dark:bg-slate-800 rounded-xl px-2 dark:text-white w-full" bind:value={note.content} />
    </form>
  {/if}
  {#if tab === "md-preview"}

    <article class="prose dark:prose-invert font-sans dark:text-white max-w-none pt-2 sm:px-8">
      {@html preview}
      {#if preview.trim() == ""}
        <h1>Nothing here yet!</h1>
        <p>Use the editor to type some markdown</p>
        <a href="https://www.markdownguide.org/basic-syntax/">Syntax</a>
      {/if}
    </article>
  {/if}
</div>
