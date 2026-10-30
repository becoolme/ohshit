---
title: 恶意 GitHub Issue 和 PR 文本在两个 Actions 工作流中触发 Shell 命令执行
tags: [GitHub Actions, 供应链, 命令注入]
summary: Radware 发现针对 61 个仓库的 83 条恶意内容，并在两个 Actions 工作流中找到命令执行证据。9 月的攻击利用了将 Issue 或 PR 文本直接插入 Shell 脚本的不安全写法；尚未证实下游软件被篡改。
splash: 将外部可控的标题、正文或评论直接插入 Shell 代码的 Actions 工作流
wipe: 停用不安全工作流，将不可信文本作为数据传递，收紧任务权限，并轮换已执行载荷可接触的凭据
inTheWildNote: Radware 报告两个 9 月工作流存在执行证据，并非 61 个项目均被攻破。
cves: []
fixed: []
timeline:
  - date: 2026年9月1日
    title: 两轮攻击投递恶意 GitHub 内容
  - date: 2026年10月29日
    title: Radware 发布攻击活动及执行证据分析
checklist:
  - title: 重新运行任务前停用不安全的插值
    hint: 审查 .github/workflows 中将事件文本嵌入 run 块的写法。通过步骤级环境变量和带引号的参数传递数据，不要使用 eval。将不可信事件与特权任务分离，只授予必要权限。
  - title: 排查历史执行记录
    hint: 从 9 月 1 日起检索发往 54.205.16.142:8443/c/ 的 HTTP POST，以及路径后缀 047199962bc6404c171317902a0d012c、91dad78d29e61a903a7e6d0af93270ca 和 f404c64b3e1dabb51ec61d91efa5c3b7。检查原始 Markdown、命令替换警告和运行器出站流量。仅命中指标不能证明入侵。
  - title: 吊销已执行任务能够接触的凭据
    hint: 保存日志，清点可访问的 GitHub、云、部署和软件仓库凭据，从可信环境轮换，并检查仓库及服务商审计日志中的滥用。任务能接触哪些密钥取决于具体配置。
sources:
  - name: Radware 原始攻击活动分析
  - name: GitHub Actions 安全使用参考
---

只有存在漏洞的自动化处理这些不可信文本时，投递内容才足以触发攻击；无需合并 PR。Radware 在 PX4/PX4-Autopilot 和 Snouzy/workout-cool 中发现执行证据。数量来自研究人员调查，本站未独立核实。密钥成功送达、仓库写权限被获取及下游发布被篡改均未确认。报告公布了三个收集路径示例，并非全部 83 个标识符；未命中这些示例不能证明工作流安全。
