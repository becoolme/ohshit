---
title: "Lighter 在一个交易账户的 API 密钥泄露后暂停提现"
summary: >-
  Lighter 暂停提现和创建资金池，并将事件归因于一个交易账户的 API 密钥泄露。Bitquery 追踪到一笔约 1,039 万 USDC 的提现。交易平台尚未确认总损失。
splash: "Lighter 指出的交易账户，以及受暂停提现和创建资金池影响的所有用户。"
wipe: "吊销可疑 API 密钥，审计账户活动，并通过 Lighter 官方渠道确认提现是否恢复。"
inTheWildNote: "Lighter 将事件归因于一个交易账户的 API 密钥泄露。"
timeline:
  - date: 2026年11月16日
    title: 一个钱包在以太坊上提取约 1,039 万 USDC
    body: Bitquery 追踪了这笔提现及随后兑换为 ETH 的交易。
  - date: 2026年11月16日
    title: Lighter 暂停提现和创建资金池
    body: 交易平台表示，调查指向一个遭入侵的外部方。
  - date: 2026年11月16日
    title: Lighter 确认 API 密钥泄露并启用 Guardian 模式
    body: 运营方将事件归因于一个交易账户，并表示协议和智能合约未受影响。
  - date: 11 月 16 日 18:31 UTC
    title: Lighter 恢复存款与提现
    body: Lighter 安全委员会关闭 Guardian 模式后，官方公告称存款及提现恢复正常。
checklist:
  - title: 吊销可疑 API 凭据并暂停受影响的自动交易
    hint: 通过 Lighter 的 API 密钥清单确定受影响的密钥。使用 Lighter 的 ChangePubKey 流程，经 L1 授权在原索引更换受影响的签名密钥。核实旧密钥已失效，无法使其失效时联系官方支持。单独吊销受影响的只读令牌，并更新交易机器人和密钥存储。
  - title: 审查账户和集成的活动记录
    hint: 保全成交、订单、转账、提现记录和相关机器人的日志。检查陌生活动和密钥变更，并通过官方渠道向 Lighter 报告可疑记录。
  - title: 确认服务恢复后再尝试提现
    hint: 查看 Lighter 官方更新。警惕未经请求发送的资产恢复链接，以及索要私钥或助记词的消息。
sources:
  - name: Lighter 存款与提现恢复公告
    says: 确认关闭 Guardian 模式后恢复存款与提现。
  - name: Lighter 初次通报
    says: 确认调查期间暂停提现和创建资金池。
  - name: Lighter 调查进展
    says: 指出一个交易账户的 API 密钥泄露，说明启用 Guardian 模式，并表示协议和智能合约未受影响。
  - name: Lighter API 密钥参考文档
    says: 说明如何查询 API 密钥，以及如何单独吊销只读令牌。
  - name: Lighter API 密钥接入指南
    says: 说明如何注册密钥，以及哪些请求还需要 L1 授权。
  - name: DeFi Prime 报道及 Lighter 公告链接
    says: 报道计划中的合约升级及提现恢复目标。
  - name: Bitquery 链上调查
    says: 追踪观察到的 USDC 提现和后续资金流向。该笔转账提供了可观察金额的证据。
---

Lighter 将事件归因于一个交易账户的 API 密钥泄露。运营方称启用智能合约的 Guardian 模式是预防措施。公告未说明密钥如何泄露、攻击者如何使用密钥，或该访问如何导致提现。Lighter 表示其协议和智能合约未受影响。运营方计划升级合约，目标是在 11 月 16 日恢复提现。后续官方公告确认存款与提现已恢复。

Lighter 文档说明，仅凭 API 密钥即可发起安全提现，将资金提回账户最初的 L1 地址。快速提现和转往其他 L1 所有者的转账还需要 L1 授权。运营方未说明此次事件使用了哪条路径。

Bitquery 追踪到一笔约 1,039 万 USDC 的以太坊提现，收款地址为 `0xb3fffca23d4444ee73349825acd84f7b5020e387`，随后资金被兑换为 ETH。其报告提供了交易和下游地址的链接。这笔提现的观测金额无法说明总损失。Lighter 在上述通报中未确认第二个交易账户受影响，也未公布总损失金额。

Lighter 于 11 月 16 日 18:31 UTC 公告，安全委员会关闭 Guardian 模式后，存款与提现已恢复。按实际账户及网络状态核对操作；该公告未说明资金追回总额或资金池创建是否恢复。
