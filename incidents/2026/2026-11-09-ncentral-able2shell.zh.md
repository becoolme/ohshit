---
title: Able2Shell 公开利用代码后，N-able 发布 N-central 热修复
summary: 公开概念验证代码披露后，N-able 发布 N-central 2026.4 HF2。厂商观察到扫描，并称 HF2 修复了已识别的未认证利用路径。仍需修复需要认证或特定条件的漏洞。
splash: N-central 服务器，尤其是公网可达的本地部署。托管和本地部署客户均需更新 Agent 和 Probe。
wipe: 本地服务器安装 HF2 构建 2026.4.1.26 前应保持公网不可达。先更新 Agent，再更新 Probe。
inTheWildNote: N-able 观察到与 PoC 相关的扫描，在托管服务器上未发现失陷迹象。
timeline:
- date: 2026年11月9日
  title: 研究人员公开漏洞
  body: N-able 将公开披露日期记为 11 月 9 日。
- date: 2026年11月10日
  title: N-able 发布 HF2 说明
  body: 构建 2026.4.1.26 取代 2026.4 及 HF1。
- date: 2026年11月11日
  title: N-able 报告托管服务器恢复上线
  body: N-able 称已修补托管服务器，并在准备后续热修复。
- date: 2026年11月13日
  title: N-able 公布 HF3 的认证与权限修复计划
  body: 厂商计划强化认证与权限检查，以修复 11 月 9 日披露的问题中普通已认证账户可利用的漏洞。
checklist:
- title: 隔离并更新管理服务器
  hint: 按厂商指引选择当前构建的升级路径。本地部署在安装 HF2 并核验构建号前保持公网不可达。托管服务器由 N-able 升级。
- title: 先更新 Agent，再更新 Probe
  hint: 先安装 Agent 软件包，确认自动推送的 Patch Management Engine 更新已生效，再更新 Probe。核对 Agent 与 Probe 通信以及离线补丁缓存等功能。
- title: 调查可能暴露的环境并跟踪后续修补
  hint: 保留服务器访问、认证和终端活动日志。怀疑暴露时与 N-able 支持核查异常请求及变更。关注 HF3 的正式发布说明，核对适用版本和各问题的修复状态。
sources:
- name: N-able HF2 发布说明
  says: 列出服务器构建、支持的升级路径及 Agent／Probe 兼容要求。
- name: N-able 11 月 11 日响应公告
  says: 说明公开 PoC、扫描、托管环境恢复及待完成工作。
- name: N-able 漏洞修复进展
  says: 明确 HF2 修复的七个 CVE，并说明 HF3 对 11 月 9 日披露漏洞的计划修复范围。
cves:
- name: 多个 XXE 问题
  description: 涉及多个 XML 外部实体问题。
- name: 多个 OGNL 注入
  description: 多个路径可注入 OGNL 表达式。
- name: 本地提升至 root
  description: 可写的 syslog-ng 配置可用于本地提权至 root。
- name: 存储型跨站脚本
  description: MMS3 补丁元数据可在管理员上下文中触发存储型脚本注入。
- name: 服务端请求伪造
  description: 服务导入架构校验期间，架构提示可影响请求。
- name: 文件仓库上传路径遍历
  description: 仓库上传路径遍历可导致远程代码执行。
- name: 经 IPC 本地提权
  description: 不安全的进程间通信通道可用于本地提权。
fixed:
- product: N-central 2026.4 HF2
---

N-able 称 HF2 修复了当时已识别的全部未认证利用路径。其余已披露路径需要账户，通常还需较高权限，或要求其他条件。厂商在 11 月 11 日公告中列出 CVE-2026-125883、CVE-2026-125878 至 CVE-2026-125882 及 CVE-2026-91000。请随厂商发布后续补丁核对各漏洞的处置状态。公开 PoC 及扫描支持评为 L3。厂商在本次更新中尚未确认某个客户环境发生利用。

11 月 13 日，N-able 明确列出的七个 CVE 均已在 HF2 修复。厂商称最初披露中仍待修复的数据泄露问题需要通过认证，其中部分需要 Product Admin 权限。计划中的 HF3 将修复普通已认证账户可利用的漏洞。公告未给出需要 Product Admin 权限的漏洞的修复版本。另见 [HF2 上的新攻击链](/zh/incidents/ncentral-hf2-attack-chains/)及其各自的利用前提。
