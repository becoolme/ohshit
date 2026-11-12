---
title: WFX Phantom 利用被盗 GitHub 令牌在 CI 中运行凭据窃取脚本
summary: 攻击者利用被盗的开发者和机器人令牌向 GitHub 仓库植入 shell 窃取脚本，随后回退提交并删除运行记录。脚本可读取运行器内存，并用 OIDC 令牌换取云端访问权限。较新的样本通过 Telegram 上传。
splash: 被盗开发者或机器人令牌可写入，且植入的工作流、脚本或包钩子可执行的 GitHub 仓库。
wipe: 遏制可疑运行，撤销失陷令牌，轮换可访问的密钥，并检查云信任关系及已发布制品。
inTheWildNote: StepSecurity 观测到载荷执行。WebdriverIO 记录了未经授权的机器人提交。
timeline:
- date: 2026年11月10日
  title: StepSecurity 追溯到攻击活动开始
  body: 攻击者使用被盗的 GitHub 令牌探测仓库并推送恶意改动。
- date: 11月11日 12:30 UTC
  title: WebdriverIO 贡献者公开记录两次恶意机器人提交
  body: 提交植入 postinstall 钩子。同日稍后，Nextcloud Docker 留存的工作流日志记录另一变体的执行。
- date: 11月12日 01:10 UTC
  title: 一个样本开始使用 Telegram 作为备用通道
  body: 该样本还指向第三个 HTTP 收集端点。
- date: 2026年11月12日
  title: StepSecurity 发布攻击活动分析
  body: 研究人员从约 05:30 UTC 开始观察到仅通过 Telegram 上传的样本，并在 07:40 UTC 报告搜索结果中有超过 6.3 万个探测 PR。搜索结果数量并不代表成功入侵数量。
- date: 2026年11月12日
  title: Aikido 发布同一攻击活动的账号和仓库数据
  body: Aikido 识别出 4,837 个失陷账号探测了 61,764 个仓库。报告对载荷执行仓库数量给出两个不同的下限。
checklist:
- title: 遏制可疑的 GitHub 访问和运行
  hint: 暂停受影响的工作流和发布，取消正在运行的可疑任务，隔离受影响的自托管运行器，保留审计日志、运行编号、提交 SHA 和网络证据。撤销受影响的 PAT、OAuth 或 GitHub App 用户授权及机器人凭据。移除不必要的分支保护绕过权限，并核查每个令牌的写入范围。
- title: 关联仓库与网络证据
  hint: 检查 Git 历史、PR 元数据和 Actions 审计记录。从 11 月 10 日起在运行器出站记录中查找 194.150.166[.]244:8080/exfil、18.143.168[.]96:8080/exfil、153.75.82[.]159:8080/exfil、GhostAction 旧端点 193.32.204[.]199，以及 api.telegram.org 的 sendDocument。正文和研究报告列出其余指标。检查脚本 SHA-256 89695abb392d5cfd4972672961e644bb46baa98aa1ed7173c2a2816c762735cf。将命中项或缺失的运行编号与提交、操作者和执行证据关联。探测 PR 或单项指标只是线索。若确认或很可能已执行，应按该任务可访问的凭据已暴露处理。
- title: 先清除云端持久访问，再更换密钥
  hint: 暂停受影响的 OIDC 信任关系，并在支持时撤销会话。在 AWS CloudTrail 和 IAM 检查角色信任变更、新访问密钥和 wfx-* 会话，在 Azure 审计日志检查未授权的联合凭据，并在 GCP 日志检查服务账号模拟。移除未授权访问后，轮换可触及的仓库、组织、环境、软件包仓库及云端密钥。自托管运行器还应轮换主机可访问的凭据和令牌。
- title: 从可信来源恢复并验证产物
  hint: 移除载荷，从已验证提交恢复受保护分支和 CI，重建受影响运行器，并以可信产物核对发布包、制品与缓存。阻止使用下列软件包版本，从已验证的输入重新生成锁文件。确认运行干净并完成审计后再恢复自动发布。将运行器出站限制到必要目的地，并在支持时将必需检查绑定到可信来源。
sources:
- name: StepSecurity WFX Phantom 原始分析
  says: 记录观测到的变体、公开执行证据、受影响的发布制品、收集端点和云端持久访问功能。
- name: WebdriverIO 公开回退 PR
  says: 记录机器人的未授权提交、postinstall 钩子和建议的处置。
- name: Nextcloud Docker 仓库提交
  says: 展示植入 update.sh 的改动。
- name: Nextcloud Docker 工作流运行 2675
  says: 记录 11 月 11 日 12:52 UTC 植入提交中的 update.sh 被执行。
- name: Aikido wfx-loot 原始分析
  says: 公布账号和仓库数量、两个不同的执行数量下限、云端持久访问技术和脚本的 SHA-256。
---

攻击要求有可写入仓库的有效令牌，以及一条可执行载荷的路径。攻击者可修改现有工作流、新建工作流、在 CI 已调用的脚本末尾追加代码，或添加隐藏脚本并挂到 npm 生命周期、构建或测试命令上。工作流变体可显式传入密钥。脚本变体可在任务有权限时读取运行器内存和凭据存储。云端权限扩展取决于运行器所持凭据及对应权限和信任。载荷具备伪造必需检查结果的功能，但 StepSecurity 检查的样本均未启用该功能。

StepSecurity 发现 GitHub 将部分探测 PR 标为通过 Fly.io 的 GitHub App 发出，并判断涉及用户到服务器令牌。研究未确定令牌的获取方式，也未发现 Fly.io 基础设施失陷的证据。研究发现此活动与[10 月 GhostAction](/zh/incidents/ghostaction-returns/)存在重叠，未将两者归因于同一攻击者。

Nextcloud Docker 的第 2675 次运行在自托管运行器上执行了植入后的提交，任务以成功状态结束。StepSecurity 根据日志判断上传成功。日志未列出上传归档的具体内容。

### 应核查的发布制品

- Packagist 的 `digitalelvis/neuronai-studio` **3.14.3** 带有脚本及 npm postinstall 钩子。在包目录中用 npm 安装依赖且启用生命周期脚本时，该钩子可执行。Composer 本身不会调用它。StepSecurity 建议固定到 **3.14.2** 或更早版本。
- Go 模块 `github.com/onuragtas/docker-env` **v1.0.278** 和 **v1.0.280**，以及 `github.com/vkuznet/gocurl` **v0.0.0-20261111095532-8d5aad0cb0da** 将载荷放在工作流文件里。常规 Go 构建不会执行 GitHub 工作流文件。检查 go.mod 和 go.sum 中的直接及间接依赖，用独立验证的输入替换上述版本。
- StepSecurity 报告没有 WebdriverIO 发布包受影响。对其他在植入与清理之间生成的发布包，用干净源码和构建记录核对。

### 需要关联核查的指标

- HTTP 端点 `194.150.166[.]244:8080/exfil`、`18.143.168[.]96:8080/exfil` 和 `153.75.82[.]159:8080/exfil`。此前被植入的部分 GhostAction 工作流仍含旧端点 `193.32.204[.]199`。HTTP 回调参数值包括 `b42d70a7aab9140ca19e8249` 和 `15f44heehnax8jdf41yx`。
- Telegram 的 `api.telegram.org` 和 `sendDocument`，聊天编号 `-1004340163187`，机器人 ID 为 `8708988906`、`9196217635`、`9180059428`、`8902935164`、`8876515636`。仅使用 Telegram 的样本将 HTTP 回调指向回环地址。
- 探测 PR 标题 `docs: dependency audit notes`，正文 `Routine dependency audit notes`，分支 `wfx-docs`，文件 `docs/wfx-audit.md`，Git blob `ee6e5addfe591923fc385553cb66cf0d25634a6b`。
- 提交信息 `ci: refresh build cache`、`ci: restore`、`ci: cleanup`、`chore: add ci helper`、`chore: add dependency audit workflow`，以及空仓库中工作流之前的 `chore: initial commit`。
- 分支模式 `chore/[a-z0-9]{8}`、`ci-check-[0-9]{4}`，路径模式 `.ci-[a-z0-9]{6}.sh`、`.github/workflows/build-audit-[a-z0-9]{6}.yml`，以及现有工作流、shell 脚本或 `package.json` 的改动。
- 步骤名 `Pass runtime`、`Restore cache <4 characters>` 或 `Run audit`，变量 `WF_CALLBACK`、`WF_CTOKEN`、`WF_EXFIL_*`、`WF_TG_BOTS`，暂存路径 `.wfx-$$`，日志字符串 `memscan_files`、`archive_bytes`、`deliver_retry`。
- Azure 中名为 `wfx-ci-*` 的联合凭据，AWS 中授予通配 AWS 主体权限的信任变更及名为 `wfx-*` 的会话。

### Aikido 11 月 12 日公布的影响范围

Aikido 将同一 `wfx-docs` 探测手法和 CI 载荷称为 wfx-loot。它识别出 **4,837 个失陷的 GitHub 账号**，这些账号在 **61,764 个仓库**发起探测。Aikido 另外报告 GitHub 搜索匹配 **61,839 个 PR**。StepSecurity 另行报告其在 07:40 UTC 核查时命中的 PR 数量。这些数字的统计口径不同，不应相加。

Aikido 报告的详细部分称，至少 **1,806 个仓库**有载荷执行迹象。开头则称，至少 **1,835 个仓库**执行了载荷且凭据被外传。报告未解释两处数字的差异，也未给出最终总数。应根据各仓库的执行和暴露证据开展调查。Aikido 公布的脚本 SHA-256 为 `89695abb392d5cfd4972672961e644bb46baa98aa1ed7173c2a2816c762735cf`。该哈希对应一个样本。发现命中时，应结合操作者、提交和运行记录核查。

该报告记录了所见配置通过 HTTP 传输，并提到后续样本添加了 Telegram 传输。StepSecurity 关于 Telegram 和第三个 HTTP 端点的观测仍适用。
