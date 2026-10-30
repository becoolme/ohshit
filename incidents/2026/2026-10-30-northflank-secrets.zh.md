---
title: Northflank 发生安全事件，要求所有用户立即轮换密钥
tags: [Northflank, 云, 凭据]
summary: Northflank 要求所有用户假定环境变量已被泄露，立即轮换工作负载、密钥组及全局凭据。公告称多名用户确认 AI 密钥被使用；调查仍在进行，尚未公布根因或受害者总数。
splash: 在工作负载、密钥组或全局密钥中保存凭据的所有 Northflank 用户
wipe: 停用或轮换所有暴露的密钥，更新依赖应用，并关闭已启用的附加服务公网访问
inTheWildNote: Northflank 称多名用户确认 AI 密钥被使用；总体范围仍不明确。
cves: []
fixed: []
timeline:
  - date: 10月30日 11:43 UTC
    title: Wiz 警报触发调查
  - date: 10月30日 13:40 UTC
    title: Northflank 公开要求立即轮换
  - date: 10月30日 15:12 UTC
    title: 为所有用户启用 Postgres 和 MongoDB 密钥轮换
  - date: 10月30日 19:28 UTC
    title: 维持全面轮换建议，调查仍在进行
checklist:
  - title: 在签发服务中更换凭据
    hint: 从可信环境停用或轮换工作负载、密钥组及全局密钥中保存的凭据，并更新依赖应用。仅修改环境变量值不会吊销旧密钥。检查服务商用量和账单中的滥用。
  - title: 完成数据库凭据轮换
    hint: Northflank 已为 Postgres 和 MongoDB 启用轮换。其附加服务 API 会创建替代凭据，但旧凭据在最终确认前仍然有效。更新客户端并验证连接后，完成最终确认以移除旧凭据；不能把启用轮换当作已完成吊销。
  - title: 收紧附加服务暴露面
    hint: 按 Northflank 要求，关闭已启用的附加服务公网访问；通过官方状态通告跟踪恢复进展。
sources:
  - name: Northflank 原始事件更新
  - name: Northflank 附加服务轮换 API
  - name: Northflank 轮换最终确认 API
---

面向整个平台的预防要求不等于已经证明每个密钥均被窃取。运营方尚未披露入口、攻击者身份或完整暴露时间范围。公告提到网络策略补丁，但未宣布已完成遏制，也未指出能够解决客户凭据暴露的软件修复版本。只轮换数据库凭据，仍会遗漏其他已保存密钥。
