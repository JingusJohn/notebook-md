<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import { supabaseClient } from "$lib/supabase";
  import { onMount } from "svelte";
  import "../app.css";
  import Nav from "../lib/components/Nav.svelte";
	import type { LayoutData } from "./$types";

  export let data: LayoutData;

  onMount(() => {
    const { data: { subscription }} = supabaseClient.auth.onAuthStateChange(() => {
      invalidateAll();
    });

    return () => {
      subscription.unsubscribe();
    };
  });

  const handleLogout = async (event: any) => {
    if (event.detail.logout === true) {
      const { error } = await supabaseClient.auth.signOut();
      if (error) {
        console.log(error);
      }
    }
  }
  
</script>

<div class="min-h-screen bg-white dark:bg-slate-900">
  <!-- responsive navbar -->
  <Nav loggedIn={data.session != null} on:logout={handleLogout} />

  <!-- content -->
  <slot />
</div>
