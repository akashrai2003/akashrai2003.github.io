import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    /** Group related posts, e.g. "vLLM internals". Shown as a series box. */
    series: z.string().optional(),
    /** Where else this post lives (LinkedIn article, Substack…). */
    crossposts: z.array(z.object({ label: z.string(), url: z.url() })).default([])
  })
});

export const collections = { blog };
