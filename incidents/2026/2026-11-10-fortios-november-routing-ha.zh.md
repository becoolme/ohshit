---
title: Fortinet 修复 FortiOS 路由与高可用功能的严重漏洞
tags:
- FortiOS
- 路由
- HA
summary: Fortinet 披露了影响 OSPF、iBGP 和部分 FortiOS 高可用部署的严重漏洞。升级至对应分支的 8.0.2、7.6.8、7.4.13、7.2.14 或更新版本，可修复全部三项漏洞。
splash: FortiOS 和 FortiSASE 的路由功能，以及启用了带 standalone-config-sync 的 FGSP 或自动扩缩容的 FortiOS 部署。
wipe: 盘点暴露的路由和 HA 接口，按适用的升级路径更新，并验证路由和集群健康状态。
inTheWildNote: 查阅的 Fortinet 记录未提供在野利用证据。
cves:
- name: OSPF 身份验证绕过
  description: 无需身份验证的攻击者在可访问相邻 OSPF 网络时，可用特制请求广播链路状态通告。
- name: iBGP 传播异常属性
  description: 已配置的 iBGP 邻居可发送特制输入，将恶意或畸形属性传播给相连路由器。
- name: HA 身份验证绕过
  description: 启用了带 standalone-config-sync 的 FGSP 或自动扩缩容时，可接触受影响 HA 流量的攻击者无需身份验证，即可通过特制数据包以超级管理员权限执行命令。
fixed:
- {}
- {}
- {}
- {}
- status: 迁移到受支持的已修复分支
- status: 厂商已应用 iBGP 修复
timeline:
- date: 2026年11月10日
  title: Fortinet 发布路由安全公告
  body: FG-IR-26-267 和 FG-IR-26-268 分别说明 OSPF 和 iBGP 漏洞。
- date: 2026年11月11日
  title: Fortinet 发布三条 CNA 记录
  body: 记录列出受影响版本，并区分 8.0 系列中仅修复 HA 漏洞的版本与路由漏洞修复版本。
checklist:
- title: 识别并优先处理受影响设备
  hint: 在每台设备上运行 get system status。核对运行 OSPF 的接口、使用 iBGP 的邻居，以及是否启用了带 standalone-config-sync 的 FGSP 或自动扩缩容。安排升级期间，用现有网络控制将路由和 HA 流量限制在可信链路或对等设备。
- title: 备份并升级受影响分支
  hint: 备份配置，按 Fortinet 针对设备型号的升级路径更新集群所有成员。要修复这三项漏洞，分别升级至 FortiOS 8.0.2、7.6.8、7.4.13 或 7.2.14，或对应分支的更新版本。使用 7.0 的团队应规划迁移至受支持的已修复分支。升级后核对实际版本、路由邻接、路由表和 HA 健康状态。
- title: 核对 FortiSASE 服务版本
  hint: Fortinet 已在 26.3 系列的 26.3.2 应用 iBGP 修复。使用受影响旧系列的客户应与 Fortinet 协调迁移，并核实 OSPF 漏洞的修复情况。
- title: 排查异常路由或管理变更
  hint: 发现无法解释的路由通告、对等连接重置或配置变更时，保全路由、HA 和管理日志。将路由与配置快照同可信基线比对。如果证据指向特权访问，隔离受影响设备、排查横向访问，并在可信系统上轮换暴露的凭据。
sources:
- says: OSPF 原始公告的日期与 FortiOS 修复版本。
- says: iBGP 原始公告的日期与 FortiOS 修复版本。
- says: OSPF 漏洞的前提、评分和结构化记录中的 7.0 版本范围。
- says: 须为已配置的 iBGP 邻居这一前提及受影响版本。
- says: HA 漏洞的前提、受影响版本及仅针对 HA 漏洞的 8.0.1 修复。
---

这些 CVE 属于 [Fortinet 10 月优先升级通知](/zh/incidents/fortinet-security-hardening/) 之后发布的详细公告。OSPF 漏洞要求能访问相邻网络，BGP 漏洞要求攻击方是已配置的 iBGP 对等设备，HA 漏洞则要求能接触启用了 standalone-config-sync 的受影响 FGSP 部署或自动扩缩容部署中的 HA 数据包。

路由漏洞影响 FortiOS 8.0.0–8.0.1、7.6.0–7.6.7、7.4.0–7.4.12 和 7.2.0–7.2.13。FortiOS 8.0.1 修复了 8.0 分支的 HA 漏洞。修复路由漏洞需升级到 8.0.2。HA 漏洞在 7.6、7.4 和 7.2 分支的受影响范围与路由漏洞相同。Fortinet CNA 记录的结构化版本表还列出 OSPF 漏洞影响 7.0.1–7.0.19，HA 漏洞影响 7.0.0–7.0.19，均未列出 7.0 分支的修复版本。

Fortinet 的 iBGP 公告列出受影响的 FortiSASE 26.3.1 和 26.3.1_a，并说明已在 26.3.2 应用修复。使用 26.2、26.1、25.4、25.3、25.2、25.1.a 和 25.1 的客户应迁移至已修复版本。OSPF 公告也提到 FortiSASE。其机器可读漏洞记录给出了 FortiOS 的修复版本，请向 Fortinet 核实所在租户的 OSPF 修复情况。
