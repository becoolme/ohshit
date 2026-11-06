---
title: Reth trie 错误可能遗漏新状态项，上游及多个下游已提供修复
summary: Reth 的 trie 迭代器可能算出错误的增量状态根。上游 2.10.0、Base 1.5.3、op-reth 2.8.1、Morph 1.4.1 及 BNB reth-bsc 0.1.4-hotfix 包含修复。Celo、Mantle 和 Gravity 已合并限定范围的源码补丁，其他发布覆盖及完整范围仍须核实。尚未确立在野利用或资金损失。
splash: 使用受影响 Reth trie 实现的节点及应用；具体暴露取决于实际分支及固定的源码版本。
wipe: 更新到包含 Reth 修复 8572c88 且兼容所运行链的版本，核验下游依赖并在重启后验证节点状态。
inTheWildNote: 已核阅的原始修复记录未确立在野利用或资金损失。
cves: []
fixed:
- product: 上游 Reth
  status: 包含 trie 修复；须选择兼容所运行链的构建
- product: OP Stack op-reth
  status: 标签锁文件包含 op-v2.6.0-2 回移补丁；发布说明仅提及另一 RPC 修复
- product: Base Mainnet 及 Sepolia 节点发布版
  status: Base 建议升级，发布说明明确关联状态根修复
- product: Morph morph-reth
  status: 已发布热修复，固定包含上游等效补丁的 morph-l2/reth v2.5.2-morph.1
- product: BNB reth-bsc
  status: 已发布热修复，固定 bnb-chain/reth v0.1.4；升级后重启，本项修复不需数据库迁移或硬分叉
timeline:
- date: 11月3日 21:00 UTC
  title: 上游合并迭代边界修复
  body: PR 28264 以 8572c88 合并，包含增量状态根回归测试。
- date: 2026年11月5日
  title: Celo 和 Mantle 合并限定范围的回移补丁
  body: Celo 更新 celo/reth-v1.0 的依赖版本，Mantle 向生产 mantle-v1.6.2 线回移修复；其他分支须分别核验。
- date: 2026年11月5日
  title: Reth 2.10.0、op-reth 2.8.1 和 Base 1.5.3 包含修复
  body: 上游列出 trie 修正；op-reth 发布标签固定了回移补丁，尽管说明仅提 RPC。Base 建议 Mainnet 和 Sepolia 更新，并关联同一修复。
- date: 11月6日 02:19 UTC
  title: BNB Reth 合并主线回移补丁
  body: PR 254 以 3b2bd020 合并，回移同一上游迭代修复及回归测试。
- date: 11月6日 02:20 UTC
  title: BNB 发布修复后的 Reth 依赖标签
  body: bnb-chain/reth v0.1.4 包含 PR 254，该依赖标签标为预发布。
- date: 11月6日 02:40 UTC
  title: BNB Reth 单独合并 v2.8 集成回移
  body: PR 255 以 141cc278 合入 fix/bsc-static-file-td-611；确认分支补丁，不代表已发布安全版本下限。
- date: 11月6日 02:53 UTC
  title: BNB 发布 reth-bsc 0.1.4-hotfix
  body: 已发布的节点热修复固定 reth v0.1.4，建议所有 reth-bsc 主网及测试网节点尽快更新。安装并重启，本项修复不需数据库迁移或硬分叉。
- date: 2026年11月6日
  title: Morph 发布 morph-reth 1.4.1
  body: 热修复固定已修补的分支，并增加回归测试。包括 follower 在内的全部 Morph 节点应升级，无须数据库迁移或重同步。
- date: 2026年11月6日
  title: Gravity 合并源码回移补丁
  body: PR 464 以 c407bd9 合入 main。这是已核实的源码修复，不代表已发布安全版本下限。
checklist:
- title: 确认客户端和实际 Reth 源码版本
  hint: 盘点运行中的二进制或容器、链、分支、镜像摘要及依赖锁文件。核验是否包含上游合并提交 8572c88fe04fb2213d86f020ed9e72e612abb097 或厂商等效回移补丁。其他分支的版本号不能直接作为安全下限，本文未确立完整受影响范围。
- title: 安装对应的正式修复版本并重启节点
  hint: 根据实际客户端使用官方上游 Reth 2.10.0 或 Base 1.5.3。上游将构建者和非构建者的升级优先级均列为高；Base 涵盖 Mainnet 和 Sepolia，未设截止时间。OP Stack 运营者可使用 op-reth 2.8.1，其标签锁文件包含回移补丁。替换二进制或镜像前核验官方产物及签名，重启后确认实际运行版本。Reth 公布的签名指纹为 50FB 7CC5 5B2E 8AFA 59FE 03B7 AA5E D56A 7FBF 253E。
- title: 核验 Celo、Mantle 和 OP Stack 的回移覆盖
  hint: Celo PR 369 将 celo/reth-v1.0 的 reth 依赖移到 74cc8bbce7631c3586ab446460590fef6630d258，并称 main 须另行移植。Mantle PR 237 针对生产 mantle-v1.6.2，列出 dev/mantle-v1.6.3 和 dev/mantle-v1.7.0 须跟进。向各厂商取得包含其补丁的正式构建。op-reth 2.8.1 的 rust/Cargo.lock 将 reth-trie 固定为 op-v2.6.0-2 / 3c5f2f11c4e5a5647e6e911cd131ccf1bada4f25，即上游等效回移补丁。PR 23924 及发布标签确认包含修复，尽管说明仅提 eth_capabilities；应核验实际运行产物，不能只看发布说明措辞。
- title: 依赖节点响应前核验完整性
  hint: 保留状态根不匹配日志、受影响区块号和构建标识。作为防御性验证，将同步情况及受影响状态根与独立可信、已修补的提供方对照；若持续不匹配，遵循该链官方恢复步骤调查。已核阅的修复记录没有统一的删库或重同步操作。协议和 RPC 运营者应先核验自己的提供方实际构建覆盖，再依赖其状态数据。
- title: 安装 BNB reth-bsc 热修复，并区分其他补丁分支
  hint: BSC 主网或测试网的 reth-bsc 应安装官方 v0.1.4-hotfix 并重启；厂商列明验证节点、MEV 构建者、全节点及哨兵节点。本项修复不需数据库迁移或硬分叉。确认运行构建使用 bnb-chain/reth v0.1.4（PR 254／3b2bd02006ef8970c862d2af5dbc98a92f58d57d）；该依赖标签本身是预发布，与已发布的 reth-bsc 热修复不同。另一个 v2.8 集成补丁 PR 255／141cc278068cb60d1045957709ad88d7bfdbed1f 仍限定分支，不要将 0.1.4-hotfix 当作所有 BNB Reth 分支的通用安全下限。从旧节点升级时须核对继承的发布要求；无需硬分叉的说明仅针对本项修复，不代表其他协议升级没有要求。
- title: 向全部 Morph 节点部署 1.4.1 热修复
  hint: 使用官方 v1.4.1 二进制或 ghcr.io/morph-l2/morph-reth:v1.4.1，包括 follower。发布版保留数据库格式、参数、RPC 及链配置；滚动重启，无须迁移或重同步，回滚即换回原二进制。源码构建须允许或镜像 morph-l2/reth 的 v2.5.2-morph.1 标签，替代上游来源。PR 建议部署前测试启用 --engine.state-root-fallback 的 Hoodi follower 及 layer1-mode 验证者。不要求配套的 morph-geth 发布版。
- title: 区分 Gravity 源码修复与正式发布
  hint: Gravity PR 464 以 c407bd9 合入 main，回移上游 8572c88 及回归测试。核验实际部署版本并向 Gravity 取得受支持产物；不能仅凭源码合并推定已打包的修复版本或全体节点完成部署。
sources:
- name: Reth 原始修复 PR
  says: 11 月 3 日公开迭代边界修正及回归测试，以 8572c88 合并。
- name: Reth 修复 PR API
  says: 记录公开创建时间及 11 月 3 日 21:00:09 UTC 合并时间。
- name: Reth 2.10.0 发布记录
  says: 11 月 5 日发布，列出 trie seek 边界修复及产物签名信息。
- name: Base 1.5.3 发布记录
  says: 明确关联 Reth PR28264，建议 Mainnet 和 Sepolia 更新，未设截止时间。
- name: Celo 原始回移 PR API
  says: 说明遗漏叶节点机制、分支固定版本、回归验证及 main 分支的单独跟进；HTML 读取仅返回空壳。
- name: Mantle 原始回移 PR
  says: 记录受影响的固定依赖及生产线回移；开发分支须分别处理。
- name: OP Stack op-reth 2.8.1 发布说明
  says: 描述 eth_capabilities 修正；标签锁文件及原始回移记录独立确认包含 trie 修复。
- name: OP Stack 依赖回移 PR API
  says: 11 月 5 日以 7220729 合并，即 op-reth2.8.1 发布提交，固定分支标签 op-v2.6.0-2。
- name: OP Reth 原始 trie 回移 API
  says: 将上游 8572c88 回移为 3c5f2f11，仅调整测试导入。
- name: op-reth 2.8.1 标签依赖锁文件
  says: 正式标签将 reth-trie 固定为 op-v2.6.0-2 及提交 3c5f2f11c4e5a5647e6e911cd131ccf1bada4f25。
- name: BNB Reth 主线回移 PR API
  says: 11 月 6 日 02:19:15 UTC 以 3b2bd020 合入 main，包含同一上游修正及回归测试。
- name: BNB Reth v2.8 集成回移 API
  says: 11 月 6 日 02:40:58 UTC 以 141cc278 合入 fix/bsc-static-file-td-611，属于单独分支集成，并非打包发布。
- name: Morph morph-reth 1.4.1 发布记录
  says: 已发布的 trie 热修复、修正分支依赖、全部节点升级、产物及滚动重启指引。
- name: Morph 原始热修复 PR 228
  says: 说明精确分支依赖、串行路径暴露、回归测试及部署前验证。
- name: Gravity 原始回移 PR 464
  says: 11 月 6 日将上游等效修正以 c407bd9 合入 main；未确立正式安全版本。
- name: BNB Reth 依赖 v0.1.4 发布说明
  says: 预发布依赖标签包含 PR 254／3b2bd02；GitHub 的 UTC 时间戳给出 11 月 6 日 02:20:56 UTC。
- name: BNB reth-bsc 0.1.4-hotfix 发布说明
  says: 已发布节点热修复固定 reth v0.1.4，所有主网及测试网 reth-bsc 节点应更新并重启；本项修复不需数据库迁移或硬分叉。GitHub 的 UTC 时间戳给出 11 月 6 日 02:53:35 UTC。
---

迭代器会组合已存储的 trie 分支和新哈希状态项。旧快捷路径在已存储分支深于 seek 前缀时可能跳过 seek，导致增量状态根遗漏新插入的叶节点。补丁将快捷路径限制为键完全相等时使用。上游回归测试和 Celo 回移说明描述了这一具体正确性错误。

Reth 2.10.0 列出 PR 28264，Base 1.5.3 明确称通过同一补丁防止状态根不匹配。Celo 和 Mantle 的回移限定于各自固定的依赖版本。合并补丁不能证明所有已部署节点或全部分支已经运行它。op-reth 2.8.1 标签也包含回移补丁：发布提交合并 PR 23924，rust/Cargo.lock 固定了修正后的分支版本。发布说明仅提另一项 RPC 修正，仅看说明会遗漏此修复。完整受影响版本及其他下游正式发布下限仍不齐全。

L3 反映广泛使用的执行客户端家族存在完整性错误，并已有运营者可采取的升级措施。这些原始记录未确立攻击者盗币、远程代码执行、全链失陷或用户资金损失。桥暂停及错误证明响应的说法仍须各自原始证据，本文未据此扩张已核实范围。

**11 月 6 日 BNB 回移：** BNB Reth 分别在 main 和 v2.8 集成分支合并了上游等效修正。应核验已部署产物的实际分支及提交；源码合并不代表已发布正式构建或全体节点完成部署。这些技术记录未确立全链事件、确认用户损失或 BNB Chain 的整体暴露程度。

**11 月 6 日 Morph 与 Gravity 跟进：** Morph 已发布的 morph-reth 1.4.1 热修复，通过 morph-l2/reth v2.5.2-morph.1 使用上游 Reth 2.5.2 加 trie 补丁，避免立即进行完整上游升级。发布说明要求包括 follower 在内的全部节点升级，无须数据库迁移或重同步。Gravity 则在 main 单独合并等效修正，尚未确立 Gravity 修复发布版本号。这些记录扩充补丁覆盖，不是盗币或全链失陷证据。

**BNB 已发布热修复：** 节点版本 `reth-bsc v0.1.4-hotfix` 已提供可部署修复，不再只有此前的源码合并。其依赖标签 `bnb-chain/reth v0.1.4` 标为预发布，两者属于不同仓库及版本语境。按实际 reth-bsc 部署遵循热修复说明。这不能证明全部 BNB 客户端使用受影响代码，也不能证明另一 v2.8 分支已有发布修复或已发生利用。
