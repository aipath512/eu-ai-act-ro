# Audit văzut de cei trei crai — eu-ai-act.ro

**Data:** 2 august 2026
**Metodă:** extragere directă din repo-ul `aipath512/eu-ai-act-ro` (86 fișiere, 43 pagini HTML), nu impresie de crawl. Fiecare cifră de mai jos e numărată din fișiere.

---

## Rezumat

| Crai | Ce vede | Notă |
|---|---|---|
| **1 — Google** | 41/43 pagini cu JSON-LD, 18 tipuri Schema.org, sitemap cu 40 URL-uri | **9/10** |
| **2 — Crawlere AI** | `llms.txt` complet, 13 boți permiși explicit, 10 fișiere de semnal | **7/10** |
| **3 — Agenți A2A** | card v1.0 + v0.3, endpoint viu, 3 skill-uri | **8/10** |

Nimic rupt. Golurile sunt de acoperire, nu de corectitudine.

---

## CRAI 1 — GOOGLE

### Ce vede

Tipuri Schema.org prezente în tot site-ul:

| Tip | Apariții | | Tip | Apariții |
|---|---:|---|---|---:|
| DefinedTerm | 368 | | Organization | 16 |
| CreativeWork | 50 | | Person | 14 |
| WebPage | 39 | | Legislation | 13 |
| AudienceType | 39 | | HowTo | 13 |
| BreadcrumbList | 34 | | WebApplication | 13 |
| Offer | 27 | | WebSite | 3 |
| FAQPage | 23 | | DefinedTermSet | 1 |
| Service | 17 | | AboutPage | 1 |

- **JSON-LD:** 41/43 pagini. Cele două fără sunt `verify.html` (noindex — corect) și fișierul de verificare Search Console.
- **Canonical:** 41/43. **Meta description:** 41/43. Aceleași două excepții.
- **Sitemap:** 40 URL-uri, toate cu `priority`, 39 cu `lastmod`.
- **Validator:** 0 erori, 0 avertismente pe homepage.

### Ce nu vede

**1. OpenGraph doar pe 5 pagini din 43.**
Prezent pe: `index`, `demo`, `innovations`, `oferta`, `viewer`.
Lipsește de pe toate cele 11 pagini FAQ, cele 10 pagini de modul, toate paginile de personă (`avocati`, `consultanti`, `imm`, `freelanceri`, `it-software`, `marketing-digital`), `why-us`, `verificare`.
*Efect:* orice link partajat pe LinkedIn, WhatsApp sau Slack către acele pagini apare fără titlu, fără descriere, fără imagine. Pe canalul tău principal de distribuție, 38 din 43 de pagini arată ca un link gol.

**2. Nouă pagini au graful deconectat de Organization.**
`avocati`, `consultanti`, `freelanceri`, `imm`, `it-software`, `marketing-digital`, `innovations`, `intentii`, `oferta` — au JSON-LD, dar nicio referință către `#organization`.
*Efect:* Google le tratează ca entități izolate, nu ca părți ale aceleiași organizații. Autoritatea nu se transferă între ele.

**3. `hreflang` doar pe 2 pagini** — `index` și `oferta`.

**4. `lastmod` identic peste tot: 2026-07-31.** Toate cele 39 de intrări au aceeași dată, deși paginile s-au modificat azi. Un sitemap în care totul se schimbă simultan e un semnal slab.

---

## CRAI 2 — CRAWLERE AI

### Ce vede

**`llms.txt`** — 3.320 bytes, 62 linii, 9 secțiuni:
`What` · `Free` · `Pricing` · `Why different` · `Built with AI (declared)` · `Timeline (post Digital Omnibus, iunie 2026)` · `Limits` · `Module pages` · `Agent resources`

Secțiunea `Built with AI (declared)` e neobișnuită și e un avantaj: puține site-uri își declară propriul lanț AI. Secțiunea `Timeline` reflectă deja Digital Omnibus.

**`robots.txt`** — 13 user-agents, **zero `Disallow`**:
`*`, GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, Claude-User, Claude-SearchBot, PerplexityBot, Perplexity-User, Google-Extended, cohere-ai, YouBot, DeepSeekBot

**10 fișiere de semnal** în rădăcină: `adn`, `ai-proof`, `ai`, `authority`, `entities`, `governance`, `intents`, `organization`, `policy`, `trust-state`. Toate valide.

### Ce nu vede

**1. 28 de pagini nu apar în `llms.txt`.** Sunt listate 11 din 43.
Lipsesc: toate cele 11 pagini FAQ (inclusiv `faq-hub` cu 121 de întrebări), toate cele 6 pagini de personă, `demo`, `verificare`, `why-us`, `innovations`, `intentii`, plus paginile juridice.
*Efect:* `faq-hub` e cel mai bogat conținut al tău pentru întrebări informaționale — exact ce caută un crawler AI. Nu e menționat. La fel `verificare.html`, demonstrația RRVI.

**2. `intents.json` descrie oferta veche.** Secțiunea `governance` spune: *„70 de documente, 10 module, deja completate cu datele firmei"*. După decizia ca generatorul automat să treacă la HELP/DFY, afirmația nu mai e valabilă pentru nivelul gratuit. Secțiunea `free-pack` spune *„preview până la 40% din Governance Pack"* — de verificat dacă mai corespunde.

**3. Prețuri vechi în semnale:** `llms.txt` (2× 690, 1× 390), `ai.json` (1× 690).

---

## CRAI 3 — AGENȚI A2A

### Ce vede

| Fișier | Versiune | Mărime | Endpoint |
|---|---|---|---|
| `.well-known/agent-card.json` | A2A v1.0 | 3.501 b | `https://eu-ai-act.ro/a2a/v1` |
| `.well-known/agent.json` | A2A v0.3.0 | 3.784 b | idem |

Endpoint confirmat viu, JSON-RPC 2.0, metode `message/send`, `tasks/get`, `tasks/cancel`.

| Skill | Moduri de ieșire | Exemple | Funcțional |
|---|---|---:|---|
| `ask-eu-ai-act` | text | 3 | **da** |
| `generate-governance-pack` | text + .docx | 2 | **da** |
| `verify-document` | text | 2 | **nu** — returnează doar un link |

Ca dovadă, un agent poate citi `ai-proof.json` (amprentă SHA-256 a `entities.json`) și `trust-state.json` (`verified: true`, metodă declarată, CUI public).

### Ce nu vede

**1. `verify-document` e o promisiune neonorată.** Singura din card. Un orchestrator care o invocă primește text în loc de verificare.

**2. `generate-governance-pack` declară public un serviciu care devine plătit.** Cardul nu conține nicio mențiune de preț sau limită. Un agent presupune acces liber.

**3. Amprenta e din 30 iulie.** `ai-proof.json` hash-uiește `entities.json` și e generată la 30.07. Conținutul s-a schimbat de atunci. `trust-state.json` are `lastUpdated: 2026-07-30`. Pe un site care vinde dovezi criptografice, o amprentă învechită e o problemă de fond.

---

## Ordinea de atac, după raport impact/efort

| # | Ce | Crai | Efort |
|---|---|---|---|
| 1 | OpenGraph pe cele 38 de pagini fără | 1 | mic, repetitiv |
| 2 | `llms.txt` — adaugă cele 28 de pagini lipsă | 2 | mic |
| 3 | Regenerează `ai-proof.json` + `trust-state.json` | 3 | mic |
| 4 | Leagă cele 9 grafuri izolate de `#organization` | 1 | mediu |
| 5 | `verify-document` — implementează sau scoate | 3 | mediu |
| 6 | `intents.json` — actualizează la oferta reală | 2 | blocat pe decizia de preț |
| 7 | Prețurile din `llms.txt` și `ai.json` | 2 | blocat pe decizia de preț |

Primele cinci nu depind de nicio decizie comercială.
