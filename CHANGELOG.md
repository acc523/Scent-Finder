# Changelog

## v3-draft3 (2026-11-22)
- Fonts: Fraunces (soft, wonky, heavy) + Jost, self-hosted in /fonts (OFL).
- Front page: scent pyramid illustration (top / heart / base); copy states it's a scent-mapping quiz.
- Q1, Q7, Q9 copy; bigger option buttons; Q8 endings illustrated with a pair of characters each.
- Redrawn: protagonist, confidant (therapist), mentor (pastor), lovable villain (costumed), whisky, hot chocolate, noragi, bold & mixed (leather jacket + whimsical dress), dense, soft, harmony (treble clef), tension (C clef, 7/8), strange (compass N/E/S/W).
- Sliders drag and snap to 5 stops; Continue to advance. Multiple favourites. Portrait results with notes pyramid, accord bars, tier colours.
- Brand logos via Brandfetch (set BRANDFETCH_CLIENT_ID in config.js); otherwise the brand name is set as a wordmark badge.

## v3-draft1 (2026-11-22)
- Front-facing name "The Character Study"; intro no longer mentions perfume. First name required to begin; respondents told answers go to the sender.
- Visual redesign pegged to Penhaligon's (heritage serif, bottle green, gold hairlines, double frames) and A.P.C. (spaced uppercase sans, whitespace). Fully centred.
- Line illustrations (illus.js) for rooms, characters, places, drinks, style and slider poles; emoji on every text option.
- Q2 reframed (new place, new people), Q6 compliments in plain English, Q5 as character select.
- Sliders: one pair per screen, 5 fixed stops, 4 examples and an illustration per pole, chosen side lights up.
- Final CTA "What is my scent?"; results show brand marks (site favicon, monogram fallback).
- Sheet: new first_name column (C).

## v2-draft1 (2026-11-22)
- Psychology-first quiz: top/heart/base questions, places & senses, 6 semantic-differential sliders, style, favourites last.
- Axis scoring with tension and heart consistency checks; narrative result.
- Anonymous responses posted to Google Sheet via Apps Script (Code.gs).
