# Simplified Chinese translation guide

Every incident `incidents/<year>/<yyyy-mm-dd>-<slug>.md` can have a Chinese translation next to it:
`<yyyy-mm-dd>-<slug>.zh.md`. The build merges it over the English file (`src/lib/localize.ts`).

## What goes in a `.zh.md` file

Only prose. Everything else (date, level, versions, URLs, CVE ids, scores, branches, checker,
`mitigation.file`) always comes from the English file, so do not copy it.

| Field | Rule |
| --- | --- |
| `title`, `summary`, `splash`, `wipe` | Required |
| `headline`, `inTheWildNote`, `oneLiner`, `sourceException` | Required when the English file has them |
| `tags` | Optional. Translate generic words (数据泄露、供应链), keep names (PHP、GitHub Actions、RCE) |
| `cves` | One item per English CVE, same order: `name`, `description`, `plain` (when present) |
| `fixed` | One item per English row, same order: `status` (when present), `product` only if it has words to translate ("PHP 8.1 及更早版本") |
| `mitigation` | `note` (when present). `code` only to translate comments; keep the config itself byte-identical |
| `timeline` | One item per English entry: `date`, `title`, `body` (when present) |
| `checklist` | One item per English item: `title`, `hint` (when present) |
| `sources` | One item per English source: `says` (when present). `name` only when it is a description rather than a proper name |
| Body | The Markdown below the frontmatter, translated in full |

Array lengths must match the English file exactly, or the build fails. When the English file changes,
update the `.zh.md` in the same pull request.

## Style

- Write the way a Chinese security engineer would explain it to a colleague: plain, direct, natural.
  Translate the meaning, not the word order. If a sentence reads like a translation, rewrite it.
- Keep the poop jokes, but make them land in Chinese. Drop a joke rather than translate it literally.
- Use full-width Chinese punctuation (，。：；？！“”（）) in Chinese sentences. Put a space between Chinese
  and Latin letters or numbers: `PHP 8.4.27 已修复`, `影响 5.4 之后的几乎所有版本`.
- Keep product names, CVE ids, versions, commands, config keys, file names and code in English.
- Dates: `2026年10月20日`, `10月21日 14:00 UTC`. Keep UTC.
- Don't add facts, hedges or opinions that are not in the English file.
- Never wrap Chinese text across lines. Markdown and YAML `>-` blocks turn a line break into a space
  between characters. Write each paragraph and each field value on one line.
- Links to other incidents point at the Chinese page: `/zh/incidents/<slug>/`.
- Bold that ends in Chinese punctuation needs a space after it, or Markdown won't close it:
  `**有没有被利用？** 看你问谁`, not `**有没有被利用？**看你问谁`.

## Glossary

| English | 中文 |
| --- | --- |
| incident | 事件 |
| advisory | 安全公告 |
| patch / fixed version | 补丁 / 修复版本 |
| exploit / exploitation in the wild | 利用 / 在野利用 |
| proof-of-concept (PoC) | 概念验证（PoC），后文可直接写 PoC |
| remote code execution (RCE) | 远程代码执行（RCE） |
| supply chain attack | 供应链攻击 |
| poisoned package | 投毒包 |
| maintainer | 维护者 |
| registry (npm, PyPI) | 软件仓库 / npm 仓库 |
| secrets | 密钥、凭据（按语境） |
| token / API key | 令牌 / API 密钥 |
| rotate (credentials) | 轮换 |
| revoke | 吊销 |
| credential stuffing | 撞库 |
| data breach / leak | 数据泄露 |
| ransomware / extortion | 勒索软件 / 勒索 |
| threat actor | 攻击者（避免“威胁行为者”） |
| researcher | 研究人员 |
| vendor | 厂商 |
| end of life (EOL) | 停止维护（EOL） |
| self-managed / self-hosted | 自管版 / 自托管 |
| workaround / mitigation | 临时缓解措施 |
| web shell | Webshell |
| root CA / intermediate | 根证书 / 中间证书 |
| certificate authority (CA) | 证书颁发机构（CA） |
| out-of-memory | 内存耗尽 |
| use-after-free | 释放后重用（UAF） |
| memory corruption | 内存破坏 |
| denial of service | 拒绝服务 |
| edge device | 边缘设备 |
| container image | 容器镜像 |
| CI runner | CI 运行器 |
| lockfile | 锁文件 |
| Splash zone | 波及范围 |
| How to wipe | 怎么擦 |
| Shit Level 1–5 | 闷屁、有点漏、拉裤子了、化粪池炸了、屎无前例 |
