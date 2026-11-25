---
title: Flop 四条版本线修复伪造分页游标导致的远程代码执行
tags:
- Elixir
- Flop
- Ecto
- 反序列化
- RCE
summary: Flop 可将客户端分页游标解码为伪造 struct，在 Ecto 格式化错误时执行回调。修复版本为 0.26.7、0.27.3、0.28.1 和 0.29.2。应升级相应版本线，或停用游标分页；公开 PoC 不代表 Flop 已遭实际攻击。
splash: 将客户端参数传入游标分页的 Flop 应用；已演示路径使用 Ecto、DBConnection 及 :naive_datetime 排序
wipe: 升级 Flop 至 0.26.7、0.27.3、0.28.1 或 0.29.2；暂时从 pagination_types 排除 :first 和 :last
inTheWildNote: CNA 提供 PoC，未确认 Flop 应用遭到攻击。
cves:
- name: 分页游标中的不安全 struct 解码
  description: after/before 游标内的伪造 DateTime，可在 Ecto 类型转换失败时触发 Inspect、Enumerable 分派并执行攻击者指定的回调。CNA 给出 CVSS 4.0 9.2 分，需要应用路径满足前提。
fixed:
- product: Flop >=0.8.0 且 <0.26.7
  status: 此范围应升级
- product: Flop 0.27.x
  status: 已修复
- product: Flop 0.28.x
  status: 已修复
- product: Flop 0.29.x
  status: 已修复
timeline:
- date: 2026年11月24日
  title: Flop 发布四个修复版本，CNA 披露漏洞
  body: Hex 记录 0.29.2、0.28.1、0.27.3 和 0.26.7 发布于 14:51:06 至 14:56:12 UTC 之间。补丁拒绝含 struct 的游标，并调整支持值的编码方式。
checklist:
- title: 定位客户端可控的游标分页
  hint: 检查 mix.lock 中的 flop：>=0.8.0 <0.26.7、>=0.27.0 <0.27.3、>=0.28.0 <0.28.1 或 >=0.29.0 <0.29.2。追查传给 Flop.validate_and_run/3 等函数的请求参数。默认允许游标分页；已演示链使用 :naive_datetime 排序，且加载了 Ecto 和 DBConnection。
- title: 升级相应 Flop 版本线并部署重建应用
  hint: 按版本线安装 0.26.7、0.27.3、0.28.1 或 0.29.2，更新依赖约束和锁文件，替换全部运行实例。含 struct 的旧游标会被拒绝。测试新旧游标处理、日期时间和小数排序，以及自定义排序类型：编码器现在使用普通值表示，schema 类型必须正确转换它们。
- title: 无法立即升级时停用游标分页
  hint: '设置 pagination_types，同时排除 :first 和 :last，例如 pagination_types: [:page, :offset]。覆盖每个暴露的 schema 或调用点覆盖设置，并测试伪造或旧 after/before 参数不会被解码。只移除界面的分页按钮不能保护服务端路由。'
- title: 调查错误处理期间的执行并保全证据
  hint: 检查请求、游标、应用、数据库和进程日志，关注异常 DateTime、NaiveDateTime 值、Ecto.Query.CastError、Inspect.Error、Ecto.Query.DynamicExpr，以及 DBConnection.Stream 的 :log 选项。回调执行后仍可抛出异常，错误响应不代表执行已被阻止。来源没有发布攻击活动 IP 或哈希清单；单个类型或错误命中不证明入侵。若确认受侵，隔离应用、轮换可访问凭据、检查持久化并使用可信输入重建。
sources:
- name: EEF CNA Flop 公告
  says: 四个受影响范围及修复版本、演示前提、公开 PoC 和 pagination_types 缓解。
- name: Flop 游标修复
  says: 解码时拒绝 struct，编码时将 struct 转为普通值表示。
- name: Hex Flop 发行元数据
  says: 确认四个修复版本均于 2026 年 11 月 24 日发布。
---

Flop 于 2026 年 11 月 24 日披露 **CVE-2026-130411**。CNA 提供公开 PoC，并给出 **CVSS 4.0 9.2 分**。由于应用库中存在已演示的执行路径，评为 L3；这些来源未确认 Flop 受害者数量或实际攻击活动。

暴露前提是应用接受客户端请求参数进行游标分页，而 Flop 默认允许该模式。已演示路径使用 `Flop.validate_and_run!`、按 Ecto `:naive_datetime` 字段排序的 schema，以及应用内的 Ecto 和 DBConnection。攻击者指定的模块和函数 atom 必须已存在于 VM。这不代表所有 Ecto 查询或 Elixir 安装都能被远程利用。

Erlang term 解码的 `:safe` 选项拒绝数种危险 term，却仍允许映射冒充 struct。year 字段嵌套 struct 的伪造 `DateTime` 可通过初始转换。后续 Ecto 转换失败，错误格式化检查该值，经 Ecto 和 DBConnection 的协议实现触发回调，可在请求返回错误前执行攻击者指定的函数。公开 PoC 打印标记；CNA 说明其更广泛的代码执行能力，权限为应用进程权限。

应按受影响范围安装 **0.26.7、0.27.3、0.28.1 或 0.29.2**。公告列出的最早受影响版本为 0.8.0。补丁拒绝含 struct 的游标，把支持的日期时间和小数值编码为字符串，其他 struct 转为映射。应检查自定义游标类型，以及客户端如何处理失效旧游标。无法立即更新时，从 `pagination_types` 同时排除 `:first` 和 `:last`，在服务端停用游标分页。

该漏洞与 [Ash 未签名 keyset 漏洞](/zh/incidents/ash-keyset-struct-injection/) 及 [Hex 仓库入侵](/zh/incidents/hex-registry-intrusion/) 分别记录。共享 DBConnection 回调路径，不证明 Hex 攻击者利用了 Flop。下游回调只是其中一层；应用仍须在解码边界拒绝不可信 struct。
