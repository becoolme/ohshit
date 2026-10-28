---
title: n8n 发布 12 项公告，涉及代码隔离、凭据泄露及工作流认证
tags:
- n8n
- 自动化
- 凭据
summary: n8n 10 月 28 日批次包含三项高危代码执行及九项中危问题。工作流编辑权限、不可信节点输入及启用的功能决定不同攻击路径。升级后仍须迁移已弃用代码节点，已有工作流可能继续运行。
splash: n8n 工作流编辑者，或进入受影响节点的不可信输入；Browser Use 与 Enterprise OAuth 另有前提
wipe: 使用稳定版 2.45.5；2.46.1/3.0.1 为预发布版。替换已弃用代码节点，检查工作流与凭据
inTheWildNote: 公告未报告恶意攻击活动或受害者数量。
cves:
- name: 表达式隔离逃逸
  description: 工作流编辑者可在宿主执行代码。
- name: 已弃用代码节点绕过运行器
  description: 工作流编辑者可通过 Function、Function Item 或 LangChain Code 在主进程执行；默认阻断后，已有工作流仍会运行。
- name: GraphicsMagick 图像处理
  description: 不可信图像进入官方 Docker 镜像中的 Edit Image 节点时，可导致代码执行。
- name: Browser Use 读取服务端文件
  description: 明确启用 Browser Use 时，连接浏览器的已认证成员可读取服务端文件；路径在 n8n 服务器上解析。
- name: 嵌入式聊天认证绕过
  description: 使用 n8n User Auth 的已发布嵌入式 Chat Trigger，可被未认证 setup GET 读取指定会话或触发执行。
- name: MongoDB 更新目标操纵
  description: 不可信 updateKey 输入可使 Update/Find And Replace 覆盖其他文档或插入新文档。
- name: 动态 OAuth 账号劫持
  description: Enterprise 可解析 OAuth2 凭据场景下，成员可诱导他人在无 n8n 会话时打开授权链接并同意，将服务商令牌绑定到成员身份。
- name: MCP OAuth 开放重定向
  description: 未认证客户端注册可重定向打开特制链接的访问者；该重定向不包含令牌或会话数据。
- name: Asana 验证密钥重置
  description: 知道 webhook URL 的未认证调用者可替换 X-Hook-Secret，伪造事件并使正常投递失败。
- name: OracleDB 向量元数据 SQL 注入
  description: 不可信元数据筛选键可读取已配置 Oracle 凭据有权访问的数据。
- name: 跨源转发凭据
  description: 使用凭据的节点可在攻击者影响的重定向中跨源发送认证信息；HTTP Request v4.4 已避开该不安全默认设置。
- name: NocoDB 附件令牌暴露
  description: 启用 Download Attachments 且工作流执行时，数据表编辑者可提供接收所配置 API 令牌的附件 URL。
fixed:
- product: n8n 2.45
  status: 稳定维护版本
- product: n8n 2.46
  status: GitHub 预发布版，不能作为常规生产渠道切换
- product: n8n 3.0
  status: GitHub 预发布版，须核实主版本迁移要求
timeline:
- date: 2026年10月28日
  title: n8n 发布十二项公告
checklist:
- title: 升级所有运行中的 n8n 组件
  hint: 优先使用稳定维护版 2.45.5。GitHub 将 2.46.1、3.0.1 标记为预发布版，采用前须有对应发布渠道及迁移计划，不要将跨主版本升级当作常规补丁。部分公告列出 1.123.89，其他公告却没有列出 1.x 修复，不能将该版本视为全部修复。旧分支移植补丁须逐项遵循公告。
- title: 升级后仍须替换已弃用节点
  hint: 将已有 Function、Function Item 及 LangChain Code 工作流迁移到 Code 节点。保持默认阻断；N8N_DEPRECATED_NODES_BLOCK=false 会恢复危险行为。临时缓解可通过 NODES_EXCLUDE 排除 n8n-nodes-base.function、n8n-nodes-base.functionItem 和 @n8n/n8n-nodes-langchain.code。
- title: 移除不可信图像及数据库输入路径
  hint: 限制编辑权限与 webhook 入口，断开未认证 Webhook 到 Edit Image 的连接；必要时排除 n8n-nodes-base.editImage，或移除不用的 GraphicsMagick url/svg/mvg/pcd/msl 编码模块。验证 MongoDB updateKey 和 OracleDB Metadata Filter Name 输入，修复前停用不安全工作流。
- title: 关闭不用的 Browser Use，并绑定 OAuth 回调
  hint: 不用时将 N8N_INSTANCE_AI_BROWSER_USE_ENABLED=false 或保持未设置。Enterprise 动态凭据使用 N8N_OAUTH_BROWSER_BINDING=true，限制项目编辑者，不需要时关闭动态凭据。浏览器批准提示只显示主机，不能证明文件路径安全。
- title: 检查聊天及触发器认证
  hint: 修复前停用采用 n8n User Auth 的嵌入式 Chat Trigger 工作流，或改用 basic auth；限制 Asana webhook 访问。限制未认证访问 /mcp-oauth/register 和 /mcp-oauth/authorize，避免打开意外授权链接。
- title: 遏制凭据转发并调查暴露
  hint: 修复前关闭 NocoDB Download Attachments。限制出站目标，启用 N8N_SSRF_PROTECTION_ENABLED=true，避免不可信 URL 或重定向驱动带凭据请求。轮换可能暴露的 NocoDB 及其他工作流凭据，检查执行日志。没有攻击活动专属 IoC，单独异常请求不能证明失陷。
sources:
- name: n8n GHSA-gx3v-3x3v-f8r5
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-9p7v-45m2-wxgj
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-f2cw-9483-7vcp
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-9qx8-fhxv-w794
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-pwj5-wwm6-g83j
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-4v22-g448-h4rg
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-426f-xmcv-g8pg
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-rc3w-8jc8-7x3w
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-mx4r-96jx-v278
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-2x68-96jw-5r6c
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-prmc-fg87-r4gh
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n GHSA-jmcg-c7p5-q69g
  says: 受影响节点或功能、触发前提、修复版本及临时控制。
- name: n8n 2.45.5 发布元数据
  says: 10 月 28 日发布，复核时标记为稳定版。

- name: n8n 2.46.1 发布元数据
  says: 10 月 28 日发布，复核时标记为预发布版。

- name: n8n 3.0.1 发布元数据
  says: 10 月 28 日发布，复核时标记为预发布版。
---

主流自动化服务存在隔离失效及凭据暴露风险，因此评为 L3。十二项公告涉及不同信任边界，不能合并成每个实例都存在的单一未认证接管路径。已弃用节点的默认阻断拒绝新增或修改，但已有工作流继续运行。部分修复更早进入维护版本，公开披露日期为 10 月 28 日。复核的公告均未分配 CVE。由于旧分支覆盖不同，这里不提供通用版本检查器。
