---
title: Chrome 桌面版更新修复已遭利用的 XML 释放后使用漏洞
summary: Google 确认 CVE-2026-125350 存在在野利用。11 月 9 日 Chrome 稳定版更新修复该 XML 释放后使用漏洞及其他安全问题。更新后重启 Chrome，使修补生效。
splash: Windows、macOS、Linux 上尚未安装 11 月 9 日修补版本的 Chrome 桌面稳定版。
wipe: Windows 或 macOS 更新至 157.0.8103.50/.51，Linux 更新至 157.0.8103.50，随后重启 Chrome。
inTheWildNote: Google 确认在野利用。CISA 于 11 月 10 日将该漏洞列入 KEV。
timeline:
- date: 2026年11月9日
  title: Google 公布 Chrome 稳定版更新
  body: Google 确认该 XML 漏洞存在在野利用。
- date: 2026年11月10日
  title: CISA 将 CVE-2026-125350 列入 KEV
  body: 目录为适用的美国联邦民事机构列出 11 月 24 日处置期限。
checklist:
- title: 安装并核对修补版本
  hint: 打开 chrome://settings/help 核对版本并启动更新。受管设备通过组织的软件渠道更新。重启后重新打开该页面，确认实际运行的版本。
- title: 检查暴露设备的告警
  hint: 结合可疑浏览活动排查终端告警。保留相关证据，并与安全团队调查设备。Google 未在此发布说明中公开本案专用指标。
sources:
- name: Chrome 稳定版发布公告
  says: 列出 11 月 9 日各平台版本、XML 释放后使用及在野利用情况。
- name: CISA 已知被利用漏洞目录
  says: 确认已知在野利用，并列出处置期限。
cves:
- name: XML 释放后使用
  description: Google 确认 Chrome XML 组件存在释放后使用漏洞。
fixed:
- product: Windows 和 macOS 的 Chrome 稳定版
- product: Linux 的 Chrome 稳定版
---

这是继 [11 月 3 日 Chrome 公告批次](/zh/incidents/chrome-157-security/)之后发布的稳定版更新。Google 将该漏洞标为高危，发布公告没有公开完整投递链、具体交互前提或受害者范围。分别核对各桌面平台的版本，并通过各厂商跟踪衍生浏览器的更新。
