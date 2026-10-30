---
title: Humanode 修复遭利用的 EVM 预编译合约漏洞，436 个账户的 eHMND 被盗
tags: [Humanode, EVM, 加密资产]
summary: Humanode 报告 436 个账户共被盗 12,773,243.03 eHMND，包括 ChainPort 金库。既有 WeHMND 授权使攻击无需用户再次签名；本漏洞无法触及原生侧余额。
splash: 受影响的 Humanode EVM 授权持有者及 ChainPort eHMND 金库
wipe: 核实 runtime spec 134，遵守已公布的服务冻结安排，关注官方赔付更新
inTheWildNote: Humanode 确认漏洞遭利用，并称已修复识别出的问题。
cves: []
fixed:
  - product: Humanode 主网运行时
    status: 已激活
timeline:
  - date: 10月28日 15:00:42 UTC
    title: 攻击交易执行
  - date: 10月28日 15:40:48 UTC
    title: 主网激活修复
  - date: 10月28日 20:21 UTC
    title: 声明宣布冻结 DEX、跨链桥及 LP 质押 72 小时
checklist:
  - title: 恢复集成前确认已部署运行时
    hint: 对照官方报告核实区块 20,446,186 的 spec 134。补丁激活不代表已冻结服务同时重开。
  - title: 核对余额，关注恢复通知
    hint: 比较攻击区块 20,445,791 前后的账户状态。参考交易 0x5ed6b9e5661b7ba5237a81244725272482044b0b572267d2f7f31874d68c4a82；仅匹配该指标不能证明账户受害。通过官方渠道查看赔付指引，拒绝主动发来的申领链接。
sources:
  - name: Humanode 事件响应及恢复报告
    says: 确认损失及修复，承诺全额赔付 eHMND，并非已完成赔付。
---

有状态预编译合约接受 DELEGATECALL/CALLCODE，造成身份混淆；这不代表各集成都存在独立漏洞。攻击者卖出代币获得约 18,804 USDC，不等于受害者总损失。调查仍在继续。页面顶部标注 10 月 29 日，但声明明确注明 10 月 28 日，此处采用较早的披露日期。
