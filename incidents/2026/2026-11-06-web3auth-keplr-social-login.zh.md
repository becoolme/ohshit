---
title: Web3Auth 暂停嵌入式钱包，Keplr 调查社交登录钱包的未授权交易
tags: [Web3Auth, Keplr, 嵌入式钱包, 社交登录]
summary: Keplr 确认，Web3Auth 基础设施漏洞导致部分通过 Google 或 Apple 登录创建的钱包私钥泄露。Bitquery 撤回了将 11 月 7 日保全地址约 601 万美元余额归为被盗资金的判断，并追踪到更多转账。最终损失和返还情况仍不明。
splash: 部分通过 Google 或 Apple 登录创建的 Keplr 钱包。Keplr 称使用助记词或硬件钱包的账户未受影响。
wipe: 停止向受影响的账户入金，避免重新导入。将剩余可转移资产转至另一只由助记词或硬件钱包保护的钱包。
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
- date: 11月7日 16:41 UTC
  title: Bitquery 公布八条链的资金追踪
  body: 研究方统计至 15:38 UTC，估计相关接收地址持有约 601 万美元资产，修订稿将 Cosmos Hub 上最后一笔归集转账的时间定为 15:33 UTC。钱包数按密钥计，不能等同于受害人数。
- date: 11月7日 16:53 UTC
  title: Web3Auth 确认基础设施存在安全问题
  body: 厂商确认部分 Keplr 嵌入式钱包受影响，正与 Keplr 合作保护资产。
- date: 11月7日 17:06 UTC
  title: Web3Auth 披露保护性转移
  body: Web3Auth 称已与合作方沿用攻击者的路径，将资产从面临风险但尚未遭攻击的钱包转出。厂商称以此方式保全的资产安全，正在准备经核实的找回地址清单。
- date: 11月7日 17:17 UTC
  title: Keplr 确认私钥泄露并发布转移指引
  body: Keplr 建议将剩余可转移资产转到由助记词或硬件钱包保护的钱包。质押和锁定资产需要更长时间处理，账户查询工具仍在开发。
- date: 11月8日 06:23 UTC
  title: Web3Auth 公布已核实的资产保全地址
  body: 名单包含 Bitquery 余额快照中的全部八个接收地址，还列出另外三条 Cosmos 生态链的地址，以及供八条 EVM 链共用的一个地址。
- date: 11月8日 06:31 UTC
  title: Keplr 公布同一批保全地址
  body: Keplr 提醒用户关注 Web3Auth 官方更新，警惕冒充官方或声称可以追回资金的请求。
- date: 11月8日 19:31 UTC
  title: Bitquery 修正资金归属判断并追踪到更多转账
  body: 修订稿记录 Osmosis 和 Noble 的保全地址重新收到转账，并在更多链上观察到转账。这些后续转账未计入约 601 万美元的余额快照。
checklist:
- title: 停止转入新资金，保留现有钱包配置
  hint: 如果账户是通过 Google 或 Apple 登录创建的，Keplr 要求调查期间不要继续向该账户转入资金，也别在任何地方重新导入或创建该账户。
- title: 将剩余可转移资产转至另一只钱包
  hint: 按 Keplr 指引，将剩余可转移资产转到另一只由助记词或硬件钱包保护的钱包，转账前核对接收地址。质押或锁定资产的后续处置请关注 Keplr 和 Web3Auth 官方更新。
- title: 通过官方渠道核查余额变化
  hint: 余额归零或减少可能源于保护性转移。保留交易哈希，在链上浏览器中将交易接收方与下方官方保全地址逐字比对。名单供核查已发生的交易。剩余资产只应转到由自己控制的另一只钱包。继续关注官方账户查询工具和返还指引，忽略陌生人发来的资金追回消息及链接。
- title: 保存并报告异常活动
  hint: 保留公开钱包地址、链名、交易哈希、时间和金额。通过 Keplr 官网联系支持，关注 Keplr 官方账号，忽略陌生人发来的资金追回链接。不要透露私钥或助记词。
- title: 对照官方资产保全地址
  hint: Cosmos Hub cosmos1atuap9kfnt6y8ykvn3437e7j3z8qffh3qtnmwu。Osmosis osmo1atuap9kfnt6y8ykvn3437e7j3z8qffh3gsqtcw。Celestia celestia1atuap9kfnt6y8ykvn3437e7j3z8qffh33pzt53。Akash akash1atuap9kfnt6y8ykvn3437e7j3z8qffh3ds7uhx。Noble noble1atuap9kfnt6y8ykvn3437e7j3z8qffh3ggxnkj。Injective inj1lqmdmuczn5rxn5jkc34wwrqdeh70etpf5wvt7g。dYdX dydx1atuap9kfnt6y8ykvn3437e7j3z8qffh3fjalwt。Babylon bbn1atuap9kfnt6y8ykvn3437e7j3z8qffh3h4z239。Axelar axelar1atuap9kfnt6y8ykvn3437e7j3z8qffh3y99n9a。Saga saga1atuap9kfnt6y8ykvn3437e7j3z8qffh37c2ff6。Agoric agoric1atuap9kfnt6y8ykvn3437e7j3z8qffh3jk3y72。EVM 0x413e4F4De7E5FF010913488F781E679e76f706dA。Web3Auth 称最后一个地址供八条 EVM 链使用，公告未逐条列出链名。这些地址仅供比对交易记录，请勿向其转账。地址匹配可帮助识别保全转账，不能确认资产已返还或核实个人损失。
- title: 恢复登录集成前核实上游状态
  hint: 依赖 Web3Auth 的应用应查看厂商状态事件及开发者公告。等厂商确认恢复步骤后，再启用受影响流程。状态页显示的是计划维护时段。
- title: 核查接收地址、费用钱包和质押份额转移
  hint: 'Bitquery 列出的八个接收地址为 cosmos1atuap9kfnt6y8ykvn3437e7j3z8qffh3qtnmwu, osmo1atuap9kfnt6y8ykvn3437e7j3z8qffh3gsqtcw, inj1lqmdmuczn5rxn5jkc34wwrqdeh70etpf5wvt7g, akash1atuap9kfnt6y8ykvn3437e7j3z8qffh3ds7uhx, celestia1atuap9kfnt6y8ykvn3437e7j3z8qffh33pzt53, noble1atuap9kfnt6y8ykvn3437e7j3z8qffh3ggxnkj, dydx1atuap9kfnt6y8ykvn3437e7j3z8qffh3fjalwt, bbn1atuap9kfnt6y8ykvn3437e7j3z8qffh3h4z239。支付费用的钱包为 cosmos1pa0n22gcyyjnv6vqe9qgphrfhyhhf52t6kqud0，两处归属未明的付款地址为 cosmos1t5u0jfg3ljsjrh2m9e47d4ny2hea7eehxrzdgd, cosmos1jr9vwrjtv2z4nkngzu0yrmw9gfxj0n97uy9hkt，报告给出的两笔交易为 919D1C61D474DDB5BC16DB12639E15BBDBD1C95AEDDBDA063BC052918E8C9700, D1F9C2224490B6C705B6065F784993C8D4CDC732F4B8A1EF939EA719873505F9。报告另核查 Injective 接收地址的 EVM 表示 0xf836ddf3029d0669d256c46ae70c0dcdfcfcac29，以及关联密钥的 Bitcoin 表示 bc1qatuap9kfnt6y8ykvn3437e7j3z8qffh3k3ds23。结合修订报告第 5 节、第 11 节及链上浏览器核查背景。上文两处付款地址及第一笔交易 ID 见早期报告。Web3Auth 后续将这八个接收地址全部列为保全地址。其公告未单独确认上述费用钱包、付款地址、Injective 的 EVM 表示或 Bitcoin 表示的归属。Cosmos Hub 上同时检查奖励接收地址变更、质押份额代币化及份额转出。命中本身不能证明失陷或地址归属。'
sources:
- name: Web3Auth 事件披露
  says: 通过公开副本核阅原始公告，确认服务暂停及对 MetaMask 用户影响的初步判断。
- name: Keplr 事件通知
  says: 通过公开副本核阅原始公告，报告未授权交易、涉及的钱包创建方式、暂停登录及用户应立即采取的措施。
- name: Web3Auth 基础设施事件更新
  says: 确认基础设施安全问题影响了部分 Keplr 用户的嵌入式钱包。
- name: Web3Auth 保护性转移公告串
  says: 说明沿用攻击路径转移资产的保护措施，称保全资金安全，并表示正在准备经核实的找回地址清单。
- name: Keplr 私钥泄露及用户处置指引
  says: 确认部分社交登录钱包私钥泄露，并给出可转移、质押和锁定资产的处置指引。
- name: Keplr 联合创始人的初步调查结果
  says: 通过公开副本核阅原始公告，将事件归因于上游服务商，并给出初步影响估计及恢复工作进展。
- name: Web3Auth 登录服务维护
  says: 记录安全事件引发的维护，并称服务恢复后会公告。
- name: MetaMask 开发者公告
  says: 确认服务暂停，并重申初步调查未发现 MetaMask 用户受影响的证据。
- name: Bitquery 修订后的 Keplr 链上调查
  says: 撤回最初的盗窃归因，记录后续转入保全地址的交易，并说明早期计数和估值的限制。
- name: Web3Auth 资产保全地址公告串
  says: 公布 11 个 Cosmos 生态地址和一个供八条 EVM 链使用的地址，并称将继续补充名单。
- name: Keplr 资产保全地址公告
  says: 公布相同地址，提醒用户通过 Web3Auth 官方渠道跟进。
---

Web3Auth 披露其部分第三方使用的嵌入式钱包服务存在安全问题。Keplr 收到部分通过 Google 或 Apple 登录创建的钱包发生未授权交易的报告。Keplr 初步判断，使用助记词创建或使用硬件钱包的账户未受影响。Web3Auth 初步调查未发现 MetaMask 用户受影响的证据。11 月 7 日开发者公告重申了这一判断。

Keplr 联合创始人 Josh Lee 称事件源于 Web3Auth，初步估计约 20% 的 Keplr Google 或 Apple 登录账户可能受影响。Lee 称实际被利用的占比似乎更小，恢复工作仍在进行。厂商尚未公布最终账户数、损失、入侵方式或赔偿方案。

可核阅原始声明的公开副本。[Web3Auth](https://teapaw.org/Web3Auth/status/2118814067359969745)、[Keplr](https://teapaw.org/keplrwallet/status/2118926087615045807)、[Josh Lee](https://teapaw.org/dogemos/status/2118984142151196677)。

Bitquery 在七条可按同一密钥去重的链上统计到 **44,041 个钱包**。Injective 上有 **7,603 个地址**，但与前七条链重叠。研究方根据 299 个样本估计，Injective 另涉及 440 至 934 个钱包。不能直接相加这两组原始计数。研究方按 **11 月 7 日 15:27 UTC** 的价格估值，交易统计截至 **15:38 UTC**，比修订稿记录的 Cosmos Hub 最后一笔归集转账晚五分钟。约 **601 万美元**是估值快照，排除了未定价代币及疑似垃圾代币，尚未得到独立核实。在七条可按同一密钥去重的链上，Bitquery 统计被归集的钱包中约 86% 是在 Keplr 04:38 UTC 发布警告后首次被转出资金。链上交易无法显示钱包的创建方式或密钥如何失陷。

研究方追踪到约 **196 万枚质押 ATOM** 对应的份额被代币化后转走。通常解除质押要等 21 天，但份额代币可先行转移。截至统计时点，Bitquery 未见接收地址进一步转出。Web3Auth 在 11 月 8 日将 Bitquery 统计的全部八个接收地址列为保护性转移所用地址，Keplr 随后公布同一名单。Bitquery 最初将这些地址归于攻击者，并在 11 月 8 日的修订中撤回这一判断。约 601 万美元是这些后来被 Web3Auth 确认为保全钱包的地址在 11 月 7 日 15:38 UTC 的余额估算。厂商未公布攻击者最终取得多少资金，也未逐笔核对研究方追踪的交易。

Bitquery 追踪到 Osmosis 保全地址从 11 月 7 日 18:28 UTC 起再次收到转账，截至 11 月 8 日 19:22 UTC 新增 4,568 笔。Noble 保全地址从 11 月 8 日 16:02 UTC 起另收到 183 笔。研究方还观察到 Axelar、Saga、Agoric，以及其可查询的六条 EVM 链出现流入，分别是 Ethereum、Base、Arbitrum、BNB Chain、Optimism 和 Polygon。这些是 Bitquery 的观测，后续转账未计入早先八条链的余额快照。笔数无法用来衡量受影响人数或已返还资金。

Web3Auth 称通过保护性转移保全的资产安全。最新公告已列出经核实的保全地址。资产返还、申领流程和账户查询工具仍待确认。仅凭余额变化无法判断资金是被盗还是出于保护目的转移。暂停社交登录无法使已取得的签名能力失效。继续暂停入金，避免重新导入受影响的账户，并按 Keplr 指引将剩余可转移资产转至另一只钱包。

后续原始公告也有公开副本。[Web3Auth 基础设施更新](https://teapaw.org/Web3Auth/status/2119110953975635985)、[保护性转移](https://teapaw.org/Web3Auth/status/2119114303907196932)、[保全资产](https://teapaw.org/Web3Auth/status/2119114305475854345)、[找回地址清单进展](https://teapaw.org/Web3Auth/status/2119114423239647375)、[Keplr 指引](https://teapaw.org/keplrwallet/status/2119117067500806350)。

可核对两家公布的名单。[Web3Auth 公告串](https://teapaw.org/Web3Auth/status/2119314957057871935)、[Keplr 公告](https://teapaw.org/keplrwallet/status/2119316885737177339)。
