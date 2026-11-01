---
title: Blockaid 警告多个加密网站分发 Step Drainer，Flap 确认 DNS 攻击
tags: [Step Drainer, DNS, 加密货币]
summary: Blockaid 警告 12 个加密站点分发 Step Drainer。Flap 确认 DNS 劫持；Flap 和 Kintsu 称网站已恢复。Bitquery 估计六条链上被盗 202,386 美元，不含 Solana/Aptos。注册商根因及全面恢复仍未确认。
splash: 与受影响加密前端交互的访问者，尤其是被要求签署交易或授权的钱包
wipe: 避开受影响前端及签名提示，通过可信钱包工具检查此前交互
inTheWildNote: Blockaid 报告正在分发盗币程序，不代表每位访问者均已遭成功盗窃。
cves: []
fixed: []
timeline:
  - date: 2026年10月31日
    title: Blockaid 预警 Flap 和 Kintsu，随后列出另十个站点
  - date: 2026年10月31日
    title: Flap 确认 DNS 攻击并宣布迁移域名
  - date: 2026年10月31日
    title: Kintsu 警告注册商 DNS 劫持，随后称网站已恢复
    body: 项目仍在调查根因，并要求受影响用户撤销授权及转移资金。
  - date: 2026年10月31日
    title: Flap 宣布官网及备用域名恢复访问
    body: 这是 Flap 的恢复声明，不能证明其他受影响站点也已恢复。
  - date: 2026年10月31日
    title: Bitquery 发布跨链损失估计
    body: 统计包含损失至少 1 美元的 32 个钱包；不含 Solana 和 Aptos，并非整个攻击活动的最终总额。
checklist:
  - title: 停止与受影响前端交互
    hint: Blockaid 两份原帖的完整清单为 flap[.]sh、kintsu[.]xyz、stonkfun[.]xyz、pickle[.]finance、echelon[.]market、origami[.]finance、fluxbeam[.]xyz、stakepoint[.]app、supswap[.]xyz、longbow[.]cash、shprd[.]finance 和 apexdefi[.]xyz。检查浏览及钱包历史；仅域名匹配不能证明失陷。Flap 最初要求使用 flap.cool，避开 flap.sh，即使后者会重定向；随后宣布两个入口恢复。重新访问前，通过各项目既有官方渠道核实当前公告；Kintsu 另称真实网站已恢复，但仍在与注册商调查，要求保持谨慎。两者的声明均不能为其他列出的域名解除警报。
  - title: 检查已签署的内容
    hint: 通过可信钱包或区块浏览器检查授权及交易，使用可信界面撤销可疑权限，不要使用受影响网站的资产追回提示。Kintsu 要求自 10 月 31 日约 00:00 UTC 起曾连接或签名的用户撤销授权及转移资金。通过已知地址独立打开授权撤销工具，并向项目核实任何迁移指引。保留交易哈希供支持人员核查。仅连接钱包不代表已转出资产或泄露助记词；不要向所谓资产追回人员提供助记词。
  - title: 检查权限及研究的完整参考清单
    hint: 检查 10 月 30—31 日使用的所有链上授权、Morpho 账户管理权限，以及 Monad 上 Kintsu、Neverland 和 Uniswap 的仓位。Bitquery 列出 13 项带角色的参考记录：55% 分账 0x012f89ff307568f8409bbe379ca92ed41bc4d386；30% 分账 0x7bf2037264efbff55bd52777772779c1d9e87695；15% 分账 0x5aff449b63c033df386af0c45384cd20c5918dbf；BNB 归集 0x24497068ca4166ca32a04ae530ce00cf79755bd5；Robinhood 归集 0x2323a3d19c6181b0e854209f405e6fdef6ad821d；Robinhood Morpho 合约 0x40ea475e8b31fb8e86b9bd23b986d6e09cdadf7b；Ethereum 归集 0x323719352ab49d3c8420f01e864fc115734ab956；Ethereum 归集控制地址 0x7461a0c63caf04828778c6dd838bc9506b3c74dc；Robinhood 合约控制地址 0xafb51dfeee427bf49b28ded45f8aac8881ccf448；Morpho 交易 0x33c529d75e195b27931a15285cb703575ff172163715c7c01785cc44d7c4e568；BNB 分账交易 0x39b36904796f53ca801bbd393ba09b1169fe3b87462719a177efde2e30967379；未关联、被排除交易的 80% 接收地址 0x984dd03a4219062c4e4c2db38d31535656b5cd91；Kintsu sMON 合约，并非攻击者钱包 0xa3227c5969757783154c60bf0bc1944180ed81b9。核对角色及链；匹配本身不能证明失陷。其中一项接收地址属于被排除且未关联的交易，sMON 地址是正常合约。完整交易历史见来源。
sources:
  - name: Blockaid 原始 Flap 和 Kintsu 预警
  - name: Blockaid 扩大的 Step Drainer 域名清单
  - name: Flap 原始 DNS 调查及迁移更新
  - name: Flap 原始恢复公告
    says: 可读的公开嵌入内容宣布官网及备用域名恢复访问。
  - name: Kintsu 原始警告的公开嵌入副本
    says: 可读开头将 DNS 劫持归因于注册商，并给出约计交互时段、授权及资金指引；结尾被截断。
  - name: Kintsu 原始恢复更新的公开嵌入副本
    says: 完整帖子称真实网站已恢复，仍在与注册商调查根因。
  - name: Bitquery 原始跨链调查
    says: 截至 10 月 31 日 18:30 UTC 的交易分析估计；网站按链及代币推断，未确认注册商根因。
---

Blockaid 将另十个站点与最初预警归为同一攻击。Flap 仍在调查域名服务商是否涉事，不能据此认定存在共同注册商或托管服务商入侵。最初 L3 评级反映恶意分发、后果尚未量化；下述研究观察到钱包被盗，支持升至 L4，并非智能合约漏洞。

**11 月 1 日跟进：** Kintsu 的 10 月 31 日原始警告将自身 DNS 劫持归因于注册商，并要求自当日约 00:00 UTC 起曾连接或签名的用户撤销授权及转移资金。其后完整帖子称真实网站已恢复，但仍在与注册商确认原因。本次增加另一项目的恢复声明，不能证明存在已确认的共同注册商入侵、全部十二个域名均已恢复、最终损失总额或用户获偿。约午夜的界限是预防性指引，不是已证实的攻击开始时间。

**研究跟进：** Bitquery 估计六条链上损失 202,386 美元，其中 32 个钱包损失至少 1 美元，另有 15 个钱包损失不足 1 美元。数据截至 10 月 31 日 18:30 UTC，不含 Solana/Aptos 及未关联的盗取交易；网站归属按链及代币推断，并非转账直接记录。约 56,600 美元的 Kintsu 排队赎回资产是历史快照，并非已确认冻结或偿付。注册商根因仍未确认。
