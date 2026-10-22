---
title: "Linux KSMBD 两项远程代码执行问题在修复尚未核实前公开"
tags: [Linux, KSMBD, SMB, 披露]
summary: "公开报道涉及 ZDI-CAN-33774（KSMBD 分发竞态）及 ZDI-CAN-33549（SMB Direct 整数下溢）。报道称 ZDI 对两者均评为 9.0；本次查阅未核实已发布的修复内核版本。"
splash: "通过内核 KSMBD 提供 SMB 的系统；SMB Direct 问题还需要 RDMA"
wipe: "限制 SMB 可达范围；禁用不需要的 KSMBD/SMB Direct，关注发行版修复"
inTheWildNote: "已查阅报道未确认针对实际部署系统的攻击"
fixed:
  - status: 未核实已发布的修复版本；开发分支补丁不等于发行版更新
timeline:
  - date: 2026年10月21日
    title: freenode 报道公开的 KSMBD 竞态问题
  - date: 2026年10月22日
    title: Phoronix 和 The Hacker News 报道两项披露
checklist:
  - title: 先排查 KSMBD，勿假定所有 SMB 服务器都受影响
    hint: 检查加载的模块及服务配置；Samba 是另一套实现
  - title: 将 SMB 访问限制到必要客户端及可信网络
  - title: 禁用不用的 KSMBD 和 SMB Direct，并跟踪厂商补丁
sourceException: "本次查阅时 lore.kernel.org 邮件列表原文返回 HTTP 403。Phoronix 和 The Hacker News 分别报道两项问题，freenode 有 10月21日的报道。具体内核版本范围及已发布修复仍未核实。"
sources:
  - says: 两项问题均评为 9.0；报道时主线未修复，据称 SMB Direct 补丁位于开发分支
  - says: 区分分发竞态和 SMB Direct/RDMA 下溢；报道时未列出主线修复
  - says: 10月21日报道 ZDI-CAN-33774
---

**L3：** 可选内核文件服务器被报告存在 RCE，技术细节已公开。分发竞态涉及协议处理器混淆；SMB Direct 下溢的传输条件更窄。报道均未证明所有 Linux 安装都暴露在风险中。

本次无法读取邮件列表原始证据。报道对开发补丁状态存在差异，因此不声明安全内核版本。日期采用最早可访问报道的日期，原始邮件的准确公开时间仍未核实。不声称已有可用利用程序或在野利用。
