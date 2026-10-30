---
title: Cursor 下架带 SSH 持久化的恶意 Claude Code 扩展 2.1.313
tags: [Cursor, Claude Code, 供应链]
summary: Cursor 确认其市场分发了遭修改的 Anthropic.claude-code 2.1.313，潜在影响上限为 5,000 名用户。该包收集主机信息并安装 SSH 持久化。管理员权限限制通常阻止远程登录，但受影响设备仍需清理。Cursor 称攻击服务器已下线。
splash: 从 Cursor 扩展市场安装遭修改的 2.1.313 包的 macOS 和 Windows 用户
wipe: 隔离受影响主机，移除扩展及持久化，评估重建，再从可信设备轮换暴露凭据
inTheWildNote: Cursor 确认恶意分发，不代表每台主机均成功遭远程访问。
cves: []
fixed: []
timeline:
  - date: 2026年10月29日
    title: 恶意包分发后被下架
    body: Cursor 公布的暴露窗口为约 2:27am–1:35pm PT，安全通知日期为 10 月 29 日。
checklist:
  - title: 检查安装包并跨端点排查
    hint: 检查扩展安装记录中的 Anthropic.claude-code 2.1.313。Cursor 在五个章节发布了超过 20 项指标，应对照完整包哈希、SSH 密钥、文件持久化及进程表。网络项包括 134[.]209[.]82[.]225、tunnel@134[.]209[.]82[.]225:22、hxxp://134[.]209[.]82[.]225:8099/beacon 及回环 127[.]0[.]0[.]1:8099/beacon。ifconfig[.]me 和 api[.]ipify[.]org 是合法查询服务。仅匹配不能证明失陷，仅未发现密钥也不能排除代码执行。
  - title: 清除持久化并轮换凭据
    hint: 保留证据，隔离存在执行迹象的主机。审阅 Cursor 链接的脚本后，以受影响用户运行 remediate-macos.sh，或在管理员 PowerShell 中运行 remediate-windows.ps1。验证清理成功，重新使用前评估重建。从可信设备轮换可访问的凭据及会话。仅卸载扩展不能移除独立持久化。
sources:
  - name: Cursor 安全通知及完整 IoC 表
    says: 确认 Cursor 市场中的恶意包、受影响用户上限及响应，不代表 Anthropic 官方分发渠道已失陷。
---

遭修改的包并非由 Anthropic 开发。Cursor 通知列出 macOS arm64 和 Windows x64 包。启用 SSH 服务通常需要管理员权限，因此远程登录往往失败；SSH 密钥、持久化及主机数据上报仍需调查。范围为已识别的分发包，并非所有 Claude Code 安装。L4 反映已确认的开发工具供应链失陷。
