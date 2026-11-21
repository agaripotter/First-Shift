# First Shift — handover for Claude Code

An interactive, single-page induction course for **medical interns starting their Emergency Medicine rotation** at a hospital in **Jeddah, Saudi Arabia**. Built for a friend's hospital; the owner (repo account holder) is not a clinician and wants to stay anonymous.

- **Live:** https://agaripotter.github.io/First-Shift/
- **Repo:** `agaripotter/First-Shift` (created as `first-shift`; GitHub canonical name has capitals)
- **Status:** content complete (15 modules, ~6 h), responsive for iPhone / iPad / laptop. **The live link currently serves the REVIEW COPY** (since 21 Nov 2026) so hospital reviewers can flag changes — see §2a. The clean course is at `/clean.html`.

---

## 1. Repository layout

```
index.html            ← BUILT site served at the live link (currently the REVIEW COPY). Never edit by hand.
review.html           ← BUILT review copy (always)
clean.html            ← BUILT normal course without review tools (always)
version.json          ← {"build": ...}; open pages poll it and show "A new version is available — Refresh"
src/
  build.py            ← concatenates everything below into ../index.html
  style.css           ← all styles, incl. responsive breakpoints (bottom of file)
  c1.js … c8.js       ← course content (MODULES array). c1: M1–M2, c2: M3–M4, c3: M5–M6, c4: M7–M8,
                        c5: M9–M10, c6: M11–M12, c7: M13–M14, c8: M15 (Night Shift) + POCKET card
  qpatch.js           ← question/case-choice overrides applied at runtime (see §4)
  engine.js           ← app engine: rendering, block types, tools/explorables, glossary, scoring,
                        storage, sidebar shell, keyboard shortcuts, update checker, review hooks
  review.js           ← review-copy layer (toolbar, highlights, comments, inline edits, notes, export)
tests/
  check_content.js    ← structural + answer-quality checks (node)
  walkthrough.py      ← Playwright: answers every activity in all 15 modules, screenshots
  devices.py          ← Playwright: screenshots at iPhone / iPad portrait / iPad landscape / laptop
  review.py           ← Playwright: every review feature at phone + laptop (serves repo over http)
.nojekyll
CLAUDE.md             ← this file
```

Build order inside the HTML: `style.css` → flags (`window.REVIEW`, `window.__BUILD`) → `c1…c8.js` → `qpatch.js` → `engine.js` → `review.js` (review builds only).

## 2. Build, test, deploy

```bash
python3 src/build.py                 # index.html (= review copy), review.html, clean.html, version.json
python3 src/build.py --clean-live    # switch the live link back to the clean course (review.html stays)
node --check src/engine.js           # syntax check (also each c*.js / qpatch.js)
node tests/check_content.js          # must print "No structural errors." and empty patch warnings
python3 tests/walkthrough.py         # needs: pip install playwright && playwright install chromium
python3 tests/devices.py             # visual check, screenshots in ./shots
python3 tests/review.py              # review copy: highlight, comment, edit, notes, export, persistence, update banner
# set CHROME=/path/to/chrome if Playwright's bundled Chromium isn't installed
```

**Deploy:** GitHub Pages serves the **`gh-pages` branch** (the Pages settings API was blocked, so Pages was enabled by pushing a `gh-pages` branch). Keep `main` and `gh-pages` identical:

```bash
git add -A && git -c user.name="First Shift" -c user.email="first-shift@users.noreply.github.com" commit -m "..."
git push origin main && git push origin main:gh-pages
```

Live in ~1–2 min. Verify with `gh api "repos/agaripotter/First-Shift/deployments?per_page=1"` → statuses → `success`.

**Anonymity rules (owner's explicit wish):** commit with the neutral author above; never put the owner's real name anywhere in content, metadata or commits. The page has `<meta name="robots" content="noindex, nofollow">` and an anonymous footer: “© 2026 First Shift. All rights reserved…”. The only remaining trace is the username in the URL — moving to a neutrally named GitHub organization was offered as an option.

## 2a. Review copy (live since 21 Nov 2026)

Built on the pattern of the owner's petchem course review copy. A dark toolbar at the bottom: **Edit text** (toggle; tap any text to edit inline — text inside buttons/chips opens a small editor; diagram SVG text can't be edited), **Highlight** (select text first), **Comment** (on this screen, or on the selected text), **Notes** (list with reviewer name, Go to, Delete), **Export** (JSON file; on phones uses the share sheet; "Copy as text" for WhatsApp), **?** (help). A welcome dialog explains it on first visit. **Continue is always unlocked** in the review build. Notes save in `localStorage` key `firstshift.review.v1` (per device + browser). Course progress keeps the normal key, so existing users keep their progress.

**Applying a reviewer's export** (`FirstShift_review_<name>_<date>.json`): each item has `type` (edit / highlight / comment-on-text / comment), `where` (human label), `loc` (`m` module id, `i` screen index, `k` block key `m:screen:block`, `path` child-index path inside the block for edits, `start`/`end` text offsets for highlights) and `before`/`after` (+HTML) or `quote`/`comment`. For each edit, search the `before` text in `src/qpatch.js` first (questions/case choices live there), then `src/c*.js`; keep `{DR}`/`{m|f}` tokens and HTML balanced. Comments are judgement calls — list them for the owner rather than guessing. Rebuild, run the tests, deploy. Keep a short changelog in the commit message.

**Update prompt:** every build writes `version.json`; open pages check it on load, every 10 min and when the tab becomes visible, and show a "Refresh" banner if the build changed. That is how people who already have the link open (or saved to their home screen) get pushed updates.

## 3. Content model (engine)

`MODULES.push({id:'m01', n:1, part:'Part A · Arrive', partSub, title, sub, mins, final?, take:[…], s:[ [blocks…], [blocks…] ]})`
Each inner array is one **screen**. The end screen (score ring + `take` list) is generated.

Block types (`t`):
| t | purpose | key fields |
|---|---|---|
| `h`, `h4`, `p`, `list` | text | `x`; list: `i`, `o` (ordered), `title` |
| `mentor` | speech bubble from Dr. Hanan (or `who`/`av`/`c` for others) | `x` |
| `say` | patient/relative line in Hijazi Arabic + English | `who`, `ar`, `en` |
| `call` | callout; `k` = rule · pearl · danger · saudi · local (“CMC policy”) · idea (“The intuition”) | `x`, `title?` |
| `table`, `nums`, `cards` (flip), `reveal`, `check`, `strip` (ECG: sinus vf vt asystole af stemi brady tachy pea) | static/teaching | — |
| `mcq` | single answer; options `[text, whyWrong]`; **hint `h` required**; 2 tries (1 / 0.5 / 0 pts) | `q,o,a,h,e,tag` |
| `multi` | select all; partial credit | `q,o,a[],h,e` |
| `order` | tap to sequence (items given in correct order; shuffled on render) | `q,i,e` |
| `sort` | assign each item to a bin (CTAS bins = `CT` const in c1.js) | `q,bins,i:[{x,b,w}]` |
| `case` | branching case with live monitor; choice score `s` 2 best / 1 ok / 0 risky | `title,pt,mon,start,n:{id:{x,say?,mon?,strip?,ch:[{x,s,go,f}]}},debrief,nomon?` |
| `tool` | calculator / explorable | `name` |

Tools (`name`): calculators `gcs abg peds burns`; explorables `edmap ctas bleed cpr leads seesaw dengue stroke potassium capacity shock`. Each tool has `r(k)` (full render) and optional `u(k)` (update `#o-k` only — used by sliders so dragging stays smooth). A `<!--SPLIT-->` marker in a tool's HTML splits controls | output into two columns on screens ≥900 px.

Text helpers in every rendered string: `{DR}` → “Dr. <name>”; `{masculine|feminine}` → chosen by the learner's دكتور/دكتورة toggle on the home screen (used for all Arabic addressed to the doctor).

Glossary: terms in `GLOSS` (engine.js) get a dotted underline + tap-to-define popover, first occurrence per screen.

Scoring/progress live in `localStorage` key **`firstshift.cmc.v3`** (review notes: `firstshift.review.v1`). **Bump the version** whenever you add/remove/reorder blocks or questions (keys are `moduleId:screen:block`), otherwise old saved answers attach to the wrong blocks.

## 4. Technical debt to know about

- **`qpatch.js` overrides content at runtime.** All MCQs/multis were rewritten there (matched by a unique substring of the original `q`), and all case choice arrays (matched by case title prefix + node id). The originals still sit in `c*.js`. When editing a question, edit it in **qpatch.js** (or, better, fold qpatch back into the c-files and delete it — then re-run `check_content.js`). `__PATCHWARN` must stay empty.
- `explore.js` existed during development and was spliced into `engine.js`; there is no separate file.
- Old copy on claude.ai (artifact) is stale; GitHub Pages is the source of truth.

## 5. Responsive behaviour (style.css bottom + engine `shell()`/`sideHTML()`)

- **< 700 px (iPhone):** single column, fixed bottom nav, big tap targets, safe-area insets, landscape-compact bar.
- **700–1099 px (iPad portrait):** wider page, 2-col module grid, 3-col sliders; from 900 px explorers go side-by-side and sort rows inline.
- **≥ 1100 px (laptop, iPad landscape):** fixed left sidebar (all modules + progress), main column ≤980 px, cases show a sticky monitor beside the story. Hover styles only with `(hover:hover) and (pointer:fine)`.
- Keyboard (desktop): A–D / 1–4 answer the first open question or case choice; → / Enter continue; ← back.
- Detection is by **width + pointer type**, not user agent (iPadOS reports as a Mac).

## 6. Content rules — must follow

**Audience & setting.** Saudi interns (12-month internship, not SCFHS-licensed) on their ER rotation, before SMLE/residency. Fictional tertiary hospital **Corniche Medical City (CMC), Jeddah**. Mentor: Dr. Hanan Al-Harbi (EM consultant). Registrar: Dr. Fahad Bakr. Charge nurse: Maricel. Hospital-specific items are labelled “CMC policy” so the real hospital can align them.

**Saudi context, no stereotypes.** The owner was explicit: *“just because it's Saudi it doesn't mean we live in tents and ride camels.”* Use modern urban Jeddah (Corniche, Obhur, Al-Safa, Madinah Road, weddings, kabsa, dust storms, Ramadan, Hajj/Umrah gateway, dengue). “Camel contact” appears only as one item of the official MOH MERS screening questions.

**Arabic.** Patient/relative lines are **Hijazi dialect** and must read as written by a native Jeddawi — never translated/MSA-sounding (e.g. دحين، كدا، إيش، أبغى، مو، كويس، لو سمحتوا). Font: IBM Plex Sans Arabic. Always gender correctly: speaker's own gender (حاسة، تعبانة) and the addressee via `{m|f}` tokens (يا {دكتور|دكتورة}، الله {يخليك|يخليكي}، {اكتبلي|اكتبيلي}، {يا ولدي|يا بنتي}). Get Arabic checked before shipping.

**Question design (owner asked for challenging but not overwhelming).** Distractors are realistic intern mistakes (not strawmen), similar length to the correct answer; every MCQ has a non-revealing hint and a “why not” for each wrong option; options/choices are shuffled at render. After edits run `check_content.js` — correct answer should not be the shortest or longest far above ~1/3 of the time. Teaching first, then testing; intuitive analogies in `call k:'idea'`; prefer an explorable over a static table where a concept is easier to feel than read.

**Clinical content.** Based on CTAS, AHA ACLS (adrenaline after 2nd shock; amiodarone 300 mg after 3rd, 150 mg after 5th), ATLS (10th ed burns 2 mL/kg/%TBSA), APLS paeds weights/doses, Surviving Sepsis hour-1 bundle, WHO dengue warning signs. Saudi rules verified Nov 2026: competent adult woman consents for herself (MOH directive); DNR decided by three physicians (2017 Saudi Health Council policy / Fatwa 12086), family informed; abuse reporting via Child Protection team / **1919**; interns can't issue sick leave (Seha), death certificates, medical reports, or discharge. Numbers: 997 Red Crescent, 911 unified (Makkah region), 999 police, 937 MOH. Any dose change → update the Pocket card (`POCKET` in c8.js) too.

## 7. Owner preferences

- Wants immediately usable, visual, interactive output; iterates with short, direct feedback.
- Not a clinician and not a web developer — explain choices in plain language, keep replies short.
- Arabic quality matters a lot; stereotypes are a hard no; anonymity matters.

## 8. Open items / ideas

1. Faculty review of all doses and “CMC policy” items; native Hijazi review of every `say` line — **in progress via the review copy**. When reviews come back, apply them (§2a), then run `python3 src/build.py --clean-live` to make the live link the clean course again.
2. Fold `qpatch.js` into the content files.
3. Optional: full Arabic UI toggle (only patient lines are Arabic today).
4. Optional: move to a neutral GitHub organization (anonymity), or let the hospital host it.
5. Optional: access control (Cloudflare Access by email) if the hospital wants it private — a JS password screen would be easy to bypass.
