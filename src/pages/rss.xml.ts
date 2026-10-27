import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';
import { siteConfig } from '../data/siteConfig';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${siteConfig.name} — Writing`,
    description: 'Notes and deep-dives on LLM inference, retrieval, agents and the systems that run them.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: postUrl(post),
      categories: post.data.tags
    })),
    customData: '<language>en-us</language>'
  });
}
