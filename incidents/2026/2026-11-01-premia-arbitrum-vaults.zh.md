---
title: Blockaid 报告 Premia 在 Arbitrum 上的金库正遭利用
tags: [Premia, Arbitrum, DeFi]
summary: Blockaid 报告 Premia 在 Arbitrum 上遭持续攻击，截至预警时约两笔交易已转出约 400,500 美元。其描述的流程包括创建空期权池、闪电贷和购买期权，将金库抵押品锁入池中，再以流动性形式提走。尚无最终损失总额或已核实的修复。
splash: Premia 在 Arbitrum 上的金库及存款用户；可读预警未列出具体受影响金库范围
wipe: 核实遏制措施前避免新增 Arbitrum 上的 Premia 金库敞口，保留交易记录并关注官方更新
inTheWildNote: Blockaid 报告实际金库资金转出，称截至预警时攻击仍在持续。
cves: []
fixed: []
timeline:
  - date: 2026年11月1日
    title: Blockaid 报告 Arbitrum 金库遭持续攻击
    body: 约两笔交易转出约 400,500 美元是研究方的初步估计，不是核对后的最终损失。
checklist:
  - title: 暂停增加受影响部署的敞口
    hint: 在 Arbitrum 上存款或新开仓前，通过 Premia 既有官方渠道核对受影响金库及遏制进展。可读预警未列出安全金库清单或已部署的修复，也未证实其他链受影响。
  - title: 保存自己的金库记录
    hint: 保留交易哈希、金库地址及头寸记录，供官方支持核查。不要签署陌生消息中的资产追回交易，也不要透露助记词。预警不能证明每位存款用户均已损失资金，或用户私钥遭窃。
sources:
  - name: Blockaid 原始 Premia 预警
    says: 公开嵌入内容包含 Arbitrum 利用过程、约计金额及交易笔数，后续内容被截断。
  - name: Blockaid 预警的官方公开嵌入副本
---

Blockaid 将资金转出归因于对金库及期权流程的利用，不只是报告一笔原因不明的转账。预警时的实际利用支持 L4 评级，但不能据此确立最终根因、受影响存款总额、攻击者身份、已完成遏制或赔付。上面的措施属于降低敞口的一般建议；尚未核实厂商认可的退出流程。
