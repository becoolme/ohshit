---
title: Initia Rollup 基础设施失陷，伪造提现后暂停 L1
summary: Initia 称，攻击者使用失陷云凭据进入 Anvil，并使来自五个 Rollup 的伪造提现通过验证。约 327 万美元资产从 L1 托管账户转出，其中约 216 万美元在更新发布时仍位于暂停的链上。
splash: 持有五个受影响 Rollup 跨链资产的 Initia L1 托管账户及其下游集成。
wipe: 暂停受影响的跨链自动化并跟踪官方恢复。运营方应隔离受影响的配置流程并轮换暴露凭据。
inTheWildNote: Initia 确认未经授权的托管账户转账，并暂停 L1。
timeline:
- date: 11月9日 19:30 UTC
  title: Initia 通报 Rollup 基础设施异常
  body: 团队称 Rollup 已暂停，L1 当时仍在运行，团队尚未发现资金影响。
- date: 11月10日 06:18 UTC
  title: 验证者暂停 L1
  body: 团队发现未经授权的 IBC 托管账户转账后暂停 L1。
- date: 11月10日 16:43 UTC
  title: Initia 公布初步攻击链及资产数据
  body: 团队说明云与托管凭据、五个受影响的 Rollup、仍在 L1 上的余额及恢复计划。
checklist:
- title: 等待官方恢复期间暂停受影响的集成
  hint: 重试跨链充值、提现或队列转账前，核对 Initia 和相关 Rollup 的官方公告。保留交易哈希，等相关网络及通道恢复后比对记录。
- title: 排查 Rollup 配置和签名访问
  hint: 运营方应保留云 IAM、GitHub、Anvil 和 IBC 日志。盘点受影响的 GCP 服务账户及环境密钥，吊销暴露凭据，并在恢复转账前审计近期签名及托管账户活动。
- title: 通过官方渠道核实追回及补偿消息
  hint: 关注项目公布的方案，避开所谓补偿人员发送的链接。链暂停期间留存的余额无法证明资金已经返还。保护私钥及助记词。
sources:
- name: Initia 11 月 9 日公告公开副本
  says: 转载 Rollup 暂停及用户资金初步评估。
- name: Initia L1 暂停公告公开副本
  says: 转载验证者暂停时间及托管账户初步发现。
- name: Initia 技术更新公开副本
  says: 转载初步入侵链、托管资产流转、转出资产及恢复意向。
---

Initia 先发布 [Rollup 异常公告](https://x.com/initia/status/2119875372183703612)，随后发布 [L1 暂停公告](https://x.com/initia/status/2120050740626628972)。Initia 在[技术更新](https://x.com/initia/status/2120195620442910943)中称，涉及已失陷私有节点配置 GCP 密钥的命令注入暴露了环境变量。攻击者随后利用凭据进入 GitHub、GCP 及 Rollup 托管平台 Anvil。伪造提现解锁了 L1 IBC 托管资产。Initia 报告约 327 万美元转至攻击者的 L1 地址，约 216 万美元仍留在该地址及暂停的链上，转出资产包括 13,400 TIA、8,000 USDC.inj 和 597,000 Noble USDC。团队称攻击者未将 INIT 转出链外。

已转移价值、暂停链上留存资产、跨链转出以及未来补偿各有不同口径。Initia 计划恢复受影响资产的足额支持，并称正隔离重建相关基础设施。这些公告尚未公布最终追回金额或重启时间表。所述机制与 10 月的 MoveVM 事件不同。
