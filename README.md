# 1-Click EU AI Act Ready — Cloudflare Pages site

## Folder structure

```
eu-ai-act/
├── index.html               (landing page RO, complete)
├── ai.json                  (operational contract for AI systems)
├── proof.json               (deployment proof envelope)
├── llms.txt                 (AI-facing navigation)
├── robots.txt               (crawler allow-list, 35+ AI bots named)
├── sitemap.xml              (structured site map)
├── _headers                 (Cloudflare Pages headers — content-type + CORS)
├── README.md                (this file)
└── images/
    ├── deception.jpg
    ├── transparency.jpg
    ├── manipulation-scale.jpg
    ├── fraud-identity.jpg
    ├── visible-disclosure.jpg
    ├── machine-readable.jpg
    ├── proof-layer.jpg
    ├── audit-dashboard.jpg
    ├── trust.jpg
    ├── compliance.jpg
    ├── ai-visible.jpg
    └── certification.jpg
```

## Deployment — Cloudflare Pages Direct Upload

1. Generate the 12 images (see prompts below) and put them in `/images/`
2. Zip the entire `eu-ai-act/` folder
3. Cloudflare dashboard → Workers & Pages → Create → Pages → Upload assets
4. Drag the zip → Deploy
5. Site goes live at `<project>.pages.dev`
6. Add custom domain (e.g., `eu-ai-act.5thelement.ai`)

## Image generation prompts (Midjourney / DALL-E / Flux)

All images: `--ar 16:9 --no text, watermark, logo` · Editorial documentary style, slight grain, muted palette, 4K

### Problems (figures 01–04)
- **deception.jpg**: A realistic digital collage showing a human face split between real and synthetic AI, subtle deepfake artifacts, warning symbols, media screen background, professional compliance style, high contrast, no text.
- **transparency.jpg**: A user chatting with an invisible AI assistant on a laptop, no disclosure label visible, transparent interface, business website context, clean modern compliance illustration, no text.
- **manipulation-scale.jpg**: Thousands of AI-generated comments, fake reviews and social media posts spreading from one machine, network visualization, digital manipulation concept, business risk style, no text.
- **fraud-identity.jpg**: AI voice cloning scam concept, fake CEO identity on a smartphone call, phishing email on screen, cybersecurity warning atmosphere, professional realistic illustration, no text.

### Solution layers
- **visible-disclosure.jpg**: A clear AI disclosure badge on a professional website, transparent label, blue accent, modern UI screenshot, editorial documentary style, no text.
- **proof-layer.jpg**: Cryptographic verification dashboard with checkmarks, hash signatures, audit report aesthetic, regulatory document feel, muted blues and greens, no text.
- **audit-dashboard.jpg**: Enterprise governance dashboard with logs, version history, policy engine UI, permanent audit visualization, dark professional interface, no text.

### Benefits (5 cards)
- **trust.jpg**: Two hands shaking with a digital trust seal between them, transparent overlay, warm but professional palette, business confidence concept, no text.
- **compliance.jpg**: A clean regulatory document with EU stars subtly embedded, official red wax seal, neutral office background, professional compliance illustration, no text.
- **ai-visible.jpg**: A search result interface with an AI assistant clearly highlighting and citing a business, machine-readable signals visualization, editorial style, no text.
- **machine-readable.jpg**: Structured data and JSON code flowing into an AI system, abstract data architecture visualization, monochromatic with one accent color, no text.
- **certification.jpg**: A digital certificate with cryptographic seal, blockchain verification icons, official document aesthetic, gold and dark accents, no text.

## Notes

- Site is fully responsive (mobile-first → desktop)
- Light/dark mode toggle (top-left, 68px from top, 34×34px) — universal AiVenture rule
- All AI signal files (ai.json, proof.json, llms.txt) are deployed at the root and served with correct Content-Type via `_headers`
- Disclosure strip is permanently visible at the bottom of the page
- Footer includes the full official AiVenture / 5thElement.ai presence (LinkedIn, Wikidata, Crunchbase, X, YouTube, Medium, Facebook, WhatsApp)

## Update before going live

In `sitemap.xml` and `ai.json`, replace `eu-ai-act.example` with the actual production domain (e.g., `eu-ai-act.5thelement.ai` or the standalone domain).

## Tier

Currently published as **BASIC** (Declaration Layer). Upgrade to PRO requires verification audit; ENTERPRISE adds governance.
