import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { z, ZodError } from 'zod';

const noteSchema = z.object({
  title: z.string({ required_error: "title is required" }).trim(),
  type: z.string().trim()
});

const deleteNoteSchema = z.object({
  id: z.string({ required_error: "Need id of note to delete" }).trim()
});

export const load: PageServerLoad = async ({ locals }) => {
  console.log("preloading")

  const getUserProfile = async (userId: string | undefined) => {
    try {
      const profile = await prisma.profile.findUnique({
        where: {
          id: userId
        },
        include: {
          notes: true
        }
      });
      console.log(profile)
      return profile
    } catch (err) {
      console.log("Something went wrong: ", err);
      throw error(500, "Something went wrong fetching notes");
    }
  };

  return {
    profileData: await getUserProfile(locals.session?.user.id)
  };
}

// add form actions
export const actions: Actions = {
  create_note: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    let dest: string;

    try {
      const validatedForm = noteSchema.parse(body);
      if (locals.session?.user.id) {
        const note = await prisma.note.create({
          data: {
            authorId: locals.session.user.id,
            title: validatedForm.title,
            type: validatedForm.type,
            content: ""
          }
        });
        dest = note.id;

      } else {
        return fail(403, {
          message: "User not signed into an account"
        });
      }
    } catch (err) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors } = err.flatten();
        const { ...rest } = body;
        return {
          data: rest,
          errors
        };
      } else {
        return fail(500, {
          error: "Server encountered an error. Please try again later or contact support"
        });
      }
    }
    throw redirect(303, `/notes/${dest}`);
  },
  delete_note: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const validatedForm = deleteNoteSchema.parse(body);
    const noteData = await prisma.note.findUnique({
      where: {
        id: validatedForm.id
      }
    });
    const authorId = noteData != null ? noteData.authorId : null
    if (locals.session?.user.id == authorId) {
      const deletedNote = await prisma.note.delete({
        where: {
          id: validatedForm.id
        }
      })
    }
  }
}
