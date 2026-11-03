---
title: Troves 确认 xWBTC/WBTC 金库遭攻击，暂停三个金库
tags:
- Troves
- Starknet
- DeFi
summary: Troves 报告 Starknet 上 xWBTC/WBTC 金库初步损失约 8.6 枚 BTC，称已撤销旧合约及 LST 再平衡权限并暂停三个金库。目前未发现其他金库受影响；最终复盘和资金追回仍待确认。
splash: Starknet 上 Troves xWBTC/WBTC 存款人；xSTRK/STRK 和 xstrkBTC/strkBTC 也被预防性暂停
wipe: 避免向暂停的金库新增存款，保存持仓记录并关注经核实的 Troves 更新
inTheWildNote: Troves 确认发生攻击及初步损失，并非仅有原因不明的转账。
cves: []
fixed: []
timeline:
- date: 2026年10月31日
  title: Troves 确认金库遭攻击，初步损失约 8.6 枚 BTC
- date: 10月31日 14:49 UTC
  title: 追回钱包的链上交易记录赏金条款
  body: 链上消息提出，11月3日 23:59 UTC 前归还剩余资产或等值 ETH，可保留 1 WBTC 赏金。提议不代表资金已归还，也不构成法律豁免。
- date: 2026年10月31日
  title: 运营方报告撤销权限、暂停三个金库并提出追回赏金
  body: 可读帖文称约 40 分钟内撤销权限，并提出 1 WBTC 赏金；嵌入副本未显示完整条件。
checklist:
- title: 避免增加对暂停金库的敞口
  hint: 通过 Troves 既有官方渠道核查 xWBTC/WBTC、xSTRK/STRK 和 xstrkBTC/strkBTC 的状态。其他金库被暂停属于预防措施，不代表也遭盗取。此处尚无经核实的安全重开或存款人退出流程。
- title: 保存记录，拒绝冒充资产追回的消息
  hint: 保留金库地址、份额余额及交易哈希。不要向陌生追回联系人转账、提供助记词或提交新签名。1 WBTC 提议针对被盗资产追回，不是存款人的申领费用，也不代表已退款。
- title: 核对公开的交易和地址清单
  hint: Panda Security 列出的 Starknet 攻击交易为 0x0634307777205294f636d481808a7b9a9e208415a26dd19c8ada269b9332e330；发送者 0x42dc2ebccae3e55ce3747d2974c801fb3e0facf8d7f4810012a0986a89da5e3；辅助合约 0x13705ea5f9e591ff6ffe3926bf22fceb19317c049838de09750a60259d38c72；金库 0x2ea99b4971d3c277fa4a9b4beb7d4d7d169e683393a29eef263d5d57b4380a；WBTC 代币 0x3fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac；以及 Ethereum 追回地址 0x91926046e148c66869d71B9Fa37306e82DDc8934。这些地址角色不同：金库、代币及追回地址不是攻击者账户。比对留存的交易记录；单独匹配不能证明遭入侵或损失。不要根据此清单支付任何追回费用。
- title: 停用合约时撤销权限
  hint: 协议团队应在升级时枚举实际特权角色，撤销被替换合约的权限，并在恢复服务前验证结果。Panda Security 描述旧再平衡合约仍保有权限；其示例 Solidity 代码不是被利用的 Cairo 代码。
sources:
- name: Troves 事件声明的官方公开嵌入副本
  says: 可读开头确认 10 月 31 日遭攻击、初步损失及暂定范围；后文被截断。
- name: Troves 遏制进展的官方公开嵌入副本
  says: 可读开头报告撤销权限及全部三个暂停金库；后文被截断。
- name: Troves 范围澄清的官方公开嵌入副本
  says: 完整澄清保留初步损失口径，并承诺发布经核实的更新和复盘。
- name: Troves 追回提议的官方公开嵌入副本
  says: 可读开头确认提出 1 WBTC 追回赏金；完整条款及追回钱包链接被截断。
- name: Panda Security 原始交易分析
  says: 研究人员称读取了 Starknet 交易收据及转账事件，公布六项清单，并区分观察到的转账与运营方损失估算。
- name: Ethereum 上追回钱包发出的赏金消息
  says: 可读交易输入来自 Panda Security 此前识别的追回地址；载明条款、期限及联系渠道，并非已完成追回。
---

Panda Security 将攻击路径归因于已退役但仍拥有金库权限的再平衡合约。其收据分析称所查交易约有 6.32 WBTC 到达发送者；这并非对运营方约 8.6 枚 BTC 损失估算的完整核算。研究人员尚未确认具体漏洞函数及旧再平衡合约地址。厂商声明说明已采取遏制措施，不代表审计或赔付已完成。


**11月3日来源更新：** 此前无法读取的 [Ethereum 交易](https://etherscan.io/tx/0x6145fc3f07c0c8b903e6daf83e3b1465cad2636c4b04449cac82714347e259e9) 现已可读，包括输入数据。交易于 10月31日 14:49:59 UTC 从 0x91926046e148c66869d71B9Fa37306e82DDc8934 发出，即 Panda Security 分析中此前识别的追回地址。消息提出，在 2026年11月3日 23:59 UTC 前，将剩余资金扣除 1 WBTC 后归还，或归还等值 ETH，至该地址。联系渠道包括 Blockscan Chat、向该地址发链上回复，以及 security@troves.fi，并表示可讨论保密及法律保证。这些只是消息中的条款，不是已确立的法律豁免或还款证据。原始公开赏金短帖可印证 1 WBTC 提议；单靠此消息不能核验最终损失、更多钱包归属或已完成赔付。存款人不应为申领该赏金转账或签署新授权。
