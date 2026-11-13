---
title: 恶意 Rust 软件包和拉取请求瞄准钱包项目的构建凭据
summary: sapho11 账号将凭据窃取代码发布为 lwd-uri-util，并试图引入钱包项目。移除所有版本，检查开发机与 CI 是否执行过相关代码，轮换其可访问的凭据。
splash: 构建过该 crate、运行过相关 PR 代码，或安装过恶意 Git 依赖的开发机及 CI。
wipe: 移除依赖，隔离受影响设备，轮换可访问的密钥并核验发布制品。
inTheWildNote: 恶意制品及 PR 已公开；RustSec 未发现该 crate 被实际使用的证据。
cves:
- name: 恶意 lwd-uri-util crate
  description: 已发布的八个版本均利用 Cargo 构建脚本收集凭据。
fixed:
- product: lwd-uri-util
  status: 移除 0.1.0 至 0.1.7。该 crate 已从 crates.io 下架。
timeline:
- date: 2026年11月10日
  title: 恶意 PR 瞄准 Chainapsis 和 Zingo Labs 仓库
  body: OpenSourceMalware 记录了上传 CI 凭据、试图指示审查者忽略上传的文档、植入依赖及伪造的维护者登录页面。
- date: 2026年11月10日
  title: GitHub 发布恶意软件公告
  body: GHSA-8mh3-cf36-7xxq 列出八个受影响版本，无修补版本。OpenSourceMalware 当天稍后报告下架处置。
- date: 2026年11月11日
  title: RustSec 发布公告
  body: RUSTSEC-2026-0483 确认软件包已从 crates.io 下架，且未发现实际使用证据。
checklist:
- title: 停止构建并移除恶意输入
  hint: 暂停可疑 PR 的任务。检查 Cargo.toml、Cargo.lock 和依赖树中的 lwd-uri-util 0.1.0 至 0.1.7，并检查 JavaScript 锁文件中的 sapho11/zip321-uri。静态检查清单和差异，不要构建可疑代码。阻止镜像和缓存提供相关版本及 Git 源。
- title: 检查执行情况并保留证据
  hint: 在 CI 任务日志、终端遥测及代理记录中核查下列仓库、文件和目的地。安全保存有关制品，尤其是含有明文密钥的 lwd_uri_build_context.json。单独命中指标不能证明数据已外传。
- title: 遏制凭据暴露并核验发布完整性
  hint: 隔离受影响的开发机和运行器。从干净设备撤销在伪造页面输入的凭据并重置会话；如运行过不可信代码，更换其可访问的 GitHub、云端及软件包仓库令牌、SSH 密钥、钱包凭据及签名材料。恢复前检查审计日志、签名制品及包上传记录，并用验证过的依赖锁文件在干净运行器上重建。
sources:
- name: OpenSourceMalware 的 sapho11 原始调查
  says: 记录 PR、源码分析、配套 Git 依赖、钓鱼及下架处置。
- name: GitHub 恶意软件公告
  says: 列出受影响版本，收录 Amazon Inspector 对构建脚本的分析。
- name: RustSec RUSTSEC-2026-0483
  says: 确认已下架、无修补版本及未发现实际使用证据。
---

Cargo 在执行 `cargo build`、`cargo check`、`cargo test` 或 IDE 自动检查检出代码时，可运行该 crate 的 `build.rs`。脚本搜集环境密钥、凭据和签名材料。各变体发送数据的条件不同。OpenSourceMalware 还在 `sapho11/zip321-uri` 找到配套的 Node.js 窃取代码，将其作为 Git 依赖安装时可通过生命周期钩子触发。

这些 PR 无法证明钱包平台失陷，也不能证明凭据或资金被盗。Chainapsis 关闭了四个 PR。OpenSourceMalware 未能在后续的 `sapho11/zec-uri` 仓库下架前检查其代码，其行为尚未确认。

### 需要关联核查的指标

- GitHub 账号 `sapho11`（ID `354695800`）；仓库 `sapho11/lwd-uri-util`、`sapho11/zip321-uri` 和待核实的 `sapho11/zec-uri`。
- PR `chainapsis/vizor-wallet#1199` 至 `#1202`、`zingolabs/zingo-common#85` 和 `zingolabs/zingolib#3148`。Rust 脚本输出可能位于 `target/*/build/lwd-uri-util-*/out/lwd_uri_build_context.json`。
- `api.sdklfghaljksdhfkjasdfhlkasdhfjklasdf[.]xyz/v1/tipcheck` 和 `api.sdklfghaljksdhfkjasdfhlasdhfjklasdf[.]xyz/v1/tipcheck`；`session-check.sapho11.workers[.]dev` 的 `/v1/tipcheck`、`/auth`、`/auth/login`；`webhook[.]site` 的 `/0a60608b-63de-480c-a441-38a8d107a9ea` 和 `/14b3cc9b-3275-4b63-8b93-f4d2669fbdc1`。
