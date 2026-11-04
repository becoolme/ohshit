---
title: APT 在 HTTP 重定向及重试后可能以 root 安装未经验证的软件包
summary: CVE-2026-109518 可让网络路径上的攻击者利用 HTTP 重定向、断点续传及硬链接复用，在 APT 验证后替换软件包；要求 Acquire::Retries 非零。Debian 已列出修复包，Ubuntu CVE 页面仍将各版本标为受影响。尚未确立实际利用。
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
- product: Ubuntu APT
  status: CVE 页仍将 14.04–26.10 列为受影响；CNA 给出修复阈值，但关联 USN 无法访问。须核实实际发布。
timeline:
- date: 2026年11月4日
  title: Debian 及 Canonical 公开 APT 漏洞及处置记录
  body: Debian 列出 bookworm、trixie 及 unstable 修复包。Canonical 说明 HTTP 重定向和重试前提；其 CVE 页及 CNA 版本记录对修复是否已发布存在差异。
checklist:
- title: 盘点 APT 并安装本发行版修复
  hint: 在主机、基础镜像及 CI runner 上检查 apt --version 和 apt-cache policy apt。Debian 13 需 3.0.4，Debian 12 需 2.6.2，unstable 列出 3.3.6。经可信管理网络及软件源更新 apt 和配套软件包。保留发行版后缀及回补补丁，不要给 Ubuntu 安装 Debian 软件包，也不要仅凭上游版本认定发行版构建已修复。
- title: 检查 HTTP 源、代理及重试配置
  hint: 检查 /etc/apt/sources.list、/etc/apt/sources.list.d/ 及 apt-config dump 中的 HTTP 软件源、代理和 Acquire::Retries。漏洞要求该值非零；Debian 12 和 Ubuntu 22.04 起默认是 3。管理员启用重试后，旧版默认配置不能证明安全。减少不可信网络路径暴露，在支持时使用经核实的 HTTPS 软件源或代理，不能关闭签名或 TLS 检查。这只是降低暴露，不是已证明可替代补丁的修复。
- title: 向厂商核实 Ubuntu 修复包实际可用情况
  hint: Canonical CNA 给出修复阈值，但 CVE 页仍标为受影响，USN-8996-1 返回 404。跟进 Ubuntu 官方 CVE 页、本版本安全公告及软件源候选包，必要时联系支持。不能将预留版本阈值视为更新已分发。
- title: 调查可疑软件包安装
  hint: 保留可疑重定向或重试附近的 APT、dpkg 历史、代理及软件源日志和软件包文件。受影响安装可用 root 执行软件包脚本，应经可信厂商记录核查来源并排查主机持久化。尚未核实专用攻击指标或受害者总数，异常重定向本身不能证明入侵。
sources:
- name: Debian 安全跟踪页
  says: 列出 bookworm 2.6.2、trixie 3.0.4 及 unstable 3.3.6 已修复；forky 3.3.5 受影响。
- name: Canonical CVE 页面
  says: 说明网络路径、重定向、重试及配置默认值；Ubuntu 各版本仍列为受影响。
- name: Canonical 原始 CNA 记录
  says: 详细受影响及修复版本阈值、CVSS 4.0；CISA 11 月 4 日评估记录尚无利用，引用的 Ubuntu USN 返回 404。
---

APT 可在重定向后将不同软件包下载合并到同一 URI。重试时复用硬链接，使网络路径上的攻击者可在验证完成后、安装前替换软件包。恶意镜像或代理属于已说明的威胁模型；这不代表软件包签名密钥或 Debian 仓库遭攻破。

攻击要求安装或下载发生重定向、重试，且重试设置非零。较新 Debian 及 Ubuntu 的默认值使其暴露，旧版在更改配置后也可能暴露。Canonical 评为高危；尚未确立实际利用或受害者人数。主流软件包管理器及潜在 root 执行风险支持 L3。

Debian 跟踪页给出上表三个发行版修复。Canonical CNA 另列较旧 Debian 及 Ubuntu 的版本阈值，但不能据此证明受支持发行版更新已可用。当前 Ubuntu 页仍列为受影响，关联 USN 返回 404。Debian 邮件列表原文出现访问挑战，本轮未绕过，也未将未读邮件正文作为证据。
