---
title: Git 2.56.1 修复递归克隆代码执行及另外五个漏洞
tags:
- Git
- RCE
- CI/CD
summary: Git 为七个版本系列发布更新，修复六个漏洞。递归克隆攻击者托管的仓库可在克隆主机上执行代码。其他漏洞涉及不可信引用、标签、合并、二进制补丁及 fast-import 输入流。
splash: 递归克隆攻击者托管仓库，或处理其他特制 Git 输入的客户端及自动化系统。
wipe: 升级到 Git 2.56.1 或相应的已修复维护版本。单独更新内置 Git 的应用及 GitHub Enterprise Server。
inTheWildNote: 维护者确认攻击路径。本轮未核实在野利用。
cves:
- name: 递归克隆期间执行代码
  description: 特制路径可用符号链接替换子模块的 gitfile，指向攻击者控制的 Git 配置或钩子。维护者描述的前提是用 --recurse-submodules 克隆攻击者托管的仓库。
- name: 未创建分支的 HEAD 可导致路径穿越
  description: 使用 files 引用后端从恶意 Git 协议 v2 服务器克隆空仓库时，Git 可能保存格式异常的未创建分支 HEAD 目标。后续更新分支可能写入引用目录之外。
- name: 合并签名标签时破坏栈内存
  description: 合并含两个以上 GPG 签名的特制标签可能破坏栈内存并使 Git 崩溃，也影响代用户执行该合并的服务。
- name: 处理二进制补丁时越界读取
  description: 应用解压后超限的压缩二进制补丁可能绕过输入大小限制并使 Git 崩溃。
- name: 大型三方合并导致堆溢出
  description: 合并输出过大可使大小计算溢出。操作从相关树读取属性时，特制的 conflict-marker-size 可以放大输出。
- name: fast-import 输入流可访问文件系统
  description: 不可信输入流可通过子模块标记重写读取文件，或通过 export-pack-edges 创建或追加文件。修复后须显式启用 --allow-unsafe-features 才能从流中使用这些功能。
fixed:
- {}
- {}
- {}
- {}
- {}
- {}
- {}
timeline:
- date: 2026年11月10日
  title: Git 发布六项修复
  body: Git 2.56.1 和六个维护版本已发布。GitHub 报告托管服务已部署修复，并列出 GitHub Enterprise Server 更新。
checklist:
- title: 更新处理外部输入的每一份 Git
  hint: 在工作站、CI 运行器和导入或合并仓库的主机上运行 git --version。安装相应的上游修复版本或发行版回移补丁。重建运行器镜像并核实实际使用的 Git 版本。内置 Git 的客户端应通过其发行方更新。
- title: 更新 GitHub Enterprise Server 并核查 CI 镜像
  hint: 按版本系列安装 GitHub Enterprise Server 3.19.15、3.20.11、3.21.9 或 3.22.4。在托管 CI 的镜像或任务日志中核对实际安装的 Git 版本。
- title: 修补期间限制不可信 Git 操作
  hint: 仅从可信服务器克隆。对不可信仓库禁用递归克隆和自动检出子模块。获取子模块前检查 .gitmodules 并核实远程地址。暂缓处理不可信的合并、标签、二进制补丁和 fast-import 输入流。不要为不可信的流生成程序启用 --allow-unsafe-features。
- title: 调查此前的可疑操作
  hint: 将检出或导入日志与远程地址、任务身份和异常进程关联。发现可疑执行时保留运行器日志并隔离受影响主机。使用可信镜像重建，在签发方吊销暴露的凭据。
sources:
- name: Git 维护者在 GitHub 发布的公告
  says: 六项修复、上游发布版本、GitHub 部署情况和临时缓解措施。
- name: Git 维护者在 oss-security 的说明
  says: 详细触发条件、版本覆盖及文件系统行为。
- name: Git 递归克隆漏洞公告
  says: 递归克隆攻击的前提和缓解方法。已发布的修复版本以发布公告为准。
---

Git 的 11 月更新修复了一条代码执行路径。超长索引条目使用完整名称通过路径校验，写入时却使用截断的名称。递归克隆过程中，这可能用符号链接替换子模块的 gitfile，随后以执行克隆的用户或任务权限运行代码。维护者描述的前提是仓库由攻击者托管，且通过 `--recurse-submodules` 进行递归克隆。即使顶层仓库在熟悉的代码托管平台，也可能通过 `.gitmodules` 指向另一台主机上的恶意子模块。

GitHub 表示已在 GitHub.com、GitHub Enterprise Cloud 及其数据驻留服务部署修复。11 月 10 日公告单独列出了 GitHub Enterprise Server 更新，并称 Actions、Codespaces、GitHub Desktop 和 Copilot 应用将获得包含修复的 Git。请在实际运行 Git 的环境中核对版本。发行版软件包可能用不同的包版本提供回移补丁。维护者确认受影响版本可追溯至 2.27.0，并未为低于 2.50 的分支提供上游维护版本。请迁移旧安装，或向维护当前构建的发行方核实修复。

其他五个漏洞各有不同的触发输入。例如，若服务使用拟合并树中的属性检查能否合并，攻击者可以借该服务触发三方合并漏洞。在相关服务完成更新前应避免处理不可信输入。
