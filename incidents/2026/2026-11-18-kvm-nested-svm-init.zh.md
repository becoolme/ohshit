---
title: KVM 嵌套 SVM 重置漏洞使来宾可访问 AMD 宿主机内存
tags:
- Linux
- KVM
- 虚拟机逃逸
summary: CVE-2026-99312 可突破启用嵌套虚拟化的未修复 AMD KVM 宿主机的来宾隔离。研究人员已演示宿主机内存读写，尚无恶意利用报告。应修补宿主机内核或禁用嵌套虚拟化。
splash: 未修复且启用嵌套虚拟化的 AMD KVM 宿主机；攻击者控制来宾，或有权限创建 KVM 虚拟机。
wipe: 在对应上游分支运行 7.3.5、6.18.64 或 6.12.118 修复内核；否则禁用 AMD 嵌套虚拟化，重启后验证。
inTheWildNote: 已有研究演示及云厂商复现，尚无恶意在野利用报告。
cves:
- name: INIT 后残留嵌套页表指针
  description: AMD 嵌套来宾关闭分页时收到 INIT，留下过期的 MMU 上下文，可导致页表释放后重用并访问宿主机内存。
fixed:
- product: 上游 Linux 7.3
  status: 已修复
- product: 上游 Linux 6.18
  status: 已修复
- product: 上游 Linux 6.12
  status: 已修复
mitigation:
  note: 先消除已有模块及启动参数冲突。修改文件不会改变正在运行的模块；应安排宿主机重启并验证嵌套虚拟化已关闭。
timeline:
- date: 2026年10月21日
  title: 研究人员报告 KVM 维护者
- date: 2026年11月2日
  title: 上游合并修复
  body: 提交为 c7c288d178cb0b78d3464a616b16b1aa0b316049，11 月 9 日首次进入 7.4-rc2 标签。
- date: 2026年11月17日
  title: 稳定版修复发布
  body: 7.3.5、6.18.64 和 6.12.118 包含修复。
- date: 2026年11月18日
  title: Terra 公开研究及 CVE
- date: 2026年11月19日
  title: DigitalOcean 确认复现并完成全平台处置
  body: 厂商表示 Droplet 客户无需为此次宿主机内核修复采取操作。
checklist:
- title: 识别暴露的虚拟化宿主机
  hint: 在每台宿主机执行 grep -m1 vendor_id /proc/cpuinfo、cat /sys/module/kvm_amd/parameters/nested 和 uname -r。AuthenticAMD 且嵌套参数为 1/Y 时，应核对具体内核包。Intel VMX 或参数为 0/N 可排除此路径；改变来宾 CPU 模式无法缓解。
- title: 在修复内核运行前禁用嵌套虚拟化
  hint: 检查 /etc/modprobe.d/、/run/modprobe.d/、/usr/lib/modprobe.d/ 和 /lib/modprobe.d/ 中的 nested 参数。设置 kvm_amd nested=0 并消除冲突，通过 modprobe -c 核对。检查 /proc/cmdline 中的 kvm_amd.nested=1，通过发行版启动引导配置移除。通知使用嵌套虚拟机的租户，安排停机或迁移后重启宿主机；不要在虚拟机运行时卸载 KVM。确认运行时参数为 0/N。
- title: 安装发行版修复并确认运行内核
  hint: 按厂商 CVE 跟踪页核对具体内核类型及回移补丁，安装已修复软件包、重启并检查 uname -r。对应上游分支修复版为 7.3.5、6.18.64 和 6.12.118；7.4-rc2 是预发布版。修复实际运行前保持嵌套功能关闭。仅更新来宾内核不能修复宿主机。
sources:
- name: Terra Security 原始研究
  says: 11 月 18 日披露、技术成因及协调时间线。
- name: DigitalOcean 复现与处置
  says: 确认读写演示，表示全平台处置后 Droplet 客户无需操作。
- name: Linux CNA 记录
  says: CVSS 3.1 为 8.8，列出受影响提交、稳定版修复及非 root 宿主机 KVM 用户可达的攻击场景。
- name: VirtFusion 运维公告
  says: 提供检查、持久化缓解及重启验证步骤；发行版供应情况与评分截至 11 月 19 日。
- name: Debian 安全跟踪
  says: 11 月 20 日核查时，bookworm/trixie 安全内核包仍受影响，sid 7.3.5-1 已修复。
- name: Ubuntu 安全跟踪
  says: 11 月 20 日优先级为高；影响取决于具体内核包，包括 HWE。
- name: Red Hat 评估
  says: 评级为中等、5.6 分；说明 AMD 嵌套前提、缓解及 RHEL 9/10 内核修复延期。
---

AMD 嵌套来宾关闭分页时收到 INIT 重置，可能使外层虚拟机继续使用已释放的页表指针。该页被重用后，来宾可构造指向宿主机物理内存的映射。Intel 的 VMX 处理不经过此路径。云端演示要求来宾内 root 权限；Linux CNA 还描述了拥有 KVM 虚拟机创建权限的非 root 宿主机用户场景。这不是未认证的互联网端点漏洞。

DigitalOcean 确认演示只读映射了约 127 GB 宿主机内存，另在没有其他客户的独立 AMD 服务器上写入了 32 字节选定内容。这些是测试数据，不是客户泄露总量。尚无公开的宿主机代码执行演示，也未公布利用代码或报告恶意利用。评级 L3 基于主流虚拟化组件中已被演示的隔离失效。

此回归由 CVE-2022-3344 修复引入。未修复的上游 6.1 及之后版本，以及回移该变更的 5.15.81/6.0.11 版本受影响；发行版回移补丁使统一版本分界不可靠。表格只列出三个已核实的上游稳定修复版本，并非所有发行版构建。11 月 20 日核查时，Debian bookworm/trixie 安全内核仍受影响，sid 7.3.5-1 已修复。Ubuntu 20.04 通用内核不受影响，但其 HWE 5.15 包受影响，不能仅凭发行版名称判断安全。Red Hat 将 RHEL 9/10 修复列为延期。Ubuntu 当前优先级为高，已取代 VirtFusion 11 月 19 日页面中的中等评级快照。

DigitalOcean 表示其全平台已完成处置。自管宿主机仍需修复内核或采取缓解措施。这些来源尚未公布检测指标，日志搜索没有命中不能证明隔离未被突破。
