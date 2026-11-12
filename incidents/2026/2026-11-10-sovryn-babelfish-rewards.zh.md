---
title: Sovryn 确认 Rootstock 上 Babelfish 奖励库存遭提取
tags:
- Sovryn
- Babelfish
- Rootstock
- DeFi
summary: Sovryn 识别出 15 笔从 Babelfish 奖励库存提取 69,381.254896 XUSD 的交易。攻击者可在同一操作序列内制造并逆转失衡，同时保留奖励。受影响的铸造及赎回流程已暂停。
splash: Babelfish XUSD 转换及奖励库存。普通 XUSD 转账及授权不在遏制措施的暂停范围内。
wipe: 避免受影响的转换及替代界面，保留交易记录，并关注官方状态更新。
inTheWildNote: Sovryn 记录了 15 笔成功发放奖励的交易。
timeline:
- date: 2026年11月4日
  title: 奖励资金遭提取，项目实施遏制
  body: 已识别的奖励交易发生于 04:14:50 至 04:59:36 UTC。Babelfish 转换合约于 08:05:49 UTC 失去 XUSD 铸造及销毁权限。
- date: 2026年11月10日
  title: Sovryn 公布技术及恢复调查结果
  body: Sovryn 说明奖励计算漏洞、已识别金额和仍在执行的转换限制。
checklist:
- title: 遵守转换限制
  hint: 避免通过受影响的 Babelfish 合约铸造或赎回 XUSD，包括使用替代界面。集成方应保持相关路径停用，直至 Sovryn 公布经过验证的生产配置和受支持路径。普通 XUSD 转账及授权不在此暂停范围内。
- title: 保全记录并核实官方恢复公告
  hint: 保留交易 ID、余额和待处理转换记录。通过 Sovryn 官方 Discord 公告核对状态。项目尚未开放申领或迁移，请忽略来路不明的退款或迁移授权及助记词索取。
sources:
- says: 说明经济机制缺陷、15 笔已识别交易及奖励库存核算口径。
- says: 说明已验证的权限遏制措施、普通转账范围及尚待验证的生产修复。
---

奖励计算会对储备构成表面上的改善发放奖励。攻击者可先制造失衡，再逆转失衡并领取奖励。项目称，所检查交易中使用的 DOC 和 DLLR 本金均已归还。69,381.254896 XUSD 衡量的是这些交易从库存中提取的奖励。Sovryn 尚未公布最终未追回损失，仅凭这些证据也无法确认其余 XUSD 的储备存在等额缺口。

权限遏制措施移除了转换合约的 XUSD 铸造和销毁权限。Sovryn 已在本地测试关闭奖励的方案，生产变更仍待验证及批准。项目尚未核定 Babelfish 专属的追回金额，也未开放申领。此前的 [Rootstock 借贷及 AMM 攻击](/zh/incidents/sovryn-rootstock/)采用独立的对账口径。
