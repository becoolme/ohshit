---
title: PolinRider 经强推 PR 在 CircuitVerse CI 执行，40 个安装包产物已撤下
summary: 维护者披露 10 月 19 日曾向 AsyncAPI、CircuitVerse 及 Open Food Facts 的 PR 强推恶意提交。CircuitVerse 确认桌面 CI 执行了加载器，并删除 40 个产物。所审查 PR 未发现恶意合并；Open Food Facts 虽运行 CI，但是否执行加载器仍未确认。
splash: 运行恶意 PR 构建／配置或允许其 VS Code 打开文件夹任务的 CI 与开发设备；可疑 CircuitVerse 产物。
wipe: 停止使用受影响 PR 产物，调查暴露的运行器与设备，从干净设备轮换暴露凭据，并限制外部 PR 的 CI。
inTheWildNote: CircuitVerse 确认桌面 CI 执行加载器；下游安装包是否被用户执行未知。
timeline:
- date: 10月19日
  title: 恶意提交短暂强推至 fork PR
  body: AsyncAPI 两个窗口为 01:39–02:08 和 05:31–06:12 UTC，随后恢复干净提交，最终 diff 不再显示载荷。CircuitVerse 和 Open Food Facts 收到相关提交。
- date: 11月24日
  title: AsyncAPI 维护者公开静态分析及跨项目发现
  body: 公开分析 gist 的创建元数据为 11 月 24 日。此次披露针对 10 月 PR 活动，不是更早的 7 月 AsyncAPI npm 事件，也不是首次发现 PolinRider。
- date: 11月25日
  title: 维护者确认处置及产物删除
  body: CircuitVerse 确认执行加载器并删除 40 个构建产物，工作流加固 PR 仍未合并。Open Food Facts 轮换可能有关的密钥，但未确认失败的构建是否运行到加载器。
- date: 11月26日
  title: StepSecurity 公布更广泛的活动分析
  body: 报告相关加载器解码及五个历史服务端 IP，钱包数据截止 11 月 25 日 20:22 UTC。其更广泛的仓库数量在此未获独立证实。
- date: 11月26日 11:45 UTC
  title: CircuitVerse 合并桌面 CI 加固
  body: PR #1591 以 43cf6b4c6fc71146d7bef824f218230975da7ff9 合并。fork PR 仍执行构建，但不再上传其产物，工作流权限降为 contents:read；这不说明终端感染范围，也不代表旧产物已安全。
checklist:
- title: 停止信任受影响构建产物并保留证据
  hint: '查看 CircuitVerse issue #1586 中十个恶意 PR 及十个工作流运行 ID；维护者已删除全部 40 个产物。停止使用留存或再分发副本，保留哈希和下载记录，调查执行过这些产物的设备。报告没有确认哪些终端用户下载过，也没有逐个独立分析所有安装包二进制。'
- title: 检查每个历史 PR 提交及本地检出
  hint: 使用维护者完整提交及运行表，包括后来被强推移除的提交，不要只看合并代码或最终 diff。检查 package.json 中 node api.js && 前缀、api.js、jest.config.js、postcss.config.js、.vscode/tasks.json 和 settings.json、eslint-check／folderOpen 任务、public/fonts/fa-solid.lkf 或 .lfk（也检查 .orc／.llf 假字体）、public/fonts/README.md、branch_structure.json 及 temp_auto_push.bat。不要运行可疑代码进行测试；单个标记或未签名提交本身不能证明失陷。
- title: 使用完整网络与加载器指标排查
  hint: '已公布超过十个指标，应结合完整分析及 StepSecurity 表中的角色。服务端 IP：95.135.181.84、95.135.181.151、103.179.143.219、23.27.13.72、166.88.134.75；TCP443 上明文 HTTP 路径 /0x/cls 和 /0x/ls。钱包：0x1eef0849eda15d87f64e51c73c8442cf3c8bcef3。合法查询服务：1rpc.io/eth、eth.drpc.org、ethereum-rpc.publicnode.com、eth-mainnet.public.blastapi.io、eth.blockscout.com/api；ETH_RPC_URL 可覆盖 RPC。请求头：Sec-V: A8-&&、Sec-V: A8-8113、X-Payload-B64；Chrome131／Windows User-Agent。检查后台 node -e，以及 _V、_H、_H2、_t_s、_t_u、global.r／global.m 和 global[''!''] 的 8-&&／8-8113 变体标记。哈希及其他角色见下文。命中本身不能证明失陷；合法 RPC 服务不是攻击者基础设施。'
- title: 隔离已执行环境并替换暴露凭据
  hint: 确认执行后，隔离运行器或开发设备，保留进程命令行和日志，从干净设备吊销／替换暴露的 GitHub 令牌、OAuth 授权、SSH 密钥、npm 和云凭据。检查账户安全日志及其他可访问仓库是否被强推改写历史。删除可见钩子或一个进程不能排除后续后台阶段及编辑器持久化；确认感染的环境应重建后再信任。fork 令牌限制不能阻止代码执行。
- title: 限制不可信 CI 并阻止产物发布
  hint: '要求所有外部贡献者的 fork 工作流均经批准，而不只针对首次贡献者。不要在有特权的 pull_request_target 凭据环境中执行 PR 代码。仅从可信分支／release 发布安装包，降低令牌权限，强推后重新审查最新提交。CircuitVerse 已于 11 月 26 日合并 PR #1591：上传条件比较 head.repo.full_name 与 github.repository，并考虑 fork 已删除的情况，权限降为 contents:read。应核查实际工作流是否具备等效控制；fork 构建仍会执行，单靠上传限制不能阻止载荷执行。未审查工作区应保持 VS Code Restricted Mode。仅禁用 npm 生命周期脚本不能阻止 build／dev／Jest／PostCSS 或打开文件夹时执行。'
sources:
- name: AsyncAPI 维护者事件索引
  says: 原始概览、被移除 PR、审批保护及有边界的已合并 PR 扫描；公开 gist 创建于 11 月 24 日。
- name: 维护者静态载荷分析
  says: 静态解码、哈希、触发条件、以太坊查询及后台阶段；未连接服务端，也未确定下载阶段行为。
- name: CircuitVerse 维护者确认
  says: 维护者确认加载器已执行、未发生所涉恶意合并、已删除 40 个产物，且未报告仓库密钥暴露。
- name: CircuitVerse 已合并工作流加固
  says: 11 月 26 日 11:45:24 UTC 合并；限制 fork PR 产物上传并降低权限，但保留 fork 构建。
- name: Open Food Facts 事件及响应
  says: 四次失败的 CI 运行涉及恶意提交，是否到达加载器步骤未知。维护者称已轮换唯一可能有关的密钥。
- name: StepSecurity 原始 PolinRider 研究
  says: 11 月 26 日技术分析、历史 C2 及完整指标、与假面试钱包的关联，以及未经独立证实的更广泛仓库测量。
- name: CircuitVerse 加固合并提交
  says: 合并后的工作流将 contents 权限降为 read，并按 PR 源仓库限制产物上传；没有跳过 fork 构建作业。
---

11 月 24 日维护者披露的是 10 月 19 日 PR 活动。Eternity0207 账户本身也可能被盗；未签名提交及提交者名称变化不能证明实际控制人。这与 7 月 AsyncAPI npm 包失陷事件不同。恶意提交复用正常消息与日期，在数百个制表符后隐藏长 JavaScript 行。之后的干净最终 diff 不能抹去此前本地或 CI 执行的事实。

AsyncAPI 要求 fork 工作流经批准，因此未运行载荷作业。CircuitVerse 维护者确认，其受影响 fork PR 的桌面构建 CI 执行了加载器，全部 40 个产物已删除。11 月 26 日 11:45 UTC，PR #1591 以 `43cf6b4c6fc71146d7bef824f218230975da7ff9` 合并。其 `.github/workflows/tauri-build.yml` 将权限降为 `contents: read`，阻止 fork PR 上传产物，也处理 fork 删除后仓库对象为 null 的情况。fork PR 仍执行四个矩阵构建目标；该变更限制发布，并不消除不可信代码执行，也不证明有人执行过旧产物或留存副本已安全。维护者称主分支及审查过的分支、包括该账户此前合并的 PR 均干净。原始扫描检查了该账户 217 个 PR 中的 145 个已合并 PR，未发现载荷；这是有范围限制的扫描，不是对所有历史文件版本的保证。安装包产物在暴露的运行器上构建，未有独立核实的终端感染人数或逐个二进制载荷结论。

Open Food Facts 在四个恶意提交上运行了 CI，但四次均失败，报告不能确定 pnpm build 是否运行到 node api.js。其维护者轮换了一个通常不会被读取、但可能有关的密钥；预防性轮换不能证明密钥被盗。fork pull_request 作业的只读令牌及不提供仓库密钥限制了访问，但不能让任意构建代码变得安全。L4 基于 CircuitVerse CI 已确认的恶意执行，不代表整个软件仓库或 GitHub 平台已失陷。

静态解码显示，以太坊交易提供两个服务端地址。加载器通过 443 端口上的明文 HTTP 下载代码，并启动可在构建／测试结束后继续运行的分离 Node 进程。维护者静态分析没有确定后续阶段行为；更广泛 PolinRider 受害者报告的凭据窃取与编辑器持久化不能当成这三个项目各自已观察到的结果。StepSecurity 将查询钱包关联至 HuntRole／AccuraSoftHire；钱包关系不能证明某个个人或国家的归因。其 576 个仓库／311 个账户测量属于未独立核实的研究估计，不是经审计的受害者清单。

引用的完整记录列出全部恶意提交 SHA 及 CI 运行。关键 SHA-256 如下：

| 文件 | SHA-256 |
| --- | --- |
| api.js，AsyncAPI／CircuitVerse | `b02a81974810532fff8f76903e09b20431857bfaff00f2473421f4a4fb8162b5` |
| api.js，Open Food Facts 变体 | `41a69ba3946396d2d1c15f2e43be705f0793e8773dee0f3dda89a541d31c00d9` |
| CircuitVerse 假字体 | `3ae470cabb9412bf5f0e64e1f71b458e14eb10b19070845597d5b8230b27d552` |
| AsyncAPI 恶意 package.json | `8d463b9511a97b3f73f00acdc2b5ea7ffea64546c93c6898fb70e97f4737b391` |

原始解码器还记录 XOR 密钥 `q4FZkxX{!h,Sr3=@`、`y-p_>d$0B&@^1aQk` 及混淆标识 `y7`、`s8`、`rv$mIJCKYxZ`。应用于关联已保留文件，不要因此运行样本。只封锁一个 IP 不能限制可通过链上交易更换服务端的加载器。没有统一产品修复版本，处置取决于执行情况及工作流。
