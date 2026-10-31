---
title: Amplitude 披露事件数据暴露，影响不足 0.3% 的客户账户
tags: [Amplitude, 分析服务, 数据泄露]
summary: Amplitude 确认内部系统遭未授权访问，不足 0.3% 的客户账户的事件数据受影响。公司称已遏制 9 月 28 日的事件，并联系受影响客户；具体暴露字段及涉及人数尚未公布。
splash: 事件数据位于受影响内部系统的 Amplitude 客户，具体范围以厂商通知为准
wipe: 遵循厂商直接通知，确认受影响事件字段，并评估下游披露义务
inTheWildNote: Amplitude 确认发生未授权访问，并非仅存在理论漏洞。
cves: []
fixed: []
timeline:
  - date: 2026年9月28日
    title: Amplitude 称发现并遏制未授权访问
  - date: 2026年10月28日
    title: 客户通告公布事件数据影响范围
checklist:
  - title: 确认自身受影响范围
    hint: 遵循 Amplitude 直接通知，或向 security@amplitude.com 确认受影响项目、事件字段及时间范围。不能把客户账户比例当作涉及人数。
  - title: 评估已发送的数据
    hint: 将厂商确认的范围与事件数据结构、保留记录对照；若采集过敏感字段，请安全及隐私团队参与评估。软件更新无法撤回此前已暴露的数据。
sources:
  - name: Amplitude 10 月 28 日客户安全通告
---

Amplitude 明确将该事件与近期 PHP 和 Node.js 漏洞区分。公司称有独立取证支持，其他客户的终端用户信息未暴露。入侵方式及攻击者尚未说明。L3 反映主流分析服务已确认的数据暴露，现有证据不足以确立大规模泄露或涉及人数。
