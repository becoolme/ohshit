---
title: WatchGuard 修复 17 项 Fireware 漏洞，涉及集群、管理、AD 及代理边界
tags:
- WatchGuard
- 防火墙
- RCE
summary: WatchGuard 10 月 27 日的 Fireware 批次涉及集群 root 操作注入、SIP 代理 RCE、AD 响应溢出及配置泄露。各漏洞前提不同；厂商称未发现已知利用。应按设备型号升级至对应修复版本。
splash: 启用相关管理、FireCluster、SIP/Access Portal、AD 等功能的 Fireware 部署；攻击前提各异
wipe: 按平台升级 Fireware 2026.4 或 12.12.4，T15/T35 使用 12.5.22；隔离管理及集群网络
inTheWildNote: WatchGuard 称这 17 项公告均无已知在野利用。
cves:
- name: FireCluster root 操作调用
  description: FireCluster 互联网络上的攻击者（包括失陷节点或路径上的攻击者）可调用成员设备的特权管理操作。
- name: FireCluster 同步拒绝服务
  description: 集群互联网络上的攻击者可反复使 FireCluster 同步进程崩溃。
- name: 诊断命令文件覆盖
  description: 具有 CLI 访问权限的已认证 Device Monitor 或更高角色，可用 root 权限向任意路径或内核参数写入数值内容。
- name: AD 响应堆溢出，第二项漏洞
  description: 要求配置 AD 认证，并控制或截获所配置 AD 服务器的流量；特制响应可使服务崩溃或执行代码。
- name: AD 响应堆溢出
  description: 要求配置 AD 认证，并控制或截获所配置 AD 服务器的流量；特制响应可使服务崩溃或执行代码。
- name: SSH 认证 XPath 注入
  description: 能够访问管理 SSH 的未认证调用者可提取配置中的敏感数据。
- name: 移动 VPN 策略执行溢出
  description: 启用 Network Access Control 时，已认证移动 VPN 用户可使进程崩溃，或以非特权进程身份执行代码。
- name: 证书管理溢出
  description: 具有管理界面访问权限的已认证攻击者可使 certd 崩溃，并可能执行代码。
- name: AuthPoint MFA 会话劫持
  description: 要求设备本地访问、AuthPoint 集成，并诱使受害者接受 MFA 推送；不是未认证互联网 MFA 绕过。
- name: FireCloud Gateway 配置溢出
  description: 要求部署 FireCloud Gateway，并能在其与 WatchGuard Cloud 之间解密 TLS 流量进行中间人篡改；修改 WireGuard 配置可导致拒绝服务或代码执行。
- name: FireCluster BOVPN 隧道终止
  description: 同时配置 FireCluster 和至少一条 BOVPN 隧道时，同步网段上的攻击者可提前终止隧道。
- name: FireCluster 管理 IP root 操作注入
  description: 启用集群时，能够访问 FireCluster 管理 IP 的未认证网络调用者可触发特权管理操作。
- name: 日志证书栈溢出
  description: 要求 FIPS 模式、外部日志服务器，以及能冒充或截获该服务器流量的相邻网络攻击者；特制证书可触发 root 代码执行。
- name: SIP 代理认证前溢出
  description: 启用 SIP 代理时，经过使用该代理的策略的未认证请求可触发代码执行。
- name: 管理登录拒绝服务
  description: 能够访问管理界面的未认证调用者可反复使管理服务崩溃，打断管理员会话；流量处理不受影响。
- name: Access Portal 整数溢出
  description: 启用 Access Portal 时，未认证调用者可通过 WebSocket 处理触发堆越界写入。
- name: 本地防火墙守护进程文件覆盖
  description: 本地低权限进程可植入文件系统对象并触发列表更新，以 root 权限覆盖文件；写入内容受到部分限制。
fixed:
- product: Fireware 新版系列
- product: Fireware 12.x 标准平台
- product: Fireware T15/T35
timeline:
- date: 2026年10月27日
  title: WatchGuard 发布 17 项 Fireware 公告
checklist:
- title: 升级所有适用设备及集群节点
  hint: 核实型号及实际 Fireware 构建，通过官方渠道安装 2026.4、12.12.4 或 T15/T35 的 12.5.22。各功能的受影响版本不同：WireGuard 始于 2026.2/12.12，VPN 策略执行始于 2025.1/12.9，AuthPoint 始于 2025.1/12.7。逐项遵循公告，不用单一通用版本检查代替。
- title: 限制管理与集群访问
  hint: 通用遏制措施：HTTPS/SSH 管理仅向可信管理员开放，集群同步应与不可信节点及网络路径隔离。集群管理 IP 的 root 操作注入与仅限互联网络的漏洞，访问前提不同。
- title: 检查已配置的攻击路径
  hint: 盘点 SIP 代理策略、Access Portal、AD 认证、FIPS 外部日志、FireCloud Gateway、VPN Network Access Control 及 AuthPoint。AD 漏洞要求控制或截获 AD 流量；WireGuard 漏洞要求能够解密并篡改云配置 TLS 流量。
- title: 用证据评估可疑行为
  hint: 通用调查建议：保留配置及现有日志，检查异常特权操作、CLI 变更、服务崩溃及暴露的密钥。厂商未发布攻击者 IoC；这些行为线索或单独崩溃不能证明失陷。
sources:
- name: WatchGuard CVE-2026-90465
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-93862
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-90464
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-112710
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-112709
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-93434
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-113881
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-90442
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-82332
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-103594
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-104381
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-93865
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-103593
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-93857
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-111107
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-93866
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
- name: WatchGuard CVE-2026-93864
  says: 功能前提、受影响平台、修复方案及无已知利用的声明。
---

主流边界设备存在多项安全边界失效，因此评为 L3。这不是通用的未认证互联网到 root 攻击链：AD、集群互联网络、FIPS 日志、本地访问及云流量截获分别有不同前提。SSH 配置读取、SIP 代理及启用 FireCluster 的管理 IP 问题应各自检查暴露面。没有已确认受害者数量。同日的移动 VPN Windows 客户端问题属于另一产品，不计入这里的 17 项。
