---
title: Blockaid 警告多个加密网站分发 Step Drainer，Flap 确认 DNS 攻击
tags: [Step Drainer, DNS, 加密货币]
summary: Blockaid 警告停止与 Flap、Kintsu 交互，随后列出另十个分发 Step Drainer 的域名。Flap 确认 DNS 攻击，先迁至 flap.cool，随后宣布两个入口恢复，服务商是否涉事仍未确认。尚无已确立的总损失或受害者数量。
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
    title: Flap 宣布官网及备用域名恢复访问
    body: 这是 Flap 的恢复声明，不能证明其他受影响站点也已恢复。
checklist:
  - title: 停止与受影响前端交互
    hint: Blockaid 两份原帖的完整清单为 flap[.]sh、kintsu[.]xyz、stonkfun[.]xyz、pickle[.]finance、echelon[.]market、origami[.]finance、fluxbeam[.]xyz、stakepoint[.]app、supswap[.]xyz、longbow[.]cash、shprd[.]finance 和 apexdefi[.]xyz。检查浏览及钱包历史；仅域名匹配不能证明失陷。Flap 最初要求使用 flap.cool，避开 flap.sh，即使后者会重定向；随后宣布两个入口恢复。重新访问前，通过各项目既有官方渠道核实当前公告；Flap 的声明不能为其他列出的域名解除警报。
  - title: 检查已签署的内容
    hint: 通过可信钱包或区块浏览器检查授权及交易，使用可信界面撤销可疑权限，不要使用受影响网站的资产追回提示。保留交易哈希供支持人员核查。仅连接钱包不代表已转出资产或泄露助记词；不要向所谓资产追回人员提供助记词。
sources:
  - name: Blockaid 原始 Flap 和 Kintsu 预警
  - name: Blockaid 扩大的 Step Drainer 域名清单
  - name: Flap 原始 DNS 调查及迁移更新
  - name: Flap 原始恢复公告
    says: 可读的公开嵌入内容宣布官网及备用域名恢复访问。
---

Blockaid 将另十个站点与最初预警归为同一攻击。Flap 仍在调查域名服务商是否涉事，不能据此认定存在共同注册商或托管服务商入侵。L3 反映已确认的恶意前端分发，具体后果尚未量化，并非证明智能合约漏洞或特定损失总额。
