---
title: "Linux KSMBD 两个远程代码执行漏洞报告在修复发布前公开到邮件列表"
tags: [Linux, KSMBD, SMB, 披露]
summary: "ZDI 把 ZDI-CAN-33774（KSMBD 分发竞态）和 ZDI-CAN-33549（SMB Direct 整数下溢）连同技术细节发到了公开的 LKML，两者 CVSS 均为 9.0。修复目前只在开发分支里，尚未核实有已发布的内核版本包含修复。"
splash: "通过内核 KSMBD 提供 SMB 服务的系统；竞态需要访客共享，SMB Direct 漏洞需要 RDMA 设备和可写共享"
wipe: "限制 SMB 可达范围；关闭访客共享及不需要的 KSMBD/SMB Direct；发行版内核更新出来后及时安装"
inTheWildNote: "暂无攻击报告；公开报告中的细节已足以复现漏洞"
fixed:
  - product: KSMBD 分发竞态（ZDI-CAN-33774）
    status: 维护者称已在 ksmbd 开发分支修复（提交 68f410faedaf）；未核实已发布的内核版本
  - product: SMB Direct 下溢（ZDI-CAN-33549）
    status: 开发者估计 for-7.5 开发分支已修复；尚未确认
timeline:
  - date: 10月21日 21:16 UTC
    title: ZDI 把 ZDI-CAN-33549 发到公开的 LKML
    body: 这份 SMB Direct 报告在 7.3-rc3 上测试，附有漏洞代码路径和利用前提。
  - date: 10月21日 21:36 UTC
    title: ZDI 把 ZDI-CAN-33774 发到公开的 LKML
    body: 这份分发竞态报告附有分析和 KASAN 日志。
  - date: 10月21日 22:16 UTC
    title: SMB Direct 开发者请报告者在开发分支上复测
  - date: 2026年10月22日
    title: KSMBD 维护者指出分发竞态已有修复
    body: Greg Kroah-Hartman 另外对把未修复漏洞发到公开列表的做法提出异议。
checklist:
  - title: 先确认你到底有没有在跑 KSMBD
    hint: 找找 ksmbd 模块和 ksmbd.mountd。Samba 是另一套用户态服务器，跟这个漏洞无关
  - title: 关闭 KSMBD 共享的访客访问
    hint: 分发竞态需要访客共享
  - title: 将 SMB 访问限制到必要客户端及可信网络
    hint: 445 端口本来就不该对公网开放
  - title: 没在用 RDMA 就禁用 SMB Direct
  - title: 关注发行版的内核安全公告
    hint: 维护者分支里的一个提交，不是你能直接装上的内核
sources:
  - name: LKML 上的 ZDI-CAN-33774 报告
    says: CVSS 9.0 的 KSMBD 分发竞态，在 7.3-rc3 上测试；越界读可泄露堆内存，并有越界写路径；需要竞态和访客共享
  - name: LKML 上的 ZDI-CAN-33549 报告
    says: smbdirect_connection_rdma_xmit() 中的 CVSS 9.0 整数下溢；需要 RDMA 设备、可写共享和 SMB Direct
  - name: KSMBD 维护者回复（MARC 存档）
    says: Namjae Jeon 称 ZDI-CAN-33774 已由 ksmbd 分支中的提交 68f410faedaf 修复
  - name: SMB Direct 开发者回复（MARC 存档）
    says: Stefan Metzmacher 请报告者在 for-7.5/smbdirect 分支上复测，并估计已经修复
  - says: ZDI 报告在主线修复前被发到公开列表，同时还有其他几份 ZDI 内核漏洞报告
  - says: 报道时两个漏洞都没有明确的主线或 linux-next 修复
---

**L3：** 一个可选的内核 SMB 服务器被报告存在 RCE，技术细节已发到公开列表。两份报告都在 7.3-rc3 上测试。分发竞态会让 SMB1 缓冲区被当作 SMB2 处理，从而泄露堆内存，据报告还有一条越界写路径；它需要访客共享。SMB Direct 下溢需要 RDMA 设备、可写共享和 SMB Direct。绝大多数 Linux 机器根本没跑 KSMBD。

KSMBD 维护者称分发竞态已在 ksmbd 开发分支修复；SMB Direct 开发者只是估计某个开发分支已经修好了另一个。两者都还没进入我们能核实的已发布内核，因此这里不列安全的内核版本。目前没有可用利用程序或在野利用的报告。
