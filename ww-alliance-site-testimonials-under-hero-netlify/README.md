# W&W Global Alliance — Custom Rebuild (Starter)

This is a **Next.js + Tailwind** custom build that closely mirrors the structure and key content from https://jointhealliance.com.au.

It includes: Hero, Stats, Features (AI methods), Pricing (weekly/monthly/annual + lifetime), Bundles, Testimonials, Contact, and a simple Header/Footer — styled with black + gold brand language.

## Quick start
```bash
pnpm i   # or npm install / yarn
pnpm dev # http://localhost:3000
```

## Notes
- Remote images use the live site's hosted assets. You can swap them to local files under `public/` at any time.
- CTAs currently point to `https://whop.com` per the live site.
- This is intentionally lean and production-ready. From here we can add:
  - Blog (app/blog with dynamic MDX)
  - Case studies/portfolio collection
  - Auth-gated member pages
  - Integrations (GA4, Meta Pixel, HubSpot, Calendly, etc.)
  - A/B testing, forms with real backend (Resend/Upstash/Airtable/Webhooks)
- All content/text is derived from your live site for parity.


## Troubleshooting
- If you see `File Not Found`, clear `.next` and reinstall: `rm -rf .next node_modules && npm install && npm run dev`.
- Check the crest at http://localhost:3000/media/crest.png . If 404, ensure the `public/media/crest.png` file exists.
