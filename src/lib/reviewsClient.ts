import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// Safe, lazy client for the public visitor-reviews feature.
// The generated supabase client throws at import time when the
// VITE_SUPABASE_* env vars are missing (e.g. a build uploaded to Netlify
// without them), which whitescreens the whole site. This wrapper only
// creates the client when the config exists; otherwise reviews degrade
// gracefully and the rest of the site keeps working.

let client: SupabaseClient<Database> | null | undefined;

export function getReviewsClient(): SupabaseClient<Database> | null {
  if (client !== undefined) return client;
  const url = import.meta.env.VITE_SUPABASE_URL || "https://drcyqkpiigmvhymmbmva.supabase.co";
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_Gd2bgkm0nAanZAjJ3YEhgg_a1qFYvyk";
  if (!url || !key) {
    client = null;
    return client;
  }
  try {
    client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  } catch {
    client = null;
  }
  return client;
}
