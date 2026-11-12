---
title: MCP Gateway Registry 漏洞可授予管理权限并暴露内部服务
summary: 开源 mcp-gateway-registry 的两项漏洞分别允许低权限认证用户取得仓库管理权限，以及允许有服务器写入权限的用户发起内部请求。升级至 1.35.0 或更高版本，并审计已保存的配置。
splash: 存在认证用户的受影响 mcp-gateway-registry 部署。SSRF 路径需要服务器注册或更新权限。
wipe: 升级至 1.35.0 或更高版本，移除未授权的权限和上游地址，并排查凭据暴露。
inTheWildNote: AWS 公告未报告在野利用。
cves:
- name: 外部管理 API 缺少授权校验
  description: 低权限认证用户可创建组映射，使自己的身份获得仓库管理员权限。
- name: 服务器注册可向内部目标发起请求
  description: 有权注册或修改服务器的认证用户可向内部目标发起请求，部分情况下还可读取响应。
fixed:
- product: mcp-gateway-registry（两项 CVE）
timeline:
- date: 11月11日 20:30 UTC
  title: AWS 披露管理 API 权限提升漏洞
  body: 公告确认 1.25.0 是首个修复版本，并要求审计现有授权和凭据。
- date: 11月11日 21:00 UTC
  title: AWS 披露另一项服务端请求伪造漏洞
  body: 公告确认 1.35.0 是首个修复版本，并要求核对已保存的上游 URL。
checklist:
- title: 升级并限制 API 访问
  hint: 将 mcp-gateway-registry 和受影响分支升级到 1.35.0 或更高版本。修复前仅允许受信任管理员访问 /api/servers/* 写入路径，并限制服务器注册和修改权限。限制仓库和认证服务只能连接必要目标。EC2 上应强制使用 IMDSv2，并收紧关联的 IAM 权限。
- title: 移除未授权的权限
  hint: 在 DocumentDB 的 mcp_scopes 集合中检查 group_mappings 是否映射到 mcp-registry-admin 或其他特权范围，以及 ui_permissions 是否对所有用户开放写入。移除异常授权。检查 HTTP 日志中的 POST /api/servers/groups/import、同组 create、add、remove 和 delete 路径及其他服务器写入端点。将命中与同一身份的后续活动关联核对。
- title: 审计已保存的服务器地址和凭据
  hint: 将已注册的服务器和 Agent（含现有上游 URL）与可信清单核对，纠正或移除异常配置。检查受影响期间的注册和更新日志。如无法排除未授权读取，在来源系统轮换已存储的服务器凭据和敏感请求头。如果关联云角色可能暴露，检查其活动，并按实际情况替换或吊销暴露的凭据或会话。
sources:
- says: CVE-2026-100307 的受影响版本、授权要求及需要审计的持久授权。
- says: CVE-2026-125926 的受影响版本、注册权限及已保存地址的核查要求。
- says: 确认修复版本，并说明在特定条件下访问云元数据和凭据的路径。
---

AWS 披露了开源 mcp-gateway-registry 部署中的两项漏洞。CVE-2026-100307（GHSA-rxf3-qgpv-wxvr）影响 1.0.9 至 1.24.7。低权限认证用户可通过管理 API 将身份提供商的组映射到特权范围。1.25.0 修复了写入路径。既有映射仍会生效，直到核查并移除。升级也不会吊销已被读取的凭据。

CVE-2026-125926（GHSA-fc39-fwh3-wv5r）影响 1.0.3 至 1.34.0。有权注册或修改服务器的认证用户可将上游地址指向网关能访问的服务。视网络配置和响应处理方式而定，这条路径可暴露内部数据或云元数据中的凭据。1.35.0 会校验新建或修改的地址，既有配置会保留。升级后审计历史配置，并确认管理路由和出站连接均受限制。
