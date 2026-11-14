---
title: Plaid 发现未授权访问后暂停全部 KARTE 项目
tags:
- 数据泄露
- 个人资料
summary: Plaid 发现第三方未授权访问后开始关闭全部 KARTE 项目，已向资料可能暴露的客户发送邮件。截至 11 月 14 日，仍在调查影响范围。
splash: 所有 KARTE 项目，包括网站和应用追踪、内容投放、Message 邮件活动、Datahub 工作流及管理界面。
wipe: 核实 Plaid 针对项目发出的通知，保留集成日志，重试前核对中断任务。
inTheWildNote: Plaid 确认 KARTE 遭未授权访问，可能的数据暴露范围仍在调查。
timeline:
- date: 2026年11月13日 05:44 UTC
  title: Plaid 宣布分阶段暂停服务
  body: 影响所有 KARTE 项目。正在运行的邮件或数据工作流可能中途停止。
- date: 2026年11月13日 14:35 UTC
  title: Plaid 通报客户通知情况
  body: Plaid 称已确定可能暴露的信息，并向受影响客户发送邮件。
- date: 2026年11月14日 12:05 UTC
  title: Plaid 继续调查
  body: Plaid 仍未给出恢复时间。
checklist:
- title: 确认项目暴露情况
  hint: 关注事件状态，并通过现有 Plaid 支持渠道核实邮件。询问涉及的项目 ID、字段、时间范围及是否需要更换集成凭据。
- title: 保留日志并核对失败任务
  hint: 保存可取得的应用、集成及投递日志。检查下游记录，确认 KARTE Message 邮件或 Datahub 传输是否已部分完成。恢复后只重放遗漏任务，避免重复操作。
- title: 验证服务恢复
  hint: 按 Plaid 的恢复指引重启工作流。先用少量任务验证追踪、投递和集成，再核对收件对象及结果。
sources:
- name: Plaid 事件公告
  says: 确认检测到第三方未授权访问，以及全部项目停用。
- name: KARTE 事件状态
  says: 记录通知、任务影响及恢复进展。
---

Plaid 尚未公布初始入侵方式、暴露的数据字段或受影响客户数。公司称资料可能暴露。停用范围涵盖所有项目，公开调查结果尚未认定全部项目的数据均已暴露。
