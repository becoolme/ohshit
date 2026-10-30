---
title: 假 Solana 入门仓库借 README 安装指令投递 NetSupport 后门
summary: Air Security 分析了一个假 GitHub 入门仓库：README 指令会下载 PowerShell 载荷，在 Windows 安装远程访问工具。仓库创建于 2025 年；10 月 29 日的披露强调编程代理搜索带来的风险。尚无已确认受害者数量。
splash: 在 Windows 执行过 SolanaUpdateTools/solana-starter-kit 安装指令的开发者或编程代理
wipe: 隔离暴露主机并保存持久化证据；完整性存疑时重建，从干净设备更换可触及的凭据
inTheWildNote: 研究人员恢复并分析了载荷；没有量化已确认的真实感染。
cves: []
fixed: []
timeline:
  - date: 2026年10月29日
    title: Air Security 发布恢复的 PowerShell 载荷分析
  - date: 约2025年11月
    title: 恶意入门仓库创建
checklist:
  - title: 确认安装指令是否执行
    hint: 检查代理执行记录、Shell 历史及进程遥测，查找 SolanaUpdateTools/solana-starter-kit 和 developer-update[.]app/update/indicator。投递指令使用 Windows PowerShell；只看过 README 或访问 GitHub 不代表感染。不要重新运行指令来测试。
  - title: 隔离并排查后门
    hint: 查找 maxwintodaybtc[.]com:443、%LOCALAPPDATA%/y2inwRnI6G/client32.exe、client32.ini、indicator.ps1，以及 HKCU\Software\Microsoft\Windows\CurrentVersion\Run 下的 SecureModule。分析的投递器 SHA-256 为 41902d18fa2c285c0f4a6b39cf0f2eefbc7acbff33b6eb6fc88ba680a201d17d。清理前保存日志、文件及配置，并断开受影响主机网络。单独命中不能证明失陷，尤其 NetSupport 二进制本身可能是合法软件。
  - title: 恢复凭据并收紧代理执行权限
    hint: 从干净设备吊销或轮换主机可触及的凭据和令牌；若钱包密钥暴露，将资产转入新生成的钱包。由事件响应人员协助清除非法 Run 注册表持久化和远控文件；无法确认完整性时重建。代理执行下载脚本前必须审查，并验证仓库来源，不以搜索排名或星标数判断可信度。
sources:
  - says: 分析归档载荷、仅限 Windows 的执行链、持久化和 C2；检查时投递 URL 已离线。
  - says: 独立恢复了归档载荷，并确认其远程访问行为。
---

这是恶意仓库，不代表合法 Solana 项目或 GitHub 平台被攻破。README 宣称提供应用代码，实际却没有这些代码，而是给出混淆的下载并执行指令。Air 恢复的载荷使用正版 NetSupport Manager 组件，配上攻击者控制的配置及登录持久化。

研究人员展示了代理从搜索结果选择仓库、继而执行其中指令的可行路径，但这不证明所有编程代理都会照做，也无法据此统计受害者。L3 基于公开记录的投递链及其对开发工作流的影响。原始载荷 URL 返回 404，不能证明此前暴露的主机已经干净。
