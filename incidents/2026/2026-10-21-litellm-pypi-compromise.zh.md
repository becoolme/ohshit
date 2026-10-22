---
title: "PyPI 和 Docker 上的 LiteLLM 1.107.0 是个带远程代码加载器的凭据窃取程序，构建自一个山寨仓库"
headline: "LiteLLM 二进宫：你的 LLM 网关开始把你的密钥转发给别人了"
tags: [供应链, PyPI, Docker, AI, 密钥]
summary: >-
  攻击者用三名 LiteLLM 工程师被盗的 GitHub CLI 令牌，从一个山寨仓库构建并向 PyPI 和 Docker 发布了 litellm 1.107.0。它在每次 Python 启动时窃取云、AI 和 LiteLLM 代理的密钥。在线约 2 小时。
splash: "10月21日安装过 litellm 1.107.0，或拉取过 latest / main-latest / main-stable / v1.107.0 镜像的所有人"
wipe: "用按哈希 / digest 锁定的 litellm 1.106.2 从零重建受影响主机，再轮换这台主机能读到的所有凭据"
inTheWildNote: Wiz 发现被盗的 AWS 角色凭据在几小时后被攻击者 IP 使用
oneLiner: >-
  被劫持的发布工作流用攻击者复制的仓库构建了 LiteLLM。wheel 包会放下一个 .pth 文件，于是这台机器上的每个 Python 进程，连 pip 在内，都会运行一个窃取程序：把你的密钥发到假冒的 litellm.dev，再拉起一个能下载并执行更多代码的守护进程。
fixed:
  - { status: "最后一个干净版本；1.107.0 已下架" }
  - { product: LiteLLM Docker 镜像, status: "浮动标签被重新指向过" }
  - { product: LiteLLM Enterprise（私有仓库）, status: 据 LiteLLM 所述 }
timeline:
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
  - date: 2026年10月21日 ~13:20 UTC
    title: PyPI 下架 1.107.0
    body: Wiz 和 Datadog 说是 13:20，LiteLLM 的报告说是 13:23。
  - date: 2026年10月21日 13:51–14:20 UTC
    title: Docker 标签被撤下或重新指向干净镜像
    body: 据 LiteLLM 说，先处理 GHCR，Docker Hub 在 14:20 前清理完毕。Wiz 和 Datadog 给出的下架时间约为 13:53。
  - date: 2026年10月21日 ~16:20–17:01 UTC
    title: 被盗的 AWS 实例角色凭据被攻击者 IP 使用
    body: Wiz 在客户环境中观察到，距凭据外传约 4.5 小时。
checklist:
  - title: 找出所有装了 1.107.0 的地方
    hint: "requirements、uv.lock、poetry.lock、Pipfile.lock、CI 缓存、wheelhouse，以及 10月21日用 latest/main-* 启动的所有容器。grep 一下 litellm-1.107.0.dist-info"
  - title: 按 digest 而不是标签检查镜像
    hint: 恶意索引是 sha256:1bbcb1443bc9…c339e（litellm）；litellm-database 和 litellm-non_root 各有各的恶意 digest。现在标签看着已经没问题了
  - title: 别想着 pip install 一下就完事
    hint: .pth 在每次 Python 启动时都会执行，pip 也不例外。先隔离主机，杀掉持有 /tmp/remote_code_loader.lock 的守护进程，再从零重建
  - title: 轮换进程能读到的每一个密钥
    hint: LiteLLM 数据库里的所有供应商密钥、master key 和虚拟密钥、DATABASE_URL 里的密码、实例 / 任务的 IAM 角色、环境变量、SSH/git/npm/PyPI/kube 凭据。对，全部
  - title: 排查 IOC
    hint: "访问 litellm[.]dev、raw.githubusercontent.com/letters9813/… 的出站流量；文件 cook.pth、cook.py、sitecustomize.py、/tmp/.pc_once_72129118c59f5636c0bb；环境变量 PRIVCOLLECT_ACTIVE=1"
  - title: 检查云审计日志
    hint: 安装时间前后，你的实例角色在 CloudTrail 里有没有 GetCallerIdentity 调用，以及来自 168.100.8.57 或 165.227.201.8 的任何操作
  - title: 按哈希锁定 1.106.2，别再用浮动标签
    hint: 如果用了按哈希锁定的锁文件和镜像 digest，这事根本不会找上你。说好的中间人只有代理一个，结果又冒出来一个
sources:
  - name: LiteLLM 事件报告
    says: 三名工程师的 GitHub CLI OAuth 令牌被用来绕过分支保护、批准发布，并从 Berri-AI/litellm 发布；初始入口怀疑是一个暴露在公网的内部部署（未证实）；1.106.2 安全；企业版不受影响
  - says: 报告者的分析：7 个 wheel 包全部中招，v1.107.0 的 git 标签里没有恶意载荷；Docker 标签在 17:13 UTC 前撤下
  - says: 完整的载荷拆解、wheel 和文件哈希、镜像 digest；包发布后约 7 分钟就标记了出来
  - says: 数据外传到 www.litellm[.]dev/healthcheck，每小时轮询一次 dead drop 的加载器；没有证据表明它和 3 月 TeamPCP 那次入侵有关
  - says: 观察到被盗的 AWS 角色凭据从 168.100.8.57 和 165.227.201.8 被验证；PyPI 在 13:20 UTC 隔离了该包
  - says: 在线约两小时；在野未观察到第二阶段载荷
---
LiteLLM 是夹在应用和几十家 LLM 供应商之间的 Python SDK 兼代理，所以它手里往往攥着公司所有供应商的密钥。**2026年10月21日** 11:39 UTC，恶意的 `litellm==1.107.0` 出现在 PyPI 上；从 11:46 UTC 起，`v1.107.0`、`latest`、`main-latest` 和 `main-stable` 这几个官方 Docker 镜像标签也都指向了投毒构建。这是 LiteLLM 今年第二次发布流水线被攻破，上一次是 3 月的 1.82.7 和 1.82.8。JFrog 和 Datadog 表示，目前没有证据把两次事件联系起来。

### 怎么流出去的

根据 [LiteLLM 自己的报告](https://docs.litellm.ai/blog/security-incident-oct-21-2026)，攻击者手里有三名工程师的 GitHub CLI OAuth 令牌。其中一个属于组织所有者，被用来绕过私有发布工作流的分支保护，并把它指向 `Berri-AI/litellm`：一个和真仓库 `BerriAI/litellm` 只差一个连字符的山寨仓库。第二个令牌通过了生产发布的审批关卡，第三个事后删掉了工作流运行记录。真正的 `v1.107.0` git 标签是干净的。这些制品是用攻击者的副本构建、再由真实流水线签名的。LiteLLM 怀疑令牌是通过一个暴露在公网的内部部署泄露的，可能利用了一个最近刚修复的漏洞，但初始入口**尚未证实**。

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
- 工程师令牌的**初始入口**只是怀疑，尚未证实。
- 目前还**没有 GHSA 或 CVE**。Wiz 的编号是 `wiz-adv-2026-188`，JFrog 的是 `XRAY-955589`。
- LiteLLM 提到一个定于 10月27日披露的企业版修复，目前处于保密期，不清楚和这次事件有没有关系。
