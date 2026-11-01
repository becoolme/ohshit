---
title: "PyPI 和 Docker 上的 LiteLLM 1.107.0 是个带远程代码加载器的凭据窃取程序，构建自一个山寨仓库"
headline: "LiteLLM 二进宫：你的 LLM 网关开始把你的密钥转发给别人了"
tags: [供应链, PyPI, Docker, AI, 密钥]
summary: >-
  LiteLLM 确认，5 月泄露后未吊销的 Agent Platform 密钥导致 GitHub 所有者令牌于 10月10日被盗。攻击者随后用被盗的维护者令牌在 10月21日发布恶意的 1.107.0 wheel 和镜像。应以锁定的 1.106.2 重建，并轮换暴露的凭据。
splash: "10月21日安装过 litellm 1.107.0，或拉取过 latest / main-latest / main-stable / v1.107.0 镜像的所有人"
wipe: "用按哈希 / digest 锁定的 litellm 1.106.2 从零重建受影响主机，再轮换这台主机能读到的所有凭据"
inTheWildNote: Wiz 发现被盗的 AWS 角色凭据在几小时后被攻击者 IP 使用
oneLiner: >-
  被劫持的发布工作流用攻击者复制的仓库构建了 LiteLLM。wheel 包会放下一个 .pth 文件，于是这台机器上的每个 Python 进程，连 pip 在内，都会运行一个窃取程序：把你的密钥发到假冒的 litellm.dev，再拉起一个能下载并执行更多代码的守护进程。
cves:
  - name: 恶意软件公告已包含 LiteLLM 1.107.0
    description: 跟踪条目同时包含 1.107.0 和 3 月的旧恶意版本；共用条目不能证明攻击者相同。
fixed:
  - { status: "最后一个干净版本；1.107.0 已下架" }
  - { product: LiteLLM Docker 镜像, status: "浮动标签被重新指向过" }
  - { product: LiteLLM Enterprise（私有仓库）, status: 据 LiteLLM 所述 }
timeline:
- date: 2026年5月27日
  title: Agent Platform 主密钥出现在公开提交中
  body: 提交被替换，但密钥未吊销。
- date: 2026年10月10日
  title: Agent Platform API 返回 GitHub 所有者令牌
  body: 随后仓库 CI 又泄露了两个维护者令牌。
- date: 2026年10月12日
  title: 更多仓库密钥通过 CI 外传
- date: 2026年10月13日
  title: 山寨域名 litellm.dev 被注册
  body: 依据 JFrog 查到的 WHOIS 数据。
- date: 2026年10月21日 08:56–10:46 UTC
  title: 恶意载荷被提交到山寨仓库 Berri-AI/litellm
  body: Wiz 数到 10 次提交，前三次加入了 cook.pth、cook.py 和 sitecustomize.py。
- date: 2026年10月21日 10:08 UTC
  title: 私有发布工作流的分支保护被绕过
  body: 攻击者用一名组织所有者被盗的 GitHub CLI 令牌关闭了保护，并把工作流指向山寨仓库。
- date: 2026年10月21日 11:11 UTC
  title: 第二个被盗凭据批准了生产发布
- date: 2026年10月21日 11:39–11:40 UTC
  title: 七个恶意的 litellm 1.107.0 wheel 包上传到 PyPI
  body: 大约七分钟后，Socket 的扫描器发出告警。
- date: 2026年10月21日 11:46 UTC
  title: 恶意镜像发布到 GHCR 和 Docker Hub
  body: v1.107.0、latest、main-latest 和 main-stable 全部指向同一个恶意镜像索引。
- date: 2026年10月21日 11:53 UTC
  title: 第三个被盗凭据删除了工作流运行记录
- date: 2026年10月21日 13:51–14:20 UTC
  title: Docker 标签被撤下或重新指向干净镜像
  body: 据 LiteLLM 说，先处理 GHCR，Docker Hub 在 14:20 前清理完毕。Wiz 和 Datadog 给出的下架时间约为 13:53。
- date: 2026年10月22日
  title: GitHub 恶意软件条目已包含 1.107.0
  body: GHSA-92x9-889m-jgmw 也包含 3 月的旧版本，这不能证明共同归因。
- date: 2026年10月23日
  title: LiteLLM 发布正式攻击链调查结论
  body: 厂商以已确认的密钥泄露和 Agent Platform API 路径，取代此前关于内部部署日志的推测。
- date: 2026年10月30日
  title: 厂商公布替代镜像签名公钥的指纹
  body: 10月23日轮换的密钥从 v1.103.8、v1.104.6、v1.105.4 和 v1.106.3 起签署发布。恶意镜像也带有有效的旧密钥签名。
- date: 2026年10月21日 ~13:20 UTC
  title: PyPI 下架 1.107.0
  body: Wiz 和 Datadog 说是 13:20，LiteLLM 的报告说是 13:23。
- date: 2026年10月21日 ~16:20–17:01 UTC
  title: 被盗的 AWS 实例角色凭据被攻击者 IP 使用
  body: Wiz 在客户环境中观察到，距凭据外传约 4.5 小时。
checklist:
  - title: 找出所有装了 1.107.0 的地方
    hint: "requirements、uv.lock、poetry.lock、Pipfile.lock、CI 缓存、wheelhouse，以及 10月21日用 latest/main-* 启动的所有容器。grep 一下 litellm-1.107.0.dist-info"
  - title: 按 digest 而不是标签检查镜像
    hint: 恶意索引是 sha256:1bbcb1443bc962e45f5aad53fe3d2c30600e0379715fb6c664cdd3ac126c339e（litellm）；litellm-database 和 litellm-non_root 各有各的恶意 digest。厂商对另两个索引仅公布前缀 c00f9d92c427 和 7b00e91cd2fe，应作为搜索前缀，不能当完整摘要。标签已移动，应检查原始拉取记录
  - title: 别想着 pip install 一下就完事
    hint: .pth 在每次 Python 启动时都会执行，pip 也不例外。先隔离主机，杀掉持有 /tmp/remote_code_loader.lock 的守护进程，再从零重建
  - title: 轮换进程能读到的每一个密钥
    hint: LiteLLM 数据库里的所有供应商密钥、master key 和虚拟密钥、DATABASE_URL 里的密码、实例 / 任务的 IAM 角色、环境变量、SSH/git/npm/PyPI/kube 凭据。对，全部
  - title: 排查 IOC
    hint: "Socket 可导出 32 项 IoC；软件包、载荷和容器哈希见其完整指标表。网络路径：http://www.litellm.dev/healthcheck、https://raw.githubusercontent.com/letters9813/pythonclient-test/main/domain.txt 和 https://github.com/Berri-AI/litellm；关联后续 /codepy 请求及 X-Token 请求头 XWiA8gZNa7NcX2XRoAEb。文件：cook.pth、cook.py、sitecustomize.py、/tmp/.pc_once_72129118c59f5636c0bb、/tmp/remote_code_loader.lock；环境变量 PRIVCOLLECT_ACTIVE=1。仅命中指标不能证明入侵；GitHub 和 Python 启动文件名也有合法用途"
  - title: 检查云审计日志
    hint: 安装时间前后，你的实例角色在 CloudTrail 里有没有 GetCallerIdentity 调用，以及来自 168.100.8.57 或 165.227.201.8 的任何操作；关联角色、时间及行为，单独 IP 命中不能证明入侵
  - title: 按哈希锁定 1.106.2，别再用浮动标签
    hint: 如果用了按哈希锁定的锁文件和镜像 digest，这事根本不会找上你。说好的中间人只有代理一个，结果又冒出来一个
  - title: 审计已确认的上游凭据泄露路径
    hint: 从 10月10日起检查 Agent Platform API 和 GitHub 审计记录。15 项调查线索：69.48.229.143、199.91.221.39、webhook.site、Berri-AI/litellm、ci-tmp-a351cc、ci-tmp-be33e9，以及提交 20535d8f、9cf97e9、285fbdc5、b69bc36、78d968b、1a6e3c1、d687b69。检查 opencode.json 历史及 /api/v1/managed_agents/agents?limit=100 访问，并对照正式报告完整时间线。即使历史已改写，也要吊销暴露的密钥。仅命中指标不能证明入侵；webhook.site 是合法共享服务
  - title: 更换镜像验证所信任的公钥
    hint: 使用固定到厂商提交 e82a3c646908ba0a6ee0beddc4310d7a6cac4065 的 cosign.pub，核对文件 SHA-256 为 e3fe3e08c44b16407fe0b37c43b4f8b603b3a0f4ee74c29e647bc022d762c2c0。cosign 命令见 Docker image security guide。同时核对制品摘要；旧密钥签名不能证明 1.107.0 安全，验证也不能清理已暴露主机
sources:
  - name: LiteLLM 事件报告
    says: 早期初始入口推测已被 10月23日正式报告取代；受影响制品、恢复时锁定 1.106.2 的建议及企业版排除范围不变
  - says: 报告者的分析：7 个 wheel 包全部中招，v1.107.0 的 git 标签里没有恶意载荷；Docker 标签在 17:13 UTC 前撤下
  - says: 完整的载荷拆解、wheel 和文件哈希、镜像 digest；包发布后约 7 分钟就标记了出来
  - says: 数据外传到 www.litellm[.]dev/healthcheck，每小时轮询一次 dead drop 的加载器；没有证据表明它和 3 月 TeamPCP 那次入侵有关
  - says: 观察到被盗的 AWS 角色凭据从 168.100.8.57 和 165.227.201.8 被验证；PyPI 在 13:20 UTC 隔离了该包
  - says: 在线约两小时；在野未观察到第二阶段载荷
  - name: LiteLLM 正式攻击链报告
    says: 确认主密钥泄露及 10月10日所有者令牌访问，取代早期初始入口推测
  - name: GitHub 恶意软件公告
    says: 10月22日更新已包含 1.107.0；GHSA-5mg7-485q-xm76 仍只覆盖 3 月版本
  - name: LiteLLM 镜像签名验证与密钥轮换
---
LiteLLM 是夹在应用和几十家 LLM 供应商之间的 Python SDK 兼代理，所以它手里往往攥着公司所有供应商的密钥。**2026年10月21日** 11:39 UTC，恶意的 `litellm==1.107.0` 出现在 PyPI 上；从 11:46 UTC 起，`v1.107.0`、`latest`、`main-latest` 和 `main-stable` 这几个官方 Docker 镜像标签也都指向了投毒构建。这是 LiteLLM 今年第二次发布流水线被攻破，上一次是 3 月的 1.82.7 和 1.82.8。JFrog 和 Datadog 表示，目前没有证据把两次事件联系起来。

### 怎么流出去的

根据 [LiteLLM 自己的报告](https://docs.litellm.ai/blog/security-incident-oct-21-2026)，攻击者手里有三名工程师的 GitHub CLI OAuth 令牌。其中一个属于组织所有者，被用来绕过私有发布工作流的分支保护，并把它指向 `Berri-AI/litellm`：一个和真仓库 `BerriAI/litellm` 只差一个连字符的山寨仓库。第二个令牌通过了生产发布的审批关卡，第三个事后删掉了工作流运行记录。真正的 `v1.107.0` git 标签是干净的。这些制品是用攻击者的副本构建、再由真实流水线签名的。**10月24日更正：** LiteLLM 在 10月23日的正式报告中取代了此前关于内部部署日志泄露令牌的推测。5 月暴露后未吊销的 Agent Platform 主密钥，让攻击者在 10月10日通过该服务 API 取得所有者令牌，随后恶意 CI 工作流又提取了两个维护者令牌。

### 载荷干了什么

1.107.0 的七个 wheel 包都多了三个文件：`cook.pth`、`cook.py` 和 `sitecustomize.py`，源码包里没有。因为有 `.pth` 钩子，这个窃取程序会在该环境里**每次 Python 启动**时运行，哪怕根本没人 import LiteLLM，哪怕你只是在跑 `pip`。据 Socket 和 JFrog 分析，它会收集：

- 云凭据（AWS、Azure、GCP）、实例元数据令牌，外加一次 STS `GetCallerIdentity` 校验
- Kubernetes、Docker、Vault、Terraform 和 CI 的密钥；SSH、GPG 和 TLS 私钥；git、npm 和 PyPI 配置
- AI 工具的凭据（Claude、Codex、Gemini、Cursor、Copilot、Hugging Face 等）
- 浏览器数据库、shell 历史，以及 Linux 上所有可读进程的环境变量
- 如果设置了 `DATABASE_URL`，还会拿走 LiteLLM 代理自己的 `LiteLLM_CredentialsTable` 和 `LiteLLM_ProxyModelTable`，你的供应商密钥就存在这两张表里

数据加密后（AES-256，密钥用 RSA-4096 包裹）POST 到 `www.litellm[.]dev/healthcheck`。`sitecustomize.py` 还会 fork 出一个脱离终端的守护进程，每小时去 GitHub 上的一个 dead drop 查一次域名，然后从那里下载 Python 代码并直接 `exec()`，不做任何完整性校验。研究人员查看时这个 dead drop 是空的，之后也已被删除，但窃取部分并不依赖它。

### 有人在用吗？

有。Wiz 观察到，在数据外传约 4.5 小时后，被盗的 AWS 实例角色凭据从 `168.100.8.57` 和 `165.227.201.8` 被拿去验证，并在“少数”环境中出现了 IAM 枚举。Datadog 表示在野没有看到第二阶段载荷。没有任何来源给出 1.107.0 的下载量；唯一被引用的数字是 LiteLLM 总体每周约 2300 万次下载，这并不等于受影响范围。

### 为什么是 L4

一个按设计就握着所有 LLM 供应商密钥的包，一个只要 Python 启动就偷云和 AI 凭据的载荷，再加上已证实攻击者在使用被盗凭据：这就是正在发生的利用加大规模凭据窃取。没到 L5，是因为只涉及一个版本、在线约两小时、不会自我传播，也没有哪个核心运行时或信任根被攻破。

### 还没搞清楚的

- **准确的时间窗口。** LiteLLM 说 PyPI 在 13:23 下架、Docker Hub 在 14:20 UTC 前清理完毕；Wiz 和 Datadog 说是 13:20 和约 13:53；GitHub issue 里报告 13:23 时 Docker 标签仍是坏的，到 17:13 才撤下。如果你那天下午任何时候拉过浮动标签，去核对一下 digest。
- **厂商现已确认初始入口：** 暴露的主密钥 → Agent Platform API → GitHub 所有者令牌 → CI 密钥外传，修正了此前未经证实的推测。
- **跟踪条目更正：** GHSA-92x9-889m-jgmw 现已包含 1.107.0。较早的发布日期和其中的 3 月版本不能证明两次攻击有关。Wiz 和 JFrog 也分别用 `wiz-adv-2026-188` 和 `XRAY-955589` 跟踪本次事件。
- LiteLLM 提到一个定于 10月27日披露的企业版修复，目前处于保密期，不清楚和这次事件有没有关系。

**11月1日更新（UTC）：** 厂商10月30日通知公布替代 cosign 公钥的指纹，并表示旧私钥可能已经泄露。轮换发生于10月23日，首批使用替代密钥签署的版本于10月24日发布。应同时验证固定提交中的公钥和镜像摘要。恶意镜像由真实发布流水线使用旧密钥签署，因此仅有有效签名不能排除此事件的影响。上述暴露主机重建及凭据轮换措施仍然适用。
