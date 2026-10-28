---
title: Convertr 共享分析脚本被投毒，窃取结账支付数据
tags:
  - 电商
  - 供应链
  - 支付卡窃取
summary: Sansec 发现 Convertr 共享追踪脚本窃取支付数据，并于 10 月 27 日确认清理；浏览器缓存可能继续保留恶意脚本 24 小时。Plausible 漏洞作为入侵入口的说法仍未证实。
splash: 10 月 24 日起使用 checkout.convertr 页面付款的购物者；受影响商户及人数未确定
wipe: 联系银行更换暴露的支付卡；商户核实清理、处理缓存并通知支付服务商
inTheWildNote: Sansec 观察到支付窃取脚本；最初利用的漏洞未确认。
cves:
  - name: 疑似 Plausible 入侵入口
    description: 旧 /storybook RCE 被怀疑是入口，但尚未确认为本次入侵原因。
fixed:
  - product: Plausible CE——仅针对疑似入口漏洞
    status: 升级无法撤销已发生的支付数据窃取
timeline:
  - date: 2026年10月24日
    title: Sansec 发现结账数据窃取
  - date: 2026年10月26日
    title: Sansec 公开共享脚本失陷调查
  - date: 2026年10月27日
    title: Sansec 确认服务端追踪脚本已清理
checklist:
  - title: 若在受影响页面付款，联系银行
    hint: 要求冻结并更换支付卡，同时留意 CPF 税号被滥用的情况。
  - title: 核实清理并处理脚本缓存
    hint: 商户应向 Convertr 核实清理并通知支付服务商。浏览器缓存可保留恶意脚本 24 小时；购物者再次访问前应清除相关站点缓存。
  - title: 排查当前及历史指标
    hint: analytics.convertr.app.br/js/script.pageview-props.tagged-events.js；1x0.is/ws 及 /ws/<base64>；SHA256 ee4618d24737eff785e5a267b55903d5ef6ff7ecbeb099347a67fee77734d7f7。Sansec 列出 14 个旧域名：snf.is、kk.land、nmn.is、kof.one、anl.is、xsox.diy、eqp.is、shy.is、blz.is、tray.is、miorl.net、xwv.is、fasthook.app、antiddos-protection.net。完整清单还含六个 Discord webhook ID 及脚本字符串；历史指标属于更广泛活动，不一定用于 Convertr。仅命中不能证明失陷。
  - title: 修复并调查自托管 Plausible CE
    hint: ">=3 且 <3.2.1 应升级至 3.2.1 或更新版本，或暂时阻断 /storybook。检查端点日志及容器活动；保留证据、重建失陷系统，并轮换可访问的密钥。"
sources:
  - name: Sansec 调查
    says: 10 月 26 日披露、27 日清理、完整指标及缓存警告；最初入口未确认。
  - name: Plausible 安全公告
    says: 旧疑似入口漏洞：影响 >=3、<3.2.1，修复版本 3.2.1，并给出端点阻断及调查措施。
  - says: 涉及卡号、有效期、CVV、姓名及 CPF；建议清除缓存。
---

这是新披露的支付数据窃取事件，并非旧 Plausible 漏洞的再次披露。Sansec 未取得 Convertr 服务器日志，无法确认该入口。已观察到支付数据窃取，因此评为 L4。更广泛攻击团伙使用的六个 Discord webhook 路径及其他载荷特征，见 Sansec 完整指标章节。
