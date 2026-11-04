---
title: "ConnectWise Cloud Backup 的应用密钥被盗，攻击者从正门大摇大摆走进了 Microsoft 365 租户"
headline: "ConnectWise：应用一把钥匙，租户一排大门"
summary: ConnectWise/SkyKick 应用密钥被盗，攻击者据此访问 M365 租户。11 月 4 日确认 Backup Health 报告、导出任务及 Marketplace API 已恢复；计费、部分平台面板及通知仍未全恢复。须逐租户重新授权并验证新快照；租户排查仍然必要。
splash: "授权过受影响应用的 M365 租户；Huntress 观察到约 1000 个登录目标，300 多个登录成功"
wipe: "禁用受影响应用连接，保留 Entra 证据，检查应用凭据和权限；仅在厂商指引下重新授权"
inTheWildNote: Huntress 已在 2 个租户中确认了入侵后的活动
oneLiner: >-
  备份应用本来就握着每个客户 Microsoft 365 的钥匙；把应用自己的密钥偷到手，这些钥匙就一把全拿走了，连钓鱼都省了。
timeline:
  - date: 2026年10月13–14日
    title: 攻击者的 IP 发起密码喷洒
  - date: 2026年10月14日
    title: ConnectWise 发现问题
  - date: 10月15日 03:44–03:48 UTC
    title: 在一个租户中观察到权限变更及凭据植入
    body: Huntress 后来确认第二个租户也有类似入侵后活动；它未证实较早的变更与之后的公网 IP 登录属于同一操作者。
  - date: 10月15日 06:13–08:44 UTC
    title: Huntress 观察到使用厂商凭据的应用登录
    body: 10月19日更新将最后一次成功登录的观察时间延至 08:44 UTC。
  - date: 2026年10月16日
    title: Huntress 和 ConnectWise 公开披露
    body: Huntress 截至 19:00 UTC 确认 162 个租户存在未经授权登录。THN 后来报道 173 个，这不是独立核实过的总数。
  - date: 10月17日 07:00 UTC
    title: 七个应用身份被禁用，Cloud Backup 暂停服务
    body: 第二天，SaaS Security 和 Cloud Management 也出于谨慎暂停服务。
  - date: 2026年10月19日
    title: Huntress 更新遥测及 IP 分类
    body: 两个租户已确认存在入侵后变更；共享 Azure 地址与失败的密码喷洒需要分别解读。
  - date: 2026年10月21日
    title: 开始分阶段恢复
  - date: 2026年10月21日
    title: 微软将事件归因于 Storm-0940
    body: ARTEX 加速了针对超过 2,250 个租户的访问尝试；被盯上不代表已发生数据窃取。
  - date: 2026年10月23日 14:00 UTC
    title: ConnectWise 明确恢复工作仍在验证中
    body: 计划在成功验证后于下周初先开放现有备份还原，再恢复完整服务注册；两者均未确认可用。
  - date: 2026年10月26日
    title: Huntress 限定 AI 归因置信度，并补充检测建议
    body: 仅凭自身遥测，对 LLM 参与的置信度为低至中等；结合微软归因后为中至高，但不能独立核实攻击者或 ARTEX。
  - date: 10月28日 16:00 UTC
    title: 开放通过新应用重新注册
    body: 合作伙伴须重置门户密码、配置 MFA，并通过 ConnectWise Cloud Backup for M365 为每个 M365 租户重新授权。
  - date: 10月30日 21:00 UTC
    title: 备份、还原和客户监控功能已可用
    body: 对已重新授权的租户，第1和第2阶段已完成；报告、导出任务、计费和通知尚未全部恢复。须确认新快照成功完成，不能将重新授权等同于备份恢复。
  - date: 11月4日 18:55 UTC
    title: 报告、导出任务及 Marketplace API 恢复，区分登录方式
    body: 11 月 3 日已恢复 Backup Health、导出及 Marketplace API；计费、部分平台面板及通知仍不完整。M365 认证登录门户无需重置密码，但须租户管理员同意新应用权限。
checklist:
  - title: 找出并禁用受影响的 ConnectWise / SkyKick 应用
    hint: "在 Entra Enterprise applications 中保留本地服务主体 Object ID 并禁用受影响连接，不要删除应用。Huntress 列出七个应用 ID：506e08f9-6e9a-4da4-942b-a099a03644ae, 2399d300-6fca-4e6a-a686-399fefe75b83, 24205314-2b89-4e07-a2a4-579e898a5640, b78f6a77-d4e5-46fb-87e5-d1648bd02519, 0de14c77-b9b0-4137-9360-34878a929827, 412dcf96-176d-4b3a-a1b0-4981ad66971e, b2b55f5b-7758-4719-8d8f-88ae172e6bdb。名称对应关系见其完整表格，已停用集成也要查。仅存在应用不能证明遭滥用"
  - title: 检查登录和审计日志，有记录则回溯至 10月1日
    hint: 保存 Entra 登录/审计及已有的 Graph 记录，不要因此延迟控制措施。使用 Service principal sign-ins 标签页，而非 User sign-ins；有日志则回溯至 10月1日，不要只查已发布 IP
  - title: 检查有没有新增的全局管理员
    hint: 检查 Entra 中由服务主体做的目录角色分配；保留证据并禁用应用后，撤销未经你授权的权限
  - title: 逐个检查应用有没有新增密钥或证书
    hint: 检查 Enterprise applications 和 App registrations 中自 10月13日起新增的意外密钥或证书。保留证据后删除未经授权的凭据；仅禁用 ConnectWise 不能清除这些入口
  - title: 将已发布指标与应用活动关联
    hint: "微软列出六个 IP 和五个 User-Agent：144.172.64.128, 144.172.64.99, 144.172.64.60, 187.15.88.186, 187.15.90.217, 187.15.89.186；全部 User-Agent 见其完整 IoC 表。三个 VPN IP 需结合 10月15–16日上下文。Huntress 另讨论了 144.172.94.243 及共享 Azure ULA fde4:8dba:2600:37ce:6d26:200:a76:*。Huntress 的公网 IP 应用登录仅观察到 .128，将其他 RouterHosting 地址归为失败用户登录或喷洒；微软则将 .99 和 .60 关联到更广的攻击活动。关联行为者、应用及操作；仅命中指标不能证明入侵，该 ULA 也用于合法流量"
  - title: 检测凭据植入并保留 Graph 可见性
    hint: 对服务主体给自己或同级主体授予 Global Administrator 或 Privileged Role Administrator、自行删除或添加意外凭据设置告警。许可证允许时启用 Graph 活动日志，保留原始 User-Agent 及亚秒时间戳。Huntress 后续报告列出四个 IP（144.172.64.128、144.172.64.99、194.165.16.21、144.172.64.60）及六种 User-Agent 写法（Python-urllib/3.12、curl/7.88.1、python-requests/2.31、python-requests/2.31.0、python-requests/2.34.2、azure-toolkit/1.0）。.21 仅为可能关联；其表格与正文对是否观察到 python-requests/2.34.2 存在分歧，应保留不确定性。仅命中指标不能证明入侵，仅凭节奏也不能认定使用 AI。
  - title: 通过新应用重新注册并验证备份
    hint: 在 login.cloudservices.connectwise.com，若使用门户用户名及密码，则重置密码，并按提示完成 MFA；若使用 Microsoft 365 认证，则无需重置密码，但须租户管理员登录并同意新门户应用权限。再按 Trust Center 对自认证、委派认证或 Partner Center 的对应指引，通过 ConnectWise Cloud Backup for M365 逐租户授权。除非 ConnectWise 明确要求，否则保持旧应用禁用。检查是否有新快照成功完成；重新授权本身不代表恢复，历史备份缺口仍然存在。重置密码反复出现状态码 500 时联系 cloud-support@connectwise.com。继续调查租户，重新注册不能清除持久化访问
  - title: 分别核实各项服务恢复，并保留旧应用证据
    hint: 11 月 4 日 18:55 UTC 公告称 Backup Health、导出及 Marketplace API 于 11 月 3 日恢复；计费（含 Billing API 及管理门户计费报告）、部分平台备份面板尚未全恢复，核心通知已运行，其他通知逐步启用。SaaS Security／Cloud Automation 已恢复，但须另按技术指引重连 M365 及 Azure；Cloud Migration 于 10 月 28 日恢复，活动项目须重新授权。FAQ 对 c921256f-04a7-44e8-9b2a-69c33929ba19 指定：完成新应用认证并收集必要日志后，才可删除这个旧应用；不要推广至所有应用或提前删除证据。
sources:
  - says: 10月30日已重新授权的 M365 租户第1和第2阶段完成；使用新应用、重置门户密码、配置 MFA 并验证新快照。旧应用保持禁用。归档仍加密、隔离并保留，无入侵迹象。11 月 4 日 18:55 UTC 补充： 报告、导出及 Marketplace API 于 11 月 3 日恢复；区分门户密码登录与 M365 认证，后者需管理员同意新应用而无需重置密码。计费、部分平台面板及通知仍未全部恢复，其他服务须分别重连并逐租户验证快照。
  - says: 约 1000 个登录目标，300 多个登录成功，两个存在入侵后变更；七个应用 ID 及带限定条件的 IP / User-Agent 证据
  - says: 报道 173 个受影响租户，但无独立确认的总数；援引 Directory.ReadWrite.All 可能遭滥用
  - says: 服务暂停的时间线
  - says: 将事件归因于 Storm-0940；利用 ARTEX 针对超过 2,250 个租户；保留证据并排查下游持久化
  - name: Huntress 后续遥测分析
    says: 未独立核实微软归因；补充权限、凭据检测及日志建议。正文与指标表对是否观察到 python-requests/2.34.2 存在分歧
---
备份应用需要对租户有很大的访问权限：每个邮箱、每个 OneDrive、每个 Team 都要读。在 Microsoft 365 里，这份权限挂在厂商的**多租户应用**上。所以厂商的应用密钥，就是所有点过“接受”的客户的万能钥匙。

这次，攻击者拿到了 **ConnectWise Cloud Backup 应用的一个 API 密钥**（也就是原来的 SkyKick 产品）。厂商侧凭据被用于给已授权的客户租户申请 Microsoft Graph 令牌。ConnectWise 除 Cloud Backup 外还禁用了六个 Cloud Management 身份，这不代表全部七个都遭到滥用。Huntress 报告了 Teams、Exchange Online 和 SharePoint Online 应用遭滥用；Teams 应用给自己授予了**全局管理员**，并向其他应用添加凭据。

Huntress 在大约 1000 个 Entra 租户里看到了攻击活动，其中 300 多个登录成功，并在两个租户里确认了入侵后活动。THN 较早报道的 173 个租户尚未作为总数得到核实，不能与 Huntress 的登录计数混用。有没有数据被盗目前还不清楚。Graph 的目录读取操作不会留下审计记录，所以这里的“没有证据”不等于“什么都没发生”。

**10月22日更新：** 微软将事件归因于与中国有关联的 Storm-0940，并披露该攻击者借助 ARTEX 尝试访问超过 2,250 个租户。这是访问尝试涉及的数量，不是更新后的确认受害者总数。微软在部分环境中观察到后续凭据和角色变更，但明确表示仅凭认证成功不能证明数据被盗。应保留证据、禁用受影响连接，并在重新授权前检查其他应用凭据是否被植入持久化后门。评级保持 L4。

**10月24日更新：** 厂商 10月23日 14:00 UTC 通知明确，恢复测试和安全验证仍在进行。10月21日开始分阶段恢复工作，不代表客户功能已经可用。ConnectWise 预计周末结束前完成验证，下周初先开放现有备份还原，随后恢复完整服务注册。这些是附带条件的计划，并非已确认的恢复日期。收到对应服务的厂商指引前，应保持受影响应用连接禁用，并继续逐个调查租户；厂商恢复服务不能清除租户中的持久化访问。

**11月1日更新（UTC）：** 厂商10月28–30日通知取代了此前附带条件的恢复预测。已重新授权的 M365 租户可进行备份及还原，客户门户和备份监控面板也已恢复。Backup Health 报告、导出任务和计费功能仍在恢复；通知将在支撑服务就绪后恢复。应重置门户密码、配置 MFA，并按 Trust Center 指引通过新的 **ConnectWise Cloud Backup for M365** 应用逐租户授权。未经厂商明确要求，不要重新启用已禁用的旧应用。须确认新快照成功完成：注册不能消除历史备份缺口，也不能替代租户持久化访问调查。厂商仍表示，保留的备份归档及其他 ConnectWise 产品没有遭入侵的迹象；这是其调查进展，并非独立安全保证。

**Huntress 补充分析：** 其10月27日更新链接的后续报告将已观察到的自动化与 AI 归因分开。Huntress 仅凭自身遥测，对 LLM 参与的置信度为低至中等；结合微软归因后为中至高，不能独立核实 Storm-0940 或 ARTEX。缺少 Graph 请求日志使读取活动无法重建。应检测权限授予与凭据植入，保留详细日志并跨租户排查，不能把请求速度或 IP 命中当作使用 AI 或入侵的证明。后续报告未修改确认受害者总数，也未证实数据窃取。

**11 月 4 日恢复补充（18:55 UTC）：** Backup Health 报告、导出任务及 Marketplace API 已于 11 月 3 日恢复；计费、平台面板的部分内容和通知仍未全部恢复。备份、还原可用仍以逐租户重新授权为前提，必须看到新快照成功完成。此次 FAQ 明确更正此前笼统的门户密码重置指引：使用 Microsoft 365 认证登录的客户无需重置密码，而须管理员同意新应用权限。SaaS Security／Cloud Automation 的 M365、Azure 集成及活动迁移项目需分别重新授权。保留日志并继续逐租户调查；厂商没有访问客户租户审计日志，不能替客户确定是否遭入侵，初始应用凭据取得机制仍在调查。旧 c921256f-04a7-44e8-9b2a-69c33929ba19 应用仅可按上述条件删除，不代表可以重新启用旧应用。
