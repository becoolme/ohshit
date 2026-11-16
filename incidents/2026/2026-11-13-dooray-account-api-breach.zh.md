---
title: NHN Dooray 确认密码重置和 API 遭滥用，部分账号被接管、资料被窃
tags: [Dooray, SaaS, 数据泄露, API 密钥]
summary: NHN Dooray 表示，攻击者反复猜测密码重置验证码，接管部分账号。Open API 的另一处漏洞导致部分 API 密钥泄露，随后被用于未授权调用。Dooray 确认资料被窃，并吊销全部现有 Service API 和 Admin API 密钥。
splash: 涉及部分 Dooray 客户账号及 NHN Dooray 自身业务记录中涉及的人员。私营和公共部门客户的 API 集成暂停。
wipe: 重置失陷账号的密码，启用双因素认证，并按 Dooray 指引重新签发已吊销的密钥后再恢复集成。
inTheWildNote: NHN Dooray 确认发生账号接管、未授权 API 调用和资料被窃。
timeline:
  - date: 11月12日至13日
    title: 攻击者进入 Dooray 账号并调用 API
    body: NHN Dooray 随后披露，攻击者猜中了密码重置验证码，并使用了泄露的 API 密钥。
  - date: 11月13日
    title: Dooray 暂停 Service API 和 Admin API
    body: Dooray 吊销两类 API 的全部现有密钥，导致集成和自动化中断，并向韩国互联网振兴院报告事件。
  - date: 11月14日
    title: Dooray 确认资料被窃并开始通知受影响人员
    body: Dooray 列出可能涉及的字段，实际泄露字段以个别通知为准。厂商表示已向韩国个人信息保护委员会报告。
checklist:
  - title: 保护受影响账号
    hint: 通过平时使用的 Dooray 登录页立即重置确认失陷的账号密码。按 Dooray 建议更改其他 Dooray 账号密码，并在尚未启用的账号上开启双因素认证。请管理员检查异常密码重置和登录。
  - title: 盘点使用已吊销密钥的集成
    hint: 检查自动化任务、密钥库和已连接工具中的 Service API 和 Admin API 凭据，并查看可用的 API 日志有无异常调用。关注官方恢复通知，按说明换发已吊销密钥，测试集成后再恢复排队任务。
  - title: 确认被窃字段并报告异常活动
    hint: 查阅 Dooray 发出的个别通知，确认涉及哪些字段。通过独立渠道核实意外请求，不要透露密码或验证码。怀疑出现进一步损害时，通过厂商公告所列的 help@dooray.com 或 1800-3629 联系。
sources:
  - name: Dooray 11 月 13 日 API 暂停公告
    says: 说明密钥吊销、受影响的集成，以及恢复时如何通知管理员。
  - name: Dooray 11 月 14 日泄露公告
    says: 确认两条攻击路径、资料被窃、处置措施及账号保护建议。
---

NHN Dooray 为私营机构和公共部门提供协作平台。厂商称，攻击者在找回密码流程中反复输入验证码，验证通过后改密并登录。Open API 的一处漏洞还导致部分密钥泄露，厂商确认外部人员使用这些密钥调用了 API。Dooray 封锁了攻击所用的 IP 地址，加强了密码重置验证，吊销现有 Service API 和 Admin API 密钥，并暂停了两类 API。

可能泄露的客户数据包括项目、云盘、即时通讯和日历中的业务资料，以及员工账号 ID、姓名、外部邮箱、电话号码、部门、职级、职务和单位名称。NHN Dooray 也报告其自身业务记录中的个人信息遭泄露，可能涉及姓名、电子邮箱、手机或其他电话号码、职务、部门及单位名称。实际涉及的字段以个别通知为准。厂商未公布受影响人数或机构数量，也未说明哪些公共部门客户遭遇资料失窃，或 API 何时恢复。
