import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { z, ZodError } from "zod";

const signupSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Email must be valid" }).trim(),
  password: z.string({ required_error: "Password is required" }).min(6, { message: "Password must be at least 6 characters" }).max(18, { message: "Password cannot exceed 18 characters" }).trim(),
  passwordConfirm: z.string({ required_error: "Password confirmation is required" }).min(6).max(18).trim()
});

export const actions: Actions = {
  signup: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());

    try {
      const validatedForm = signupSchema.parse(body);
    } catch (err) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors } = err.flatten();
        const { password, passwordConfirm, ...rest } = body;
        return {
          data: rest,
          errors,
        }
        // return fail(400, {
        //   error: errMsg
        // })
      }
    }

    const { data, error: err } = await locals.sb.auth.signUp({
      email: body.email as string,
      password: body.password as string
    })

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        return fail(400, {
          error: 'Invalid email or password'
        })
      }
      return fail(500, {
        error: 'Server error. Please try again later.'
      })
    }

    throw redirect(303, "/login");
  }
}
