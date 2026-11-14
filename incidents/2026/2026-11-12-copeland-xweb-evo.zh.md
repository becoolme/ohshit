---
title: Copeland XWEB EVO 漏洞可导致制冷控制设备遭远程接管
summary: VulnCheck 披露已停止支持的 XWEB EVO 系列存在 14 个漏洞，并在诱捕系统发现针对其中两个漏洞的请求。旧版设备无需登录即可执行 root 命令，5.8.8 仍存在凭据可预测的问题。
splash: 网络可达的 Copeland 和 Dixell XWEB EVO 设备，包括制冷管理界面。
wipe: 取消互联网直连，隔离控制设备，核查日志与设置，并规划迁移到仍受支持的系统。
inTheWildNote: VulnCheck 在诱捕系统观察到构造请求，生产设备遭入侵尚未证实。
cves:
  - name: 用户名命令注入
    description: 影响 5.2.3 至低于 5.7.0 的版本。登录用户名在认证前就会进入 shell。
  - name: 高权限 Lua 解释器注入
    description: 影响低于 5.6.2 的版本。带有 setuid-root 权限的解释器可将构造的参数传给 shell。
  - name: 硬编码管理员后门
    description: 影响低于 5.6.2 的版本。硬编码凭据可取得管理员会话。
  - name: 管理员每日密码可预测
    description: 影响 4.3.0 至 5.8.8。可用设备 MAC 地址和日期计算每日凭据。
  - name: Linux root 密码可预测
    description: 影响截至 5.8.8 的版本。root 凭据可推算，较新固件使用每日口令生成。
  - name: 密码字段命令注入
    description: 影响低于 5.6.2 的版本。密码字段中的 shell 元字符可在认证前进入命令。
  - name: 设备模板命令注入
    description: 影响 5.2.3 至 5.8.8。已认证用户可通过模板处理注入命令。
  - name: 备份命令注入
    description: 影响 5.2.3 至 5.8.8。已认证用户可通过备份输出路径注入命令。
  - name: 未经认证执行 root 命令
    description: 影响低于 5.6.2 的版本。请求 xwconsole.cgi 无需登录即可执行 root 命令。
  - name: MAC 地址与时钟泄露
    description: 影响 5.6.2 至 5.8.8。无需认证的接口会泄露用于推算每日密码的信息。
  - name: 管理员每日密码认证绕过
    description: 影响 5.6.2 至 5.8.8。内置管理员账号接受推算出的每日凭据。
  - name: 配置导入命令注入
    description: 影响 5.6.2 至 5.8.8。已认证用户可在导入或恢复配置时注入 shell 命令。
  - name: 未经认证写入配置
    description: CNA 列出 4.3.0 至 5.8.8。调用者无需登录即可覆写系统配置。
  - name: 密码重置会话绕过
    description: CNA 列出 5.6.2 至 5.8.8。无需认证即可重置被标记为下次登录时必须改密的账号。
fixed:
  - status: 已停止软件支持。没有一个版本解决整批漏洞。
timeline:
  - date: 2026年3月16日
    title: Copeland 停止软件支持
    body: Copeland 建议迁移至 XWEB PRO，并限制仍在使用的 EVO 的网络访问。
  - date: 2026年11月12日
    title: CNA 发布 14 条漏洞记录
    body: 涉及命令执行、凭据可预测、配置访问和密码重置绕过。
  - date: 11月12日 22:00 UTC
    title: VulnCheck 诱捕系统发现配置写入尝试
    body: 请求符合 CVE-2026-124014 的利用特征。截至 11 月 13 日 06:16 UTC，VulnCheck 共记录 125 次命中。
  - date: 11月13日 03:41 UTC
    title: 第二个来源探测旧版 root 接口
    body: 诱捕系统收到四次针对 CVE-2026-124010 的请求，均要求接口执行 id，未报告后续载荷。
  - date: 2026年11月13日
    title: VulnCheck 发布固件分析及诱捕记录
    body: 报告说明实验室复现过程及观察到的两种请求特征。
checklist:
  - title: 取消控制设备的直连访问
    hint: 与设施人员和制冷维护商协作。从资产清单或管理界面确认 EVO 型号和固件。移除公网端口转发，在专用网络中限制出入站通信。仅允许经受控远程访问的授权主机进行 HTTPS 管理及必要的 SSH 访问。验证告警和制冷监测仍正常运行。
  - title: 排查 VulnCheck 记录的请求
    hint: 检查防火墙、代理和设备日志中的 202.61.138.117（AS152194）、对 config.lua 含 action=set 的未认证 POST，以及 177.4.12.11（AS140227）、对 /cgi-bin/xwconsole.cgi 含 sh=id 的未认证 GET 和 User-Agent Mozilla/5.0。两条检测规则分别为 VULNCHECK CVE-2026-124014 Copeland XWEB EVO Unauthenticated config.lua Configuration Write Attempt 和 VULNCHECK CVE-2026-124010 Copeland XWEB EVO xwconsole.cgi Unauthenticated Root Command Execution Attempt。将 /etc/xwebconfig.json 与可信基线比对，检查异常管理员会话、SSH 启用、除霜或告警变更。单凭命中无法证明入侵。
  - title: 恢复并替换受影响的 EVO 设备
    hint: 保留可用日志和设置。怀疑入侵时，与制冷维护商协调安全隔离，并按厂商指引使用可信固件和配置恢复，或直接更换设备。在干净系统上轮换操作员和远程访问凭据。Copeland 建议改用仍受支持的 XWEB PRO 型号。重连前核对替换型号的现行固件和安全公告。
sources:
  - name: VulnCheck 对 XWEB EVO 的原始研究
    says: 报告 14 项发现、实验室复现及观察到的两种请求特征。
  - name: VulnCheck 发布的 CVE-2026-124014 CNA 记录
    says: 将 4.3.0 至 5.8.8 列为受配置写入漏洞影响的版本。
  - name: VulnCheck 发布的 CVE-2026-124015 CNA 记录
    says: 将 5.6.2 至 5.8.8 列为受密码重置绕过影响的版本。
  - name: Copeland XWEB EVO 停止支持公告
    says: 软件支持于 2026 年 3 月 16 日结束，并建议迁移和采取临时管控措施。
  - name: Copeland 网络安全指南
    says: 建议取消互联网访问、过滤流量并限制 SSH。
---

若旧版 XWEB EVO 的管理界面网络可达，攻击者无需账号即可写入配置或执行 root 命令。本批漏洞还包括截至 5.8.8 固件上的可预测凭据，以及取得管理员或 root 访问权限的路径。研究正文将部分 Lua 路径归为旧版特有，但 CNA 记录仍将 CVE-2026-124008、CVE-2026-124009、CVE-2026-124014 和 CVE-2026-124015 的影响上限列为 5.8.8，其中 CVE-2026-124015 的下限为 5.6.2。排查时请参考 CNA 范围，并向 Copeland 确认具体型号和构建版本。根据公告，5.6.2 已去除 xwconsole.cgi 的特定风险，但这批漏洞仍影响较新的固件。

VulnCheck 将诱捕流量描述为机会式探测。记录证实有人发起利用尝试，生产设备实际失陷数量及运营损失仍待确认。CERT-FR 曾将 Copeland 和 Dixell XWEB 列入[制冷攻击](/zh/incidents/supermarket-refrigeration-wave/)中遭入侵的控制设备。11 月的探测不能确定那次攻击使用了哪些漏洞。
