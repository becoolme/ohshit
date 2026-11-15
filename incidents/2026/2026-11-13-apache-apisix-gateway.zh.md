---
title: Apache APISIX 披露 7 个网关访问控制漏洞
summary: Apache 披露了 7 个在 APISIX 3.20.0 修复的漏洞，涉及路径规范化不一致、伪造身份请求头，以及 Keycloak、mTLS 和 MCP 绕过。实际风险取决于路由、插件和上游服务配置。
splash: 使用受影响路由或插件配置的 APISIX 3.19.0 及更早版本。最低受影响版本和前提见各公告。
wipe: 升级至 3.20.0 或更新版本，验证未授权请求被拒绝，并确认上游收到的身份请求头仅由网关设置。
cves:
  - name: 路径规范化差异导致身份验证绕过
    description: 从 0.9 到 3.19.0，当未认证路由和受保护路由共享上游，且上游不归并编码后的点路径段时，未认证路由可暴露受保护路径。
  - name: 跳过或降级身份验证时可伪造身份
    description: 从 3.18.0 到 3.19.0，若 strict 为 false 且转发请求头与令牌请求头不同，无令牌的 jwe-decrypt 请求可向上游传递调用方提供的值。启用降级且认证服务不可用时，forward-auth 也可能传递伪造值。
  - name: 认证回退时保留 Wolf 身份请求头
    description: 从 3.8.0 到 3.19.0，multi-auth 从 wolf-rbac 回退至另一个成功的认证器时，可能保留调用方提供的 Wolf 身份请求头。信任这些请求头的上游受影响。
  - name: Keycloak 部分授权绕过
    description: 从 1.4.0 到 3.19.0，已认证调用方只持有部分必需授权即可访问上游，也可能访问授权服务已拒绝的 HTTP 方法。
  - name: 编码路径绕过双向 TLS
    description: 从 3.18.0 到 3.19.0，同时启用 match_uri_encoded_slash 并配置 skip_mtls_uri_regex 时，解码后属于豁免范围的路径可让无证书客户端访问受保护上游。
  - name: MCP 调用访问未声明的 API 路径
    description: 在 3.19.0 中，openapi-to-mcp 调用方可沿用已声明工具的 HTTP 方法和路由凭据，访问 OpenAPI 文档中未声明的路径。
  - name: MCP 调用覆盖配置的身份
    description: 在 3.19.0 中，如果路由注入的身份请求头也在 OpenAPI 文档中声明，openapi-to-mcp 调用方可伪造上游身份。
fixed:
  - status: 首个修复这 7 项公告的版本
timeline:
  - date: 2026年11月11日
    title: Apache 宣布发布 APISIX 3.20.0
    body: 发布说明列出行为变化和迁移步骤。
  - date: 2026年11月13日
    title: Apache 发布 7 份安全公告
    body: 公告列出受影响版本及各项配置前提。
checklist:
  - title: 升级网关并迁移受影响配置
    hint: 将所有网关实例升级至 3.20.0 或更新版本，按发布说明检查路由变更。部署前将自定义 wolf-rbac header_prefix 从 Consumer 移至 Route 或 Service，包括 multi-auth 条目。确认相应 Consumer 已设置 appid，并移除 mcp-bridge 配置。
  - title: 检查路由和双向 TLS 边界
    hint: 找出与认证路由共享上游的公开路由。修复前可要求上游执行授权，或限制公开路由。在预发布环境用编码点路径段和斜杠测试受保护路由，并验证无证书请求被拒绝。核查 skip_mtls_uri_regex 豁免。
  - title: 测试身份和权限拒绝路径
    hint: 验证无令牌的 jwe-decrypt、失败的 forward-auth 和 multi-auth 回退不会让上游接受伪造身份请求头。升级前尽可能关闭认证失败时的放行。测试 Keycloak 多权限授权和方法拒绝行为，发现异常访问时保留网关及上游日志。
  - title: 收紧 MCP 工具的访问范围
    hint: 将工具路径及声明的请求头与实际 API 对照。限制调用方，并将注入凭据限于必要的端点。升级后验证调用未声明路径或覆盖网关身份会失败。
sources:
  - name: Apache APISIX 3.20.0 发布说明
    says: 提供修复版本的部署和迁移步骤。
  - name: oss-security 上的 Apache APISIX CVE 批次
    says: 链接 Apache 针对本批次发布的 7 份原始公告。
  - name: Apache CNA 的 CVE-2026-124680 记录
    says: 核实路由触发前提、版本范围和 CVSS 4.0 评分。
---

路径规范化漏洞可让请求在网关匹配未认证路由，却在上游解析到受保护路径。两条路由必须共享上游，且上游对编码点路径段的处理符合 Apache 公告中的条件。其他绕过取决于对应插件或 TLS 选项。Apache 公告未报告在野利用。由于漏洞影响网关访问控制，本批评为 L3。
