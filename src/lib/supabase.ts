import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Si faltan las variables, la app funciona en modo demo con datos de ejemplo.
export const supabase = url && key ? createClient(url, key) : null;
