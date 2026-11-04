---
title: Langflow 公告披露未授权 RCE 及身份验证绕过；请升级至 1.13.0
summary: IBM 披露影响 Langflow OSS 1.0.0–1.12.8 的严重未授权代码执行和身份验证绕过，另含需登录的问题及 Hono 依赖漏洞。先备份数据并准备密码登录，再升级至 1.13.0。
splash: Langflow OSS 1.0.0–1.12.8；严重远程路径无需登录，其他问题有更窄的前提
wipe: 备份数据库、secret key 及上传文件，准备登录并安装 IBM 建议的 1.13.0 修复版本；评估 1.13.1 的额外保护
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
- product: Langflow 额外存储及 MCP 保护
  status: 后续源码发版；IBM 公告修复下限仍为 1.13.0
timeline:
- date: 2026年10月22日
  title: Langflow 1.13.0 已发布
- date: 2026年10月28日
  title: IBM 首次发布多漏洞公告
- date: 2026年10月29日
  title: IBM 澄清处置步骤并发布产品 CVE 记录
- date: 11月4日 01:39 UTC
  title: Langflow 发布 1.12.9 回移版本
  body: 源码发版包含 MCP、组件策略及镜像依赖变更；已审阅材料未将其对应至 IBM 公告全部七个 CVE，1.13.0 仍是已核实的产品修复建议。
- date: 11月4日 03:14 UTC
  title: Langflow 发布 1.13.1，加入更多安全保护
  body: 包含 1.12.9 延后的用户与工作流存储命名空间隔离，以及 MCP、组件策略及依赖变更。IBM 公告已核实的产品修复下限仍为 1.13.0。
checklist:
- title: 替换部署前备份数据，并准备现有账户登录
  hint: 备份数据库、secret key 及上传文件。自动登录部署应先按现有账户密码准备指引操作；仅设置 LANGFLOW_SUPERUSER_PASSWORD 不会重置现有账户的非旧版默认密码。不要通过删除或重装来恢复访问。
- title: 安装产品升级，并保留 Docker 数据
  hint: 在应用环境运行 pip install --upgrade "langflow==1.13.0"，或拉取 langflowai/langflow:1.13.0 并按厂商步骤重建。将 LANGFLOW_CONFIG_DIR 指向已挂载路径以保存密钥和上传文件；数据库另用 LANGFLOW_DATABASE_URL 保存在外部，或用 LANGFLOW_SAVE_DB_IN_CONFIG_DIR=true 保存在该挂载目录。替换旧容器前，先迁移仍在容器内的数据；只挂载卷并不够。保留现有数据库后端：将 SQLite 用户指向新 PostgreSQL 数据库不会自动迁移数据。随后测试密码登录及现有工作流。
- title: 选择其他分支前核实回移覆盖范围
  hint: 核阅 1.12.9 发版及已合并 PR 16119/16123，不要只看 latest 标签。原文列出 MCP 凭据及目标地址、组件控制、依赖更新，并延后存储隔离；Python 3.10 保留较旧的 Pillow/filelock 分支。源码发版或镜像构建成功不能证明 IBM 公告全部七个 CVE 已修复，上述已核实产品升级步骤仍适用。
- title: 评估较新的 1.13.1，并保留相同备份措施
  hint: 核阅 1.13.1 发版及 PR 15982/16121/16131。存储命名空间现已分隔用户上传文件与工作流附件；上游称旧用户文件无需迁移仍可读取。升级后保留并测试现有上传文件及工作流附件。Python 3.10 的依赖例外仍存在。选择软件包或镜像前核实其可用性；源码发版不代表每个镜像均已发布或没有漏洞。
sources:
- name: IBM Langflow 安全公告
  says: 10 月 28 日首次发布，29 日更新；列出七个 CVE，建议将产品升级至 1.13.0。
- name: Langflow 安装及升级准备
  says: 自动登录切换及现有账户准备，避免以破坏数据的方式恢复访问。
- name: Langflow Docker 升级指引
  says: 替换容器前需检查配置和实际数据位置。
- name: Langflow 1.13.0 发布说明
  says: 版本早于 IBM 披露已可用；补丁发布日期不是事件披露日期。
- name: Langflow 1.12.9 原始发版
  says: 11 月 4 日 01:39:07 UTC 发布源码版本，链接回移及 lxml/Mako 变更。
- name: Langflow 已合并回移 PR 16119
  says: MCP、生成组件、登录及依赖保护；存储隔离延后，Python 3.10 存在依赖限制，并非 IBM 七个 CVE 的完整对应。
- name: Langflow 已合并镜像依赖 PR 16123
  says: lxml 改为链接系统库，设置 Mako 安全下限；原文明确验证限制，不是所有镜像安全的保证。
- name: Langflow 1.13.1 发版元数据及说明
  says: 11 月 4 日核阅时为 v1.13.1，03:14:15 UTC 发布，列出所含安全变更。
- name: Langflow 存储隔离 PR 15982
  says: 分隔用户与工作流命名空间；旧用户文件无需迁移仍可读取。
- name: Langflow 1.13.1 镜像依赖 PR 16121
  says: 依赖和系统库变更、Python 3.10 例外，以及尚未验证的镜像构建及扫描范围。
- name: Langflow 1.13.1 依赖 PR 16131
  says: Python、前端及文档依赖更新，部分受 Python 版本约束。
---

本文跟踪 IBM 于 10 月 28 日发布的公告，并纳入 29 日的澄清；1.13.0 已于 22 日发布。公告合并了四个 Langflow 产品 CVE 和三个更早的 Hono 依赖 CVE，不能证明每个部署都暴露于所有依赖路径。Hono 底层修复版本为 4.13.5，IBM 的产品处置目标则为 Langflow 1.13.0。应升级应用，不能用未经验证的单独依赖替换代替。

严重产品漏洞的攻击向量无需凭据；Agentic Assistant 代码执行及凭据泄露 CVE 则需要登录。公告摘要还提到未按预期授权的 API 密钥访问，但凭据 CVE 的向量要求低权限，不能泛化为所有匿名用户均可利用。所引公告未确定具体利用端点、已确认受害者数量或真实攻击。涉及主流 AI 工作流服务及严重披露路径，因此评为 L3。

**11 月 4 日回移发版：** 上游于 01:39:07 UTC 发布 1.12.9，1.13.0 已不再带有 GitHub latest 标签。已合并变更覆盖 MCP 凭据及目标地址、生成组件限制和镜像依赖；存储命名空间隔离延后，Python 3.10 保留较旧 Pillow/filelock 分支。这些是实质保护更新，但已审阅发版及 PR 不能证明与 IBM 十月公告每个 CVE 的修复等价。已核实的 1.13.0 升级建议、数据保留及密码准备步骤仍适用。源码版本可用不代表每个部署镜像都已重建或扫描。

**11 月 4 日后续发版：** Langflow 于 03:14:15 UTC 发布 1.13.1，包含 1.12.9 延后的存储命名空间隔离，以及进一步的 MCP、组件及依赖保护。原公告的 1.13.0 修复下限予以保留，1.13.1 在此基础上增加保护。发版及已合并 PR 不能保证所有镜像均已可用或没有漏洞，Python 3.10 依赖例外仍需关注。
