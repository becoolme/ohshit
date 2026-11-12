---
title: SignDrop 概念验证利用 Windows CLFS 身份验证获取 SYSTEM 权限
summary: 研究者发布了本地提权概念验证，利用 CLFS 验证文件的创建过程及 Defender 的特权操作。研究者报告在部分 Windows 11 26H2 和 Windows Server 2025 构建上完成测试。
splash: 攻击者能执行本地代码且 CLFS 身份验证处于学习或强制模式的 Windows 主机，模式范围来自研究者。
wipe: 清点 CLFS 身份验证模式，保持现有保护开启，并关注 Microsoft 确认的修复。
inTheWildNote: 研究者公开了概念验证。已查阅的来源未证实在野攻击。
timeline:
- date: 2026年11月10日
  title: 研究者发布 SignDrop 仓库和技术说明
  body: 公开仓库历史记录显示材料于 11 月 10 日 UTC 发布。研究者报告一条本地提权至 SYSTEM 的路径。
checklist:
- title: 无需运行概念验证即可清点 CLFS 模式
  hint: 通过终端资产清单或 reg query 读取 HKLM\SYSTEM\CurrentControlSet\Services\CLFS\Authentication 下的 Mode。Microsoft 定义 0 为强制、1 为学习，研究者报告这两种模式相关。缺少该值、其他值和其他构建需单独评估。
- title: 减少本地执行暴露并调查可疑权限变化
  hint: 用现有应用控制限制不可信程序运行。检查 EDR 进程和文件遥测，寻找异常 SYSTEM 执行、相关 CLFS 日志及 .cnpf 验证文件及安全工具变更。关联事件序列后再判定是否失陷，并保留可疑活动证据。
- title: 保留 CLFS 保护并跟踪 Microsoft 指引
  hint: 保持 CLFS 身份验证和终端保护开启。Microsoft 说明该保护有助于在解析日志之前防止篡改。跟踪 Microsoft 安全更新指南，厂商发布修复后进行验证。
sources:
- name: SignDrop 研究者仓库
  says: 给出研究者报告的攻击链、前提和测试情况。
- name: Microsoft CLFS 身份验证文档
  says: 定义模式取值并说明该保护的作用。
---

研究者描述了 clfs.sys 的文件创建问题。普通本地用户准备 CLFS 日志及关联容器后，诱使 Defender 的特权操作打开它。该利用链通过在特权上下文创建 CLFS 验证文件来演示 SYSTEM 执行。公开说明列出的测试目标包括 Windows 11 26H2、Windows 11 26H2 Experimental 和 Windows Server 2025 Experimental。

模式检查是研究者提供的初筛线索。现有资料无法确定所有受影响构建或装机占比。本轮未核实到 Microsoft 为 SignDrop 分配 CVE 或公布专用修复构建的公告。Microsoft 的 CLFS 文档说明了既有保护措施，包括系统首次以相关驱动版本启动时开始的学习期。Microsoft 将 2 和 3 定义为禁用模式。评估研究者的说法时，请保持现有保护开启。
