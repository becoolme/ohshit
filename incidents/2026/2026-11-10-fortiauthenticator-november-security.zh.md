---
title: FortiAuthenticator 修复两个无需认证的绕过漏洞及另外五个漏洞
tags:
- Fortinet
- FortiAuthenticator
- 认证绕过
summary: Fortinet 修复两个无需认证即可绕过访问控制的漏洞，以及 FortiAuthenticator 的另外五个漏洞。受影响版本为 8.0.0–8.0.3 和 6.6.0–6.6.10。硬编码密码漏洞需要攻击者无法控制的特定条件。
splash: 网络可达的 FortiAuthenticator 8.0.0–8.0.3 和 6.6.0–6.6.10。部分漏洞还要求攻击者已认证。
wipe: 按已安装的版本系列升级 FortiAuthenticator 至 8.0.4、6.6.11 或更高版本，然后验证认证流程。
inTheWildNote: 本轮未核实这七个 CVE 存在在野利用。
cves:
- name: 授权绕过
  description: 无需凭据的网络攻击者可绕过身份验证并取得访问权限。
- name: 硬编码密码
  description: 在攻击者无法控制的特定条件下，未认证攻击者可绕过凭据校验。
- name: LDAP 查询注入
  description: 若上游身份提供商恶意、已失陷，或允许用户控制 NameID 或等效的 SAML 用户名属性，已认证攻击者可绕过身份验证。
- name: SQL 注入
  description: 已认证攻击者可在底层数据库执行未授权的 SQL 命令。
- name: 资源分配缺少限流
  description: 未认证攻击者可耗尽系统资源，造成拒绝服务。
- name: 权限提升
  description: 按厂商公布的评分向量和公告，高权限的已认证攻击者可提升权限。
- name: Collector Agent SQL 注入
  description: 已认证攻击者可通过 Collector Agent 的 SQL 注入执行未授权代码或命令。
fixed:
- {}
- {}
timeline:
- date: 2026年11月10日
  title: Fortinet 发布产品公告
  body: 七项 FortiAuthenticator 公告列出相同的受影响版本范围和修复版本。
- date: 2026年11月11日
  title: Fortinet 发布两个绕过漏洞的 CVE 记录
  body: CNA 记录确认修复版本，并区分授权绕过和硬编码密码漏洞。
checklist:
- title: 盘点设备并限制网络可达范围
  hint: 在管理控制台或资产清单核对固件版本。安排升级期间检查防火墙规则，仅允许经批准的网络和必要集成访问管理端及设备的其他服务。
- title: 升级每个节点并验证登录
  hint: 按已安装版本系列使用 Fortinet 支持的升级路径。8.0 系列升级至 8.0.4 或更高，6.6 系列升级至 6.6.11 或更高。核对每个节点实际运行的固件，并测试正在使用的身份验证流程，包括适用的 SAML 或 LDAP。
- title: 调查异常认证活动
  hint: 保留 FortiAuthenticator 审计及认证日志，并与上游身份提供商的日志关联。检查陌生来源地址、异常登录以及账号或访问策略变更。若确认失陷，先遏制，再撤销受影响会话并轮换暴露凭据。
sources:
- name: FortiGuard PSIRT 公告订阅
  says: 列出 11 月 10 日的公告，并链接 Fortinet 的 CSAF 文件。
- name: Fortinet 授权绕过 CNA 记录
  says: 说明受影响版本、评分和修复版本。
- name: Fortinet 硬编码密码 CNA 记录
  says: 说明有条件的未认证绕过和相同的修复版本。
---

FortiAuthenticator 是 Fortinet 的身份和认证设备。按 Fortinet 公布的 CVSS 向量，两项严重漏洞均可让网络攻击者在未登录的情况下取得未授权访问。CVE-2026-126257 依赖攻击者无法控制的条件。公开资料未给出确切条件、请求或端点。LDAP 注入是另一项漏洞，要求攻击者已认证，且上游身份提供商存在特定配置或已失陷。

Fortinet 的[机器可读公告](https://filestore.fortinet.com/fortiguard/rss/ir.xml)显示，本文列出的七个 CVE 具有相同的受影响版本范围和升级目标。核实时无法打开常规 PSIRT 页面。以下按上方 CVE 顺序列出厂商的 CSAF 原文：[FG-IR-26-265](https://filestore.fortinet.com/fortiguard/psirt/csaf_incorrect-authorization_fg-ir-26-265.json), [FG-IR-26-271](https://filestore.fortinet.com/fortiguard/psirt/csaf_authentication-bypass_fg-ir-26-271.json), [FG-IR-26-255](https://filestore.fortinet.com/fortiguard/psirt/csaf_improper-neutralization-of-special-elements-used-in-an-ldap-query_fg-ir-26-255.json), [FG-IR-26-256](https://filestore.fortinet.com/fortiguard/psirt/csaf_improper-neutralization-of-special-elements-used-in-an-sql-command_fg-ir-26-256.json), [FG-IR-26-258](https://filestore.fortinet.com/fortiguard/psirt/csaf_allocation-of-resources-without-limits-or-throttling-in-fastapi_fg-ir-26-258.json), [FG-IR-26-263](https://filestore.fortinet.com/fortiguard/psirt/csaf_improper-privilege-management_fg-ir-26-263.json), [FG-IR-26-266](https://filestore.fortinet.com/fortiguard/psirt/csaf_improper-neutralization-of-special-elements-used-in-an-sql-command-in-collectoragent_fg-ir-26-266.json)。本文仅覆盖 FortiAuthenticator 这一批公告。已核阅材料没有确认受害者、数据遭访问或在野利用。
