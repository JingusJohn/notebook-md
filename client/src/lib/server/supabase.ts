import { createClient } from "@supabase/supabase-js";
import { PRIVATE_SUPABASE_SERVICE_KEY } from "$env/static/private";
import { PUBLIC_SUPABASE_URL } from "$env/static/public";

export const supabaseAdmin = createClient(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SUPABASE_SERVICE_KEY
);