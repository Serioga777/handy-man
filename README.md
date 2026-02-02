# Haven & Hand - Handyman Site (Astro)

Premium, conversion-focused handyman services website built with Astro.

## Local Dev

1. Install dependencies:
   - `npm install`
2. Run dev server:
   - `npm run dev`

## Build

- `npm run build`
- `npm run preview`

## Booking Form (Formspree)

The booking form posts to Formspree. Set the endpoint via environment variable:

- `PUBLIC_FORMSPREE_ACTION` (example: `https://formspree.io/f/xxxxx`)
- `PUBLIC_SITE_URL` (optional, used for an absolute `/thank-you` redirect)

Create a `.env` file locally (do not commit it).
