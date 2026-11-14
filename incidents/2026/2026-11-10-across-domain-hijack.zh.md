---
title: Across 域名遭劫持，访问者被引向钱包盗币脚本
summary: Across 称，针对注册商的社会工程攻击将其网站重定向到钱包盗币脚本。Bitquery 将五条链上九个钱包的盗币估算从约 34.8 万美元上调至约 40.2 万美元。Across 已重新控制域名，并承诺补偿受影响用户。
splash: 11 月 10 日在遭劫持的 Across 前端连接钱包或签署授权、消息或交易的访问者。
wipe: 通过可信钱包界面逐链撤销可疑授权，并向 Across 报告交易哈希。
inTheWildNote: Across 确认域名遭劫持。Bitquery 追踪了与钓鱼窗口相关的转账。
timeline:
- date: 11月10日 22:13 UTC
  title: Across 通报注册商账户相关域名劫持
  body: Across 将劫持时间定为约 18:45 UTC。团队称网站被标为钓鱼后，Cloudflare 移除了 DNS 记录。
- date: 11月11日 01:16 UTC
  title: Across 确认服务恢复
  body: 团队称已重新控制域名，承诺补偿，并计划发布复盘。
- date: 2026年11月11日
  title: Bitquery 核验追踪数据
  body: 研究机构依据时间及相同的收款分成方式，将约 34.8 万美元与九个钱包关联。
- date: 2026年11月12日
  title: Bitquery 将盗币估算上调至约 40.2 万美元
  body: 研究机构纳入了先前遗漏的 26.38 ETH 转账，按转账时估值约 5.4 万美元。它来自已计入的一个钱包。
checklist:
- title: 核查每个连接过的钱包及网络
  hint: 直接打开 Revoke.cash 并载入用于 Across 的钱包。逐链选择网络，按下列支出地址搜索，检查直接授权及 Permit2 额度。撤销匹配项目，用各链的 Gas 代币确认链上交易，再核实额度归零或消失。已签署但未提交的许可可能不可见。Across 建议在事发期间签过名的用户撤销可见授权后，将剩余资产转至新钱包。直接转账无法撤回。
- title: 保留证据并通过官方渠道报告
  hint: 保存钱包地址、时间、链名和交易哈希。通过公告所列经核实的 Across 账户主动联系。保护助记词及私钥，忽略主动上门的追回服务。
- title: 关联追踪指标
  hint: Bitquery 的地址记录列出 15 个钱包地址及三个交易哈希。报告所列收款地址对为 0x2846e69d3298e99eddf2fd8116e952844da11fde 和 0x0c7c656126aa62625fdd8051eb69dc14aee8d37b。完整地址和交易记录见下文。核对完整地址及事件日志，单独命中不能证明失陷。
sources:
- name: Across 初始公告公开副本
  says: 转载官方账户关于注册商、遏制及 API／集成范围的声明，并关联后续授权处置指引。
- name: Across 用户处置公告公开副本
  says: 列出授权检查工具、撤销指引及官方报告渠道。
- name: Across 钱包恢复详细指南
  says: 列出支出合约、收款地址、Permit2 排查方法及撤销验证步骤。
- name: Across 恢复公告公开副本
  says: 转载团队关于恢复及补偿承诺的公告。
- name: Bitquery 原始链上调查
  says: 说明钱包关联、估值、费用钱包区别及研究限制，并记录 11 月 12 日新增追踪的 ETH 转账。
---

官方[初始公告](https://x.com/AcrossProtocol/status/2120278803318489362)称，针对注册商的攻击使第三方控制了域名。Across 表示 API 及第三方集成用户不在受影响范围内，团队在遏制期间曾暂时关闭前端及 API。[恢复公告](https://x.com/AcrossProtocol/status/2120324818385912082)承诺全额补偿受影响用户。[用户处置公告](https://teapawt.org/AcrossProtocol/status/2120278805084295328)说明如何撤销授权及报告受影响钱包。公告尚未给出已完成的赔付或最终受害者总数。

Bitquery 最初在 Ethereum、Arbitrum、Base、BNB Chain 和 Optimism 上追踪到 19:02 至 21:53 UTC 的转账，按转账时估值约 34.8 万美元。估算依据共同的 80/20 分成，排除其数据或方法未覆盖的转账，美元金额也排除无报价代币。另一项 29.4 万美元的数据对应费用钱包余额，其中含更早的所得。这些金额无法确定受影响人数，也不足以证明跨链桥合约失陷。

**11 月 12 日修订。** Bitquery 把先前遗漏的 26.38 ETH（约 5.4 万美元）计入后，将估算上调至 401,900 美元。转账来自原已统计的钱包。归集地址留存 5%，后续付款地址约十分钟后向主收款地址转入 20.95 ETH。付款地址原已持有 11.8 ETH，无法逐笔对应受害钱包转出的 ETH。研究机构根据资金路径与原转账的交集进行归因，涉及的钱包及网络数仍为九个和五条。估算按转账时计价，未包括无市场报价的代币，赔付进展仍待核实。

Bitquery 列出的地址及交易哈希，按报告顺序排列。地址包括下游服务，用于关联排查。

```text
0x2846e69d3298e99eddf2fd8116e952844da11fde
0x0c7c656126aa62625fdd8051eb69dc14aee8d37b
0x38d7e8b3c9561caf096c06c62c7561f8ab6e514c
0xa490cde73adcd40475025ee8710f3a5ab7393194
0xf10a482fbc02195f2dafca5d9dfd19c871b0f4a5
0x0f67a21780699bb5c5e6b5f986c0bab26bfffe5c
0x09360fe2e18fdfa49beb7592b9f24f94c5465533
0xf229f808fe21911f8bcc24ebb30a85bd2e4c00f0
G47n6dbUor1WFweLvKPrUi5beW4yjRoFG3cJZU6a4uSa
2K7fueB3tqYBb5Z2Ubnnpf2rF3sJr1fJDKXtsocTAWmk
5HQZd9ovzAF1TLnHRAq1zcSnXC9HAp3EwhoxMHvo8rxB
0xbca05d20dbb271fd607e69fdc8d955be3bfc8120
0x3ef438c34ce51a697a24247fe033c4562c94f0fd
0xa0e6c7d79b74d1a6d366dd11309b6faafda05ac5
3EQ9Rqrtvco4nKmskv2jQRXvWKkpUGfAQs
0x2610f11fd3cde7113f83e7137853972ba98d8360b3d91eed6d5807f947a8bd38
0xdd40b19abb1a00862aa443dc1d674b80c08a9b084094236bffce747243ad7f0e
0x19c5460db37f5cc2bde6f8f644892a5348a1519d2aa97f720091e982134a8ae1
```

以下为 Across 钱包恢复指南按网络列出的支出地址。指南称同一地址也可能用于其他链。Ink 需检查 Permit2 额度，BNB Chain 需同时检查直接授权和 Permit2 额度。

```text
Ethereum  0x46a2a474d4c22bf1ae4f8fa55da7a58673472be2
Ethereum  0xdbd7fbe5b7cd56f99c059dc24052009d2626125c
Base  0x5ff35703c22533398d5c7ce7acd32a04ac8462da
Arbitrum  0x2ff67cddd9ff45e0b47957d9d7c19b0732f9c514
Arbitrum  0x373c415ef034bb620e8d720afd2ace26bca13529
Ink  0xdcd65e3a8f3b73c7e2f40dbab1fb95dbef871d6c
Plasma  0x3ef438c34ce51a697a24247fe033c4562c94f0fd
BNB Chain  0x0c894c253c62eda066197011efd73b632dc96263

Across 列出的收款地址
0x2846e69d3298e99eddf2fd8116e952844da11fde
0x0c7c656126aa62625fdd8051eb69dc14aee8d37b
0x3ef438c34ce51a697a24247fe033c4562c94f0fd
0xa0e6c7d79b74d1a6d366dd11309b6faafda05ac5

用于识别授权类型的 Permit2 合约
0x000000000022d473030f116ddee9f6b43ac78ba3
```
