---
title: "Gheist 利用被盗 GitHub 令牌，通过 Actions 日志窃取仓库密钥"
tags: [GitHub Actions, 凭据, 供应链]
summary: "Wiz 报告在超过 850 个失陷账号中发现超过 13,500 个被植入的分支。攻击者用被盗令牌推送窃密工作流，已在私有仓库和企业环境观察到成功执行。应吊销令牌并轮换暴露的密钥。"
splash: "被盗令牌可写入工作流的仓库；私有仓库和 GHES 不受 GitHub 公共仓库审批暂缓机制保护"
wipe: "吊销失陷令牌，轮换可访问的密钥，调查运行器主机，并限制环境密钥及 OIDC 访问"
inTheWildNote: "Wiz 观察到私有仓库中的执行，以及后续对 AWS Secrets Manager 的枚举。"
timeline:
  - date: 2026年9月15日
    title: Wiz 开始跟踪攻击活动
  - date: 2026年10月19日
    title: 一个变体加入自托管运行器任务
  - date: 2026年10月24日
    title: Wiz 观测截止时攻击仍在持续
  - date: 2026年10月25日
    title: Wiz 发布攻击调查报告
checklist:
  - title: 阻断失陷访问，不要运行载荷
    hint: "不要批准暂缓的 sync-check 任务，也不要执行 ci-sync 分支。吊销推送未授权提交的令牌，并调查令牌所属设备是否存在窃密软件。保留可获取的审计证据。"
  - title: 轮换受影响仓库能够访问的每个密钥
    hint: "包括仓库级、组织级及可访问的环境密钥。删除分支或运行记录不能撤销已经发生的暴露。空的工作流权限块限制的是 GITHUB_TOKEN，不是 secrets 上下文的访问。"
  - title: 联合排查 GitHub 和云审计日志
    hint: "查找符合 ^ci-sync-[0-9a-z]{6}$ 的分支、新增的 .github/workflows/sync-check.yml、提交消息 ci: sync config、工作流名 sync-check 和 User-Agent gheist。关联完成后一分钟内被删除的任务，以及主体中带有 ci-sync- 分支的云端 OIDC 角色代入或令牌交换。仅命中指标不能证明密钥被窃取。"
  - title: 调查自托管运行器，并比对全部公开的工作流对象
    hint: "若受影响分支已在自托管运行器执行，应视主机及其实例角色为已失陷。检查主目录和工作区中的 .env、Terraform state、Shell 历史、/proc/*/environ、运行器凭据及 Kubernetes 服务账号令牌，轮换范围不能只限于仓库密钥。查找任务 sync-host、文件 .gdmp_pat、.gdmp_patg、.gdmp_sweep、日志头 ===== gdmp-pivot:，以及 toJSON(secrets)、base32 -w 120 和 LAFA==== 标记。Wiz 列出四个工作流 blob SHA：f3da2b8b357dcda02fd455d314be2a95007516a6（基础版）、d09535857a741bbb976bdc084a9a021713133291（超时版）、1dc5af9cce950aad1eb1546ecce8565b117540c4（分隔符版）、c665b778b2d822453293003e7ca0bbb2cb08e39d（自托管版）。环境矩阵变体的哈希不同，未命中不能证明安全，单独的标记也不能证明已经执行。"
  - title: 保护环境密钥和云角色，隔离运行器
    hint: "为生产环境要求审批，将 OIDC 信任限制到受保护分支或环境。优先使用 GitHub Apps 或短期细粒度令牌。使用临时自托管运行器，不开放 Docker socket 或无限制的元数据访问。"
sources:
  - name: Wiz Gheist 调查
    says: "10月25日一手调查：账号及分支数量、私有仓库执行证据、完整指标、载荷限制及处置步骤。"
  - name: GitHub 恶意工作流审批保护
    says: "部分可疑任务需要具有写权限的协作者通过已认证的网页会话批准；适用于 github.com 公共仓库，不涵盖私有仓库或 GHES。"
---

攻击者需要能够推送工作流的被盗令牌。密钥编码后可避开按原值匹配的日志掩码；攻击者通过 GitHub API 获取日志，然后删除任务记录。若环境保护允许任务运行，环境矩阵也可能让攻击者获取环境密钥。Wiz 的分支及账号总量不是成功窃取密钥的次数。

GitHub 的自动暂缓机制阻止了 Wiz 检查过的全部公共仓库任务，但不覆盖私有仓库或 GitHub Enterprise Server。这不能证明每个公共工作流都安全。自托管载荷还会尝试收集主机、Docker 和元数据中的信息，但 Wiz 发现其存在缺陷：运行器密钥文件找错了，URL 凭据正则表达式有误，也没有采集 GCP 或 Azure 令牌。

这与 [GhostAction](/zh/incidents/ghostaction-returns/) 是不同事件；同样滥用凭据，不能证明背后是同一操作者。软件补丁不能代替令牌吊销和密钥轮换。由于已观察到密钥窃取及后续云端活动，评级为 L4。
