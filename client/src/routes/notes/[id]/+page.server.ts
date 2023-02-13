import { prisma } from "$lib/server/prisma";
import { fail, type Actions } from "@sveltejs/kit";
import { z } from "zod";
import type { PageServerLoad } from "../$types";

const noteUpdateSchema = z.object({
  content: z.string({ required_error: "Content cannot be empty" })
})

export const load: PageServerLoad = async ({ params }: any) => {

  const getNoteData = async (noteId: string) => {
    try {
      // get note data
      console.log("ID: ", noteId);
      const note = await prisma.note.findUnique({
        where: {
          id: noteId
        }
      });
      return note;
    } catch (err) {
      console.log(err)
    }
  }

  return {
    note: await getNoteData(params.id)
  }
}

export const actions: Actions = {
  save_note: async ({ params, request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    const validatedForm = noteUpdateSchema.parse(body);
    console.log("NOTE HERE: ", validatedForm)
    
    // perform validation on user later
    try {
      const updateNote = await prisma.note.update({
        where: {
          id: params.id
        },
        data: {
          content: validatedForm.content
        }
      });
      const { ...rest } = body;
      return {
        data: rest,
        message: "Saved Changes"
      };
    } catch (err) {
      console.log(err);
      return fail(500, {
        error: "Server encountered an error. Please try again later or contact support"
      });
    }
  }
}
