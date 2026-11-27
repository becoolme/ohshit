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
- date: 2026年11月10日
  title: Arctic Wolf Labs 发布调查结果
  body: 报告将托管 AntiFox 的基础设施与 IIS Webshell 活动及使用有效 AWS 身份滥用 API 的行为关联起来。
- date: 2026年11月10日
  title: 报告提供指标及遏制指引
  body: 公开表格包含 22 项基础设施、界面、进程、文件、API 序列及 User-Agent 条目。报告另建议吊销密钥／会话、加固 EC2 元数据及配置 S3 恢复措施。
checklist:
- title: 隔离受影响的 IIS 服务器并保全证据
  hint: 如果 w3wp.exe 启动异常命令解释器或写入 ASPX 文件，隔离服务器。保全 IIS 和终端日志、Web 根目录，并在可行时保全内存。检查可写上传目录和临时目录，遏制入侵路径后用可信构建恢复应用。
- title: 吊销暴露的 AWS 凭据和会话
  hint: 分别停用暴露的访问密钥并吊销临时会话。普通 IAM 角色可在 IAM → Roles → 角色名 → Revoke sessions → Revoke active sessions 操作；需 PutRolePolicy 权限，并会附加 AWSRevokeOlderSessions。该策略拒绝截止时间前签发的会话（含约 30 秒传播余量），也影响该角色的合法用户，可能中断工作。余量后新取得的会话不受影响，因此还需遏制失陷身份／访问路径，阻止继续取得会话。此方法不能吊销服务关联角色会话；IAM Identity Center 权限集角色应采用 AWS 链接中的单独 Identity Center 会话吊销流程。更换凭据前，逐个核查受影响 IAM 用户／角色的 CloudTrail。轮换通过 web.config、设置、部署资源、环境变量、备份或调试日志暴露的数据库密码、AWS 密钥、API 令牌、加密密钥及应用机密。更新依赖工作负载，重新取得合法会话，并验证最小权限替代访问。
- title: 关联核查报告中的指标
  hint: Arctic Wolf 指标表共有 22 项：47[.]79[.]4[.]33 · 8[.]208[.]101[.]210 · TCP/8787 · c370d03542ed2ec696f7337940b14652e98e9bab · AntiFox — 自主渗透测试控制台；进程链 w3wp.exe → cmd.exe、w3wp.exe → powershell.exe、w3wp.exe → where.exe、cmd.exe → whoami.exe、cmd.exe → icacls.exe；文件模式 *.aspx、\pwn*.aspx、\cfg*.txt、\wc*.txt、\el*.txt；API 序列 ListSecrets → GetSecretValue、GetCallerIdentity → ListBuckets、ListBuckets → ListObjects、ListObjects → HeadObject、ListObjects → GetObject；User-Agent 为 Boto3/1.43.125、Botocore/1.43.125。另查 PowerShell 中的 System.Web.Configuration.WebConfigurationManager、WebConfigurationFileMap、VirtualDirectoryMapping、ConnectionStrings.ConnectionStrings、AppSettings.Settings、[IO.File]::ReadAllText；检查 whoami.exe／icacls.exe／归档工具、新 ASPX 文件，以及可写上传／临时／图片转换目录中伪装成 .txt 或图片的配置／日志副本。将 EDR、IIS 时间与大量拒绝中夹杂的成功 GetSecretValue、S3 调用、单一来源使用多个身份及陌生托管 ASN 关联。云地址可能共享或重新分配，工具也有合法用途，单个命中不足以确认失陷。完整来源仍保留链接。
- title: 核查 S3 变更并完善日志
  hint: 对已启用 S3 数据事件的存储桶，将 GetObject、CopyObject 和 DeleteObject 与工作负载的预期行为对照。核对对象版本，必要时从已验证的副本恢复受影响对象。启用 CloudTrail 管理事件及相关 S3 数据事件，并用 GuardDuty 监控异常身份活动。 为关键对象启用 S3 版本管理，并在适用时使用 Object Lock。确需 EC2 角色时，强制 IMDSv2 并限制元数据响应跳数，将应用身份权限限制为必需资源；优先测试并修补公网的上传／转换应用。这些措施不能修复尚未识别的初始 IIS 漏洞，也不能移除已有 Webshell。
sources:
- says: 记录观测到的 IIS 和 AWS 活动、调查范围、指标及遏制步骤。
- says: 官方角色会话吊销步骤、截止／传播行为、合法会话影响、服务关联角色／Identity Center 限制，以及临时与长期凭据范围。
- name: Arctic Wolf Labs 当前报告
  says: 当前完整原文与 11 月 10 日固定版本一致，给出指标表全部 22 项，以及其他行为排查和遏制步骤。
---

Arctic Wolf 观测到一个 IIS 工作进程写入 ASPX Webshell，并执行命令提取应用设置和数据库连接字符串。最初被利用的 IIS 漏洞尚不明确。另有活动从来源不明的有效 AWS 凭据开始。云端操作使用现有 AWS 身份，在客户环境内发生。研究人员没有披露受害者数量，也没有将每项操作归因于 AI 智能体。


**排查与吊销指引更正：** 早前清单链接了完整指标表，但遗漏部分文件模式、进程链与 API 序列。现已补入上方，并补充报告中的其他行为核查。固定版本与当前研究报告仍说明攻击使用有效凭据进入客户环境，并非 AWS 平台遭入侵。未确立新的受害者数量、CVE 或修复版本。原始报告仅给出 11 月 10 日而没有发布时间，已移除早前时间线中的精确时刻。

AWS 角色会话吊销使用按时间截止的拒绝策略，不能替代停用暴露的长期密钥或遏制继续签发新会话的路径。应评估其对合法工作负载的影响；Identity Center 管理的角色须采用单独流程，服务关联角色不适用此流程。
