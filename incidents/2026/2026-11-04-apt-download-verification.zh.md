---
title: APT 在 HTTP 重定向及重试后可能以 root 安装未经验证的软件包
summary: CVE-2026-109518 可让网络路径上的攻击者利用 HTTP 重定向、下载重试及硬链接复用，在 APT 验证后替换软件包；要求 Acquire::Retries 非零。Debian 和 Ubuntu 现已列出修复包，Canonical 给出禁用重试的升级路径。尚未确立实际利用。
splash: APT 下载可被攻击者操纵的 HTTP 流量，发生重定向及重试，且 Acquire::Retries 非零。
wipe: 经可信路径安装本发行版已发布的 APT 修复包，核对安全公告及实际安装版本。
inTheWildNote: CISA 11 月 4 日评估记录尚无利用，本轮未核实实际受害者。
cves:
- name: APT 下载验证绕过
  description: HTTP 重定向及重试处理中复用硬链接，使验证后的软件包可被替换；Canonical 给出 CVSS 4.0 7.7 分。
fixed:
- product: Debian 13 trixie APT
  status: Debian 安全跟踪页列为已修复
- product: Debian 12 bookworm APT
  status: Debian 安全跟踪页列为已修复
- product: Debian unstable APT
  status: Debian 跟踪页列为已修复；forky 的 3.3.5 仍受影响
- product: Ubuntu 26.10 APT
  status: USN/CVE 页列为已修复，但博客仍称正在发布；核实软件源候选包。
- product: Ubuntu 26.04 LTS APT
  status: 标准安全支持
- product: Ubuntu 24.04 LTS APT
  status: 标准安全支持
- product: Ubuntu 22.04 LTS APT
  status: 标准安全支持
- product: Ubuntu 20.04 LTS APT
  status: Ubuntu Pro / ESM
- product: Ubuntu 18.04 LTS APT
  status: Ubuntu Pro / ESM
- product: Ubuntu 16.04 LTS APT
  status: Ubuntu Pro / ESM，另需 Legacy 扩展
- product: Ubuntu 14.04 LTS APT
  status: Ubuntu Pro / ESM，另需 Legacy 扩展
timeline:
- date: 2026年11月4日
  title: Debian 及 Canonical 公开 APT 漏洞及处置记录
  body: Debian 列出 bookworm、trixie 及 unstable 修复包。Canonical 说明 HTTP 重定向和重试前提；其 CVE 页及 CNA 版本记录对修复是否已发布存在差异。
- date: 2026年11月4日
  title: Canonical 发布 USN 并更新 Ubuntu 修复可用状态
  body: USN-8996-1 及 CVE 页现列出八个修复构建。博客给出 Acquire::Retries=0 升级命令，但 26.10 行仍称正在发布，须核实软件源候选包。
checklist:
- title: 盘点 APT 并安装本发行版修复
  hint: 在主机、基础镜像及 CI runner 上检查 apt --version 和 apt-cache policy apt。Debian 13 需 3.0.4，Debian 12 需 2.6.2，unstable 列出 3.3.6。经可信管理网络及软件源更新 apt 和配套软件包。保留发行版后缀及回补补丁，不要给 Ubuntu 安装 Debian 软件包，也不要仅凭上游版本认定发行版构建已修复。
- title: 检查 HTTP 源、代理及重试配置
  hint: 检查 /etc/apt/sources.list、/etc/apt/sources.list.d/ 及 apt-config dump 中的 HTTP 软件源、代理和 Acquire::Retries。漏洞要求该值非零；Debian 12 和 Ubuntu 22.04 起默认是 3。管理员启用重试后，旧版默认配置不能证明安全。减少不可信网络路径暴露，在支持时使用经核实的 HTTPS 软件源或代理，不能关闭签名或 TLS 检查。这只是降低暴露，不是已证明可替代补丁的修复。 Canonical 现明确确认将 Acquire::Retries 设为 0 可阻止该重试路径，包括恶意镜像攻击；可信 HTTPS 传输可防网络路径攻击。HTTPS 本身不能让恶意镜像变可信。
- title: 按 Canonical 禁用重试的路径升级 Ubuntu
  hint: Canonical 建议 sudo apt update && sudo apt upgrade -o Acquire::Retries=0。若只更新 APT 源包：sudo apt update && sudo apt install -o Acquire::Retries=0 --only-upgrade '?source-package(^apt$)'。用 apt list --installed '?source-package(^apt$)' 核查全部已安装 APT 源包，并与 USN-8996-1 的完整发行版版本比较。Ubuntu 20.04/18.04 需 Pro/ESM，16.04/14.04 另需 Legacy 扩展。26.10 须确认软件源实际提供 3.3.3ubuntu0.1：博客仍称正在发布，尽管 USN/CVE 页列为已修复。在支持时，先改用可信 HTTPS 镜像再打补丁，不能关闭验证。
- title: 调查可疑软件包安装
  hint: 保留可疑重定向或重试附近的 APT、dpkg 历史、代理及软件源日志和软件包文件。受影响安装可用 root 执行软件包脚本，应经可信厂商记录核查来源并排查主机持久化。尚未核实专用攻击指标或受害者总数，异常重定向本身不能证明入侵。
sources:
- name: Debian 安全跟踪页
  says: 列出 bookworm 2.6.2、trixie 3.0.4 及 unstable 3.3.6 已修复；forky 3.3.5 受影响。
- name: Canonical CVE 页面
  says: CVE 页现列出 Ubuntu 14.04–26.10 修复构建及 Pro/Legacy 要求，取代此前受影响状态。
- name: Canonical 原始 CNA 记录
  says: 受影响及修复阈值、CVSS 4.0；CISA 11 月 4 日评估记录尚无利用。此前无法访问的 USN 现已可读。
- name: Canonical USN-8996-1
  says: 11 月 4 日通知列出八个 Ubuntu 修复包及 ESM/Legacy 要求。
- name: Canonical APT 处置说明
  says: 禁用重试的升级命令、HTTPS 缓解及已安装源包检查；26.10 行仍称正在发布。
---

APT 在下载重定向及重试时复用硬链接，使网络路径上的攻击者可导致安装其控制的未经验证的软件包。恶意镜像或代理属于已说明的威胁模型；这不代表软件包签名密钥或 Debian 仓库遭攻破。

攻击要求安装或下载发生重定向、重试，且重试设置非零。较新 Debian 及 Ubuntu 的默认值使其暴露，旧版在更改配置后也可能暴露。Canonical 评为高危；尚未确立实际利用或受害者人数。

Debian 跟踪页给出上表三个发行版修复。较早核查时，Ubuntu 仍将各版本标为受影响，USN-8996-1 返回 404。**11 月 4 日可用性更新：** USN 现已可读，CVE 页列出上表八个 Ubuntu 修复。博客仍将 26.10 标为正在发布，应核实实际软件源候选包，不能假定分发已完成。旧版需要相应 Pro/ESM 及 Legacy 覆盖。

Canonical 建议在升级操作中禁用重试，也可防恶意镜像利用。连接可信镜像的 HTTPS 可防网络路径操纵，仍须安装补丁。Snap 安装使用另一套系统，不属于本 APT 漏洞。Debian 邮件列表访问挑战仍未解决，未使用未读邮件内容作为证据。
