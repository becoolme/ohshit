---
title: Apache HTTP Server 2.4.71 修复 HTTP/2 堆内存破坏漏洞
summary: Apache 2.4.71 修复影响 httpd 2.4.55–2.4.70 及独立 mod_h2 2.0.8–2.0.42 的 HTTP/2 RCE，以及其他模块的两个漏洞。Broadcom 将 VCF／Aria Operations 及 HCX 9.1.x 的补丁列为待发布；其产品专用流程禁用 HTTP/2，须逐节点验证。
splash: 启用 HTTP/2 的受影响 Apache 服务器、Axis 设备及所列 VCF／Aria Operations／HCX 设备；其余 CVE 涉及各自模块。
wipe: 使用 httpd 2.4.71 或已核实的回移补丁；设备补丁待发布时，按厂商专用 HTTP/2 缓解流程操作并逐节点验证。
inTheWildNote: Apache 已发布修复。已查阅的来源未证实在野利用。
timeline:
- date: 2026年11月11日
  title: Apache 发布 2.4.71 及三个漏洞的修复
  body: 上游公告将 CVE-2026-119618 定为严重，mod_md 和 mod_vhost_alias 的修复随同发版。
- date: 2026年11月12日
  title: Canonical 与 Red Hat 公布发行版修复指引
  body: Canonical 列出五个涉及 HTTP/2 漏洞的 Ubuntu 发行版及修复软件包。Red Hat 说明了 RHEL 9、RHEL 10 和 JBoss Core Services 1 的影响范围及更新指引。
- date: 2026年11月16日
  title: Axis 公布受影响网络设备的临时缓解措施
  body: Axis 列出 AXIS OS 6.50.5.10 及之后版本，建议暂时禁用两种 HTTP/2 连接方式，并表示正在开发固件修复。
- date: 2026年11月19日
  title: Broadcom 列明受影响的 Operations 与 HCX 设备
  body: VMSA-2026-0010 将 VCF Operations 9.x、Aria Operations 8.18.x／VCF 5.x 及 HCX 9.1.x 的补丁列为待发布，并分别提供 Operations 和 HCX 缓解流程。
checklist:
- title: 清点正在运行的 HTTP/2 配置
  hint: 使用 httpd -v 或 apache2 -v、软件包管理器和 httpd -M 或 apache2ctl -M。检查各虚拟主机和可直连源站监听器实际使用的 Protocols 设置，包括 TLS 上的 h2 和 h2c。另行检查独立安装的 mod_h2。
- title: 安装受支持的修复并核对运行实例
  hint: 源码构建升级至 httpd 2.4.71 或更高版本。发行版软件包按供应商公告核对确切修复版本。将受影响的独立模块替换为受支持的修复构建，随后检查配置、重启或重新部署服务，并核对实际运行的程序及模块。
- title: 在未修补的监听器上禁用 HTTP/2
  hint: 升级需推迟时，从实际生效的 Protocols 设置中移除 h2 和 h2c，或停用 mod_http2。检查配置后重新加载，验证直连和代理请求均无法与受影响监听器协商 HTTP/2，并测试必要业务。此措施降低 HTTP/2 漏洞暴露，其他两个受影响模块仍需升级。
- title: 核对 Ubuntu 软件包或 Red Hat 勘误
  hint: 在 Ubuntu 上运行 dpkg-query -W apache2 apache2-bin，将结果与当前发行版对应的 USN-9090-1 版本比较。20.04 LTS 的修复通过 Ubuntu Pro 提供。Red Hat 用户按 CVE 记录选择与产品和更新通道匹配的勘误。在 RHEL 9 或 10 上运行 rpm -q mod_http2，将已安装的软件包版本与适用勘误比较。更新后重启或重新部署，再确认运行实例。
- title: 缓解受影响的 Axis 网络设备
  hint: 在设备上进入 System → Plain config，找到 System.HTTP2.AllowH2 和 System.HTTP2.AllowH2c，关闭两项并保存。必要时刷新页面或重启设备，再核实设置并测试业务流量。等 Axis 发行说明确认你的型号和固件分支包含修复后，再恢复 HTTP/2。
- title: 缓解每个受影响的 Operations 分析节点
  hint: 阅读 KB 463005，使用其附件 cve-2026-119618-v2.sh，不使用未经核实的脚本副本。在 https://<primary-node>/admin 为全部分析节点启用 SSH；将脚本复制到主节点 /root 并以 root 登录。执行 bash /root/cve-2026-119618-v2.sh --check --node <primary-node>；如有节点显示 AFFECTED，将 --check 换成 --apply 再执行并确认。脚本清点主节点、副本、数据及 witness 节点；Cloud Proxy 节点不受影响。要求每个节点均显示 workaround applied，不能只凭一个节点的零退出码。脚本备份配置、运行 httpd -t、重启 Apache 并验证 HTTP/2 已关闭；检查失败结果及 /var/log/cve-2026-119618.log。连通性预检失败时不会修改任何节点；配置或重启失败时恢复该节点并停止，之后的节点尚未修改。可能短暂中断访问及降低 UI 速度；厂商表示采集器、代理和 API 仍正常。每次升级后重跑 --check，并在厂商确认设备修复版本之前重新应用缓解。--revert 仅撤销脚本改动；手动修改须按 KB 手动回滚，只有核实修复后才恢复 HTTP/2。
- title: 采用独立的 HCX Manager 流程并验证两个监听端口
  hint: HCX Manager 9.1.x 按 KB 463022 操作：先备份或建立快照，通过 SSH 登录设备并切换至 root。从该 KB 下载附件 block-http2.sh，复制到 /tmp，再执行 sh /tmp/block-http2.sh。脚本备份 Apache 配置、移除 h2 并重启 Apache。在支持 HTTP/2 的工作站执行 curl --http2 https://<HCX-Manager-IP>/hybridity/api/endpointInfo -k -v 及 curl --http2 https://<HCX-Manager-IP>:9443 -k -v；两者均须显示 HTTP/1.x。-k 仅用于这里的协议诊断，不能验证 TLS 身份。Broadcom 表示不会影响进行中的迁移及网络扩展。运行 Operations 脚本、升级上游 httpd，或安装另一批 VMSA-2026-0011 vCenter／ESX 补丁，都不能证明 HCX 已修复。
sources:
- name: Apache 2.4.71 安全公告
  says: 列出三个 CVE、受影响版本及发版日期。
- name: Apache CNA 记录
  says: 确认竞态、远程代码执行影响及上游与独立模块的受影响版本。
- name: 独立 mod_h2 维护者仓库
  says: 独立仓库已归档，维护者指引用户转向 Apache httpd。
- name: Red Hat CVE-2026-119618 分析
  says: 说明 HTTP/2 可达这一前提及线程安全缺陷。
- name: Canonical USN-9090-1 安全公告
  says: 列出 Ubuntu 修复版本，并明确 HTTP/2 漏洞涉及哪些发行版。
- name: Red Hat RHSB-2026-017 安全公告
  says: 说明受影响的 Red Hat 产品及独立 mod_http2 软件包。
- name: Axis CVE-2026-119618 安全公告
  says: 列出受影响的 AXIS OS 版本，以及固件修复发布前需要关闭的 HTTP/2 设置。
- says: 11 月 19 日设备矩阵：Operations 与 HCX 补丁待发布，网络可达即可触发 RCE，并提供各自缓解 KB。
- says: 完整分析节点脚本／手动流程、Cloud Proxy 排除、验证、回滚／失败处理及升级后重应用要求；页面未给出明确更新日期。
- says: HCX Manager 9.1.x 的备份、附件脚本及 443／9443 端口 HTTP/1.x 验证；厂商称不影响进行中的迁移／网络扩展。
cves:
- name: HTTP/2 堆内存破坏
  description: mod_http2 的 assign_headers() 存在竞态，可能导致远程代码执行。
- name: mod_md 子进程崩溃
  description: 处理 HTTP 请求时的空指针解引用可导致子进程崩溃。
- name: mod_vhost_alias 栈覆写
  description: 模块可能覆写栈中的一个字节。
fixed:
- product: Apache HTTP Server
- product: Ubuntu 26.10 的 apache2 软件包
- product: Ubuntu 26.04 LTS 的 apache2 软件包
- product: Ubuntu 24.04 LTS 的 apache2 软件包
- product: Ubuntu 22.04 LTS 的 apache2 软件包
- product: Ubuntu 20.04 LTS 的 apache2 软件包
  status: 需要 Ubuntu Pro
- product: VCF Operations 9.x／Aria Operations 8.18.x／VCF 5.x 的 Aria 组件
  status: VMSA-2026-0010 仍待补丁；按 KB 463005 处理，不要自行替换为上游软件包
- product: VCF Operations HCX Manager 9.1.x
  status: 仍待补丁；按 KB 463022 处理，验证 443 与 9443 两个端口
---

CVE-2026-119618 是 HTTP/2 请求头处理中的竞态。能访问受影响 HTTP/2 监听器的远程客户端可触发内存破坏，进而可能在服务器进程中执行代码。Apache 列出的范围为 httpd 2.4.55 至 2.4.70、独立 mod_h2 2.0.8 至 2.0.42。Red Hat 指出，启用 h2 或 h2c 的服务器存在该漏洞的暴露面。独立项目已归档，请使用 Apache httpd 随附的修复模块，或由下游供应商确认已修复的构建。

同批还修复了 2.4.30 至 2.4.70 的 mod_md 子进程崩溃漏洞，以及 2.4.69 和 2.4.70 的 mod_vhost_alias 单字节栈覆写漏洞，暴露取决于各自模块。下游回移补丁后版本号仍可能较旧，请按供应商公告核对实际软件包版本。

Canonical 的 USN-9090-1 将 CVE-2026-119618 的修复回移到上表所列的五个 Ubuntu 发行版。该公告也为更早的 Ubuntu 版本提供其他漏洞的修复，其中不包括这项 HTTP/2 漏洞。Red Hat 将 RHEL 9、RHEL 10 和 JBoss Core Services 1 列为直接受影响产品，并提供按产品和更新通道区分的修复指引。

Axis 表示，CVE-2026-119618 可让未经认证的远程攻击者获得受影响设备的管理员权限，范围包括运行 AXIS OS 6.50.5.10 及之后版本的网络设备。11 月 16 日的公告称，Axis 尚未发现自家产品遭到利用，并提供了固件修复发布前的缓解措施。Apache 上游修复版本为 2.4.71。Axis 硬件用户应按设备型号和固件分支查阅发行说明。

Broadcom 在 11 月 19 日的 VMSA-2026-0010 中将同一 CVE 对应到 VCF Operations 9.x、Aria Operations 8.18.x（含 VCF 5.x 组件）及 VCF Operations HCX Manager 9.1.x 内嵌的 Apache。当前矩阵仍将补丁列为待发布。上游 2.4.71 已修复，不代表已有受支持的 VMware 设备补丁。Operations 分析节点按 KB 463005、HCX 按 KB 463022 处置，两者的脚本及验证范围不同。Operations 升级会替换 Apache 配置并重新启用 HTTP/2，须在厂商确认设备修复版本之前反复验证并应用缓解。这些是现有 Apache 事件新增的受影响产品及厂商可执行指引，不是新漏洞，也不是已遭利用的证据。
