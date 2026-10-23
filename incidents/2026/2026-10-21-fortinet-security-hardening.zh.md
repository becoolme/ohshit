---
title: "Fortinet 要求优先升级五类产品，详细安全公告稍后发布"
tags: [Fortinet, 边缘设备, 补丁]
summary: "Fortinet 宣布修复严重和高危漏洞，详细公告计划于 11月10日发布。优先处理面向互联网的设备。"
splash: "FortiOS、FortiManager、FortiAnalyzer、FortiMail 和 FortiAuthenticator"
wipe: "备份配置；对应分支的更新可用后及时安装"
inTheWildNote: "公告未提供在野利用证据或单项 CVE 详情"
fixed:
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
  - status: 迁移至 7.4 或更新分支
  - {}
  - {}
timeline:
  - date: 2026年10月21日
    title: 发布优先升级通知
  - date: 2026年10月22日（计划）
    title: 集中推出固件更新
checklist:
  - title: 备份并升级
    hint: 先存配置，面向公网的设备优先。FortiMail 7.2 没有修复，迁到 7.4
  - title: 将管理界面访问限制到可信地址
    hint: HTTPS 和 SSH 管理只放行可信 IP，或在外网接口上直接关掉。FortiManager 绝不该暴露在公网
  - title: 审查管理访问与配置变更
    hint: 管理员账号强制 MFA；查找异常登录和没人批准过的配置变更
sources:
  - name: Fortinet CISO 公告
---

**L3：** 广泛部署的边缘设备和身份产品需要优先更新。各平台可用时间不同，请核对下载与升级路径。CVE、具体技术影响及利用情况尚未说明。Fortinet 称漏洞源于主动进行的 AI 辅助发现，详情计划于 11月10日发布。
