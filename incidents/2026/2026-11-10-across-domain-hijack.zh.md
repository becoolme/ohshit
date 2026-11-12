---
title: Across 域名遭劫持，访问者被引向钱包盗币脚本
summary: Across 称，针对注册商的社会工程攻击将其网站重定向到钱包盗币脚本。Bitquery 估计五条链上的九个钱包被提走约 34.8 万美元。Across 已重新控制域名，并承诺补偿受影响用户。
splash: 11 月 10 日在遭劫持的 Across 前端签署恶意授权或交易的访问者。
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
checklist:
- title: 核查每个连接过的钱包及网络
  hint: 使用可信钱包界面或 Across 公告指定的 Revoke.cash。逐链核对劫持期间的签名授权、批准及转账，立即撤销可疑支出授权。撤销授权无法撤回已完成转账。
- title: 保留证据并通过官方渠道报告
  hint: 保存钱包地址、时间、链名和交易哈希。通过公告所列经核实的 Across 账户主动联系。保护助记词及私钥，忽略主动上门的追回服务。
- title: 关联追踪指标
  hint: Bitquery 的地址记录列出 13 个钱包地址及两个交易哈希。报告所列收款地址对为 0x2846e69d3298e99eddf2fd8116e952844da11fde 和 0x0c7c656126aa62625fdd8051eb69dc14aee8d37b。完整地址和交易记录见下文。核对完整地址及事件日志，单独命中不能证明失陷。
sources:
- name: Across 初始公告公开副本
  says: 转载官方账户关于注册商、遏制及 API／集成范围的声明，并关联后续授权处置指引。
- name: Across 用户处置公告公开副本
  says: 列出授权检查工具、撤销指引及官方报告渠道。
- name: Across 恢复公告公开副本
  says: 转载团队关于恢复及补偿承诺的公告。
- name: Bitquery 原始链上调查
  says: 说明钱包关联、估值、费用钱包区别及研究限制。
---

官方[初始公告](https://x.com/AcrossProtocol/status/2120278803318489362)称，针对注册商的攻击使第三方控制了域名。Across 表示 API 及第三方集成用户不在受影响范围内，团队在遏制期间曾暂时关闭前端及 API。[恢复公告](https://x.com/AcrossProtocol/status/2120324818385912082)承诺全额补偿受影响用户。[用户处置公告](https://teapawt.org/AcrossProtocol/status/2120278805084295328)说明如何撤销授权及报告受影响钱包。公告尚未给出已完成的赔付或最终受害者总数。

Bitquery 在 Ethereum、Arbitrum、Base、BNB Chain 和 Optimism 上追踪到 19:02 至 21:53 UTC 的转账，按转账时估值约 34.8 万美元。估算依据共同的 80/20 分成，排除其数据或方法未覆盖的转账，美元金额也排除无报价代币。另一项 29.4 万美元的数据对应费用钱包余额，其中含更早的所得。这些金额无法确定受影响人数，也不足以证明跨链桥合约失陷。

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
3EQ9Rqrtvco4nKmskv2jQRXvWKkpUGfAQs
0x2610f11fd3cde7113f83e7137853972ba98d8360b3d91eed6d5807f947a8bd38
0x19c5460db37f5cc2bde6f8f644892a5348a1519d2aa97f720091e982134a8ae1
```
