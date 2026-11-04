---
title: Chainalysis 安全维护影响更多产品及 KYT 功能
tags:
- Chainalysis
- SaaS
- 数据泄露
summary: Chainalysis 已暂停 Reactor、Data Solutions、Chain（Beta）及 Rapid，Academy、Knowledge Base 及部分 Hexagate 功能可能受影响，管理门户功能已恢复，KYT 存在功能例外。KYT 和 Address Screening 的其他功能继续运行。客户用户 ID、姓名、邮箱及组织角色已遭访问；尚无调查内容、明文密码、MFA 密钥或会话令牌遭访问的证据。
splash: Chainalysis 客户：四项产品暂停，Academy 和 Hexagate 可能受影响，KYT 存在例外；身份数据影响范围仍在调查
wipe: 启用双因素认证，审查异常登录或重置提示，获取本组织受影响记录明细
inTheWildNote: Chainalysis 确认系统、工具及客户身份数据遭未授权访问。
cves: []
fixed: []
timeline:
- date: 2026年10月30日
  title: Chainalysis 发布事件通告及完整客户邮件
- date: 2026年11月2日
  title: Chainalysis 下线部分产品
  body: 公司主动停用 Reactor 和 Data Solutions 等产品，等待外部专家完成安全评估。博客称合规交易监控继续运行并受到密切监测；状态页列出的例外见下文。
- date: 11月2日 15:50 UTC
  title: 状态页明确交易监控的例外情况
  body: KYT 和 Address Screening 正常运行，但 KYT 的 Graph preview 及其与 Reactor 的集成功能除外。
- date: 11月2日 17:26 UTC
  title: 维护期间可能出现登录问题
  body: Chainalysis 提醒，关键维护持续期间，用户可能遇到登录问题。
- date: 11月2日 19:43 UTC
  title: 更多产品及监控功能受影响
  body: 除 Reactor 外，Data Solutions、Chain（Beta）及 Rapid 也暂时不可用；部分 Hexagate 监控能力可能受影响。
- date: 11月3日 14:30 UTC
  title: Academy 培训平台也可能无法访问
  body: 公司将培训平台列入安全维护影响范围；仍在恢复系统，未给出恢复期限。
- date: 11月3日 17:00 UTC
  title: Academy 受影响考试可获时间安排调整
  body: 公司称，将视情况为受影响的认证或考试用户增加时间或延长期限；系统恢复仍在进行。
- date: 11月3日 19:56 UTC
  title: 客户管理门户部分功能也可能不可用
  body: 安全维护仍在继续；公司新增 Customer Admin Portal 部分功能可能暂时不可用的说明，未宣布全部系统恢复。
- date: 11月3日 23:05 UTC
  title: 客户管理门户功能恢复
  body: 此前受影响的门户功能已恢复，其他安全维护和产品限制继续；事件现另列 Rapid Lookup。
- date: 11月4日 08:28 UTC
  title: Knowledge Base 访问也受影响
  body: Chainalysis 将知识库纳入持续安全维护的影响范围，仍在恢复系统。这是可用性更新，并非确认更多资料遭访问。
checklist:
- title: 启用双因素认证
  hint: 若组织尚未启用，向现有 Chainalysis 客户经理寻求协助。遇到异常认证或密码重置提示，先通过日常登录入口核实，再作回应。
- title: 确认本组织的暴露范围
  hint: 跟进厂商直接发送的客户更新，并索取承诺提供的记录明细。谨慎对待陌生资产追回或招聘消息，通过既有联系人核实发件人，不要依赖消息中的链接。
- title: 按具体产品安排中断应对
  hint: 依赖 Reactor、Data Solutions、Chain（Beta）或 Rapid 前，查看官方安全维护事件页并向客户经理核实。部分 Hexagate 监控可能受影响；KYT 和 Address Screening 其他功能运行正常，但 KYT 的 Graph preview 及 Reactor 集成除外。登录也可能出现问题。11 月 3 日 14:30 UTC 的更新还提醒 Academy 培训平台可能无法访问；维护持续，尚无恢复期限。将可疑活动报告给 IT 或安全团队，并遵循既有流程。 11 月 3 日 17:00 UTC，官方称将视情况为受影响的认证或考试增加时间、延长期限。通过既有客户经理确认自己考试的具体安排，不要假定所有截止时间自动顺延。 11 月 3 日 19:56 UTC 更新还称 Customer Admin Portal 部分功能可能暂时不可用；23:05 UTC，公司确认此前受影响的门户功能已恢复；通过事件详情和既有客户经理核实剩余限制，这不代表服务或安全处置全部完成。11 月 4 日 08:28 UTC 更新还指出 Knowledge Base 访问受影响；文档不可用时，通过既有支持渠道或客户经理获取帮助。
sources:
- name: Chainalysis 原始通告及完整客户邮件
- name: BleepingComputer 报道及公司回应
- name: Chainalysis 安全维护事件历史
  says: 列出具体产品中断、KYT 例外及可能的登录和 Hexagate 影响；11 月 3 日 14:30 UTC 新增 Academy 可能无法访问的说明。 17:00 UTC 新增受影响认证与考试的时间安排调整。 19:56 UTC 新增客户管理门户部分功能可能不可用；23:05 UTC 确认该功能恢复，另将 Rapid Lookup 列为受影响调查组件。11 月 4 日 08:28 UTC 新增 Knowledge Base 访问受影响的说明，恢复仍在进行。
---

公司描述了攻击性智能体技术，但未指明攻击框架、CVE 或完整访问时间范围。调查尚未发现图谱、笔记、案件、交易或查询结果、明文密码、MFA 密钥及会话令牌遭访问的迹象；这是阶段性评估，并非证明暴露不可能发生。修补和外部调查仍在继续。Chainalysis 明确将此事件与币安被盗区分。L3 反映已确认的客户数据访问，尚无大规模泄露总量。

**11 月 2 日服务更新：** Chainalysis 称仍在应对此事件相关的持续网络威胁，已主动停用 Reactor 和 Data Solutions 等部分产品，等待外部安全专家进一步评估。博客称合规交易监控继续运行并受到密切监测，但需结合下文状态页列出的例外理解。这些决定不代表新增数据暴露已获确认，也不代表完成遏制；调查和各组织具体影响核查仍在继续。

**具体产品状态：** 11 月 2 日的状态历史补充了此前笼统的交易监控说明：KYT 的 Graph preview 及其与 Reactor 的集成，是 KYT 和 Address Screening 正常运行的例外。状态页还列出可能的登录问题、Chain（Beta）及 Rapid 额外中断，以及部分 Hexagate 监控可能受影响。11 月 3 日 14:30 UTC 的更新新增 Academy 培训平台可能无法访问的说明；维护仍在继续。这些可用性影响不代表新增数据访问，也不代表已完成恢复。

**11 月 3 日考试安排更新：** 11 月 3 日 17:00 UTC，官方称将视情况为受影响的认证或考试增加时间、延长期限。通过既有客户经理确认自己考试的具体安排，不要假定所有截止时间自动顺延。

**11 月 3 日管理功能更新：** 11 月 3 日 19:56 UTC 更新还称 Customer Admin Portal 部分功能可能暂时不可用；23:05 UTC，公司确认此前受影响的门户功能已恢复。通过事件详情和既有客户经理核实剩余限制，这不代表服务或安全处置全部完成，也不代表新增数据暴露已确认或门户全部功能曾停用。

**11 月 3 日 23:05 UTC 恢复：** 此前受影响的 Customer Admin Portal 功能已恢复。同一原始更新明确表示更广安全维护继续，事件亦将 Rapid Lookup 与 Reactor 并列为受影响组件。这不代表全部产品恢复，不改变 KYT 例外，也未完成资料范围调查。此前考试安排及凭据防范要求仍适用。

**11 月 4 日文档访问更新：** 08:28 UTC，公司将 Knowledge Base 访问纳入维护影响范围。文档不可用时，通过既有支持渠道或客户经理获取帮助；这不能证明更多资料暴露或服务已全部恢复。
