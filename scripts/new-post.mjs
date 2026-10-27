#!/usr/bin/env node
// Usage: npm run new -- "My post title"
import { existsSync, writeFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "My post title"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const file = `src/content/blog/${slug}.md`;
if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
description: "One or two sentences: what will the reader learn? This is also the LinkedIn/X preview text."
pubDate: ${today}
category: "Inference & GPU"
tags: []
draft: true
---

Open with the problem in one or two short paragraphs. Why should the reader care?

## The setup

## What I tried

## What actually worked

> [!TIP] Takeaway
> The one thing you want the reader to remember.

## References
`
);
console.log(`Created ${file} (draft: true, so it only shows in \`npm run dev\`)`);
