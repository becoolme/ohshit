export interface FixedBranch {
  branch: string;
  version: string;
}

export function parseVersion(raw: string, runtime = '') {
  const value = raw.trim().replace(/^v/i, '');
  const match = /^(\d+(?:\.\d+){0,2})(.*)$/.exec(value);
  if (!match) return null;
  const parts = match[1].split('.').map(Number);
  if (parts.some((n) => !Number.isSafeInteger(n))) return null;
  const suffix = match[2];
  const edition = runtime.toLowerCase() === 'gitlab' && /^-(?:ee|ce)(?:\.\d+)?$/.test(suffix);
  const prerelease = /^-?(?:dev|alpha|a|beta|b|rc|pre|preview)(?:[.-]?\d+)?$/i.test(suffix);
  const metadata = /^\+[\da-z-]+(?:\.[\da-z-]+)*$/i.test(suffix);
  if (suffix && !edition && !prerelease && !metadata) return null;
  return { value, parts, prerelease };
}

export function compareVersions(a: number[], b: number[]) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const difference = (a[i] ?? 0) - (b[i] ?? 0);
    if (difference) return Math.sign(difference);
  }
  return 0;
}

/** Unknown inputs must never produce a patched verdict. */
export function checkVersion(raw: string, branches: FixedBranch[], runtime = '') {
  const parsed = parseVersion(raw, runtime);
  if (!parsed) return { kind: 'invalid' as const };
  const v = parsed.parts.join('.');
  const branch = branches
    .filter((b) => v === b.branch || v.startsWith(b.branch + '.'))
    .sort((a, b) => b.branch.length - a.branch.length)[0]
    ?? branches.find((b) => b.branch === '*');
  if (parsed.parts.length !== 3) return { kind: 'incomplete' as const };
  if (!branch) return { kind: 'unknown' as const };
  if (branch.version === 'none') return { kind: 'eol' as const };
  const fixed = parseVersion(branch.version);
  if (!fixed || fixed.parts.length !== 3 || fixed.prerelease) return { kind: 'unknown' as const };
  const comparison = compareVersions(parsed.parts, fixed.parts);
  const kind = parsed.prerelease && comparison > 0 ? 'unknown'
    : comparison < 0 || (comparison === 0 && parsed.prerelease) ? 'bad' : 'ok';
  return { kind, version: parsed.value, fixed: branch.version };
}
