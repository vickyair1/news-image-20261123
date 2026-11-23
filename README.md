# The World in One Image — Monday 23 November 2026

[![make.fun · news-image-20261123](https://make.fun/badge/news-image-20261123.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![rank](https://make.fun/badge/news-image-20261123/vickyair1/news-image-20261123/rank.svg)](https://make.fun/bounty/news-image-20261123/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)
[![reward](https://make.fun/badge/news-image-20261123/vickyair1/news-image-20261123/reward.svg)](https://make.fun/bounty/news-image-20261123?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261123)

My entry for the [make.fun bounty "Sum up 23 November's world news in one image"](https://make.fun/c/news-image-20261123/): one packed newspaper front page for Monday 23 November 2026.

## What the page carries

36 stories from seven regions. All three leads are genuinely from Monday 23 November: New Zealand battling to save the Wellington Test on day five (132/2, Conway 65 not out, after India's record 720/9), Nepal's PM Balendra Shah sitting down with Modi in Delhi, and Singapore and China holding their 22nd Joint Council. Saturday and Sunday stories carry their day in the text:

- **3 leads** — NZ–India day five in Wellington, the Shah–Modi meeting in Delhi, and the China–Singapore Joint Council.
- **10 features** — COP31 falling apart with no deal on Sunday (the first full COP failure since Copenhagen 2009), Alcaraz taking the ATP Finals from Zverev 6-2, 7-6(7), Verstappen winning a Las Vegas Grand Prix with 35 lead changes, Liverpool beating Manchester United 4-0 on Pochettino's debut, the Sparta II towed out of Finnish waters, the Board of Peace warning Israel over the stalled Hamas disarmament plan, Iran's war at sea in the Strait of Hormuz, two people hurt in the Bahrain attack, course records at the Philadelphia Marathon, and Monday Night Football tonight (Bengals at Commanders).
- **23 one-line briefs** (14–36), a stat strip, a region count, a dotted world map with numbered pins for stories 01–13, a DATE CHECK box listing the stories kept out on purpose (the 16 Nov tanker-mine claim re-reported on Monday, the Peru quake, the El Chapo capture, the Eisenkot mandate, Roundup, the Gupta sentence, the Basra fire, Nitish Setu, England 37-12, Leeds 4-1, the US airlines warning, the Hegseth memo), and a sources footer.

Every picture is a PIL-drawn illustration — no photographs, no generated images — so no text comes out garbled. Claims carry attributions; forecasts (the Shah–Modi talks, the Singapore–China meeting, Monday Night Football) are marked FORECAST. Wires as of about 00:10 UTC, Monday 23 November 2026.

## Contents

- `main.ts` — hands `entry.png` to the output directory (Node 22, stdlib only; deterministic, so two runs write the same bytes).
- `entry.png` — the front page, a 1024×1024 PNG.
- `LICENSE` — MIT licence.

## How to run it

First `mkdir -p out`, then run `MAKEFUN_OUTPUT_DIR=out node main.ts`.
