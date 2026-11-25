---
title: 研究关联 TRON 钱包盗币与共用手续费网络，多数受害者的 iPhone 攻击原因仍未确立
summary: Bitquery 11 月 23 日修订估计，截至 11 月 21 日，535 个 TRON 地址被取走至少 599 万 USDT，涉及 68 个关联归集地址。第三波涉及 84 个钱包、57.1 万美元。这些是未经独立证实的研究估计；多数受害者的设备及失窃原因仍不明确。
splash: 私钥或助记词可能暴露的自托管钱包；未确立 iPhone 或 Trust Wallet 平台整体受侵。
wipe: 用可信设备和新助记词保护暴露钱包的剩余资产，保留证据并报告盗币，及时更新移动系统。
inTheWildNote: 研究追踪符合盗币模式的交易；多数受害者的攻击原因及所用手机未知。
timeline:
- date: 2026年10月5日至11月4日
  title: 研究追踪 TRON 盗币模式转账
  body: 钱包计数限定于该期间；关联来自资金关系，不证明同一操作者或设备漏洞。
- date: 2026年11月4日
  title: SEAL 汇总 iOS 钱包失陷报告
  body: 六份报告合计约 127,000 美元的报告损失。与 Bitquery 追踪集群的重叠情况未知。
- date: 2026年11月5日
  title: Bitquery 发布调查并更正资金顺序
  body: 手续费钱包先收到资金，19 分钟后才成为活跃账户，更正此前顺序。其他链估值采用 10 月 25 日收盘价；后续交易和 TON 损失不在已测范围。
- date: 2026年11月6日
  title: Trust Wallet 发布 iOS 安全指引
  body: 公司建议安装最新可用 iOS，并避免将恢复短语和私钥存入手机笔记及图片。指引未给出本案调查结论。
- date: 11月7日 20:40 UTC
  title: PublicAML 追踪到后续转账
  body: 该机构将三个新增归集地址关联至同一手续费钱包，估算 11 月 5 日 19:36 至 11 月 7 日 17:02 UTC 至少有 734,424 USDT 从 21 个 TRON 地址转出。后续资金转手及冻结申请应单独看待。
- date: 2026年11月12日
  title: Bitquery 扩充 TRON 数据集
  body: 更新估算截至 11 月 11 日，至少 542 万 USDT 从 454 个 TRON 地址被转走。其中 136 万 USDT 在 11 月 4 日之后转出。
- date: 11月23日
  title: Bitquery 增补第三波并修订累计估计
  body: 11 月 12–21 日这波新增 13 个归集地址，涉及 84 个受害钱包、57.1 万美元。累计估计为 535 个 TRON 地址、至少 599 万 USDT；存在重复失窃，不能直接相加各波钱包数。
checklist:
- title: 跨链处置可疑助记词暴露
  hint: 从可信设备创建使用新助记词的钱包，保护暴露助记词在每条链上的剩余资产。不要在重装应用后复用暴露助记词。助记词不要存于手机照片、备忘录、截图或云备份。通过官方渠道安装当前移动系统及钱包更新；本报告未确立某个统一受影响应用，也没有新的厂商修复版本。
- title: 保留并报告盗币记录
  hint: 保留钱包地址、交易哈希、时间、金额和设备证据。通过 Tether 及接收资金交易所的既有渠道尽快报告；不保证冻结或追回。陌生 TRX 充值后迅速转出值得调查，但也存在粉尘／地址投毒及合法交易所归集。不要向陌生追回联系人提供助记词或付款。
- title: 使用完整且标明角色的地址记录
  hint: 手续费钱包 TUYFAa8hHjeEW6bPqBJ4v3RjQR2uKM1Svk；匹配案例的归集地址 TNJPXRWEptdSzbC1pYGp8suyTao4qddJe6；以太坊中枢 0x007147f598748749486041f5798b0b1379e13097。按各自角色核对 Bitquery 更新清单中的 20 个地址及两笔交易哈希。记录包含合法交易所、跨链桥、铸币合约及归属未知的终点。保留交易证据并核实标签。匹配本身不证明归属、入侵或同一攻击者。
- title: 追踪 11 月 5 至 7 日新增归集地址
  hint: 新归集地址为 TJbCvACEpEMVwi2zYGXuoT2HSBnFLosVLz、TAgpYPQNdA9SCFfe2RgkaH8kkb7JZTaDcV 和 TJCY7r7shYmy3yWncGB9MvwWa8QS6du2C5。PublicAML 的 35 地址清单另列中转地址、受影响钱包及归属未明的接收方。按角色核对，不要将清单用于统一封锁。命中本身不证明失陷或归属。
sources:
- name: Bitquery 原始 TRON 及跨链调查
  says: 11 月 5 日调查、11 月 12 日及 23 日修订、计数规则及带角色的指标。最新估计未获独立证实；设备与应用归因仍有限。
- name: Security Alliance 事件响应周报
  says: 记录六份 iOS 钱包失陷报告，报告损失约 127,000 美元。与 Bitquery 数据集的重叠情况未知。
- name: Trust Wallet iOS 安全指引
  says: 建议更新 iOS，并避免将密钥及恢复短语存入手机笔记和图片。未给出本案根因结论。
- name: PublicAML 后续 TRON 资金追踪
  says: 独立读取链上数据，记录 11 月 5 至 7 日的关联转账、计数规则和 35 个带角色的地址，并报告提出冻结申请。未核实设备、攻击方式、资金归属或冻结是否成功。
---

11 月 5 日原始分析中的 365 是 TRON 地址数，不是确认的 365 名 iPhone 用户：276 个损失 USDT，89 个仅损失 TRX。共用手续费钱包关联的是交易，也可能服务多个攻击工具买家。三个归集地址的关联较弱，其 24 个受害钱包和 530,131 USDT 已计入估计。报告按金额和时间关联一个公开 iPhone 案例，但没有设备取证证明其他盗币的原因。它不能确立 Trust Wallet 漏洞、iPhone 整体受侵，或与另一 Poisoned Source 活动的关联。Bitquery 另按不同口径估算了其他八条链上 65 个钱包及至少 10.3 万美元，不能将 65 个钱包视为新增人数。不能把追踪的 186 万美元 JustLend 存款或 151 万美元 LI.FI 路径再加成额外损失；流经余额并非全部已确立为赃款。

SEAL 于 11 月 4 日发布报告，记录 10 月 28 日至 11 月 3 日期间六份 iOS 钱包失陷报告，报告损失约 127,000 美元，涉及多个 Trust Wallet 和一个 Uniswap Wallet。与 Bitquery 集群的重叠情况未知，两组估算应分开。Trust Wallet 11 月 6 日的指引提到 Coruna 和 DarkSword 对旧版 iOS 的风险，建议更新设备并避免在笔记和图片中保存密钥及恢复短语。指引未认定这一盗窃网络的成因或操作者。

**11 月 7 日后续追踪。** PublicAML 将三个新归集地址与 Bitquery 的手续费钱包关联，估算 21 个地址流出至少 734,424 USDT。其中一笔于 11 月 7 日 17:02:27 UTC 转出 601,751.60 USDT，手续费钱包约四分钟后向该归集地址转入 30 TRX。该机构按单笔转给归集地址且 USDT 余额清零的规则计数。该数值应与 Bitquery 较早时段的估算分开保留。PublicAML 还追踪到 744,448 USDT 经中转流入归属未明的地址，包含此前已计入的资金，不能视为新增损失。它称已提出冻结申请，尚无冻结或追回确认。后续报告未识别受影响设备、应用或攻击机制，也未证明同一人控制所有关联地址。

**11 月 12 日修订分析。** Bitquery 将 55 个归集地址与手续费钱包关联，其中 12 个在 11 月 4 日之后新增。它估算 10 月 5 日至 11 月 11 日，至少 542 万 USDT 从 454 个 TRON 地址被转走，其中 136 万 USDT 在 11 月 4 日之后转出。新增时段统计 USDT，未计入 TRX 损失。该机构最后一次观察到手续费钱包为这批盗币支付手续费是在 11 月 11 日 15:43 UTC。11 月 7 日约 601,752 USDT 的转账同时出现在 Bitquery 修订总额和 PublicAML 11 月 5 日至 7 日的报告中，两者应分开保留以免重复计算。更新补充了交易证据，多数受影响地址所用设备、应用及攻击成因仍未核实。

[Bitquery 更新后的地址及交易记录](https://www.bitquery.io/investigations/iphone-wallet-drain-tron-usdt)补充了 11 月 7 日受害地址、归集地址、交易哈希和经 USDT0 收款的以太坊地址。比对交易和公开证据时，请核对各地址角色。

| 地址或交易哈希 | Bitquery 标注的角色 |
| --- | --- |
| `TUYFAa8hHjeEW6bPqBJ4v3RjQR2uKM1Svk` | 手续费钱包，10 月 5 日首次收到资金 |
| `TNJPXRWEptdSzbC1pYGp8suyTao4qddJe6` | cpa.rip 案例的归集地址 |
| `TEDjNzXWsTrRcHmRnGPPqGRmqCmrA1vvGZ` | 初始数据集中最大的归集地址，974,487 USDT |
| `TXgDHFfNia3PmJKM5u5U35ePDku7TUV6Xo` | 10 月 5 日首个归集地址 |
| `TEdbrs5teWWyzAtP639fRAX2yKNPCSMqJe` | 初始数据集中 11 月 3 日至 4 日时段的最后一个归集地址 |
| `FF1625CB54E87A93E5051C53EB8999AEDE30C81E7B7FA5DA474681E44D085967` | 519,093 USDT 的盗币交易 |
| `TWUPpTF63yevhZ55eoN6CbDodZzgp856n4` | 共用钱包，JustLend 路径 |
| `TZ7soEw5nn5mvC9k5pNszB74261Hjotfbf` | JustLend 追踪终点 |
| `TMXawuHt4RoYUQ9pynNsyzqpTxxxLKZHsY` | CCE Cash 热钱包，研究者标签 |
| `TX5XiRXdyz7sdFwF5mnhT1QoGCpbkncpke` | NEAR Intents 热钱包，研究者标签 |
| `TXsDYB9ovFEFg4cja6gn1t1tpmrnSbYhHA` | Butter Network 跨链桥，研究者标签 |
| `TU4vEruvZwLLkSfV9bNw12EJTPvNr7Pvaa` | Bybit 热钱包，研究者标签 |
| `TJtEySoVuAkk3xwXghLgrUFVKSMq9JkE18` | HitBTC 热钱包，研究者标签 |
| `TSUYvQ5tdd3DijCD1uGunGLpftHuSZ12sQ` | USDD 铸币合约，研究者标签 |
| `0x007147f598748749486041f5798b0b1379e13097` | 向 deBridge 接收地址付款的以太坊中枢 |
| `0x3579c70e5d8cfbb0f5303029a1eb8fb903360ea5` | 以太坊和 BNB Chain 归集地址 |
| `0xbece605be3abdfa57fc36f52bdb139a52e22c93d` | 以太坊上的 deBridge 接收地址 |
| `TS9BPC4zvtxbQNRHdahnQ3GqQajdo5BkBN` | 经 LI.FI 后的首个新 TRON 地址 |
| `TXPryvpXUqruHnx4hbgXrDYKN8wTkfMq73` | 2021 年启用、11 月 7 日被清空的钱包 |
| `TJCY7r7shYmy3yWncGB9MvwWa8QS6du2C5` | 11 月 7 日最大的新增归集地址 |
| `0cd0f9f1a5526f222f74fd3c50879e260b78b2c61c90bb5bbe58d5a753ad618b` | 约 601,752 USDT 的盗币交易 |
| `0x774a59948c17dc159727601c411113b838e1bbee` | 经 USDT0 收款的以太坊钱包 |

**11 月 23 日修订。** Bitquery 现估计，10 月 5 日至 11 月 21 日，68 个关联归集地址从 535 个 TRON 地址取走至少 599 万 USDT。新统计的 11 月 12–21 日这波涉及 84 个钱包、13 个归集地址和 57.1 万美元，其中约 32.9 万美元在 11 月 20 日收到手续费补款后 24 秒被取走。研究将 22 笔中转转账背后的原始钱包计为受害者，没有把中转地址算作额外受害者。整项调查中，四个钱包在收到新资金后再次失窃。累计数据与此前报告及 PublicAML 的统计有重叠，不能相加，也不能把地址数等同于人数。这仍是 Bitquery 未经独立证实的估计，并非厂商确认的损失清单。

研究最后观察到手续费钱包于 11 月 20 日资助盗窃，追踪到的盗窃延续至 11 月 21 日，数据截止为 11 月 23 日 UTC 上午。这不能证明活动已经结束。第三波仅统计 USDT，排除了未追清的桥接流入及其他潜在受害者，未核查 USDT0 之后的最终去向。此前另计的八条链至少 10.3 万美元估计仍采用 10 月 25 日估值。手续费关联不能证明同一操作者、受害设备或应用漏洞。Bitquery 讨论了 Confiant 的 MoldyRoost 报告，但没有钱包地址证据把该广告活动与这些盗窃关联起来。不能据此认定 Trust Wallet 平台整体失陷或所有案例采用同一种 iPhone 利用链。

扩充后的带角色记录新增以下三个地址；上文原有 20 个地址及两个交易哈希仍有调查价值：

| 地址 | Bitquery 11 月 23 日记录中的角色 |
| --- | --- |
| `TEFY7DSapNYDtcZu84DzCpQh4Rhq6BuLB7` | 第三波最大归集地址，11 月 20 日 |
| `TF4JFYMYFoLTPpiJ2CMnmNMdZth754zz4A` | 11 月 21 日使用的中转地址 |
| `TUAtYvYgHH72UYZbjdgXpcpynbPtCix6K5` | 第三波转往 USDT0 的出口 |
