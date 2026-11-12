---
title: FortiManager 和 FortiAnalyzer 修复多项管理平面访问漏洞
tags:
- Fortinet
- FortiManager
- FortiAnalyzer
- RCE
summary: 受影响的 FortiManager 构建可经网络可达的 FGFM 端口被未认证攻击者执行代码。另一漏洞可通过特制 HTTP 请求在 FortiManager 和 FortiAnalyzer 的多个版本上执行代码。Fortinet 将该 HTTP 漏洞的 8.0.3 修复版标为即将发布。
splash: FGFM 可达的 FortiManager，以及 HTTP 可达且受影响的 FortiManager 和 FortiAnalyzer 各产品版本。
wipe: 仅允许可信对端访问 FGFM 及管理 HTTP。逐项核对 CVE 对应修复，并向 Fortinet 确认计划版本。
cves:
- name: FGFM 授权绕过
  description: 能访问 FortiManager FGFM 端口的未认证攻击者可用特制 FGFM 数据包执行代码或命令。
- name: HTTP 输出编码缺陷
  description: 特制 HTTP 请求可在受影响的 FortiManager 和 FortiAnalyzer 产品中执行代码或命令，无需认证。范围包括云版本及 FortiAnalyzer-BigData。
- name: 跨 VDOM 授权绕过
  description: 已认证的管理员可通过特制 HTTP 请求访问受影响的 FortiManager 和 FortiAnalyzer 产品中的其他 VDOM。范围包括云版本。
fixed: []
timeline:
- date: 2026年11月10日
  title: Fortinet 发布 FGFM 及跨 VDOM 漏洞公告
  body: 两项公告说明不同的访问路径及修复版本。
- date: 2026年11月11日
  title: Fortinet 发布另一项 HTTP 代码执行漏洞的 CVE 记录
  body: 记录列出受影响的 8.0 和 7.6 系列，以及 FortiAnalyzer-BigData 7.6 系列。部分修复版本仍标为即将发布。
checklist:
- title: 安排升级期间限制管理访问
  hint: 只允许确有需要的受管设备访问 FGFM。检查 TCP/541 和实际使用的 IPv6 FGFM 端口，包括配置使用的 TCP/542。仅允许经批准的网络访问 HTTP 管理端，并通过上游防火墙核实访问范围。托管产品请向 Fortinet 确认已部署版本及处置情况。
- title: 逐项核对受影响产品和 CVE 的修复
  hint: 盘点已安装的产品、版本类型及系列。备份配置，使用 Fortinet 支持的升级路径。按下文各 CVE 对应版本处置，升级后核对每个节点，并测试受管设备连通性和管理员隔离。所需补丁尚未发布期间，保持访问限制。
- title: 排查异常设备注册和管理变更
  hint: 保留管理端、HTTP 代理及防火墙日志。检查陌生设备注册、异常管理操作和管理策略变更。如怀疑失陷，隔离管理平面、保留证据，并协调凭据更换与受管设备核查。
sources:
- name: Fortinet FG-IR-26-275 CSAF
  says: FGFM 代码执行、受影响版本系列和修复。
- name: Fortinet CNA CVE-2026-126170
  says: HTTP 代码执行的范围与修复，包括计划版本。
- name: Fortinet FG-IR-26-244 CSAF
  says: 跨 VDOM 授权漏洞及 FortiAnalyzer 修复版本。
- name: Fortinet CNA CVE-2026-126229
  says: 受影响的云和自管产品，以及各系列修复。
---

11 月公告列出不同的访问路径。升级前应核对具体 CVE、产品和版本系列。

- **CVE-2026-126261（FGFM）：** 影响 FortiManager 8.0.0、7.6.0–7.6.7、7.4.0–7.4.5 和 7.2.0–7.2.8。对应的修复版本为 **8.0.1**、**7.6.8**、**7.4.6** 和 **7.2.9**。攻击者必须能访问 FGFM 服务。
- **CVE-2026-126170（HTTP 代码执行）：** 影响 FortiManager 和 FortiAnalyzer 8.0.0–8.0.2，以及两者云版本的 8.0.1–8.0.2。四种产品的 7.6.0–7.6.7 均受影响，修复版本为 **7.6.8**。厂商将其 8.0 系列的 **8.0.3** 标为即将发布。FortiAnalyzer-BigData 7.6.0–7.6.2 也受影响，**7.6.3** 标为即将发布。请向厂商或托管服务核实可用性。
- **CVE-2026-126229（跨 VDOM 授权）：** CNA 列出的 FortiManager 和 FortiAnalyzer 受影响范围为 8.0.0–8.0.1、7.6.0–7.6.7、7.4.0–7.4.11、7.2.0–7.2.12 及所有 7.0 版本。两种云产品的范围为 8.0.1、7.6.0–7.6.7、7.4.1–7.4.11、7.2.1–7.2.12 及所有 7.0 版本。公告所列修复目标为 **8.0.2**、**7.6.8**、**7.4.12** 和 **7.2.13**。7.0 用户应向 Fortinet 核实迁移路径。此漏洞要求攻击者已通过管理员身份验证。

[10 月加固公告](/zh/incidents/fortinet-security-hardening/)在具体漏洞公告前给出了产品级处置建议。其中的 8.0.2 仍在 CVE-2026-126170 的受影响范围内。本轮未核实这三个 CVE 的在野利用或受害者数据。
