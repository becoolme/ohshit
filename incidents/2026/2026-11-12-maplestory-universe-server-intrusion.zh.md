---
title: MapleStory Universe 确认链下服务器遭入侵，OpenAPI 暂停服务
summary: MapleStory Universe 称，外部人员未经授权访问了部分链下服务器。游戏、市场等公告所列服务于 UTC 11 月 12 日恢复，OpenAPI 仍在维护。
splash: MapleStory Universe 玩家及应用依赖其 OpenAPI 的开发者。
wipe: 重试 API 请求前核对官方维护公告。检查账户活动，按官方指引处理开发者凭据。
inTheWildNote: MapleStory Universe 确认链下服务器遭未经授权的外部访问。
timeline:
  - date: 11月12日 04:05 UTC
    title: MapleStory Universe 开始紧急维护
    body: 公告列出的受影响服务包括游戏客户端、网站、市场、Builder 和 OpenAPI。
  - date: 2026年11月12日
    title: 运营方公开确认未经授权的访问
    body: 事件声明称，部分链下服务器遭未经授权的访问，平台因此进入维护。
  - date: 11月12日 21:40 UTC
    title: 除 OpenAPI 外，公告所列服务恢复
    body: 运营方称 OpenAPI 仍在维护，预计下一周恢复。
checklist:
  - title: 重放请求前检查服务状态
    hint: 打开官方维护公告，分别核对 OpenAPI、游戏和市场的状态。API 不可用期间先暂停重试，恢复后将队列请求与自身记录对账，再决定是否重放。
  - title: 检查凭据与账户活动
    hint: 查阅 Builder 官方公告，确认是否需要换钥。将 API 密钥保存在服务端，通过官方功能轮换受影响凭据。保留异常 API 调用日志，通过官方客服报告陌生账户活动。
  - title: 连接钱包前核实链接
    hint: 直接打开官网，忽略主动发来的迁移或资产追回消息，切勿泄露助记词或私钥。
sources:
  - name: MapleStory Universe 事件声明（X 官方公开嵌入）
    says: 可读的声明开头确认，平台因链下服务器遭未经授权的访问而进入维护。
  - name: MapleStory Universe 维护公告
    says: 列出维护时间、已恢复的服务及仍未恢复的 OpenAPI。
---

MapleStory Universe 披露链下基础设施遭入侵。官方维护公告分别列出了 OpenAPI 和其他服务的恢复状态。事件声明的可读部分确认了服务器入侵。现有一手资料尚不足以核实具体入口、受影响用户总数或钱包损失。
