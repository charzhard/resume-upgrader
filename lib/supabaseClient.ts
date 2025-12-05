import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY!;

export const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {  // server-side
  auth: { persistSession: false },
});

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: false },
});

// Functions
export async function saveResumeToDB(record: { id: string; user_id: string; title?: string; original_text: string; upgraded_text: string; }) {
  const { data, error } = await supabaseAdmin
    .from('resumes')
    .insert({
      id: record.id,
      user_id: record.user_id,
      title: record.title || null,
      original_text: record.original_text,
      upgraded_text: record.upgraded_text,
    });
  if (error) throw error;
  return data;
}

export async function listUserResumes(userId: string) {
  const { data, error } = await supabase
    .from('resumes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) {
    console.error('listUserResumes error', error);
    return [];
  }
  return data;
}
