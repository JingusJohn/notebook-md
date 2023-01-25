import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

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

