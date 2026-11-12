---
title: FortiClient 本地 API 漏洞可让恶意网页触发代码执行
summary: CVE-2026-121529 允许远程攻击者在受害者与攻击者控制的内容交互时，通过 FortiClient 本地 API 执行代码或命令。发现者在启用 FortiPAM 时复现了该漏洞。
splash: 受影响的 FortiClient Mac、Windows 和 Windows PAM 构建。发现者在启用 FortiPAM 时演示了浏览器攻击路径。
wipe: 将受影响的 7.4 客户端升级到 7.4.8 或更高版本，将受影响的 Windows 或 Windows PAM 7.2 升级到 7.2.15 或更高版本。
inTheWildNote: 发现者已复现该漏洞，尚未确认在野利用。
cves:
- name: 本地 API 来源校验错误
  description: 未认证的远程攻击者可在受害者交互后，通过本地 API 执行代码或命令。
fixed:
- product: FortiClient Mac、Windows 和 Windows PAM 7.4
- product: FortiClient Windows 和 Windows PAM 7.2
timeline:
- date: 2026年11月10日
  title: Fortinet 披露 FortiClient 本地 API 漏洞
  body: FG-IR-26-194 和 Fortinet 的 CVE 记录说明了需要受害者交互的代码执行漏洞。
- date: 2026年11月11日
  title: 巴拿马 CSIRT 发布升级版本表
  body: 通报列出 Windows、Windows PAM 和 Mac 的 7.4.8，以及 Windows 和 Windows PAM 的 7.2.15。
checklist:
- title: 盘点并升级受影响终端
  hint: 通过 FortiClient EMS 或终端资产清单核对操作系统、版本类型、分支和构建号。将受影响的 Mac、Windows 和 Windows PAM 7.4 升至 7.4.8 或更高版本，受影响的 Windows 和 Windows PAM 7.2 升至 7.2.15 或更高版本。部署后核对每台终端的安装版本。
- title: 检查 Windows 暴露线索
  hint: 发现者建议检查 TCP 9191 监听端口和正在运行的 FortiVRS.exe。这两项用于判断暴露面。单独匹配不足以证明失陷，未发现也仍需核对安装版本。
- title: 排查可疑终端活动
  hint: 升级期间优先处置 FortiPAM 工作站，排查可疑网页访问后，本地 FortiClient 服务是否异常启动进程或执行命令。隔离受影响的主机，保全浏览器和终端遥测，并吊销失陷主机可访问的凭据。
sources:
- says: 厂商提交的记录说明了交互前提、9.1 评分及较窄的 Windows PAM 影响列表。
- says: 发现者说明了启用 FortiPAM 时从浏览器访问本地服务的路径、Windows 暴露线索及较宽的 Windows PAM 影响范围。
- says: 公开 CERT 通报转述了补丁版本表及厂商披露时的在野利用状态。
---

Fortinet 披露了 FortiClient 本地 API 的来源校验漏洞。发现者演示了恶意网页如何访问启用了 FortiPAM 的工作站上的本地服务并执行代码。攻击需要受害者交互。已演示的浏览器攻击路径无需从互联网向工作站发起入站连接。

Fortinet 的 CVE 记录列出 Mac 7.4.0–7.4.7、Windows 7.4.0–7.4.7 和 7.2.0–7.2.14，以及 Windows PAM 7.4.7 和 7.2.14。发现者及巴拿马 CSIRT 列出的 Windows PAM 范围更宽，为 7.4.0–7.4.7 和 7.2.0–7.2.14。应按较宽范围为 Windows PAM 部署已公布的更新，同时向 Fortinet 核对版本类型和分支。发现者列出的 Windows 监听端口和进程可用于判断暴露面。是否失陷仍需排查终端活动。
