---
title: 冒充 KuCoin 的安全邮件诱导用户下载 Overlord 远控软件
tags: [KuCoin, 钓鱼, 恶意软件, DMARC]
summary: GCSA 核阅了冒充 KuCoin 的钓鱼邮件，确认 Windows 下载文件含 Overlord 远控客户端。Windows 及两个 macOS 样本使用相同的回连地址。GCSA 称 KuCoin 收到通报后为 ku.com 启用了 DMARC 隔离策略。感染设备数量及损失仍不明。
splash: 收到虚假账户安全邮件的 KuCoin 用户，尤其是输入了凭据或运行了仿冒安全中心提供的 Windows 或 macOS 下载文件的用户。
wipe: 若运行了下载文件，先断开设备网络。通过干净设备保护账户、核查活动，并从 KuCoin 官方应用或网站联系支持。
inTheWildNote: GCSA 核阅了实际送达的钓鱼邮件，确认 Windows 下载文件含 Overlord 载荷。
timeline:
- date: 2026年10月29日
  title: GCSA 发现 ku.com 缺少 DMARC
  body: 研究人员发现，SPF 和 DKIM 验证通过的是实际投递域，与发件人字段 From 显示的域不同。
- date: 2026年11月5日
  title: GCSA 发布样本分析与 KuCoin 的回应
  body: GCSA 确认 Windows 下载文件为 Overlord，并称 KuCoin 核实了配置问题，已为 ku.com 启用隔离策略。
checklist:
- title: 隔离运行过下载文件的设备
  hint: 断开 Wi-Fi 和有线网络。保留含完整邮件头的原始邮件、下载详情及活动记录。请安全团队检查设备并确认清理完成后再联网。
- title: 用干净设备保护 KuCoin 账户
  hint: 若输入过密码或验证码，或运行过下载文件，直接打开 KuCoin。更换密码、退出其他会话，核实双因素认证设置，检查近期提币记录，向官方支持报告异常。若设备保存过交易所 API 密钥，吊销并更换已暴露的密钥。
- title: 通过官方入口核实提醒
  hint: 用平时使用的 KuCoin 应用或书签核实所称的账户问题。已设置防钓鱼码的用户应核对该码。如果只是打开了链接，请关闭页面，别输入信息或下载文件。
- title: 排查相关邮件、下载和回连
  hint: '在邮件中查找显示为 security@ku.com，且退信地址为 security@ku-security[.]com 或投递主机为 mail.ku-security[.]com 的记录。在网页访问和终端日志中检查 ku-security[.]com:5173、路径 /api/file-share/290924a0-2064-477f-b0dd-0cbfd6fa18ab/download 和 /api/file-share/e9daf83a-5bf2-4d72-a98e-deece8984e87/download，以及 Windows 样本的 SHA-256 3beb5f5fa9e01b382b79c152a6eb14b096e1ef0fabbc1ab6faf6b19326899d21。核查到 3.1.159[.]255:5173 的出站 TLS 连接，如有相应日志，也检查 /api/clients/{id}/stream/ws?role=client。结合执行记录和账户活动判断。单项命中无法证明设备或账户已失陷。'
sources:
- name: GCSA 原始调查
  says: 记录已送达的钓鱼邮件、发信域对齐问题、仿冒下载页、Windows 静态分析、三个样本的回连地址及 GCSA 收到的 KuCoin 回应。
- name: KuCoin 账户安全指南
  says: 介绍防钓鱼码、官方核实渠道及账户防护措施。这是通用指南。
---

钓鱼邮件冒充 KuCoin 安全中心发出紧急账户警报。GCSA 发现，邮件显示的发件人为 `security@ku.com`，SPF 和 DKIM 验证通过的是攻击者的 `ku-security[.]com` 域。由于 `ku.com` 缺少 DMARC 记录，该域当时没有为未通过对齐检查的邮件发布隔离或拒收策略。GCSA 称 KuCoin 收到通报后启用了隔离策略。

仿冒网站提供 Windows 和 macOS 下载文件。GCSA 通过静态分析确认 Windows 样本为 Overlord 客户端。Windows、macOS arm64 和 macOS amd64 样本含有相同的回连地址。运行下载文件会带来远程控制风险。调查证实了钓鱼邮件投递和恶意软件分发。收件人是否运行过文件、损失资金或遭到账户入侵仍不明。现有证据涉及冒用 KuCoin 发件身份，报告未证实 KuCoin 基础设施遭访问。
