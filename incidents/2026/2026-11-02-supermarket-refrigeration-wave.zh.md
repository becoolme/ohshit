---
title: 欧洲超市遭新一轮冷链控制器攻击，远程更改除霜设置
summary: 11月2日，欧洲多国超市报告制冷系统异常。Sabcobel 称攻击者远程开启除霜；研究人员确认受影响设备的管理界面暴露公网。应隔离控制器，由制冷专业人员核验并恢复安全设置。
splash: 暴露公网的制冷管理系统；11月这轮攻击的具体受影响型号尚未确认
wipe: 取消公网管理访问，核查除霜设置，使用受保护远程访问并按型号恢复
inTheWildNote: CERT-FR 已确认此前入侵；安装商及零售商报告新一轮攻击。
fixed:
- product: 制冷控制器固件
  status: 未确立通用安全版本；隔离停止维护设备并计划替换
timeline:
- date: 2026年10月12日
  title: CERT-FR 警告制冷控制器遭入侵
  body: 这是此前法国的攻击；列出 Danfoss AK-SM / AK-SC 和 Copeland / Dixell xweb。
- date: 2026年10月16日
  title: CERT-FR 修订恢复指南
  body: 这是该告警当前最后修订日，不是 11月新告警。
- date: 2026年11月2日
  title: 安装商及零售商报告欧洲新一轮攻击
  body: Belga 就远程修改除霜设置采访 Sabcobel；Supermarket News 获取 Ahold Delhaize 关于受影响门店的声明。
- date: 11月2日 13:37 UTC
  title: 研究人员称受影响系统的管理界面暴露公网
  body: Kevin Beaumont 称已向联系人核实，并警告许多设备已停止维护。帖子未提供具名 CVE 或详细取证报告。
checklist:
- title: 隔离公网管理访问并维持安全制冷
  hint: 按 CERT-FR 指引取消公网 IP 暴露，先与制冷维护商协调，并在切断提供商遥测前检查保险及监控义务。由合格人员监督本地安全运行，不要盲目断掉制冷。
- title: 核验控制器的全部配置
  hint: 将除霜计划、温度设置及其他配置与获批基线对照。由制冷及食品安全人员独立检查温度和存货安全，确认后再恢复销售。
- title: 与维护商一起恢复已失陷控制器
  hint: CERT-FR 建议重启受影响的 Danfoss 设备，必要时恢复出厂设置，再重新配置投入使用。在安全允许时，于破坏性恢复前保留现有日志和配置。单纯重置不会修复漏洞。
- title: 通过受保护网络恢复远程访问
  hint: 使用安全 VPN 或受保护网络。仅放行制冷服务商源 IP 可作应急措施，不能作为长期修复。也要核查其他同样暴露公网的控制器。
- title: 按型号加固并替换停止维护设备
  hint: 安装厂商固件、更改默认密码；适用的 Danfoss 控制器须配置 Strict 安全模式。向制造商确认对应流程。无补丁的 EOL 系统应保持不暴露公网，恢复出厂设置后仍可能再次感染。
sources:
- name: CERT-FR CERTFR-2026-ALE-012
  says: 10月12日告警，最后修订于 10月16日；列出此前受影响系列及恢复步骤，未确认 11月每台设备。
- name: Kevin Beaumont original public post
  says: 11月2日向联系人核实的观察；管理界面暴露及 EOL 警告，未附公开取证证据。
- name: Public Mastodon status JSON
  says: 可读原帖及明确的 UTC 创建时间。
- name: Belga interview with Sabcobel
  says: 对安装商的原始采访：远程操纵除霜、断网处置及可能的食品损失。
- name: Supermarket News interview with Ahold Delhaize
  says: 独立获取零售商声明，确认制冷异常；其他范围为报道内容，并非最终受害者统计。
---

这是 11月的新一轮攻击，与 CERT-FR 10月告警所述法国攻击不同。Belga 对 Sabcobel 的直接采访描述，攻击者将比利时超市的蒸发器切至除霜模式，涉及 Delhaize、Carrefour、Spar 等。Ahold Delhaize 也在独立接受 Supermarket News 采访时确认制冷系统异常。更广泛的国家及门店数量仍属初步信息；本文不将安装商估计视为最终受害者统计，也不量化损失。

Kevin Beaumont 的 11月2日原帖称，已向联系人确认受影响系统的管理界面暴露公网，而且许多设备因停止维护而没有补丁。这是具名研究人员的观察，不能当作已公开取证证明所有门店都遭同一个漏洞攻击。此处未确立具体 CVE、共同攻击者，或与其他零售商及美国事件的联系。

此前 CERT-FR 告警列出 Danfoss AK-SM、AK-SC，以及 Copeland xweb、Dixell xweb。它确认此前入侵并提供可执行的隔离及恢复建议，但不能证明 11月每个受害者都使用这些型号。请与设备制造商及制冷维护商落实步骤；新一轮攻击尚无经核实的通用安全固件下限。

由于已报告的攻击正在扰乱实体制冷、危及食品存货，评为 L4。只修改控制器密码或重置设备，同时继续将未修补管理界面放在公网，并不能消除暴露。
