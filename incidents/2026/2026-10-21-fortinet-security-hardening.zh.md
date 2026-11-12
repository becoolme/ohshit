---
title: "Fortinet 要求优先升级五类产品，详细安全公告稍后发布"
tags: [Fortinet, 边缘设备, 补丁]
summary: "Fortinet 于 10 月公布优先升级建议。11 月公告列出各产品修复版本，并确认 FortiManager 和 FortiAnalyzer 8.0.2 仍受另一项 HTTP 漏洞影响。"
splash: "FortiOS、FortiManager、FortiAnalyzer、FortiMail 和 FortiAuthenticator"
wipe: "备份配置。升级前按产品和版本系列逐项核对 CVE 公告。"
inTheWildNote: "公告未提供在野利用证据或单项 CVE 详情"
fixed:
  - {}
  - {}
  - {}
  - {}
  - status: 10 月的升级目标，该版本仍受 CVE-2026-126170 影响
  - {}
  - {}
  - {}
  - status: 10 月的升级目标，该版本仍受 CVE-2026-126170 影响
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - status: 迁移至 7.4 或更新分支
  - {}
  - {}
timeline:
  - date: 2026年10月21日
    title: 发布优先升级通知
  - date: 2026年11月10日
    title: Fortinet 发布详细产品公告
    body: 厂商在 10 月产品级建议的基础上，补充单项 CVE 的影响范围和修复版本。
  - date: 2026年11月11日
    title: Fortinet CNA 记录显示 8.0.2 受 HTTP 代码执行漏洞影响
    body: FortiManager 和 FortiAnalyzer 的 8.0.3 均列为 CVE-2026-126170 即将发布的修复目标。
  - date: 2026年10月22日（计划）
    title: 集中推出固件更新
checklist:
  - title: 备份并升级
    hint: 备份配置，优先处理面向公网的设备。FortiMail 7.2 应迁移到已修复版本。判断设备是否已修补前，请核对下文各 CVE 的说明。
  - title: 将管理界面访问限制到可信地址
    hint: HTTPS 和 SSH 管理只放行可信 IP，或在外网接口上直接关掉。FortiManager 绝不该暴露在公网
  - title: 审查管理访问与配置变更
    hint: 管理员账号强制 MFA；查找异常登录和没人批准过的配置变更
sources:
  - name: Fortinet CISO 公告
  - name: FortiGuard PSIRT 公告订阅
  - name: Fortinet 发布的 CVE-2026-126170 CNA 记录
---

**L3：** 广泛部署的边缘设备和身份产品需要优先更新。各平台可用时间不同，请核对下载与升级路径。10 月公告未说明单项 CVE、具体技术影响或利用情况。Fortinet 称漏洞源于主动进行的 AI 辅助发现，10 月公告原定 11 月 10 日公布详情。

11 月详细公告分别说明 [FortiAuthenticator](/zh/incidents/fortiauthenticator-november-security/)、[FortiMail](/zh/incidents/fortimail-november-critical/) 和 [FortiManager 与 FortiAnalyzer](/zh/incidents/fortimanager-november-access/) 的漏洞。版本表保留 10 月公告所列目标。在后续 CVE-2026-126170 记录中，两种自管管理产品的 8.0.2 仍受影响，Fortinet 将 8.0.3 标为即将发布。请核实可用性，并在等待所需补丁期间限制管理访问。详细条目列出了 Fortinet 针对已启用 JSON API 的临时措施。
