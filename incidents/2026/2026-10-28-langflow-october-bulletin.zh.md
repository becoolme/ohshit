---
title: Langflow 公告披露未授权 RCE 及身份验证绕过；请升级至 1.13.0
summary: IBM 披露影响 Langflow OSS 1.0.0–1.12.8 的严重未授权代码执行和身份验证绕过，另含需登录的问题及 Hono 依赖漏洞。先备份数据并准备密码登录，再升级至 1.13.0。
splash: Langflow OSS 1.0.0–1.12.8；严重远程路径无需登录，其他问题有更窄的前提
wipe: 备份数据库、secret key 及上传文件，准备现有账户登录，然后升级 Langflow OSS 至 1.13.0 或更高版本
inTheWildNote: 所引厂商公告未确认真实攻击。
cves:
- name: 身份验证绕过
  description: 无需凭据的远程攻击可绕过身份验证限制；IBM 将其归为自动登录修复不完整。
- name: 未授权代码执行
  description: 无需凭据即可远程执行代码；公告描述了 MCP 工具枚举攻击面。
- name: Agentic Assistant 代码执行
  description: 低权限登录用户可通过未被拦截的模式生成或提交组件代码，执行操作系统命令。
- name: 凭据保护不足
  description: 经过身份验证的远程访问可能泄露敏感信息；公告同时讨论了运维方注入的 API 密钥暴露。
- name: Hono 查询及缓存解释差异
  description: 运行时或中间层传递字面量 URL 片段时，可让查询参数避开过滤及缓存键。会剥离片段的路径（包括 Cloudflare Workers）不属于此 Hono 暴露范围。
- name: Hono 点号路径解析耗尽内存
  description: 仅影响启用了非默认点号路径请求体解析的端点；嵌套表单字段可耗尽内存。
- name: Hono 静态生成目录穿越
  description: 构建期 SSG 在 ssgParams 不可信时可写到输出目录外；普通请求路由及完全由开发者控制的参数不在影响范围内。
fixed:
- status: IBM 建议的产品修复
timeline:
- date: 2026年10月22日
  title: Langflow 1.13.0 已发布
- date: 2026年10月28日
  title: IBM 首次发布多漏洞公告
- date: 2026年10月29日
  title: IBM 澄清处置步骤并发布产品 CVE 记录
checklist:
- title: 替换部署前备份数据，并准备现有账户登录
  hint: 备份数据库、secret key 及上传文件。自动登录部署应先按现有账户密码准备指引操作；仅设置 LANGFLOW_SUPERUSER_PASSWORD 不会重置现有账户的非旧版默认密码。不要通过删除或重装来恢复访问。
- title: 安装产品升级，并保留 Docker 数据
  hint: 在应用环境运行 pip install --upgrade "langflow==1.13.0"，或拉取 langflowai/langflow:1.13.0 并按厂商步骤重建。检查 LANGFLOW_CONFIG_DIR、LANGFLOW_DATABASE_URL 或 LANGFLOW_SAVE_DB_IN_CONFIG_DIR=true，确保实际数据库、密钥和上传文件保存在旧容器外；只挂载卷并不够。随后测试密码登录及现有工作流。
sources:
- name: IBM Langflow 安全公告
  says: 10 月 28 日首次发布，29 日更新；列出七个 CVE，建议将产品升级至 1.13.0。
- name: Langflow 安装及升级准备
  says: 自动登录切换及现有账户准备，避免以破坏数据的方式恢复访问。
- name: Langflow Docker 升级指引
  says: 替换容器前需检查配置和实际数据位置。
- name: Langflow 1.13.0 发布说明
  says: 版本早于 IBM 披露已可用；补丁发布日期不是事件披露日期。
---

本文跟踪 IBM 于 10 月 28 日发布的公告，并纳入 29 日的澄清；1.13.0 已于 22 日发布。公告合并了四个 Langflow 产品 CVE 和三个更早的 Hono 依赖 CVE，不能证明每个部署都暴露于所有依赖路径。Hono 底层修复版本为 4.13.5，IBM 的产品处置目标则为 Langflow 1.13.0。应升级应用，不能用未经验证的单独依赖替换代替。

严重产品漏洞的攻击向量无需凭据；Agentic Assistant 代码执行及凭据泄露 CVE 则需要登录。公告摘要还提到未按预期授权的 API 密钥访问，但凭据 CVE 的向量要求低权限，不能泛化为所有匿名用户均可利用。所引公告未确定具体利用端点、已确认受害者数量或真实攻击。涉及主流 AI 工作流服务及严重披露路径，因此评为 L3。
