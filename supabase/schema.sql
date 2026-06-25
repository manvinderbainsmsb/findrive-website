-- Run this in the Supabase SQL editor to create the leads table used by the FinDrive lead form.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  loan_type text not null check (loan_type in ('used_car_finance', 'loan_against_car')),
  location text not null,
  age integer not null check (age >= 18 and age <= 75),
  employment_type text not null check (employment_type in ('salaried', 'self_employed'))
);

alter table public.leads enable row level security;

-- Allow anyone (including the public anon key used by the website) to submit a lead.
create policy "Allow public lead inserts"
  on public.leads
  for insert
  to anon
  with check (true);

-- No select/update/delete policy is created for the anon role, so submitted leads
-- cannot be read back through the public API — only via the Supabase dashboard
-- or a service-role key on a trusted backend.
