---
title: TCP 修复范围从 Docker Desktop、GKE 扩展至 XenServer 主机及设备
summary: Desktop 4.98.0 和 WSL 3.0.3+ 要求继续适用；GKE 有五个 COS 阈值，1.37/Ubuntu 补丁待发布。Citrix 现列出同一 TCP CVE 可从管理网络影响 XenServer 8.4/9 主机，另有来宾及 PXE 漏洞。应用主机渠道更新、WLB 2026.1.1+ 和 Conversion Manager 2026.2.0；未主张已核实攻击。
splash: 受影响的 Desktop/WSL、GKE，以及有管理网络、来宾或 PXE 暴露的 XenServer 8.4/9 主机、WLB 和 Conversion Manager。
wipe: Desktop 4.98.0 + WSL 3.0.3+；GKE 按 GCP-2026-078；XenServer 渠道更新、WLB 2026.1.1+、Conversion Manager 2026.2.0。
inTheWildNote: 厂商发版说明未报告在野利用。
cves:
- name: Linux IPv4 TCP 释放后重用
  description: Docker 将 Linux TCP 内核修复纳入 4.98.0。底层漏洞在 10 月 15 日已公开；本条记录 Desktop 修复及相关 GKE 指引。 Google 11 月 4 日 GKE 公告另说明节点 root/容器逃逸、内核崩溃后果，本地无特权进程可触发，网络攻击需能访问 TCP 监听端口。
- name: WSL 2 AF_VSOCK 限制绕过
  description: WSL 2 后端的容器可绕过通信限制；修复须同时具备 Desktop 4.98.0 和 WSL 3.0.3 或更新版本。公告未给出完整受影响起始版本。
- name: Xen 来宾 grant-copy 内存访问
  description: Citrix 列出需特权来宾用户的主机入侵。Xen XSA-523 说明页帧编号与 grant 引用混淆，可使恶意来宾读取或写入其他域的内存，包括 Dom0。
- name: XenServer PXE 或来宾 Secure Boot 漏洞
  description: Citrix 将此编号与一组漏洞并列：同一网络上的未认证攻击者可在 VM 初始 PXE 启动时入侵，或来宾管理员可绕过该来宾的 Secure Boot 策略。公告未逐一对应每个编号与具体后果。
- name: XenServer PXE 或来宾 Secure Boot 漏洞
  description: Citrix 将此编号与一组漏洞并列：同一网络上的未认证攻击者可在 VM 初始 PXE 启动时入侵，或来宾管理员可绕过该来宾的 Secure Boot 策略。公告未逐一对应每个编号与具体后果。
- name: XenServer PXE 或来宾 Secure Boot 漏洞
  description: Citrix 将此编号与一组漏洞并列：同一网络上的未认证攻击者可在 VM 初始 PXE 启动时入侵，或来宾管理员可绕过该来宾的 Secure Boot 策略。公告未逐一对应每个编号与具体后果。
- name: XenServer PXE 或来宾 Secure Boot 漏洞
  description: Citrix 将此编号与一组漏洞并列：同一网络上的未认证攻击者可在 VM 初始 PXE 启动时入侵，或来宾管理员可绕过该来宾的 Secure Boot 策略。公告未逐一对应每个编号与具体后果。
- name: XenServer PXE 或来宾 Secure Boot 漏洞
  description: Citrix 将此编号与一组漏洞并列：同一网络上的未认证攻击者可在 VM 初始 PXE 启动时入侵，或来宾管理员可绕过该来宾的 Secure Boot 策略。公告未逐一对应每个编号与具体后果。
- name: XenServer PXE 或来宾 Secure Boot 漏洞
  description: Citrix 将此编号与一组漏洞并列：同一网络上的未认证攻击者可在 VM 初始 PXE 启动时入侵，或来宾管理员可绕过该来宾的 Secure Boot 策略。公告未逐一对应每个编号与具体后果。
fixed:
- product: Docker Desktop
- status: WSL 2 后端修复的额外要求
- product: GKE 1.36 Container-Optimized OS
  status: 升级控制平面及节点；不适用于 Ubuntu 镜像
- product: GKE 1.35 Container-Optimized OS
  status: 升级控制平面及节点；不适用于 Ubuntu 镜像
- product: GKE 1.34 Container-Optimized OS
  status: 升级控制平面及节点；不适用于 Ubuntu 镜像
- product: GKE 1.33 Container-Optimized OS
  status: 升级控制平面及节点；不适用于 Ubuntu 镜像
- product: GKE 1.32 Container-Optimized OS
  status: 升级控制平面及节点；不适用于 Ubuntu 镜像
- product: GKE 1.37 / Ubuntu 节点镜像
  status: 补丁仍在进行，公告尚未给出已修复构建
- product: XenServer Workload Balancing
  status: 修复设备的 TCP 漏洞；仍需应用主机更新
- product: XenServer Conversion Manager
  status: 修复设备的 TCP 漏洞；仍需应用主机更新
timeline:
- date: 2026年10月15日
  title: Linux 发布底层 TCP 漏洞记录
- date: 2026年11月3日
  title: Docker Desktop 4.98.0 发布两项修复
- date: 2026年11月3日
  title: Citrix 公布 XenServer 主机及设备处置
  body: CTX697256 涉及同一 TCP CVE 及来宾 grant-copy、PXE/Secure Boot 漏洞。8.4/9 两个更新渠道均有主机修复；WLB 2026.1.1 和 Conversion Manager 2026.2.0 修复各自 TCP 暴露。
- date: 2026年11月4日
  title: Google 为相同 TCP CVE 发布 GCP-2026-078
  body: Standard 及 Autopilot 受影响。列出五个 COS 修复阈值，GKE 1.37 和 Ubuntu 镜像补丁仍在进行。这是平台处置更新，不是底层 CVE 首次披露。
checklist:
- title: 核验 Desktop 应用版本
  hint: 从官方更新渠道安装 4.98.0 或更新版本，并检查应用中的版本。docker CLI 或 Engine 版本不能代替 Desktop 应用版本；分阶段推送可能延迟更新显示。
- title: 同时更新 WSL 并核对后端
  hint: Windows WSL 2 后端用户在 PowerShell 或命令提示符运行 wsl --update，再用 wsl --version 确认至少 3.0.3；按更新提示重启 Desktop 或主机。不要将发行版里的 Linux 软件包版本当成 WSL 版本。
- title: 更新 GKE 控制平面及每个受影响节点池
  hint: 在 GKE 控制台核查控制平面、节点版本及节点镜像类型。按上表 GCP-2026-078 对应 COS 构建或更新版本升级控制平面及节点，完成后核对实际版本。公告允许同一 minor 版本使用较新发布渠道的补丁。不能将 COS 阈值套用于 Ubuntu 节点；GKE 1.37 及 Ubuntu 修复仍在进行，应跟进公告或支持确认已发布构建。
- title: 等待升级期间限制 GKE TCP 可达范围
  hint: 通过防火墙及控制平面授权网络，将节点、Pod 和控制平面 IP 端点的 TCP 监听端口限制为可信来源。Google 称可消除网络攻击暴露，但容器内无特权进程无需 CAP_NET_RAW 仍可本地触发，防火墙不能消除该路径。检查不可信工作负载访问并升级承载内核的节点，不能只更新应用镜像。
- title: 通过受支持的更新工具修补 XenServer 主机
  hint: 盘点 XenServer 8.4/9 资源池及管理网络。Citrix 已向 Early Access 和 Normal 两个渠道推送修复；使用 XenCenter 或 xe CLI，同步并为每台主机应用所选渠道的最新累积更新，完成工具要求的更新后操作并核验已安装更新。隔离资源池可在联网设备下载官方离线包，再按文档传输、上传并应用。不要直接修改 dom0 底层更新组件。安排更新期间限制管理网络访问；这不能处理独立的恶意来宾路径。
- title: 更新 XenServer 管理设备并审查来宾暴露
  hint: 从 XenServer Downloads 获取 Workload Balancing 2026.1.1 或更高版本、Conversion Manager 2026.2.0，并与主机更新分开核实版本。CTX697256 将 TCP 路径限定在管理网络；来宾到主机问题需特权来宾访问，PXE/Secure Boot 组则需同网络启动阶段或来宾管理员条件。审查谁能管理来宾及访问 PXE 网络。XSA-523 对 grant-copy 漏洞没有已知缓解方法，网络隔离不能替代主机补丁。所引公告没有公布专用攻击指标或确认受害人数。
sources:
- name: Docker Desktop 4.98.0 发版说明
  says: 11 月 3 日两项 CVE 修复与 WSL 3.0.3 依赖。
- name: Linux CNA TCP 漏洞记录
  says: 底层漏洞 10 月 15 日公开；解释 IPv4 TCP 选项生命周期竞态，不是新披露的 Linux 漏洞。
- name: Microsoft WSL 命令文档
  says: 说明 wsl --update、wsl --version 及 PowerShell/命令提示符运行环境。
- name: Google GKE GCP-2026-078 原始公告
  says: 11 月 4 日 TCP 利用前提、Standard/Autopilot 范围、五个 COS 阈值、GKE 1.37/Ubuntu 待修复及控制平面/节点升级指引。
- name: Citrix XenServer CTX697256 安全公告
  says: 11 月 3 日厂商批次列出八个 CVE，区分管理网络、来宾及 PXE 前提，说明两条主机版本线及设备阈值。两个主机渠道都有修复；未说明已核实攻击或主机构建门槛。
- name: XenServer 8.4 主机更新指南
  says: 通过 XenCenter 或 xe 使用累积渠道及离线更新；不支持直接修改 dom0 底层更新组件。
- name: XenServer 9 主机更新指南
  says: 另一条受影响版本线的主机、资源池渠道及离线更新流程。
- name: Xen XSA-523 grant-copy 公告
  says: 11 月 3 日公开公告解释 CVE-2026-102703 及独立的 CVE-2026-102704、跨域任意内存访问（含 Dom0）、受影响 Xen 版本及无已知缓解方法。Citrix 所引批次只列出两者中的 CVE-2026-102703。
---

这是与 [10 月 Desktop 修复批次](/zh/incidents/docker-desktop-october/)不同的漏洞及发版，不能把旧批次首次修复版本从 4.97.0 改成 4.98.0。L3 依据是主流开发工具的内核及隔离边界问题，而非已确认攻击。

AF_VSOCK 是主机与虚拟机之间的通信机制。厂商仅称容器可绕过限制，未说明完整后果、受影响起始版本、可替代升级的缓解措施或已成功逃逸主机。本次核查该 CVE 的公开 CNA API 返回 404；编号及修复依赖来自已直接核阅的 Docker 原始发版说明。不要把另一事件 CVE-2025-9074 的主机访问后果套用到这里。只更新 Linux 容器镜像或 WSL 内发行版软件包不能证明已完成 Desktop/WSL 修复。

**11 月 4 日 GKE 部署更新：** Google GCP-2026-078 涉及 GKE Standard 及 Autopilot 上的同一 Linux TCP CVE。Google 描述内核崩溃或容器逃逸并在节点以 root 执行代码。容器进程无需特殊能力；网络路径则要求能访问节点、Pod 或控制平面 IP 端点的 TCP 监听端口，并发送带 IPv4 选项的报文。可信来源限制可处理网络路径，不能消除容器本地路径。

Google 给出上表五个 Container-Optimized OS 阈值，要求同时升级控制平面及节点。GKE 1.37 和 Ubuntu 节点镜像补丁仍在进行。这些特定部署后果不能证明 Desktop 可逃逸主机，不改变 WSL 绕过的已说明范围，也不能确立另一 Northflank 事件的原因。未新增在野利用主张，继续保留主流内核/隔离修复、未核实攻击的 L3 评级。

**11 月 5 日 XenServer 跟进：** Citrix 11 月 3 日的 CTX697256 涉及已列出的 TCP CVE，范围包括 **XenServer 8.4 和 XenServer 9**，以及 **2026.1.1** 之前的 Workload Balancing 和 **2026.2.0** 之前的 Conversion Manager。所述主机／设备入侵要求未认证攻击者能够访问**管理网络**，厂商没有将其描述为任意互联网访问。须应用所选主机渠道的最新累积更新，并更新管理设备。设备版本阈值不能代替虚拟化主机补丁；公告没有给出单一主机修复构建号。

同一厂商批次还列出 **CVE-2026-102703**，特权来宾用户可能借此入侵主机。上游 XSA-523 描述 grant-copy 验证错误，可使恶意来宾读取或写入其他域的内存，包括 Dom0，没有已知缓解方法。XSA-523 另涉及 CVE-2026-102704，但所引 Citrix 公告没有列出该编号，因此不在此推断它对 XenServer 的适用性。

另六个编号——**CVE-2026-97631、CVE-2026-45447、CVE-2024-38797、CVE-2024-38796、CVE-2022-36764 和 CVE-2022-36763**——被归为同一网络未认证攻击者在 VM 初始 PXE 网络启动时入侵，或来宾管理员绕过该来宾的 Secure Boot 策略。这些前提及后果各不相同，不能写成八个未认证主机接管漏洞。所引来源未确立 XenServer 已遭利用或受害人数。原有 L3、Desktop/WSL 要求、五个 GKE COS 阈值及待发布的 GKE 1.37/Ubuntu 修复继续适用；XenServer 处置不能证明 Docker 逃逸，也不能确立 Northflank 入侵原因。
