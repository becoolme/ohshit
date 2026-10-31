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
  - date: 10月30日 23:38 UTC
    title: 重申在签发方吊销凭据并报告滥用
  - date: 10月31日 01:04 UTC
    title: 为包括免费用户在内的所有客户启用审计日志
  - date: 10月31日 13:34 UTC
    title: 为所有客户启用 MySQL 和 Redis 密钥轮换
checklist:
  - title: 在签发服务中更换凭据
    hint: 从可信环境停用或轮换工作负载、密钥组及全局密钥中保存的凭据，并更新依赖应用。仅修改环境变量值不会吊销旧密钥。检查服务商用量和账单中的滥用。
  - title: 完成数据库凭据轮换
    hint: 对于 Postgres 和 MongoDB，附加服务 API 会创建替代凭据，但旧凭据在最终确认前仍然有效。更新客户端并验证连接后，完成最终确认以移除旧凭据；不能把启用轮换当作已完成吊销。MySQL 和 Redis 现也支持轮换，但步骤不同，见下方说明。
  - title: 选择 MySQL 轮换范围
    hint: 用户名保持不变。默认 user-facing 模式轮换用户密码，full 模式还会轮换内部密码并重启附加服务。两种模式均在最终确认前保留旧密码。先更新客户端，再最终确认；user-facing 最终确认会断开受影响会话，full 最终确认会重启服务。
  - title: 安排 Redis 重启及客户端重连
    hint: Redis 轮换会重启附加服务，一步吊销旧凭据，客户端需用新密码重连。自行重新部署关联服务。不要为 Redis 调用最终确认端点。不支持无持久化的 Redis，Sentinel 至少需要三个副本；开始前核查部署配置。
  - title: 收紧附加服务暴露面
    hint: 按 Northflank 要求，关闭已启用的附加服务公网访问；通过官方状态通告跟踪恢复进展。
  - title: 检查可用的审计及服务商日志
    hint: Northflank 已向所有套餐开放审计日志。结合这些日志与 AI 服务商的用量、账单检查异常，并向 Northflank 支持及相关服务商报告可疑用量。日志开放不代表覆盖完整历史，也不能证明账户未受影响。
sources:
  - name: Northflank 原始事件更新
  - name: Northflank 附加服务轮换 API
  - name: Northflank 轮换最终确认 API
  - name: Northflank 实时状态更新
---

面向整个平台的预防要求不等于已经证明每个密钥均被窃取。运营方尚未披露入口、攻击者身份或完整暴露时间范围。公告提到网络策略补丁，但未宣布已完成遏制，也未指出能够解决客户凭据暴露的软件修复版本。只轮换数据库凭据，仍会遗漏其他已保存密钥。
