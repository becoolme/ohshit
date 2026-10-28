---
title: bitcoinjs-lib 修复六项费用计算、区块验证及解析漏洞
tags:
  - Bitcoin
  - JavaScript
  - PSBT
summary: 六份公告涉及矿工费被低估、无效区块检查及解析拒绝服务。完整修复应升级至 5.2.3 / 6.1.10 / 7.0.5。资金损失取决于下游如何信任结果，超额费用还需有效交易广播并被接受；未确认真实攻击。
splash: 接受不可信 PSBT、交易或区块，并依赖 bitcoinjs-lib 费用、解析或验证 API 的应用
wipe: 升级至 5.2.3 / 6.1.10 / 7.0.5，核实实际解析器依赖，并独立验证输入
inTheWildNote: 公告演示了缺陷，但未证实真实攻击。
cves:
  - name: 未检测 Merkle 重复
    description: 伪造交易列表可通过区块根检查。
  - name: 交易解析拒绝服务
    description: 受影响 v7 依赖树中的整数读取会反复复制整个缓冲区。
  - name: 区块解析拒绝服务
    description: v7 Uint8Array 解析器反复复制剩余区块数据。
  - name: PSBT UTXO 记录冲突
    description: 签名及费用计算可能采用不一致的输入金额。
  - name: 已完成签名的 PSBT 输入缺少金额
    description: 缺少 UTXO 记录可能按零计入，导致费用被低估。
  - name: 无效工作量证明目标
    description: 区块头检查可能接受无效紧凑目标；影响取决于应用如何信任结果。
fixed:
  - product: bitcoinjs-lib 5
    status: 覆盖全部六份公告
  - product: bitcoinjs-lib 6
    status: 覆盖全部六份公告
  - product: bitcoinjs-lib 7
    status: 覆盖全部六份公告
  - product: 5 之前的受影响版本
    status: 升级至修复分支；没有原分支移植补丁
timeline:
  - date: 2026年10月26日
    title: 公开六份安全公告
    body: 各缺陷的修复门槛不同；完整批次应采用上方版本。
checklist:
  - title: 更新所有实际依赖副本，并重建使用方
    hint: 检查 npm ls bitcoinjs-lib 及锁文件。费用漏洞的修复版本仅为 5.2.2 / 6.1.9 / 7.0.4，这些版本仍有工作量证明目标漏洞。完整修复使用 5.2.3 / 6.1.10 / 7.0.5。
  - title: 独立验证 PSBT 输入金额
    hint: 核实每个输入引用的输出，拒绝 witnessUtxo/nonWitnessUtxo 不一致，即使输入已完成签名也必须提供金额。广播前核对真实矿工费；不要以禁用 maximumFeeRate 作为变通办法。
  - title: 将区块辅助函数视为部分验证
    hint: 拒绝发生变异的 Merkle 树及无效紧凑目标；另行验证网络工作量证明上限及链上该位置所需难度。checkProofOfWork 返回 true 不代表完整共识验证。
  - title: 限制并隔离不可信解析
    hint: 限制输入大小并使用独立解析工作线程。v7 应核实嵌套 uint8array-tools >=0.0.10、varuint-bitcoin >=2.0.1 和 bip174 >=3.0.1；仅更新依赖不能修复独立的区块后缀复制问题。
sources:
  - name: bitcoinjs-lib——未检测 Merkle 重复
    says: Merkle 重复 PoC，修复版本为 5.2.1 / 6.1.8 / 7.0.2。
  - name: bitcoinjs-lib——交易解析拒绝服务
    says: v7 解析器暴露及 7.0.3 修复；不需要有效的已挖出区块。
  - name: bitcoinjs-lib——区块解析拒绝服务
    says: v7 解析器暴露及 7.0.3 修复；不需要有效的已挖出区块。
  - name: bitcoinjs-lib——PSBT UTXO 记录冲突
    says: PSBT 攻击前提，不会自动窃币，修复版本为 5.2.2 / 6.1.9 / 7.0.4。
  - name: bitcoinjs-lib——已完成签名的 PSBT 输入缺少金额
    says: PSBT 攻击前提，不会自动窃币，修复版本为 5.2.2 / 6.1.9 / 7.0.4。
  - name: bitcoinjs-lib——无效工作量证明目标
    says: 完整批次最终修复门槛为 5.2.3 / 6.1.10 / 7.0.5；v5 之前无移植补丁。
---

费用缺陷影响信任导入、更新或合并 PSBT 元数据的应用。超额金额变成矿工费，不会自动转给 PSBT 提供者，缺陷也不能伪造签名。缺少金额的处理问题还影响已完成签名的输入。

缺少金额漏洞始于 v5.1.0，记录冲突始于 v5.2.0，Merkle 验证始于 v2.3.0，工作量证明检查始于 v2.2.0；公告列明的 v6、v7 候选版本也在范围内。两项复制缺陷影响截至 7.0.2 的 v7；不可信解析可在验证前阻塞同步事件循环。

这些库漏洞不代表 Bitcoin Core 共识失陷，也没有确认资金损失。公开复现及下游资金、可用性风险支持 L3 评级。本批次独立于 [Electrum 恶意服务器事件](/zh/incidents/electrum-fee-bump/)。
