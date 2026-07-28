# UTM Library — EU AI Act Ready™

Această bibliotecă NU e vizibilă pentru vizitatori — e infrastructură internă pentru a măsura care canal + campanie + rol chiar aduce clienți, nu doar trafic.

## De ce există

Fără UTM-uri: "au venit 1000 de vizitatori" — o cifră fără context.
Cu UTM-uri: "LinkedIn către avocați a adus 12 completări Free Pack din 80 de click-uri; Google Ads către IMM a adus 3 din 200" — o decizie.

## Ce conțin fișierele

- `utm-standard.json` — definițiile celor 5 parametri UTM (source, medium, campaign, content, term) și valorile permise, ca să nu apară variații ("linkedin" vs "LinkedIn" vs "li")
- `channels.json` — canalele reale prin care vine trafic către eu-ai-act.ro
- `campaigns.json` — campaniile active/planificate
- `audiences.json` — segmentele de public (IMM, avocat, consultant, freelancer, auditor) și ce `utm_content` le corespunde
- `examples.md` — linkuri complete, gata de copiat-lipit, pentru fiecare combinație canal+campanie+public

## Cum le folosești, pas cu pas

1. Alegi canalul (ex: LinkedIn) din `channels.json`
2. Alegi campania (ex: `free_readiness_pack`) din `campaigns.json`
3. Alegi segmentul de public (ex: `sme_owner`) din `audiences.json`
4. Compui linkul: `https://eu-ai-act.ro/?utm_source=linkedin&utm_medium=organic&utm_campaign=free_readiness_pack&utm_content=sme_owner`
5. Pui linkul ăsta (nu adresa simplă) în postare/email/material
6. După câteva zile, verifici în Google Analytics / Cloudflare Web Analytics, filtrat după acei parametri, câți din acel link chiar au completat Free Pack-ul

## Legătura cu restul infrastructurii AI Discovery

- `organization.json` (Schema.org) = cine suntem
- `llms.txt` = ce poate înțelege un LLM despre noi
- `intents.json` = ce întrebări acoperă fiecare secțiune
- `utm/` = de unde au venit vizitatorii și ce au făcut

Împreună, formează stratul complet de măsurare + descoperire AI al site-ului.

## Notă tehnică

Parametrii UTM nu necesită niciun cod suplimentar pe site — funcționează automat cu orice tool de analytics conectat (Google Analytics, Cloudflare Web Analytics, Plausible etc.), pentru că sunt citiți direct din URL de acele tool-uri. Acest folder e doar biblioteca de referință ca să construiești linkurile consistent, nu o parte funcțională a paginii.
