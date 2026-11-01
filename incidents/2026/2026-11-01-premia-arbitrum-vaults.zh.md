---
title: Blockaid 报告 Premia 在 Arbitrum 上的金库正遭利用
tags: [Premia, Arbitrum, DeFi]
summary: Blockaid 报告 Premia 在 Arbitrum 上遭持续攻击，截至预警时约两笔交易已转出约 400,500 美元。其描述的流程包括创建空期权池、闪电贷和购买期权，将金库抵押品锁入池中，再以流动性形式提走。尚无最终损失总额或已核实的修复。
splash: Arbitrum 上的 Premia v3；后续研究报告列出 WBTC、WETH 及 ARB 的六个看涨／看跌金库
wipe: 核实遏制措施前避免新增 Arbitrum 上的 Premia 金库敞口，保留交易记录并关注官方更新
inTheWildNote: Blockaid 报告实际金库资金转出，称截至预警时攻击仍在持续。
cves: []
fixed: []
timeline:
  - date: 2026年11月1日
    title: Blockaid 报告 Arbitrum 金库遭持续攻击
    body: 约两笔交易转出约 400,500 美元是研究方的初步估计，不是核对后的最终损失。
  - date: 2026年11月1日
    title: Blockaid 公布利用者地址及三个受害金库链接
    body: 后续帖子补充一笔示例交易，不是最终损失数字或已核实的修复。
  - date: 2026年11月1日
    title: 研究方报告六个金库及两笔成功转出资金的交易
    body: PandaSecurity 表示直接读取了 Arbitrum 回执；范围超出此前三个金库的示例，但不是项目方确认的最终范围或修复。
checklist:
  - title: 暂停增加受影响部署的敞口
    hint: 在 Arbitrum 上存款或新开仓前，通过 Premia 既有官方渠道核对受影响金库及遏制进展。可读预警未列出安全金库清单或已部署的修复，也未证实其他链受影响。
  - title: 保存自己的金库记录
    hint: 保留交易哈希、金库地址及头寸记录，供官方支持核查。不要签署陌生消息中的资产追回交易，也不要透露助记词。预警不能证明每位存款用户均已损失资金，或用户私钥遭窃。
  - title: 将自己的金库历史与已公布指标比对
    hint: "在 Arbitrum 上，Blockaid 标注的利用者钱包为 0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd，合约为 0x577168C8c6fA937495C3D6961f1d7D734b2d785f。示例交易为 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac。链接列出的三个受害金库为 0x45dF5EA836A15B561937Ae8373ab9eE984aea531、0xbae43c546DFADC69576aE73C68e0694A54F08e1B 及 0xD46993F25D298ebbCD31E941156C66f7e628A52a。通过既有区块浏览器检查自己的交易及持仓；单一匹配不能证明遭入侵或损失，未出现在这份不完整受害清单中也不能证明安全。"
  - title: 比对扩充后的研究指标清单
    hint: "PandaSecurity 列出 11 项地址及交易哈希：发起者 0xbeBa8CEfD0D75d747C5AD966Dc17C0Bb60D84dBd；攻击合约 0x577168C8c6fA937495C3D6961f1d7D734b2d785f；准备交易 0xe3c263fcae544954367998e48e13112875cfd38a3b9a240e7818bb96313831f5；两笔资金转出交易 0x64602cbbeba5d3c7a5e2cff4f98cc118886fc6051c56fa50458abec2c90441ac 及 0xd7e8086df0570c5389ca27eb9bcdff290e810c094155b410a42e5bad2b3244ff；WBTC／WETH／ARB 看涨金库依次为 0x45dF5EA836A15B561937Ae8373ab9eE984aea531、0xbae43c546DFADC69576aE73C68e0694A54F08e1B 及 0xDC631d88dbB5eb39f5c4Bf8B4e5298d098912fFf；对应看跌金库为 0x6A1FC0E1c60BA6564CDe4910A425F1F1a1d18C1F、0xD46993F25D298ebbCD31E941156C66f7e628A52a 及 0xBe3E229319f86f5ee96ee1dc0b6d55e8b68a439e。核对自己的头寸及留存回执；单一匹配不能证明遭入侵或损失。这些是研究方标注的角色，不代表每个地址均归攻击者所有，也不是完整安全清单。"
sources:
  - name: Blockaid 原始 Premia 预警
    says: 公开嵌入内容包含 Arbitrum 利用过程、约计金额及交易笔数，后续内容被截断。
  - name: Blockaid 预警的官方公开嵌入副本
  - name: Blockaid 地址后续原帖的公开嵌入副本
    says: 完整帖子标注两个利用者地址、一笔示例交易及三个受害金库；普通链接跳转可见 Arbiscan 目标。
  - name: PandaSecurity 原始 Premia 研究
    says: 报告通过公开节点观察两笔资金转出及六个金库的回执，区分直接观察、转述估值及尚未确认的根因分析。
---

Blockaid 将资金转出归因于对金库及期权流程的利用，不只是报告一笔原因不明的转账。预警时的实际利用支持 L4 评级，但不能据此确立最终根因、受影响存款总额、攻击者身份、已完成遏制或赔付。上面的措施属于降低敞口的一般建议；尚未核实厂商认可的退出流程。

**11 月 1 日地址更新：** Blockaid 的下一条帖子链接了两个利用者地址、一笔示例交易及三个受害金库，上方完整列出这六项链接指标。这些金库是示例，不是经核实的完整范围，也不是安全合约清单。浏览器地址页在普通跳转后返回访问错误；相关标注来自 Blockaid，不是独立链上评估。保留此前约 400,500 美元的初步估计；媒体不同估值不是对账后的最终总额。

**11 月 1 日研究更新：** PandaSecurity 报告六个受影响看涨／看跌金库，准备交易发生于 03:14:37 UTC，两笔成功转出资金的交易发生于 03:15:39 及 03:15:40 UTC。其回执分析统计净转出 3.644104 WBTC、43.472546 WETH、46,215.428616 ARB 及 48,479.36 USDC.e。这是研究方的观察，不是项目方对账结果。报告转述约 437,000 美元及 464,600 美元的不同估值，不能与 Blockaid 的早期估计相加。确切根因、最终范围及修复仍未确认。
