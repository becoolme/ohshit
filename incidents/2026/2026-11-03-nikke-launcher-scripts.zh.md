---
title: NIKKE PC 启动器脚本被指分发远控恶意程序，客户端更新不能清理已感染电脑
summary: 研究人员在四个 NIKKE PC 官方启动器脚本中发现恶意代码，并报告远控载荷执行迹象。运营方承认可能存在脚本篡改并已更新客户端；11 月 4 日研究人员复查发现四个已知 CDN 文件已干净，但旧缓存及既有感染仍须清理，受影响人数不明。
splash: NIKKE PC 启动器用户；研究报告涉及 Windows 及经 Proton 运行的 Linux/Steam Deck，不涵盖移动应用。
wipe: 排查暴露期间保持启动器关闭；核实官方处置，保留证据，清除旧缓存，并更换暴露的凭据。
inTheWildNote: 研究人员报告受感染主机证据；运营方确认可能篡改，尚未确认完整影响范围。
timeline:
- date: 2026年9月27日
  title: 被修改的启动器文件带有九月时间戳
  body: 日期来自研究人员核阅的 CDN 文件头，并非公开披露日期。
- date: 10月23日 16:40 UTC
  title: 研究人员收到的最早 Agent 启动记录
  body: 来自评论者日志，属于转述证据，并非厂商确认的活动开始时间。
- date: 11月3日 16:57 UTC
  title: 研究人员公开技术报告
  body: GitHub Gist 元数据记录发布时间；分析依据文件、缓存、日志及载荷静态检查。
- date: 2026年11月3日
  title: 运营方报告约 17:30 UTC 更新客户端
  body: 官方公开通知写明 11 月 4 日约 02:30 UTC+9，未指定修复后的启动器版本。
- date: 11月3日 22:26 UTC
  title: 研究人员仍观察到被修改的 CDN 副本
  body: 两台 CDN 节点在所述客户端更新时间之后仍分发 FeedList，客户端修复不能证明 CDN 已全面清理。
- date: 2026年11月4日
  title: 官方通知承认可能存在第三方脚本篡改
  body: 可读的公开嵌入片段证实该说明及更新时间；本轮未能读取完整通知。
- date: 11月4日 07:14–07:20 UTC
  title: 研究人员复查四个已知官方文件，响应均已干净
  body: WormW 报告四个 URL 的响应已干净，FeedList 的标准及带缓存参数请求也均如此。这只是限定范围的观察，不能证明每个 CDN 节点、本地缓存或受感染主机均已干净。
checklist:
- title: 停止启动器，清理前先保留证据
  hint: 关闭启动器及托盘进程，将疑似感染电脑断网。删除或重装前，保留 Launcher/intl_service/debug.log、Launcher/log/tinyget 及启动器缓存。研究报告指出，更新或服务器关闭不能撤销之前的远程访问。
- title: 排查已公布的网络及本地指标
  hint: 报告列出超过 30 个指标值及 264 个目标凭据、配置路径，请核对原文完整 Indicators of compromise 和 target-paths.md。网络指标：insightjs.com; analytics.insightjs.com; insightjs.org; 89.127.233.127; 89.126.250.172; https://insightjs.com/l.js?f=aegis; https://insightjs.com/l.js?f=images; https://insightjs.com/l.js?f=feedlist; https://insightjs.com/l.js?f=vue; https://analytics.insightjs.com/comm/assets/insight.bundle; https://analytics.insightjs.com/px/<32 hex>。被修改的官方 URL：https://sg-gpts.playerinfinite.com/comm/assets/lib/aegis-fix.min.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/images.7fec4c32.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/FeedList.feb647c9.js; https://na-webassets.playerinfinite.com/comm/assets/lib/vue-bucket.min.js。CDN 节点 43.175.144.148 和 43.175.145.181 曾分发旧恶意副本，属于共享分发节点，不能证明攻击者拥有它们。insightjs.org 后被第三方注册为警告网站。WormW 扩充清单包含超过 100 行指标，完整哈希、ETag 及本地痕迹见其 iocs/iocs.csv。额外网络排查线索：portal.insightjs.com; docs.insightjs.com; https://insightjs.org/l.js; https://analytics.insightjs.com/px/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>; POST /speed; hooks.slack.com/(services|workflow|triggers)。裸 /collect/<32 hex> 被报告为诱饵；Slack 及官方 CDN 流量可能正常。检查 debug.log 的 k2f_chan registered、Local Storage 的 k2f.agent.state，以及下列 HKCU CLSID 和 DLL。匹配须结合上下文，本身不能证明入侵；未命中哈希、DNS 或日志也不代表安全。
- title: 按记录顺序清理 Windows 持久化，或重建系统
  hint: 保留证据后按研究人员步骤处理：只删除 HKCU\Software\Classes\CLSID\{E77CC89B-7401-4C04-8CED-149DB35ADD04}，重启 Windows，再删除 %LOCALAPPDATA%\Google\Chrome\User Data\PlatformExperienceHelper 下包含 platform_experience_helper.dll 的 64 位十六进制名称子目录。保留正常 HKLM CLSID 和 PlatformExperienceHelper 父目录。DLL 可能锁定到重启后，且各受害者哈希不同。由于攻击者可能执行任意命令，疑似入侵时从可信介质重建更稳妥；杀毒未检出并不足够。
- title: 从干净设备更换凭据并吊销会话
  hint: 疑似感染时更换 NIKKE/Level Infinite 及其他暴露账户的密码，终止活跃会话，吊销并重新签发 API 令牌、SSH 密钥及开发、云凭据。若钱包助记词可能暴露，从干净设备将资产迁往使用全新助记词的钱包。静态能力不代表所有列出凭据或钱包均已被盗。Proton 可暴露宿主用户有权读取的文件及环境变量；没有 Windows Chrome 持久化不代表 Linux 主机安全。
- title: 恢复前核实官方更新并清除旧缓存
  hint: 重新打开前查看当前 NIKKE 官方通知及处置状态。保留证据后，按研究人员建议清除 %APPDATA%\nikke_launcher\tbs_cache；Proton 需处理对应 prefix 内路径。按 WormW attack-path 报告及完整指标 CSV 中的历史恶意哈希、ETag 排查启动器及代理缓存。其 11 月 4 日 07:14–07:20 UTC 复查发现四个已知文件已干净，但不能证明所有节点或缓存均已清理；本轮没有可列出的修补版本下限。清缓存或升级启动器不能移除既有恶意程序，也不能使被盗会话失效。
sources:
- name: MotherSphere 原始技术报告及指标清单
  says: 通过公开 GitHub Gist API 阅读完整原文，区分自身主机、静态分析及评论者报告，列出 CDN 缓存观察、指标与清理更正。
- name: NIKKE 官方通知的公开嵌入片段
  says: 可读官方片段承认 PC 脚本可能遭篡改，并说明 11 月 4 日 02:30 UTC+9 修复客户端。直接 X 页面返回 403，嵌入片段后半截被截断，未视为已读。
- name: MotherSphere 公开 GitHub Gist API 原文副本
  says: 实际核阅的完整英文文件及 UTC 创建元数据，与原报告属于同一来源，不是独立佐证。
- name: WormW 原始样本分析及当前文件复查
  says: 11 月 4 日 07:14–07:20 UTC 复查发现四个已知文件已干净，记录历史恶意副本、当前哈希及缓存边界。原始分发观察归于 MotherSphere 及第三方报告。
- name: WormW 完整指标 CSV
  says: 超过 100 行指标并标记置信度，包含历史哈希、ETag、网络模式及本地痕迹；共享服务和历史指标须结合上下文。
---

11 月 3 日公开的原始分析指出，Level Infinite 官方 CDN 上四个被修改的 JavaScript 文件会加载外部脚本，再通过 PC 启动器内嵌 Chromium 的桥接接口下载 LuaJIT 远控 Agent。研究人员分析了一台受影响电脑及载荷静态代码，并将其他用户的观察标为转述证据。命令可读取文件、执行程序及截屏；分析还识别出浏览器、凭据窃取能力及 Windows Chrome 持久化路径。具有能力不代表每项凭据均已被盗，尚无受害者总数或确认的钱包损失总额。

运营方可读官方片段承认第三方可能篡改脚本，将客户端修复时间标为 11 月 4 日约 02:30 UTC+9，即 11 月 3 日 17:30 UTC。研究人员在 11 月 3 日 22:26 UTC 仍从两台 CDN 节点观察到被修改的 FeedList。WormW 随后报告，11 月 4 日 07:14–07:20 UTC 复查中四个已知官方文件均返回干净内容，包括 FeedList 的标准及带缓存参数请求；外部响应尚不能完全区分源站及中间缓存状态。这些观察涉及不同层面：客户端更新、源站清理、CDN 缓存及已经感染的电脑，不能将通知视为每份缓存或每台电脑均已干净。完整官方通知仍无法读取，本文不对未读部分作推断。

研究报告更正了早先建议：PlatformExperienceHelper 父目录属于正常 Chrome 内容，onominan.tmp 不是感染指标。攻击者如何获得 CDN 或发布权限仍不明。所引分析未涵盖移动客户端，不能据此证明移动端不受影响。涉及广泛使用的启动器及有记录的恶意分发，因此评为 L3；运营方尚未确认实际执行的完整范围。
