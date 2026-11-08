---
title: Tensorlake 披露上游服务商遭入侵后出现恶意 GitHub 工作流运行
tags: [Tensorlake, GitHub Actions, 密钥]
summary: Tensorlake 称，攻击者利用工程团队沙箱的访问权限向分支推送恶意代码，并触发 GitHub Actions 探查构建和部署密钥。公司已下线内部应用并轮换密钥，要求客户预防性轮换 Tensorlake API 密钥。
splash: Tensorlake 内部自动化沙箱能访问的工程代码仓库，以及从相关分支触发的工作流。
wipe: 轮换 Tensorlake API 密钥，更新依赖服务并吊销旧密钥。核查用量并关注厂商更新。
inTheWildNote: Tensorlake 确认攻击者推送了恶意代码，并运行工作流探查密钥。
timeline:
  - date: 11月8日 00:39 UTC
    title: Tensorlake 披露未授权分支推送和工作流运行
    body: 创始人 Diptanu Choudhury 称，公司已轮换密钥、下线内部应用，并通过邮件通知付费客户。公司要求客户轮换 API 密钥。
  - date: 11月8日 01:44 UTC
    title: 创始人将入侵路径归因于上游服务商遭入侵
    body: Choudhury 在后续回复中称，上游服务商遭入侵导致 Tensorlake 暴露。
checklist:
  - title: 轮换 Tensorlake API 密钥
    hint: 直接登录 Tensorlake 官方控制台，更换 API 密钥，并更新使用 TENSORLAKE_API_KEY 的密钥存储及服务。确认新密钥可用后吊销旧密钥，同时轮换 CI 和定时任务使用的密钥。
  - title: 集成 Tensorlake 的团队应核查构建和部署记录
    hint: 将 CI 运行和已部署产物与预期提交及发布版本对照，检查何时使用了 Tensorlake 密钥，并调查无法解释的运行。修改受影响的自动化流程前先保留相关日志。
  - title: 核查用量并关注厂商后续通告
    hint: 将近期 API 用量和沙箱活动与自己的部署及任务记录对照。保留异常活动的时间和标识，通过 Tensorlake 官网联系厂商。关注官方客户邮件和信任中心的后续事件说明。
sources:
  - name: Tensorlake 创始人事件披露
    says: 确认代码仓库和工作流中的攻击活动、密钥轮换、内部应用下线及客户处置指引。
  - name: Tensorlake 创始人后续回复
    says: 将暴露归因于上游服务商遭入侵。
  - name: Tensorlake Cloud 控制台
    says: Tensorlake 客户的官方登录入口。
  - name: Tensorlake 10 月 npm 安全公告
    says: 记录 10 月 8 日另一起恶意 npm 发布事件。
---

Tensorlake 称，一套部署在上游服务商的内部自动化应用会在工程团队账户下启动沙箱。这些沙箱可以访问 Tensorlake 的 GitHub 代码仓库。攻击者向分支推送恶意代码，触发 GitHub Actions 探查构建和部署密钥。Tensorlake 称，除探查密钥外，未发现关键系统遭访问的证据，并称客户 API 密钥及沙箱未受影响。公司尚未公布受影响分支名称、工作流标识，或具体密钥已被读取的证据。

创始人的最初公开声明指出应用托管在 Railway，Choudhury 在编辑后的声明中改称上游服务商，并表示该服务商此前遭入侵，导致内部应用的环境变量泄露，而 Tensorlake 未及时轮换这些变量。后续回复也将暴露归因于上游入侵。原文可见[事件披露公开副本](https://teapaw.org/diptanu/status/2119228351978328379)和[后续回复公开副本](https://teapaw.org/diptanu/status/2119244751178551446)。后续措辞见[编辑后声明的公开副本](https://pwn.watch/i/tensorlake-vendor-sandbox-github-access-nov-2026)。与 [Railway 10 月事件](/zh/incidents/railway-env-vars/)的关系仍待独立核实。Tensorlake 较早的 npm 公告涉及另一起事件。

Tensorlake 称已轮换自身密钥，并从上游服务商下线应用。公司已通过邮件通知付费客户，并要求客户预防性轮换 Tensorlake API 密钥。后续详情将通过邮件及 [Tensorlake 信任中心](https://trust.tensorlake.ai/)公布。
