---
title: 五家零售网站发现 WebRTC 窃卡代码，Lascana 测试卡外传获实证
tags:
- 电商
- 窃卡
- WebRTC
summary: InfoHawk 在五家零售网站发现共享窃卡代码，并录得 Lascana 测试卡外传。移动端结账触发条件可能躲过桌面扫描。代码已于 11 月 24–25 日移除，真实顾客影响仍未知。
splash: 访问付款页面的顾客，以及加载被修改营销像素、同意横幅配置或 CDN 文件的零售网站。
wipe: 移除植入代码，限制信令请求，检查移动端结账；发现可疑扣款时联系发卡行。
inTheWildNote: InfoHawk 观察到恶意脚本，并录得 Lascana 测试卡实时外传。
timeline:
- date: 11月24日 14:25 UTC
  title: Samsonite 与 American Tourister 移除代码
  body: InfoHawk 称观察到两家商店移除代码；零售商及 Seers 均未回复其询问。
- date: 11月24日 15:48 UTC
  title: Lascana 移除 Quorum 像素
  body: 研究团队称 Lascana 已回复，并在此时前移除了像素。
- date: 11月24日 21:09 UTC
  title: Quorum 恢复干净像素
  body: InfoHawk 称 Quorum 确认已移除识别出的恶意代码，并恢复干净的营销像素。
- date: 2026年11月25日
  title: Revolve 与 FWRD 移除代码
  body: Revolve 向 InfoHawk 表示，当天已解决移动端／平板网站问题，并在调查潜在影响。
- date: 2026年11月27日
  title: InfoHawk 发布调查
  body: 团队报告五个受影响网站、共享基础设施及一次录得的实时测试卡外传。顾客数量与损失未知。
checklist:
- title: 遏制脚本改动并保全证据
  hint: 将页面源码、标签管理器改动、同意横幅设置及零售商 CDN 文件与可信副本比较。移除前保全修改后的资源、配置历史和网络捕获。暂停受影响付款流程，恢复可信资源，调查哪些身份能够修改它们，并轮换确认暴露的凭据。与支付处理方协调调查及顾客通知。
- title: 在移动端结账检查全部公开指标
  hint: 检查 <brand>-static.s3.amazonaws[.]com 的 Insds.js 和 gtage.js；检查 qscripts.s3.amazonaws[.]com/pscript.js 最后一行是否引用上述存储桶；检查 cdn.seersco.com/banners/<account>/<domain>/cb.js 的隐私政策 URL 是否包含隐藏图片／onerror 加载器。排查向 *.northbridgeads[.]com 发出的 GET /_cf/ice、POST /_cf/rel、经 turn.cloudflare.com 的仅中继 WebRTC，以及 KghRtc、rtc-signal-v1、quickfetch 字符串。接收的分块经 SHA-256 校验后用 eval 执行，未公布摘要值。S3、Seers 和 Cloudflare 是共享合法服务，单凭出现不能证明入侵。关联确切路径、脚本改动及数据通道活动；保护含付款数据的捕获记录。
- title: 限制引导请求并重新验证付款页面
  hint: 在每个付款页面用 connect-src 仅允许必需主机，阻止该套件开启 WebRTC 前的未授权信令请求。报告称数据通道本身不受 connect-src 限制，这不是通用 WebRTC 阻断。移除付款／登录页面非必需的第三方标签，用支付框架隔离卡片字段，再以测试数据在手机尺寸触摸屏上验证恢复后的流程。应检查付款步骤，不能仅查首页或桌面浏览器。
- title: 处置潜在卡片暴露
  hint: 若曾在受影响流程输入付款资料，应查看账单，并经可信渠道向发卡行咨询可疑扣款或换卡。捕获可发生在订单验证前，包括被拒或取消的订单。报告证实的是 Lascana 测试卡捕获，并非五家商店均有已知数量的顾客卡片被盗。
sources:
- name: InfoHawk WebRTC 窃卡原始调查
  says: 研究团队仅在 Lascana 录得实时测试卡外传，报告五处脚本植入、移除日期、移动端条件及指标，并包含企业回复；顾客影响和初始访问仍待厘清。
---

InfoHawk 在 Lascana、Samsonite、American Tourister、Revolve 和 FWRD 追踪到恶意代码。投递路径不同：Lascana 的 Quorum 营销像素遭修改，两家箱包商店的 Seers 同意横幅配置遭编辑，Revolve／FWRD 则使用 Revolve 自有 CDN 上的文件。这不证明上述提供商的全部基础设施或客户均遭入侵。初始进入方式与受影响顾客数量尚未披露。

套件加载 S3 脚本，仅在小屏或触摸屏上执行；Samsonite 变体另检查结账路径。HTTP 信令随后通过 Cloudflare TURN 中继协商 WebRTC 数据通道，同时传入可执行代码和传出数据。付款页面因此可能看似正常，桌面或仅首页检查却看不到行为。InfoHawk 录得自己的测试卡从 Lascana 外传，未在其他四家商店录得实时卡片外传。疑似收集项包括卡号、到期日、安全码及账单／联系方式，发生于付款验证前。真实顾客被盗情况及损失尚无量化。

调查称，五处植入均在 11 月 24–25 日移除。Lascana 与 Quorum 已回复；Revolve 确认已解决移动端／平板问题，同时调查影响。两家箱包网站及 Seers 未回复，因此其移除情况来自研究团队观察。移除不代表影响调查结束。基于已观察到的恶意结账代码和实时外传实证列为 L4，不从五个网站的数量推定大规模盗窃。

这是单独披露的零售集群。报告将其投递风险与 [Optimizely 事件](/zh/incidents/optimizely-project-script-injection/) 比较，[CartJacked](/zh/incidents/cartjacked-storefront-campaigns/) 也涉及浏览器窃卡，但报告并未将本集群归因于这两项活动。共享使用 WebRTC 或合法中继基础设施不足以合并事件身份。
