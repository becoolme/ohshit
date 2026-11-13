---
title: 研究人员在 Canada Dry 等五个饮料品牌网站发现 KongTuke 注入
summary: Ohey 在 Canada Dry 加拿大站等五个品牌站点发现恶意脚本。脚本收集浏览器可读 Cookie 和疑似令牌的存储值，并向部分访客展示假 Cloudflare 验证。Windows 用户运行粘贴的命令后，设备可能下载并执行恶意软件。
splash: 五个品牌网站的访客。执行假验证命令的 Windows 用户还面临终端失陷风险。
wipe: 移除 WordPress 植入物，作废暴露的会话，并隔离运行过假验证命令的 Windows 设备。
inTheWildNote: Ohey 捕获了五个站点上的恶意代码。实际终端失陷数量未知。
timeline:
- date: 2026年7月17日
  title: 公开扫描捕获较早的加载器
  body: Ohey 在 Mott’s Clamato 和 Nestea 的历史扫描中识别出恶意脚本。
- date: 2026年11月10日
  title: Ohey 公布对品牌站点的捕获结果
  body: 研究人员在四个站点确认恶意代码，并在同日更新中加入 Bai。
- date: 11月10日 17:30 UTC
  title: Ohey 补充第五个站点和下载阶段
  body: 研究人员确认 Bai 的脚本及 FTP 欢迎消息触发的文件下载。
checklist:
- title: 移除站点持久化并作废暴露的会话
  hint: 清理前保全网站响应 HTML、日志、插件文件和数据库。检查 asset-cache/asset-cache.php、wp-content/mu-plugins/asset-cache-runtime.php、wmedia-optimizer/wmedia-optimizer.php、wp-content/mu-plugins/wmedia-recovery.php 和 wp_upd。移除确认的植入物，恢复干净文件，清除缓存并轮换站点凭据、作废暴露的会话。
- title: 隔离运行过假验证命令的 Windows 终端
  hint: 若用户运行了粘贴的命令，断网并调查该设备。检查 cmd.exe 和 FTP 活动，以及 %APPDATA%\Microsoft\Windows\Themes 下的 vclreg.exe 和 vclx370.bpl。恢复受影响设备，并用干净设备重设可能暴露的凭据。
- title: 排查网络活动并验证清理结果
  hint: 在 DNS、代理和端点日志中搜索 canadadry[.]ca, mottsclamato[.]ca, www.drinknestea[.]ca (/asset-cache/fjs), hydratewithcore[.]com, drinkbai[.]com, battaglia[.]lol, monteiro[.]click, watsiia[.]top, sehneider[.]com, lrmbardo[.]lol, kloppert[.]lol, bradtte[.]lol, griffihhs[.]click, report-ftp[.]wiki (144.31.215[.]239), yelahaye[.]surf (46.29.26[.]20), syncservice9638[.]com。Ohey 的报告列出 15 组网络指标、13 个哈希和 6 组主机痕迹。结合脚本响应和执行情况核对，单条命中无法证明失陷。清理后用独立客户端检查页面 HTML 和加载器路径。
sources:
- says: 通过网页捕获和静态分析核实五个品牌站点、脚本行为及投递指标。
---

Ohey 在 canadadry.ca、mottsclamato.ca、drinknestea.ca、hydratewithcore.com 和 drinkbai.com 捕获到 KongTuke 代码。研究人员在 Mott’s Clamato 和 Nestea 的历史公开扫描中找到最早可追溯至 7 月 17 日的脚本。11 月 10 日的报告是这组站点事件的公开披露。五个站点属于同一母公司，但使用不同服务器和 WordPress 主题。最初入侵路径及受影响用户数量仍不明确。

三个站点通过自身域名下的 `/asset-cache/fjs` 提供加载器。Core Hydration 和 Bai 的页面则引用不断变更的外部主机。加载器在决定是否展示假验证前，会收集浏览器 JavaScript 可读的 Cookie 及疑似令牌的本地或会话存储值。对于收到诱饵的 Windows 访客，页面将命令放入剪贴板，并诱导其通过“运行”对话框执行。Ohey 捕获到利用 FTP 欢迎消息下载并启动 `vclreg.exe` 和 `vclx370.bpl` 的链路。

研究人员确认真实网站上存在恶意代码，并观察到活跃投递。实际终端感染和支付数据失窃情况仍未知。这组面向公众的网站遭到入侵并提供恶意载荷，因此定为 L4。
