---
title: "PingCAP 确认 TiDB Cloud 遭入侵：一个被盗的服务账号在内网逛了一个月"
headline: "TiDB Cloud：服务账号被盗，对方在里面待了一个月"
tags: [云数据库, 凭据, 勒索]
summary: >-
  9月9日至10月7日，入侵者用窃取的服务账号凭据拷走了账号元数据、账单信息、SQL 编辑器里的文本、加密后的 API 密钥值以及源代码。勒索团伙 FulcrumSec 声称拿到了 10.6 TB 数据，PingCAP 尚未证实。
splash: "TiDB Cloud 客户的账号、账单和 SQL 编辑器数据；没有证据表明客户数据库被读取"
wipe: "轮换 TiDB Cloud API 密钥、数据库密码及提供给支持团队的密钥；清理 SQL 历史并排查日志"
inTheWildNote: 这是一次入侵，不是漏洞；10月14日前已封堵所有访问路径
timeline:
  - date: 2026年9月9日
    title: 未授权访问开始
    body: 入侵者用窃取的服务账号凭据登录。
  - date: 2026年10月7日
    title: 入侵被发现，PingCAP 开始禁用失陷账号
    body: 到 10月10日，又删除了一批凭据。
  - date: 2026年10月12–13日
    title: 一家外部公司报告了四个漏洞
  - date: 2026年10月14日
    title: 四个漏洞全部修复并复测通过，已知访问路径全部封堵
  - date: 2026年10月19日
    title: PingCAP 发布安全更新
    body: >-
      FulcrumSec 声称拿到 10.6 TB、490 万个文件，潜伏了约两个月，还每六小时同步一次数据。这些说法都未经证实。
  - date: 2026年10月20日
    title: PingCAP 发布客户密钥轮换指引
  - date: 2026年10月21日
    title: NebuSec 发布调查报告
    body: 支持工单中的凭据被用于访问诊断 S3 数据；API 密钥表的加密密钥未泄露。
  - date: 2026年10月23日
    title: CEO 确认需轮换提供给支持团队的密钥
    body: 客户应在收到个别影响通知之前采取行动。
checklist:
  - title: 轮换 TiDB Cloud API 密钥
    hint: 组织所有者应在 Organization Settings > API Keys 创建替代管理密钥，更新并测试依赖应用，再撤销旧密钥。怀疑遭滥用时应立即撤销，并联系 security@pingcap.com。导出值经过加密且加密密钥未泄露，厂商仍建议轮换
  - title: 轮换数据库用户和密码
    hint: 尤其是在 SQL 编辑器里出现过的
  - title: 清理 SQL 编辑器历史里的密钥
    hint: 查询语句和报错文本都被拷走了
  - title: 排查组织和项目的访问日志
    hint: 检查9月9日至10月7日的云身份和访问日志：146.70.173[.]219、23.234.82[.]156、23.234.83[.]80、23.234.80[.]121、138.199.43[.]96、23.234.81[.]225。关联 Python-urllib/3.12、compute.instances.aggregatedList、google.cloud.bigquery.v2.JobService.InsertJob EXTRACT 作业、.json.gz 暂存文件、rclone 及 storage.objects.get 的 200/206 响应。这些操作也有合法用途，仅命中指标不能证明入侵。各 IP 对应的日期及活动见 NebuSec 完整表格
  - title: 轮换曾提供给支持团队的凭据
    hint: 清点支持工单、附件、诊断日志和连接字符串，轮换其中的 AWS 密钥、令牌、数据库密码及其他密钥。不要等待个别通知，也不要再次向支持团队发送密钥
  - title: 提防定向钓鱼
    hint: 联系人姓名、邮箱和合同细节都被拿走了
sources:
  - name: PingCAP 安全更新
    says: 确认了时间线、数据类别和已修复的四个漏洞。没有证据表明客户数据库里的数据被访问
  - says: 报道了 FulcrumSec 声称的 10.6 TB 数据和 200 GB 样本（未经核实）
  - says: 加密货币交易所的视角：Bitget 表示自己只存了公开的交易日志
  - name: NebuSec 独立调查
  - name: PingCAP CEO 后续说明
  - name: PingCAP 客户处置指引
---
PingCAP 是分布式数据库 TiDB 背后的公司。它表示，入侵者用**窃取的服务账号凭据**从 9月9日起在其内部系统里来去自如，直到 10月7日才被发现。

据 PingCAP 说，入侵者拷走了：

- 账号和项目元数据（姓名、邮箱、组织、项目和集群 ID）
- **SQL 编辑器里的文本和报错信息**
- 账单和业务信息：联系人、合同条款、订单、价格
- 一张存有**加密 TiDB Cloud API 密钥值**的表。NebuSec 后续确认加密密钥未泄露；这项保护不涵盖支持材料中的明文凭据
- PingCAP 源代码
- 后续独立报告还列出 **AI 交互、网关连接日志、支持工单及附件**、诊断数据、内部告警聊天记录及成员列表，以及基础设施和编排系统备份；各客户涉及的类别不同

PingCAP 表示，**没有证据表明客户 TiDB 数据库里的数据被访问**；在排查过的生产系统上，也没有发现命令执行或持久化的痕迹。

勒索团伙 FulcrumSec 的说法要夸张得多：10.6 TB、490 万个文件，还放出了 200 GB 样本。这些数字都未经证实。早期还有帖子称受影响的组织超过 18 万家，我们在任何可信来源里都没找到这个数字，所以没有采用。

**11月1日复查（UTC）：** NebuSec 10月21日报告将初始入口追溯到失陷的 GitHub 账号，之后利用仓库和 Terraform 中暴露的凭据。支持工单中的凭据还被用于访问诊断 S3 数据。CEO 10月23日说明要求客户轮换提供给支持团队的密钥，而不仅是管理 API 密钥；各客户的影响评估仍待完成。独立调查没有发现生产环境持久化访问或客户 TiDB 数据库遭访问的证据，但这不否定内部及支持系统的数据窃取。

调查时，NebuSec 列出六个源 IP：`146.70.173[.]219`、`23.234.82[.]156`、`23.234.83[.]80`、`23.234.80[.]121`、`138.199.43[.]96`、`23.234.81[.]225`。将9月9日至10月7日的身份和访问记录与 `Python-urllib/3.12`、`compute.instances.aggregatedList`、BigQuery `google.cloud.bigquery.v2.JobService.InsertJob` EXTRACT 作业、`.json.gz` 暂存文件、`rclone` 和 `storage.objects.get` 的 200/206 响应关联。这些工具及操作也有合法用途，仅命中指标不能证明入侵。报告未公开内部资源标识符及密钥。
