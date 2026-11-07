---
title: NIKKE 确认 PC 启动器文件遭篡改，客户端更新不能清理已感染电脑
summary: Level Infinite 确认 NIKKE Windows 启动器文件遭第三方篡改，要求 9 月 27 日起曾启动的用户排查，并提供官方手动及 ACE 清理方案。厂商称移动端未受影响；恶意程序分发起点与研究人员日志存在分歧，受害范围仍不明，清理前应先保留证据。
splash: 9 月 27 日起使用过 NIKKE Windows 启动器的用户；研究人员另报告 Proton 暴露。厂商称移动端未受影响。
wipe: 排查暴露期间保持启动器关闭；核实官方处置，保留证据，清除旧缓存，并更换暴露的凭据。
inTheWildNote: 厂商确认启动器文件遭第三方篡改；具体执行及受害范围仍在调查。
timeline:
- date: 2026年9月27日
  title: 被修改的启动器文件带有九月时间戳
  body: 日期来自研究人员核阅的 CDN 文件头，并非公开披露日期。 11 月 4 日厂商后续公告称，域名于 01:59 UTC 被劫持，启动器脚本于 06:41 UTC 被修改；初始入侵机制仍在调查。
- date: 10月23日 16:40 UTC
  title: 研究人员收到的最早 Agent 启动记录
  body: 来自评论者日志，属于转述证据，并非厂商确认的活动开始时间。
- date: 10月29日 18:52 UTC
  title: 厂商所述的恶意程序分发起点
  body: 11 月 4 日回溯公告写为 10 月 30 日 03:52 UTC+9；这晚于研究人员收到的 10 月 23 日执行日志，二者尚未对齐，不能用该日期排除更早暴露。
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
  body: 初次核实时，只读到该初始通知的公开嵌入片段；后续已另读完整事件及手动排查公告，见下项。
- date: 2026年11月4日
  title: 完整官方后续公告确认篡改，并提供手动及客户端清理
  body: 建议排查自 9 月 27 日 06:41 UTC 起使用过 Windows 启动器的电脑；称移动端未受影响。ACE 功能宣布自 11 月 4 日 23:00 UTC 起提供，需用户同意删除日志、DLL 和注册表项；并非本文验证已部署或完成赔付。
- date: 11月4日 03:09 UTC
  title: 厂商报告完成剩余脚本的 CDN 缓存刷新
  body: 公告写为 12:09 UTC+9，随后逐步向节点分发修正文件；不证明所有客户端缓存或已感染电脑已干净。
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
- date: 11月5日 14:39 UTC
  title: 研究人员提醒证据删除及假清理命令
  body: 修订转述一台更新后的干净安装未弹窗即删除 debug.log，补充 NTFS 日志的证据局限，并识别不相关的管理员脚本诱饵。另报告 insightjs.com 被注册商暂停，这不等于主机已清理。
- date: 2026年11月6日
  title: 研究者说明浏览器及启动器已保存密码的收集边界
  body: 作者新回复只描述一个已分析版本，不代表全部下发载荷。浏览器锁或缺失 psd.dat 不能排除早期收集、任意文件读取、其他版本及未经分析的浏览器 DLL，仍建议从干净设备更换密码并吊销会话。
- date: 2026年11月6日
  title: 作者说明 cookie 输出方式及额外可读的登录票据
  body: 后续作者回复解释 browserscan 会序列化选定 cookie 字段，而非上传原始 SQLite 数据库；任意文件读取还可复制启动器日志中的 login_ticket 及 biz_ticket。票据有效期及每台电脑执行过的命令仍不明。
- date: 2026年11月7日
  title: 作者提醒系统还原可能恢复持久化
  body: 新回复说明无 Chrome 也能安装 DLL、重建前只读检查变更日志、在代理内阻断，以及核实旧会话是否真正结束。流量大小仍不能确定哪些数据被窃取。
checklist:
- title: 停止启动器，清理前先保留证据
  hint: 关闭启动器及托盘进程，将疑似感染电脑断网。删除或重装前，保留 Launcher/intl_service/debug.log、Launcher/log/tinyget 及启动器缓存。研究报告指出，更新或服务器关闭不能撤销之前的远程访问。 私下保留未改动的证据副本。公开日志前，遮盖 tinyget.mem.log 及按日期保存的 tinyget API 请求中的 Cookie 行，以及 login_ticket、biz_ticket、uid、openid 和 sig 的值；path= 可能暴露 Windows 用户名。 同时关闭 Google Play Games 变体的 nikke_launcher_google.exe。 若启动时输入了另一账户的管理员凭据，也检查该账户的 %APPDATA%、%TEMP% 和 HKCU 持久化键，不能只查日常账户。 官方手动说明还要求关闭 NIKKE 游戏及 Chrome。ACE 清理会删除关联日志；研究人员另转述一台更新后的干净安装未询问便删除 debug.log。任何重开前均须保留证据，不只是同意 ACE 前。文件已丢失时，可取证检查有保留期限的 NTFS 变更日志，查找 tinyget.<time>.log.cdt→.log 及 k2f-bcreds 创建、删除；日志轮转及 Firefox 原位读取限制阴性结论。
- title: 可选用研究人员工具检查已保留的证据
  hint: 原报告链接 https://github.com/MotherSphere/NIKKE-Launcher-Check。README 描述 Windows、Linux／Proton 及 macOS／Wine 本地检查，不联网也不负责清理；这是作者说法，并非独立审计。通过原项目发版及 SHA256SUMS.txt 核对下载。删除 tbs_cache 前先检查，或保留私有副本。分享报告前启用 Hide my info 或 --redact。No traces found 只描述已检查路径，仍须执行下列手动排查及清理。本文没有运行该工具。 v0.5.2 改进 Google Play Games 进程识别及启动失败判定，并仅统计 k2f-／k2f_ 临时文件；没有要求运行该工具。
- title: 排查已公布的网络及本地指标
  hint: 报告列出超过 30 个指标值及 264 个目标凭据、配置路径，请核对原文完整 Indicators of compromise 和 target-paths.md。网络指标：insightjs.com; analytics.insightjs.com; insightjs.org; 89.127.233.127; 89.126.250.172; https://insightjs.com/l.js?f=aegis; https://insightjs.com/l.js?f=images; https://insightjs.com/l.js?f=feedlist; https://insightjs.com/l.js?f=vue; https://analytics.insightjs.com/comm/assets/insight.bundle; https://analytics.insightjs.com/px/<32 hex>。被修改的官方 URL：https://sg-gpts.playerinfinite.com/comm/assets/lib/aegis-fix.min.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/images.7fec4c32.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/FeedList.feb647c9.js; https://na-webassets.playerinfinite.com/comm/assets/lib/vue-bucket.min.js。CDN 节点 43.175.144.148 和 43.175.145.181 曾分发旧恶意副本，属于共享分发节点，不能证明攻击者拥有它们。insightjs.org 后被第三方注册为警告网站。WormW 扩充清单包含超过 100 行指标，完整哈希、ETag 及本地痕迹见其 iocs/iocs.csv。额外网络排查线索：portal.insightjs.com; docs.insightjs.com; https://insightjs.com/l.js; https://insightjs.org/l.js; https://analytics.insightjs.com/px/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>; insightjs.com POST /speed; hooks.slack.com/(services|workflow|triggers)。裸 /collect/<32 hex> 被报告为诱饵；89.126.250.172 来自他人报告，未获该研究独立证实。/speed 是门面统计线索；Slack 及官方 CDN 流量可能正常。检查 debug.log 的 k2f_chan registered、Local Storage 的 k2f.agent.state，以及下列 HKCU CLSID 和 DLL。匹配须结合上下文，本身不能证明入侵；未命中哈希、DNS 或日志也不代表安全。 更新原文另列共享 CDN 节点 43.175.139.78；较早报告载荷的临时文件为 %TEMP%\k2f-keyscan-<time>-<rand>.db 和 %TEMP%\k2f_screen_<unix time>_<n>.png，较新临时数据库及截图为 %TEMP%\k2f-bcreds-<unix time>-<random>.db 和 %TEMP%\k2f_screen_<unix time>_<n>.jpg。代理状态也可能位于 Local Storage leveldb 的压缩 .ldb 文件中，应予保留。新增历史载荷哈希及七个 ETag 见完整原文。共享 CDN 地址不能证明攻击者归属。 新增同名脚本的 sg-gpts URL：https://sg-gpts.playerinfinite.com/comm/nikke_launcher/assets/images.7fec4c32.js; https://sg-gpts.playerinfinite.com/comm/nikke_launcher/assets/FeedList.feb647c9.js; https://sg-gpts.playerinfinite.com/comm/assets/lib/vue-bucket.min.js。另有已检查共享 CDN 节点 43.152.43.115；警告站 insightjs.org 的 Cloudflare 地址为 104.21.35.173 和 172.67.178.16，不能当作攻击者 IP 或整段阻断依据。原文核验的历史恶意 aegis SHA-256 为 04471ccf9f6ebac477ba4ca6b408a56621bccd16118c3112720adb35e6422e3d，images 为 21d2fa4b6cdd15da3d5246687a01ef84fb848668144258b110606db5eb5ea7ce。Code Cache 条目仅留键、时间戳及短标记，不能从中恢复 l.js；HTTP Cache 的脚本可能 gzip 压缩，纯文本搜索会漏检。 tinyget 的 AddTask 只证明请求；同一任务出现 curl perform success 和 OnDownloadResult result=0、非零 total 才能确认下载完成。curl_error、result=2、total=0 表示该次下载失败，不能当作已完成；这也不能排除其他运行或缓存中的载荷。
- title: 按记录顺序清理 Windows 持久化，或重建系统
  hint: 保留证据后按研究人员步骤处理：只删除 HKCU\Software\Classes\CLSID\{E77CC89B-7401-4C04-8CED-149DB35ADD04}，重启 Windows，再删除 %LOCALAPPDATA%\Google\Chrome\User Data\PlatformExperienceHelper 下包含 platform_experience_helper.dll 的 64 位十六进制名称子目录。保留正常 HKLM CLSID 和 PlatformExperienceHelper 父目录。DLL 可能锁定到重启后，且各受害者哈希不同。由于攻击者可能执行任意命令，疑似入侵时从可信介质重建更稳妥；杀毒未检出并不足够。 新官方手动步骤采用相同的 HKCU→重启→只删目标 64 位子目录顺序；不要删除其他路径的同名键或整个 Chrome 父目录。
- title: 从干净设备更换凭据并吊销会话
  hint: 疑似感染时更换 NIKKE/Level Infinite 及其他暴露账户的密码，终止活跃会话，吊销并重新签发 API 令牌、SSH 密钥及开发、云凭据。若钱包助记词可能暴露，从干净设备将资产迁往使用全新助记词的钱包。静态能力不代表所有列出凭据或钱包均已被盗。Proton 可暴露宿主用户有权读取的文件及环境变量；没有 Windows Chrome 持久化不代表 Linux 主机安全。 作者 11 月 6 日回复建议：若代理曾运行，将 Chrome、Edge、Brave、Vivaldi、Opera、Firefox 保存的密码视为暴露，并吊销上述 Chromium 浏览器的会话。Ungoogled Chromium 仍需防范其他命令、版本及未经分析的 DLL，维持密码和会话处置。即使目前没有 psd.dat，也应更换 NIKKE 密码，不能据此证明运行时该文件不存在。 将 tinyget.mem.log 及按日期保存的 Launcher/log/tinyget 日志中的 login_ticket、biz_ticket 视为可能被读取的凭据；向 Level Infinite 支持核实如何使既有登录票据失效，其权限和有效期尚未测试。从干净设备更换曾保存在该电脑上的路由器管理密码；若曾连接 Android 手机，可预防性检查已安装应用并运行 Play Protect，这不是手机或路由器已遭入侵的证据。
- title: 恢复前核实官方更新并清除旧缓存
  hint: 重新打开前查看当前 NIKKE 官方通知及处置状态。保留证据后，按研究人员建议清除 %APPDATA%\nikke_launcher\tbs_cache；Proton 需处理对应 prefix 内路径。按 WormW attack-path 报告及完整指标 CSV 中的历史恶意哈希、ETag 排查启动器及代理缓存。其 11 月 4 日 07:14–07:20 UTC 复查发现四个已知文件已干净，但不能证明所有节点或缓存均已清理；本轮没有可列出的修补版本下限。清缓存或升级启动器不能移除既有恶意程序，也不能使被盗会话失效。 MotherSphere 后续 11:20 UTC 检查在四个节点上发现两主机的四个已知文件均已干净；初始发布权限入侵途径仍不明，应继续阻断已公布的恶意域名及 IP。 HMT 变体还需处理 %APPDATA%\nikke_launcher_hmt\tbs_cache，Google Play Games 变体为 %APPDATA%\nikke_launcher_google\tbs_cache，均先保留证据。11 月 4 日重建前端仍沿用 FeedList.feb647c9.js 的 URL，不能只靠更新后文件名判断缓存已清理。
- title: 核实官方 ACE 方案并向客服报告影响
  hint: 从官方 PC Launcher Security Incident and Follow-up Measures 公告查看 ACE 使用步骤。厂商宣布自 11 月 5 日 08:00 UTC+9 起提供；保留证据并关闭浏览器后，再决定是否允许删除相关日志、DLL 和注册表项。未弹窗不等于主机安全。也可按官方手动说明处理 Launcher\log\tinyget 中已识别的恶意下载文件：官方举例为 205,135 字节的 tinyget.<date>-<time>.log；研究报告另有较早 165,108 字节 k2f.lua，不能只凭一个大小排除感染，先取证再删确认的恶意文件。更新可信杀毒并执行全盘和 Defender 离线扫描。外部账户或资金疑受影响时，从已知游戏内客服入口提交记录；逐案调查不代表已承诺或完成损失赔付。
- title: 拒绝陌生清理脚本
  hint: 研究人员识别 kernelscv[.]cfd?t=nikke 为另一项假管理员 PowerShell 清理诱饵，不属于原始 NIKKE 基础设施，不要执行。其声称的 45.153.*:4444、nikke_bootstrap.dll、NikkeUpdate 和 NIKKE_Helper 并非本事件已验证指标。若运行过，隔离并按另一项入侵处置。即使注册商据报暂停域名，仍阻断既有 NIKKE 域名及 IP；匹配须结合上下文，暂停也可能解除。
- title: 检查现存证据，不要回滚 Windows
  hint: '不要用系统还原查感染日期：作者提醒这可能恢复 HKCU 键及 DLL，使 Chrome 或 Steam 再次加载。全新安装会建立新日志，应在重建前由管理员只读运行 fsutil usn readjournal C: csv | findstr /i "platform_experience_helper.dll"。保留 .dll 后缀，排除 Chrome 的正常 .exe。File create／delete 记录可在日志保留范围内辅助判断 DLL 日期；记录已轮转时，没有结果不代表安全。启用系统保护时，可打开（不要还原）%LOCALAPPDATA%\Google\Chrome\User Data 的合适 Previous Versions，查看 PlatformExperienceHelper 及 DLL 修改时间，不要打开或复制 DLL。缺少 Chrome 不能排除风险：已分析安装器会自行创建目录，基于 Chromium 的程序也可能加载 DLL。'
- title: 在代理内阻断，并核实会话吊销
  hint: 使用 Clash 或 mihomo 的 fake-IP 模式时，应在代理配置内为 insightjs.com、analytics.insightjs.com、insightjs.org、89.127.233.127、89.126.250.172 添加拒绝规则；hosts 文件未必控制代理侧 DNS。作者指出 nslookup 跳过 hosts 文件，因此 198.18.x.x 结果不证明恶意解析。保留上述指标背景，命中本身不是入侵证据。从干净设备更换密码后，检查各服务活跃会话或使用全部退出功能。新浏览器或 Thunderbird 要求密码，不能证明旧会话已结束。保存在受影响电脑上的密码，即使对应服务当时未登录，也应更换。
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
- name: Level Infinite 完整 PC 启动器事件及后续措施公告
  says: 11 月 4 日官方页面在公开浏览器完整读取。确认文件篡改，回溯分发及两轮处置，宣布 ACE 清理，要求客服报损；分发起点与研究报告有分歧，未确认总受害人数或赔付。
- name: NIKKE 官方手动安全排查说明
  says: 11 月 4 日全文经公开浏览器读取。Windows／Google 安装路径、日志检查、HKCU→重启→目标 DLL 子目录清理、下载文件及缓存、凭据保护、完整和离线扫描；称移动端未受影响。
---

11 月 3 日公开的原始分析指出，Level Infinite 官方 CDN 上四个被修改的 JavaScript 文件会加载外部脚本，再通过 PC 启动器内嵌 Chromium 的桥接接口下载 LuaJIT 远控 Agent。研究人员分析了一台受影响电脑及载荷静态代码，并将其他用户的观察标为转述证据。命令可读取文件、执行程序及截屏；分析还识别出浏览器、凭据窃取能力及 Windows Chrome 持久化路径。具有能力不代表每项凭据均已被盗，尚无受害者总数或确认的钱包损失总额。

运营方可读官方片段承认第三方可能篡改脚本，将客户端修复时间标为 11 月 4 日约 02:30 UTC+9，即 11 月 3 日 17:30 UTC。研究人员在 11 月 3 日 22:26 UTC 仍从两台 CDN 节点观察到被修改的 FeedList。WormW 随后报告，11 月 4 日 07:14–07:20 UTC 复查中四个已知官方文件均返回干净内容，包括 FeedList 的标准及带缓存参数请求；外部响应尚不能完全区分源站及中间缓存状态。这些观察涉及不同层面：客户端更新、源站清理、CDN 缓存及已经感染的电脑，不能将通知视为每份缓存或每台电脑均已干净。此前仅能读取初始通知片段；现已读取后续完整官方事件公告及手动指引，新增信息见下文。

研究报告更正了早先建议：PlatformExperienceHelper 父目录属于正常 Chrome 内容，onominan.tmp 不是感染指标。攻击者如何获得 CDN 或发布权限仍不明。所引研究未分析移动客户端；后续官方手动公告明确称移动端未受影响。涉及广泛使用的启动器及有记录的恶意分发，因此评为 L3；运营方现已确认文件遭第三方篡改，实际执行及受害范围仍未确认。

**11 月 4 日原始研究更新：** MotherSphere 现称 11:20 UTC 时，两主机的四个已知文件在四个已检查 CDN 节点均已干净，但其核阅的公开扫描在 00:48 UTC 仍取得恶意 FeedList，观察节点在 03:12–03:21 UTC 取得干净副本。这补充了上文时间更早的 WormW 复查，并不矛盾，也不能证明全球清缓存。清理启动器缓存前先保留日志及 Local Storage，包括压缩的 `.ldb` 文件。较早报告载荷使用额外临时文件名及哈希，未命中最新哈希不能证明安全。初始 CDN／发布权限入侵途径和完整受害范围仍未查明。

**可选证据检查工具：** 原报告现链接作者发布的 NIKKE Launcher Check，v0.5.1 于 11 月 4 日 13:39 UTC 发布。说明区分脚本暴露、代理感染、未发现痕迹及未找到安装目录。这些是工具判定，不是完整取证结论。清理前保留缓存，分享报告前脱敏；疑似失陷时仍须手动调查、清除持久化或重建，并从干净设备轮换凭据。本文没有运行或独立审计该工具。

**11 月 4 日晚间研究修订：** Google Play Games PC 版本受影响来自用户报告，安装及进程线索为 `C:\NIKKE_GOOGLE`、`Launcher\nikke_launcher_google.exe` 和 `%APPDATA%\nikke_launcher_google`，不是厂商完整范围确认。前端已重建，但 FeedList 保持原 URL，须先保留证据再清理各变体缓存。研究人员 22:59 UTC 仍观察到两个原恶意域名解析至 89.127.233.127；DNS 解析不证明服务器恢复或仍在执行恶意指令。

某次运行若在 `k2f_chan registered` 后立即以 `startup failed: EIO: invalid UTF-8 in string` 结束，且没有 `adopted`、`resuming` 或 `agent started as` 行，研究人员检查认为非 ASCII Windows 用户名可使系统信息编码失败；该次运行可能尚未取得服务端 ID。但当时的 l.js 未被捕获，后续行为不明，代理已下载并执行，仍须按疑似感染处理。v0.5.2 将其单独标为已加载但启动失败。代理虽未内置计划任务、Run 键、服务、WMI 或启动目录持久化代码，任意命令能力仍可部署其他持久化，排查不应只限于已知 CLSID。静态浏览器扫描只提取 Chromium Cookie，Firefox 取 logins.json／key4.db；这不限制任意文件读取能力，也不证明 Cookie 或密码已实际外泄。

**11 月 4 日官方后续措施：** Level Infinite 现确认 Windows 启动器文件遭篡改，并要求自 9 月 27 日 15:41 UTC+9（06:41 UTC）起启动过的用户排查。厂商称移动版未受影响，替代此前仅能说明研究未覆盖移动端的局限。厂商回溯把恶意程序开始分发写为 10 月 30 日 03:52 UTC+9（10 月 29 日 18:52 UTC），而研究人员收到的日志早至 10 月 23 日；两种说法均保留，不能据较晚日期免除排查。域名劫持和 CDN／网络入口仍属厂商调查中的归因，不能当作已独立核实的完整根因。

厂商称三份脚本于 11 月 3 日 17:04–17:23 UTC 替换，剩余脚本于 11 月 4 日 03:09 UTC 完成 CDN 刷新后逐步分发。其宣布从 11 月 4 日 23:00 UTC 起提供官方客户端 ACE 扫描与清理，需同意删除关联日志、DLL 和注册表项，故先保留证据。本文没有运行该功能，也不能以厂商对残留 DLL 不再执行的说法或未弹窗证明主机完全安全；任意命令能力可能留下其他持久化。手动指引另要求全盘及 Defender 离线扫描、账户密码更新、API 密钥和令牌轮换，并请受影响用户通过客服报损。没有公布确认损失总额或已完成赔付。

厂商还计划加强监控、验证启动器外部资源的完整性，并审查各功能权限。这些是已宣布的预防措施，尚非独立验证完成的控制，也不能证明既有感染已清除。

**11 月 5 日研究更新：** 重开更新后的启动器前先保留证据，一项干净安装据报未经同意便丢失 `debug.log`。研究人员 14:39 UTC 修订另称 `insightjs.com` 自 02:05 UTC 被暂停，09:09 UTC 检查时已不解析。这不撤销此前访问。无关假清理域名属于另一项诱饵，不能据此认定同一操作者。

**11 月 6 日收集边界说明：** MotherSphere 的作者回复区分了 11 月 3 日 14:56 GMT 上传的一个已分析版本与尚未全部检查的早期版本。该版本的 `browserscan` 覆盖 `%LOCALAPPDATA%\Google\Chrome\User Data`、`%LOCALAPPDATA%\Microsoft\Edge\User Data`、`%LOCALAPPDATA%\BraveSoftware\Brave-Browser\User Data`、`%LOCALAPPDATA%\Vivaldi\User Data` 和 `%APPDATA%\Opera Software\Opera Stable`，还会从 `%APPDATA%\Mozilla\Firefox\Profiles` 复制 Firefox 的 `key4.db` 和 `logins.json`，但不收集 Firefox cookie。Ungoogled Chromium 的 `%LOCALAPPDATA%\Chromium\User Data` 不在该命令的内置列表中，不代表代理的任意文件读取或执行能力无法访问。

在该版本中，浏览器持有的独占锁可阻止 cookie 数据库复制，却不会同样保护 Chromium 的已保存密码数据库。该命令也会跳过大于 4,194,304 字节的 cookie 文件，或在 `collect_cookies` 为 false 时跳过。这只是特定命令的限制：关闭浏览器后的另一次运行、任意文件命令、其他版本或未经分析的 Chrome DLL 都可能改变暴露范围。启动器日志和按小时统计的 SRUM 字节数不能说明执行过哪些命令或窃取了什么；少量上传或扫描无异常都不能排除风险。

同一回复称，`creds` 会读取标准及 HMT 启动器目录中的 `last_user.dat` 和 `psd.dat`，选择已保存账户并解密其密码。缺失 `psd.dat` 会阻止该版本通过这一命令取得密码，但现在没有该文件，不能证明此前也不存在。命令跳过 Google 版本目录，但任意文件读取仍可触及该目录，其文件格式尚未核实。这些说明不能证明每个密码均已被窃取，也不能划定安全的启动器版本。

**11 月 6 日作者进一步说明：** `browserscan` 读取 cookie 的站点、名称及加密值，返回附带路径、配置文件和密钥的条目，而非原始 SQLite 文件。`l.js` 以 base64url 分块读取这些 JSON，默认每块最多 2 MiB；最初操控代理的 `l.js` 未被捕获，可能存在的传输压缩、加密及 SRUM 字节统计，均不能说明哪些资料已外传。Opera GX 的 `%APPDATA%\Opera Software\Opera GX Stable` 不在已分析的内置列表中，但任意文件命令仍可读取。浏览器锁只影响当时的 cookie 复制，不能保护后续启动、已保存密码或未经分析的浏览器 DLL。

作者还指出，`tinyget.mem.log` 及按日期保存的 `Launcher/log/tinyget` 日志含有 `login_ticket`、`biz_ticket`，可通过 `cat` 或 `download` 读取；尚未测试其权限及有效期。已分析代理没有手机、路由器专用代码或网络扫描器，但可以读取 Phone Link 存于电脑上的资料，任意执行也可能触及局域网管理入口或操作已连接的手机。这些是可能路径，并非已观察到的传播。向支持核实票据吊销方式，按上文保留及遮盖日志，检查关联设备和已保存的路由器凭据，不要据此声称它们已被入侵。

**11 月 7 日作者指引：** 已分析的 `chrome_install` 即使没有 Chrome，也会创建 Chrome 命名目录。持久化键仍生效时，其他基于 Chromium 的应用也可加载 DLL；作者引用一台电脑上 Steam 网页辅助进程及 Alt1 的观察。因此没有 Chrome 不能排除持久化。不要为调查回滚 Windows：系统还原可能恢复注册表键及 DLL，使其再次执行。重建前读取现存变更日志，或仅查看历史版本目录，不要还原或执行其中内容。SRUM 大致按小时统计进程流量，即使出现大流量，也不能确定传出了哪些数据。在代理内拒绝连接及检查实际旧会话列表，是对既有清理、干净设备凭据处置的补充，不能替代它们。
