---
title: Docker Desktop 修复 TCP/WSL 漏洞，GKE 补充 TCP 逃逸处置
summary: Desktop 4.98.0 修复 CVE-2026-98432 及 WSL 2 AF_VSOCK 绕过 CVE-2026-112917，WSL 另需 3.0.3+。Google 现公布 GKE 的 TCP 容器逃逸风险及五个 COS 修复构建；GKE 1.37/Ubuntu 修复仍在进行。这些 GKE 后果不代表已证明 Desktop 主机逃逸或在野利用。
splash: 使用受影响内核的 Docker Desktop/WSL 2，以及 COS 或 Ubuntu 镜像的 GKE Standard/Autopilot 集群
wipe: 更新 Desktop 至 4.98.0、WSL 至 3.0.3+；GKE 按 GCP-2026-078 更新控制平面及节点，并限制 TCP 暴露
inTheWildNote: 厂商发版说明未报告在野利用。
cves:
- name: Linux IPv4 TCP 释放后重用
  description: Docker 将 Linux TCP 内核修复纳入 4.98.0。底层漏洞在 10 月 15 日已公开；本条记录的是 Desktop 修复批次。 Google 11 月 4 日 GKE 公告另说明节点 root/容器逃逸、内核崩溃后果，本地无特权进程可触发，网络攻击需能访问 TCP 监听端口。
- name: WSL 2 AF_VSOCK 限制绕过
  description: WSL 2 后端的容器可绕过通信限制；修复须同时具备 Desktop 4.98.0 和 WSL 3.0.3 或更新版本。公告未给出完整受影响起始版本。
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
timeline:
- date: 2026年10月15日
  title: Linux 发布底层 TCP 漏洞记录
- date: 2026年11月3日
  title: Docker Desktop 4.98.0 发布两项修复
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
sources:
- name: Docker Desktop 4.98.0 发版说明
  says: 11 月 3 日两项 CVE 修复与 WSL 3.0.3 依赖。
- name: Linux CNA TCP 漏洞记录
  says: 底层漏洞 10 月 15 日公开；解释 IPv4 TCP 选项生命周期竞态，不是新披露的 Linux 漏洞。
- name: Microsoft WSL 命令文档
  says: 说明 wsl --update、wsl --version 及 PowerShell/命令提示符运行环境。
- name: Google GKE GCP-2026-078 原始公告
  says: 11 月 4 日 TCP 利用前提、Standard/Autopilot 范围、五个 COS 阈值、GKE 1.37/Ubuntu 待修复及控制平面/节点升级指引。
---

这是与 [10 月 Desktop 修复批次](/zh/incidents/docker-desktop-october/)不同的漏洞及发版，不能把旧批次首次修复版本从 4.97.0 改成 4.98.0。L3 依据是主流开发工具的内核及隔离边界问题，而非已确认攻击。

AF_VSOCK 是主机与虚拟机之间的通信机制。厂商仅称容器可绕过限制，未说明完整后果、受影响起始版本、可替代升级的缓解措施或已成功逃逸主机。本次核查该 CVE 的公开 CNA API 返回 404；编号及修复依赖来自已直接核阅的 Docker 原始发版说明。不要把另一事件 CVE-2025-9074 的主机访问后果套用到这里。只更新 Linux 容器镜像或 WSL 内发行版软件包不能证明已完成 Desktop/WSL 修复。

**11 月 4 日 GKE 部署更新：** Google GCP-2026-078 涉及 GKE Standard 及 Autopilot 上的同一 Linux TCP CVE。Google 描述内核崩溃或容器逃逸并在节点以 root 执行代码。容器进程无需特殊能力；网络路径则要求能访问节点、Pod 或控制平面 IP 端点的 TCP 监听端口，并发送带 IPv4 选项的报文。可信来源限制可处理网络路径，不能消除容器本地路径。

Google 给出上表五个 Container-Optimized OS 阈值，要求同时升级控制平面及节点。GKE 1.37 和 Ubuntu 节点镜像补丁仍在进行。这些特定部署后果不能证明 Desktop 可逃逸主机，不改变 WSL 绕过的已说明范围，也不能确立另一 Northflank 事件的原因。未新增在野利用主张，继续保留主流内核/隔离修复、未核实攻击的 L3 评级。
