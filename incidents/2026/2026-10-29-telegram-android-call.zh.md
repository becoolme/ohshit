---
title: NebuSec 报告 Telegram Android 通话 RCE；请更新至 12.10.4 或更高版本
summary: NebuSec 报告，用户接听 Telegram Android 来电后可能触发代码执行。Android 12.10.4 已包含解析器修正。所报测试覆盖 ARM64 手机的私聊通话；真实攻击及完整利用链尚未确认。
splash: 据研究人员报告影响 Telegram Android 8.6.2–12.10.3；需接听私聊来电，已在 ARM64 上测试
wipe: 将 Telegram Android 更新至 12.10.4 或更高版本，并核对安装版本
inTheWildNote: 研究人员报告了演示；所引来源未确认真实攻击。
cves: []
fixed:
- product: Telegram Android
  status: 已包含解析器修正
timeline:
- date: 2026年9月24日
  title: Android 12.10.4 源码更新包含修正
- date: 2026年10月29日
  title: NebuSec 公开报告通话触发代码执行
checklist:
- title: 更新 Android 应用并确认版本
  hint: 通过可信分发渠道安装当前 Telegram Android 更新，在设置页面底部核对版本。已确认包含修正的最低版本为 12.10.4。
- title: 更新前避免接听不可信来电
  hint: 所报路径需要接听私聊来电。更新期间拒接陌生来电可减少这一暴露，但不能替代安装已修正的应用。
sources:
- name: NebuSec 披露
  says: 研究人员声称通话可触发 Telegram RCE；原帖通过官方嵌入副本阅读。
- name: NebuSec 帖子的 X 官方嵌入副本
  says: 一手副本将研究人员公开声称 RCE 的日期标为 10 月 29 日。
- name: Telegram Android 12.10.3 解析器
  says: 旋转分支读取 videoState，而不是 videoRotation。
- name: Telegram Android 12.10.4 解析器
  says: 修正后读取 videoRotation；仓库提交注明版本为 12.10.4（7099）。
- name: The Hacker News
  says: 报道 NebuSec 所称影响范围、ARM64 私聊通话测试，以及尚无公开完整利用链分析。
---

此次公开报告涉及 Android 通话信令，与独立的动态贴纸研究不同。需要受害者接听，不能描述为零点击。评为 L3 是因为涉及主流客户端及研究人员的公开说法，并非已发现持续攻击。

我们比对了 Telegram 已公开的 Android 源码：12.10.3 检查 videoRotation 后，却在该分支解引用 videoState；12.10.4 改为读取正确字段。这证实了解析器修正，不代表我们独立复现了代码执行链。8.6.2–12.10.3 的影响范围及 ARM64 私聊通话测试来自 NebuSec 向 The Hacker News 提供的信息，不能据此认定 iOS、桌面端或群组通话可被利用，也不能认定已取得整机访问权限或存在受害者。所引披露未提供 CVE 编号。
