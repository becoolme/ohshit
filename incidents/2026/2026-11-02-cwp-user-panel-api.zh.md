---
title: Control Web Panel 十项漏洞与公开攻击链涉及用户面板和 root API
summary: CWP 完整报告补齐十个 CVE，演示了旧版用户面板未认证到 root 的攻击链；1.12 后仍需修复本机 API。研究将最终修复归于 1.29，CNA 边界为 1.30。应安装厂商当前 1.30.1 LTS 或适用更新版本；尚无在野利用证据。
splash: 旧版 CWP 用户面板；多项 root API 漏洞还需要访问本机回环 API
wipe: 升级 CWP 至厂商推荐的 1.30.1 LTS 或适用更新版本；限制面板和本机 API，排查既往异常
inTheWildNote: 已有实验室攻击链和公开 PoC；尚未证实在野攻击。
cves:
- name: 本地 PHP 文件包含
  description: 1.16 之前，services/users/index.php 的 module 参数可越出包含目录；CNA 评分要求低权限访问。
- name: 登录重定向后继续执行
  description: 1.12 之前，跳转到登录页后未终止 PHP 执行，未认证请求可继续进入受保护的用户面板功能。
- name: phpini_editor 文件写入与命令执行
  description: 1.16 之前，能访问模块的攻击者可通过 acc=update 越界写文件，或通过 acc=addlabelphpiniadv 注入 shell；CNA 评分要求低权限。
- name: protected_directory 命令注入
  description: 1.16 之前，acc=deletedp 中的 file POST 参数进入 shell 命令，以用户面板上下文执行。
- name: 回环 API 缺少认证
  description: 1.30 之前，能够访问回环 API 的调用者无需访问令牌即可调用 root 权限路由。
- name: 数据库恢复 API 命令注入
  description: 1.30 之前，可达的 /v1/restoredatabase/ 路由将 POST 文件路径传入 root shell 命令。
- name: API 认证 SQL 注入
  description: 1.16 之前，access_token() 将 authorization_code 和 client_id 拼入 root MySQL 查询；需要访问回环 API。
- name: 密码路由 root 命令注入
  description: 1.16 之前，回环 /newpass/ 路由将未转义的 POST user 参数用于 root shell 命令。
- name: 回环 API 盲 SQL 注入
  description: 1.30 之前，/user_panel_dashboard/（后改为 /valid_token/）的 user 参数进入 root 数据库查询；需要访问回环 API。
- name: valid_token 路由 root 命令注入
  description: CNA 称 1.30 之前，能访问回环 /valid_token/ 的调用者可将 user 参数中的 shell 元字符送入 root 命令；研究将修复归于 1.29。
fixed:
- product: Control Web Panel 厂商当前版本
  status: 厂商推荐的 11 月 3 日 LTS；研究最低修复版本 1.29 与部分 CNA 1.30 边界存在差异
timeline:
- date: 2026年9月8日
  title: 厂商发布 CWP 1.12
  body: 更新日志称改进安全性，但未对应到这些 CVE。
- date: 2026年10月31日
  title: 厂商发布 CWP 1.30
  body: 当前更新日志包括进一步加固用户面板及内部 API。
- date: 2026年11月2日
  title: VulnCheck 发布十项相关 CVE 记录
  body: 这是详细公开披露日，与先前版本发布日期不同。
- date: 2026年11月3日
  title: 厂商发布并建议所有服务器更新至 1.30.1 LTS
  body: 进一步加固 API 密钥验证、内部调用、一次性登录链接及更新下载；默认邮件信任网络也收窄。
- date: 2026年11月3日
  title: 完整技术报告演示攻击链并补充修复依据
  body: 研究在已修补旧 CVE-2025-48703 的 CWP7 webpanel 1.8 实验环境复现未认证到 root，补齐 CVE-2026-104080。验证了 1.30 的修复代码；1.27/1.29 的拆分依据是更新日志。
checklist:
- title: 升级实际运行的 CWP
  hint: 在 Settings > CWP Settings > CWP updates 中使用受支持更新渠道。厂商 Update 页面显示已装与最新版本及更新日志。选择厂商现已发布的 1.30.1 LTS 或适用更新版本；完成后重新核验版本和更新结果，请支持确认全部十个 CVE 均已覆盖，不能只到认证绕过的 1.12 边界。
- title: 限制用户面板与内部 API 访问
  hint: 作为预防措施，仅通过受信任管理路径访问面板。检查回环 API 是否因公网监听、代理或转发而暴露。本机调用者或服务端请求路径仍可能访问回环服务；只过滤公网面板不能修复 API 漏洞。
- title: 保留并复查面板活动
  hint: 作为预防措施，保留面板及 Web 访问日志，将涉及 module、phpini_editor、protected_directory 和下文 API 路由的请求与获批活动对照。检查异常文件、账户、配置或数据库修改。路由名只是漏洞入口，不是被利用的证据；报告给出利用示例，但没有确认恶意活动的攻击 IoC 集合。
- title: 上报无法解释的特权修改
  hint: 发现未经批准的命令或 root 修改时，保存证据并联系托管商或事件响应人员。打补丁无法撤销已有入侵。披露材料未提供取证清理流程。
- title: 核验更新后的 API 和邮件行为
  hint: 1.30.1 加固 API 密钥与一次性登录链接。检查 /usr/local/cwp/.conf/api_strict_guard_off 是否关闭严格 API 守卫，核验集成仍须授权；不要为恢复功能而关闭保护。若邮件信任网络由旧默认值改为 127.0.0.0/8，其他私网机器须配置 SMTP 认证。升级后测试合法集成及发信。
sources:
- name: Control Web Panel 更新日志
  says: 厂商发布日期、当前更新流程及安全改动；未逐个对应 CVE 补丁。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: CNA 11月2日披露；受影响范围、利用前提及 CVSS 4.0 评分。
- says: 11 月 2 日发布；独立的 valid_token 命令注入、回环访问前提及 1.30 之前的受影响边界。
- name: VulnCheck CWP2Shell 完整研究
  says: 11 月 3 日技术报告、十个 CVE、公开 PoC 与分阶段修复分析；核验了 1.30 代码，1.27/1.29 拆分来自厂商日志。
---

这批问题影响托管控制面板，且已有公开 PoC 和实验室攻击链，因此维持 L3；这不等于确认在野利用。分数仍为 CNA 的 CVSS 4.0 评分。11 月 3 日完整报告补齐了本文早先遗漏的 CVE-2026-104080，整批实际为十项；公开披露日仍沿用 11 月 2 日的 CVE 记录。

**攻击前提：** VulnCheck 在 CWP7 webpanel 1.8、AlmaLinux 9 实验环境复现未认证到 root，尽管该版本已修补旧 CVE-2025-48703。公网端口 2083 的用户面板在重定向后继续执行，已知有效托管账户名可定位模块；文件写入、包含和命令路径可组合为账户权限执行，再调用 127.0.0.1:2302 的 root API。API 仍须可达，不能把单个本地向量称为任意公网 root RCE。1.12 关闭未认证入口，但之后的受影响版本仍可能让本机托管账户提权。本文早先的谨慎判断来自单项记录；完整报告现在提供了具体构建上的攻击链证据，并非证明所有配置均可利用。

**分阶段修复及差异：** CNA 将重定向边界列为 1.12；文件包含、phpini_editor、protected_directory、access_token() 和 /newpass/ 为 1.16；API 缺少认证、数据库恢复、盲 SQL 注入及 valid_token 命令注入为 1.30。研究将最终四项修复归于 1.27/1.29，称最低应到 1.29；它实际解码核验的是 1.30，两个前序版本的拆分来自更新日志，并非逐版独立验证。厂商当前建议所有服务器安装 1.30.1 LTS。保留这一更高推荐，不把有差异的 1.29 当成已由所有来源确认的最低修复版本。两段式 webpanel 版本沿用来源，不提供版本检测器。

回环 API 缺少令牌验证的相关路径包括 /v1/restoredatabase/、/generaluser/、/last_access/、/valid_user/、/valid_token/ 和 /user_panel_dashboard/；这些是排查入口，不是已确认攻击的证据。研究给出实验利用示例；不要把实验文件名当成全部恶意活动指标。

**当前更新与回归检查：** 1.30.1 LTS 进一步要求端口 2304 的每次 API v1 调用使用密钥，内部迁移路由仅接受本机调用，并加固账户操作、一次性登录链接及 HTTPS 更新下载。确认 /usr/local/cwp/.conf/api_strict_guard_off 未使严格守卫失效。升级后测试集成和邮件：仍使用旧默认值的服务器，可信邮件网络收窄至 127.0.0.0/8；其他私网机器上的应用须通过 SMTP 认证发信。只在页面页脚显示的 1.30.2 没有对应完整发布说明，本次不据此替换明确推荐的 LTS。
