import { prisma } from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

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
