import { createClient } from "@supabase/supabase-js";

export function getStorageBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET ?? "portfolio-assets";
}

export function getSupabaseStorage() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) return null;

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  }).storage;
}
