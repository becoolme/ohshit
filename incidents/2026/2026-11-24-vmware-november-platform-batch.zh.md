---
title: VMware 修复 23 个平台漏洞，包括 ESX 网络 RCE 及另一处 vCenter 绕过
summary: VMSA-2026-0011 覆盖 VMware 多个产品的 23 个漏洞，包括网络可达 ESX 即可利用的代码执行，以及新的 vCenter 认证绕过。其他漏洞分别需要客户机、备份仓库或管理员权限。ESX 9.0 的两个已有权限漏洞仍待补丁；所读来源未确认本批漏洞遭利用。
splash: 未修补的 VMware 管理服务、宿主机及客户机；Avi 漏洞需要已认证或管理员访问。
wipe: 按各产品修复矩阵更新，单独升级客户机 Tools，并跟踪 ESX 9.0 仍待修复的两个漏洞。
inTheWildNote: 未确认本批漏洞遭在野利用；此前 vCenter CVE 是另一处漏洞。
cves:
- name: vCenter 认证绕过
  description: 网络可达 vCenter 即可通过 Directory Service 获得未授权访问，无需 Enhanced Linked Mode。
- name: vCenter 归档文件写入
  description: 访问备份仓库后，可利用归档处理以 root 身份写入文件，并可能执行代码。
- name: vmdir 拒绝服务
  description: 网络访问可导致 Directory Service 拒绝服务。
- name: vmdir 拒绝服务
  description: 网络访问可导致 Directory Service 拒绝服务。
- name: vmdir 拒绝服务
  description: 网络访问可导致 Directory Service 拒绝服务。
- name: vpxd 提权
  description: 已控制 vpxd 服务账户后，可通过服务脚本获得 root。
- name: 分布式交换机策略失效
  description: 虚拟机内的本地攻击者可绕过预期的 vDS 安全策略。
- name: ESX I/O 过滤服务堆越界写入
  description: 网络访问 ESX 可导致宿主机代码执行，无需先进入虚拟机。
- name: ESX I/O 过滤服务释放后重用
  description: 网络访问 ESX 可导致宿主机代码执行，无需先进入虚拟机。
- name: XHCI USB 控制器越界写入
  description: 虚拟机管理员权限可导致 VMX 代码执行；ESX 将其限制在 VMX 沙箱内，Workstation／Fusion 则可能导致宿主机代码执行。
- name: VMkernel 栈溢出
  description: 提权需要先取得 VMX 进程内的权限。
- name: ESX 配置存储绕过
  description: 需要已启用 Secure Boot 的 ESX 主机 root 权限，才能篡改配置存储。
- name: ESX 签名验证绕过
  description: 已有权限的攻击者可使恶意文件在宿主机重启后继续存在；ESX 9.0 补丁仍待发布。
- name: 客户机 RPC 拒绝服务
  description: 虚拟机内的非管理员可用特制 RPC 使该虚拟机的 VMX 进程崩溃。
- name: Tools VGAuth 拒绝服务
  description: 虚拟机内的非管理员可触发 VMX 崩溃；Windows 与 Linux Tools 均需单独更新。
- name: Avi 不安全反序列化
  description: Controller 本地管理员权限可导致 root 代码执行。
- name: Avi 本地提权
  description: Controller 本地管理员可提权至 root。
- name: Avi 命令注入
  description: 网络可达且具有 Avi 管理员权限时，可在 Controller 执行命令。
- name: Avi 密码哈希泄露
  description: 网络可达且具有管理员权限时，可读取密码哈希。
- name: Avi 路由接口凭据复用
  description: Service Engine 管理员可利用各安装实例共用的凭据访问路由管理接口。
- name: Avi 敏感信息泄露
  description: Controller 管理员可访问超出预期权限的资源；FAQ 将其说明为 SSH 凭据。
- name: Avi 目录遍历
  description: 网络可达且具有管理员权限时，可访问、删除预期目录以外的文件。
- name: Avi 已认证信息泄露
  description: 网络可达且具有已认证账户时，可访问超出预期权限的资源。
fixed:
- status: 累积修复版本
- status: 快速补丁版本
- status: 也修复此前 vCenter 公告漏洞
- status: 覆盖全部七个 ESX 漏洞
- status: 修复五个漏洞；CVE-2026-123914 与 CVE-2026-123915 仍待补丁
- status: 覆盖全部七个 ESX 漏洞
- status: 公开矩阵要求延长支持客户联系 Broadcom Support
- status: 按 KB 88287 异步修补 vCenter 与 ESX 至 8.0 U3m；仅更新 SDDC Manager 不够
- status: 修复客户机设备及 RPC 两个漏洞
- status: Windows／Linux 厂商包
- status: 含 32 位 Windows 的 12.4.11；Linux 发行版自行提供 open-vm-tools 修复
- status: 推荐版本，覆盖全部八个 Avi 漏洞
- status: 31.2.3 修复 123919／123921；30.2.7 修复 30.x 的 123920；其他漏洞仍须逐项核对矩阵
- status: 前者用于 32.1.3，后者按 FAQ 用于 32.1.1–32.1.2 及 31.x；此 CVE 不影响 30.x／22.x
timeline:
- date: 2026年11月24日
  title: Broadcom 发布 VMSA-2026-0011
  body: 新的 23 CVE 公告及补充 FAQ 说明各组件修复版本及部署前提。
checklist:
- title: 清点组件并按受支持路径修补
  hint: 查看 vCenter 及每台宿主机的 Summary 页面；PowerCLI 可查询 DefaultVIServer.Version／Build，以及 Get-VMHost | Select-Object Name,Version,Build。按上表更新，纳入 vSAN Witness 虚拟设备及其宿主 ESX。所列 Telco 版本按 KB 463501 处理：vCenter 为 8.0 U3m；TCP 5.0.x／5.1.x 的 ESX 为 80U3m。未列版本、延长支持版本联系 Support，集成系统联系对应厂商取得认证更新。FAQ 虽笼统描述累积修复，但 ESX 9.0 的 CVE-2026-123914／123915 仍待补丁。
- title: 安排宿主机重启并更新每个 VMX 进程
  hint: 检查互操作矩阵并纳入 vSAN。本次更新不能使用 vCenter Quick Patch 或 ESX Live Patch。宿主机进入维护模式并迁移负载后修补、重启；无法迁移的客户机需关机。VMX 修复在虚拟机开机或 vMotion 到已更新主机后生效，仅重启客户机操作系统无效。Workstation／Fusion 更新至 26H1u1，各 Windows／Linux 客户机内的 Tools 单独更新；无需升级虚拟硬件版本。
- title: ESXi 8.x 仅对两个 I/O 过滤漏洞使用临时防火墙流程
  hint: KB 463535 要求将 IOFilterVP TCP 9080 限于 vCenter。在 ESXi 8.x 主机以 root 执行 esxcli network firewall ruleset set -r iofiltervp --allowed-all false；用 esxcli network firewall ruleset allowedip add -r iofiltervp -i <vCenter-IP> 加入实际 vCenter IP；再用 esxcli network firewall ruleset allowedip list -r iofiltervp 核实。按变更流程验证集群及存储连通性。此措施只针对 8.x 的 CVE-2026-123910／123911，不能缓解整批漏洞或 9.0 的待修复问题；应尽快打补丁。
- title: 限制暴露，避免将局部缓解视为全部修复
  hint: 仅允许必要系统及账户访问管理网络、写入备份仓库。移除不用的 XHCI 控制器只能缓解 CVE-2026-123912；先测试，避免客户机 USB 及控制台输入失效。用 Get-VDPortgroup | Get-VDSecurityPolicy 检查 vDS 策略，除负载确需单独例外外保留 Reject 默认值。Avi 32.1.4 才是八个漏洞的完整修复目标，各分支局部补丁不能互换。此前 vCenter 条目说明 VMSA-2026-0009 的 SDDC Manager 修复；VMSA-2026-0010 需另外处理。
sources:
- says: 11 月 24 日初始公告：23 个 CVE、各产品矩阵、ESX 9.0 两个待修复漏洞及 ESXi 8.x 临时措施链接。
- says: 区分此前绕过漏洞，说明客户机／VMX 前提、Avi 局部修复、Tools 单独更新及操作要求；以正式公告为准。
- says: 针对两个网络 RCE 漏洞，提供 ESXi 8.x IOFilterVP TCP 9080 临时防火墙完整流程。
- says: Telco vCenter 8.0 U3m 适用范围、TCP 5.0.x／5.1.x 的 ESX 80U3m，以及未列版本的 Support 指引。
---

Broadcom 在 11 月 24 日发布的 VMSA-2026-0011 是包含 23 个漏洞的新批次。vCenter 绕过 CVE-2026-123903 与此前已遭利用的 [CVE-2026-123890 事件](/zh/incidents/vcenter-directory-session-bypass/) 不同。L3 基于广泛部署平台中的严重漏洞；所读来源未确认本批漏洞遭在野利用、受害数量或公开利用程序。不能将此前事件的利用状态套到这些 CVE 上。

最紧急的路径需要网络访问 ESX 的 I/O 过滤服务或 vCenter 的 Directory Service，不需要先进入客户机，也不需要 Enhanced Linked Mode。其他路径各有前提：备份仓库访问、已控制的 vpxd 账户、客户机管理员或 VMX 权限、ESX root 权限，或 Avi 已认证／管理员访问。XHCI 代码执行在 ESX 中受 VMX 沙箱限制，Workstation／Fusion 则可能影响宿主机。这不代表已有组合这些漏洞的利用链演示。

正式公告的修复矩阵优先于 FAQ 的概括说明。ESX 9.0 的 CVE-2026-123914 与 CVE-2026-123915 尚无公开修复。CVE-2026-123912 在 Workstation／Fusion 中为 9.3；ESX 矩阵写 8.4，FAQ 则写 8.5。这一来源差异不改变修补要求。矩阵推荐累积版本；此前只修复 CVE-2026-123916 的 VCF 9.1.1／5.2.4、ESX 8.0 U3j 及 Workstation／Fusion 26H1，不能覆盖其他漏洞。

Avi 32.1.4 修复全部八个 Avi CVE。31.2.3、30.2.7 及仅针对 123926 的热补丁只覆盖所列子集。FAQ 将 CVE-2026-123926 的 32.1.2-2p3 扩展至 31.x，但矩阵明确列出的范围是 32.1.1–32.1.2；31.x 运维人员应向 Support 核实升级路径，不能将热补丁视为通用修复。30.x 与 22.x 不受这一个 CVE 影响，不代表不受整批漏洞影响。

没有覆盖整批漏洞的临时措施。尽管 FAQ 的措辞较笼统，正式公告仍为 ESXi 8.x 的两个 I/O 过滤 RCE 链接到 KB 463535；清单列出了完整防火墙流程。只修补 vCenter 会遗漏 ESX、桌面虚拟化产品及客户机内的 Tools。已更新至 vCenter 8.0 U3m 的实例无需重装，但 vCenter 9.1 需要 9.1.2。即使 SDDC Manager 已为 5.2.5，VCF 5.x 仍须异步修补各组件。
