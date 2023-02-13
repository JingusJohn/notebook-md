import { prisma } from "$lib/server/prisma";
import { error, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { z, ZodError } from "zod";
import { supabaseAdmin } from "$lib/server/supabase";

const profileSchema = z.object({
  firstName: z.string({ required_error: "First name is required" })
  .trim()
  .min(1, { message: "First name cannot be empty" })
  .max(24, { message: "First name cannot exceed 24 characters" }),
  lastName: z.string({ required_error: "Last name is required" })
  .trim()
  .min(1, { message: "Last name cannot be empty" })
  .max(24, { message: "Last name cannot exceed 24 characters" })
})

export const load: PageServerLoad = async ({ locals }) => {
  const getUserProfile = async (userId: string | undefined) => {
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          id: userId
        }
      })
      return profile;
    } catch (err) {
      console.log("Something went wrong: ", err);
      throw error(500, "Something went wrong loading profile");
    }
  };

  return {
    profileData: await getUserProfile(locals.session?.user.id)
  };
}

export const actions: Actions = {
  updateProfileInfo: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    try {
      const validatedForm = profileSchema.parse(body);
    } catch (err) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors } = err.flatten();
        const { ...rest } = body;
        return {
          data: rest,
          errors
        }
      }
    }
    
    // update if inputs are valid
    try {
      const updateProfile = await prisma.profile.update({
        where: {
          id: locals.session?.user.id
        },
        data: {
          firstName: body.firstName as string,
          lastName: body.lastName as string
        }
      });
    } catch (err) {
      console.log("Something weng wrong: ", err);
      throw error(500, "Something went wrong updating profile");
    }
  },

  deleteProfile: async ({ request, locals, fetch }) => {
    const body = Object.fromEntries(await request.formData());
    if (locals.session) {
      const userId = locals.session.user.id;
      
      // delete notes
      try {
        let deletedNotes = await prisma.note.deleteMany({
          where: {
            authorId: userId
          }
        });

      } catch (err) {
        console.log('err at note delete')
        console.log(err)
      }

      // delete profile
      try {
        let deletedProfile = await prisma.profile.delete({
          where: {
            id: userId
          }
        });
      } catch (err) {
        console.log('err at profile delete');
        console.log(err)
      }
      // delete supabase account
      const { data, error: dErr } = await supabaseAdmin.auth.admin.deleteUser(
        locals.session.user.id
      )
      const { error: loErr } = await locals.sb.auth.signOut();

      if (loErr) {
        throw error(500, 'Could not log out.');
      } else if (dErr) {
        throw error(500, 'Could not delete account');
      }

      throw redirect(303, '/');

      }
    }
}
