import { prisma } from "$lib/server/prisma";
import { error, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";


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
  }
}
