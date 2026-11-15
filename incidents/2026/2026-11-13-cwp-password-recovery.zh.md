---
title: Control Web Panel 密码恢复漏洞可危及托管账户和数据
tags: [Control Web Panel, 身份验证, 托管]
summary: VulnCheck 披露了两个影响 1.30.6 之前版本的 CWP 漏洞。若邮件扫描器打开被篡改的重置链接，可访问的恢复端点可能将令牌泄露给攻击者控制的主机。恢复令牌配合可预测的旧版签名，还可绕过远程 API 授权。
splash: 使用低于 1.30.6 的 CWP，且密码恢复或远程 API 路由可访问。两条路径的令牌前提不同。
wipe: 通过受支持的渠道升级，限制恢复端点和 API 的访问，并调查异常重置、API 调用和 cron 任务。
inTheWildNote: VulnCheck 说明了利用路径。公开来源尚未证实在野利用。
cves:
- name: 密码重置链接投毒
  description: 恢复路由生成重置链接时接受传入的 Host 值。邮件扫描器打开该链接可能泄露有效令牌，使攻击者能够重置密码。
- name: 远程 API 接受恢复令牌
  description: 恢复令牌和可预测的旧版签名可以授权本应要求 API 密钥的远程调用。
fixed:
- status: VulnCheck 确认的首个修复版本。安装适用的最新受支持版本。
timeline:
- date: 2026年11月10日
  title: CWP 发布 1.30.6
  body: 厂商变更记录注明了 VulnCheck 所列修复版本的发布日期。
- date: 2026年11月13日
  title: VulnCheck 发布两个 CVE 记录
  body: CNA 说明了重置链接投毒及另一条远程 API 授权绕过路径。
checklist:
- title: 更新并核对已安装版本
  hint: 在 Settings > CWP Settings > CWP updates 使用受支持的更新渠道。升级后确认 webpanel 版本至少为 1.30.6，并测试密码恢复和正常授权的 API 集成。
- title: 升级准备期间限制访问
  hint: 在业务允许时限制用户面板和远程 API 的访问。检查反向代理是否仅接受已知面板主机名并约束 Host 值。保留邮件扫描，并用修复版本解决令牌验证问题。
- title: 调查异常重置和 API 活动
  hint: 保留面板、代理、邮件安全和 API 日志。将 /v1/lostpass/、/login/index.php?acc=newpass 和 /cronjobsusers/ 的请求与获准的重置和计划任务对照。检查无法解释的账户列表或详情访问、账户变更和文件写入。单凭命中路由无法证明利用。
- title: 遏制已确认或疑似的账户失陷
  hint: 在支持的情况下吊销暴露的恢复令牌、会话和 API 凭据，从可信系统重置受影响密码，并检查对应账户的 crontab 和网站根目录有无未授权变更。若账户数据或密码哈希可能被读取，请启动事件响应。
sources:
- name: VulnCheck CVE-2026-124020 记录
  says: 给出首次发布日期、影响版本、CVSS 4.0 评分，以及重置链接和邮件扫描的利用前提。
- name: VulnCheck CVE-2026-124021 记录
  says: 给出首次发布日期、影响版本、CVSS 4.0 评分，以及远程 API 授权和数据访问的影响。
- name: Control Web Panel 变更记录
  says: 给出 1.30.6 的发布日期并列出后续版本。
---

第一条路径从可访问的密码恢复端点开始。请求者可以影响生成链接指向的主机。VulnCheck 指出，自动邮件扫描可能使请求者收到有效令牌。攻击者可用该令牌更改目标账户的密码，进而进入托管账户的文件管理器和 cron 功能。

第二条路径要求有效的恢复令牌及旧版 API 检查接受的可预测签名。VulnCheck 称，通过授权的调用可用受影响托管账户的权限安排命令，或读取返回用户名、联系邮箱和密码哈希的账户列表及详情路由。披露内容未证实能取得主机 root 权限，也未证实有人提取上述记录。两项评分均为 CVSS 4.0。

这些问题涉及远程 API 和用户面板对恢复令牌的处理。此前的 [CWP 用户面板与回环 API 利用链](/zh/incidents/cwp-user-panel-api/) 有独立的利用前提和修复版本。
