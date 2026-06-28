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
  employment_type text not null check (employment_type in ('salaried', 'self_employed')),
  status text not null default 'new' check (status in ('new', 'contacted', 'converted', 'lost'))
);

-- If you ran an earlier version of this file before the `status` column existed,
-- this adds it without touching any existing rows or policies.
alter table public.leads add column if not exists status text not null default 'new';
alter table public.leads drop constraint if exists leads_status_check;
alter table public.leads add constraint leads_status_check
  check (status in ('new', 'contacted', 'converted', 'lost'));

alter table public.leads enable row level security;

-- Allow anyone (including the public anon key used by the website) to submit a lead.
drop policy if exists "Allow public lead inserts" on public.leads;
create policy "Allow public lead inserts"
  on public.leads
  for insert
  to anon
  with check (true);

-- CRM dashboard access: only signed-in (authenticated) users — i.e. whoever you create
-- a login for in Supabase Auth — can read leads or update their status. The public
-- anon key used by the website's lead form still cannot read or update anything.
drop policy if exists "Allow authenticated read" on public.leads;
create policy "Allow authenticated read"
  on public.leads
  for select
  to authenticated
  using (true);

drop policy if exists "Allow authenticated status update" on public.leads;
create policy "Allow authenticated status update"
  on public.leads
  for update
  to authenticated
  using (true)
  with check (true);
