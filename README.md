# ScentFinder (front-facing name: The Character Study)

Psychology-first perfume quiz: 14 questions → scent profile, narrative, and best match at every price tier.

## Files
- `index.html` – page and styles
- `config.js` – **the only file you edit**: paste your Apps Script URL into `SHEET_WEBAPP_URL`
- `data.js` – perfume database (accords 0–3, tier, price, strength, crowd-pleaser flag)
- `app.js` – questions, scoring, narrative, response logging
- `illus.js` – all line illustrations (SVG)
- `Code.gs` – Google Apps Script that writes each response into the "ScentFinder Responses" sheet

## Run locally
Double-click `index.html`. Works offline; responses are only sent once `SHEET_WEBAPP_URL` is set.

## Collect responses
1. Open the "ScentFinder Responses" Google Sheet → Extensions → Apps Script → paste `Code.gs` → Save.
2. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone. Deploy, authorise, copy the `/exec` URL.
3. Paste it into `config.js`.
4. Go to https://app.netlify.com/drop and drag this whole folder in. Share that link.
5. Take the quiz once yourself and check a row appears.

Columns are matched by header name. To add a question: add it to `Q` in app.js, and add a column with the same id to the sheet.

## How scoring works
- Every answer adds points to 12 accords (citrus … earthy) and nudges 6 axes (dry, dense, sharp, smoky, tension, strange). Heart answers weigh most (1.3×), then base (1.1×), then top (0.9×).
- Sliders set each axis (60%), blended with the scenario nudges (40%).
- Tension check: if the Harmony↔Tension slider disagrees with Familiar↔Strange or with the scenario picks by more than 25 points, tension confidence drops and the tension target is pulled toward the other two signals. Low confidence also reduces tension's weight in matching.
- Heart check: room vs compliment vs story role, logged as `heart_confidence`.
- Favourite perfumes that match the database pull the profile toward them, are excluded from results, and boost similar scents.
- Match = 55% accord similarity + 30% axis distance + 8% strength fit + ~10% anchor similarity, rescaled to 52–97%.
