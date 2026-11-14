---
title: Fireworks 密钥泄露后，Cursor 数据遭窃并出现恶意 Claude Code 扩展
tags: [Cursor, Claude Code, 供应链]
summary: Cursor 称，攻击者使用在 Fireworks 泄露的密钥复制历史编程代理记录，随后进入内部工具，通过 Cursor 扩展缓存发布遭篡改的 Claude Code 2.1.312 和 2.1.313。Cursor 已通知受影响客户，并称事件已得到遏制。
splash: 接获通知的 Cursor 用户及团队，以及从 Cursor 安装遭篡改的 2.1.312 或 2.1.313 的 macOS 或 Windows 用户。
wipe: 隔离受影响主机，清除持久化并评估是否重建。从可信设备轮换主机可访问的凭据和通知所列密钥。
inTheWildNote: Cursor 确认恶意分发，不代表每台主机均成功遭远程访问。
cves: []
fixed: []
timeline:
  - date: 2026年10月29日
    title: 恶意包分发后被下架
    body: Cursor 公布的暴露窗口为约 2:27am–1:35pm PT，安全通知日期为 10 月 29 日。
  - date: 10月30日 11:30am PT
    title: Cursor 扩大受影响版本并更新 IoC
  - date: 2026年11月1日
    title: Cursor 封锁最后一次发现的攻击活动
  - date: 2026年11月13日
    title: Cursor 公布调查结果并通报遏制情况
    body: 调查将 Fireworks 密钥和历史记录暴露与后续入侵联系起来，涉及扩展缓存。
checklist:
  - title: 检查安装包并跨端点排查
    hint: 检查扩展安装记录中的 Cursor 来源 Anthropic.claude-code 2.1.312 和 2.1.313。Cursor 在七个章节发布了超过 20 项指标，应对照完整包哈希、SSH 密钥、文件持久化及进程表。网络项包括 134[.]209[.]82[.]225、tunnel@134[.]209[.]82[.]225:22、hxxp://134[.]209[.]82[.]225:8099/beacon 及回环 127[.]0[.]0[.]1:8099/beacon。ifconfig[.]me 和 api[.]ipify[.]org 是合法查询服务。仅匹配不能证明失陷，仅未发现密钥也不能排除代码执行。
  - title: 清除持久化并轮换凭据
    hint: 保留证据，隔离存在执行迹象的主机。审阅 Cursor 链接的脚本后，以受影响用户运行 remediate-macos.sh，或在管理员 PowerShell 中运行 remediate-windows.ps1。验证清理成功，重新使用前评估重建。从可信设备轮换可访问的凭据及会话。仅卸载扩展不能移除独立持久化。
  - title: 轮换通知列出的凭据
    hint: 查看 Cursor 应用内通知，或通过已知的 Cursor 渠道核实邮件。团队管理员应按受影响密钥清单在各签发方吊销并替换密钥，检查从暴露到吊销期间的使用日志。疑似滥用请报告 security@cursor.com。
sources:
  - name: Cursor 安全通知及完整 IoC 表
    says: 10 月 30 日更新确认两个受影响版本并修订哈希；不代表 Anthropic 官方分发渠道已失陷。
  - name: Anthropic 的 Felix Rieseberg 澄清事件范围
  - name: Anthropic 的 David Dworken 澄清发布渠道
  - name: Cursor 11 月 13 日调查报告
    says: 说明 Fireworks 密钥、数据暴露、缓存植入、客户通知及遏制情况。
---

Cursor 称已让攻击者的服务器下线。遭修改的包并非由 Anthropic 开发。Cursor 通知列出 macOS arm64 和 Windows x64 包。启用 SSH 服务通常需要管理员权限，因此远程登录往往失败；SSH 密钥、持久化及主机数据上报仍需调查。范围为已识别的分发包，并非所有 Claude Code 安装。L4 反映已确认的开发工具供应链失陷。

Anthropic 的 Felix Rieseberg 表示，该事件未使其系统或员工笔记本失陷。David Dworken 称，2.1.313 从未通过 Open VSX、Microsoft VS Code Marketplace 或 Anthropic 官方主机发布；Anthropic 跳至 2.1.314，以区分下一次正式发布。这些声明缩小了分发范围，但不免除恶意 Cursor 包受影响设备的清理要求。

**范围修正：** Cursor 在 10 月 30 日更新中，将此前仅涉及 2.1.313 的通知扩大至其市场中的恶意 2.1.312 包。应对照修订后的厂商哈希表重新检查两个版本；仅凭版本号不能把官方渠道的 2.1.312 包认定为恶意。10 月 30 日修订未提及此前 5,000 名用户的上限；11 月 13 日的调查报告再次给出这个上限。

### 11 月 13 日调查结果

Cursor 称，它签发给 [Fireworks](/zh/incidents/fireworks-cloud-customer-data/) 的一个访问密钥在 Fireworks 暴露。攻击者用该密钥从只读存储桶复制数据。桶内存有未使用隐私模式的历史编程代理记录，大部分来自 2025 年。Cursor 称，记录暴露波及不到 **0.05% 的用户**，API 凭据暴露则波及不到 **0.01% 的客户**，两项统计的分母不同。

记录里未脱敏的凭据让攻击者进入了部分 Cursor SaaS 工具。Cursor 报告称，攻击者访问了归档的非生产源码仓库、部分客服和邮件记录、联系与使用数据、对话摘要及用户发给客服的凭据。攻击者随后利用从 Cursor 内部资料取得的凭据，直接把遭篡改的包放入扩展市场缓存。11 月 13 日报告再次给出 **5,000 名用户**的上限，指约 **11 小时**内可能收到恶意构建的用户，并非安装数量或主机失陷数量。

Cursor 称，隐私模式下的提示和代码、实时流量、客户代码仓库、应用及官方更新、发布签名密钥均未受影响。Cursor 已吊销 Fireworks 密钥，切断其数据访问，将推理流量迁出 Fireworks，并重建扩展市场。Cursor 表示已通知受影响客户，并要求第三方签发商吊销暴露的密钥；请向各签发方确认吊销已经完成。
