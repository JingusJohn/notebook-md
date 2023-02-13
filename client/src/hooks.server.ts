import { prisma } from "$lib/server/prisma";
import "$lib/supabase";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";
import { error, redirect, type Handle, type HandleFetch } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const { session, supabaseClient } = await getSupabase(event);
  event.locals.sb = supabaseClient;
  event.locals.session = session;
  console.log("path: ", event.url.pathname)
  // for accessing notes routes
  if (event.url.pathname.startsWith("/notes")) {
    // if user is not signed in, redirect
    if (!event.locals.session) {
      throw redirect(303, "/login");
    } else {
      if (event.url.pathname != "/notes") {
        try {
          const noteInfo = await prisma.note.findUnique({
            where: {
              id: event.url.pathname.split("/")[2]
            }
          });
          if (noteInfo?.authorId !== event.locals.session.user.id) {
            // in the future, don't just check for match. Check if the note is public
            throw error(403, {
              message: "No access"
            });
          }
        } catch (err) {
          console.log("ERR: ", err)
          throw redirect(303, "/notes");
        }
      }
    }
  } else if (event.url.pathname.startsWith("/profile")) {
    if (!event.locals.session) {
      throw redirect(303, "/");
    }
  }
  return resolve(event);
}
