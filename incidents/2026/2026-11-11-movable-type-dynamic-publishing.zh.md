---
title: 特制请求可让 Movable Type 动态发布功能执行 PHP
tags: [Movable Type, CMS, RCE]
summary: 未认证请求可使受影响的 Movable Type 动态发布站点执行 PHP。Six Apart 已发布 8.8.7、8.0.14 及 Premium 2.19。Movable Type 9 不在公告影响范围内。
splash: 启用受影响动态发布配置的 Movable Type 8.8、8.0、Premium 2.x 以及停止支持的 8.4 和 7 站点。
wipe: 安装对应更新，或从已停止支持的旧版本迁移。升级后审查模板包含设置，并测试动态页面。
cves:
- name: 动态发布中的 PHP 代码注入
  description: 特制请求可经受影响的模板处理执行 PHP。JVN 给出的 CVSS 4.0 评分为 6.9，CVSS 3.0 为 7.3。
fixed:
- {}
- status: 停止支持后例外提供修复
- {}
- status: 已停止支持
timeline:
- date: 2026年11月11日
  title: Six Apart 与 JVN 公布漏洞和修复版本
  body: Six Apart 发布 8.8.7、8.0.14 及 Premium 2.19，并说明 PHP 处理行为的差异。
checklist:
- title: 找出受影响站点并更新
  hint: 盘点 Movable Type 和 Premium 版本，核查哪些站点使用动态发布。从 Six Apart 获取对应的版本和构建。为 8.4 和 7 制定迁往受支持版本系列的计划。例外提供的 8.0.14 修复不代表 8.0 恢复长期支持。
- title: 安排更新期间减少暴露
  hint: 可行时暂停受影响的动态路由，或将其限制在可信网络。检查 mt-config.cgi 中的 DynamicTemplateAllowPHP。JVN 建议设为 0 以限制模板 PHP，但仍应按 Six Apart 说明核对该版本的包含例外并安装更新。
- title: 测试模板并调查可疑请求
  hint: 恢复公网流量前，在预发布环境检查包含和组件设置、错误页及依赖 PHP 的模板。检查动态路由的 Web 和 PHP 日志是否有异常。若怀疑失陷，先保留日志、隔离站点并检查意外出现的 PHP 文件或进程，再更换暴露凭据。
sources:
- name: Six Apart 安全更新公告
  says: 确认三个发布版本、8.0 的例外修复及模板行为。
- name: JVN 协调披露
  says: 说明受影响的产品、远程请求前提、评分及临时配置建议。
- name: Six Apart 8.8.7 发布说明
  says: 说明更新后仍可执行 PHP 的具体包含例外。
---

受影响模板可能执行某些标签、`mteval` 修饰符或错误页处理产生的 PHP。该请求路径适用于动态发布。JVN 列出各自分支中的 Movable Type 8.8.6、8.0.13 及更早版本（含 Advanced），以及 Premium 2.x 中的 2.18 及更早版本（含 Advanced Edition）。已停止支持的 8.4 和 7 同样受影响。两份公告均未确认在野利用。

Six Apart 在 8.8.7 和 8.0.14 的发布说明中均列出包含例外。这两个版本也是 Premium 2.19 的构建基础。通过 `MTInclude`、`MTIncludeBlock`、`MTWidgetSet` 或 `MTWidgetManager` 加载的内容，在启用对应的服务端包含设置时仍可执行其中的 PHP。若站点的包含方式为 PHP，且 `MTInclude` 或 `MTIncludeBlock` 使用 `ssi="1"`，同样适用。8.8.7 发布说明特别提醒，更新后即使设置 `DynamicTemplateAllowPHP 0`，这些例外仍可能执行 PHP。更新也保留了直接写入模板的 PHP 的原有处理方式。请在实际部署的构建上核查设置和行为。
