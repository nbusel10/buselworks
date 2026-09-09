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

Add your Formspree form ID to `.env.local`:

```
NEXT_PUBLIC_FORMSPREE_ID=your_form_id
```

Create a form at [formspree.io](https://formspree.io), then paste the ID from the form endpoint (`https://formspree.io/f/XXXX`).

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Portfolio screenshots

Place cropped homepage screenshots in `public/work/{slug}.jpg` matching slugs in `src/data/work.ts`. Typographic fallbacks render if an image is missing.

Optional capture helper:

```bash
npm run capture-work
```

## Deploy

Vercel-ready. Set `NEXT_PUBLIC_FORMSPREE_ID` in project environment variables.
