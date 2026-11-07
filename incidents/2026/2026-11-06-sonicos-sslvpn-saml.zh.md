---
title: SonicOS 七漏洞批次修复已遭利用的 SSLVPN SAML／MFA 绕过
summary: SonicWall 修复七个 SonicOS 漏洞；CISA 确认 CVE-2026-19868 已遭利用。SSLVPN 启用 SAML 登录时，其他认证方式的有效凭据可绕过 SAML 及其 MFA。Gen7／Gen8 修复版本分别为 7.3.4-7013／8.2.3-8015；其他漏洞的前提和影响各不相同。
splash: Gen7 SonicOS ≤7.3.3-7015 或 Gen8 ≤8.2.2-8015；已利用绕过须 SSLVPN 启用 SAML 且有其他方式的有效凭据。
wipe: Gen7 升至 7.3.4-7013+、Gen8 升至 8.2.3-8015+，再审查 VPN 认证及可疑会话。
inTheWildNote: CISA 将 CVE-2026-19868 列入 KEV。其余六项尚未确认遭利用。
cves:
- name: SSLVPN SAML 认证约束绕过
  description: SSLVPN 登录启用 SAML 时，其他认证方式的有效凭据可绕过 SAML 控制及其强制执行的 MFA。
- name: 管理接口跨域策略过宽
  description: 特定条件下，未认证远程攻击者可执行未授权管理操作；评分包含用户交互前提。
- name: 管理会话校验
  description: 特定条件下，未认证远程攻击者可执行未授权管理操作；评分包含用户交互前提。
- name: SSL-VPN 认证前堆溢出
  description: 未认证远程攻击者可能导致 SSL-VPN 应用级拒绝服务；公告没有认定可执行代码。
- name: TACACS+ 认证前栈溢出
  description: 特定条件下，未认证远程攻击者可能导致 TACACS+ 认证客户端应用级拒绝服务。
- name: TACACS+ 认证前堆溢出
  description: 特定条件下，未认证远程攻击者可能导致 TACACS+ 认证客户端应用级拒绝服务。
- name: 平台密码哈希较弱
  description: 已具备虚拟设备高权限本地访问的攻击者可能取得平台凭据，该凭据仅可访问部分平台设置。
fixed:
- product: SonicOS Gen7 硬件及 NSv
  status: 厂商修复构建
- product: SonicOS Gen8 硬件及 NSv
  status: 厂商修复构建
timeline:
- date: 11月6日 18:40–19:06 UTC
  title: SonicWall 披露七项 CVE
  body: 厂商 CNA 记录标明同一公告批次。各项公开披露时间介于 18:40 至 19:06 UTC。
- date: 2026年11月6日
  title: CISA 将 SSLVPN 绕过纳入 KEV
  body: 目录列出的美国联邦机构处置期限为 11 月 20 日。勒索活动利用情况未知。
checklist:
- title: 安装适用于设备的固件
  hint: 在管理界面核对硬件或 NSv 代际及当前构建号。厂商列出 Gen7 修复下限 7.3.4-7013，以及较新的 7.3.4-7015。Gen8 使用 8.2.3-8015 或更新的受支持构建。升级前备份配置并核对型号对应的升级路径，升级后测试 VPN 连通性。运行 7.0.1 的 Gen7 NSv 升至 7.1.x 或更高版本时须重新安装。
- title: 检查 SSLVPN 认证及会话
  hint: 检查 SSLVPN 登录是否启用了 SAML，以及仍可用的其他认证方式和身份。保留 VPN 认证、身份提供商及防火墙日志，将成功连接与预期 SAML 和 MFA 事件关联。排查异常用户、源地址及时间，再从干净的管理系统吊销受影响会话并轮换暴露凭据。仅缺少 SAML 事件不足以确认攻击。
- title: 核查管理接口、TACACS+ 和虚拟设备暴露
  hint: 安排升级期间，限制管理接口及不必要的 VPN 可达性。分别检查 TACACS+ 依赖和 NSv 高权限访问。Gen6 及更早的已停止支持设备应通过 SonicWall 规划迁移。Gen7 和 Gen8 固件不适用于这些设备。
sources:
- name: SonicWall 支持公告
  says: 11 月 3 日预告，11 月 6 日更新。表格列出 Gen7 与 Gen8 硬件及虚拟防火墙的准确受影响和修复构建。
- name: SonicOS Gen7 7.3.4-7015 发布说明
  says: 记录较新的 Gen7 构建和 NSv 从 7.0.1 升级的限制。
- name: SonicOS Gen8 8.2.3-8015 发布说明
  says: 列出硬件及 NSv 固件，确认修复 SSLVPN 备用认证方式绕过。
- name: CVE-2026-19868 的 SonicWall CNA 记录
  says: SonicWall 将该漏洞归入 SNWLID-2026-0014。所列分数为 CISA ADP 的 CVSS 3.1 评分。
- name: CVE-2026-107155 的 SonicWall CNA 记录
  says: SonicWall 将该漏洞归入 SNWLID-2026-0014。所列分数为 CISA ADP 的 CVSS 3.1 评分。
- name: CVE-2026-107154 的 SonicWall CNA 记录
  says: SonicWall 将该漏洞归入 SNWLID-2026-0014。所列分数为 CISA ADP 的 CVSS 3.1 评分。
- name: CVE-2026-82308 的 SonicWall CNA 记录
  says: SonicWall 将该漏洞归入 SNWLID-2026-0014。所列分数为 CISA ADP 的 CVSS 3.1 评分。
- name: CVE-2026-77708 的 SonicWall CNA 记录
  says: SonicWall 将该漏洞归入 SNWLID-2026-0014。所列分数为 CISA ADP 的 CVSS 3.1 评分。
- name: CVE-2026-77709 的 SonicWall CNA 记录
  says: SonicWall 将该漏洞归入 SNWLID-2026-0014。所列分数为 CISA ADP 的 CVSS 3.1 评分。
- name: CVE-2026-19703 的 SonicWall CNA 记录
  says: SonicWall 将该漏洞归入 SNWLID-2026-0014。所列分数为 CISA ADP 的 CVSS 3.1 评分。
- name: CISA 已知遭利用漏洞目录
  says: 确认 CVE-2026-19868 已遭利用，并列出 11 月 20 日联邦处置期限。
---

已遭利用的路径要求 SSLVPN 启用 SAML 登录，且攻击者持有另一种认证方式的有效凭据。利用者可跳过预期的 SAML 控制，包括由 SAML 强制实施的 MFA。CISA 确认 CVE-2026-19868 已遭利用。已核阅记录未公布受害人数或该事件的专用指标。

其他 CVE 涵盖两项管理接口缺陷、一项 SSL-VPN 拒绝服务、两项有条件的 TACACS+ 拒绝服务，以及虚拟设备的弱密码哈希问题。两项管理接口漏洞的评分含用户交互。虚拟设备问题需要本地访问，CISA 评估还列出高权限前提。溢出问题的披露描述了拒绝服务。

SonicWall 于 11 月 3 日预告该批次，并于 11 月 6 日公布各项 CVE 细节。核查时，关联的 PSIRT 详情页无可读正文。固件版本依据厂商支持公告及发布说明，各项漏洞描述依据 SonicWall 的 CNA 记录。所列 CVSS 3.1 分数由 CISA ADP 提供。这批漏洞涉及 SonicOS 防火墙固件。
