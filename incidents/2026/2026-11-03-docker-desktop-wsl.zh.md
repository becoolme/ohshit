---
title: Docker Desktop 4.98 修复内核 TCP 漏洞及 WSL 2 通信限制绕过
summary: Docker Desktop 4.98.0 修复 Linux IPv4 TCP 释放后重用漏洞 CVE-2026-98432，以及容器在 WSL 2 后端绕过 AF_VSOCK 限制的 CVE-2026-112917。后者还要求 WSL 3.0.3 或更新版本；只升级 Desktop 不足。公告没有声称在野利用或主机逃逸。
splash: 使用受影响 VM 网络路径的 Docker Desktop；AF_VSOCK 问题特定于 Windows 的 WSL 2 后端容器
wipe: 升级 Docker Desktop 至 4.98.0；WSL 2 用户还须更新 WSL 至 3.0.3 或更新版本并核验
inTheWildNote: 厂商发版说明未报告在野利用。
cves:
- name: Linux IPv4 TCP 释放后重用
  description: Docker 将 Linux TCP 内核修复纳入 4.98.0。底层漏洞在 10 月 15 日已公开；本条记录的是 Desktop 修复批次。
- name: WSL 2 AF_VSOCK 限制绕过
  description: WSL 2 后端的容器可绕过通信限制；修复须同时具备 Desktop 4.98.0 和 WSL 3.0.3 或更新版本。公告未给出完整受影响起始版本。
fixed:
- product: Docker Desktop
- status: WSL 2 后端修复的额外要求
timeline:
- date: 2026年10月15日
  title: Linux 发布底层 TCP 漏洞记录
- date: 2026年11月3日
  title: Docker Desktop 4.98.0 发布两项修复
checklist:
- title: 核验 Desktop 应用版本
  hint: 从官方更新渠道安装 4.98.0 或更新版本，并检查应用中的版本。docker CLI 或 Engine 版本不能代替 Desktop 应用版本；分阶段推送可能延迟更新显示。
- title: 同时更新 WSL 并核对后端
  hint: Windows WSL 2 后端用户运行 wsl --update，再用 wsl --version 确认至少 3.0.3；按更新提示重启 Desktop 或主机。不要将发行版里的 Linux 软件包版本当成 WSL 版本。
sources:
- name: Docker Desktop 4.98.0 发版说明
  says: 11 月 3 日两项 CVE 修复与 WSL 3.0.3 依赖。
- name: Linux CNA TCP 漏洞记录
  says: 底层漏洞 10 月 15 日公开；解释 IPv4 TCP 选项生命周期竞态，不是新披露的 Linux 漏洞。
---

这是与 [10 月 Desktop 修复批次](/zh/incidents/docker-desktop-october/)不同的漏洞及发版，不能把旧批次首次修复版本从 4.97.0 改成 4.98.0。L3 依据是主流开发工具的内核及隔离边界问题，而非已确认攻击。

AF_VSOCK 是主机与虚拟机之间的通信机制。厂商仅称容器可绕过限制，未说明完整后果、受影响起始版本、可替代升级的缓解措施或已成功逃逸主机。本次核查该 CVE 的公开 CNA API 返回 404；编号及修复依赖来自已直接核阅的 Docker 原始发版说明。不要把另一事件 CVE-2025-9074 的主机访问后果套用到这里。只更新 Linux 容器镜像或 WSL 内发行版软件包不能证明已完成 Desktop/WSL 修复。
