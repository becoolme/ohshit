---
title: ClickHouse 修复未认证服务器代码执行漏洞，覆盖四条版本线
tags: [ClickHouse, 数据库, RCE]
summary: ClickHouse 披露 CVE-2026-116366：未认证网络用户可在特定条件下远程执行代码。四条开源版本线已有修复，厂商称 Cloud 和 BYOC 已完成修补。触发条件及受影响接口尚未披露，在野利用未获确认。
splash: 低于所列修复版本且可通过网络访问的自管 ClickHouse 服务器；具体触发条件未披露
wipe: 升级至受支持版本线的修复构建，逐台检查服务器，包括应用内置的部署
inTheWildNote: 厂商未确认在野利用；CISA 10 月 30 日评估列为未见利用。
cves:
  - name: 未认证服务器 RCE
    description: 厂商 CNA 将缺陷归为整数溢出或回绕；未认证网络用户可在未披露条件下执行代码。9.5 分采用 CVSS v4.0。
fixed:
  - { product: ClickHouse 26.10 稳定版, status: 已修复 }
  - { product: ClickHouse 26.9 稳定版, status: 已修复 }
  - { product: ClickHouse 26.8 LTS, status: 已修复 }
  - { product: ClickHouse 26.3 LTS, status: 已修复 }
  - { product: 其他开源版本线, status: 迁移至受支持版本线 }
timeline:
  - date: 2026年10月25日
    title: 发布稳定版修复包
    body: 软件包索引将 26.10.3.7 和 26.9.27.3 标注为当天发布；软件包日期不等于公开披露日期。
  - date: 2026年10月26日
    title: 发布 LTS 修复包
    body: 软件包索引将 26.8.36.3 和 26.3.62.3 标注为当天发布。
  - date: 10月30日 10:59 UTC
    title: 厂商记录公开披露
    body: CNA 的公开日期与 10 月 30 日安全更新日志确立披露日；CVE 记录于 11:00 UTC 发布。
checklist:
  - title: 升级每台自管服务器
    hint: 从官方软件仓库或经校验的归档获取所列稳定版、LTS 构建或同版本线后续修复版。逐台核对运行中的服务器以及内置 ClickHouse 的应用；只升级客户端不会更新服务器。不再受支持的旧版本线需迁移至受支持版本线。
  - title: 修补期间限制网络访问
    hint: 通过防火墙或安全组，仅允许可信应用及管理网络访问服务器。这可缩小暴露面，但不是已证实有效的替代修复。公告未指出具体漏洞端口或接口，不能假设过滤一个监听端口即可解决问题。
  - title: 单独核实托管服务状态
    hint: 安全更新日志称所有 ClickHouse Cloud 和 BYOC 部署均已修复。这不涵盖独立运营的安装，也不能证明此前未被入侵；保留相关日志并调查异常活动。
sources:
  - name: ClickHouse 安全更新日志
  - name: ClickHouse CNA 记录及 CISA 评估
  - name: ClickHouse 官方软件包及发布日期
  - name: ClickHouse 安全更新支持版本线
---

ClickHouse 是主流数据库，且厂商确认存在未认证代码执行，因此据已披露范围评为 L3。CNA 攻击向量不要求身份验证或用户交互，但攻击复杂度为高。评分或网络可达性均不能证明每台可访问的安装都可被利用：厂商尚未说明额外条件。

这些来源未确立公开利用代码或受害者数量。记录中的 CISA 评估是 10 月 30 日快照，不能证明之后不会发生攻击。所引来源未公布事件专属排查指标。厂商未将此缺陷与独立的 Brotli 漏洞关联，不能因发布日期接近就推断根因相同。
