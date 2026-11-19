---
title: Reental RNT Lend 在特权合约升级后遭资金提取
summary: Blockaid 报告 RNT Lend 稳定币市场遭恶意升级。Bitquery 估计 954,703 美元被提取，包含初始资金池以外的资金，并表示房地产代币已收回。管理员密钥由谁控制仍未证实。
splash: Polygon 上 Reental RNT Lend 稳定币出借人及受影响的托管钱包/Safe
wipe: 在修复得到核实前，避免向 RNT Lend 新增存款或还款；保存记录并联系 Reental。
inTheWildNote: Blockaid 报告利用；Bitquery 追踪到管理员升级及资金提取。
timeline:
  - date: 11月18日
    title: Blockaid 报告 aToken 恶意升级
    body: 早期约 45.4 万美元估计仅涵盖部分活动。
  - date: 11月18日 16:17 UTC
    title: Bitquery 记录扩大范围后的快照
    body: 其估计涉及 954,703 美元稳定币；房地产代币收回需与稳定币恢复单独区分。
checklist:
  - title: 避免继续向受影响市场转入资金
    hint: Bitquery 在 11 月 18 日快照中发现资金池未暂停，还款仍有被取走风险。新增存款或还款前，应确认 Reental 的修复已获核实。
  - title: 保存记录并取得项目说明
    hint: 保存交易和持仓记录，向 Reental 咨询申报及提款安排。房地产代币收回不代表稳定币已赔付。
  - title: 查阅完整证据清单
    hint: Bitquery 的记录有 16 个地址和五个交易哈希，涵盖资金池、市场、管理员、机器人、Safe 及跨链桥。应使用链接中的完整清单；命中本身不能证明入侵或相同控制人。
sources:
  - name: Blockaid 原始预警
    says: 完整公开嵌入内容报告管理员升级允许任意 aToken 提取，早期约 45.4 万美元被提取。
  - name: Bitquery 原始调查
    says: 扩展范围，区分已收回的房地产代币，并说明快照、归因及归属限制。
---

据 Blockaid 和 Bitquery，特权升级令 RNT Lend 的 USDT0/USDC 市场可被提取。Bitquery 将 454,825 美元归于两个机器人，约 499,877 美元归于密钥控制者；四舍五入后的分项不一定精确相加。其 4,934 万美元房地产代币估值采用资金池价格，这些代币已被收回，不能再计为额外永久损失。

Bitquery 无法确认是密钥被盗还是内部人员使用。11 月 18 日快照不能保证当前已恢复。已确认的恶意升级及资金提取支持 L4；项目复盘及最终核算仍待公布。

954,703 美元这一扩大后的总额仍未获第二个来源或 Reental 独立确认，应视为待核实的 Bitquery 估计。
