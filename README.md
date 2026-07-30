# magic-link-worker — instalare

Sistem de login fără parolă (magic-link prin email, via Resend) pentru
"Generează pentru firma ta" pe eu-ai-act.ro. Separat de site-ul static —
se instalează o singură dată în contul tău Cloudflare.

## Ce trebuie să ai înainte de a începe
- Cont Cloudflare (îl ai deja)
- `wrangler` instalat local (`npm install -g wrangler`) sau folosești
  Cloudflare Dashboard direct din browser (fără terminal — vezi pasul 2 alternativ)
- Un API key de la Resend (resend.com → API Keys) — spuneai că îl ai deja
- Domeniul `eu-ai-act-ready.eu` (sau alt domeniu al tău) verificat în Resend,
  ca să poți trimite email de la o adresă `@eu-ai-act-ready.eu` sau `@aiventure.ro`

---

## Pas 1 — creezi baza de date D1

Din terminal, în folderul `magic-link-worker/`:

```
wrangler d1 create euaiact-auth
```

Comanda îți dă înapoi un `database_id` (un șir lung, gen `a1b2c3d4-...`).
Copiază-l.

## Pas 2 — pui database_id în wrangler.toml

Deschizi `wrangler.toml`, la linia:
```
database_id = "REPLACE_WITH_YOUR_D1_DATABASE_ID"
```
înlocuiești cu id-ul real de la Pasul 1.

## Pas 3 — încarci schema (tabelele)

```
wrangler d1 execute euaiact-auth --file=./schema.sql
```

## Pas 4 — pui cheia Resend ca secret (NU în cod, NU pe GitHub)

```
wrangler secret put RESEND_API_KEY
```
Îți cere să lipești valoarea — lipești API key-ul tău de la Resend și Enter.

## Pas 5 — verifici adresa de trimitere

În `wrangler.toml`, linia:
```
FROM_EMAIL = "EU AI Act Ready <no-reply@eu-ai-act-ready.eu>"
```
Trebuie să fie o adresă de pe un domeniu pe care l-ai verificat în Resend
(Resend Dashboard → Domains). Dacă folosești alt domeniu, schimbă aici.

## Pas 6 — deploy

```
wrangler deploy
```

Îți dă un URL gen `https://magic-link-worker.<subdomeniul-tau>.workers.dev`.
Copiază-l — îl pui în fișierul `assets/js/auth.js` de pe eu-ai-act.ro,
la constanta `AUTH_API` (înlocuiești placeholder-ul).

---

## Testare rapidă (din browser, după deploy)

1. Deschizi eu-ai-act.ro → click "Login" (sau butonul din secțiunea "Firma Ta")
2. Introduci un email al tău → "Trimite link de acces"
3. Verifici inbox-ul (și Spam) → primești email de la adresa configurată
4. Click pe linkul din email → te duce pe `eu-ai-act.ro/verify.html?token=...`
   → pagina validează token-ul și te loghează automat

## Ce NU face deocamdată acest sistem
- Nu generează efectiv cele 70 de documente (asta e un worker separat,
  `rrvi-generator-worker`, marcat DRAFT în codul de pe eu-ai-act-ready.eu —
  proiect separat, de discutat când vine momentul)
- Doar gatează accesul la formularul din "Firma Ta" — cineva trebuie să fie
  logat (cont creat automat la primul login) ca să vadă formularul
