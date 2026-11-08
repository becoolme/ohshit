---
title: "MSP Process 遭入侵，Microsoft Entra 集成凭据暴露"
summary: >-
  MSP Process 确认遭到入侵，并表示已通知受影响的合作伙伴。一名客户转贴的通知称，
  攻击者访问的存储中有 Entra 应用机密、管理员刷新令牌和委派租户信息。通知称已有客户租户遭到凭据滥用。
splash: "使用 MSP Process 连接 Microsoft Partner Center 的托管服务商，以及启用了 Entra 委派集成的客户。"
wipe: "删除已连接应用的机密，撤销授权管理员的会话，并排查合作伙伴和客户租户中的持久化访问。"
inTheWildNote: "MSP Process 确认遭到入侵。客户转贴的通知称已有租户遭到凭据滥用。"
timeline:
  - date: "11 月 7 日 09:56 UTC"
    title: "攻击者访问集成数据存储"
    body: "客户转贴的通知称，访问从 09:56 持续至约 14:40 UTC。"
  - date: "11 月 7 日 19:05 UTC"
    title: "被盗存储密钥失效"
    body: "客户转贴的通知称，MSP Process 已切断攻击者的访问并轮换平台凭据。"
  - date: "2026 年 11 月 8 日"
    title: "客户通知公开，MSP Process 确认遭到入侵"
    body: "创办人 Patrick Leonard 表示，公司已通知受影响的合作伙伴，调查仍在继续。"
checklist:
  - title: "切断受影响的集成"
    hint: >-
      在合作伙伴租户中打开 Entra ID → 应用注册 → 证书和机密，删除每个连接到 MSP Process 的应用的全部客户端机密。
      与客户租户管理员协调，在 Entra ID → 企业应用 → 属性中将「已启用用户登录」设为「否」，
      阻止向受影响的应用签发新令牌。等待厂商指引后再重新连接。
  - title: "撤销授权管理员的会话"
    hint: >-
      在 Entra ID → 用户中找到为集成授权的账户，选择撤销会话。对于有失陷迹象的账户，调查期间阻止登录、
      重置密码、移除未经授权的 MFA 方法并撤销会话。现有访问令牌或应用会话可能暂时继续有效。
  - title: "保留日志，排查合作伙伴和客户租户"
    hint: >-
      导出从 11 月 7 日 09:00 UTC 起的 Entra 审计和登录日志。按已连接的应用 ID 查找服务主体登录，
      检查特权用户登录、异常密码重置、临时访问通行证等身份验证变更、新增应用或服务主体凭据、
      新建用户、目录角色分配和应用同意。在 Microsoft Purview 审计日志中查看 Exchange 收件箱规则和转发，
      并排查应用对文件和邮箱的访问，确认是否可能有数据暴露。
      Petra 报告共享 Azure IP 172.169.63[.]30 出现活动。单独命中不能证明遭到入侵。
  - title: "移除攻击者的访问权限并协调恢复"
    hint: >-
      保存证据后，移除未经授权的机密、证书、MFA 方法、账户、角色、应用同意、规则和转发设置。
      通过已知的支持渠道向 MSP Process 提供受影响的租户 ID、应用 ID 和相关时间。
      通知受影响客户，确认各租户均已清理后再启用集成。
sources:
  - name: "MSP Process 创办人公开回应"
    says: "确认遭到攻击，已通过邮件和短信通知受影响的合作伙伴，调查仍在继续。"
  - name: "客户转贴的 MSP Process 通知"
    says: "说明存储访问时段、凭据暴露、下游租户中的滥用和遏制步骤。"
  - name: "Petra 的事件观测"
    says: "观察到来自共享 Azure IP 的异常服务主体活动，归因尚无定论。"
  - name: "Microsoft Entra 紧急撤销访问指南"
    says: "说明如何撤销用户会话，以及为何部分访问会持续到令牌或会话过期。"
  - name: "Microsoft Entra 企业应用遏制指南"
    says: "说明租户管理员如何阻止向企业应用签发新令牌。"
---

客户转贴的通知称，攻击者在侵入内部服务器后访问了一个 MSP Process 存储账户。受影响的集成使用
Microsoft Partner Center 的细粒度委派管理员权限（GDAP），用于 Authenticator、密码重置和联系人同步。
存储中包含 Entra 应用 ID 和客户端机密、连接集成的管理员刷新令牌，以及客户租户和委派角色清单。

攻击者可使用被盗客户端机密获取应用令牌，无需以用户身份登录或通过用户 MFA。能执行哪些操作取决于托管服务商
授予的应用权限。通知列出的 Authenticator 权限包括 `Application.ReadWrite.All` 和 `AppRoleAssignment.ReadWrite.All`，
密码重置权限包括 `User.ReadWrite.All`、`User-PasswordProfile.ReadWrite.All` 和
`UserAuthenticationMethod.ReadWrite.All`。
通知称至少两家托管服务商的客户租户遭到滥用。受影响租户的总数，以及每家合作伙伴有哪些数据被复制，仍未确定。

MSP Process 创办人 Patrick Leonard 公开确认公司已发送通知，调查仍在继续。初始入侵途径和完整影响范围尚不明确。
移除原有机密可阻止攻击者继续用它获取新令牌。攻击者另行添加的凭据和权限仍然有效，因此应同时排查合作伙伴租户
及每个已连接的客户租户。
