# Intelligent Neuromotor Control Lab website

Public website of the Intelligent Neuromotor Control Lab (INCL), Department of Kinesiology,
San José State University. PI: Dr. Hang Qu.

The site is a plain [Jekyll](https://jekyllrb.com) site that **GitHub Pages builds automatically**.
Nothing needs to be installed to maintain it: edit a file on github.com, commit, and the site
rebuilds in about a minute.

## Editing content (no local tools needed)

| What you want to change | File to edit |
|---|---|
| Add or remove a lab member, move someone to alumni | `_data/people.yml` |
| PI bio, title, links | `_data/people.yml` (the `pi:` block) |
| Collaborators (R15 team, international) | `_data/collaborators.yml` |
| Publications | `_data/publications.yml` |
| Conference presentations | `_data/presentations.yml` |
| Research themes (home cards and the Research page) | `_data/research.yml` |
| News items on the home page | `_data/news.yml` |
| Site title, tagline, contact details, navigation | `_config.yml` |
| Text on the Research, Join, People pages | `research.html`, `join.html`, `people.html` |

Each data file starts with a comment showing the fields and an example entry.

### Photos

- People and collaborators: square images, about 600 x 600 px, JPG, saved in
  `assets/img/people/` or `assets/img/collaborators/`. Reference them as
  `photo: /assets/img/people/first-last.jpg`.
- PI portrait: a 3:4 portrait, about 800 x 1070 px, JPG. To replace it, upload the new file and
  point `photo:` in `_data/people.yml` at it.
- Keep files under about 200 KB. Any image editor's "export for web" setting is fine.

### Adding a publication

```yaml
- authors: "Qu H, Coauthor A, Coauthor B"
  year: 2026
  title: "Full title of the paper"
  journal: Journal Name
  volume: "12(3)"
  pages: "100-110"
  doi: 10.1000/example
```

Write the PI's name as `Qu H` so it is bolded automatically. `doi` is preferred; `url` works too.
Write `year` as a plain number without quotes; a quoted year stops the site from building.

## Deploying on GitHub Pages

1. Push this repository to GitHub.
2. In the repository: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
3. The site appears at `https://<account>.github.io/<repository>/` within a couple of minutes.

The address must match `url` and `baseurl` in `_config.yml`:

| Where the site lives | `url` | `baseurl` |
|---|---|---|
| `https://quhang1992.github.io/incl-lab/` (repository `incl-lab` under a personal account) | `https://quhang1992.github.io` | `/incl-lab` |
| `https://incl-sjsu.github.io/` (organization `incl-sjsu`, repository `incl-sjsu.github.io`) | `https://incl-sjsu.github.io` | `""` |
| A custom domain | `https://your-domain` | `""` plus a `CNAME` file |

## Local preview (optional)

Requires Ruby. The `github-pages` gem pins the exact versions GitHub uses (Jekyll 3.10).

```bash
bundle install
bundle exec jekyll serve
# open http://127.0.0.1:4000/incl-lab/  (or http://127.0.0.1:4000/ when baseurl is "")
```

## Structure

```
_config.yml        site settings, contact details, navigation
_data/             all editable content (people, collaborators, publications, presentations, research, news)
_layouts/          page skeletons
_includes/         header, footer, member card, publication item
assets/css/        one stylesheet, no build step
assets/js/         the mobile menu toggle
assets/img/logo/   logo files (colour, white, gold; horizontal and square)
index.html, research.html, people.html, collaborators.html, publications.html, join.html
```

## Brand

Colours follow the SJSU brand palette: SJSU Blue `#0055A2`, SJSU Gold `#E5A823`, with SJSU's web grays
for neutrals. The typeface is Nunito Sans, which SJSU's web standards name for website headers; the
university's proprietary SJSU Spartan typeface is licensed for official sjsu.edu publications only and
is not embedded here. The university name is always written "San José State University" with the accent,
and "SJSU" only on second reference, following the SJSU editorial style guide. The light page base is
`#EEF2F7`; the "night sky" bands use `#061532` to `#0B2A52`. The colour logo is used on light
surfaces, the white logo on dark surfaces, and gold is reserved for accents and buttons because
gold text on a light background does not meet contrast requirements.

Extra brand files kept in `assets/img/logo/` for reuse elsewhere (slides, posters): the square
colour logo, the gold horizontal logo, and the three-line wordmark as SVG in blue, gold, and white.
