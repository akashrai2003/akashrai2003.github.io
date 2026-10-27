import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => readFileSync(require.resolve(`${pkg}/files/${file}`));

const fonts = [
  { name: 'Inter', data: font('@fontsource/inter', 'inter-latin-400-normal.woff'), weight: 400 as const },
  { name: 'Inter', data: font('@fontsource/inter', 'inter-latin-700-normal.woff'), weight: 700 as const },
  { name: 'Mono', data: font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-400-normal.woff'), weight: 400 as const }
];

const logo = `data:image/png;base64,${readFileSync('public/logo.png').toString('base64')}`;

// Tiny hyperscript helper so we don't need React/JSX for satori.
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: Array<Node | string>): Node => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children }
});

export async function renderOgImage(opts: { title: string; kicker: string; footer: string }): Promise<Uint8Array> {
  const titleSize = opts.title.length > 90 ? 52 : opts.title.length > 60 ? 60 : 68;
  const tree = h(
    'div',
    {
      width: 1200,
      height: 630,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 80px',
      background: '#0e1110',
      color: '#e6eae7',
      fontFamily: 'Inter',
      borderTop: '10px solid #5ee08f'
    },
    h('div', { display: 'flex', fontFamily: 'Mono', fontSize: 26, color: '#5ee08f' }, opts.kicker),
    h(
      'div',
      { display: 'flex', fontSize: titleSize, fontWeight: 700, lineHeight: 1.12, letterSpacing: '-0.02em' },
      opts.title
    ),
    h(
      'div',
      { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 28, color: '#87918b' },
      h(
        'div',
        { display: 'flex', alignItems: 'center', gap: '18px' },
        { type: 'img', props: { src: logo, width: 56, height: 56, style: { borderRadius: 10 } } },
        h('div', { display: 'flex', color: '#e6eae7', fontWeight: 700 }, 'Akash Rai')
      ),
      h('div', { display: 'flex', fontFamily: 'Mono', fontSize: 24 }, opts.footer)
    )
  );

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
