---
title: FortiMail 修复请求处理、高可用和加密邮件中的五项严重漏洞
tags:
- Fortinet
- FortiMail
- RCE
summary: Fortinet 11 月公告修复三条未认证代码执行路径，以及两个基于身份的加密邮件账号或会话接管漏洞。请更新自管 FortiMail。厂商称 FortiMail Cloud 已于 10 月 5 日修复这五项问题。
splash: 受影响构建中网络可达的 FortiMail 请求处理服务或 HA 服务。HA 加入漏洞只影响 8.0 和 7.6 系列。
wipe: 按当前系列升级至 8.0.2、7.6.7、7.4.9 或更高版本。7.2 用户应迁移至已修复版本。
cves:
- name: 路径穿越
  description: 未认证攻击者可利用特制请求执行代码或命令。
- name: HA 加入请求命令注入
  description: 未登录的攻击者可通过特制高可用加入请求包执行代码或命令。该公告只适用于 8.0 和 7.6 系列。
- name: SQL 注入
  description: 未认证攻击者可通过特制请求执行未授权代码或命令。
- name: IBE 会话接管
  description: 未认证攻击者可用特制 HTTP 请求获取基于身份的加密 Web 邮件会话，以收件人身份读发加密邮件。
- name: IBE 账号接管
  description: 未认证攻击者可用特制 HTTP 请求接管任意基于身份的加密邮件收件人账号。
fixed:
- {}
- {}
- {}
- status: 迁移至已修复版本
timeline:
- date: 2026年10月5日
  title: Fortinet 称云服务已修复
  body: 11 月公告回溯说明，FortiMail Cloud 于 10 月 5 日完成修复。
- date: 2026年11月10日
  title: Fortinet 发布 FortiMail 严重漏洞公告
  body: 公告列出受影响构建及修复版本，并分别说明高可用和加密邮件的触发前提。
checklist:
- title: 安排升级期间减少网络暴露
  hint: 检查 FortiMail Web 界面及 HA 流量的防火墙规则。仅允许可信管理客户端及集群对端访问管理和 HA 服务。如可临时限制加密 Web 邮件访问，请与邮件运维人员协调，避免影响正常投递或收件人访问。
- title: 备份、修补并核查每台自管设备
  hint: 升级前备份配置。通过 System > Maintenance > Firmware 或厂商支持门户，按已安装分支的升级路径操作。7.2 应迁移至已修复版本。完成后核查每个 HA 成员的固件，并按需测试邮件流转、IBE 和故障切换。
- title: 调查可疑访问和邮件活动
  hint: 保留设备、代理和防火墙日志。排查异常 HTTP 访问、加密邮件会话、收件人账号变更和陌生 HA 加入流量。如怀疑失陷，遏制设备、保留证据，并与 Fortinet 支持协调撤销会话和轮换凭据。
sources:
- name: Fortinet CSAF FG-IR-26-199
  says: 厂商说明 CVE-2026-126147 的范围、评分及修复方法。
- name: Fortinet CSAF FG-IR-26-200
  says: 厂商说明 CVE-2026-126148 的范围、评分及修复方法。
- name: Fortinet CSAF FG-IR-26-216
  says: 厂商说明 CVE-2026-126164 的范围、评分及修复方法。
- name: Fortinet CSAF FG-IR-26-207
  says: 厂商说明 CVE-2026-126155 的范围、评分及修复方法。
- name: Fortinet CSAF FG-IR-26-208
  says: 厂商说明 CVE-2026-126156 的范围、评分及修复方法。
- name: FortiMail 维护指南
  says: 固件菜单与配置备份说明。
---

FortiMail 的五项严重漏洞涉及不同路径。路径穿越和 SQL 注入可通过特制请求执行代码或命令。HA 漏洞要求能够发送特制的集群加入请求。两项 IBE 漏洞使用 HTTP，影响收件人账号或 Web 邮件会话处理。

五项漏洞均影响 8.0.0–8.0.1 和 7.6.0–7.6.6。其中四项也影响 7.4.0–7.4.8 和所有 7.2 构建。HA 漏洞 CVE-2026-126148 是例外，不影响这些较旧系列。针对其余四项，厂商建议 7.2 用户迁移至已修复版本。Fortinet 单独说明 FortiMail Cloud 已修复本文所列五项漏洞。处置前请核对部署类型。

已核阅来源未确认在野利用或受害人数。本文覆盖本批次 FortiMail 的五项严重漏洞。FortiAuthenticator 见[独立条目](/zh/incidents/fortiauthenticator-november-security/)。
