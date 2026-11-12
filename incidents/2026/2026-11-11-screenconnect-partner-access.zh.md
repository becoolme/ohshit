---
title: ScreenConnect 合作伙伴环境遭攻击，厂商停用五款扩展
summary: ConnectWise 预防性停用了约 400 个合作伙伴环境中的五款第三方扩展。Huntress 在 48 家组织的至少 288 台终端观察到非授权 ScreenConnect 部署。初始访问方式仍在调查。
splash: ScreenConnect 合作伙伴及受管理的 Windows 终端。无论是否安装所列五款扩展，均应核查部署。
wipe: 保持五款扩展停用，将技术人员客户端更新至 26.6.5 或更高版本，并使用独立工具调查。
inTheWildNote: Huntress 在受管理终端观察到非授权运行命令及非授权客户端。
cves:
- name: RMM+ 默认 API 密钥
  description: 第三方扩展保留默认密钥时可能接受未经授权的请求，包括向受管理的 Agent 发送命令。
- name: ScreenConnect 活跃会话中的文件传输
  description: 技术人员连接已感染终端时，攻击工具包会尝试利用这个此前已修复的客户端漏洞。
fixed:
- product: ScreenConnect 技术人员客户端
  status: 阻断观测到的从终端向技术人员工作站传播的手法
- product: DataComm RMM+ 扩展
  status: 保持停用
timeline:
- date: 2026年11月11日
  title: Huntress 在受管理终端观察到恶意命令
  body: 约 17:47 UTC 开始出现可疑活动。Huntress 在 90 分钟内观察到 288 台主机受影响。
- date: 11月11日 22:45 UTC
  title: ConnectWise 发布预防性指引
  body: 厂商列出五款扩展及托管和本地部署合作伙伴的处置步骤。
- date: 2026年11月11日
  title: Sophos 公布独立的部署遥测
  body: Sophos 记录了从三个实例发出的命令、两个非授权目标实例，以及下载安装包和后续脚本的路径。
- date: 11月12日 02:00 UTC
  title: Huntress 发布 SCKit 分析
  body: 其遥测显示 48 家组织出现非授权客户端及控制台批量命令。已核查的主机日志显示控制台接管路径均失败。
- date: 11月12日 02:45 UTC
  title: ConnectWise 公布首批排查指标
  body: 厂商说明这组扩展提供受口令保护的远程命令 API，并公布网络、文件、持久化及 ScreenConnect 指标。
- date: 11月12日 18:45 UTC
  title: ConnectWise 公布扩展 CVE 并确认技术人员客户端的防护措施
  body: 厂商公布 RMM+ 的 CVE-2026-127063，并确认 26.6.5 或更高版本的技术人员客户端可阻断 SCKit 尝试从受感染终端传播。初始入口仍在调查。
checklist:
- title: 核验并停用五款扩展
  hint: 核查 Labtech Plus、RMM Plus、RMM+、RMM Plus Password Link 和 RMM+ Password Link。保留安装及活动记录。本地部署合作伙伴须自行停用，后续指引发布前保持停用。
- title: 使用独立工具并保护管理访问
  hint: 避免通过 ScreenConnect 交互连接疑似失陷主机。改用 EDR 实时响应或其他可信带外工具。调查已连接过的技术人员工作站。从干净设备吊销 ScreenConnect、浏览器及身份提供商会话，轮换受影响凭据，并启用 MFA。
- title: 保留证据并遏制受影响设备
  hint: 保留认证、扩展安装、管理操作、Run Command 及 Toolbox 日志，排查异常账号、权限变更、部署及命令。隔离疑似主机并保全证据。单独核实合法客户端，清除非授权服务、TrapWatch 任务、RelayTrap 目录及 Run 值。重新连接前检查是否再次感染并验证访问。
- title: 核验远程访问组件维护状态
  hint: 托管和本地部署均应逐台核验技术人员工作站的客户端是否达到 26.6.5，必要时按厂商指引重新安装。升级期间，移除会话组角色不需要的 Transfer Files 权限。保持终端 Agent 更新，并单独调查疑似失陷。
- title: 按公开指标排查
  hint: 结合网络、进程、计划任务、注册表 Run 键及 ScreenConnect 日志核对正文中三组公开指标。重点检查 TrapWatch 是否以 SYSTEM 运行。厂商收到其每 10 秒运行一次的报告。另核查客户端指纹和 API 配置。文件名、账户名或正常工具单独命中无法证明失陷。
sources:
- name: ConnectWise 11 月 11 日 ScreenConnect 公告
  says: 列出五款停用扩展、装有至少一款的约 400 个环境、疑似攻击行为及合作伙伴处置步骤。
- name: ConnectWise 11 月 12 日调查更新
  says: 记录 02:45 UTC 公布的指标，以及 18:45 UTC 对扩展范围、技术人员客户端和合作伙伴处置措施的说明。
- name: Huntress 原始 SCKit 分析
  says: 说明观测到的终端、受影响版本、已核查日志中失败的控制台接管、排查指标和清理步骤。
- name: Sophos X-Ops 的独立部署遥测
  says: 记录命令来源和非授权实例 ID，以及 MSI 安装和后续脚本的活动。
- name: ConnectWise RMM+ CVE-2026-127063 披露
  says: 说明默认密钥前提、API 暴露及停用指引。
- name: ConnectWise 9 月 8 日 ScreenConnect 公告
  says: 说明客户端补丁与文件传输权限的临时控制措施。
---

ConnectWise 称这些扩展可能与攻击有关。约 400 个环境装有至少一款扩展。厂商尚未确定实际失陷环境数量和初始入口。公司正在调查攻击者是否利用扩展部署额外远程访问，以及交互连接是否使技术人员工作站暴露。停用扩展属于遏制措施，仍需排查持久化。本事件与 [Cloud Backup 事件](/zh/incidents/connectwise-cloud-backup/)不同。

**11 月 12 日 02:45 UTC。** RMM+ 系列扩展提供远程命令 API，由合作伙伴在安装时设定口令保护。ConnectWise 要求合作伙伴核查 API 访问及配置、使用唯一密码并移除不必要的管理权限。报告尚未确定该 API 或口令是否被用于初始访问。厂商缺少合作伙伴环境遭访问后的活动遥测。合作伙伴应检查自己的日志和终端，包括曾发起交互会话的技术人员工作站。

**11 月 12 日 18:45 UTC。** ConnectWise 披露由第三方独立开发的 RMM+ 扩展存在 CVE-2026-127063。管理员若保留默认 API 密钥，攻击者无需身份验证即可向受管理的 Agent 发送命令。厂商仍在调查该漏洞是否为初始入口。ConnectWise 确认 26.6.5 或更高版本的技术人员客户端，可阻断 SCKit 在活跃远程会话中利用 CVE-2026-84869 从受感染主机传播的尝试。该措施针对传播环节，已遭访问或正在运行非授权软件的终端仍需单独调查。

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

Huntress 观察到攻击者利用云托管控制台的 Run Command，在受管理 Windows 终端安装非授权客户端及 SCKit。报告列出受影响版本 26.6.6.9747 和 26.7.6.9783。仅升级无法清除持久化。工具包可拦截浏览器会话 Cookie，并设计为通过技术人员的交互会话传播。研究人员在已核查的主机日志中看到控制台接管均告失败，因此尚未确认成功自传播。48 家组织的 288 台主机是 Huntress 的观测范围。ConnectWise 所说的约 400 个环境是扩展安装数量。

Sophos 独立观察到一条部署链。curl.exe 从 185.99.255[.]28 下载 ScreenConnect.ClientSetup.msi 到 C:\Windows\TEMP\sc.msi，随后 ScreenConnect 生成的命令文件调用 msiexec.exe 静默安装。Sophos 还观察到批处理文件落地，以及 PowerShell 绕过执行策略后从 hxxps://ns[.]mo7sen[.]dev/EadF.php?p=4 下载第二阶段脚本。将三项疑似遭滥用的来源实例 ID d905b2b1b165d0a9、4b8f4089ddaac6a9、df1f7ef0cfacd0d8，与两项非授权目标实例 ID 2588ef5c15954b10、ed630cc2c873b091 分开核对。结合命令历史、进程及网络日志判断，单独命中无法证明失陷。

Huntress 公布的补充指标，包括 16 个样本哈希。按主机生成的值可能不同，命中需结合日志和执行证据。

```text
hxxps://ns[.]mo7sen[.]dev/EadF.php?p=1
hxxps://ns[.]mo7sen[.]dev/EadF.php?p=5
hxxps://ns[.]mo7sen[.]dev/EadF.php?p=6
soxnewwork[.]homedns[.]org:81
/Bin/ScreenConnect.ClientSetup.msi?...&c=Exploited<N>
C:\Windows\TEMP\sc.msi
C:\Windows\Temp\sckit-run.bat
C:\Windows\Temp\sckit-decoder.ps1
%TEMP%\sckit-loader.ps1
%TEMP%\k<guid>.ps1
C:\ProgramData\RelayTrap\install.ps1
C:\ProgramData\RelayTrap\trapbins\<client id>\RelayTrap.exe
HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run\RelayTrapLiteAlert
%PUBLIC%\RELAY-TRAP-PROOF.txt
CWInstall_<8 hex>-c1\Installer.ps1
lab-trap-cleanup-embedded.ps1
Stop-LabTrap.ps1
WithUninstall.ps1
desktop-vmc0ifs
send
sc-observation-lab
94b93c649b0ae0281352da9d01761fa9195ab1e6ac7010af3b9ba1646355eb11  Panel-Lateral-free.ps1
7a9aca9fdd4dcc13fe497cabdb13ca1e5d6a529271c8aa495e5ca1c1c80271ec  Panel-Lateral.ps1
b93f10f30ee453d1e1c046fec9d141c41d7680be5cd46c3aeb3febe0f4953b4d  LabConfig.ps1
3c7a98f0fdb6235b8076319c74dc1085f7b349b6d750416dd0cadb07d7972ec4  SCKit/trapkit/RelayTrap.cs
d2ed7a7bf4f8ac9c7969e9b3a07ebd4dda0d858f372c876ac0a041611698de9a  SCKit/trapkit/TrapWatch.ps1
4a1dd3cd2ea14368afadf7e9dfdd63b104e3981ef8c85bbb6510919b810af04b  SCKit/trapkit/install.ps1
8cb5f48bbe70b5248db7f327f3d1ad6649df5c767d2a7e0711ee147fd92e06af  ToolboxRelayUploader.exe
cf50d73fa8117a758093b1344de41cd6a6ccddc645cdda1fa91a9264efe93956  SCKit/trapkit/Lite-Alert.ps1
81cc2baa35b798d6084bd078662fa29ff28df02c46c6ccdb2b43bde97d19f781  Stage0Loader.ps1
c31e6f075cd77e01839aebce32ed35659a9ee962d102aca53040bb5e297410a9  SCKit/Release-Machine.cmd
deda7c30d798a19b6699a45fbcba503cf778594df9163c61c2f96bb2d2b9fb45  SCKit/Recover-ExecutionPolicy.cmd
0bd84c776dc01f784a617e73fc77b269f847fc4a062ffd489e4692869724bf08  Lab-context.json
454c43d296b1276bde9a4f6ff1da2221cb35ccdb2fc7991bdd572e45bce12a8a  SCKit/trapkit/payload/TRAP-PROOF.bat
5dd3a6ba806ac472663e243cfc1c034c534d5d9a42ec362c3dbf0f8d950148d0  Stop-LabTrap.bat
43b7a5e56f9e6c7b74e1ce2b7b5af63f383084625fcc2d3a5985fa1059e2db95  Run-Lateral-Full.bat
50659748723e906c8b3d3c0386bd4cf692f693a3e23639398c1a14d0c31fed61  runnew.cmd
```
