import { AuthApiError } from "@supabase/supabase-js";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import { z, ZodError } from "zod";

const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" }).email({ message: "Email must be valid" }).min(1).trim(),
  password: z.string({ required_error: "Password is required" }).trim().min(1, { message: "Password cannot be empty"})
});

export const actions: Actions = {
  login: async ({ request, locals }) => {
    const body = Object.fromEntries(await request.formData());
    console.log("body:", body)

    try {
      const validatedForm = loginSchema.parse(body);

    } catch (err) {
      if (err instanceof ZodError) {
        const { fieldErrors: errors } = err.flatten();
        console.log(errors)
        const { password, ...rest } = body;
        return {
          data: rest,
          errors
        };
      } else {
        return fail(500, {
          message: "Something went wrong. Try again later or contact support."
        });
      }
    }

    const { data, error: err } = await locals.sb.auth.signInWithPassword({
      email: body.email as string,
      password: body.password as string
    });

    if (err) {
      if (err instanceof AuthApiError && err.status === 400) {
        console.log(err.message)
        if (err.message === "Email not confirmed") {
          const { password, ...rest } = body;
          return {
            data: rest,
            emailError: true
          }
        } else {
          return fail(400, {
            error: err.message
          });
        }
      }
      return fail(500, {
        message: 'Something went wrong. Try again later or contact support.'}
      );
    }

    throw redirect(303, '/notes');
  }
}
