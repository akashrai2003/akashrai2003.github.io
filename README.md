# akashrai2003.github.io

Personal site and blog of Akash Rai, built with [Astro](https://astro.build). Every page is
static HTML, so posts have real URLs and proper link previews on LinkedIn and X.

```bash
npm install
npm run dev                      # http://localhost:4321
npm run new -- "Post title"      # scaffold a draft post
npm run build                    # type-check + build to dist/
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Where things live

| What | Where |
| --- | --- |
| Blog posts (Markdown/MDX) | `src/content/blog/` |
| Name, links, newsletter URL | `src/data/siteConfig.ts` |
| Experience, projects, case studies, skills | `src/data/*.ts` |
| Pages | `src/pages/` |
| Styles (colors, fonts) | `src/styles/global.css`, `src/styles/prose.css` |
| Résumé PDF | `public/resume/Akash_Rai_Resume.pdf` |

See **[WRITING.md](./WRITING.md)** for how to write and share posts.
