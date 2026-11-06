---
title: Reth trie 错误可能遗漏新状态项，上游及 Base 已提供修复
summary: Reth 的 trie 迭代器可能跳过新插入的叶节点，算出错误的增量状态根。上游 2.10.0 和 Base 1.5.3 包含修复，Celo、Mantle 合并了限定分支的回移补丁。完整受影响范围及其他下游发布覆盖仍须核实；原始修复记录未确立在野利用或资金损失。
splash: 使用受影响 Reth trie 实现的节点及应用；具体暴露取决于实际分支及固定的源码版本。
wipe: 更新到包含 Reth 修复 8572c88 且兼容所运行链的版本，核验下游依赖并在重启后验证节点状态。
inTheWildNote: 已核阅的原始修复记录未确立在野利用或资金损失。
cves: []
fixed:
  - product: 上游 Reth
    status: 包含 trie 修复；须选择兼容所运行链的构建
  - product: Base Mainnet 及 Sepolia 节点发布版
    status: Base 建议升级，发布说明明确关联状态根修复
timeline:
  - date: 11月3日 21:00 UTC
    title: 上游合并迭代边界修复
    body: PR 28264 以 8572c88 合并，包含增量状态根回归测试。
  - date: 2026年11月5日
    title: Celo 和 Mantle 合并限定范围的回移补丁
    body: Celo 更新 celo/reth-v1.0 的依赖版本，Mantle 向生产 mantle-v1.6.2 线回移修复；其他分支须分别核验。
  - date: 2026年11月5日
    title: Reth 2.10.0 和 Base 1.5.3 包含修复
    body: 上游列出 trie seek 边界修正，Base 建议 Mainnet 和 Sepolia 更新，并明确关联同一修复。
checklist:
  - title: 确认客户端和实际 Reth 源码版本
    hint: 盘点运行中的二进制或容器、链、分支、镜像摘要及依赖锁文件。核验是否包含上游合并提交 8572c88fe04fb2213d86f020ed9e72e612abb097 或厂商等效回移补丁。其他分支的版本号不能直接作为安全下限，本文未确立完整受影响范围。
  - title: 安装对应的正式修复版本并重启节点
    hint: 根据实际客户端使用官方上游 Reth 2.10.0 或 Base 1.5.3。Base 发布说明涵盖 Mainnet 和 Sepolia，未设截止时间。替换二进制或镜像前核验官方产物及签名，重启后确认实际运行版本。Reth 公布的签名指纹为 50FB 7CC5 5B2E 8AFA 59FE 03B7 AA5E D56A 7FBF 253E。
  - title: 核验 Celo、Mantle 和 OP Stack 的回移覆盖
    hint: Celo PR 369 将 celo/reth-v1.0 的 reth 依赖移到 74cc8bbce7631c3586ab446460590fef6630d258，并称 main 须另行移植。Mantle PR 237 针对生产 mantle-v1.6.2，列出 dev/mantle-v1.6.3 和 dev/mantle-v1.7.0 须跟进。向各厂商取得包含其补丁的正式构建。已核阅的 op-reth 2.8.1 说明描述 eth_capabilities 修复，不能据此确认包含 trie 修复；应核验固定的源码，不要假定该版已解决此问题。
  - title: 依赖节点响应前核验完整性
    hint: 保留状态根不匹配日志、受影响区块号和构建标识。作为防御性验证，将同步情况及受影响状态根与独立可信、已修补的提供方对照；若持续不匹配，遵循该链官方恢复步骤调查。已核阅的修复记录没有统一的删库或重同步操作。协议和 RPC 运营者应先核验自己的提供方实际构建覆盖，再依赖其状态数据。
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
    says: 描述 eth_capabilities 修正；仅凭该说明不能核实独立的 trie 修复。
---

迭代器会组合已存储的 trie 分支和新哈希状态项。旧快捷路径在已存储分支深于 seek 前缀时可能跳过 seek，导致增量状态根遗漏新插入的叶节点。补丁将快捷路径限制为键完全相等时使用。上游回归测试和 Celo 回移说明描述了这一具体正确性错误。

Reth 2.10.0 列出 PR 28264，Base 1.5.3 明确称通过同一补丁防止状态根不匹配。Celo 和 Mantle 的回移限定于各自固定的依赖版本。合并补丁不能证明所有已部署节点或全部分支已经运行它。完整受影响版本及下游正式发布下限仍不齐全。

L3 反映广泛使用的执行客户端家族存在完整性错误，并已有运营者可采取的升级措施。这些原始记录未确立攻击者盗币、远程代码执行、全链失陷或用户资金损失。桥暂停及错误证明响应的说法仍须各自原始证据，本文未据此扩张已核实范围。
