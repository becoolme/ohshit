---
title: "MCP 参考服务器修复 Git 代码执行及访问边界漏洞"
summary: "MCP 参考服务器 v2.4.0 发布批次修复 Git、Filesystem 和 Fetch 的六个漏洞。不可信 Git 仓库可让只读工具以服务端权限执行代码。Windows 文件系统防护仍有限制。"
splash: "使用受影响 MCP 参考服务器的环境，尤其是让 Git 工具访问不可信仓库的部署。"
wipe: "将 mcp-server-git 和 mcp-server-fetch 更新至 2026.11.11，将 Filesystem 更新至 2.3.0，并隔离不可信任务。"
fixed:
- {}
- {}
- {}
cves:
- name: "Git 配置可触发代码执行"
  description: "客户端须让 Git 工具打开本地配置受攻击者控制的仓库。即使仅查询状态，也可能以 MCP 服务账户执行程序。"
- name: "Git 仓库边界绕过"
  description: "特制 Git 目录、备用对象库或关联工作树可将访问重定向到指定仓库之外。Windows 目录联接仍有残留风险。"
- name: "文件读取竞争条件"
  description: "能把已检查父目录换成符号链接的本地进程，可在读取时赢得竞争并使允许目录外的文件暴露。"
- name: "文件移动竞争条件"
  description: "同一设备内移动文件时，能替换已检查源目录的本地进程可改变被移入允许目录的文件。"
- name: "Fetch 私有地址检查缺陷"
  description: "已弃用的 IPv6 站点本地地址可通过公网地址检查。实际影响取决于服务端的路由。"
- name: "Fetch 爬虫规则绕过"
  description: "当源站在提供内容前规范化路径时，路径的其他写法可绕过 robots.txt 检查。"
timeline:
- date: 2026年11月11日
  title: "维护者公布六份公告并发布修复"
checklist:
- title: "更新实际运行的服务包"
  hint: "检查各 MCP 客户端启动的命令、锁定版本和环境。将 mcp-server-git 和 mcp-server-fetch 升至 2026.11.11 或以上。从日期版迁移时，显式安装 @modelcontextprotocol/server-filesystem@2.3.0。重启 MCP 进程并核实实际版本，Git 须为 2.31 或以上。"
- title: "隔离不可信仓库和文件系统输入"
  hint: "更新前，仅允许 Git 服务访问 .git 目录可信的仓库。以专用低权限账户运行，只挂载必要文件。无法隔离时，对不可信用户禁用 Git 或文件系统工具。在 Windows 上，不能依赖 --repository 约束可创建目录联接的客户端，也不能仅靠允许目录防止不可信进程抢先替换路径。"
- title: "限制 Fetch 网络访问"
  hint: "只允许 Fetch 工作进程访问业务所需的目标。依赖应用层过滤前，核实代理及 DNS 配置。"
sources:
- name: "MCP 参考服务器 v2.4.0 发布说明"
- name: "GHSA-6hqx-gqrx-c5r2"
- name: "GHSA-q74p-4wrc-q7w6"
- name: "GHSA-p9cv-8g75-4xcg"
- name: "GHSA-7m4x-rv66-mxhh"
- name: "GHSA-3rxj-6jhw-qfv7"
- name: "GHSA-f9hh-cmx9-2f23"
---

这批更新中，Git 漏洞的影响最直接。旧版服务在不可信仓库中运行状态或差异工具时，仓库的本地配置可触发程序执行。修复版会覆盖可能启动程序的配置项，并拒绝使用 Git 2.31 之前的版本。另一个 Git 漏洞可借备用对象库或关联工作树突破仓库边界，Windows 目录联接仍待修复。

Filesystem 的两个漏洞要求能替换本地目录并赢得竞争。发布说明列出的受影响版本为 2.3.0 之前的版本，包括 2025.1.14 至 2026.8.31 的日期版。维护者指出，Windows 上读取路径的竞争窗口已缩小，但未完全关闭。Fetch 的两个缺陷涉及地址分类和爬虫策略，其中 robots.txt 绕过不会绕过源站身份验证。公开公告包含复现细节，但没有确认的在野利用报告。Git 工具具备可复现的代码执行路径，因此评为 L3。
