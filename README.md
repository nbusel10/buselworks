# Buselworks

Marketing site for [Buselworks](https://buselworks.com) — boutique web design and development by Nancy Buselmeier.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Formspree (contact form)

## Alternate design (v2)

A simpler ivory redesign lives at `/v2` for side-by-side comparison with the fuller original at `/`. Footers link between them.

## Setup

```bash
npm install
cp .env.example .env.local
```

Add values to `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
NEXT_PUBLIC_GA_ID=GT-WV3PSCDX
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3348
NEXT_PUBLIC_SITE_ENV=production
```

Create a form at [formspree.io](https://formspree.io), then paste the ID from the form endpoint (`https://formspree.io/f/XXXX`). Google Analytics uses the same Site Kit tag as the current WordPress site (`GT-WV3PSCDX`) and only loads on the live production build (not staging, not local `next dev`).

```bash
npm run dev
```

Open [http://127.0.0.1:3348](http://127.0.0.1:3348).

## Portfolio screenshots

Place cropped homepage screenshots in `public/work/{slug}.jpg` matching slugs in `src/data/work.ts`. Typographic fallbacks render if an image is missing.

Optional capture helper:

```bash
npm run capture-work
```

## Deploy (GreenGeeks + GitHub Actions)

The site is a **static export** (`output: 'export'`). GitHub Actions builds and FTPs files to GreenGeeks.

| Site | URL | Indexing | When it updates |
|------|-----|----------|-----------------|
| Staging | https://staging.buselworks.com | Blocked | Every push to `main` |
| Live | https://buselworks.com | Allowed | After you **Approve** the production environment in GitHub |

### One-time: GreenGeeks

1. Create subdomain `staging` (document root e.g. `public_html/staging`).
2. Keep `buselworks.com` on the live web root (`public_html`).
3. Create FTP credentials that can reach both folders.
4. Back up anything currently in `public_html` (e.g. WordPress) before the first production deploy.

### One-time: GitHub

1. **Settings → Environments**
   - `staging` — no protection rules
   - `production` — enable **Required reviewers** (you)
2. On **each** environment, add secrets:

| Secret | Staging example | Production example |
|--------|-----------------|--------------------|
| `FTP_SERVER` | GreenGeeks FTP host | same |
| `FTP_USERNAME` | FTP user | same |
| `FTP_PASSWORD` | FTP password | same |
| `FTP_SERVER_DIR` | `/public_html/staging/` | `/public_html/` |
| `NEXT_PUBLIC_FORMSPREE_ID` | form id (or a test form) | live form id |
| `NEXT_PUBLIC_GA_ID` | leave empty | `GT-WV3PSCDX` |

Optional environment **variables** (defaults are fine if omitted):

| Variable | Staging default | Production default |
|----------|-----------------|--------------------|
| `NEXT_PUBLIC_SITE_ENV` | `staging` | `production` |
| `NEXT_PUBLIC_SITE_URL` | `https://staging.buselworks.com` | `https://buselworks.com` |

### Day-to-day

1. Push or merge to `main`.
2. Review https://staging.buselworks.com (confirm `/robots.txt` disallows all).
3. In the Actions run, **Approve** the production environment job.
4. Live site updates. Reject/cancel to leave production unchanged.

### Local static builds (PowerShell)

```powershell
# Staging-shaped export
$env:NEXT_PUBLIC_SITE_ENV="staging"
$env:NEXT_PUBLIC_SITE_URL="https://staging.buselworks.com"
Remove-Item Env:NEXT_PUBLIC_GA_ID -ErrorAction SilentlyContinue
npm run build

# Production-shaped export
$env:NEXT_PUBLIC_SITE_ENV="production"
$env:NEXT_PUBLIC_SITE_URL="https://buselworks.com"
$env:NEXT_PUBLIC_GA_ID="GT-WV3PSCDX"
npm run build
```

Output lands in `out/`. Enable Formspree spam protection / domain restriction in the Formspree dashboard for extra filtering on top of the contact-form honeypot.
