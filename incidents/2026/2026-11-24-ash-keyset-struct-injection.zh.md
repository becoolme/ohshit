---
title: Ash 修复未签名 keyset 分页游标导致的代码执行和 SQL 注入
tags:
- Elixir
- Ash
- 反序列化
- RCE
- SQL 注入
summary: Ash 3.31.3 至 3.38.0 之前版本会在未签名 keyset 游标中接受伪造 struct。在特定排序类型及已演示的 AshPostgres 路径下，可导致代码执行或 SQL 注入。升级到 3.38.0；3.37.0 及以上版本可先启用游标签名缓解。
splash: 接受客户端 keyset 游标、未配置签名密钥且排序字段可接受 struct 的 Ash 应用；已在 AshPostgres 演示
wipe: 升级 Ash 至 3.38.0；3.37.0 及以上版本可在升级前先设置强随机 keyset_signing_secret
inTheWildNote: 公告提供 PoC，未确认 Ash 部署遭到实际利用。
cves:
- name: keyset 游标中的伪造 struct 值
  description: 未签名客户端游标可把 struct 带过表达式和类型检查，触达协议回调或原始 SQL。CNA 的 CVSS 4.0 8.9 分使用 AV:L、AT:P；暴露情况取决于应用。
fixed:
- product: Ash >=3.31.3 且 <3.38.0
  status: 修复调用方解码路径
timeline:
- date: 2026年11月24日
  title: Ash 公布安全公告并发布 3.38.0
  body: GHSA 发布于 02:29:39 UTC；Hex 记录 3.38.0 发布于 02:57:12 UTC。未签名游标改为 JSON；签名 term 必须先通过验证再解码。
checklist:
- title: 定位暴露的 keyset 分页路径
  hint: '检查 mix.lock 中是否存在 ash >=3.31.3 且 <3.38.0。追查配置 pagination keyset?: true、并把客户端值传给 page[:after] 或 page[:before] 的读取动作。检查 keyset_signing_secret 是否未设置，以及排序字段是否含 :ci_string、:map、:struct 或 :term。公告在 AshPostgres、ecto 3.14.3 和 db_connection 2.10.2 上演示；不能据此认定所有 Ash 读取都暴露。'
- title: 部署 Ash 3.38.0 并刷新受影响游标
  hint: 更新 ash 依赖约束和锁文件，重新构建并部署所有使用存在缺陷版本的应用实例。补丁把未签名 keyset 改为 JSON 并验证解码值；旧版本签发的未签名 keyset 将失效。测试新分页、过期游标处理及排序值序列化：无法往返转换的值可能不再生成 keyset。
- title: 仅在安装版本支持时启用签名
  hint: Ash 3.37.0 及以上版本可通过受保护的运行时配置，为 :ash, :keyset_signing_secret 设置长随机密钥。按部署方式重启或重新发布，确保所有实例使用该设置。此前签发的未签名游标会失效。更早的受影响版本应升级或停止接受客户端 keyset 游标；添加版本不支持的设置不构成缓解。
- title: 在恢复疑似受侵主机前检查错误和执行痕迹
  hint: 保存请求、应用、数据库和进程日志。调查异常的 Ecto.Query.DynamicExpr、DBConnection.Stream、Ash.CiString、Ash.Query.Function.Fragment 值，以及异常游标解码、类型转换错误、SQL 或子进程。PoC 可在返回无效筛选值错误前执行代码，因此错误响应不代表安全。单个字符串命中不是证据。若确认入侵，隔离服务、轮换可访问凭据、调查数据库操作，并使用可信输入重建。
sources:
- name: EEF CNA Ash 公告
  says: 受影响范围、利用前提、公开 PoC、签名缓解及评分向量。
- name: Ash 维护者公告
  says: 确认 3.38.0，以及独立的代码执行和 SQL 注入路径。
- name: Ash 解码器修复
  says: 未签名游标改为 JSON，拒绝旧未签名 keyset，签名 term 仍先验证。
- name: Hex Ash 发行元数据
  says: 3.38.0 发布于 2026 年 11 月 24 日。
---

Ash 于 2026 年 11 月 24 日披露此漏洞，影响 **3.31.3 至 3.38.0 之前版本**。公开 PoC 和潜在服务端执行能力支持 L3；公告没有给出 Ash 受害者数量，也未确认 Ash 应用遭到实际利用。

暴露前提包括：读取动作启用 keyset 分页、客户端可控制 `after` 或 `before` 游标、未设置 `keyset_signing_secret`，且排序字段类型为 `:ci_string`、`:map`、`:struct` 或 `:term`。公开演示使用 AshPostgres。`:integer` 等严格类型会拒绝伪造 struct。不能把这个需要特定配置的漏洞扩大为所有 Elixir 或 Phoenix 应用都存在风险。CNA 给出 **CVSS 4.0 8.9 分**，向量含 **AV:L/AT:P**；不可信远程客户端能否触达受影响读取动作，仍取决于应用。

旧解码器以 `:safe` 模式解析 Erlang term，虽然拒绝函数和新 atom，却允许映射冒充已存在的 struct。Ash 的表达式检查没有继续检查非表达式 struct 内部字段。排序类型接受该值后，错误格式化中的协议分派可触发 DBConnection stream 回调。代码执行示例使用 Ecto 3.14.3 和 db_connection 2.10.2。另一条路径把 `Ash.Query.Function.Fragment` 包装在 `Ash.CiString` 内，最终以应用数据库权限执行原始 SQL。仅修复下游回调不能消除 SQL 注入或不安全解码路径。

**3.38.0 把未签名游标改为 JSON**，并进行嵌入类型转换和往返检查。签名 Erlang term 仍受支持，但必须先通过签名验证。已有未签名游标需要刷新；无法完成转换的排序值可能不再生成 keyset。3.37.0 及以上版本可先配置强随机签名密钥作为官方缓解措施，这也会令旧未签名游标失效。

这是独立的应用库公告，与 [Hex 仓库入侵](/zh/incidents/hex-registry-intrusion/) 和 [Flop 游标漏洞](/zh/incidents/flop-cursor-struct-rce/) 分别记录。共享 struct 和回调技术，不代表 Hex 攻击者利用了 Ash 或 Flop 部署。
