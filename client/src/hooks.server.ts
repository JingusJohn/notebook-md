import "$lib/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { redirect, type Handle } from "@sveltejs/kit";


export const handle: Handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event);
  event.locals.sb = supabaseClient;
  event.locals.session = session;
  // for accessing notes routes
  if (event.url.pathname.startsWith("/notes")) {
    // if user is not signed in, redirect
    if (!event.locals.session) {
      throw redirect(303, "/login");
    } else {
      // if accessing a specific note, verify that the user owns that note
    }
  } else if (event.url.pathname.startsWith("/profile")) {
    if (!event.locals.session) {
      throw redirect(303, "/login");
    }
  }


  return resolve(event);
}
