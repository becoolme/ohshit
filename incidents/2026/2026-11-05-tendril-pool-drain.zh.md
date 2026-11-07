---
title: TENDRIL 卖出钩子被利用，其 PancakeSwap V2 池的 USDT 流动性被抽走
tags: [TENDRIL, BNB Chain, DeFi, PancakeSwap]
summary: 研究人员在 BNB Chain 追踪到 TENDRIL 卖出钩子被利用。受影响的 PancakeSwap V2 交易对在一笔交易中净流出约 555,671 USDT，研究方关联的获利地址收到约 308,959 USDT。两者衡量的是不同资金流。项目方修复或赔付仍未核实。
splash: BNB Chain 上受影响的 TENDRIL／USDT PancakeSwap V2 池。普通卖家即可触发有缺陷的钩子。
wipe: 等待修复获核实前，暂停与受影响池交互。保留交易证据并核对具体合约地址。
inTheWildNote: ExVul、CertiK 和 BlockintAI 指出同一笔已执行的流动性抽取交易。
timeline:
  - date: 11月4日 16:02 UTC
    title: 卖出触发交易对销毁代币，随后完成兑换
    body: 攻击交易在剩余卖出代币到账前同步降低后的 TENDRIL 储备，几乎取走池内全部 USDT。
  - date: 11月5日 05:58 UTC
    title: ExVul 发布卖出钩子分析
    body: ExVul 指出受影响的交易对和代币、利用交易及关联地址。
  - date: 2026年11月5日
    title: 其他研究人员区分池的净流出与获利地址入账
    body: CertiK 估计净损失约 555,000。BlockintAI 测得池净流出约 555,671 USDT，关联获利地址收到约 308,959 USDT。
checklist:
  - title: 暂停与受影响交易对交互
    hint: 在 BNB Chain 交易或提供流动性前，核对下方交易对及代币地址。迁移和恢复以核实过的项目或交易平台公告为准，忽略陌生人发来的追回链接和签名请求。
  - title: 核对交易并保留证据
    hint: '交易对 0x5de082471f2a9f01a61e467a32837dee830d99e0，代币 0xb1afdfd850da168f2cc9f742e11cdda5273973d2，利用合约 0xc8cb6a2aa825a576e1470479046056fe414ee0f8，部署地址 0xb81e4aafa347b27112b7f6f5de6cf7cd516021ff，研究方关联的获利地址 0xb87cf5ab84d0ab9545358cd30229627305331373。抽取流动性的交易为 0xfdff4fba4327821c204af07944076ecaaee163a994398fdf4063d08712e40059。其他注资、部署和准备交易请按角色核对 BlockintAI 的地址及来源清单。保留自己的公开钱包地址、金额及交易哈希，便于联系支持。单项命中无法证实失陷或地址归属。'
  - title: 部署前检查自定义卖出钩子
    hint: 在分叉环境中复现无特权用户的普通卖出。移除在兑换输入到账前扣减池内代币的储备更新，验证卖家无法在兑换过程中通过税费控制器改变交易对余额或账面储备。
sources:
  - name: ExVul 原始利用警报
    says: 核阅了原始警报的公开副本，确认普通卖出可触发缺陷，并列明储备更新顺序及各地址角色。
  - name: CertiK 原始利用警报
    says: 核阅了原始警报的公开副本，确认卖出钩子路径，估计净损失约 555,000。
  - name: BlockintAI 交易及余额分析
    says: 独立核阅交易，报告池的 USDT 净流出、获利地址入账、时间和注资情况。
---

TENDRIL 的卖出钩子允许无特权卖家触发控制器，先销毁交易对持有的 TENDRIL，再在剩余卖出代币到账前同步降低后的储备。储备失衡后，随后的兑换几乎取走池内全部 USDT。研究方将缺陷定位在代币的自定义卖出逻辑。现有证据涉及 BNB Chain 上的这一交易对。

ExVul 报告池损失约 550,000 USDT，CertiK 估计约 555,000。BlockintAI 测得同一笔交易中，池净流出约 555,671 USDT，关联获利地址收到约 308,959 USDT。仅凭获利地址入账无法确定攻击者最终利润。已核阅的披露未确立项目方确认的最终损失、替代合约或赔付。可核阅两份警报的公开副本。[ExVul](https://teapaw.org/exvulsec/status/2118221337617383455)、[CertiK](https://teapaw.org/CertiKAlert/status/2118242639212658985)。
