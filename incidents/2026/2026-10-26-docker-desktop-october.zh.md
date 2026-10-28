---
title: Docker Desktop 4.97.0 修复凭据日志泄露及虚拟机网络漏洞
tags:
- Docker
- 凭据
- 虚拟化
summary: Docker Desktop 4.97.0 修复第三方凭据被写入日志的问题，以及容器可触发的内核网络漏洞。该版本还清理已有宿主日志及崩溃转储；先前复制或分享的诊断文件仍须另行清理。
splash: 4.97.0 之前的 Docker Desktop；可读取日志或诊断文件，或容器可访问受影响虚拟机网络路径
wipe: 升级 Docker Desktop 至 4.97.0，清理诊断副本，并轮换已暴露的第三方凭据
inTheWildNote: Docker 发布说明未报告恶意利用。
cves:
- name: 第三方凭据以明文进入日志
  description: Docker CNA 列明受影响版本从 4.39.0 起、低于 4.97.0。IPC 脱敏不足，日志或诊断包的读取者可能取得第三方 API 密钥及 OAuth 令牌；这些不是 Docker 账号令牌。
- name: 虚拟机网络栈破坏
  description: 容器可通过 TUN 或 AF_PACKET 滥用错误的 IPv4 校验和元数据，破坏虚拟机网络栈；发布说明未证实可逃逸到宿主。
fixed:
- product: Docker Desktop
  status: 包括已有宿主日志及崩溃转储清理
timeline:
- date: 2026年10月15日
  title: Linux 公布底层内核 CVE
- date: 2026年10月26日
  title: Docker Desktop 4.97.0 发布
- date: 2026年10月27日
  title: Docker 发布凭据漏洞的 CVE 记录
checklist:
- title: 确认 Desktop 应用版本
  hint: 通过 Docker 官方发布渠道升级，在 Docker Desktop 中确认版本为 4.97.0。单独的 docker 客户端或 Engine 版本不能识别 Desktop 应用构建。
- title: 查找导出的日志及诊断文件
  hint: 删除或清理由 4.96.x 及更早版本生成或分享的诊断包，以及其他位置的日志副本。4.94.0/4.95.0 对已知日志路径的修改可能留下历史凭据。
- title: 若凭据暴露，予以吊销
  hint: 通用处置建议：核实哪些主体可读取相关文件，吊销或轮换暴露的第三方 API 密钥、OAuth 令牌，并检查服务商活动。清理前保留必要证据。
sources:
- name: Docker 安全公告
  says: 两项修复及历史诊断文件清理要求。
- name: Docker Desktop 4.97.0 发布说明
  says: 10 月 26 日发布；区分凭据日志泄露与虚拟机网络栈破坏。
- name: Docker CNA 凭据漏洞记录
  says: 受影响 Desktop 范围从 4.39.0 起；10 月 27 日 CVE 公开晚于发行版发布。
- name: Linux CNA 网络校验和记录
  says: 底层内核 CVE 已于 10 月 15 日公开；10 月 26 日是 Desktop 修复批次。
---

主流开发工具的安全边界存在缺陷，因此评为 L3。现有材料未证实宿主被接管，也没有受害者总数。独立的 [eMudhra 信任库处置](/zh/incidents/emudhra-ca/)仍需关注；本次发布批次涉及不同漏洞。

内核漏洞在此 Desktop 版本之前已公开；本条记录针对 10 月 26 日的 Desktop 修复批次，不代表发现了新的 Linux 漏洞。
