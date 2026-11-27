---
title: Cacti 访客访问可被串联为命令执行，官方补丁尚未确认
summary: 公开的四请求利用链可将 Cacti 1.2.31 的匿名访客访问转为命令执行。Previdian 报告蜜罐遭到 SQL 注入尝试，但未确认成功 RCE。在官方修复尚未确认期间，应禁用访客访问并限制界面访问范围。
splash: 启用访客访问且 Web 界面可达的 Cacti 1.2.31；其他版本尚未核实。
wipe: 禁用匿名访客访问，将界面限制在可信管理网络内，并关注官方安全版本。
inTheWildNote: 已观察到针对蜜罐的 SQL 注入尝试；成功远程命令执行尚未确认。
fixed:
  - status: 已确认受影响；截至 11 月 27 日尚未找到官方修复
timeline:
  - date: 2026年11月26日
    title: 研究人员公开 4HTTP2SHELL
    body: ek0ms savi0r 在隔离主机上针对 Cacti 1.2.31 演示从访客到命令执行的利用链。
  - date: 2026年11月27日
    title: Previdian 报告利用尝试
    body: 其应用蜜罐收到基于时间的 SQL 注入探测。研究方未确认成功命令执行或生产环境遭入侵。
checklist:
  - title: 同时禁用匿名映射和访客账户
    hint: 在 Cacti Authentication Settings 中取消指定 Guest User。在 Console > Configuration > Users 选择该账户，选择 Disable、点击 Go 并以 Continue 确认。通过全新的未登录浏览器会话测试受保护功能；已有会话不足以验证。访客访问默认关闭。
  - title: 限制访问并降低进程权限
    hint: 仅允许可信管理网络或经认证的 VPN 用户访问 Web 界面。检查 Web 层和 poller 的服务身份，避免不必要的 root 权限。利用继承这些身份，本身不保证取得 root。这些控制用于降低暴露，不能修复 SQL 注入。
  - title: 保留并检查设置、poller 数据和日志
    hint: 修改可疑数据前保留 Web／PHP 日志和数据库快照。检查 settings_user.preview_graphs_per_page 的值是否包含 SQL 而非分页数量，以及 poller_item.arg1 是否出现异常命令。关联检查 auth_profile.php?action=update_data、graph_view.php?action=preview 和 graph_realtime.php?action=init 请求、非数值 PHP 警告及异常 poller 子进程。单独匹配不能证明入侵。
  - title: 区分实验室痕迹和攻击者指标
    hint: 原始演示在测试客户端使用 /tmp/cacti.jar 和 /tmp/cacti_guest.html，并以 /srv/cacti-lpe/pwn.txt 作为服务端标记；这些是实验室路径，并非已确认攻击活动的指标。Previdian 公开页面将攻击者 IP、User-Agent 和载荷详情保留在 Enterprise 服务内。这些来源没有提供公开的攻击者专用指标清单；未匹配不能证明安全。
  - title: 怀疑入侵时轮换暴露的监控凭据
    hint: 隔离可疑主机并保留证据。评估 include/config.php 中的 Cacti 数据库凭据、存储的设备／SNMP 凭据、poller 的 SSH 密钥或服务账户，以及邮件中继密钥。在签发服务替换受影响凭据并更新依赖的监控配置，调查对被监控设备的后续访问。禁用访客不能撤销此前的命令执行。
  - title: 关注官方版本和安全公告
    hint: 检查 Cacti/cacti releases 和 security advisories，确认补丁明确覆盖本次访客设置利用链。本次检查中 1.2.31 仍是最新公开稳定版且存在漏洞，不能将升级到该版本视为修复。完整受影响范围、CVE 和官方 CVSS 分数仍未确认。
sources:
  - name: ek0ms savi0r — Four Requests to Root
    says: 通过公开 raw README 阅读 11 月 26 日原始报告，说明测试版本、访客前提、利用链、实验室痕迹及随部署而变的权限。
  - name: Previdian — Cacti 零日漏洞研究
    says: 报告独立实验验证及 11 月 27 日基于时间的 SQL 注入尝试，明确未确认成功 RCE，并提供遏制及凭据评估步骤。
  - name: Cacti 用户管理文档
    says: 匿名访问要求指定且启用的访客账户，默认关闭，可通过用户管理和 Authentication Settings 禁用。
  - name: Cacti 官方版本
    says: 11 月 27 日检查时最新稳定版为 1.2.31，未找到更晚的修复版本。
  - name: Cacti 官方安全公告
    says: 本次检查未找到明确修复这条新披露利用链的公开公告。
  - name: Previdian 实时漏洞记录
    says: 区分传感器观测到的尝试与成功利用。实时计数超过最初博客数字，攻击者指标详情未公开。VULN-2026-0010 是其自有编号，并非 CVE。
---

Cacti 启用的访客账户允许匿名访问者持久化一项图表分页数量设置。后续查询信任该存储值，造成 SQL 注入并可修改轮询配置。实时图表路径随后执行被修改的命令。研究人员将这条链称为 4HTTP2SHELL，其他披露也称其为 4HTTP2ROOT。

演示针对启用访客的 Cacti Core 1.2.31。实验室刻意以 root 运行 Web 层及 poller，因此输出显示 root。典型部署以应用账户执行。存储的监控凭据及可达管理网络可能随之暴露；这是潜在后果，并非凭据被盗或组织受害的证据。

Previdian 的 11 月 27 日更新报告其蜜罐遭到基于时间的 SQL 注入尝试。实时记录明确说明，观测不能证明目标存在漏洞或执行成功。尚无经过核实的生产环境受害者数量。由于主流监控组件已有公开利用代码，本事件评为 L3，不将探测视为已确认的生产环境 RCE。

截至 11 月 27 日检查时，尚未找到官方修复版本或完整受影响版本范围。禁用访客可消除这条免登录利用链的一个前提，但底层漏洞仍在。应继续限制网络访问，待厂商发布补丁后遵循其指引。
