---
title: "GhostAction 卷土重来：被劫持的维护者账号植入“security-audit.yml”工作流，把你的 CI 密钥往外送"
headline: "GhostAction 回来了：打着安全审计的旗号偷你的密钥"
tags: [供应链, GitHub Actions, 密钥]
summary: >-
  被盗的 GitHub 账号推送了伪装成安全任务的工作流，用来窃取 Actions 密钥。新变种会扫描完整的 git 历史，三年前删掉的密钥照样算数。GitHub 从 10月9日开始拦截这个工作流。
splash: "约 1,900 个账号、30,000 多个仓库成为目标（GitGuardian 数据）；尝试窃取的密钥达 3,174 个"
wipe: "在 .github/workflows 里搜 security-audit.yml 这类文件，轮换所有 CI 密钥和历史上提交过的每一个密钥，吊销旧的 PAT"
inTheWildNote: 在 GitHub 拦截之前，已有数千个密钥被偷走
oneLiner: >-
  用偷来的维护者令牌推一个“安全审计”工作流；它在 push 时触发，把所有密钥和 git 历史里一切长得像凭据的字符串全部导出来，POST 给攻击者。
timeline:
  - date: 2026年8月31日
    title: GitGuardian 首次发现新一波攻击
    body: StepSecurity 观察到外传端点从 9月4日至5日开始投入使用。
  - date: 2026年10月8日
    title: 大规模扫荡
    body: kitao 和 henrywoo 两个账号把工作流推到了 345 个仓库。据 GitGuardian 统计，10月8日至9日约有 28,000 个仓库成为目标。
  - date: 2026年10月9日
    title: GitHub 开始拦截该工作流；Socket 和 StepSecurity 发布分析
  - date: 2026年10月10日、12日
    title: 后续几波攻击没能再偷到密钥
checklist:
  - title: 搜索恶意工作流
    hint: security-audit.yml、github_actions_security.yml、security-check.yml，fork 出来的仓库也要查
  - title: 检查 Actions 日志里有没有发往 193.32.204.199 的 POST 请求
    hint: 只要这些工作流跑过一次，就当所有密钥都已经泄露
  - title: 轮换所有 Actions 密钥和环境密钥
    hint: 云平台密钥、npm/PyPI 令牌、部署密钥、Webhook
  - title: 轮换 git 历史里提交过的一切凭据
    hint: 变种会执行 git log -p --all，删掉的密钥也跑不掉
  - title: 吊销并重新签发维护者的 PAT
    hint: 优先用带过期时间的细粒度令牌；强制开启 2FA
sources:
  - says: 从 10月7日开始跟踪；称涉及 500 多个账号、数万个仓库，详细统计为 2 个账号的 346 个仓库
  - says: 10月9日仍有 378 个仓库的默认分支上留着该工作流；怀疑 PAT 来自信息窃取木马的日志（未证实）
  - says: 引用 GitGuardian 的数据：约 1,900 个账号、30,000 多个仓库、3,174 个密钥
  - says: 同样引用 GitGuardian 的数据
---
GhostAction 最早出现在 2025 年。这一波从 **2026年8月31日** 悄悄开始，到 **10月8日** 全面爆发。攻击者以真实维护者的身份登录，用的很可能是泄露的个人访问令牌（PAT，未证实），然后推送一个名字听着很让人放心的工作流，比如 `security-audit.yml`。

这个工作流会读取指定名称的 Actions 密钥，再用 13 种凭据模式去 grep：AWS、Anthropic、OpenAI、OpenRouter、GitHub 和 GitLab 令牌、GCP、Slack、SendGrid。较新的变种会用 `fetch-depth: 0` 检出代码，再跑 `git log -p --all`。**只要曾经提交过，就在射程之内**，哪怕你几年前就删掉了。结果通过 HTTP POST 发往 `193.32.204[.]199`。

### 规模有多大？

各家数字对不上，干脆全列出来：

| 来源 | 说法 |
| --- | --- |
| GitGuardian | 约 1,900 个账号，30,000 多个仓库成为目标，尝试窃取 3,174 个密钥 |
| Socket | 500 多个账号，“数万个”仓库。它的详细统计是 2 个账号的 346 个仓库 |
| StepSecurity | 10月9日仍有 378 个仓库留着该工作流 |

有些受害者是前几波的回头客：上次被偷的密钥一直没轮换。GitHub 从 10月9日开始拦截这个工作流，之后 10月10日和12日的几波攻击都空手而归。
