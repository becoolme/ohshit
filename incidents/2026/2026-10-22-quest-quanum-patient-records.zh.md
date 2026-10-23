---
title: Quest Diagnostics 披露 Quanum 患者记录遭未经授权访问，影响范围仍不明确
summary: Quest 于 10月21日发现 Quanum LSM 遭未经授权访问，并于 10月22日披露。公司认为患者记录被访问，但受影响人数及具体数据字段尚未确定。LSM 访问暂停，核心业务继续运行。
splash: Quanum LSM 中的患者数据；Quest 称客户直连 LIS / EMR 接口不受影响
wipe: LSM 暂停期间使用获准的纸质申请单或 Quanum eLabs；通过 Quest 公告跟踪受影响患者通知
inTheWildNote: 已确认未经授权访问，记录影响范围仍在调查
timeline:
- date: 2026年10月21日
  title: Quest 发现 Quanum LSM 遭未经授权访问
  body: 公司启动控制措施，并与外部专家共同调查。
- date: 2026年10月22日
  title: Quest 通过 SEC 文件披露事件
  body: 部分患者记录可能被访问；公司称业务未受重大干扰。
- date: 2026年10月23日
  title: 客户通知说明暂停的系统和替代方案
  body: Quest 确认涉及 PHI / PII，具体字段仍在调查，并称事件与 PHP 无关。
checklist:
- title: 使用 Quest 批准的下单和结果获取渠道
  hint: Quanum LSM 客户可使用纸质申请单或 eLabs；已通过直连 LIS / EMR 接口下单的客户可继续使用这些未受影响的接口
- title: 维持业务连续性并避免重复下单
  hint: 通过机构工作流程核对未完成的 LSM 订单及结果；缺失结果联系 Quest National Customer Services，eLabs 问题联系 Connectivity Help Desk
- title: 关注官方患者和机构通知
  hint: 查看 Quanum 通知和常见问题；Quest 将识别受影响患者并通知。不要假定所有 Quest 患者都受影响
sources:
- name: Quest Diagnostics SEC 8-K 文件
  says: 10月21日发现；认为患者记录被访问；调查进行中；10月22日签署
- name: Quest Quanum 通知及常见问题
  says: LSM 暂停；Essential Insights 和 LabHQ 预防性暂停；涉及 PHI / PII，并说明未受影响的 LIS / EMR 接口及临时流程
- name: SEC 文件索引
  says: 10月22日提交，用于确定披露日期而非发现日期
---

此次重大医疗服务入侵已获确认，厂商认为患者记录被访问，因此评为 L4；这不代表已证实大规模受害人数。攻击方式、具体记录和受影响人数仍未知，与 Quest 早年的泄露事件应区分。

Essential Insights 和 LabHQ 也被预防性暂停；Quest 称其中数据未被访问。通知仍保留暂定于 10月23日恢复的表述，这不能证明服务已经恢复。
