---
title: HPE 修复 ArubaOS 的 72 个漏洞，其中八个认证绕过及 RCE 漏洞评分达 CVSS 10
summary: HPE 公告 HPESBNW05162 修复 AOS-8 和 AOS-10 的 72 个 CVE，其中八个评分为 CVSS 10.0，攻击路径包括未经认证的管理接口和 PAPI。HPE 在披露时尚不知有公开利用代码。
splash: 可访问的 AOS-8 / AOS-10 接口；部分 RCE 路径还依赖尚未具体说明、不受攻击者控制的前置条件
wipe: 按分支安装 AOS 10.8.1.2 / 10.7.2.7 / 10.4.1.14 / 8.13.3.1 / 8.10.0.24，并隔离管理接口
inTheWildNote: HPE 尚不知有公开利用代码；公告未证实在野利用
cves:
- name: AOS-10 认证绕过导致 RCE
  description: 某些不受攻击者控制的前置条件尚未具体说明。
- name: AOS-10 PAPI 认证绕过
  description: 未经认证的访问可获得管理控制权。
- name: AOS-8 命令注入
  description: 某些不受攻击者控制的前置条件尚未具体说明。
- name: AOS-10 缓冲区溢出
  description: 构造的数据包可执行高权限代码。
- name: AOS-8 SQL 注入导致 RCE
  description: 未经认证的 SQL 注入可执行操作系统命令。
- name: AOS-8 SQL 注入导致 RCE
  description: 未经认证的 SQL 注入可执行操作系统命令。
- name: AOS-8 认证绕过导致 RCE
  description: 未经认证的绕过可用 root 身份执行命令。
- name: AOS-10 缓冲区溢出
  description: 未经认证的输入可执行高权限代码。
fixed:
- status: 已修复
- status: 已修复
- status: 已修复
- status: 已修复
- status: 已修复
timeline:
- date: 2026年10月22日
  title: HPE 发布 HPESBNW05162 第 1 版
  body: 修复涵盖 72 个 CVE；此处列出八个满分漏洞。
checklist:
- title: 升级所有受影响的控制器、conductor、网关和接入点
  hint: 将已安装的 AOS 系列与上方五个版本对应；软件包和各版本指引见 HPE 支持门户
- title: 限制管理访问并检查协议暴露
  hint: 将 CLI 和 Web 管理放在专用 VLAN 或防火墙策略后；清点 PAPI 暴露，包括公告说明的 UDP 8211 路径
- title: 替换不受支持的软件并保留审计日志
  hint: HPE 假定已结束维护的版本受影响，尚未评估已结束支持的版本；迁移至受支持版本，并启用活动审计
sources:
- name: HPE HPESBNW05162 签名文本
  says: 厂商原始公告：CVE、前置条件、修复版本及缓解措施
- name: HPE 支持门户
  says: 公告规范页面；门户无法呈现内容，因此阅读了签名文本
- name: 加拿大网络安全中心 AV26-1079
  says: 10月22日的通知独立列出相同的五个版本界限
---

这批企业无线基础设施补丁按紧急程度评为 L3。影响取决于接口和产品：部分路径需要相邻网络访问或特定权限，而八个满分 CVE 包含未经认证的网络攻击。HPE 未具体说明某些前置条件；严重性评分本身不能证明所有部署都可远程利用。

表中列出的是八个 CVSS 10.0 漏洞，并非全部 72 个。其他 HPE 产品不属于本公告范围，但不受支持的 AOS 版本仍需处理。这也不同于 HPE 的 [ClearPass PHP2Shell 公告](/zh/incidents/php2shell/)。
