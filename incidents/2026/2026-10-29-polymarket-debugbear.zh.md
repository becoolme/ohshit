---
title: Polymarket 确认第三方遭入侵；研究人员发现 DebugBear 脚本盗币逻辑
tags: [Polymarket, DebugBear, 供应链, 加密货币]
summary: Polymarket 复盘确认攻击者通过失陷的监控脚本滥用会话。平台称被盗资金为 270 万美元，另补偿暂停交易损失 120 万美元，截至 10 月 30 日已向 95% 的受影响钱包退款。交易已恢复，活跃会话已重置；受影响用户总数仍未披露。
splash: 加载恶意脚本的 Polymarket.com 已登录用户；DebugBear RUM 客户应移除嵌入代码
wipe: 关闭受影响标签页，通过干净会话核查账户活动，并从自有网站移除 DebugBear RUM 嵌入代码
inTheWildNote: Polymarket 确认服务商遭入侵，并承诺赔付受影响用户。
cves: []
fixed: []
timeline:
  - date: 10月29日 17:38 UTC
    title: Polymarket 报告钱包出现未经授权的活动
  - date: 10月29日 18:05 UTC
    title: Polymarket 暂停新交易和 relayer 操作
  - date: 10月29日 18:37 UTC
    title: Polymarket 确认服务商遭入侵并承诺赔付
  - date: 10月29日 19:05 UTC
    title: 官方状态历史将事件标记为已解决
  - date: 10月29日 19:49 UTC
    title: Bitquery 快照追踪到 737 个被盗账户
    body: 针对特定路径的分析统计出 985 笔提款、约 273 万美元；这些是研究估算，并非独立人数或事件最终总额。
  - date: 10月30日 20:07 UTC
    title: 复盘披露遏制措施及赔付进展
    body: Polymarket 报告已清理缓存、重置活跃会话，总赔付金额为 390 万美元。
  - date: 10月30日 23:11 UTC
    title: DebugBear 报告 DNS 经域名注册商遭篡改
    body: 初步调查指向特定客户网站；目前尚无内部系统遭入侵的证据。
checklist:
  - title: 关闭受影响标签页，核查账户活动
    hint: 拒绝异常签名请求。通过干净会话检查订单、持仓变动和钱包转账，保留时间戳及交易哈希并联系官方支持；按支持指引检查会话、API 凭据及权限。断开钱包连接不会吊销链上授权，也不会撤销转账。不要向所谓资产追回人员提供助记词。
  - title: 从自有网站移除 DebugBear RUM
    hint: DebugBear 要求 RUM 客户移除嵌入代码。检查模板、标签管理器及生成后的页面。此警告不限于 Polymarket，但不代表每个 DebugBear 客户均遭攻击。
  - title: 排查已捕获的恶意样本
    hint: '在留存脚本和请求日志中检查 cdn.debugbear[.]com/C7xcKKrjUnXK.js；SHA-256 0755e767504d8103f6c27b9e765a1026507a17c04513242adb503df7777879e5；接收地址 0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18；跟踪 ID 4c6b64a0-a7ef-4c0f-9c70-3a4e6f89065c；以及 data.debugbear[.]com/metrics/submit、/metrics/update、/metrics/handle 和配置路径 /metrics/init。保存证据，不要执行样本。单独匹配不能证明遭入侵：这些主机也承载正常监控流量，远程配置还可改变接收地址。'
  - title: 通过官方渠道核对自动赔付
    hint: Polymarket 称符合条件的钱包无需申领或提交工单；10 月 30 日复盘提供官方复核表单，处理漏付或金额争议。应从官方事件页进入，拒绝陌生资产追回消息。95% 是当时的钱包统计，并非当前已全部完成的保证。
  - title: 比对带日期的 Bitquery 追踪清单
    hint: "Bitquery 带日期的清单含 16 个角色条目（15 个不同值）：Polygon 接收地址 0x3f99139f1c5854bb628c2e576aaf638e99dffc18；最大单笔盗取交易 0xc6fcf3a65c85eb322fe41c193f74bb37845e19be29364b126d3ea7a149f78dcc；gfg44433 账户 0x5a2764fbbe5d139ef0ed988ec5f95320ce730c0b；Polygon 分流钱包（1,530 万 POL） 0xe4c4c39c1733e1c7c06b79f97ed442b68df41ec6；Polygon 分流钱包（430 万 POL） 0x5392587814ce8c6af6789764f88e5e9ab0b9962c；Polygon 及 Ethereum 上的桥接钱包（清单分列两项） 0xc91ee0574a14446de200923729c349b9cae19b60；Polygon 桥接钱包（328 万 POL） 0x3f7019221a925537dc20767c38e80a7127fb1ffa；Ethereum 归集钱包 0xe5e76a4d73f3bfb5cc9a8f53d4f8459fcac495f6；Ethereum 中转钱包 0x74e940e4eb470a9d8b78c5eb8919938041219897；Polygon 桥接转入交易 0x6ff9322601c17bd3f82933c5a9399a615d7c8687f786646225531a9369af7738；Polygon 桥接提取交易 0x744fdeed0629d9704f42817de0cbbe04626a0a8860892fa411daa440a054825f；Ethereum 兑换钱包 0x9ab3c17b1a37886f1d702945fcf8016e3e549b18；deBridge 转入交易 0xa7727418d0c2dce55461840c41ef017d2646feb72f18e5bb74ad4af20b884351；Polymarket 钱包工厂 0x00000000000fb5c9adea0298d729a0cb3823cc07；Polygon 上的 Relay 路由器 0xb92fe925dc43a0ecde6c8b1a2709c170ec4fff4f。应比对历史交易，而非仅看当前余额。工厂和路由器属于正常基础设施，不是攻击者钱包；账户标签不代表已核实的个人身份。单独匹配不能证明遭入侵或损失。数字和余额仅截至 10 月 29 日 19:49 UTC，完整上下文见所列报告。"
sources:
  - name: Polymarket 官方状态历史
    says: 记录 10 月 29 日的暂停交易、服务商入侵、赔付承诺及解决状态，并明确标注 UTC 时间。
  - name: Hudson Rock 研究报告
    says: 直接阅读静态分析报告，核实会话复用及资产转移逻辑、捕获样本的指标，以及财务和暴露窗口证据的明确局限。
  - name: DebugBear 安全通知
    says: 厂商原始通知；通过下方 X 官方嵌入副本阅读。
  - name: DebugBear 通知的 X 官方嵌入副本
    says: DebugBear 确认正在遭遇安全事件，要求 RUM 客户移除嵌入代码。
  - name: Polymarket 10 月 30 日官方复盘
  - name: DebugBear 10 月 30 日调查进展
    says: 报告经域名注册商发生的 DNS 篡改、收件中断及初步影响范围；公开帖文元数据标注发布时间为 10 月 30 日 23:11 UTC。
  - name: Bitquery 10 月 29 日原始链上调查
    says: 追踪单一接收路径至 10 月 29 日 19:49 UTC，提供账户、提款统计及 16 项清单；早于平台复盘及退款。
---

Polymarket 国际平台于 10 月 29 日确认服务商遭入侵，并承诺赔付受影响用户。状态页现已将中断标记为已解决。评为 L4 是因为发生了真实入侵，而非仅有理论漏洞。

Hudson Rock 将恶意脚本追溯到 DebugBear 的分发 URL。样本复用已登录应用的交易客户端和签名器，尝试转移持仓代币，或卖出持仓后转移资产。这不能证明每次签名请求都会静默成功，也不能证明私钥被导出或智能合约遭攻破。移除脚本不能证明每个已打开的会话均已安全。

平台通知未点名服务商；DebugBear 则独立确认了安全事件。确切暴露窗口、攻击者如何取得注册商访问权限及受影响人数仍不清楚。下方平台后续数字取代了此前缺少厂商损失估算的状态；钱包余额和个别自报损失不能代表损失总额。这是独立的 10 月事件，不能套用 6 月事件的数据。

**10 月 30 日复盘：** Polymarket 报告已移除脚本、清理缓存并重置活跃会话。平台将 270 万美元列为被盗资金，120 万美元列为暂停交易相关损失：390 万美元是总赔付，并非被盗金额。当时 95% 的退款进度包含被盗钱包退款及善意补偿。这些是平台数字，不是独立审计。平台还说明正在加强脚本完整性控制，并继续调查。

**DebugBear 10 月 30 日进展：** 服务商称其 DNS 记录经域名注册商遭到篡改。初步调查指向一个客户网站，目前未发现内部系统遭入侵的证据，调查仍在继续。这不能证明其他客户未受影响，也不代表可以安全恢复监控脚本。DebugBear 还称当时其域名无法接收邮件；应关注其公开更新，不要假定支持邮件已被收到。

**链上范围快照：** Bitquery 针对主要路径统计到 737 个被盗账户、985 笔提款，另有 33 个账户发生持仓代币转移，数据截至 10 月 29 日 19:49 UTC。这些是研究定义的账户，不是独立人数；未核对重叠前不能将 33 与 737 相加。约 273 万美元是使用当时兑换价格计算的特定路径估算，不能再加到 Polymarket 的 270 万美元被盗金额或 390 万美元总赔付中。该快照不反映后续退款，也不能确定当前暴露人群。
