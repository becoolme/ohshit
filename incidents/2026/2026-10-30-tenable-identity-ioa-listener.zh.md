---
title: Tenable Identity Exposure 修复 AD 监听器中的 SYSTEM 命令注入
tags:
- Active Directory
- Tenable
- RCE
summary: Tenable Identity Exposure 修复三个漏洞，其中已认证命令注入可在 PDC 模拟器上以 SYSTEM 执行命令。升级到 3.93.6 或 3.77.18 后，必须在域控制器卸载并重装 IoA 脚本；单纯升级会保留有漏洞的监听器。
splash: Identity Exposure <=3.93.5 / <=3.77.17；命令注入需已认证账户且可写入 IoA 配置
wipe: 升级到 3.93.6 或 3.77.18，再重装域控制器上的 IoA 脚本；升级前核查自定义 RSA 证书
inTheWildNote: 公告报告修复，未确认真实环境利用。
cves:
- name: AD 事件监听器命令注入
  description: 可写入 IoA 配置的已认证低权限攻击者，可在 PDC 模拟器上以 SYSTEM 执行命令；评分为 CVSS 3.1。
- name: GraphQL 资源耗尽
  description: 已认证低权限用户可发送特殊查询，过度消耗服务器资源；评分为 CVSS 3.1。
- name: Secure Relay 关联密钥写入日志
  description: Secure Relay 安装失败时，关联密钥会写入本地错误日志，有主机访问权限的用户可读取；评分为 CVSS 3.1。
fixed:
- product: Identity Exposure 3.93
  status: 已修复；还须重装 IoA 脚本
- product: Identity Exposure 3.77
  status: 已修复；还须重装 IoA 脚本
timeline:
- date: 2026年10月30日
  title: 发布 TNS-2026-34 及两个修复版本
  body: 发布说明要求升级后重装 IoA 脚本，并在升级前检查自定义 TLS 证书密钥长度。
checklist:
- title: 准备适合部署的修复版本
  hint: 从 Tenable Downloads Portal 获取适合部署的 Identity Exposure 3.93.6 或 3.77.18。升级前确认自定义 TLS 证书及其签发 CA 的 RSA 密钥至少2048位，内置 Node.js 24 会拒绝更短密钥。遵循链接中的本地部署发布说明。
- title: 升级后重装 IoA 脚本
  hint: 按发布流程，在域控制器上使用 Register-TenableIOA.ps1 -Uninstall 卸载 Indicators of Attack，再重新安装。单纯升级平台会保留旧 IoA 事件监听器；确认已部署更新后的监听器，才能将命令注入修复视为已应用。
- title: 检查配置写入权限及中继安装日志
  hint: 检查能写入 IoA 配置的账户、意外配置变更及 PDC 模拟器上的命令执行。限制访问失败的 Secure Relay 安装日志，保留相关证据，通过原有 Tenable 支持渠道更换已暴露关联密钥。仅存在日志项或安装失败不能证明漏洞被利用。
sources:
- name: Tenable 原始 TNS-2026-34 公告
- name: Tenable 2026 年本地部署完整发布说明
---

原始公告将 3.93.5 及更早版本、3.77.17 及更早版本列为受影响。发布说明将命令注入前提进一步限定为可写入 IoA 配置的账户，不是未认证接管域控制器。公告列出的 CVSS 3.1 评分依次为9.9、4.3、4.1，另外提供的 CVSS 4.0 评分依次为9.4、5.3、5.6。

两个修复版本的发布说明均要求升级后卸载并重装 IoA，并提醒自定义 RSA 证书不能短于2048位；还提及一项内部请求错误消息泄露修复，但本公告未为其分配另一漏洞编号。来源未提供在野利用、受害者数量或事件专属指标清单。除版本外，还应检查权限和凭据暴露。
