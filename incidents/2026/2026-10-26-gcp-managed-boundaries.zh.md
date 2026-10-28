---
title: Google 披露已修复的 Compute Engine 磁盘授权及 Application Integration 代码执行漏洞
tags:
- Google Cloud
- IAM
- 托管服务
summary: Google 10 月 26 日及 28 日公告披露 Compute Engine 磁盘数据 IAM 绕过，以及 Application Integration 的已认证代码执行问题。二者均在披露前由服务端修复，无需客户更新。
splash: 此前受影响的 Compute Engine 授权及 Application Integration SubWorkflow 处理；要求认证
wipe: 无需客户安装补丁；按日常审计流程检查相关访问与集成
inTheWildNote: 公告未报告利用活动或受害者数量。
cves:
- name: Compute Engine 磁盘授权绕过
  description: 8 月 31 日服务端修复之前，用户可能在缺少所需 IAM 权限时导出磁盘数据。
- name: SubWorkflow 不安全反序列化
  description: 9 月 11 日服务端修复之前，已认证用户可在 Application Integration 中提交特制序列化对象以执行代码。
fixed:
- product: Compute Engine
- product: Application Integration
timeline:
- date: 2026年8月31日
  title: Compute Engine 问题修复
- date: 2026年9月11日
  title: Application Integration 问题修复
- date: 2026年10月26日
  title: GCP-2026-073 披露磁盘授权漏洞
- date: 2026年10月28日
  title: GCP-2026-074 披露反序列化漏洞
checklist:
- title: 核对具体服务通告
  hint: Google 称两项补丁均无需客户操作，公告并未要求升级客户机操作系统或 SDK。
- title: 限定影响评估范围
  hint: 通用审计建议：检查相关磁盘访问、IAM 变更及集成执行记录。如怀疑历史滥用，向 Google Cloud Support 咨询；公告没有攻击活动专属指标。
sources:
- name: Google Cloud GCP-2026-073 及 GCP-2026-074
  says: 披露日期、攻击前提及已完成的服务商补丁。
---

这里汇总相邻托管服务公告中的两个独立漏洞。L3 体现云端授权及代码执行边界的风险，不能据此认定 Google Cloud 当前遭到入侵。
