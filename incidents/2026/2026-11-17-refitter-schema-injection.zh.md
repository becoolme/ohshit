---
title: Refitter 的 schema 字段可向生成客户端注入可执行 C#
tags:
- Refitter
- 代码生成
- RCE
summary: GHSA-h924-jfhp-9vjr 报告 schema 名称、鉴别字段、默认值及枚举中的代码注入。恶意 OpenAPI 文档可生成能正常编译的代码，其模块初始化器在程序集加载时执行。公告未列出修复版本。
splash: 开发者/CI 使用攻击者可影响的 OpenAPI；已测试 2.3.1 和 2.4.0-preview.126
wipe: 暂停处理不可信 OpenAPI；检查生成的 C#，等待核实的完整修复
inTheWildNote: 已有公开复现；已审阅来源未确认在野攻击。
cves:
- name: schema 到 C# 的代码注入
  description: 默认校验遗漏 schema 派生的字面量和值入口；无需调用客户端，加载程序集即可触发执行。
fixed:
- status: 未列出补丁；只测试了范围两端，中间版本未测试
timeline:
- date: 2026年11月17日
  title: 维护者发布公告
checklist:
- title: 停止从不可信规范生成代码
  hint: 覆盖 CLI、SourceGenerator 和 MSBuild 输入。隔离生成环境，不向其提供凭据。
- title: 构建或加载前审计生成代码
  hint: 检查 schema 属性名、鉴别字段及映射、数字默认值和整数枚举。默认校验及旧版 2.1.2 修复均不充分。
- title: 追踪完整上游修复
  hint: 要求对所有受影响 schema 入口执行 C# 字面量转义或拒绝处理；不能假设 2.4.0 已修复。
sources:
- name: Refitter 原始安全公告
- name: Refitter 2.4.0 模板源码
---

公告在两个版本中复现执行，并未演示全部中间版本。L3 反映公开的代码生成利用。

独立阅读的 2.4.0 模板仍将 `Discriminator` 插入 `JsonPolymorphic` 特性，插入处未执行转义。这印证了公告对此版本源码的担忧，不等于新增运行时复现。代码还加载 NJsonSchema 和 NSwag 模板程序集。应将生成源码视为信任边界；编译成功不能证明安全。

隔离属于通用预防措施，不是已确认的完整缓解方案。
