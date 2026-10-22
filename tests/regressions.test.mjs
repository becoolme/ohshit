import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFileSync } from 'node:fs';
import { checkVersion } from '../src/lib/versions.ts';
import { smellIndex, daysSinceLast } from '../src/lib/metrics.ts';
import { incidentSchema } from '../src/lib/incident-schema.ts';

const php = [{ branch: '8.4', version: '8.4.27' }];
test('PHP release candidates, fixed versions and invalid input', () => {
  for (const value of ['8.4.27RC1', '8.4.27-RC1', '8.4.27beta2', '8.4.26', '8.4.27-dev']) {
    assert.equal(checkVersion(value, php, 'PHP').kind, 'bad', value);
  }
  for (const value of ['8.4.27', ' v8.4.28 ', '8.4.27+build.1']) {
    assert.equal(checkVersion(value, php, 'PHP').kind, 'ok', value);
  }
  for (const value of ['', '8.4..27', '8.4.27 garbage', '8.4.27.0', '8.4.27-ee', '8.4.27-unknown', '8.4.x']) {
    assert.equal(checkVersion(value, php, 'PHP').kind, 'invalid', value);
  }
  assert.equal(checkVersion('8.4', php).kind, 'incomplete');
  assert.equal(checkVersion('8.6.0', php).kind, 'unknown');
  assert.equal(checkVersion('8.4.28RC1', php).kind, 'unknown');
});

test('GitLab edition suffixes, longest branch and wildcard fallback', () => {
  const branches = [{ branch: '*', version: '18.11.13' }, { branch: '19.4', version: '19.4.3' }];
  for (const value of ['19.4.3-ee', '19.4.3-ee.0', '19.4.3-ce.0', '19.4.3']) {
    assert.equal(checkVersion(value, branches, 'GitLab').kind, 'ok', value);
  }
  for (const value of ['19.4.3-rc1', '19.4.2-ee', '18.11.12']) {
    assert.equal(checkVersion(value, branches, 'GitLab').kind, 'bad', value);
  }
  assert.equal(checkVersion('18.11.13', branches, 'GitLab').kind, 'ok');
  assert.equal(checkVersion('20.1.0', [{ branch: '20', version: 'none' }], 'Node').kind, 'eol');
});

const now = new Date('2026-10-21T00:00:00Z');
const incident = (date, level) => ({ data: { date: new Date(date), level } });
test('risk metrics exclude future and expired incidents, include exact boundary', () => {
  const entries = [incident('2026-11-01', 5), incident('2026-10-13T23:59:59Z', 5), incident('2026-10-14', 3)];
  assert.equal(smellIndex(entries, now), 3);
  assert.equal(smellIndex([entries[0]], now), 1);
  assert.equal(smellIndex([], now), 1);
  assert.equal(daysSinceLast(entries, now), 7);
  assert.equal(daysSinceLast([], now), 0);
  assert.equal(daysSinceLast([entries[0]], now), 0);
  assert.equal(daysSinceLast([incident('2026-10-18', 2), incident('2026-10-20', 3)], now), 1);
});

const valid = {
  title: 'A test security incident', level: 3, date: '2026-10-21', tags: ['test'],
  summary: 'Summary', splash: 'Who', wipe: 'Fix', checklist: [{ title: 'Patch' }],
  sources: [{ name: 'Vendor', url: 'https://example.com/advisory', primary: true }],
  fixed: [{ product: 'PHP', branch: '8.4', version: '8.4.27' }],
  checker: { runtime: 'PHP', command: 'php -v', examples: ['8.4.26', '8.4.27'] },
};
test('content sourcing and chronology rules', () => {
  assert.equal(incidentSchema.safeParse(valid).success, true);
  const secondary = [{ name: 'Report', url: 'https://example.com/report' }];
  assert.equal(incidentSchema.safeParse({ ...valid, sources: secondary }).success, false);
  const exception = 'Underlying filing is unavailable; this remains unverified.';
  assert.equal(incidentSchema.safeParse({ ...valid, sources: secondary, sourceException: exception }).success, false);
  assert.equal(incidentSchema.safeParse({ ...valid, sources: [...secondary, { name: 'Other report', url: 'https://example.org/report' }], sourceException: exception }).success, true);
  assert.equal(incidentSchema.safeParse({ ...valid, sourceException: 'A stale exception that should be removed.' }).success, false);
  assert.equal(incidentSchema.safeParse({ ...valid, updated: '2026-10-20' }).success, false);
  assert.equal(incidentSchema.safeParse({ ...valid, updated: '2026-10-21' }).success, true);
});

test('checker schema rejects unusable thresholds, duplicate branches and invalid examples', () => {
  for (const fixed of [[], [{ product: 'PHP', version: '8.4.27' }], [{ product: 'PHP', branch: '8.4', version: '8.3.27' }],
    [{ product: 'PHP', branch: '8.4', version: '8.4.27RC1' }], [valid.fixed[0], valid.fixed[0]]]) {
    assert.equal(incidentSchema.safeParse({ ...valid, fixed }).success, false, JSON.stringify(fixed));
  }
  assert.equal(incidentSchema.safeParse({ ...valid, checker: { ...valid.checker, examples: ['8.4..27', '8.4.27'] } }).success, false);
});

test('MCP copy payload is directly parseable JSON', () => {
  const source = readFileSync(new URL('../src/components/DevTabs.astro', import.meta.url), 'utf8');
  const payload = source.match(/code: `([\s\S]*?)`/)[1];
  assert.deepEqual(JSON.parse(payload), { mcpServers: { ohshit: { command: 'npx', args: ['-y', '@ohshit/mcp'] } } });
});

import { localizeIncident } from '../src/lib/localize.ts';
const en = {
  title: 'English title', headline: 'Short', tags: ['PHP'], summary: 's', splash: 'p', wipe: 'w', level: 5,
  cves: [{ id: 'CVE-2026-1', name: 'n', description: 'd', plain: 'pl' }],
  fixed: [{ product: 'PHP 8.4', branch: '8.4', version: '8.4.27', status: 'ok' }],
  mitigation: { file: 'php.ini', code: 'x = 1', note: 'n' },
  timeline: [{ date: 'Oct 20', title: 't' }],
  checklist: [{ title: 'c', hint: 'h' }],
  sources: [{ name: 'php.net', url: 'https://php.net/', says: 's', primary: true }],
};
const zh = {
  title: '中文标题', headline: '短', summary: '摘要', splash: '范围', wipe: '修复',
  cves: [{ name: '名', description: '描述', plain: '人话' }],
  fixed: [{ status: '已修复' }],
  mitigation: { note: '说明' },
  timeline: [{ date: '10月20日', title: '标题' }],
  checklist: [{ title: '清单', hint: '提示' }],
  sources: [{ says: '说法' }],
};
test('zh overlay swaps prose and keeps facts from English', () => {
  const out = localizeIncident(en, zh, 'x');
  assert.equal(out.title, '中文标题');
  assert.equal(out.level, 5);
  assert.deepEqual(out.tags, ['PHP']);
  assert.equal(out.cves[0].id, 'CVE-2026-1');
  assert.equal(out.cves[0].plain, '人话');
  assert.deepEqual(out.fixed[0], { product: 'PHP 8.4', branch: '8.4', version: '8.4.27', status: '已修复' });
  assert.deepEqual(out.mitigation, { file: 'php.ini', code: 'x = 1', note: '说明' });
  assert.equal(out.sources[0].url, 'https://php.net/');
  assert.equal(out.sources[0].says, '说法');
});

test('zh overlay rejects stale or incomplete translations', () => {
  assert.throws(() => localizeIncident(en, { ...zh, checklist: [] }, 'x'), /x\.checklist: has 0 items/);
  assert.throws(() => localizeIncident(en, { ...zh, headline: undefined }, 'x'), /x\.headline: missing/);
  assert.throws(() => localizeIncident(en, { ...zh, cves: [{ name: '名', description: '描述' }] }, 'x'), /cves\[0\]\.plain/);
  assert.throws(() => localizeIncident(en, { ...zh, mitigation: undefined }, 'x'), /mitigation\.note/);
});
