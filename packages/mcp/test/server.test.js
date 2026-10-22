import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createServer } from 'node:http';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'node:url';

test('stdio tools support date filters, validation, details and API failures', { timeout: 20000 }, async () => {
  const today = Date.now();
  const date = (days) => new Date(today - days * 864e5).toISOString().slice(0, 10);
  const entry = (id, days, level, ecosystem = 'php') => ({
    id, date: date(days), level, ecosystems: [ecosystem], tags: ['RCE'], title: id,
  });
  // Intentionally place an old record first to verify filtering precedes limit.
  const data = [entry('old', 30, 5), entry('future', -2, 5), entry('recent', 1, 4), entry('node', 2, 3, 'node')];
  const api = createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.url === '/incidents.json') response.end(JSON.stringify({ data }));
    else if (request.url === '/incidents/recent.json') response.end(JSON.stringify({ ...data[2], timeline: [], sources: [] }));
    else if (request.url === '/smell-index.json') response.end(JSON.stringify({ level: 4 }));
    else { response.statusCode = 404; response.end('{}'); }
  });
  await new Promise((resolve) => api.listen(0, '127.0.0.1', resolve));
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL('../index.js', import.meta.url))],
    env: { ...process.env, OHSHIT_API: `http://127.0.0.1:${api.address().port}` },
  });
  const client = new Client({ name: 'regression-tests', version: '1.0.0' });
  const call = (name, args = {}) => client.callTool({ name, arguments: args });
  const json = (result) => JSON.parse(result.content[0].text);
  try {
    await client.connect(transport);
    const { tools } = await client.listTools();
    assert.deepEqual(tools.map((tool) => tool.name).sort(), ['get_incident', 'list_incidents', 'smell_index']);
    assert.ok(tools.find((tool) => tool.name === 'list_incidents').inputSchema.properties.days);
    assert.deepEqual(json(await call('list_incidents', { days: 7, min_level: 4, ecosystem: 'PHP', tag: 'rce', limit: 1 })).map((i) => i.id), ['recent']);
    assert.deepEqual(json(await call('list_incidents', { days: 1 })).map((i) => i.id), []);
    assert.ok(!json(await call('list_incidents')).some((i) => i.id === 'future'));
    assert.equal(json(await call('get_incident', { id: 'recent' })).id, 'recent');
    assert.equal(json(await call('smell_index')).level, 4);
    assert.equal((await call('get_incident', { id: 'missing' })).isError, true);
    const invalid = await call('list_incidents', { days: 0 });
    assert.equal(invalid.isError, true);
  } finally {
    await client.close();
    await transport.close();
    await new Promise((resolve) => api.close(resolve));
  }
});
