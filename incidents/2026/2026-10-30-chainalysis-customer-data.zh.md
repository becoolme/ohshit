---
title: Chainalysis 持续响应安全事件，主动下线 Reactor 和 Data Solutions
tags:
- Chainalysis
- SaaS
- 数据泄露
summary: Chainalysis 已下线 Reactor 和 Data Solutions，以完成进一步安全评估。合规交易监控继续运行并受到密切监测。客户用户 ID、姓名、邮箱及组织角色已遭访问；公司仍称未发现调查内容、凭据或会话令牌遭访问的证据。
splash: Chainalysis 客户：Reactor 和 Data Solutions 已下线，客户身份数据影响范围仍在调查
wipe: 启用双因素认证，审查异常登录或重置提示，获取本组织受影响记录明细
inTheWildNote: Chainalysis 确认系统、工具及客户身份数据遭未授权访问。
cves: []
fixed: []
timeline:
- date: 2026年10月30日
  title: Chainalysis 发布事件通告及完整客户邮件
- date: 2026年11月2日
  title: Chainalysis 下线部分产品
  body: 公司主动停用 Reactor 和 Data Solutions 等产品，等待外部专家完成安全评估。合规交易监控继续运行并受到密切监测。
checklist:
- title: 启用双因素认证
  hint: 若组织尚未启用，向现有 Chainalysis 客户经理寻求协助。遇到异常认证或密码重置提示，先通过日常登录入口核实，再作回应。
- title: 确认本组织的暴露范围
  hint: 跟进厂商直接发送的客户更新，并索取承诺提供的记录明细。谨慎对待陌生资产追回或招聘消息，通过既有联系人核实发件人，不要依赖消息中的链接。
- title: 按具体产品安排中断应对
  hint: 依赖 Reactor 或 Data Solutions 前，通过客户经理核实 Chainalysis 直接发送的更新。两项产品已下线以进一步评估，尚无恢复期限。合规交易监控继续运行，不代表事件已经解决。将可疑沟通或活动报告给 IT 或安全团队，并遵循本组织既有安全流程。
sources:
- name: Chainalysis 原始通告及完整客户邮件
- name: BleepingComputer 报道及公司回应
---

公司描述了攻击性智能体技术，但未指明攻击框架、CVE 或完整访问时间范围。调查尚未发现图谱、笔记、案件、交易或查询结果、明文密码、MFA 密钥及会话令牌遭访问的迹象；这是阶段性评估，并非证明暴露不可能发生。修补和外部调查仍在继续。Chainalysis 明确将此事件与币安被盗区分。L3 反映已确认的客户数据访问，尚无大规模泄露总量。

**11 月 2 日服务更新：** Chainalysis 称仍在应对此事件相关的持续网络威胁，已主动停用 Reactor 和 Data Solutions 等部分产品，等待外部安全专家进一步评估。合规交易监控继续运行，并受到密切监测。这些决定不代表新增数据暴露已获确认，也不代表完成遏制；调查和各组织具体影响核查仍在继续。
