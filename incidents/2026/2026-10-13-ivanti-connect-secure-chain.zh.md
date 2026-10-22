---
title: "Ivanti Connect Secure 零日漏洞链：打满补丁的 VPN 设备又被未授权拿下 root"
headline: "Ivanti Connect Secure：打了补丁的 VPN 被拿 root，已经数不清第几回了"
tags: [零日漏洞, VPN, 边缘设备]
summary: >-
  攻击者 UTA0576 把认证绕过、文件写入和提权串成一条链，接管了运行最新版本的 VPN 设备，随后去捞 AD 凭据、LAPS 密码和 BitLocker 密钥。CISA 当天就把它加入了 KEV。
splash: "暴露在公网的 Ivanti Connect Secure 22.8R2.4、25.1.1.1、25.1.2.2 及更早版本"
wipe: "升级到 22.8R2.5 / 25.1.1.2 / 25.1.3.x，运行 Ivanti 的外部完整性检查工具，轮换所有经过这台设备的凭据"
inTheWildNote: 10 月初起就被利用；已列入 CISA KEV
oneLiner: >-
  发一个魔法请求头跳过登录，借一个更新用的 CGI 写入文件，再用本地漏洞提权到 root：三步走，一个密码都不用，拿下的还是给你守内网大门的那台设备。
cves:
  - name: 认证绕过 + 任意文件写入
    description: >-
      覆盖了漏洞链三个环节中的两个：通过 X-DSCGI-PATH 请求头绕过认证，以及 wu.cgi 中可导致代码执行的文件写入。
    plain: 门卫只认工牌不认人，而工牌的模板就贴在大门上。
fixed:
  - {}
  - {}
  - { product: dsinvoked 中的提权漏洞, status: "披露时既无 CVE 也无补丁。厂商承诺“未来几周内”修复" }
timeline:
  - date: 2026年10月1日
    title: 最早的利用活动
    body: 依据是 Defused Cyber 的蜜罐和 Volexity 的 Koessel。Volexity 的博客写的是 10月3日。
  - date: 2026年10月5日
    title: Volexity 开始调查一台被攻陷的设备
    body: 这台设备运行的是 22.8R2.4，也就是当时的最新版本。
  - date: 2026年10月13日
    title: Ivanti 发布补丁；Volexity 发布分析；CISA 将其加入 KEV
  - date: 2026年10月14日
    title: Previdian 记录到来自 50 个 IP 的 105 次利用尝试
  - date: 2026年10月16日
    title: CISA 给美国联邦机构设定的修复截止日
checklist:
  - title: 给每台 Connect Secure 设备打补丁
    hint: 22.8R2.5 或 25.1.1.2 / 25.1.3.x
  - title: 运行外部完整性检查工具（Integrity Checker Tool）
    hint: 攻击者篡改了日志，专门骗过内置的那个
  - title: 重置 VPN 使用的 AD 服务账号
    hint: LDAP 绑定账号是攻击目标之一
  - title: 轮换 LAPS 密码和 BitLocker 恢复密钥
    hint: 两样都被从 AD 里拖走了
  - title: 排查 Kerberoasting
    hint: 10月1日以来从 VPN IP 发出的异常 TGS 请求
  - title: 为尚未修复的提权漏洞做好预案
    hint: 收紧管理访问，盯着 Ivanti 的后续补丁
sources:
  - says: 完整的漏洞链分析、攻击者 UTA0576、时间线、IOC
  - says: CISA KEV 收录情况和截止日期；修复版本
  - says: 报道了 Ivanti 的安全公告
  - says: 利用活动的背景
---
Volexity 在一台运行 **22.8R2.4**（当时的最新版本）的 Connect Secure 设备上发现了这名攻击者，编号 **UTA0576**。攻击链如下：

1. 通过 `X-DSCGI-PATH` 请求头**绕过认证**
2. 在 `wu.cgi` 中**写入文件 → 执行代码**（1 和 2 合起来就是 CVE-2026-104935，CVSS 8.6）
3. 在 `dsinvoked` 中**提权**，这个漏洞没有公开的 CVE，**披露时仍未修复**

攻击者没有留 Webshell，而是每执行一条命令就重新利用一次漏洞，并篡改日志来骗过 Ivanti 内置的完整性检查工具。得手之后，它去捞 LDAP/AD 凭据、LAPS 密码和 BitLocker 密钥，还做了 Kerberoasting。

Volexity 有中等把握认为攻击者用 LLM 开发了攻击工具，但对它是犯罪团伙而非间谍组织只有低把握。我们没能访问到 Ivanti 自己的安全公告，修复版本列表来自二手报道，请到 Ivanti 门户上再核对一遍。
