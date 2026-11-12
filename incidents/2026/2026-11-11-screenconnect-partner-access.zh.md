---
title: ScreenConnect 合作伙伴环境遭攻击，厂商停用五款扩展
summary: ConnectWise 正调查合作伙伴账户未经授权访问及非授权远程访问软件部署。厂商预防性停用了约 400 个环境中的五款第三方扩展，并公布排查指标。初始访问方式和影响范围仍在调查。
splash: 装有公告所列五款第三方扩展的 ScreenConnect 合作伙伴，包括本地部署。技术人员工作站也可能需要调查。
wipe: 停用五款扩展，使用独立工具调查，并从可信设备吊销会话。
inTheWildNote: ConnectWise 报告合作伙伴遭未经授权访问，并出现异常远程访问软件部署。
timeline:
- date: 11月11日 22:45 UTC
  title: ConnectWise 发布预防性指引
  body: 厂商列出五款扩展及托管和本地部署合作伙伴的处置步骤。
- date: 11月12日 02:45 UTC
  title: ConnectWise 公布首批排查指标
  body: 厂商说明这组扩展提供受口令保护的远程命令 API，并公布网络、文件、持久化及 ScreenConnect 指标。
checklist:
- title: 核验并停用五款扩展
  hint: 核查 Labtech Plus、RMM Plus、RMM+、RMM Plus Password Link 和 RMM+ Password Link。保留安装及活动记录。本地部署合作伙伴须自行停用，后续指引发布前保持停用。
- title: 使用独立工具并保护管理访问
  hint: 避免对疑似失陷设备开启 ScreenConnect 交互会话。用独立应急工具排查，从可信设备吊销活动的 ScreenConnect 和身份提供商会话、重置相关密码并强制启用 MFA。
- title: 保留证据并遏制受影响设备
  hint: 保留认证、扩展安装、管理、Run Command 和 Toolbox 日志。排查异常用户、权限变更、部署和命令。隔离可疑终端及技术人员工作站，在移除软件前保留证据，确认处置完成后再恢复连接。
- title: 核验远程访问组件维护状态
  hint: 按厂商当前指引核查服务器、技术人员客户端和终端 Agent。更新软件后仍需独立排查及处置疑似失陷。
- title: 按厂商指标排查
  hint: 结合网络、进程、计划任务、注册表 Run 键及 ScreenConnect 日志核对正文中的 25 项指标。重点检查 TrapWatch 是否以 SYSTEM 运行、客户端指纹和 API 配置。文件名、账户名或正常工具单独命中无法证明失陷。
sources:
- name: ConnectWise 11 月 11 日 ScreenConnect 公告
  says: 列出五款停用扩展、装有至少一款的约 400 个环境、疑似攻击行为及合作伙伴处置步骤。
- name: ConnectWise 11 月 12 日调查更新
  says: 02:45 UTC 更新说明远程命令 API、证据边界、合作伙伴处置及排查指标。
---

ConnectWise 称这些扩展可能与攻击有关。约 400 个环境装有至少一款扩展。厂商尚未确定实际失陷环境数量、初始入口或 CVE。公司正在调查攻击者是否利用扩展部署额外远程访问，以及交互连接是否使技术人员工作站暴露。停用扩展属于遏制措施，仍需排查持久化。本事件与 [Cloud Backup 事件](/zh/incidents/connectwise-cloud-backup/)不同。

**11 月 12 日更新。** RMM+ 系列扩展提供远程命令 API，由合作伙伴在安装时设定口令保护。ConnectWise 要求合作伙伴核查 API 访问及配置、使用唯一密码并移除不必要的管理权限。报告尚未确定该 API 或口令是否被用于初始访问。厂商缺少合作伙伴环境遭访问后的活动遥测。合作伙伴应检查自己的日志和终端，包括曾发起交互会话的技术人员工作站。

厂商公布的排查指标。Panel-Lateral.ps1 文件名仍待核实。sqlite3.exe 是合法工具，厂商收到其被滥用的报告。

```text
185.99.255[.]28 (screen)
155.94.150[.]39 (WIN-FB5CKHMU4E1)
ns[.]mo7sen[.]dev
hxxps://ns[.]mo7sen[.]dev/EadF.php?p=4
sc[.]payproofkit[.]com
cdn007-digitaldownloads[.]com
newnewnew[.]gotdns[.]org
soxnewwork[.]homedns[.]org
sckit-run.bat
sckit-decoder.ps1
TrapWatch.ps1
Panel-Lateral.ps1
Run-Lateral-Full.bat
runnew.cmd
ToolboxRelayUploader.exe
sqlite3.exe
C:\ProgramData\RelayTrap\
C:\ProgramData\RelayTrap\TrapWatch.ps1
%TEMP%\sckit-*
TrapWatch
RelayTrapLiteAlert
2588ef5c15954b10
ed630cc2c873b091
Addmin
rmmserver
```
