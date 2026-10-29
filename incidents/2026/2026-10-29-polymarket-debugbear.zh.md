---
title: Polymarket 确认第三方遭入侵；研究人员发现 DebugBear 脚本盗币逻辑
tags: [Polymarket, DebugBear, 供应链, 加密货币]
summary: Polymarket 确认服务商遭入侵，并承诺赔付。Hudson Rock 在 DebugBear 脚本中发现针对已登录交易用户的资产窃取代码。交易已恢复；总损失及受影响人数仍未核实。
splash: 加载恶意脚本的 Polymarket.com 已登录用户；DebugBear RUM 客户应移除嵌入代码
wipe: 关闭受影响标签页，通过干净会话核查账户活动，并从自有网站移除 DebugBear RUM 嵌入代码
inTheWildNote: Polymarket 确认服务商遭入侵，并承诺赔付受影响用户。
cves: []
fixed: []
timeline:
  - date: 10月29日 18:05 UTC
    title: Polymarket 暂停新交易和 relayer 操作
  - date: 10月29日 18:37 UTC
    title: Polymarket 确认服务商遭入侵并承诺赔付
  - date: 10月29日 19:05 UTC
    title: 官方状态历史将事件标记为已解决
checklist:
  - title: 关闭受影响标签页，核查账户活动
    hint: 拒绝异常签名请求。通过干净会话检查订单、持仓变动和钱包转账，保留时间戳及交易哈希并联系官方支持；按支持指引检查会话、API 凭据及权限。断开钱包连接不会吊销链上授权，也不会撤销转账。不要向所谓资产追回人员提供助记词。
  - title: 从自有网站移除 DebugBear RUM
    hint: DebugBear 要求 RUM 客户移除嵌入代码。检查模板、标签管理器及生成后的页面。此警告不限于 Polymarket，但不代表每个 DebugBear 客户均遭攻击。
  - title: 排查已捕获的恶意样本
    hint: '在留存脚本和请求日志中检查 cdn.debugbear[.]com/C7xcKKrjUnXK.js；SHA-256 0755e767504d8103f6c27b9e765a1026507a17c04513242adb503df7777879e5；接收地址 0x3F99139F1C5854bb628c2e576Aaf638e99dFfc18；跟踪 ID 4c6b64a0-a7ef-4c0f-9c70-3a4e6f89065c；以及 data.debugbear[.]com/metrics/submit、/metrics/update、/metrics/handle 和配置路径 /metrics/init。保存证据，不要执行样本。单独匹配不能证明遭入侵：这些主机也承载正常监控流量，远程配置还可改变接收地址。'
sources:
  - name: Polymarket 官方状态历史
    says: 记录 10 月 29 日的暂停交易、服务商入侵、赔付承诺及解决状态，并明确标注 UTC 时间。
  - name: Hudson Rock 研究报告
    says: 静态分析发现会话复用及资产转移逻辑；通过公开索引阅读了指标和财务证据的局限。直接获取页面返回 403。
  - name: DebugBear 安全通知
    says: 厂商原始通知；通过下方 X 官方嵌入副本阅读。
  - name: DebugBear 通知的 X 官方嵌入副本
    says: DebugBear 确认正在遭遇安全事件，要求 RUM 客户移除嵌入代码。
---

Polymarket 国际平台于 10 月 29 日确认服务商遭入侵，并承诺赔付受影响用户。状态页现已将中断标记为已解决。评为 L4 是因为发生了真实入侵，而非仅有理论漏洞。

Hudson Rock 将恶意脚本追溯到 DebugBear 的分发 URL。样本复用已登录应用的交易客户端和签名器，尝试转移持仓代币，或卖出持仓后转移资产。这不能证明每次签名请求都会静默成功，也不能证明私钥被导出或智能合约遭攻破。移除脚本不能证明每个已打开的会话均已安全。

平台通知未点名服务商；DebugBear 则独立确认了安全事件。确切暴露窗口、初始入侵方式及受影响人数仍不清楚。钱包余额和个别用户自报损失都不能代表被盗总额。这是独立的 10 月事件，不能套用 6 月事件的数据。
