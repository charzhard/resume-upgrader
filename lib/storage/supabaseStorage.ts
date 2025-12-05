import { supabaseAdmin } from '@/lib/supabaseClient';

export async function uploadResumePDF(userId: string, resumeId: string, fileBuffer: Buffer, filename: string) {
  const path = `${userId}/${resumeId}/${filename}`;
  const { data, error } = await supabaseAdmin.storage
    .from('resumes')
    .upload(path, fileBuffer, { upsert: true });
  if (error) throw error;
  return data;
}
