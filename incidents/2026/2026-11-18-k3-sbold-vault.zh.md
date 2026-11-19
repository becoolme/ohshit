---
title: K3 Capital 的 sBOLD 金库遭资金提取后暂停合约
summary: K3 Capital 发现恶意活动后暂停 sBOLD 金库。Blockaid 估计约 343 万美元被提取；Bitquery 后续统计 97 笔交易、约 342 万美元。Liquity 表示 V2 本身不受影响。攻击路径的描述仍有分歧。
splash: K3 Capital 独立运营的以太坊 sBOLD 金库存款人；Liquity V2 需单独区分
wipe: 不要向 sBOLD 存款；保留持仓记录，等待 K3 经核实的修复及恢复说明。
inTheWildNote: K3 确认恶意活动并暂停合约；研究机构报告金库资金遭提取。
timeline:
  - date: 11月18日
    title: K3 暂停合约，Liquity 提醒停止存款
    body: 项目正在调查恶意活动。Liquity 区分独立运营的金库与 V2。
  - date: 11月18日 16:14 UTC
    title: Bitquery 记录调查快照
    body: 其分析统计 97 笔提取交易、约 342 万美元；这是研究估计，并非项目最终核算。
checklist:
  - title: 停止新增 sBOLD 存款
    hint: Liquity 明确要求在另行通知前不要存款。K3 仅确认暂停，尚未宣布重开或资金恢复。
  - title: 保留证据并核实恢复说明
    hint: 保存钱包、交易及持仓记录，通过 K3 官方渠道跟踪。暂停不代表资金已追回或已安排赔付。
  - title: 调查时使用完整研究记录
    hint: Bitquery 的记录列出 24 个地址和一个交易哈希，含金库、提取合约、机器人及合法资金池/路由地址。应查阅链接中的完整记录；命中本身不能证明入侵或同一控制人。
sources:
  - name: K3 Capital 原始通知
    says: 可读公开嵌入内容确认正在调查恶意活动，合约已暂停。
  - name: Liquity 原始范围说明及存款警告
    says: 完整公开嵌入内容表示 sBOLD 独立运营，V2 不受影响。
  - name: Bitquery 原始交易调查
    says: 统计 97 笔交易、约 342 万美元，未发现 trove 清算；未核查部署代码版本。
  - name: Blockaid 原始初步预警
    says: 可读摘录描述自我清算及约 343 万美元；长帖嵌入的后文被截断。
---

K3 确认恶意活动并暂停合约。Liquity 表示，受影响的是独立运营的 sBOLD 金库，而非 Liquity V2。已确认的利用及存款风险支持定为 L4。

Bitquery 估计 97 笔交易涉及约 342 万美元，Blockaid 初步预警估计约 343 万美元。这些是注明来源的估计，并非 K3 的最终损失总额。Blockaid 描述自我清算，Bitquery 则未发现 trove 清算，认为是直接转入 WETH 后利用份额估值。Bitquery 未核查实际部署代码版本，不能凭其审计对比断言旧修复未部署。项目复盘及最终资金恢复核算仍待公布。
