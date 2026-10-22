#!/usr/bin/env node
// Stdio MCP server that reads the public OhShit! JSON API. No key, no state.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const BASE = (process.env.OHSHIT_API ?? 'https://ohshit.app/api/v1').replace(/\/$/, '');

async function get(path) {
  const res = await fetch(`${BASE}${path}`, { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}
const text = (value) => ({ content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] });

const server = new McpServer({ name: 'ohshit', version: '0.1.0' });

server.tool(
  'list_incidents',
  'List recent security incidents, newest first. Filter by minimum level (1-5), ecosystem or tag.',
  {
    min_level: z.number().int().min(1).max(5).optional(),
    ecosystem: z.string().optional().describe('e.g. php, node, gitlab'),
    tag: z.string().optional(),
    limit: z.number().int().min(1).max(100).default(20),
  },
  async ({ min_level, ecosystem, tag, limit }) => {
    const { data } = await get('/incidents.json');
    const hits = data
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
