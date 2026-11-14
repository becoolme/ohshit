---
title: CodeWhale 修复 Shell 命令和定时任务的两处审批绕过
summary: CodeWhale 0.9.0 修复两处漏洞。精心构造的工具调用可跳过默认交互式 Agent 配置中的 Shell 审批。用户批准创建定时任务后，若省略 auto_approve，后续工具调用也可能跳过审批。
splash: CodeWhale 0.8.67 及更早版本，Agent 读取攻击者控制的内容，或用户批准创建受攻击者影响的定时任务时
wipe: 升级到 0.9.0 或更高版本，并检查现有定时任务及 Shell 执行记录。
inTheWildNote: 维护者公告提供了 PoC，在野利用尚未证实。
cves:
  - name: 交互式 Shell 审批绕过
    description: 只读判定忽略了 fd、rg 和 git grep 可用于启动程序的参数。
  - name: 定时任务自动审批
    description: 创建自动化任务时省略 auto_approve，可能使后续改写操作无需提示即可获准。
fixed:
  - product: CodeWhale
timeline:
  - date: 2026年11月12日
    title: 维护者公开两项审批绕过公告
    body: 两项公告均列明 0.8.67 及更早版本受影响，0.9.0 已修复。
checklist:
  - title: 升级所有 CodeWhale 安装
    hint: 核对 npm 的 codewhale、Rust 的 codewhale-tui 以及独立二进制的已安装版本。让 Agent 处理不可信输入前，将各处安装升级到 0.9.0 或更高版本。
  - title: 检查并暂停异常定时任务
    hint: 核对任务提示词、调度时间、auto_approve 和 allow_shell。停用来源不明的任务，并关闭不需要的自动审批和 Shell 权限。
  - title: 调查异常的本地执行
    hint: 检查工具调用和进程记录，查找启动子程序的搜索命令，以及超出预期范围写入的定时任务。如发现未授权活动，保全证据并吊销受影响进程可以访问的凭据。
sources:
  - name: CodeWhale 交互式 Shell 公告
    says: 列出受影响的软件包、修复版本及间接提示注入的复现过程。
  - name: CodeWhale 自动化任务公告
    says: 说明省略 auto_approve 的影响及定时任务执行 Shell 的额外条件。
---

在默认交互式 Agent 配置下，仓库、Issue 或抓取页面中由攻击者控制的文本可诱导 CodeWhale 调用 Shell 工具。CodeWhale 根据命令名称将部分搜索命令判为只读。报告者证明，这些命令支持可启动其他程序的参数，能以 Agent 进程权限执行并跳过审批提示。

第二处漏洞要求用户批准创建自动化任务。如果创建调用省略 `auto_approve`，受影响版本会在后续运行中自动审批工具调用，可能允许工具写入文件或修改仓库。定时任务要执行 Shell，还须启用 `allow_shell`。两项公告均提供概念验证步骤，并将 0.9.0 列为首个修复版本。
