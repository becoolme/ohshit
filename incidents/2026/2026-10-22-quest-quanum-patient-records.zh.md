---
title: Quest Diagnostics 披露 Quanum 患者记录遭未经授权访问，影响范围仍不明确
summary: Quest 于 10月21日发现 Quanum LSM 遭未经授权访问，并于 10月22日披露。公司认为患者记录被访问，但受影响人数及具体数据字段尚未确定。Quest 已于 10月23日确认服务恢复，数据影响范围仍在调查。
splash: Quanum LSM 中的患者数据；Quest 称客户直连 LIS / EMR 接口不受影响
wipe: 使用已恢复的 Quanum LSM；凭据重置问题联系 Connectivity Help Desk，并关注官方受影响患者通知
inTheWildNote: 已确认未经授权访问，记录影响范围仍在调查
timeline:
- date: 2026年10月21日
  title: Quest 发现 Quanum LSM 遭未经授权访问
  body: 公司启动控制措施，并与外部专家共同调查。
- date: 2026年10月22日
  title: Quest 通过 SEC 文件披露事件
  body: 部分患者记录可能被访问；公司称业务未受重大干扰。
- date: 2026年10月23日
  title: 客户通知确认服务恢复及数据调查继续
  body: Quest 于 19:00 ET（23:00 UTC）确认 LSM 及预防性暂停的系统已恢复。PHI / PII 具体影响仍在调查，事件与 PHP 无关。
checklist:
- title: 使用 Quest 批准的下单和结果获取渠道
  hint: Quanum LSM 已恢复；直连 LIS / EMR 接口仍不受影响。凭据重置问题联系 IT Connectivity Help Desk：1-800-697-9302
- title: 维持业务连续性并避免重复下单
  hint: 将临时通过 eLabs 提交的订单和结果与恢复后的 LSM 核对；Quest 称 eLabs 订单的结果也可在 LSM 中查看
- title: 关注官方患者和机构通知
  hint: 查看 Quanum 通知和常见问题；Quest 将识别受影响患者并通知。不要假定所有 Quest 患者都受影响
sources:
- name: Quest Diagnostics SEC 8-K 文件
  says: 10月21日发现；认为患者记录被访问；调查进行中；10月22日签署
- name: Quest Quanum 通知及常见问题
  says: 10月23日 19:00 ET 更新确认 LSM、Essential Insights 和 LabHQ 已恢复；PHI / PII 范围仍在调查，直连 LIS / EMR 接口不受影响
- name: SEC 文件索引
  says: 10月22日提交，用于确定披露日期而非发现日期
---

此次重大医疗服务入侵已获确认，厂商认为患者记录被访问，因此评为 L4；这不代表已证实大规模受害人数。攻击方式、具体记录和受影响人数仍未知，与 Quest 早年的泄露事件应区分。

Essential Insights 和 LabHQ 曾被预防性暂停；Quest 称其中数据未被访问。10月23日 19:00 ET 更新已确认 LSM 及上述系统恢复。这取代了此前的暂定恢复时间，但不能据此确定患者记录遭访问的完整范围。
