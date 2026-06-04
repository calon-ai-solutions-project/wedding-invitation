-- Run this once in your Supabase project: Dashboard → SQL Editor → New query

create table if not exists rsvps (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,
  email        text        not null,
  attending    text        not null default 'yes',
  guests       text        default '1',
  note         text        default '',
  submitted_at timestamptz default now()
);

-- Row Level Security
alter table rsvps enable row level security;

-- API (anon key) can insert new RSVPs
create policy "public insert"
  on rsvps for insert to anon
  with check (true);

-- Only you (authenticated / dashboard) can read all RSVPs
create policy "authenticated select"
  on rsvps for select to authenticated
  using (true);
