# Deploy — Zarin & Mahbub Wedding Invitation

## Step 1 of 3 — Deploy to Vercel (30 seconds)

Click this link, sign in with GitHub, and click **Deploy**:

👉 **https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcalon-ai-solutions-project%2Fwedding-invitation&project-name=zarin-mahbub-wedding&env=RESEND_API_KEY,SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,SUPABASE_KEY**

When it asks for **Environment Variables**, use the values from your `.env` file
(or see the message from Calon AI Solutions — all 4 keys were provided to you).

The 4 variables are:
- `RESEND_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_KEY`

Click **Deploy**. Vercel gives you a URL like `zarin-mahbub-wedding.vercel.app`.

---

## Step 2 of 3 — Create the database table (1 minute)

1. Go to 👉 https://app.supabase.com/project/pdrhlkostykniyauncld/editor
2. Paste the SQL below and click **Run**:

```sql
create table if not exists rsvps (
  id           uuid        primary key default gen_random_uuid(),
  name         text        not null,
  email        text        not null,
  attending    text        not null default 'yes',
  guests       text        default '1',
  note         text        default '',
  submitted_at timestamptz default now()
);
alter table rsvps enable row level security;
create policy "public insert"  on rsvps for insert to anon          with check (true);
create policy "auth select"    on rsvps for select to authenticated  using (true);
```

---

## Step 3 of 3 — Allow your Vercel domain (30 seconds)

1. Go to 👉 https://app.supabase.com/project/pdrhlkostykniyauncld/settings/api
2. Find **"API key restrictions"** or **"Allowed origins"**
3. Add `*.vercel.app` → Save

---

## Done ✓

- Guests get a **branded thank-you email** from `Mahbub & Zarin ♥`
- You get a **notification** at `mahbubulaom4238@gmail.com` for every RSVP
- All responses stored in Supabase — view them at:
  👉 https://app.supabase.com/project/pdrhlkostykniyauncld/database/tables
