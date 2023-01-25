<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { profileData } = data;
</script>

{#if profileData}
  <div class="flex w-screen flex-col justify-center md:items-center">
    <form action="?/updateProfileInfo" method="POST" class="flex flex-col px-2 md:w-[50vw]">
      <label for="" class="dark:text-white">First Name</label>
      <input
        type="text"
        name="firstName"
        class="h-10 px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200"
        bind:value={profileData.firstName}
      />
      <label for="" class="dark:text-white">Last Name</label>
      <input
        type="text"
        name="lastName"
        class="h-10 px-2 rounded-lg bg-gray-200 outline-black dark:bg-slate-800 dark:text-white focus:outline-red-200"
        bind:value={profileData.lastName}
      />
      <button type="submit" class="text-white bg-blue-500 rounded-lg mt-4 h-10">Update Profile</button>
    </form>
  </div>
{/if}
