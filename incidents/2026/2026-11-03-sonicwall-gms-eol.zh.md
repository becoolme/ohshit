---
title: 已停止支持的 SonicWall GMS 可在未认证状态下泄露内部文件
summary: SonicWall 披露已停止支持的 Windows／Linux GMS 9.5.2 及更早版本存在未认证内部文件读取，以及另一个需认证的 SQL 注入漏洞，攻击者须能通过网络访问。CISA 11 月 3 日评估记录尚无利用；可读厂商材料未能核实修复版本。
splash: 可经网络访问的 Windows／Linux SonicWall GMS 9.5.2 及更早版本；SQL 注入另需认证。
wipe: 仅向可信管理网络开放 GMS，通过 SonicWall 支持制定退役或迁移计划并核实处置。
inTheWildNote: CISA 11 月 3 日评估记录尚无利用，本轮未发现可核实的攻击报告。
cves:
- name: 未认证内部文件泄露
  description: 能经网络访问的攻击者可能无需认证便可读取 GMS 内部文件。9.1 分来自 CISA ADP 的 CVSS 3.1 评估。
- name: 需认证的 SQL 注入
  description: 在未具体说明的条件下，已认证攻击者可能读取或修改 GMS 数据库资料。CISA ADP 给出 CVSS 3.1 6.8 分，并列出高权限前提。
timeline:
- date: 2026年11月3日
  title: SonicWall 公开同一 GMS 公告对应的两条 CVE 记录
  body: 记录将 Windows／Linux GMS 9.5.2 及更早版本列为受影响且停止支持；CISA 附带评估记录尚无利用。
checklist:
- title: 找出并限制可访问的 GMS 管理系统
  hint: 盘点 Windows 及 Linux 上的 GMS 版本，检查防火墙、反向代理及访问控制规则。移除公网或不可信来源的访问，仅允许确有需要的管理网络。仅启用认证不能解决文件读取漏洞。网络限制可减少暴露，但不是软件修复。
- title: 通过 SonicWall 支持规划退役或迁移
  hint: 厂商 CVE 记录将这些 GMS 版本列为生命周期结束。向 SonicWall 核实受支持的替代方案及配置、数据库迁移计划。核实时关联 PSIRT 页面仅返回依赖脚本的空壳，因此本文不指定修复版本或版本下限；不要自行认定高于 9.5.2 的版本安全。
- title: 保留记录并调查可疑访问
  hint: 迁移前保留 GMS 应用、认证、反向代理及网络日志，与安全团队排查陌生来源地址、文件访问及已认证数据库请求。可读记录未公布利用路径或专用指标，未发现异常不能证明安全。若确认资料暴露，先确定受影响凭据范围，再从干净的管理系统更换。
sources:
- name: SonicWall 编写的 CVE-2026-109593 CNA 记录
  says: 厂商说明受影响版本、Windows／Linux 平台、未认证网络文件读取及停止支持标记。CISA ADP 提供 CVSS 3.1 9.1 分及 11 月 3 日尚无利用的评估。
- name: SonicWall 编写的 CVE-2026-109594 CNA 记录
  says: 同属 SNWLID-2026-0019 批次，说明生命周期结束版本及需认证、满足特定条件的 SQL 注入。CISA ADP 提供需高权限的 CVSS 3.1 6.8 分及尚无利用的评估。
---

SonicWall 11 月 3 日记录涵盖 Windows 及 Linux GMS 9.5.2 及更早版本的两个漏洞。CVE-2026-109593 要求网络可达，但不需要登录，内部文件可能含敏感资料。CVE-2026-109594 是另一个需认证的数据库漏洞，可读描述没有具体说明其他必要条件；不能将其写成未认证 SQL 注入或已演示的利用链。

记录将受影响软件标为停止支持，SQL 注入描述亦明确说明生命周期结束。[关联 PSIRT 公告](https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0019) 仅返回依赖脚本渲染的空壳，未能从中核实迁移目标、修复版本或厂商专用缓解方法。网络隔离及经支持渠道制定退役计划属于防御建议，不是已确认的软件修复。

CISA 11 月 3 日评估记录尚无利用，不能保证后续不会遭攻击。已核阅一手材料没有确立实际受害者、确认泄露规模或公开利用代码。集中管理防火墙的软件存在未认证文件读取风险，因此评为 L3；所引记录不能证明 SonicOS 防火墙或全部 SonicWall 产品遭入侵。
