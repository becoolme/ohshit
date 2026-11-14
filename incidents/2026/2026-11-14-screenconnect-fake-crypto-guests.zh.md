---
title: 仿冒加密货币主机注册到自托管 ScreenConnect 服务器
tags:
- ScreenConnect
- 远程访问
summary: Huntress 在 109 家受其保护的机构内至少 118 台自托管 ScreenConnect 服务器上发现仿冒 Guest。这些 Guest 使用交易所主题名称，可能诱使技术人员打开会话。
splash: 中继可达、且其地址为操作者所知的自托管 ScreenConnect。通过 Guest 在 Host 端执行文件需要技术人员使用存在漏洞的客户端并加入会话。
wipe: 更新技术人员客户端，避免加入身份不明的会话，保留并核查会话证据后再删除相关条目。
inTheWildNote: Huntress 确认存在未授权注册。本次活动中尚未观察到 Guest 向 Host 利用漏洞。
timeline:
- date: 2026年11月3日 21:26 UTC
  title: 出现最早三条记录
  body: Huntress 将最早的记录追溯至 197.47.160[.]252。
- date: 2026年11月12日
  title: 一家 MSP 请 Huntress 调查
  body: 服务器上有异常条目，但未发现 Web Shell、可疑子进程或新增账号的证据。
- date: 2026年11月14日
  title: Huntress 发布调查
  body: 遥测显示 11 月 3 日至 13 日出现新条目，并发现一起可能涉及敏感文本暴露的情况。
checklist:
- title: 更新客户端并限制访问
  hint: 将所有技术人员客户端更新至 26.6.5 或更高版本，并更新受影响的 Access 代理。通过服务器历史核实客户端版本。无法立即升级时，按 ConnectWise 指引在 Administration > Security > Roles 中逐一检查各角色的每个会话组，取消勾选 TransferFiles。保持安装包链接私密，并在支持时限制安装包和网页访问。
- title: 先保留证据并排查，再删除条目
  hint: 备份 App_Data\Session.db 及其 WAL。结合下列特征检查 Access 和服务器日志，并与已批准设备清单比对。命中一个指标无法单独确认失陷。将陌生条目与技术人员日常会话隔离，留存证据后删除确认仿冒的条目。
- title: 核实谁加入会话并遏制受影响的工作站
  hint: 检查会话历史中双向发送的文本、文件及命令。若有未更新的技术人员客户端加入，检查该工作站的 ScreenConnect Temp 和 Startup 目录及进程历史。若可能输入过凭据，通过可信设备更换凭据并撤销相关会话。发现执行证据时隔离工作站并开展事件响应。
sources:
- name: Huntress 调查报告
  says: 记录仿冒 Guest、观察范围、会话历史、指标及处置。
- name: ConnectWise 9 月 8 日公告
  says: 说明文件传输漏洞、修复版本和临时权限措施。
---

Huntress 在调查的首台服务器发现可公开下载的安装包。Guest 需要安装包中内嵌的中继地址。报告摘要统计了 2,408 次注册，正文列出 2,223 次，未说明差异原因。调查没有观察到 Guest 推送或运行文件。有一名技术人员两次使用发送文本功能，内容未留存，Huntress 将此视为凭据可能暴露。研究人员以[另一起 SCKit 活动](/zh/incidents/screenconnect-partner-access/)作为背景，称未命中该活动已公开的指标。CVE-2026-84869 是这些诱饵可能利用的一条途径。

### 排查指标

- `74.208.158[.]106` — 占观察到的连接的 97.8%
- `197.47.160[.]252` — 最早三次注册
- `87.106.111[.]220` — 与主要 IP 共享 JARM 与 TLS 证书，未观察到来自该地址的 Guest 会话
- `SHA256:kt6iiIS3kcQ3NsUSVfk7gJoGMSSUqMdXqsmjb+/cSHg` — 主要 IP 的 ECDSA SSH 主机密钥指纹
- `25.3.4.9288, ClientType 1, empty guest key` — Guest 声称的版本及仿冒客户端的特征，Guest 密钥为空
- `KUCOIN-SRV, LAPTOP-BINANCE, BACKUP-PROBIT, WORKSTATION-COINEX` — 交易所加角色的名称示例，公司及站点字段常为空
- `ScreenConnect.WindowsClient.exe → cmd.exe / powershell.exe / wscript.exe / msiexec.exe` — 排查使用 Documents\*\Temp\ 中的文件启动的进程。它可能提示 Guest 向 Host 执行文件，本次未观察到该结果。

Huntress 公布的仿冒 WebP 缩略图 SHA-256。

- `008839ef2a2d54e9efa47013bb23c773d3a152f351e9dfd3b2f4dd27086121df`
- `45136a9ab47015c4334b881df9daf824a72347daae0b5730ce3bd7d42b204bf2`
- `e73020645e7a11a90865d93bd7f3d797585f49ef72b1ac7354392a2da7fbd91f`
- `c15b008b0296b1bc9e0f979e6f25b780e3e89edabb344c7ee8c284a1a140f0d7`
- `b55ce5130cd2623017cca29318341f6b4656e3a1dc5ab82ce704e912d0d17535`
- `bea82efc82672225cf29eb869972670754f15941bc61b9e5801ffd41c5c39e5f`
- `f6d37291c4948b974caf2e9e7e8ca9c2173d2779d1ec0a391488706bbd1a995c`
