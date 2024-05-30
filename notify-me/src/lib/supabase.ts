import { Database } from "@/types/Database";
import {
  SupabaseClient,
  createClient as supabaseClient,
} from "@supabase/supabase-js";

var supabase: SupabaseClient<Database> | undefined = undefined;

export function createClient() {
  if (supabase) return supabase;

  supabase = supabaseClient<Database>(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || ""
  );

  return supabase;
}
