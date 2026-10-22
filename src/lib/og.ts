import fs from 'node:fs';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { LEVELS, type Level } from './levels';

/**
 * Build-time Open Graph images (1200×630 PNG) for Twitter/X, Slack, etc.
 * Rendered with satori (HTML/CSS → SVG) and resvg (SVG → PNG). No runtime service.
 */
const require = createRequire(import.meta.url);
const font = (pkg: string, file: string) => fs.readFileSync(require.resolve(`${pkg}/files/${file}`));

let fonts: Parameters<typeof satori>[1]['fonts'] | undefined;
function loadFonts() {
  return (fonts ??= [
    { name: 'Inter', data: font('@fontsource/inter', 'inter-latin-500-normal.woff'), weight: 500, style: 'normal' },
    { name: 'Inter', data: font('@fontsource/inter', 'inter-latin-800-normal.woff'), weight: 800, style: 'normal' },
    { name: 'Archivo Black', data: font('@fontsource/archivo-black', 'archivo-black-latin-400-normal.woff'), weight: 400, style: 'normal' },
    { name: 'Mono', data: font('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-700-normal.woff'), weight: 700, style: 'normal' },
  ]);
}

const C = { bg: '#1A120B', text: '#FBF3E4', muted: '#E6D6BC', line: '#4E3824', yellow: '#FFC93C', orange: '#FF6B2C' };

const poop = (fill: string) =>
  'data:image/svg+xml;base64,' +
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><g fill="${fill}" stroke="${C.bg}" stroke-width="1.2"><rect x="3" y="22" width="26" height="7" rx="3.5"/><rect x="6" y="15.5" width="20" height="7" rx="3.5"/><rect x="9.5" y="9" width="13" height="7" rx="3.5"/><path d="M13.5 9.5c0-3 2-5.2 5.5-6.5-.8 2 .3 3.6 1.5 4.6.9.8.6 1.9-.6 1.9z"/></g></svg>`,
  ).toString('base64');

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children, ...extra },
});

const hazard = (color: string) =>
  h('div', {
    width: '100%',
    height: 22,
    backgroundImage: `repeating-linear-gradient(-45deg, ${color} 0px, ${color} 22px, ${C.bg} 22px, ${C.bg} 44px)`,
  });

const wordmark = () =>
  h('div', { alignItems: 'center', gap: 14 }, [
    { type: 'img', props: { src: poop(C.yellow), width: 56, height: 56 } },
    h('div', { fontFamily: 'Archivo Black', fontSize: 44, color: C.text }, [
      h('span', {}, 'Oh'),
      h('span', { color: C.yellow }, 'Shit'),
      h('span', { color: C.orange }, '!'),
    ]),
  ]);

export interface OgInput {
  title: string;
  level?: Level;
  kicker?: string;
  meta?: string[];
}

export async function renderOg({ title, level, kicker, meta = [] }: OgInput): Promise<Buffer> {
  const L = level ? LEVELS[level] : undefined;
  const size = title.length > 70 ? 56 : title.length > 45 ? 66 : 76;

  const tree = h('div', { width: 1200, height: 630, flexDirection: 'column', background: C.bg, color: C.text, fontFamily: 'Inter' }, [
    hazard(L && level! >= 4 ? C.orange : C.yellow),
    h('div', { flex: 1, flexDirection: 'column', padding: '44px 64px 40px' }, [
      h('div', { justifyContent: 'space-between', alignItems: 'center' }, [
        wordmark(),
        L
          ? h('div', { alignItems: 'center', gap: 6, background: L.color, color: C.bg, border: `4px solid ${C.bg}`, boxShadow: `6px 6px 0 ${C.orange}`, padding: '10px 18px', fontWeight: 800, fontSize: 28 }, [
              ...Array.from({ length: L.n }, () => ({ type: 'img', props: { src: poop(C.bg), width: 26, height: 26 } })),
              h('span', { marginLeft: 8 }, `L${L.n} ${L.name}`),
            ])
          : h('div', {}, ''),
      ]),
      h('div', { flex: 1, flexDirection: 'column', justifyContent: 'center' }, [
        kicker ? h('div', { fontFamily: 'Mono', fontWeight: 700, fontSize: 26, color: C.yellow, marginBottom: 14 }, kicker) : h('div', {}, ''),
        h('div', { fontFamily: 'Archivo Black', fontSize: size, lineHeight: 1.08, letterSpacing: -1, maxWidth: 1070 }, title),
      ]),
      h('div', { justifyContent: 'space-between', alignItems: 'center', borderTop: `3px solid ${C.line}`, paddingTop: 22, fontSize: 26, color: C.muted, fontWeight: 500 }, [
        h('div', { gap: 28 }, meta.map((m) => h('span', {}, m))),
        h('span', { fontFamily: 'Mono', fontWeight: 700, color: C.yellow }, 'ohshit.app'),
      ]),
    ]),
  ]);

  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: loadFonts() });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
