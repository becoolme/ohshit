---
title: GitLab 修复受保护流水线变量和其他机密的访问漏洞
tags: [GitLab, CI/CD, Kubernetes, 访问控制]
summary: GitLab 修复流水线作业授权中的竞态。特定条件下，已登录用户可读取受保护的 CI/CD 变量。同批补丁还修复两处存储型脚本注入，以及影响 Kubernetes Secret 的工作区漏洞。
splash: 低于修复版本的自托管 GitLab CE/EE。工作区漏洞还要求集群通过 GitLab Agent 接入。
wipe: 按分支升级至 GitLab 19.5.6、19.4.8 或 19.3.9，并核查敏感流水线和工作区机密的访问记录。
inTheWildNote: 厂商公告未报告在野利用。
cves:
- name: 流水线作业授权竞态
  description: 在特定竞态条件下，已登录用户可能访问受保护的 CI/CD 变量和资源。
- name: 工作区授权绕过
  description: 拥有较高权限（CVSS PR:H）的已登录用户可能通过接入的 GitLab Agent 读取其他命名空间的 Kubernetes Secret。
- name: Wiki 跨站脚本
  description: 已登录用户可注入 JavaScript，当其他用户访问 Wiki 页面时执行。
- name: Error Tracking 跨站脚本
  description: 已登录用户可注入 JavaScript，当其他用户访问 Error Tracking 页面时执行。
fixed:
- {}
- {}
- {}
timeline:
- date: 2026年11月16日
  title: GitLab 发布三个修复版本
  body: GitLab 将 11 月 16 日列为 19.5.6、19.4.8 和 19.3.9 的发布日期。
- date: 2026年11月17日
  title: 流水线授权竞态 CVE 公布
  body: GitLab 的 CNA 记录说明 CI/CD 授权竞态和已修复的版本分支。
checklist:
- title: 升级自托管实例并确认运行版本
  hint: 通过 GitLab 管理区或包管理器确认当前版本和版本类型。按 GitLab 指引从已安装版本逐步升级。安装当前分支的修复版本，或升级到已修复且仍受支持的分支，随后核实运行版本并测试一条有代表性的受保护流水线。
- title: 核查流水线和接入的工作区是否存在异常访问
  hint: 检查可用的流水线与作业日志、审计事件和 Kubernetes API 审计日志，排查异常用户、作业及跨命名空间的 Secret 读取，并保全相关记录。若怀疑泄露，在签发方吊销并重新签发受影响的 CI/CD 和 Kubernetes 凭据，同时更新使用这些凭据的正常作业。
- title: 核查 Wiki 和 Error Tracking 活动
  hint: 查看受影响 Wiki 和 Error Tracking 页面的近期编辑及异常输入。如发现注入脚本，先保全证据再移除，并核查访问过这些页面的用户会话及令牌。
sources:
- name: GitLab 安全补丁公告
  says: 列出该批补丁发布日期、修复版本、受影响的功能及 CVSS 评分。
- name: GitLab CI/CD 授权竞态 CNA 记录
  says: 列出流水线竞态的披露时间、身份认证前提及受影响版本。
---

流水线授权竞态影响 GitLab CE/EE 9.3 起且低于 19.3.9 的版本、低于 19.4.8 的 19.4 分支，以及低于 19.5.6 的 19.5 分支。GitLab 表示，特定条件下，已登录用户可能访问受保护的 CI/CD 变量和资源。厂商公告未公布触发竞态的具体条件。

工作区漏洞影响 GitLab CE/EE 17.6 起至对应修复版本之前的版本，并要求集群通过 GitLab Agent for Kubernetes 接入。Wiki 和 Error Tracking 漏洞分别从 CE/EE 17.2 和 16.1 开始受影响，直至对应的修复版本。这两处脚本注入都要求攻击者已登录，且有用户查看受影响页面。GitLab 公告列出了该批补丁中的其余修复。参照 [GitLab 升级路径指南](https://docs.gitlab.com/update/upgrade_paths/) 确认从当前版本升级时必须经过哪些版本。
