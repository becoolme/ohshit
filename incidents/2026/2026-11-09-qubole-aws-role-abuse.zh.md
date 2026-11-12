---
title: 攻击者用与 Qubole 关联的 AWS 凭据进入客户账户
summary: Wiz 与 Sentra 发现，攻击者使用与 Qubole 关联的 AWS 账户的 IAM 凭据接管集成角色。攻击者窃取 S3 数据，读取可能通往 AWS、Entra ID 和 Okta 的密钥。闲置的信任策略仍可授予访问。
splash: IAM 角色信任与 Qubole 关联账户的 AWS 客户账户，包括闲置集成。
wipe: 移除闲置的信任，调查 CloudTrail 和 S3 日志，吊销受影响角色会话并轮换其可访问的密钥。
inTheWildNote: Wiz 与 Sentra 观察到未经授权的角色扮演及 AWS 客户资源访问。
timeline:
- date: 2026年10月8日至11日
  title: Wiz 观察到另一起客户密钥事件
  body: 攻击者使用疑似为 Qubole 创建的客户密钥。Wiz 尚未将这起事件与后续角色扮演关联。
- date: 2026年10月14日至26日
  title: 攻击者扮演客户集成角色
  body: Wiz 观察到密钥收集、被盗凭据有效性验证和 S3 数据外传。
- date: 2026年11月9日
  title: Wiz 与 Sentra 公开调查结果
  body: 两家机构发布角色扮演和数据访问的排查指引。
checklist:
- title: 找出并限制 Qubole 集成角色
  hint: 搜索信任账户 805246085872 的 IAM 策略，包括闲置集成。删除不用的角色或移除厂商主体。对仍在使用的角色，与厂商协调，限定主体、来源网络和权限，并轮换 External ID。
- title: 从 10 月 1 日起排查所有账户
  hint: 查找 CloudTrail 中来自 AWS 网络之外的 805246085872、AIDA3W7DIFLYOLTK63SFS、来自 AWS 网络之外的 AIDAJYRRH5Y3A7AAJM2HW 的 AssumeRole 事件，以及 quiam-* 会话和 TruffleHog 验证。Wiz 列出 15 条指标，包括 57.129.54[.]120、2001:41d0:70d[:]7800::、45.83.220[.]211、185.209.199[.]73、89.37.63[.]175。完整 User-Agent 和 sso_agent.iso 哈希见 Wiz 的指标表。单独命中不能证明失陷。
- title: 遏制会话并确定数据访问范围
  hint: 保留 CloudTrail、S3 数据事件或服务器访问日志及 Entra ID／Okta 登录日志。追踪角色会话对 Lambda、Secrets Manager、SSM 和 S3 的读取。吊销活动角色会话，轮换失陷角色可读的全部密钥，并调查下游使用。
sources:
- name: Wiz 应急响应研究
  says: 记录成功扮演角色、密钥验证、S3 数据外传和检测方法，并在 11 月 11 日提及未经核实的认领。
- name: Sentra 应急响应研究
  says: 说明在 Sentra 客户环境中观察到的情况和检测过程。
---

攻击者提交了预期的 External ID，取得仍信任 Qubole 关联账户的角色的临时凭据。可访问范围由角色权限策略决定。管理事件可显示角色扮演和存储桶枚举。S3 对象读取需要数据事件或服务器访问日志才能确认。研究没有确定厂商凭据的取得方式。Wiz 于 11 月 11 日提及第三方转述的认领，尚未确立归因。
