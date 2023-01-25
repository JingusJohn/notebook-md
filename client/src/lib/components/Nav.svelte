<script lang="ts">
  import lightLogo from "$lib/images/NotebookmdLogosWhite.webp";
  import darkLogo from "$lib/images/NotebookmdLogo.webp";
  import lightMenuIcon from "$lib/images/icons/menuLight.svg";
  import darkMenuIcon from "$lib/images/icons/menuDark.svg";
  import lightCloseIcon from "$lib/images/icons/closeLight.svg";
  import darkCloseIcon from "$lib/images/icons/closeDark.svg";
  import { page, navigating } from "$app/stores";
  import { createEventDispatcher } from "svelte";
	import { enhance, type SubmitFunction } from "$app/forms";

  export let loggedIn: boolean;

  let showTray: boolean = false;
  // if user changes routes, hide tray
  $: if($navigating) showTray = false;

  const dispatch = createEventDispatcher();

  const enhancedLogout: SubmitFunction = ({ cancel }) => {
    dispatch('logout', {
      logout: true
    })
    cancel();
  }
</script>

<!-- Mobile Navbar -->
<div class="sm:hidden flex flex-col dark:text-white px-2">
  <div class="flex flex-row justify-between py-2">
    <div class="dark:text-white hover:cursor-pointer" on:click={() => showTray = true}>
      <picture>
        <source srcset={lightMenuIcon} media="(prefers-color-scheme: dark)" />
        <img class="max-w-[40px] rounded-xl hover:bg-gray-200 dark:hover:bg-slate-800" alt="menu" src={darkMenuIcon}/>
      </picture>
    </div>
    <!-- light and dark mode logo -->
    <a href="/">
      <picture >
        <source srcset={lightLogo} media="(prefers-color-scheme: dark)" />
        <img class="max-w-[40px]" alt="Dark Logo" src={darkLogo} />
      </picture>
    </a>
  </div>
  {#if showTray}
    <div class="flex flex-col rounded-lg bg-gray-200 dark:bg-slate-800 drop-shadow-sm px-4 py-4 space-y-1 absolute my-2 mt-14 w-[96vw] drop-shadow-xl">
      {#if $page.url.pathname.substr($page.url.pathname.lastIndexOf('/')) != '/'}
      <a href="/" class="rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 px-2 py-2 hover:cursor-pointer">
        Home
      </a>
      {/if}
      <!-- only show if user is signed in -->
      {#if loggedIn === true}
        <a href="/notes" class="rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 px-2 py-2 hover:cursor-pointer">
          View Notes
        </a>
        <form action="/signout" method="POST" use:enhance={enhancedLogout}>
          <button type="submit" class="rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 px-2 py-2 hover:cursor-pointer">Sign Out</button>
        </form>
        <a href="/profile" class="rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 px-2 py-2 hover:cursor-pointer">
          Profile
        </a>
      {:else}
        <!-- show if user is signed out -->
        <a href="/login" class="rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 px-2 py-2 hover:cursor-pointer">
          Sign In
        </a>
        <a href="/signup" class="rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 px-2 py-2 hover:cursor-pointer">
          Create Account
        </a>
      {/if}
      <!-- Close tray -->
      <div class="dark:text-gray-500 hover:cursor-pointer text-center self-center flex flex-row items-center
        hover:bg-gray-50 dark:hover:bg-slate-900 rounded-lg pl-4 pr-2"
        on:click={() => showTray = false}>
        <p class="dark:text-white font-bold">Close</p>
        <picture>
          <source srcset={lightCloseIcon} media="(prefers-color-scheme: dark)" />
          <img class="max-w-[40px]" alt="menu" src={darkCloseIcon}/>
        </picture>
      </div>
    </div>
  {/if}
</div>

<!-- Larger Navbar -->
<div class="hidden sm:flex flex-row px-2 py-2 dark:text-white items-center justify-between">
  <!-- light and dark mode logo -->
  <a href="/">
    <picture >
      <source srcset={lightLogo} media="(prefers-color-scheme: dark)" />
      <img class="max-w-[40px]" alt="Dark Logo" src={darkLogo} />
    </picture>
  </a>
  <div class="flex flex-row space-x-2">
    <!-- only show if user is signed in -->
    {#if loggedIn === true}
      <a href="/notes" class="rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 px-2 py-2 hover:cursor-pointer">
        View Notes
      </a>
      <form action="/signout" method="POST" use:enhance={enhancedLogout}>
        <button type="submit" class="rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 px-2 py-2 hover:cursor-pointer">Sign Out</button>
      </form>
      <a href="/profile" class="rounded-lg hover:bg-gray-200 dark:hover:bg-slate-800 px-2 py-2 hover:cursor-pointer">
        Profile
      </a>
    {:else}
      <!-- show if user is signed out -->
      <a href="/login" class="rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 px-2 py-2 hover:cursor-pointer">
        Sign In
      </a>
      <a href="/signup" class="rounded-lg text-white hover:bg-blue-800 bg-blue-500 px-2 py-2 hover:cursor-pointer">
        Create Account
      </a>
    {/if}
    
  </div>

</div>
