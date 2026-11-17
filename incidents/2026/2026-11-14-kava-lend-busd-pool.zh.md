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
- date: 2026年11月16日
  title: Kava 确认盗取量并公布治理计划
  body: Kava 确认约 5,390 万枚 KAVA 被取走，已封堵利用路径，部分资金已冻结。永久停止新增借贷仍需治理投票。
- date: 11月16日 18:29 UTC
  title: 第 223 号治理提案进入投票
  body: 提案将把 Kava Lend 现有市场的借款上限全部设为零，并将最低借款参数恢复为 10 美元，以便现有借款人按常规最低债务规则部分还款。
checklist:
- title: 暂停新增风险敞口并记录现有仓位
  hint: 在 Kava 官方应用核对存款、债务、抵押品和提现记录，保存相关钱包地址、交易哈希和时间。新增仓位或执行资产追回指引前，先查看 Kava 官方事件更新。
- title: 发起转账前检查对应线路
  hint: 查阅交易所的 KAVA 充值提现公告，核对拟使用的跨链桥状态。Kava 已暂停 Axelar 提现。已发起的转账请通过官方客服查询，忽略主动发来的资产追回邀约。
- title: 关联疑似利用交易
  hint: 先核对 Kava 钱包 kava1uzx5924cqsutcw365ajs8kkc3rr4vtlyzms255 和 kava1v2s266sll8ca5xrs06swmsc00nwwt7u77eufk4，以及 BNB Chain 上的出售地址 0x37d732914f86cc6eb1e87419e3046a739f011042。其余角色和路径见 Bitquery 完整清单，共 22 项，含地址、交易哈希及 Relay 订单编号。核对网络、时间和角色，单一命中不能证明归属或失陷。
- title: 按提案变动采取行动前，核实链上投票
  hint: 查阅第 223 号提案，核实投票状态和市场现行参数。投票预计于 11 月 23 日 18:29 UTC 结束。现有仓位的还款和后续退出步骤请以官方指引为准。
sources:
- name: Kava 的范围更新（X 官方公开嵌入）
  says: 确认事件限于 Kava Lend，说明发生跨链和出售，并排除无限增发。
- name: Kava 的 Axelar 更新（X 官方公开嵌入）
  says: 报告作为预防措施暂停 Axelar 提现，并表示将发布完整报告。
- name: Bitquery 的 Kava Lend 调查
  says: 还原反复借款和清算、出售所得及失败的 Relay 订单，并列出带角色的地址和交易。
- name: The Block 的事件还原
  says: 审查链上数据，链接相关源代码，并转述 Kava 对交易所采取的预防措施。
- name: Kava 11 月 16 日遏制和恢复报告
  says: 核实盗取量、跨链量、部分冻结及治理提案计划。
- name: Kava 链上第 223 号治理提案记录
  says: 记录投票时间及对借款上限和最低借款参数的可执行变更。
---

Bitquery 发现，攻击者让接近空池的 BUSD 市场在计息时除以一个极小的正供应量，导致供应指数在三分钟内增长约 24.3 万倍。第一个钱包把池中可用的 BUSD 循环存入第二个钱包的账户作为抵押品。第二个钱包据此借出 KAVA。第一个钱包提走可用 BUSD 后，反复触发的清算虽几乎拿不到或完全拿不到 BUSD，仍结清了债务。这是 Bitquery 的还原，Kava 随后确认了借贷记账漏洞，并表示已封堵利用路径。

Bitquery 估计，两个钱包通过 127 笔贷款 **借出 5,520 万枚 KAVA**，代其他借款人还款后 **保留 5,390 万枚 KAVA**，按出售前的价格约值 **370 万美元**。约 **210 万美元** 是在 BNB Chain 上的出售所得。被 Relay 拦截的 **612,416 USDT** 订单属于这些追踪到的出售所得。Kava 随后确认了被取走的数量，最终偿付金额仍待确认。

Kava 将 Axelar 暂停视为预防措施。研究还原的出售资产经 LayerZero 跨链。跨链桥暂停本身无法说明利用路径或客户余额状态。

Kava 确认约 4,920 万枚 KAVA 经 LayerZero 跨链到 BNB Chain，底层 Kava 链继续运行，事件没有铸造新的 KAVA。已冻结资金的数量和实际赔付仍待确认。项目拟经七天治理投票永久停止新增借贷，现有头寸的处理办法将另行公布。链上第 223 号提案只涉及冻结现有市场的新增借款，并将最低借款参数恢复为 10 美元。提案正在投票，内容未关闭存款，也未确定赔付。现有仓位的处置请以官方治理和恢复通知为准。
