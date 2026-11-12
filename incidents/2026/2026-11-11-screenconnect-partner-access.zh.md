---
title: ScreenConnect 合作伙伴环境遭攻击，厂商停用五款扩展
summary: ConnectWise 正在调查合作伙伴账户遭未经授权访问及客户环境出现异常远程访问软件的事件。厂商在约 400 个合作伙伴环境中预防性停用五款第三方扩展。初始入口和完整范围仍在调查。
splash: 装有公告所列五款第三方扩展的 ScreenConnect 合作伙伴，包括本地部署。技术人员工作站也可能需要调查。
wipe: 停用五款扩展，使用独立工具调查，并从可信设备吊销会话。
inTheWildNote: ConnectWise 报告合作伙伴遭未经授权访问，并出现异常远程访问软件部署。
timeline:
- date: 11月11日 22:45 UTC
  title: ConnectWise 发布预防性指引
  body: 厂商列出五款扩展及托管和本地部署合作伙伴的处置步骤。
checklist:
- title: 核验并停用五款扩展
  hint: 核查 Labtech Plus、RMM Plus、RMM+、RMM Plus Password Link 和 RMM+ Password Link。保留安装及活动记录。本地部署合作伙伴须自行停用，后续指引发布前保持停用。
- title: 使用独立工具并保护管理访问
  hint: 避免对疑似失陷设备开启 ScreenConnect 交互会话。用独立应急工具排查，从可信设备吊销活动的 ScreenConnect 和身份提供商会话、重置相关密码并强制启用 MFA。
- title: 保留证据并遏制受影响设备
  hint: 保留认证、扩展安装、管理、Run Command 和 Toolbox 日志。排查异常用户、权限变更、部署和命令。隔离可疑终端及技术人员工作站，在移除软件前保留证据，确认处置完成后再恢复连接。
- title: 核验远程访问组件维护状态
  hint: 按厂商当前指引核查服务器、技术人员客户端和终端 Agent。更新软件后仍需独立排查及处置疑似失陷。
sources:
- name: ConnectWise 11 月 11 日 ScreenConnect 公告
  says: 列出五款停用扩展、装有至少一款的约 400 个环境、疑似攻击行为及合作伙伴处置步骤。
---

ConnectWise 称这些扩展可能与攻击有关。约 400 个环境装有至少一款扩展。厂商尚未确定实际失陷环境数量、初始入口或 CVE。公司正在调查攻击者是否利用扩展部署额外远程访问，以及交互连接是否使技术人员工作站暴露。停用扩展属于遏制措施，仍需排查持久化。本事件与 [Cloud Backup 事件](/zh/incidents/connectwise-cloud-backup/)不同。
