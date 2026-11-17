---
title: MORE Markets 清算漏洞导致 Flow EVM 上的 WFLOW 储备被抽走
tags: [MORE Markets, Flow EVM, DeFi]
summary: Blockaid 发现 MORE Markets 的 ankrFLOW/WFLOW 借贷市场遭利用，估计约有价值 30.8 万美元的 WFLOW 从储备转出。MORE Markets 已暂停协议。Flow 表示底层网络继续正常运行。
splash: 在 Flow EVM 上受影响的 MORE Markets ankrFLOW/WFLOW 市场中提供 WFLOW 的用户。
wipe: 保存仓位和交易记录，交互前核对官方状态，并核实任何资产追回指引。
inTheWildNote: Blockaid 追踪到攻击，MORE Markets 确认已暂停协议。
timeline:
- date: 2026年11月16日
  title: Blockaid 发现 WFLOW 储备被抽走
  body: Blockaid 报告称，攻击者在 ankrFLOW/WFLOW 市场使用闪电贷并自行清算仓位，告警发布时估计约有价值 30.8 万美元的 WFLOW 被转出。
- date: 2026年11月16日
  title: MORE Markets 暂停协议
  body: 项目方确认安全委员会已暂停协议，随后表示调查期间 AnkrFLOW 协议也已暂停。
- date: 2026年11月16日
  title: Flow 将攻击归因于 MORE Markets 借贷合约漏洞
  body: Flow 表示底层网络、Flow EVM 和 Cadence 继续正常运行。
checklist:
- title: 保存受影响仓位记录并等待官方指引
  hint: 在无需签名的情况下保存相关钱包地址、存款和仓位记录、交易哈希及时间。与任一已暂停协议交互前，先查阅 MORE Markets 和 Ankr 的官方渠道，确认是否有资产追回流程。忽略主动发送的退款或追回链接。
- title: 将可疑活动与受影响储备关联
  hint: 在 Flow EVM 上核对报告所列的攻击者地址 0xe1eA6F2365215389f9DCd50a51c974313BF6785C、示例交易 0xdf9e3ed4858103569f684166d9833e1980b6ba96334c9a8ec172b4e2aa1d15d8、资金池 0xbC92aaC2DBBF42215248B5688eB3D3d2b32F2c8d 和金库 0x02BF4bd075c1b7C8D85F54777eaAA3638135c059。仅凭命中不能证明钱包失陷。
sources:
- name: Blockaid 原始告警（X 公开嵌入）
  says: 说明自行清算的攻击路径及当时对转出金额的估算。
- name: Blockaid 链上指标（X 公开嵌入）
  says: 链接报告所列的攻击者、示例交易、受影响资金池和金库。
- name: MORE Markets 暂停公告（X 公开嵌入）
  says: 确认安全委员会已暂停协议。
- name: MORE Markets 后续公告（X 公开嵌入）
  says: 确认 MORE Markets 和 AnkrFLOW 均已暂停，双方团队正在协作。
- name: Flow 事件公告（X 公开嵌入）
  says: 将攻击归因于借贷应用，并说明底层网络运行状态。
---

Blockaid 表示，攻击者使用闪电贷，并利用市场的 e-mode 建立后自行清算 ankrFLOW/WFLOW 仓位。这样留下了缺少对应抵押品的 WFLOW 债务，使攻击者得以抽走市场储备中的 WFLOW。Flow 将事件归因于 MORE Markets 的借贷合约，底层 Flow 网络保持运行。

Blockaid 给出的约 30.8 万美元是对当时从储备转出金额的估算，无法据此确定存款人最终损失、实际套现金额或用户可追回多少。MORE Markets 称自身协议和 AnkrFLOW 均已暂停。已核查的来源尚未确认最终恢复方案或修复版部署。
