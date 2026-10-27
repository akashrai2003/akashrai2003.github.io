# Writing guide

Everything you need to publish a post, plus a short playbook for sharing it.

## 1. Start a post

```bash
npm run new -- "How FP8 KV cache doubled our concurrency"
npm run dev            # http://localhost:4321/blog/how-fp8-kv-cache-doubled-our-concurrency/
```

This creates `src/content/blog/<slug>.md` with `draft: true`. Drafts appear in `npm run dev`
(marked **draft**) but are never built or deployed. Delete the `draft` line when you're ready, then
merge to `main`. GitHub Actions deploys in about a minute.

The file name becomes the URL, so pick it carefully and don't rename it after sharing.

## 2. Frontmatter

```yaml
---
title: "How FP8 KV cache doubled our concurrency"
description: "One or two sentences. Shown under the title, in the post list, RSS, and LinkedIn/X previews."
pubDate: 2026-11-02
updatedDate: 2026-11-10        # optional, shows "Updated …"
category: "Inference & GPU"    # shown above the title and on the share image
tags: ["vLLM", "FP8", "KV cache"]
series: "vLLM in production"   # optional, links posts with the same series together
crossposts:                    # optional, "Also on: …" links at the end
  - { label: "LinkedIn", url: "https://www.linkedin.com/pulse/…" }
draft: true
---
```

Each post automatically gets a share image (`/og/<slug>.png`), a table of contents, reading time,
an RSS entry, a sitemap entry and structured data for search engines.

## 3. What you can use in Markdown

Use `##` for sections and `###` for subsections (the page title is already the `#`). They feed the
table of contents, and each heading gets a `#` anchor link you can share.

**Callouts** (GitHub-style):

```md
> [!NOTE] Optional custom title
> Context the reader should know.

> [!TIP]
> A shortcut or the key takeaway.

> [!WARNING]
> A footgun.
```

Kinds: `NOTE`, `TIP`, `IMPORTANT`, `WARNING`, `CAUTION`. A plain `>` blockquote still works for quotes.

**Code** with syntax highlighting, a language label and a copy button:

````md
```python
llm = LLM(model="Qwen/Qwen3-8B-FP8", kv_cache_dtype="fp8")
```
````

**Math** with KaTeX: inline `$O(n^2)$` and display blocks:

```md
$$
\text{KV bytes/token} = 2 \cdot L \cdot H_{kv} \cdot d_{head} \cdot b
$$
```

**Footnotes**: `vLLM uses paged attention[^1].` and then `[^1]: Kwon et al., SOSP 2023.` at the bottom.

**Images**: put them in `public/blog/<slug>/` and reference them with
`![Alt text describing the figure](/blog/<slug>/diagram.png)`. Use real alt text. For a caption,
use plain HTML (it works in `.md` too):

```html
<figure>
  <img src="/blog/<slug>/diagram.png" alt="…" />
  <figcaption>Figure 1. Prefill vs decode.</figcaption>
</figure>
```

**Tables**: standard GFM tables. They scroll sideways on phones instead of breaking the layout.

**Highlight**: `<mark>important phrase</mark>`.

**Interactive figures**: rename the post to `.mdx`, import a component under the frontmatter and drop
it in anywhere. The vLLM post does this with the live KV-cache animation:

```mdx
import KvCache from '../../components/KvCache.astro';

<KvCache caption="A simulated paged KV cache." />
```

## 4. Making posts easy to read

These matter more than any styling:

- **Lead with the payoff.** The first paragraph should say what the reader will learn and why it
  matters. Put the result (numbers, graph) near the top and explain how you got there afterwards.
- **One idea per section.** If a `##` section runs past roughly 5 screens, split it.
- **Short paragraphs** (2–4 sentences). Walls of text are where readers leave.
- **Show real numbers and real errors.** "22K → 40K context at ~750 tok/s on a 5060 Ti" beats
  "significantly improved throughput". Paste the actual stack trace.
- **Diagrams over prose** for architecture. Excalidraw exports (SVG/PNG) look great here.
- **End with takeaways** in a `> [!TIP]` callout, plus references.
- Aim for 6–15 minutes. Longer deep-dives are fine if they're a **series** (use `series:`).
- Use your own voice: "I", "we", what went wrong. That is what people remember and share.

## 5. Sharing a post

Your site is the canonical home. Everything else points back to it.

**LinkedIn** (where most of your audience is):
1. Don't just drop a link. Write a native post: a hook line, 3–5 short lines or bullets with the key
   insight or numbers, then "Full write-up with code and diagrams 👇" and the link. LinkedIn shows
   the generated preview card. You can also put the link in the first comment.
2. Attach 1 image (a diagram from the post) or a PDF carousel of 5–8 slides. Those get far more
   reach than link posts.
3. Post Tuesday to Thursday mornings IST/US-overlap. Reply to every comment in the first hour.
4. Optional: republish the full text as a LinkedIn Article a week later, with a line at the top:
   "Originally published at akashrai2003.github.io/blog/…".

**Substack / newsletter**: if you want email subscribers, create a free Substack, Buttondown or
beehiiv account and set `newsletterUrl` in `src/data/siteConfig.ts`. A "Subscribe by email" button
then appears on every post. Paste each post into the newsletter (or use Buttondown's RSS-to-email
with `/rss.xml`) with a link back to the original.

**X / Hacker News / Reddit**: the share buttons at the end of each post prefill the link. Good
subreddits for this content: r/LocalLLaMA and r/MachineLearning. Read their self-promo rules first.

**Before sharing**: paste the URL into https://www.linkedin.com/post-inspector/ to warm LinkedIn's
preview cache and check the card looks right.

## 6. Ideas from your own work

Topics only you can write about, and where they come from:

- *Running Gemma NVFP4 on an RTX 5060 Ti (SM120): every error and the fix*
- *22K → 40K context on 16 GB: FP8 KV cache + prompt-aware batching, with numbers*
- *Shipping LLMs into an air-gapped network: packaging models, wheels and images offline*
- *Why we replaced RAG with SAQL generation for numeric business questions*
- *A memory layer that revises facts when newer documents supersede old ones*
- *What I learned getting a PR merged into kepler.gl*
- *DAPT + LoRA on 4×L40S: did domain pre-training beat the base model?*
- *Building Inkwell: grounding AI notes to exact PDF coordinates*
- *Learning CUDA from scratch*, as a running series. "Learning in public" posts build an audience fast.
