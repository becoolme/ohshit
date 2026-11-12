---
title: Microsoft 修复 Windows Office 中已遭利用的 Outlook 欺骗漏洞
summary: Microsoft 披露 Outlook 界面未对不安全操作显示警告。该网络攻击需要用户交互，CISA 已列入 KEV。请安装对应 Office 版本及更新通道的 11 月安全更新。
splash: Windows 上 Office LTSC 2021/2024 和 Microsoft 365 企业应用版的 Outlook，含 x86 和 x64。
wipe: 按 Office 版本和更新通道安装 11 月安全更新，并核对已安装构建。
inTheWildNote: CISA 于 11 月 10 日将 CVE-2026-124194 列为已知遭利用漏洞。
timeline:
- date: 2026年11月10日
  title: Microsoft 公开漏洞，CISA 将其列入 KEV
  body: CISA 为适用的美国联邦民事机构列出 11 月 24 日处置期限。
- date: 2026年11月11日
  title: Microsoft 更新 CVE 记录
  body: 记录列出 LTSC 构建下限，并引导 Microsoft 365 客户查看各通道的发布表。
checklist:
- title: 修补并核验 Office
  hint: 在 Outlook 的“文件 → Office 帐户”核对版本和构建。通过 Office 更新通道或企业管理系统安装相应的 11 月安全更新，重启后核验。Microsoft 365 各通道的构建号不同。
- title: 排查 Outlook 异常活动
  hint: 保留相关邮件、Outlook 终端遥测及网络认证日志。与应急响应人员核查 Outlook 发起的可疑操作。Microsoft 的 CVE 记录没有公开本案专用指标。
sources:
- name: Microsoft CNA 记录
  says: 列出受影响的 Windows Office 产品、CVSS 向量中的用户交互前提及 LTSC 构建下限。
- name: CISA 已知被利用漏洞目录
  says: 确认已知在野利用，并列出处置期限。
cves:
- name: 缺少不安全操作警告
  description: Outlook 可能未在不安全操作前提示用户，从而允许欺骗。
fixed:
- product: Office LTSC 2021
- product: Office LTSC 2024
---

Microsoft 的 CNA 记录说明，警告缺失可使攻击者通过网络实施欺骗。其 CVSS 3.1 向量要求用户交互，无需攻击者拥有权限。记录未明确具体诱饵、零点击利用路径或受害者范围。Microsoft 365 企业应用版用户应按更新通道查询 [Office 安全发布表](https://aka.ms/OfficeSecurityReleases)。
