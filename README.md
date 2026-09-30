# DynamicHOI project page

Project page for *DynamicHOI: Coupled Dynamics for Physics-aware HOI Reconstruction*
(Wenliang Guo, Zhanbo Huang, Yu Kong — Michigan State University).

Live at <https://wenliangguo.github.io/HOI-Reconstruction-Page/>.

The site is static: `index.html` + `static/` (CSS, JS, figures, demo videos), no build step.
`.nojekyll` keeps GitHub Pages from running Jekyll on it.

## To do before the paper release

- Hero section: replace the *Code (Coming Soon)* button with the code link
  (set `href` and drop the `is-disabled-link` class).
- Citation section: currently commented out in `index.html`; restore it with the final BibTeX.

## Preview locally

```bash
python3 -m http.server 8000
```

then open <http://localhost:8000>.

The page layout is adapted from the [Nerfies](https://github.com/nerfies/nerfies.github.io) template
(CC BY-SA 4.0).
