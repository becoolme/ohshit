export type Level = 1 | 2 | 3 | 4 | 5;

export interface LevelInfo {
  n: Level;
  slug: string;
  name: string;
  color: string;
  desc: string;
  when: string;
  advice: string;
}

export const LEVELS: Record<Level, LevelInfo> = {
  1: {
    n: 1,
    slug: 'silent-fart',
    name: 'Silent Fart',
    color: '#E9DCC2',
    desc: 'Smells, but clears fast. A theoretical bug with no exploitation in the wild.',
    when: 'Just be aware',
    advice: 'Barely a whiff. Carry on.',
  },
  2: {
    n: 2,
    slug: 'bit-of-a-leak',
    name: 'Bit of a Leak',
    color: '#FFE08A',
    desc: 'Narrow impact or hard-to-meet conditions.',
    when: 'Fix it next sprint',
    advice: 'Something’s dripping. Put it on the sprint.',
  },
  3: {
    n: 3,
    slug: 'sharted',
    name: 'Sharted',
    color: '#FFC93C',
    desc: 'A mainstream component is hit, or a proof-of-concept is public.',
    when: 'Handle it this week',
    advice: 'Find the plunger this week.',
  },
  4: {
    n: 4,
    slug: 'septic-tank-blew',
    name: 'Septic Tank Blew',
    color: '#FF9A3C',
    desc: 'Mass data leak or active exploitation in the wild.',
    when: 'Check and patch today',
    advice: 'Check your deps today.',
  },
  5: {
    n: 5,
    slug: 'shitstorm',
    name: 'Shitstorm',
    color: '#FF6B2C',
    desc: 'Internet-scale. A worm is spreading, a core runtime or trust anchor is broken.',
    when: 'Drop everything now',
    advice: 'Everyone, drop everything.',
  },
};

export const levelList = Object.values(LEVELS);
