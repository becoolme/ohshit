---
title: Chainalysis 确认内部系统遭访问，客户身份数据暴露
tags: [Chainalysis, SaaS, 数据泄露]
summary: Chainalysis 确认客户用户 ID、姓名、邮箱及组织角色遭访问。公司称未发现调查内容、认证凭据或会话令牌遭访问的证据；各组织具体记录数量仍在核查。
splash: 已开通用户的身份数据遭访问的 Chainalysis 客户组织，详细范围待确认
wipe: 启用双因素认证，审查异常登录或重置提示，获取本组织受影响记录明细
inTheWildNote: Chainalysis 确认系统、工具及客户身份数据遭未授权访问。
cves: []
fixed: []
timeline:
  - date: 2026年10月30日
    title: Chainalysis 发布事件通告及完整客户邮件
checklist:
  - title: 启用双因素认证
    hint: 若组织尚未启用，向现有 Chainalysis 客户经理寻求协助。遇到异常认证或密码重置提示，先通过日常登录入口核实，再作回应。
  - title: 确认本组织的暴露范围
    hint: 跟进厂商直接发送的客户更新，并索取承诺提供的记录明细。谨慎对待陌生资产追回或招聘消息，通过既有联系人核实发件人，不要依赖消息中的链接。
sources:
  - name: Chainalysis 原始通告及完整客户邮件
  - name: BleepingComputer 报道及公司回应
---

公司描述了攻击性智能体技术，但未指明攻击框架、CVE 或完整访问时间范围。调查尚未发现图谱、笔记、案件、交易或查询结果、明文密码、MFA 密钥及会话令牌遭访问的迹象；这是阶段性评估，并非证明暴露不可能发生。修补和外部调查仍在继续。Chainalysis 明确将此事件与币安被盗区分。L3 反映已确认的客户数据访问，尚无大规模泄露总量。
