import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

/** Exposes `minutesRead` on the rendered entry's remarkPluginFrontmatter. */
export function remarkReadingTime() {
  return (tree, { data }) => {
    const stats = getReadingTime(toString(tree));
    data.astro.frontmatter.minutesRead = Math.max(1, Math.round(stats.minutes));
  };
}
