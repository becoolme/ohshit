---
title: Drupal 安装器后续漏洞已遭利用，升级后还须运行数据库更新
tags:
- Drupal
- 访问绕过
- 已利用
summary: Drupal 警告，CVE-2026-136716 可让攻击者接管处于异常或未完成安装状态的站点，即使已安装早期修复。实际利用已确认。需升级核心、运行必需更新钩子、封锁安装器，并调查用户 1 的改动。
splash: 安装器可远程访问且处于受影响安装状态的 Drupal 站点，包括生产站；界面无法显示该状态。
wipe: 升级至 11.4.14、11.3.23 或 10.6.23，运行 update.php，保护 install.php，并调查潜在接管。
inTheWildNote: Drupal 确认实际利用；CISA 于 11 月 27 日将 CVE-2026-136716 加入 KEV。
cves:
- name: 安装状态访问绕过
  description: 早期安装器修复后，异常或未完成安装状态仍可能允许站点被接管。
fixed:
- status: 更新核心后运行 update.php
- status: 更新核心后运行 update.php
- status: 更新核心后运行 update.php
- product: Drupal 11.2.x 及更早 11.x、10.5.x 及更早 10.x、Drupal 8/9
  status: 已结束支持；迁移至受支持版本
timeline:
- date: 2026年11月25日
  title: Drupal 发布 SA-CORE-2026-019
  body: 后续公告确认 SA-CORE-2026-017 后仍有可接管状态及实际利用，并要求对受影响既有生产站点运行更新钩子。
- date: 2026年11月26日
  title: Drupal 发布详细安装器入侵核查
  body: 指南区分代码即时防护与必需数据库状态修复，要求更新前核查证据，并解释仅打补丁不能移除持久化。
- date: 2026年11月27日
  title: CISA 将漏洞加入 KEV
  body: 条目为适用的联邦处置设定 11 月 30 日期限，并要求取证分流；这不是所有站点通用的三天期限。
- date: 2026年11月27日
  title: 安装器加固指南更新
  body: 指南说明持久化 Web 服务器规则、Composer 保留及含 PATH_INFO 的安装器路径测试；update.php 必须仍可使用。
checklist:
- title: 封锁安装器的远程访问
  hint: 完成安装后，按 Drupal 安装器指南保护 /core/install.php，并适配子目录和所有提供服务的虚拟主机。不能让未完成安装暴露于互联网。Nginx 使用前缀 location（^~），因为精确匹配可能漏过 /core/install.php/foo。Apache Location 规则应放服务器配置，不能放 .htaccess。重新加载前验证配置。仅在确有需要时保留授权安装访问；Drush site:install 不使用 install.php。
- title: 调查历史访问及用户 1 改动
  hint: 在数据库更新改变证据前，复制日志／文件／数据库，并对 multisite 每个站点执行链接中的完整安装器核查。自 11 月 18 日起搜索，考虑时区偏差（指南以 11 月 17 日留余量）：/var/log/nginx/access.log、/var/log/apache2/access.log、/var/log/httpd/access_log、CDN／托管日志及安装器 GET／POST 请求。200 本身不是入侵证明；调查 POST 302/303、op= 或 id=、异常大响应、密集请求及 Choose language／Installing Drupal 页面。检查用户 1 邮箱／密码／changed 日期与会话、/admin/people 的陌生管理员、站点名称／邮箱／时区和更新通知地址；可用 drush user:information --uid=1。将 install_task、install_time、install_session_token 与部署记录及 11 月 18 日前备份比较。done 或空会话令牌不能排除已完成攻击；更新本身会设为 done，并可能填写原为空的 install_time。检查 settings.php／settings.local.php、重复 hash_salt、异常数据库目标、/sites/*/files/*.php 及改动的 .htaccess。区分 files/php/twig/ 和其他上传目录，保全后调查缓存重建后仍存的异常 PHP。检查陌生模块、crontab、~/.ssh/authorized_keys 和进程。须关联判断；未公布攻击者 IP／哈希清单或受害者总数。
- title: 升级核心并运行必需的数据库钩子
  hint: 按分支安装 11.4.14、11.3.23 或 10.6.23，再运行 update.php（或文档中的数据库更新路径 drush updatedb）。代码修复会立即阻止该攻击；数据库更新用于修复记录的安装状态，仍为必需步骤。通过正常更新运行 system_post_update_mark_installation_finished 并记录时间。不能将状态修复当作已清除既有入侵。封锁 install.php 时保持 update.php 可用。不受支持的 11.2.x／更早 11.x、10.5.x／更早 10.x 及 Drupal8/9 需迁移，不能停在早期公告的修复阈值。
- title: 让封锁跨部署保留并验证效果
  hint: 优先使用持久化服务器配置。若用 .htaccess，应通过 Composer scaffold 配置保留追加内容；手动编辑可能在 composer install 时被替换。若删除 core/install.php，应在核心安装／更新后自动再次移除，并考虑 --no-scripts 部署。指南建议同时删除及封锁以形成多层防护。测试 /core/install.php、/install.php 最终重定向和 /core/install.php/foo，均应为 403/404，再验证站点正常运行及数据库更新。Steward 的推荐缓解可防已知路径，但 Drupal 仍建议升级。
- title: 恢复失陷站点，不能止于打补丁
  hint: 保持站点离线或安装器被封锁，并保全证据。从可信仓库或 Composer 来源重建代码；恢复早于首个可疑请求的数据库，若无足够旧备份，则审查改动的用户、角色、配置与内容。更换数据库凭据、hash_salt、API 密钥及全部管理员密码，按文档步骤使所有会话失效。仅升级和重置用户 1 仍会留下后门及账户。完成核心／数据库更新，按指南更新 Twig／Symfony／Composer，并持续封锁安装器。使用现代受支持工具，不能照抄旧通用指南中的 Drupal7 SQL。
sources:
- says: 11 月 25 日后续公告：受影响状态、实际利用、修复版本、必需更新钩子、用户 1 核查及 Steward 限定。
- name: Drupal 安装器加固指南
  says: 11 月 27 日更新，说明 Web 服务器与 scaffold 持久化、PATH_INFO 注意事项、安装器移除及明确验证路径。
- name: CISA KEV 目录
  says: CVE-2026-136716 于 11 月 27 日加入，期限 11 月 30 日，forensicTriage 为 Yes；确认联邦处置条目。
- name: Drupal 事件响应指南
  says: 证据保全、可信重建选择、代码／账户／会话核查；属于旧指南，不能将其 SQL 当作当前 Drupal 的版本专用处方。
- name: Drupal 安装器专用入侵核查
  says: 11 月 26 日更新：日志／状态／账户／文件核查、更新改变证据、multisite 范围、可信恢复及密钥／会话失效；代码修复先于数据库状态修复关闭攻击。
---

SA-CORE-2026-019 是 SA-CORE-2026-017 之后发布的新安装器访问绕过公告。Drupal 表示，部分异常或未完成安装状态仍可导致接管，包括生产站点，并确认实际利用。保护安装器可消除所述暴露。界面看似正常或攻击后已不处于受影响状态，都不能证明此前安全。Drupal 未在此公布受害者总数。

受影响范围为早于 10.6.23、11.0.0 至早于 11.3.23，以及 11.4.0 至早于 11.4.14。旧分支已不受支持。代码修复会立即关闭该攻击路径。仍必须执行数据库更新，以修复记录的生产安装状态；钩子为 system_post_update_mark_installation_finished。运行前保全并比较状态证据，并记录更新时间。不能用早期公告的 10.6.22／11.3.22／11.4.13 替代，也不能认为限制 settings.php 可写即可覆盖全部路径。CISA 11 月 27 日收录进一步说明紧迫性；联邦期限及取证分流要求不证明某个具体站点已遭入侵。

对既有及新安装均应保护安装器，并调查此前暴露。今天封锁安装器不能移除先前接管留下的持久化。官方事件指南包含旧版示例，应使用受支持管理工具，不要将其中的 Drupal7 SQL 复制到当前数据库。
