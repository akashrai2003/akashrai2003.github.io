/**
 * GitHub-style alerts:
 *   > [!NOTE] Optional title
 *   > Body text…
 * Supported kinds: NOTE, TIP, IMPORTANT, WARNING, CAUTION.
 */
const KINDS = { NOTE: 'Note', TIP: 'Tip', IMPORTANT: 'Important', WARNING: 'Warning', CAUTION: 'Caution' };

export function remarkCallouts() {
  return (tree) => visit(tree);
}

function visit(node) {
  if (node.type === 'blockquote') transform(node);
  if (node.children) node.children.forEach(visit);
}

function transform(node) {
  const first = node.children?.[0];
  const text = first?.type === 'paragraph' ? first.children?.[0] : null;
  if (!text || text.type !== 'text') return;
  const match = text.value.match(/^\[!(\w+)\][ \t]*([^\n]*)\n?/);
  if (!match || !KINDS[match[1].toUpperCase()]) return;

  const kind = match[1].toLowerCase();
  const title = match[2].trim() || KINDS[match[1].toUpperCase()];
  text.value = text.value.slice(match[0].length);
  if (!text.value) first.children.shift();
  if (first.children.length && first.children[0].type === 'break') first.children.shift();
  if (!first.children.length) node.children.shift();

  node.data = { hName: 'aside', hProperties: { className: ['callout', `callout-${kind}`] } };
  node.children.unshift({
    type: 'paragraph',
    data: { hProperties: { className: ['callout-title'] } },
    children: [{ type: 'text', value: title }]
  });
}
