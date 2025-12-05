-- Supabase schema for Resume Upgrader (run in Supabase SQL editor)
create extension if not exists "uuid-ossp";

create table if not exists resumes (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null,
  title text,
  original_text text not null,
  upgraded_text text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create index if not exists idx_resumes_user_id on resumes (user_id);
