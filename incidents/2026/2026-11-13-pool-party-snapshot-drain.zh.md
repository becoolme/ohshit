---
title: Pool Party 报告 Arbitrum 和 Base 上 15 个资金池损失约 21.5 万美元
tags: [DeFi, 智能合约, Arbitrum, Base]
summary: Pool Party 称攻击者篡改资金池快照合约中的仓位记录，清空 Arbitrum 上 12 个资金池和 Base 上 3 个资金池。团队估计损失约 21.5 万美元，并称已在支持的四条链上部署修复。
splash: Arbitrum 和 Base 上受影响 Pool Party 资金池的流动性提供者。
wipe: 通过 Pool Party 官方渠道核对仓位和交易记录，保留证据以便按团队后续公布的方案处理。
inTheWildNote: Pool Party 团队报告，攻击者利用快照合约漏洞从 15 个资金池提取了资金。
timeline:
  - date: 11 月 13 日 01:34 至 03:38 UTC
    title: 攻击者清空 15 个资金池
    body: 团队报告发现未经授权的提现，涉及 Arbitrum 上 12 个资金池和 Base 上 3 个资金池。
  - date: 11 月 13 日 18:23 UTC
    title: Pool Party 披露事件
    body: 首条帖文估计损失约 21.5 万美元。同一帖串的后续消息说明快照合约漏洞，并称已在 Arbitrum、Base、Polygon 和 Robinhood Chain 修复。
checklist:
  - title: 记录受影响仓位
    hint: 根据自己的链上记录核对资金池地址、所在链和余额。保存存款和提现交易哈希，如有需要，通过独立核实的 Pool Party 客服渠道提交。
  - title: 核实官方后续处置指引
    hint: 团队表示将公布复盘及受影响用户的处理方案。在连接钱包或签名之前，通过已知官方渠道核验后续指引。请保管好助记词。
  - title: 核实修复后再存入资金
    hint: 通过团队官方渠道确认所在网络及资金池。公告列出了已修复的网络，但未提供替换合约地址或可核实的部署交易。
sources:
  - name: Pool Party 事件帖串
    says: 团队关于攻击、损失估算、处置及修复的原始声明。直接访问返回 HTTP 403。
  - name: Pool Party 团队帖串的公开存档
    says: 可阅读的原始声明及团队后续帖文副本。
---

Pool Party 表示，用于记录用户仓位的快照合约存在漏洞，攻击者可借此篡改自己的仓位记录。团队称攻击者存入 10 USDC 后，即提走资金池资金。团队报告 Polygon 和 Robinhood Chain 上没有损失，并称四条链上的快照合约均已修复。声明未提供部署交易或独立核实结果。

团队将 `0x2075c17abbd077cf6406736bb7047ed446ab7f8f` 标为攻击者地址，称追踪到资金被兑换成 XMR，并已向执法机关和交易所报告。地址匹配本身不足以证明归属或失陷。公布的损失为估算，团队尚未披露已完成的追回或赔付。
