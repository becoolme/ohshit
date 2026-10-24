---
title: "ConnectWise Cloud Backup 的应用密钥被盗，攻击者从正门大摇大摆走进了 Microsoft 365 租户"
headline: "ConnectWise：偷到一个应用密钥，白捡 170 个租户"
summary: >-
  ConnectWise 多租户备份应用（前身是 SkyKick）的一个 API 密钥被盗。所有授权过这个应用的 Microsoft 365 租户，一下子都能被人拿着客户当初授予它的权限访问。ConnectWise 暂停了多项云服务。
splash: "使用 ConnectWise Cloud Backup 或 Cloud Management 的 Microsoft 365 租户：确认 173 个，约 1000 个出现攻击活动"
wipe: "禁用受影响应用连接，保留 Entra 证据，检查应用凭据和权限；仅在厂商指引下重新授权"
inTheWildNote: Huntress 已在 2 个租户中确认了入侵后的活动
oneLiner: >-
  备份应用本来就握着每个客户 Microsoft 365 的钥匙；把应用自己的密钥偷到手，这些钥匙就一把全拿走了，连钓鱼都省了。
timeline:
  - date: 2026年10月13–14日
    title: 攻击者的 IP 发起密码喷洒
  - date: 2026年10月14日
    title: ConnectWise 发现问题
  - date: 10月15日 06:13–08:34 UTC
    title: 批量获取 Microsoft Graph 令牌
    body: 一个被滥用的 Cloud Management 应用（“MS Teams”）在某个租户里给自己加了全局管理员，还给其他应用添加了密钥，其中包括 Huntress 的应用。
  - date: 2026年10月16日
    title: Huntress 和 ConnectWise 公开披露
    body: 截至 19:00 UTC 确认 162 个租户，后来增至 173 个。
  - date: 10月17日 07:00 UTC
    title: 七个应用身份被禁用，Cloud Backup 暂停服务
    body: 第二天，SaaS Security 和 Cloud Management 也出于谨慎暂停服务。
  - date: 2026年10月21日
    title: 开始分阶段恢复
  - date: 2026年10月21日
    title: 微软将事件归因于 Storm-0940
    body: ARTEX 加速了针对超过 2,250 个租户的访问尝试；被盯上不代表已发生数据窃取。
  - date: 2026年10月23日 14:00 UTC
    title: ConnectWise 明确恢复工作仍在验证中
    body: 计划在成功验证后于下周初先开放现有备份还原，再恢复完整服务注册；两者均未确认可用。
checklist:
  - title: 在 Entra ID 里找出 ConnectWise / SkyKick 的应用
    hint: 盘点应用 ID 和服务主体 Object ID，已经停用的集成也要查
  - title: 检查登录和审计日志，有记录则回溯至 10月1日
    hint: 删应用前先保留证据；有日志则把服务主体登录回溯至 10月1日，不要只查已知 IP
  - title: 检查有没有新增的全局管理员
    hint: 由服务主体做的角色分配是最明显的信号
  - title: 逐个检查应用有没有新增密钥或证书
    hint: 攻击者给租户里的其他应用加过凭据
  - title: 等 ConnectWise 恢复服务后再重新授权
    hint: 收到对应服务的厂商指引前，保持受影响连接禁用。10月23日通知计划在测试通过后先开放备份还原，再恢复完整注册；获准恢复时仅授予最小权限
sources:
  - says: 10月23日仍在进行恢复测试；先开放备份还原，之后恢复完整注册；连接须保持禁用。归档仍加密、隔离并保留，无入侵迹象
  - says: 约 1000 个租户出现攻击活动，300 多个得手，2 个确认有入侵后活动
  - says: 确认 173 个租户；援引微软的说法，Directory.ReadWrite.All 很可能被滥用
  - says: 服务暂停的时间线
  - says: 将事件归因于 Storm-0940；利用 ARTEX 针对超过 2,250 个租户；保留证据并排查下游持久化
---
备份应用需要对租户有很大的访问权限：每个邮箱、每个 OneDrive、每个 Team 都要读。在 Microsoft 365 里，这份权限挂在厂商的**多租户应用**上。所以厂商的应用密钥，就是所有点过“接受”的客户的万能钥匙。

这次，攻击者拿到了 **ConnectWise Cloud Backup 应用的一个 API 密钥**（也就是原来的 SkyKick 产品）。他们从厂商自己的主租户出发，用这个密钥为客户租户申请 Microsoft Graph 令牌。另外还有六个 ConnectWise Cloud Management 应用也被滥用，其中一个在某个客户租户里给自己加了**全局管理员**，还给其他应用添加了密钥。

Huntress 在大约 1000 个 Entra 租户里看到了攻击活动，其中 300 多个得手，并在两个租户里确认有人实际上手操作过。有没有数据被盗目前还不清楚。Graph 的目录读取操作不会留下审计记录，所以这里的“没有证据”不等于“什么都没发生”。

**10月22日更新：** 微软将事件归因于与中国有关联的 Storm-0940，并披露该攻击者借助 ARTEX 尝试访问超过 2,250 个租户。这是访问尝试涉及的数量，不是更新后的确认受害者总数。微软在部分环境中观察到后续凭据和角色变更，但明确表示仅凭认证成功不能证明数据被盗。应保留证据、禁用受影响连接，并在重新授权前检查其他应用凭据是否被植入持久化后门。评级保持 L4。

**10月24日更新：** 厂商 10月23日 14:00 UTC 通知明确，恢复测试和安全验证仍在进行。10月21日开始分阶段恢复工作，不代表客户功能已经可用。ConnectWise 预计周末结束前完成验证，下周初先开放现有备份还原，随后恢复完整服务注册。这些是附带条件的计划，并非已确认的恢复日期。收到对应服务的厂商指引前，应保持受影响应用连接禁用，并继续逐个调查租户；厂商恢复服务不能清除租户中的持久化访问。
