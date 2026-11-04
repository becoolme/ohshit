---
title: Chrome 157 修复 213 个安全问题，其中 7 个为严重漏洞
summary: Chrome 157 修复 213 个安全问题，其中 7 个为严重漏洞。特制网页可触发代码执行；三个严重条目仅涉及 Android。更新桌面及 Android Stable 后重启。Extended Stable 156.0.8078.88 是独立的 55 项修复子集，不涵盖全部 213 项。尚未确认实际利用。
splash: 访问攻击者控制 HTML 的 Chrome 桌面及 Android 用户；部分严重漏洞仅涉及 Android
wipe: Stable 安装 157.0.8103.38+ 并重启（Windows/Mac 为 .38/.39）；受管 Extended Stable 的部分修复为 156.0.8078.88+
inTheWildNote: Google 发版说明未报告实际利用，这不能证明从未发生利用。
cves:
- name: Dawn 缓冲区溢出
  description: Google 将其评为 Critical。特制 HTML 可在 157.0.8103.38 以前的 Chrome 中触发潜在的沙箱外代码执行。
- name: Android ANGLE 内存破坏
  description: Google 将其评为 Critical。特制 HTML 可在 157.0.8103.38 以前的 Android Chrome 中触发潜在的沙箱外代码执行。
- name: Android WebGL 释放后使用
  description: Google 将其评为 Critical。特制 HTML 可在 157.0.8103.38 以前的 Android Chrome 中触发潜在的沙箱外代码执行。
- name: Prerender 释放后使用
  description: Google 将其评为 Critical。特制 HTML 可在 157.0.8103.38 以前的 Chrome 中触发沙箱外代码执行。
- name: Android Dawn 缓冲区溢出
  description: Google 将其评为 Critical。特制 HTML 可在 157.0.8103.38 以前的 Android Chrome 中触发潜在的沙箱外代码执行。
- name: Geometry 释放后使用
  description: Google 将其评为 Critical。特制 HTML 可在 157.0.8103.38 以前的 Chrome 中触发沙箱内代码执行。
- name: Core 释放后使用
  description: Google 将其评为 Critical。特制 HTML 可在 157.0.8103.38 以前的 Chrome 中触发潜在的沙箱外代码执行。
- name: FileSystem 释放后使用——较早 Stable 修复
  description: Google 将其评为 Critical。特制 HTML 可在 156.0.8078.73 以前的 Chrome 中触发沙箱外代码执行。
- name: MediaStream 释放后使用——较早 Stable 修复
  description: Google 将其评为 Critical。特制 HTML 可在 156.0.8078.79 以前的 Chrome 中触发沙箱内代码执行。
fixed:
- product: Chrome Stable——Windows / macOS
  status: Google 发布 .38/.39
- product: Chrome Stable——Linux
  status: Stable 发版
- product: Chrome Stable——Android
  status: 经 Google Play 逐步推送
- product: Chrome Extended Stable——Windows / macOS
  status: 独立 55 项修复子集，不含全部 157 修复
timeline:
- date: 2026年11月3日
  title: Extended Stable 获得独立的 55 项修复更新
  body: 156.0.8078.88 列出三个严重 CVE，包括 Dawn CVE-2026-121156 及两个较早的 Stable 披露。
- date: 2026年11月3日
  title: Chrome 157 进入桌面 Stable
  body: Google 列出 213 项安全修复：7 项 Critical、77 项 High、75 项 Medium、54 项 Low。Windows/Mac 为 .38/.39，Linux 为 .38。
- date: 2026年11月3日
  title: Android Stable 开始推送
  body: 157.0.8103.38 包含对应桌面安全修复，另有说明的除外；Play 推送可能需要数日。
checklist:
- title: 更新并重启桌面 Stable
  hint: 打开 Chrome 菜单 → 帮助 → 关于 Google Chrome，完成更新后选择重新启动，再确认显示版本为 157.0.8103.38 或更新版本（Windows/Mac 也可能显示 .39）。Linux 可经包管理器更新。仅下载更新而不重启，正在运行的浏览器仍未修补。
- title: 经 Google Play 更新 Android
  hint: 打开 Google Play → 个人资料 → 管理应用和设备 → 有可用更新 → Chrome → 更新，然后重新打开 Chrome，核实版本为 157.0.8103.38 或更新版本。Google 分数日推送；若暂未提供，应再次检查，不能将旧版视为已修复。
- title: 核实受管渠道及各产品覆盖范围
  hint: Windows/Mac 的 Extended Stable 设备安装 156.0.8078.88 或更新版本并重启，再核实实际渠道和版本。其 55 项修复与 Chrome 157 重叠，但未声称覆盖全部 157 CVE。Edge、其他 Chromium 产品、WebView、ChromeOS 和 iOS 应跟进各自厂商公告；本文版本不能证明这些产品已修复。部分漏洞详情仍受限，不要尝试绕过访问限制。
sources:
- name: Google Chrome 157 桌面发版
  says: 213 项修复及七个严重条目，未声明实际利用。
- name: Google Chrome 157 Android 发版
  says: 157.0.8103.38 推送及对应桌面安全修复。
- name: Google 11 月 3 日 Extended Stable 发版
  says: 156.0.8078.88 及独立的 55 个 CVE 子集。
- name: Google Chrome Releases 公开订阅源
  says: 直接 HTML 缺少正文时核阅的完整原文，同一发布者，不是独立佐证。
- name: Google 桌面更新说明
  says: 关于 Chrome、重启要求及 Linux 包管理器更新。
- name: Google Android 更新说明
  says: Play 商店更新步骤及版本核实。
- name: Google CNA 记录 CVE-2026-121156
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
- name: Google CNA 记录 CVE-2026-121229
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
- name: Google CNA 记录 CVE-2026-121246
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
- name: Google CNA 记录 CVE-2026-121035
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
- name: Google CNA 记录 CVE-2026-121247
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
- name: Google CNA 记录 CVE-2026-121203
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
- name: Google CNA 记录 CVE-2026-121126
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
- name: Google CNA 记录 CVE-2026-118306
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
- name: Google CNA 记录 CVE-2026-76024
  says: 厂商原始记录，核实各条的平台、受影响版本及沙箱边界。
---

Google 在 11 月 3 日 Chrome 157 发版中一次修复 213 项安全问题。本文 CVE 条目突出列出该版全部七个 Critical 漏洞，以及同期 Extended Stable 更新的另两个 Critical 漏洞，并非完整的 213 项清单；完整厂商列表见桌面发版说明及可读公开订阅源。这些是厂商严重程度标签，不是独立赋予的 CVSS 分数。

Chrome 157 的七个 Critical 漏洞不能混为一谈：Google CNA 将 ANGLE、WebGL 和第二个 Dawn 条目限定于 Android。Geometry 描述的是沙箱内代码执行，其他六个描述沙箱外执行或潜在执行。攻击输入是特制 HTML 页面。发版及 CNA 说明未列出额外功能或配置前提，受限的漏洞详情不能用来编造利用链。已审阅来源未确立公开 PoC 或实际利用。L3 依据是主流浏览器及厂商描述的沙箱边界风险，并非声称存在持续攻击活动。

桌面 Stable 的 Windows/Mac 修复版为 157.0.8103.38/.39，Linux 为 157.0.8103.38。Android 为 157.0.8103.38，包含对应桌面修复，另有说明的除外。桌面推送需要数日或数周，Play 推送需要数日；必须核实安装及重启结果。

Windows/Mac Extended Stable 另获 156.0.8078.88，包含 55 项安全修复。其中列出 CVE-2026-121156，以及较早披露的 CVE-2026-118306 和 CVE-2026-76024；后两者较早的 Stable 修复门槛分别为 156.0.8078.73 和 156.0.8078.79，本文没有将其首次披露日期改成 11 月 3 日。55 项与 213 项列表相互重叠，不能相加当作独立漏洞总数，也不能把 156.0.8078.88 视为全部 Chrome 157 漏洞的通用修复。其他产品须独立确认发版。
