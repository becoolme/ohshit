---
title: 与 AntiFox 相关的入侵利用 IIS Webshell 和有效 AWS 凭据
tags:
- AntiFox
- IIS
- AWS
- 凭据
summary: Arctic Wolf Labs 将托管 AntiFox 的基础设施与面向公网的 IIS 应用及 AWS 客户账户入侵关联起来。研究人员观测到生产密钥被成功读取，另有活动涉及读取、复制和删除 S3 对象。
splash: 遭入侵的公网 IIS 应用，以及被有效 IAM 凭据或角色会话访问的 AWS 客户账户。
wipe: 隔离失陷的 IIS 服务器，吊销暴露的凭据和会话，在 CloudTrail 中审查成功的 API 调用。
inTheWildNote: Arctic Wolf 观测到实际入侵和成功的 AWS API 调用。
timeline:
- date: 11月10日 16:41 UTC
  title: Arctic Wolf Labs 发布调查结果
  body: 报告将托管 AntiFox 的基础设施与 IIS Webshell 活动及使用有效 AWS 身份滥用 API 的行为关联起来。
checklist:
- title: 隔离受影响的 IIS 服务器并保全证据
  hint: 如果 w3wp.exe 启动异常命令解释器或写入 ASPX 文件，隔离服务器。保全 IIS 和终端日志、Web 根目录，并在可行时保全内存。检查可写上传目录和临时目录，遏制入侵路径后用可信构建恢复应用。
- title: 吊销暴露的 AWS 凭据和会话
  hint: 停用暴露的访问密钥并撤销受影响的角色会话。签发替代凭据前，在 CloudTrail 中核查每个受影响 IAM 用户和角色的活动。轮换通过应用设置、备份文件或日志暴露的数据库密码、API 令牌及其他密钥。更新依赖的工作负载，用最小权限的替代凭据验证访问。
- title: 关联核查报告中的指标
  hint: Arctic Wolf 列出了网络、横幅、进程、文件、API 和 User-Agent 指标。公布的基础设施和标识包括 47[.]79[.]4[.]33 · 8[.]208[.]101[.]210 · TCP/8787 · c370d03542ed2ec696f7337940b14652e98e9bab · AntiFox — 自主渗透测试控制台 · Boto3/1.43.125 · Botocore/1.43.125。请参阅报告中的完整清单。在 EDR 中检查 w3wp.exe 的异常子进程和可写上传路径中的新 ASPX 文件。在 CloudTrail 中排查大量拒绝记录中夹杂的成功 GetSecretValue 或 S3 对象调用，并将时间与 IIS 活动对照。单个命中不足以确认失陷。
- title: 核查 S3 变更并完善日志
  hint: 对已启用 S3 数据事件的存储桶，将 GetObject、CopyObject 和 DeleteObject 与工作负载的预期行为对照。核对对象版本，必要时从已验证的副本恢复受影响对象。启用 CloudTrail 管理事件及相关 S3 数据事件，并用 GuardDuty 监控异常身份活动。
sources:
- says: 记录观测到的 IIS 和 AWS 活动、调查范围、指标及遏制步骤。
- says: AWS 吊销活跃 IAM 角色会话的官方步骤。
---

Arctic Wolf 观测到一个 IIS 工作进程写入 ASPX Webshell，并执行命令提取应用设置和数据库连接字符串。最初被利用的 IIS 漏洞尚不明确。另有活动从来源不明的有效 AWS 凭据开始。云端操作使用现有 AWS 身份，在客户环境内发生。研究人员没有披露受害者数量，也没有将每项操作归因于 AI 智能体。
