---
title: 伪造回执解锁 Ankr 以太坊跨链桥资产
summary: 慢雾报告，五张伪造回执带有有效的跨链桥签名，并引用同一笔较早的 Optimism 充值。以太坊合约付出五种代币。慢雾估计金额约为 30.45 万美元。签名的取得方式仍在调查。
splash: Ankr 以太坊跨链桥托管账户，以及依赖该提现路径的集成。
wipe: 暂停可控制的受影响路径，保留签名方和跨链桥记录，并对照源链事件核验提现。
inTheWildNote: 慢雾与 OAK 报告了五笔链上提现。签名密钥是否暴露尚未确认。
timeline:
- date: 11月9日 08:09 UTC
  title: 以太坊跨链桥开始按伪造回执付款
  body: OAK 追踪到 08:09:35 至 08:11:59 UTC 向同一收款地址支付的五笔提现。
- date: 11月9日 09:14 UTC
  title: 慢雾公布初步分析
  body: 研究人员估计金额约为 30.45 万美元，并指出重复引用的 Optimism 交易及带签名的回执。
- date: 2026年11月10日
  title: OAK 追踪以太坊资金流
  body: 其独立交易追踪佐证五笔资产释放。
checklist:
- title: 遏制跨链路径并核对源链事件
  hint: 若运营受影响路径，暂停或隔离可控制的提现。保留中继、签名方及合约日志。恢复前逐笔核对回执的收款方、代币、金额及唯一源链事件。调查签名生成过程，如确认密钥失陷则进行轮换。
- title: 核查已公布交易及地址记录
  hint: OAK 列出 12 条已追踪转账，以及源事件和相关地址。核对完整地址 0x9A88Dd45AE846A979705c9cFdfD0f229e592D703, 0x119D250b82C1cf5345dF5912EFb4B1a4107a1Aa6, 0xc437DF90B37C1db6657339E31BfE54627f0e7181, 0x881d40237659c251811cec9c364ef91dc08d300c, 0x92b2a947551d780f94dda2ef7ec566accdbd796d, 0xd90e2f925da726b50c4ed8d0fb90ad053324f31b, 0x8290333cef9e6d528dd5618fb97a76f268f3edd4, 0x9846c1f06d2f0e7c4678aeea56eb826efe41bb9a。完整交易哈希见下文。OAK 指出，0x92bb1f958a8aeb971227fba643b18cee5abd796d 是用于伪造零金额事件的仿冒地址。共享路由也用于正常业务，单独命中不能证明失陷。
- title: 跨链前核实运营方公告
  hint: 提交或重试受影响路径的转账前，核对 Ankr 官方渠道。保留已有交易哈希，向运营方核实状态。忽略主动发来的退款链接。
sources:
- name: 慢雾原始技术预警公开副本
  says: 说明伪造回执、有效签名、被重复引用的源链交易及金额估算。
- name: OAK 原始交易追踪
  says: 佐证五笔以太坊提现，并说明证据范围。
---

慢雾的[原始预警](https://x.com/SlowMist_Team/status/2119720284093890615)称，跨链桥接受了五张引用同一笔合法 Optimism 交易、但更改收款方、代币及金额的回执。这些回执带有有效的共识签名。OAK 追踪到 ankrETH、ANKR、ankrMATIC、aPOLb 和 aETHb 五种代币被提至同一地址。美元金额为慢雾估算。OAK 追踪佐证了交易，尚不足以确定最终净损失或证明签名密钥被盗。已核阅资料尚未确认厂商修复、暂停或赔付方案。

公开交易哈希。第一条为伪造回执重复引用的合法 Optimism 源链事件。

```text
0x02e805b51beb4ed39e6a66ffcbdf9060cf008b3c3f0e827d0d357dfa115e7d4a
0x139e3e30b2993b96aec206e168d299d1678cf05a57c58d90593cf6c7b5f6d3e8
0x7310af5d53e08259915bc3547daf343d188b9c36db8dd6b3ff3b5e70565e88df
0x90c563360cc343a640721662abe762e9ab9665aee0c22820b1656ff23bcfc891
0xde2d5b455c0071698fec9c23a9c50f9ecdfd8efa96b4fbb48ed0620bd4c29b5c
0x91ba1a9c81a1bb67ce7a2779d5b2de54b7aece166f67d9e3a31e29e4e13c2886
0x46e20d4c8cd43dece94f7a2a890a348fefcb0dc8310279658c8f836e758bdad0
0x05f3d8109ca5bbc9e4d51697667ba9013dac5a476f1e2c6e695fffdfa2f0368c
0x560715bdd7f6eb59907395f6c6b519c489c2e7d1a13a22580079866a8c0799a8
0x393524106e749e57086c5b67e27cdbfabad4b30087dbe85c11e5b11099ff6bf3
0xfb4288a47f0146a534c17480b9eca017994fa587c25f022b051abb70c8e38e53
0x604820e86bc0eff1c85f4cbc2a4cc34d0c17f7254903e8623776359a8e042b90
```
