---
title: Control Web Panel 披露九项漏洞，涉及用户面板与 root API 边界
summary: CWP 九项披露涵盖认证绕过、文件包含与写入、命令注入及 SQL 注入。多项 API 漏洞需要访问本机回环服务。应升级至厂商当前版本并核验所有适用修复；只到 1.12 不能覆盖整批问题。
splash: 旧版 CWP 用户面板；多项 root API 漏洞还需要访问本机回环 API
wipe: 通过受支持渠道升级 CWP，核验九项修复，并限制用户面板与 API 的可达范围
inTheWildNote: 披露材料尚未证实在野利用。
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
fixed:
- product: Control Web Panel 厂商当前版本
  status: 厂商 11月3日发布 1.30.1 LTS 安全更新；CNA 受影响边界分别为 1.12、1.16 或 1.30。逐项核验适用修复
timeline:
- date: 2026年9月8日
  title: 厂商发布 CWP 1.12
  body: 更新日志称改进安全性，但未对应到这些 CVE。
- date: 2026年10月31日
  title: 厂商发布 CWP 1.30
  body: 当前更新日志包括进一步加固用户面板及内部 API。
- date: 2026年11月2日
  title: VulnCheck 发布九项相关 CVE 记录
  body: 这是详细公开披露日，与先前版本发布日期不同。
- date: 2026年11月3日
  title: 厂商发布并建议所有服务器更新至 1.30.1 LTS
  body: 进一步加固 API 密钥验证、内部调用、一次性登录链接及更新下载；默认邮件信任网络也收窄。
checklist:
- title: 升级实际运行的 CWP
  hint: 在 Settings > CWP Settings > CWP updates 中使用受支持更新渠道。厂商 Update 页面显示已装与最新版本及更新日志。选择厂商现已发布的 1.30.1 LTS 或适用更新版本；完成后重新核验版本和更新结果，请支持确认全部九个 CVE 均已覆盖，不能只到认证绕过的 1.12 边界。
- title: 限制用户面板与内部 API 访问
  hint: 作为预防措施，仅通过受信任管理路径访问面板。检查回环 API 是否因公网监听、代理或转发而暴露。本机调用者或服务端请求路径仍可能访问回环服务；只过滤公网面板不能修复 API 漏洞。
- title: 保留并复查面板活动
  hint: 作为预防措施，保留面板及 Web 访问日志，将涉及 module、phpini_editor、protected_directory 和下文 API 路由的请求与获批活动对照。检查异常文件、账户、配置或数据库修改。路由名只是漏洞入口，不是被利用的证据；公告未发布攻击 IoC。
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
---

这批问题影响托管控制面板，即使尚无确认攻击，也达到 L3。上方分数均为 VulnCheck 的 CVSS 4.0 评分。记录未证实部署数量或成功攻击。

用户面板认证漏洞与文件、命令执行漏洞相互独立。CVE-2026-73695 和 CVE-2026-73697 的评分要求低权限。记录未证明所有安装都能组成完整的未认证到 root 攻击链，不能仅从评分推断这条攻击链成立。

其余 API 问题还涉及另一条边界：CVE-2026-77877 至 CVE-2026-77881 针对回环服务。即使描述称最终可远程执行，其评分向量也是本地，攻击者必须能访问该服务。缺少令牌验证的路由包括 /v1/restoredatabase/、/generaluser/、/last_access/、/valid_user/、/valid_token/ 和 /user_panel_dashboard/。这些不是已发布的攻击指标。

CNA 给出的受影响边界不同：重定向漏洞为 1.12；文件包含、phpini_editor、protected_directory、access_token() 和 /newpass/ 为 1.16；API 缺少认证、数据库恢复及盲 SQL 注入为 1.30。厂商更新日志列出 1.30 于 10月31日发布，但未将每个 CVE 对应到修复，也未提供 1.16 条目。应使用厂商当前受支持更新并确认覆盖，不能认为到 1.12 就够了。两段式版本号沿用厂商及 CNA 标注，此处不提供版本检测器。


**11月3日更新：** 重新审阅时，厂商更新日志新增 1.30.1 LTS 安全与稳定性版本，建议所有服务器更新。它进一步要求端口 2304 的每次 API v1 调用使用密钥，内部迁移路由仅接受本机调用，并加固账户操作、一次性登录链接及 HTTPS 更新下载。仍须确认原有关闭严格守卫的 /usr/local/cwp/.conf/api_strict_guard_off 未使策略失效。版本日志没有逐项映射全部九个 CVE，因此此版本是厂商当前推荐更新，不是本文推定的每项首次修复版本。升级后测试集成和邮件：对仍使用旧默认值的服务器，新默认可信邮件网络收窄至 127.0.0.0/8；其他私网机器上的应用须通过 SMTP 认证发信。
