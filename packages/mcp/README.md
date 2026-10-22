# @ohshit/mcp

MCP server for [OhShit!](https://ohshit.app): every security incident on the internet, graded by stench.
It reads the public JSON API at `https://ohshit.app/api/v1`. No key, no state.

```json
{
  "mcpServers": {
    "ohshit": { "command": "npx", "args": ["-y", "@ohshit/mcp"] }
  }
}
```

Then ask your agent: "Any L4+ incidents in the last 7 days?" or "Is PHP 8.4.26 hit by anything on OhShit?"

| Tool | Does |
| --- | --- |
| `list_incidents` | Recent incidents, newest first. Filter by `min_level` (1–5), `ecosystem`, `tag`; `limit` defaults to 20 |
| `get_incident` | One incident by id: CVEs, fixed versions, timeline, checklist and sources |
| `smell_index` | Highest level in the last 7 days, and days since the last incident |

Set `OHSHIT_API` to use a mirror. Requires Node.js 20+.

## License

MIT
