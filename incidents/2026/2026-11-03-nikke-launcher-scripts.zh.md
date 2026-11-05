---
title: NIKKE PC 启动器脚本被指分发远控恶意程序，客户端更新不能清理已感染电脑
summary: 研究人员在四个 NIKKE PC 官方启动器脚本中发现恶意代码，并报告远控载荷执行迹象。运营方承认可能存在脚本篡改并已更新客户端；11 月 4 日研究人员复查发现四个已知 CDN 文件已干净，但旧缓存及既有感染仍须清理，受影响人数不明。
splash: NIKKE PC 启动器；研究报告涉及 Windows、Proton／Steam Deck，另有 Google Play Games 用户报告。完整范围未确认，未分析移动端。
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
- date: 11月4日 11:20 UTC
  title: 原始研究人员在四个已检查 CDN 节点发现干净文件
  body: MotherSphere 的 12:11 GMT 报告称，两主机的四个已知文件在四个检查节点均已干净；报告仍在 00:48 UTC 收到旧恶意 FeedList，节点于 03:12–03:21 UTC 取得干净副本。其他边缘节点和感染主机仍未核实。
- date: 11月4日 13:39 UTC
  title: 研究人员发布可选的本地证据检查工具
  body: GitHub 发版元数据记录 NIKKE Launcher Check v0.5.1。作者称工具只在本地读取检查；未检出不能证明安全。删除缓存前应先检查或保留证据。
- date: 11月4日 22:40 UTC
  title: 检查工具修正启动失败判定及 Google Play Games 进程识别
  body: v0.5.2 发版元数据为 22:40:34 UTC；作者增加“代理已加载但启动失败”的判定。工具没有独立审计，不能代替清理。
- date: 11月4日 23:18 UTC
  title: 原始研究补充启动器变体、缓存及失败日志边界
  body: 该版报告纳入 Google Play Games 版本受影响的用户报告、HMT／Google 缓存路径及重建前端。FeedList 保持原 URL；k2f_chan 后的 UTF-8 启动失败不能证明载荷未执行，完整影响范围仍未确认。
checklist:
- title: 停止启动器，清理前先保留证据
  hint: 关闭启动器及托盘进程，将疑似感染电脑断网。删除或重装前，保留 Launcher/intl_service/debug.log、Launcher/log/tinyget 及启动器缓存。研究报告指出，更新或服务器关闭不能撤销之前的远程访问。 私下保留未改动的证据副本。公开日志前，遮盖 tinyget.mem.log 及按日期保存的 tinyget API 请求中的 Cookie 行，以及 login_ticket、biz_ticket、uid、openid 和 sig 的值；path= 可能暴露 Windows 用户名。 同时关闭 Google Play Games 变体的 nikke_launcher_google.exe。
- title: 可选用研究人员工具检查已保留的证据
  hint: 原报告链接 https://github.com/MotherSphere/NIKKE-Launcher-Check。README 描述 Windows、Linux／Proton 及 macOS／Wine 本地检查，不联网也不负责清理；这是作者说法，并非独立审计。通过原项目发版及 SHA256SUMS.txt 核对下载。删除 tbs_cache 前先检查，或保留私有副本。分享报告前启用 Hide my info 或 --redact。No traces found 只描述已检查路径，仍须执行下列手动排查及清理。本文没有运行该工具。 v0.5.2 改进 Google Play Games 进程识别及启动失败判定，并仅统计 k2f-／k2f_ 临时文件；没有要求运行该工具。
- title: 排查已公布的网络及本地指标
  hint: 报告列出超过 30 个指标值及 264 个目标凭据、配置路径，请核对原文完整 Indicators of compromise 和 target-paths.md。网络指标：insightjs.com; analytics.insightjs.com; insightjs.org; 89.127.233.127; 89.126.250.172; https://insightjs.com/l.js?f=aegis; https://insightjs.com/l.js?f=images; https://insightjs.com/l.js?f=feedlist; https://insightjs.com/l.js?f=vue; https://analytics.insightjs.com/comm/assets/insight.bundle; https://analytics.insightjs.com/px/<32 hex>。被修改的官方 URL：https://sg-gpts.playerinfinite.com/comm/assets/lib/aegis-fix.min.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/images.7fec4c32.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/FeedList.feb647c9.js; https://na-webassets.playerinfinite.com/comm/assets/lib/vue-bucket.min.js。CDN 节点 43.175.144.148 和 43.175.145.181 曾分发旧恶意副本，属于共享分发节点，不能证明攻击者拥有它们。insightjs.org 后被第三方注册为警告网站。WormW 扩充清单包含超过 100 行指标，完整哈希、ETag 及本地痕迹见其 iocs/iocs.csv。额外网络排查线索：portal.insightjs.com; docs.insightjs.com; https://insightjs.com/l.js; https://insightjs.org/l.js; https://analytics.insightjs.com/px/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>; insightjs.com POST /speed; hooks.slack.com/(services|workflow|triggers)。裸 /collect/<32 hex> 被报告为诱饵；89.126.250.172 来自他人报告，未获该研究独立证实。/speed 是门面统计线索；Slack 及官方 CDN 流量可能正常。检查 debug.log 的 k2f_chan registered、Local Storage 的 k2f.agent.state，以及下列 HKCU CLSID 和 DLL。匹配须结合上下文，本身不能证明入侵；未命中哈希、DNS 或日志也不代表安全。 更新原文另列共享 CDN 节点 43.175.139.78；较早报告载荷的临时文件为 %TEMP%\k2f-keyscan-<time>-<rand>.db 和 %TEMP%\k2f_screen_<unix time>_<n>.png，较新临时数据库及截图为 %TEMP%\k2f-bcreds-<unix time>-<random>.db 和 %TEMP%\k2f_screen_<unix time>_<n>.jpg。代理状态也可能位于 Local Storage leveldb 的压缩 .ldb 文件中，应予保留。新增历史载荷哈希及七个 ETag 见完整原文。共享 CDN 地址不能证明攻击者归属。 新增同名脚本的 sg-gpts URL：https://sg-gpts.playerinfinite.com/comm/nikke_launcher/assets/images.7fec4c32.js; https://sg-gpts.playerinfinite.com/comm/nikke_launcher/assets/FeedList.feb647c9.js; https://sg-gpts.playerinfinite.com/comm/assets/lib/vue-bucket.min.js。另有已检查共享 CDN 节点 43.152.43.115；警告站 insightjs.org 的 Cloudflare 地址为 104.21.35.173 和 172.67.178.16，不能当作攻击者 IP 或整段阻断依据。原文核验的历史恶意 aegis SHA-256 为 04471ccf9f6ebac477ba4ca6b408a56621bccd16118c3112720adb35e6422e3d，images 为 21d2fa4b6cdd15da3d5246687a01ef84fb848668144258b110606db5eb5ea7ce。Code Cache 条目仅留键、时间戳及短标记，不能从中恢复 l.js；HTTP Cache 的脚本可能 gzip 压缩，纯文本搜索会漏检。
- title: 按记录顺序清理 Windows 持久化，或重建系统
  hint: 保留证据后按研究人员步骤处理：只删除 HKCU\Software\Classes\CLSID\{E77CC89B-7401-4C04-8CED-149DB35ADD04}，重启 Windows，再删除 %LOCALAPPDATA%\Google\Chrome\User Data\PlatformExperienceHelper 下包含 platform_experience_helper.dll 的 64 位十六进制名称子目录。保留正常 HKLM CLSID 和 PlatformExperienceHelper 父目录。DLL 可能锁定到重启后，且各受害者哈希不同。由于攻击者可能执行任意命令，疑似入侵时从可信介质重建更稳妥；杀毒未检出并不足够。
- title: 从干净设备更换凭据并吊销会话
  hint: 疑似感染时更换 NIKKE/Level Infinite 及其他暴露账户的密码，终止活跃会话，吊销并重新签发 API 令牌、SSH 密钥及开发、云凭据。若钱包助记词可能暴露，从干净设备将资产迁往使用全新助记词的钱包。静态能力不代表所有列出凭据或钱包均已被盗。Proton 可暴露宿主用户有权读取的文件及环境变量；没有 Windows Chrome 持久化不代表 Linux 主机安全。
- title: 恢复前核实官方更新并清除旧缓存
  hint: 重新打开前查看当前 NIKKE 官方通知及处置状态。保留证据后，按研究人员建议清除 %APPDATA%\nikke_launcher\tbs_cache；Proton 需处理对应 prefix 内路径。按 WormW attack-path 报告及完整指标 CSV 中的历史恶意哈希、ETag 排查启动器及代理缓存。其 11 月 4 日 07:14–07:20 UTC 复查发现四个已知文件已干净，但不能证明所有节点或缓存均已清理；本轮没有可列出的修补版本下限。清缓存或升级启动器不能移除既有恶意程序，也不能使被盗会话失效。 MotherSphere 后续 11:20 UTC 检查在四个节点上发现两主机的四个已知文件均已干净；初始发布权限入侵途径仍不明，应继续阻断已公布的恶意域名及 IP。 HMT 变体还需处理 %APPDATA%\nikke_launcher_hmt\tbs_cache，Google Play Games 变体为 %APPDATA%\nikke_launcher_google\tbs_cache，均先保留证据。11 月 4 日重建前端仍沿用 FeedList.feb647c9.js 的 URL，不能只靠更新后文件名判断缓存已清理。
sources:
- name: MotherSphere 原始技术报告及指标清单
  says: 通过公开 GitHub Gist API 阅读完整原文，区分自身主机、静态分析及评论者报告，列出 CDN 缓存观察、指标与清理更正。 11 月 4 日 12:11 GMT 修订新增 11:20 UTC 四节点干净复查、较晚历史旧缓存观察、旧载荷指标及压缩 .ldb 证据。 23:18 GMT 修订补充 Google Play Games 用户报告、变体缓存路径、重建前端及 UTF-8 启动失败边界。
- name: NIKKE 官方通知的公开嵌入片段
  says: 可读官方片段承认 PC 脚本可能遭篡改，并说明 11 月 4 日 02:30 UTC+9 修复客户端。直接 X 页面返回 403，嵌入片段后半截被截断，未视为已读。
- name: MotherSphere 公开 GitHub Gist API 原文副本
  says: 实际核阅的完整英文文件及 UTC 创建元数据，与原报告属于同一来源，不是独立佐证。
- name: WormW 原始样本分析及当前文件复查
  says: 11 月 4 日 07:14–07:20 UTC 复查发现四个已知文件已干净，记录历史恶意副本、当前哈希及缓存边界。原始分发观察归于 MotherSphere 及第三方报告。
- name: WormW 完整指标 CSV
  says: 超过 100 行指标并标记置信度，包含历史哈希、ETag、网络模式及本地痕迹；共享服务和历史指标须结合上下文。
- name: MotherSphere NIKKE Launcher Check 原始说明
  says: 作者描述的本地只读扫描、可选报告保存、检查及判定限制、发版校验和与脱敏；不是工具独立审计或主机安全保证。
- name: NIKKE Launcher Check v0.5.1 发版元数据
  says: 11 月 4 日 13:39:38 UTC 发布，列出各平台文件及校验和文件；没有运行下载的可执行程序。
- name: NIKKE Launcher Check v0.5.2 发版元数据
  says: 11 月 4 日 22:40:34 UTC 发布；修正启动失败判定、Google Play Games 进程识别及临时文件统计。未运行可执行文件。
---

11 月 3 日公开的原始分析指出，Level Infinite 官方 CDN 上四个被修改的 JavaScript 文件会加载外部脚本，再通过 PC 启动器内嵌 Chromium 的桥接接口下载 LuaJIT 远控 Agent。研究人员分析了一台受影响电脑及载荷静态代码，并将其他用户的观察标为转述证据。命令可读取文件、执行程序及截屏；分析还识别出浏览器、凭据窃取能力及 Windows Chrome 持久化路径。具有能力不代表每项凭据均已被盗，尚无受害者总数或确认的钱包损失总额。

运营方可读官方片段承认第三方可能篡改脚本，将客户端修复时间标为 11 月 4 日约 02:30 UTC+9，即 11 月 3 日 17:30 UTC。研究人员在 11 月 3 日 22:26 UTC 仍从两台 CDN 节点观察到被修改的 FeedList。WormW 随后报告，11 月 4 日 07:14–07:20 UTC 复查中四个已知官方文件均返回干净内容，包括 FeedList 的标准及带缓存参数请求；外部响应尚不能完全区分源站及中间缓存状态。这些观察涉及不同层面：客户端更新、源站清理、CDN 缓存及已经感染的电脑，不能将通知视为每份缓存或每台电脑均已干净。完整官方通知仍无法读取，本文不对未读部分作推断。

研究报告更正了早先建议：PlatformExperienceHelper 父目录属于正常 Chrome 内容，onominan.tmp 不是感染指标。攻击者如何获得 CDN 或发布权限仍不明。所引分析未涵盖移动客户端，不能据此证明移动端不受影响。涉及广泛使用的启动器及有记录的恶意分发，因此评为 L3；运营方尚未确认实际执行的完整范围。

**11 月 4 日原始研究更新：** MotherSphere 现称 11:20 UTC 时，两主机的四个已知文件在四个已检查 CDN 节点均已干净，但其核阅的公开扫描在 00:48 UTC 仍取得恶意 FeedList，观察节点在 03:12–03:21 UTC 取得干净副本。这补充了上文时间更早的 WormW 复查，并不矛盾，也不能证明全球清缓存。清理启动器缓存前先保留日志及 Local Storage，包括压缩的 `.ldb` 文件。较早报告载荷使用额外临时文件名及哈希，未命中最新哈希不能证明安全。初始 CDN／发布权限入侵途径和完整受害范围仍未查明。

**可选证据检查工具：** 原报告现链接作者发布的 NIKKE Launcher Check，v0.5.1 于 11 月 4 日 13:39 UTC 发布。说明区分脚本暴露、代理感染、未发现痕迹及未找到安装目录。这些是工具判定，不是完整取证结论。清理前保留缓存，分享报告前脱敏；疑似失陷时仍须手动调查、清除持久化或重建，并从干净设备轮换凭据。本文没有运行或独立审计该工具。

**11 月 4 日晚间研究修订：** Google Play Games PC 版本受影响来自用户报告，安装及进程线索为 `C:\NIKKE_GOOGLE`、`Launcher\nikke_launcher_google.exe` 和 `%APPDATA%\nikke_launcher_google`，不是厂商完整范围确认。前端已重建，但 FeedList 保持原 URL，须先保留证据再清理各变体缓存。研究人员 22:59 UTC 仍观察到两个原恶意域名解析至 89.127.233.127；DNS 解析不证明服务器恢复或仍在执行恶意指令。

某次运行若在 `k2f_chan registered` 后立即以 `startup failed: EIO: invalid UTF-8 in string` 结束，且没有 `adopted`、`resuming` 或 `agent started as` 行，研究人员检查认为非 ASCII Windows 用户名可使系统信息编码失败；该次运行可能尚未取得服务端 ID。但当时的 l.js 未被捕获，后续行为不明，代理已下载并执行，仍须按疑似感染处理。v0.5.2 将其单独标为已加载但启动失败。代理虽未内置计划任务、Run 键、服务、WMI 或启动目录持久化代码，任意命令能力仍可部署其他持久化，排查不应只限于已知 CLSID。静态浏览器扫描只提取 Chromium Cookie，Firefox 取 logins.json／key4.db；这不限制任意文件读取能力，也不证明 Cookie 或密码已实际外泄。
