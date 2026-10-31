---
title: "Ivanti Connect Secure 零日漏洞链：打满补丁的 VPN 设备又被未授权拿下 root"
headline: "Ivanti Connect Secure：打了补丁的 VPN 被拿 root，已经数不清第几回了"
tags: [零日漏洞, VPN, 边缘设备]
summary: >-
  攻击者 UTA0576 把认证绕过、文件写入和提权串成一条链，接管了运行最新版本的 VPN 设备，随后去捞 AD 凭据、LAPS 密码和 BitLocker 密钥。CISA 当天就把它加入了 KEV。
splash: "可访问的 ICS 22.8 至 R2.5、25.1.1 至 .2 或 25.1.2 至 .2；迁移到 25.1.3 需要新平台"
wipe: "升级至 22.8R2.6 / 25.1.1.3 或适用的 25.1.3 平台，调查失陷并轮换暴露凭据"
inTheWildNote: 10 月初起就被利用；已列入 CISA KEV
oneLiner: >-
  发一个魔法请求头跳过登录，借一个更新用的 CGI 写入文件，再用本地漏洞提权到 root：三步走，一个密码都不用，拿下的还是给你守内网大门的那台设备。
cves:
  - name: 认证绕过 + 任意文件写入
    description: >-
      覆盖了漏洞链三个环节中的两个：通过 X-DSCGI-PATH 请求头绕过认证，以及 wu.cgi 中可导致代码执行的文件写入。
    plain: 门卫只认工牌不认人，而工牌的模板就贴在大门上。
  - name: 本地提权
    description: 本地已认证攻击者可提升权限，已确认存在漏洞链利用。
  - name: 可预测的上传文件名
    description: 远程已认证攻击者可将受控内容上传至已知磁盘位置。
fixed:
  - {}
  - { product: Ivanti Connect Secure 25.1.1 }
  - { product: Ivanti Connect Secure 25.1.3 新平台, status: 厂商称该平台不受影响，需满足迁移条件 }
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
  - date: 2026年10月29日
    title: Ivanti 修复漏洞链中的另外两个漏洞
    body: Volexity 将此前未编号的提权漏洞确定为 CVE-2026-111357。
  - date: 2026年10月30日
    title: CISA 将 CVE-2026-111357 和 CVE-2026-118527 加入 KEV
    body: 联邦修复截止日分别为 11 月 2 日和 11 月 13 日，前者要求取证分诊。
checklist:
  - title: 给每台 Connect Secure 设备打补丁
    hint: 使用 22.8R2.6 或 25.1.1.3，此前修复版不能覆盖完整漏洞链。Ivanti 优先建议从 22.8 迁往 25.1。25.1.3 平台不受影响，但需要 ISA4500/6500/8500 硬件，或使用其模板新建虚拟及云设备。22.7 和 22.8 均于 2027 年 1 月 31 日结束支持。
  - title: 运行外部完整性检查工具（Integrity Checker Tool）
    hint: 定期运行厂商检查工具，但干净结果不能排除这种基于内存的漏洞链。怀疑失陷时保留证据并开展网络和内存取证，通过厂商公告中的 Recovery Steps 执行恢复。
  - title: 重置 VPN 使用的 AD 服务账号
    hint: LDAP 绑定账号是攻击目标之一
  - title: 轮换 LAPS 密码和 BitLocker 恢复密钥
    hint: 两样都被从 AD 里拖走了
  - title: 排查 Kerberoasting
    hint: 10月1日以来从 VPN IP 发出的异常 TGS 请求
  - title: 跟进新增的联邦修复期限
    hint: 对受约束的联邦系统，CVE-2026-111357 截止 11 月 2 日，要求取证分诊；CVE-2026-118527 截止 11 月 13 日。这不延长原先 10 月 16 日的截止日。完成处置前收紧管理访问。
  - title: 排查公开的网络指标
    hint: Volexity 的可下载清单只有一个 IP：108.165.147[.]64。检查设备及上游日志，并查找访问 /dana-na/auth/url_default/welcome.cgi、X-DSCGI-PATH 指向 /home/webserver/htdocs/dana/fb/smb/wu.cgi 或 /home/runtime/tmp/<MD5(filename)> 的请求。其他文件痕迹见所引完整分析；匹配本身不能证明失陷，缺少日志也不能证明安全。
sources:
  - says: 完整的漏洞链分析、攻击者 UTA0576、时间线、IOC
  - says: CISA KEV 收录情况和截止日期；修复版本
  - says: 报道了 Ivanti 的安全公告
  - says: 利用活动的背景
  - name: Ivanti 更新后的厂商公告
    says: 通过公开浏览器完整阅读 10 月 29 日更新，包括各漏洞修复版本及平台迁移条件。
  - name: CISA KEV 原始目录
  - name: Volexity 完整可下载指标清单
---
Volexity 在一台运行 **22.8R2.4**（当时的最新版本）的 Connect Secure 设备上发现了这名攻击者，编号 **UTA0576**。攻击链如下：

1. 通过 `X-DSCGI-PATH` 请求头**绕过认证**
2. 在 `wu.cgi` 中**写入文件 → 执行代码**（1 和 2 合起来就是 CVE-2026-104935，CVSS 8.6）
3. 在 `dsinvoked` 中**提权**，这个漏洞没有公开的 CVE，**披露时仍未修复**

攻击者没有留 Webshell，而是每执行一条命令就重新利用一次漏洞，并篡改日志来骗过 Ivanti 内置的完整性检查工具。得手之后，它去捞 LDAP/AD 凭据、LAPS 密码和 BitLocker 密钥，还做了 Kerberoasting。

Volexity 有中等把握认为攻击者用 LLM 开发了攻击工具，但对它是犯罪团伙而非间谍组织只有低把握。我们没能访问到 Ivanti 自己的安全公告，修复版本列表来自二手报道，请到 Ivanti 门户上再核对一遍。

**10 月 31 日更新：** 上文保留最初披露时的情况。Volexity 的 10 月 29 日更新及 Ivanti 现已确认，此前未编号的提权漏洞 CVE-2026-111357 已有补丁；Ivanti 另补充 CVE-2026-118527。CISA 于 10 月 30 日收录两者。当前表格取代此前修复阈值和“未修复”状态。厂商完整公告现已可读，确认少量客户遭到三漏洞串联利用。这不是新事件，也不代表打补丁会清除既有失陷。
