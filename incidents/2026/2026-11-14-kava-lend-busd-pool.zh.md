---
title: Kava Lend 遭利用，协议借贷池中绝大部分 KAVA 被转出
tags: [Kava Lend, DeFi, 借贷池]
summary: Kava 称事件限于 Kava Lend。Bitquery 追踪到攻击者以虚增的 BUSD 抵押品反复借出 5,520 万枚 KAVA，并估计在 BNB Chain 上出售所得约为 210 万美元。
splash: Kava Lend 用户，尤其是出借 KAVA 的用户，以及转账依赖已暂停服务的交易所或 Axelar 跨链桥的用户。
wipe: 暂停在 Kava Lend 新增存款或借款，记录现有仓位，跨链转账前查看官方公告。
inTheWildNote: Kava 确认事件。Bitquery 追踪了借款和后续出售。
timeline:
- date: 11月14日 04:04–05:42 UTC
  title: Bitquery 追踪到反复借款和清算
  body: 两个钱包利用 BUSD 池虚增抵押品，经 127 笔贷款借出约 5,520 万枚 KAVA。
- date: 2026年11月14日
  title: Kava 确认事件限于 Kava Lend
  body: Kava 确认 KAVA 被跨链转至 BNB Chain 并售出，排除无限增发。合作交易所暂停充值和提现。
- date: 2026年11月14日
  title: Kava 出于预防暂停 Axelar 提现
  body: Kava 暂停跨链桥，表示将发布完整事件报告。追踪到的出售路径经由 LayerZero。
- date: 11月14日 16:20 UTC
  title: Bitquery 观测到一笔失败的 Relay 订单
  body: Relay 记录显示一笔 612,416 USDT 的订单被拦截，未向收款方出款。记录显示款项可能退回发送方。Kava 或用户是否追回资金仍待核实。
checklist:
- title: 暂停新增风险敞口并记录现有仓位
  hint: 在 Kava 官方应用核对存款、债务、抵押品和提现记录，保存相关钱包地址、交易哈希和时间。新增仓位或执行资产追回指引前，先查看 Kava 官方事件更新。
- title: 发起转账前检查对应线路
  hint: 查阅交易所的 KAVA 充值提现公告，核对拟使用的跨链桥状态。Kava 已暂停 Axelar 提现。已发起的转账请通过官方客服查询，忽略主动发来的资产追回邀约。
- title: 关联疑似利用交易
  hint: 先核对 Kava 钱包 kava1uzx5924cqsutcw365ajs8kkc3rr4vtlyzms255 和 kava1v2s266sll8ca5xrs06swmsc00nwwt7u77eufk4，以及 BNB Chain 上的出售地址 0x37d732914f86cc6eb1e87419e3046a739f011042。其余角色和路径见 Bitquery 完整清单，共 22 项，含地址、交易哈希及 Relay 订单编号。核对网络、时间和角色，单一命中不能证明归属或失陷。
sources:
- name: Kava 的范围更新（X 官方公开嵌入）
  says: 确认事件限于 Kava Lend，说明发生跨链和出售，并排除无限增发。
- name: Kava 的 Axelar 更新（X 官方公开嵌入）
  says: 报告作为预防措施暂停 Axelar 提现，并表示将发布完整报告。
- name: Bitquery 的 Kava Lend 调查
  says: 还原反复借款和清算、出售所得及失败的 Relay 订单，并列出带角色的地址和交易。
- name: The Block 的事件还原
  says: 审查链上数据，链接相关源代码，并转述 Kava 对交易所采取的预防措施。
---

Bitquery 发现，攻击者让接近空池的 BUSD 市场在计息时除以一个极小的正供应量，导致供应指数在三分钟内增长约 24.3 万倍。第一个钱包把池中可用的 BUSD 循环存入第二个钱包的账户作为抵押品。第二个钱包据此借出 KAVA。第一个钱包提走可用 BUSD 后，反复触发的清算虽几乎拿不到或完全拿不到 BUSD，仍结清了债务。这是 Bitquery 的还原，Kava 的技术结论和任何修复版本仍待公布。

Bitquery 估计，两个钱包通过 127 笔贷款 **借出 5,520 万枚 KAVA**，代其他借款人还款后 **保留 5,390 万枚 KAVA**，按出售前的价格约值 **370 万美元**。约 **210 万美元** 是在 BNB Chain 上的出售所得。被 Relay 拦截的 **612,416 USDT** 订单属于这些追踪到的出售所得。查阅的来源中，Kava 尚未公布最终损失或偿付金额。

Kava 将 Axelar 暂停视为预防措施。研究还原的出售资产经 LayerZero 跨链。跨链桥暂停本身无法说明利用路径或客户余额状态。
