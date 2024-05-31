import { Database } from "@/types/Database";
import { SupabaseClient } from "@supabase/supabase-js";

function Random16Digit() {
  let digits = [];
  for (let i = 0; i < 16; i++) {
    let randomDigit = Math.floor(Math.random() * 10);
    digits.push(randomDigit);
  }
  return parseInt(digits.join(""));
}

export async function GetRandomId(
  supabase: SupabaseClient<Database>,
  table: keyof Database["public"]["Tables"]
) {
  for (var i = 0; i < 100; i++) {
    const id = Random16Digit();
    const t = await supabase.from(table).select("id").eq("id", id).single();
    if (!t.data) {
      return id;
    }
  }

  return undefined;
}
