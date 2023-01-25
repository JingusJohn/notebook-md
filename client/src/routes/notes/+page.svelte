<script lang="ts">
	import type { PageServerData } from "./$types";


  export let data: PageServerData;
  let { profileData } = data;
</script>


{#if profileData?.firstName}
  <h1>{profileData?.firstName}'s Notes</h1>
{/if}

<button class="bg-blue-500" on:click={() => console.log(profileData)}>TEST</button>
