---
title: "Arista 确认 VeloCloud Orchestrator SQL 注入漏洞遭到在野利用"
tags: [Arista, VeloCloud, SD-WAN, 在野利用]
summary: "CVE-2026-114625 可让已登录的 VeloCloud Orchestrator 用户获得运营管理员权限。Arista 确认已发生攻击；托管实例已修复，本地部署需要升级。"
splash: "低于所列修复版本且 Web 可访问的 VCO，加上有效门户会话；Enterprise Read Only 权限即足够"
wipe: "升级到 VCO 5.2.3.18、6.1.3.10 或 6.4.2.12；限制 Web 访问并排查入侵"
inTheWildNote: "Arista 确认利用；CISA 于 10月23日加入 KEV"
cves:
  - name: 需登录的 SQL 注入
    description: 即使只有 Enterprise Read Only 权限，也能获得超级运营管理员权限。
fixed:
  - {}
  - {}
  - {}
timeline:
  - date: 2026年10月22日
    title: Arista 披露在野利用及修复版本
  - date: 2026年10月23日
    title: CISA 将漏洞加入 KEV
    body: 条目标记需要取证分诊，并将联邦机构修复期限设为 10月26日。
checklist:
  - title: 限制访问并升级本地 VCO
    hint: Hosted 和 Dedicated VCO 已修复。本地部署的 Web 界面默认对外开放，只放行可信的管理网络
  - title: 丢弃证据前先排查可疑访问
    hint: 可行时在修复前保存 Web、应用、系统及数据库日志和文件系统时间戳；检查 74.82.197.86 和 38.54.50.151。仅命中指标不能证明入侵
  - title: 审查管理员变更及异常出站连接
    hint: 顺便排查 Webshell 和后门进程；封掉 VCO 用不到的出站端口
  - title: 跟踪 CISA 期限和取证分诊要求
    hint: 联邦民事机构须在 10月26日前遵循 KEV 条目及适用的 BOD 26-04 指引；其他运营者应优先处理暴露资产并保存证据
sources:
  - name: Arista 第 0199 号安全公告
  - name: CISA 10月23日 KEV 目录
    says: CVE-2026-114625 于 10月23日加入，期限为 10月26日，标记需要取证分诊
---

**L4：** SD-WAN 管理平面已确认遭到利用。攻击需要能访问门户并持有登录会话。Hosted 和 Dedicated VCO 已修复；Gateway 和 Edge 不受此漏洞影响。

评分采用 CVSS 3.1；Arista 同时给出的 CVSS 4.0 评分为 9.4。受害者数量及攻击起始时间未公开。安装补丁不能证明已被入侵的主机恢复干净。保留厂商的四段版本号，不提供交互式版本检查器。

**10月23日更新：** CISA 将该 CVE 加入已知遭利用漏洞目录，修复期限为 10月26日，并标记需要取证分诊。联邦机构的要求与厂商面向所有运营者的尽快修补建议应区分。这进一步证实此前已确认的攻击，没有提供新的受害者数量。
