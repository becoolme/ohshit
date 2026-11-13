---
title: PostgreSQL 修复服务端、逻辑复制和备份工具的 52 个漏洞
tags: [PostgreSQL, 数据库, 安全更新]
summary: PostgreSQL 18.7、17.12、16.16、15.20 和 14.25 修复 52 个漏洞。其中部分漏洞可让数据库对象创建者、遭入侵的逻辑复制发布端或特制备份归档触发操作系统代码执行。14.25 是上游为 PostgreSQL 14 发布的最后一个版本。
splash: 较早的 PostgreSQL 14–18 服务端及客户端工具。具体风险取决于数据库权限、逻辑复制配置和还原的备份。
wipe: 更新服务端和客户端工具。使用增量备份时在更新后重新做一次全量备份，并规划迁离 PostgreSQL 14。
inTheWildNote: 已核阅的上游发布说明与公告未报告确认的在野利用。
fixed:
- {}
- {}
- {}
- {}
- { status: 上游最终版本 }
cves:
- name: 触发器游标释放后重用
  description: 能创建数据库对象的用户可借触发器过渡表上的游标，以数据库服务进程的操作系统账户执行代码。
- name: 逻辑复制授权缺陷
  description: 若订阅由数据库超级用户拥有，遭入侵的发布端可把订阅端的系统目录指定为复制目标，以订阅端服务进程的操作系统账户执行代码。
- name: 还原归档时执行代码
  description: 用存在漏洞的 pg_restore 处理特制的非纯文本归档，可导致代码以运行还原工具的操作系统账户执行。
- name: 通过 tar 归档中的还原脚本注入 psql 命令
  description: 遭入侵的源服务器可影响 tar 导出文件。用 psql 执行其中的 restore.sql 时，代码可在客户端以运行工具的操作系统账户执行。
- name: PostgreSQL 18 在认证前可被触发重启
  description: 网络客户端可控制取消请求的时机，使其与认证超时发生竞争，触发服务重启。此漏洞仅影响主版本 18。
timeline:
- date: 2026年11月12日
  title: PostgreSQL 发布修复，结束对 14 的上游维护
  body: 项目发布 14–18 稳定分支更新，并将适用的修复纳入 PostgreSQL 19 RC 2。
checklist:
- title: 更新运行中的服务端及每套受影响的客户端工具
  hint: 在每台主库和备库执行 SHOW server_version，并检查备份镜像和自动化环境中的 pg_dump、pg_restore 和 psql 版本。同一主版本内升级时，停止服务，安装相应分支的修复版本，重启并验证实际运行版本。使用托管数据库时，确认服务商的发布进度和各实例的版本。
- title: 核查 SQL 权限、逻辑复制和备份来源
  hint: 优先处理允许不可信角色创建对象的服务端，以及由超级用户拥有订阅的订阅端。核查订阅所有者及发布端的可信程度，限制数据库的网络访问，避免还原不可信归档。若怀疑已发生代码执行，按安全事件调查相关服务器或还原主机。
- title: 重建备份基线并执行版本说明中的维护步骤
  hint: 使用增量备份时，更新后先做一次全量备份，验证可以还原，并用它作为后续增量备份的基线。用 REINDEX INDEX 重建疑似损坏的 GIN 索引、使用 gist_trgm_ops 的 GiST 索引及基于未指定长度的 bpchar 的 B-tree 索引。若读表时出现 missing chunk number，执行 REINDEX TABLE。按发布公告的查询查找分区表上的 NOT NULL NO INHERIT 约束，删除不需要的约束；需要保留的改为 INHERIT，先检查各分区是否有 NULL 值。若跳过了某些更新，核对中间版本是否有额外步骤。
- title: 安排 PostgreSQL 14 的主版本升级
  hint: 给现有 14 实例安装 14.25，并规划迁往仍受支持的主版本。根据目标版本升级指南，使用验证过的备份测试升级及回滚。
sources:
- name: PostgreSQL 发布公告
  says: 列出全部 52 个漏洞、发布版本、14 的停止维护说明及更新后的维护步骤。
- name: PostgreSQL 18.7 版本说明
  says: 说明该分支的改动和额外维护步骤。
---
PostgreSQL 在 11 月 12 日的更新覆盖数据库权限边界、内存安全、逻辑复制和管理工具。项目公布了 [52 个 CVE 的完整列表](https://www.postgresql.org/about/news/postgresql-187-1712-1616-1520-1425-and-19-rc-2-released-3442/#security-issues)，各公告分别列出受影响版本。

服务端的利用前提各不相同。[CVE-2026-120143](https://www.postgresql.org/support/security/CVE-2026-120143/) 要求攻击者能创建数据库对象。[CVE-2026-120145](https://www.postgresql.org/support/security/CVE-2026-120145/) 要求发布端已遭入侵，且订阅由超级用户拥有。[CVE-2026-116322](https://www.postgresql.org/support/security/CVE-2026-116322/) 在登录前可触发，能让存在漏洞的 PostgreSQL 18 服务重启。

客户端工具也要在实际运行的机器上更新。[CVE-2026-116314](https://www.postgresql.org/support/security/CVE-2026-116314/) 影响使用 pg_restore 处理特制非纯文本归档的主机。[CVE-2026-116330](https://www.postgresql.org/support/security/CVE-2026-116330/) 影响用 psql 执行来自遭入侵服务器的 tar 导出归档内还原脚本的主机。同一主版本内可直接升级，无须运行 pg_upgrade 或导出再导入。仍须执行本次发布的备份及索引维护步骤。

受影响的 PostgreSQL 部署范围广，满足相应前提时可导致操作系统代码执行，因此评为 L3。已核阅的上游资料未披露遭入侵的部署，也未报告在野利用。
