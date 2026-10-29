---
title: Cisco 确认 ASA/FTD SSL VPN 重启漏洞已遭利用
summary: CVE-2026-76418 可让未认证攻击者通过 SSL VPN 触发 ASA/FTD 重启，前提是相关 tunnel group 配置了二次认证。Cisco 确认在野利用并列出修复版本。
splash: 运行受影响版本的 ASA/FTD，SSL 远程访问 VPN 可达，且相关 tunnel group 启用二次认证
wipe: 安装对应 ASA/FTD 修复版本；暂时无法修补时，评估 Cisco 有前提条件的缓解措施
inTheWildNote: Cisco PSIRT 报告 2026 年 10 月已出现主动利用。
cves:
- name: SSL VPN 二次认证拒绝服务
  description: 未认证的 SSL VPN 请求可触发设备意外重启，无需成功登录。已报告影响为拒绝服务，并非代码执行。
fixed:
- product: Cisco ASA 9.16 及更早版本
  status: 已修复
- product: Cisco ASA 9.18
  status: 已修复
- product: Cisco ASA 9.20
  status: 已修复
- product: Cisco ASA 9.22
  status: 已修复
- product: Cisco ASA 9.23
  status: 已修复
- product: Cisco ASA 9.24
  status: 已修复
- product: Cisco ASA 9.24，另一已列目标
  status: 已修复
- product: Cisco FTD 7.0 及更早版本
  status: 已修复
- product: Cisco FTD 7.2
  status: 已修复
- product: Cisco FTD 7.4
  status: 已修复
- product: Cisco FTD 7.6
  status: 已修复
- product: Cisco FTD 7.7
  status: 已修复
- product: Cisco FTD 10.0
  status: 已修复
- product: Cisco FTD 10.1
  status: 已修复
timeline:
- date: 10月28日 19:15 UTC
  title: Cisco 发布修复并确认利用
checklist:
- title: 按产品和维护分支升级
  hint: 在 Cisco Software Checker 中选择产品、平台和已安装版本，按公告矩阵选择对应目标；升级后核对运行版本。
- title: 检查所有相关 tunnel group
  hint: 检查 webvpn enable 和 secondary-authentication-server-group。存在 tunnel-group-list enable 时，检查所有组，包括 DefaultWEBVPNGroup；不存在时，检查 DefaultWEBVPNGroup。FTD 需核对已部署的 FMC/FDM 策略和设备配置。
- title: 修改认证前评估厂商缓解方案
  hint: DefaultWEBVPNGroup 没有二次认证时，Cisco 建议使用 no tunnel-group-list enable；若该组启用了二次认证，建议对其执行 no secondary-authentication-server-group。移除二次认证会降低安全性，先验证影响。这些只是临时缓解措施，不能替代补丁。
sources:
- name: Cisco PSIRT 公告
  says: 确认利用，列出受影响配置、版本矩阵和有前提条件的缓解措施。
- name: Cisco CNA 记录
  says: CVSS 3.1 为 8.6，说明未认证重启影响及利用状态。
- name: Cisco CSAF 发布数据
  says: 公告和修复版本矩阵的机器可读副本。
---

Cisco 已确认利用，因此评为 L4。认证配置是暴露前提，不代表攻击者需要凭据。来源未给出受害者数量或攻击者 IoC。虽然公告横幅写着没有变通办法，正文仍列出临时配置缓解措施；默认组自身启用二次认证时，仅隐藏组列表不够。
