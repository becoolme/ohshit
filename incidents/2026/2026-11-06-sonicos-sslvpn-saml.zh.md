---
title: SonicOS 七漏洞批次修复已遭利用的 SSLVPN SAML／MFA 绕过
summary: SonicWall 修复七个 SonicOS 漏洞；CISA 确认 CVE-2026-19868 已遭利用。SSLVPN 启用 SAML 登录时，其他认证方式的有效凭据可绕过 SAML 及其 MFA。Gen7／Gen8 修复版本分别为 7.3.4-7013／8.2.3-8015；其他漏洞的前提和影响各不相同。
splash: Gen7 SonicOS ≤7.3.3-7015 或 Gen8 ≤8.2.2-8015；已利用绕过须 SSLVPN 启用 SAML 且有其他方式的有效凭据。
wipe: Gen7 升至 7.3.4-7013+、Gen8 升至 8.2.3-8015+，再审查 VPN 认证及可疑会话。
inTheWildNote: CISA 于 11 月 6 日将 CVE-2026-19868 纳入 KEV，不代表其他六项已遭利用。
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
- date: 2026年11月6日
  title: SonicWall 发布七漏洞公告
  body: 厂商调查 SSLVPN 绕过可能遭利用的报告，敦促升级，未提供临时解决方法。
- date: 2026年11月6日
  title: CISA 将 SSLVPN 绕过纳入 KEV
  body: 目录列出联邦机构 11 月 20 日处置期限；没有公布受害人数，也不能据此确认其他六项遭利用。
checklist:
- title: 安装对应平台固件
  hint: 在管理界面盘点硬件／NSv 代际及完整 SonicOS 构建号。从 SonicWall 官方渠道取得对应 Gen7 7.3.4-7013、Gen8 8.2.3-8015 或后续受支持构建。保留配置备份，遵循平台升级流程；完成后核实运行构建及 VPN 连通性。不要仅凭较高的营销版本号判断安全。
- title: 审查 SSLVPN 认证及会话
  hint: 检查 SSLVPN 是否启用 SAML，哪些替代认证方式及身份仍可使用。保留 VPN 认证、身份提供方及防火墙日志，将成功 VPN 会话与预期 SAML／MFA 事件关联，调查陌生身份、来源地址和时间。仅缺少 SAML 事件不证明利用。确定可疑访问范围，从干净管理环境吊销受影响会话或更换暴露凭据。厂商未提供临时解决方法，单改 MFA 设置不能替代固件修复。
- title: 分别检查其他受影响接口
  hint: 与安全团队检查管理接口暴露、TACACS+ 依赖及 NSv 本地访问。升级期间减少不必要管理访问属于防御措施。七项属于同一公告批次，并非已证实的利用链；已核阅公告未提供专用攻击指标或精确事件日志特征。
sources:
- name: SonicWall SNWLID-2026-0014 原始公告
  says: 在渲染浏览器完整核阅：七项漏洞、各自评分和前提、两代硬件／NSv 及准确修复构建；无临时解决方法。
- name: SonicWall 编写的已利用绕过 CNA 记录
  says: 11 月 6 日首次公开；受影响 Gen7／Gen8 SonicOS 上其他方式的有效凭据可绕过 SAML／MFA。
- name: CISA KEV 目录
  says: 11 月 6 日新增 CVE-2026-19868，确认已知利用；联邦机构期限为 11 月 20 日，勒索活动使用情况未知。
---

已利用路径要求 SSLVPN 登录启用 SAML，且攻击者持有另一认证方式的有效凭据，并非可未认证绕过所有 SonicWall 服务。另两项管理漏洞的评分包含用户交互；溢出漏洞描述的是应用拒绝服务，不是远程代码执行。本地凭据问题针对虚拟设备。

公告涵盖 Gen7／Gen8 硬件防火墙及支持的虚拟化／云平台 NSv，请对照平台表确认设备。CISA 确认本批次一项已遭利用，SonicWall 则称正在调查可能利用。两者均未公布受害人数、事件专用指标，也未证明七项已被串联。这份 SonicOS 固件公告与此前 Global Management System 披露是不同事件。
