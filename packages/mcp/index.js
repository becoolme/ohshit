#!/usr/bin/env node
// Stdio MCP server that reads the public OhShit! JSON API. No key, no state.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const BASE = (process.env.OHSHIT_API ?? 'https://ohshit.app/api/v1').replace(/\/$/, '');

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { accept: 'application/json' }, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}
const text = (value) => ({ content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] });

const server = new McpServer({ name: 'ohshit', version: '0.1.1' });

server.tool(
  'list_incidents',
  'List recent security incidents, newest first. Filter by minimum level (1-5), ecosystem, tag or days (rolling UTC window).',
  {
    min_level: z.number().int().min(1).max(5).optional(),
    ecosystem: z.string().optional().describe('e.g. php, node, gitlab'),
    tag: z.string().optional(),
    days: z.number().int().min(1).max(36500).optional().describe('Only incidents within this many days, inclusive; excludes future dates.'),
    limit: z.number().int().min(1).max(100).default(20),
  },
  async ({ min_level, ecosystem, tag, days, limit }) => {
    const { data } = await get('/incidents.json');
    const now = Date.now();
    const hits = data
      .filter((i) => {
        const age = now - Date.parse(i.date);
        return Number.isFinite(age) && age >= 0 && (days === undefined || age <= days * 864e5);
      })
      .filter((i) => !min_level || i.level >= min_level)
      .filter((i) => !ecosystem || i.ecosystems.includes(ecosystem.toLowerCase()))
      .filter((i) => !tag || i.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
      .slice(0, limit)
      .map(({ id, title, level, level_name, date, splash, wipe, url }) => ({ id, title, level, level_name, date, splash, wipe, url }));
    return text(hits);
  },
);

server.tool(
  'get_incident',
  'Full details of one incident: CVEs, fixed versions, timeline, checklist and sources.',
  { id: z.string().describe('Incident id, e.g. php2shell') },
  async ({ id }) => text(await get(`/incidents/${encodeURIComponent(id)}.json`)),
);

server.tool('smell_index', 'Current internet-wide Shit Index (highest level in the last 7 days).', {}, async () =>
  text(await get('/smell-index.json')),
);

await server.connect(new StdioServerTransport());
