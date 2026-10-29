import assert from 'node:assert/strict';
import { test } from 'node:test';
import { incidentOg } from '../src/lib/incident-og.ts';

const incident = {
  title: 'Incident title', level: 4, date: new Date('2026-10-29T00:00:00Z'),
  tags: ['npm'], cves: [{ id: 'CVE-2026-10000', score: 8.1 }, { id: 'CVE-2026-10001', score: 9.8 }],
};

test('incident OG uses localized content, dates and labels while retaining CVE facts', () => {
  const en = incidentOg(incident, 'en');
  const zh = incidentOg({ ...incident, title: '中文标题', headline: '中文短标题' }, 'zh');
  assert.equal(en.title, 'Incident title');
  assert.equal(en.kicker, '// CRIME SCENE: NPM');
  assert.deepEqual(en.meta, ['Oct 29, 2026', '2 CVEs', 'CVSS 9.8']);
  assert.equal(zh.lang, 'zh');
  assert.equal(zh.title, '中文短标题');
  assert.equal(zh.kicker, '// 案发现场: NPM');
  assert.deepEqual(zh.meta, ['2026年10月29日', '2 个 CVE', 'CVSS 9.8']);
  assert.equal(zh.level, 4);
});

test('incident OG preserves approximate dates and handles a single or absent CVE', () => {
  const single = incidentOg({ ...incident, dateIsApproximate: true, cves: [{ id: 'CVE-2026-10000' }] }, 'zh');
  assert.deepEqual(single.meta, ['2026年10月', 'CVE-2026-10000']);
  const none = incidentOg({ ...incident, cves: [] }, 'en');
  assert.deepEqual(none.meta, ['Oct 29, 2026']);
});
