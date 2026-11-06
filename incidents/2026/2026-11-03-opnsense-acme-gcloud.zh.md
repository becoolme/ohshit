---
title: OPNsense ACME 插件的证书权限可升级为 root 命令执行
summary: OPNsense os-acme-client 4.17 及更早版本的 Google Cloud DNS 模块将未转义字段拼入 shell 命令。拥有 WebGUI／API 证书签发或续期权限的已认证用户可执行 root 代码。插件 4.18 修复；这并非所有 OPNsense 安装均存在的未认证漏洞。
splash: 使用受影响 os-acme-client Google Cloud DNS 验证的 OPNsense；攻击者须有证书签发或续期权限。
wipe: 将 os-acme-client 更新至 4.18 并核查证书管理权限；Selfhost DNS 用户须重新填写新 API 密钥凭据。
inTheWildNote: 原始插件修复及 CVE 记录未确立在野攻击或受害者。
cves:
- name: Google Cloud DNS 验证命令注入
  description: DnsGcloud::prepare() 将解码后的 gcloud_account／gcloud_project 拼入 shell 命令。CNA 给出 CVSS4.0 9.4，要求低权限。
fixed:
- product: OPNsense os-acme-client 插件
  status: 插件变更记录明确修复 Google Cloud DNS 命令注入；不是 OPNsense 核心版本号
timeline:
- date: 2026年11月3日
  title: 插件 4.18 发布 PR 公开标识修复
  body: 原始发布 PR 提及 Google Cloud DNS 问题及报告者，创建及合并日期均为 11 月 3 日。
- date: 2026年11月5日
  title: CVE 记录说明 root 执行及权限前提
  body: CNA 描述插件 4.17 及更早版本，以及已认证的证书签发／续期权限。
checklist:
- title: 盘点插件版本及证书管理权限
  hint: 在 OPNsense WebGUI 检查已安装 os-acme-client 版本及 Google Cloud DNS 验证配置，审计可签发或续期证书的用户及 API 凭据。仅网络可达不足以利用；CVE 要求这些已认证权限。
- title: 安装插件 4.18 并阅读迁移说明
  hint: 通过官方 OPNsense 插件更新路径安装 os-acme-client 4.18，核实实际插件版本，不能拿 OPNsense 核心版本号比较。同一版本将 Selfhost DNS 改为 API 密钥认证；若使用 Selfhost，须重新输入凭据。此迁移要求与 Google Cloud DNS 漏洞分开。
- title: 排查异常验证操作并保护暴露凭据
  hint: 作为防御性措施，调查异常证书操作或命令前保留证书验证、WebGUI／API 及系统审计记录。若怀疑失陷，与安全团队确认 root 访问及 DNS／API 凭据影响范围，再从干净系统轮换。原始记录未提供专用指标、确认利用时段或通用恢复脚本。
sources:
- name: OPNsense 原始 4.18 发布 PR API
  says: 11 月 3 日公开发布 PR 标识 Google Cloud DNS 漏洞及报告者。
- name: OPNsense 插件变更记录
  says: 4.18 明确修复命令注入，并要求 Selfhost DNS API 密钥凭据重新填写。
- name: 原始 CVE CNA 记录
  says: 11 月 5 日记录说明 Google Cloud DNS、插件至 4.17、需认证签发／续期权限、root 执行及 CVSS4.0 9.4。
---

解码后的 Google Cloud DNS 模型字段 gcloud_account 和 gcloud_project 未经验证或 shell 转义，经 LeUtils::run_shell_command() 传入 proc_open()。被授予证书签发或续期权限的用户可因此跨越权限边界，执行任意 root 代码。暴露取决于特定插件、模块及已认证证书管理权限；来源未确立 OPNsense 核心遭未认证入侵。

本轮核实的最早公开记录是 11 月 3 日插件发布 PR，早于 11 月 5 日 CVE 记录。插件变更说明将 4.18 列为修复。未确立在野利用、受影响客户数量或厂商专用失陷恢复流程。主流防火墙平台存在升级至 root 的权限边界问题，因此评为 L3，并明确列出权限与模块前提。
