# FinDrive — Used Car Finance & Loan Against Car

Responsive React (Vite + TypeScript + Tailwind) marketing site with a Supabase-backed lead form.

## Setup

1. **Add image assets**:
   - Save the FinDrive logo as `public/logo.png` (used in the navbar and footer).
   - Save a hero background photo as `public/hero-bg.jpg`.
   - Save feature images as `public/used-car-finance.jpg` and `public/loan-against-car.jpg`.

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

Since the anon key only has insert permission, you can't read leads back through the website. To view them:
- Open the Supabase dashboard → Table Editor → `leads` table, or
- Run a query in the SQL editor: `select * from public.leads order by created_at desc;`

## Lead form

Fields: `name`, `phone`, `email`, `loan_type` (Used Car Finance / Loan Against Car), `location`, `age`, `employment_type` (Salaried / Self Employed).

Client-side validation (`src/types/lead.ts`) checks required fields, phone length, email format, and age range (18–75) before any Supabase call is made. On success, the form shows a confirmation message and resets; on failure (e.g. network issue or RLS misconfiguration) it shows the Supabase error message inline.
