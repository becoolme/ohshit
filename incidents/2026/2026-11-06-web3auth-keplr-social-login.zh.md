---
title: Web3Auth 暂停嵌入式钱包，Keplr 调查社交登录钱包的未授权交易
tags: [Web3Auth, Keplr, 嵌入式钱包, 社交登录]
summary: Web3Auth 暂停嵌入式钱包服务。Keplr 收到部分通过 Google 或 Apple 登录创建的钱包发生未授权交易的报告后，暂停了这两种登录方式。Bitquery 估计，截至 11 月 7 日 15:38 UTC，八条链上的相关接收地址持有约 601 万美元资产。该估计未经独立核实，入侵方式及最终损失仍不明。
splash: 通过 Google 或 Apple 登录创建的 Keplr 钱包。Keplr 初步判断助记词及硬件钱包未受影响。
wipe: 暂停向可能受影响的账户转入资金，也别重新导入这些账户。关注官方指引，通过 Keplr 支持报告不认识的交易。
inTheWildNote: Keplr 收到未授权交易报告，其联合创始人称已有账户遭利用。
timeline:
- date: 11月6日 20:52 UTC
  title: Bitquery 回溯到首批链上转账
  body: 研究方追踪到 Cosmos Hub 上十个钱包向同一接收地址发出小额转账。
- date: 11月6日 21:13 UTC
  title: Web3Auth 披露嵌入式钱包安全问题
  body: Web3Auth 暂停了部分第三方使用的服务，并称初步调查未发现 MetaMask 用户受影响的证据。
- date: 11月7日 04:38 UTC
  title: Keplr 报告未授权交易并暂停社交登录
  body: 报告涉及部分使用 Google 或 Apple 登录创建的钱包。Keplr 正与 Web3Auth 联合调查。
- date: 11月7日 08:29 UTC
  title: Keplr 联合创始人公布初步影响估计
  body: Josh Lee 称问题源于 Web3Auth，并估计约 20% 的 Keplr 社交登录账户可能受影响，其中实际被利用的占比似乎更小。
- date: 11月7日 16:00 UTC
  title: Bitquery 公布八条链的资金追踪
  body: 研究方统计至 15:38 UTC，估计相关接收地址持有约 601 万美元资产，当时 Cosmos Hub 上仍有资金被转出。钱包数按密钥计，不能等同于受害人数。
checklist:
- title: 停止转入新资金，保留现有钱包配置
  hint: 如果账户是通过 Google 或 Apple 登录创建的，Keplr 要求调查期间不要继续向该账户转入资金，也别在任何地方重新导入或创建该账户。
- title: 保存并报告异常活动
  hint: 保留公开钱包地址、链名、交易哈希、时间和金额。通过 Keplr 官网联系支持，关注 Keplr 官方账号，忽略陌生人发来的资金追回链接。不要透露私钥或助记词。
- title: 恢复登录集成前核实上游状态
  hint: 依赖 Web3Auth 的应用应查看厂商状态事件及开发者公告。等厂商确认恢复步骤后，再启用受影响流程。状态页显示的是计划维护时段。
- title: 核查接收地址、费用钱包和质押份额转移
  hint: 'Bitquery 列出的八个接收地址为 cosmos1atuap9kfnt6y8ykvn3437e7j3z8qffh3qtnmwu, osmo1atuap9kfnt6y8ykvn3437e7j3z8qffh3gsqtcw, inj1lqmdmuczn5rxn5jkc34wwrqdeh70etpf5wvt7g, akash1atuap9kfnt6y8ykvn3437e7j3z8qffh3ds7uhx, celestia1atuap9kfnt6y8ykvn3437e7j3z8qffh33pzt53, noble1atuap9kfnt6y8ykvn3437e7j3z8qffh3ggxnkj, dydx1atuap9kfnt6y8ykvn3437e7j3z8qffh3fjalwt, bbn1atuap9kfnt6y8ykvn3437e7j3z8qffh3h4z239。支付费用的钱包为 cosmos1pa0n22gcyyjnv6vqe9qgphrfhyhhf52t6kqud0，两处归属未明的付款地址为 cosmos1t5u0jfg3ljsjrh2m9e47d4ny2hea7eehxrzdgd, cosmos1jr9vwrjtv2z4nkngzu0yrmw9gfxj0n97uy9hkt，报告给出的两笔交易为 919D1C61D474DDB5BC16DB12639E15BBDBD1C95AEDDBDA063BC052918E8C9700, D1F9C2224490B6C705B6065F784993C8D4CDC732F4B8A1EF939EA719873505F9。报告另核查 Injective 接收地址的 EVM 表示 0xf836ddf3029d0669d256c46ae70c0dcdfcfcac29，以及关联密钥的 Bitcoin 表示 bc1qatuap9kfnt6y8ykvn3437e7j3z8qffh3k3ds23。用报告第 12 节及链上浏览器核实交易角色。Cosmos Hub 上同时检查奖励接收地址变更、质押份额代币化及份额转出。命中本身不能证明失陷或地址归属。'
sources:
- name: Web3Auth 事件披露
  says: 通过公开副本核阅原始公告，确认服务暂停及对 MetaMask 用户影响的初步判断。
- name: Keplr 事件通知
  says: 通过公开副本核阅原始公告，报告未授权交易、涉及的钱包创建方式、暂停登录及用户应立即采取的措施。
- name: Keplr 联合创始人的初步调查结果
  says: 通过公开副本核阅原始公告，将事件归因于上游服务商，并给出初步影响估计及恢复工作进展。
- name: Web3Auth 登录服务维护
  says: 记录安全事件引发的维护，并称服务恢复后会公告。
- name: MetaMask 开发者公告
  says: 确认服务暂停，并重申初步调查未发现 MetaMask 用户受影响的证据。
- name: Bitquery 对 Keplr 的链上调查
  says: 按链列出接收地址、质押份额路径及估值，说明跨链计数和归属限制。
---

Web3Auth 披露其部分第三方使用的嵌入式钱包服务存在安全问题。Keplr 收到部分通过 Google 或 Apple 登录创建的钱包发生未授权交易的报告。Keplr 初步判断，使用助记词创建或使用硬件钱包的账户未受影响。Web3Auth 初步调查未发现 MetaMask 用户受影响的证据。11 月 7 日开发者公告重申了这一判断。

Keplr 联合创始人 Josh Lee 称事件源于 Web3Auth，初步估计约 20% 的 Keplr Google 或 Apple 登录账户可能受影响。Lee 称实际被利用的占比似乎更小，恢复工作仍在进行。厂商尚未公布最终账户数、损失、入侵方式或赔偿方案。

可核阅原始声明的公开副本。[Web3Auth](https://teapaw.org/Web3Auth/status/2118814067359969745)、[Keplr](https://teapaw.org/keplrwallet/status/2118926087615045807)、[Josh Lee](https://teapaw.org/dogemos/status/2118984142151196677)。

Bitquery 在七条可按同一密钥去重的链上统计到 **44,041 个钱包**。Injective 上有 **7,603 个地址**，但与前七条链重叠。研究方根据 299 个样本估计，Injective 另涉及 440 至 934 个钱包。不能直接相加这两组原始计数。研究方按 **11 月 7 日 15:27 UTC** 的价格估值，交易统计截至 **15:38 UTC**，当时 Cosmos Hub 仍有异常转出。约 **601 万美元**是估值快照，排除了未定价代币及疑似垃圾代币，尚未得到独立核实。在七条可按同一密钥去重的链上，Bitquery 统计约 86% 的受影响钱包是在 Keplr 04:38 UTC 发布警告后首次被转出资金。链上交易无法显示钱包的创建方式或密钥如何失陷。

研究方追踪到约 **196 万枚质押 ATOM** 对应的份额被代币化后转走。通常解除质押要等 21 天，但份额代币可先行转移。研究方在接收地址中未见进一步转出。这是截止时点的观察，尚未看到厂商确认冻结或返还。仅暂停社交登录无法使已取得的签名能力失效。继续按 Keplr 指引停止向相关账户入金，避免重新导入。
