import type { APIRoute, GetStaticPaths } from 'astro';
import { getPosts } from '../../lib/posts';
import { renderOgImage } from '../../lib/og';

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return [
    ...posts.map((post) => ({
      params: { slug: post.id },
      props: { title: post.data.title, kicker: `${post.data.category ?? 'Writing'}`.toUpperCase() }
    })),
    {
      params: { slug: 'default' },
      props: { title: 'Agents that do real work, and the local inference that runs them.', kicker: 'AI ENGINEER · BENGALURU' }
    }
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage({ title: props.title, kicker: props.kicker, footer: 'akashrai2003.github.io' });
  return new Response(png as BodyInit, { headers: { 'Content-Type': 'image/png' } });
};
