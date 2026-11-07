---
title: GitHub 仿冒安全工具植入 Windows 后门、剪贴板劫持程序和窃密木马
tags: [GitHub, Windows, 供应链]
summary: Doctor Web 发现伪装成安全工具和区块链游戏工具的恶意 GitHub 项目。打开或构建受影响的 Visual Studio 项目，或运行恶意脚本，可能触发 Windows 恶意软件链。研究人员报告整场活动中有超过 2,000 台电脑感染。
splash: 打开、构建或执行恶意 GitHub 项目代码的 Windows 用户和构建环境。
wipe: 隔离可疑主机并保留证据，重建确认感染的系统，并在干净系统上吊销暴露的凭据。
inTheWildNote: Doctor Web 报告整场活动中有超过 2,000 台电脑感染。
timeline:
  - date: 2026年11月5日
    title: Doctor Web 公布感染链
    body: 研究人员识别出安全工具和区块链主题的诱饵，报告超过 2,000 台电脑感染，并公布样本指标。
checklist:
  - title: 停止运行相关项目并隔离可疑系统
    hint: 将可疑 Windows 主机和构建执行器断网，并停止相关任务。保留克隆副本及提交号、项目和构建日志、进程和网络遥测以及可疑文件。检查主机能够访问哪些密钥和内部系统。
  - title: 排查仓库、执行痕迹及网络证据
    hint: 检查 .suo 文件、.csproj 预构建钩子及藏在 Python 或 Go 代码行很远处的异常代码。排查 PowerShell 创建 C:\Users\Public\Pictures\t.ps1 或 L.ps1，或将 Quixo.7z 解包至 C:\ProgramData\Windows.Microsoft.Photos 的活动。按哈希核查 Microsoft.exe 和 app.asar，并检查 Defender 排除项、异常进程注入和 Windows hosts 文件的修改。网络线索包括 muckanthropic[.]com、muckduck.duckdns[.]org、muckcoding[.]com、muckdeveloper[.]com、130.12.182.172 和 130.12.182.209。来源中的指标清单列有 17 条 SHA-1 和 52 个 URL，包括仓库及下载示例。用地址和 URL 关联日志，单项命中不足以确认失陷。
  - title: 更换暴露凭据并核对转账
    hint: 从干净的系统吊销活跃会话，轮换受影响浏览器、传输工具、VPN 或开发环境可访问的凭据或令牌。检查 Discord 等受影响账户是否被滥用。签名前对照可信来源或硬件钱包屏幕核对收款地址，并检查近期转账是否出现异常收款人。
  - title: 重建已感染系统并恢复可信代码
    hint: 使用可信介质重装失陷系统，恢复已验证的备份及端点防护。重新使用前，核查该主机能够修改的构建产物和仓库。仅在无生产凭据的隔离环境中打开不可信代码，运行前检查构建钩子。
sources:
  - name: Doctor Web 调查报告
    says: 说明恶意仓库及执行路径、整场活动的感染总数，以及加载器、剪贴板劫持程序和窃密木马。
  - name: Doctor Web 失陷指标清单
    says: 列出供检测使用的恶意仓库示例、网络线索和文件哈希。
---

Doctor Web 将最早的恶意仓库追溯到约两年前，当时的诱饵以区块链游戏为主。后续仓库以扫描、测试和日志处理工具吸引安全从业者，其中包括一个仿冒的 Fscan 输出格式化工具。部分 Visual Studio 项目含有恶意构建钩子或解决方案用户设置。其他仓库把恶意 Python 或 Go 代码藏在一长串空白字符之后。报告所述感染路径需要在 Windows 环境中加载或执行相关内容。

PowerShell 阶段会获取加载器，可削弱端点防护、向其他进程注入代码并安装其他载荷。剪贴板劫持程序可以替换剪贴板内的加密货币地址。窃密木马会从浏览器、文件传输工具、VPN 配置和其他应用收集数据，并经 Telegram 机器人发送。超过 2,000 台感染电脑是 Doctor Web 在研究时统计的整场活动总数。报告未单列安全工具诱饵的感染数量，也未公布被盗资金总额。评级依据是已确认的感染及载荷能力。报告未指出需要打补丁的 GitHub 或 Visual Studio 漏洞版本。
