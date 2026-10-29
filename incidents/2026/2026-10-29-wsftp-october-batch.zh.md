---
title: Progress 披露 WS_FTP Server 十五个漏洞，包含未授权管理凭据暴露
summary: Progress 发布 Windows WS_FTP Server 的 15 个 CVE，包括 CVSS 10.0 凭据暴露及依赖配置的命令执行。安装 2024.0.7 或 2025.0.4 可覆盖整批修复；不同命令执行路径要求不同账户权限。
splash: Windows WS_FTP Server 低于 2024.0.7 或 2025.0.4；暴露取决于组件、配置及账户权限
wipe: 安装 2024.0.7（9.0.7）或 2025.0.4（10.0.4）；已退役版本迁移至受支持版本线
inTheWildNote: 所引厂商记录未确认利用，也未提供受害者数量。
cves:
- name: Ad Hoc Transfer 文件读取
  description: 登录用户可读取预期目录之外的文件。
- name: 未授权管理凭据暴露
  description: 未登录的远程攻击者可获取敏感数据，可能包括管理凭据。
- name: SSH MFA 绕过
  description: 登录用户可利用账户间身份验证因素关联错误绕过 MFA。
- name: 活动日志暴露密码
  description: 管理员可获取其他用户的明文密码，可能取得更广泛的管理权限。
- name: Web Transfer MFA 绕过
  description: 知道用户密码的攻击者可在未完成 MFA 时访问该账户的部分文件。
- name: Manager 缺少授权检查
  description: 委派的 Host Administrator 可越过授权范围，可能在宿主机以提升后的权限执行命令。
- name: Host Administrator 路径绕过
  description: 委派的 Host Administrator 可读取或修改授权路径外的文件。
- name: FTP 通知命令注入
  description: 特定配置可通过通知变量以提升后的权限执行命令；厂商向量无需登录，但攻击复杂度高。
- name: 虚拟文件夹边界绕过
  description: 委派的 Host Administrator 可越过虚拟文件夹范围，可能导致代码执行。
- name: Web Admin 访问控制错误
  description: 访问控制不当使远程身份验证尝试可触及管理功能；这本身不代表身份验证已成功。
- name: 依赖配置的命令注入
  description: 厂商将此代码执行路径评为在特定配置下需要低权限；不能描述为未授权 RCE。
- name: 身份验证前 SSH 拒绝服务
  description: 知道有效账户已登记 SSH 公钥的远程攻击者，可终止共享 SSH 服务。
- name: Ad Hoc Transfer 资源耗尽
  description: 未释放的接收会话可在无需身份验证时耗尽资源并降低服务可用性。
- name: 传输目录穿越删除文件
  description: 未授权攻击者可影响传输目录之外的文件；厂商标题说明影响为文件删除。
- name: Manager 服务端脚本注入
  description: 已登录的 Manager 管理员可用 WS_FTP Server IIS 工作进程权限执行命令。
fixed:
- status: 9.0.7；覆盖整批修复，但此版本线已进入 Sunset
- status: 10.0.4；仍处于 Active 支持阶段
timeline:
- date: 2026年9月3日
  title: 2024.0.6 及 2025.0.3 发布
  body: 修复 84294–84296 子批次，不覆盖后续整批问题。
- date: 2026年10月1日
  title: 2024.0.7 及 2025.0.4 发布
- date: 2026年10月29日
  title: Progress 发布描述这些漏洞的 15 个 CVE 记录
checklist:
- title: 核对服务端版本，安装完整修复
  hint: 从 Progress Customer and Community 的 Product Downloads 获取安装包。安装 2024.0.7/9.0.7 或 2025.0.4/10.0.4；2024.0.6 和 2025.0.3 只修复较早的三个 CVE。升级后核对实际运行的服务端版本；此次涉及 WS_FTP Server，而非 Professional 客户端。
- title: 规划受支持的升级路径
  hint: 2024 版本线已进入 Sunset，不再提供新服务包或热修复；2022 及更早版本已退役。遵循 Progress 升级指引：2020 及更新版本可直接升级，2018 及更早版本须先升级至 2020。确认安装器能执行 PowerShell 脚本，操作系统仍受支持。从低于 10.0.0 的版本升级故障转移部署时，须同步两节点的注册表，使共享密钥仍可解密。
sources:
- name: Progress CNA：CVE-2026-84294
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-84295
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-84296
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90861
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90862
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90863
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90864
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90865
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90866
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90867
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90868
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90869
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90870
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90871
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress CNA：CVE-2026-90872
  says: 厂商发布的问题描述、CVSS 3.1 利用前提及受影响/修复版本边界。
- name: Progress 2024 版本历史
  says: 对应 2024.0.6/2024.0.7 与 9.0.6/9.0.7，以及 9 月 3 日/10 月 1 日发布日期。
- name: Progress 2025 版本历史
  says: 对应 2025.0.3/2025.0.4 与 10.0.3/10.0.4，以及相同发布日期。
- name: Progress 升级指引
  says: 安装包、受支持升级路径、PowerShell 要求及故障转移注册表同步。
- name: Progress 支持生命周期
  says: 2024 进入 Sunset，2022 已退役；Sunset 阶段不再提供新热修复或服务包。
---

CVE 公开披露日期为 10 月 29 日，修复服务包更早就已可用。这是包含 15 个 CVE 的同一公告批次，不是 15 起独立事件。涉及广泛部署的文件传输服务及严重披露问题，因此评为 L3；来源未证实在野利用。

CVE-2026-84295 可在无需身份验证时暴露敏感信息，可能包括管理凭据。不能将所有严重问题都称为未授权 RCE：CVE-2026-90868 需要低权限；90863、90864 和 90866 需要委派的 Host Administrator 权限；90865 取决于配置，向量的攻击复杂度高。公开记录未列明命令注入所需的全部设置，不能因为自认为使用默认配置就判断安全。

无法直接获取厂商链接的 Salesforce 公告；厂商自己的 CNA 记录提供了一手问题描述及补丁边界，另有官方版本历史交叉核对。来源未提供攻击者指标或受害者总数。
