# FinDrive — Used Car Finance & Loan Against Car

Responsive React (Vite + TypeScript + Tailwind) marketing site with a Supabase-backed lead form.

## Setup

1. **Add image assets**:
   - Save the FinDrive logo as `public/logo.png` (used in the navbar and footer).
   - Save feature images for each loan product as `public/new-car-finance.jpg`, `public/used-car-finance.jpg`, `public/loan-against-car.jpg`, and `public/personal-loan.jpg`. If a file is missing, that section falls back to a simple icon so the layout never breaks.

2. **Set your WhatsApp number**: in `src/components/WhatsAppCta.tsx`, replace the placeholder `WHATSAPP_NUMBER` (`919876543210`) with your real number in international format, no `+` or spaces.

2. **Install dependencies** (requires Node.js 18+):
   ```bash
   npm install
   ```

3. **Set up Supabase** (free tier is fine):
   - Create a project at https://supabase.com.
   - In the project's SQL editor, run [`supabase/schema.sql`](supabase/schema.sql) — this creates the `leads` table with row-level security and a policy that allows public inserts only (no read-back via the public API).
   - Go to Project Settings → API and copy the **Project URL** and **anon public key**.
   - Copy `.env.example` to `.env` and fill them in:
     ```bash
     cp .env.example .env
     ```
     ```
     VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
     VITE_SUPABASE_ANON_KEY=your-anon-key-here
     ```
   - `.env` is already in `.gitignore` — never commit real keys.

4. **Run the dev server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```
   Set the same `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` as environment variables on whatever host you deploy to (Vercel, Netlify, etc.) — they get baked into the build at build time.

## Viewing submitted leads

Since the anon key only has insert permission, you can't read leads back through the public site. To view them, either use the Supabase dashboard's Table Editor, or sign in to the **CRM dashboard** described below.

## CRM dashboard (`/admin`)

A password-protected dashboard at `/admin` lets you view, search/filter, and update the status of every lead (New / Contacted / Converted / Lost), plus see basic charts (leads over the last 14 days, leads by loan type).

### 1. Re-run the schema
`supabase/schema.sql` now also adds a `status` column to `leads` and two new RLS policies that let **signed-in (authenticated)** users read and update leads — the public anon key still cannot. Run the file again in the SQL editor; it's safe to re-run (uses `if not exists` / `drop ... if exists` guards).

### 2. Create your login
The dashboard uses Supabase Auth. Since this is for internal use (you / your team), the simplest way to create a login is directly in the dashboard rather than building a public sign-up page:
- Supabase dashboard → **Authentication → Users → Add user**.
- Enter your email and a password, and check **Auto Confirm User** (so you don't need to click an email link).

Repeat for each team member who needs access.

### 3. Log in
Visit `/admin` on your deployed site (or `http://localhost:5173/admin` in dev) — you'll be redirected to `/admin/login`. Sign in with the email/password you just created.

### Notes
- Status changes are saved immediately to Supabase as you change the dropdown per lead — no separate "Save" step.
- Filtering and search happen client-side once leads are loaded, so they're instant.
- Anyone without a Supabase Auth login is redirected straight to the login page — there's no way to view `/admin` content without signing in.

## Lead form

Fields: `name`, `phone`, `email`, `loan_type` (Used Car Finance / Loan Against Car), `location`, `age`, `employment_type` (Salaried / Self Employed).

Client-side validation (`src/types/lead.ts`) checks required fields, phone length, email format, and age range (18–75) before any Supabase call is made. On success, the form shows a confirmation message and resets; on failure (e.g. network issue or RLS misconfiguration) it shows the Supabase error message inline.
