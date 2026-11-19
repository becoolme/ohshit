---
title: ClamAV 1.5.5 和 1.4.7 修复十项扫描器漏洞
summary: ClamAV 1.5.5 和 1.4.7 修复十项漏洞，涉及畸形扫描输入、内存错误、循环和资源限制绕过。Cisco Secure Endpoint Connector 需按平台单独更新。Cisco 表示尚未发现恶意利用。
splash: 处理攻击者提供扫描输入的 ClamAV；部分路径要求加载钓鱼数据库条目或开启调试日志
wipe: 将 ClamAV 升级至 1.5.5 或 1.4.7；内置该引擎的 Cisco Connector 应按平台单独更新。
inTheWildNote: Cisco PSIRT 表示尚未发现这些漏洞遭恶意利用。
cves:
  - name: Phishcheck URL 长度计算
    description: 加载完整哈希钓鱼数据库条目时，畸形邮件可触发栈缓冲区越界写。上游将引入版本追溯至 0.94。
  - name: CHM 循环目录遍历
    description: 畸形 CHM 目录指针可导致无限扫描循环。上游将引入版本追溯至 0.100.0。
  - name: yC 可执行文件偏移校验
    description: 畸形 yC 加壳可执行文件可触发下溢和堆越界读取。上游将引入版本追溯至 0.96。
  - name: InstallShield 扫描循环
    description: 畸形 InstallShield 文件表计数或偏移可令扫描工作进程卡住。上游将引入版本追溯至 0.96。
  - name: OLE2 资源耗尽
    description: 上游描述深度嵌套的 OLE2 属性可耗尽进程栈，Cisco 描述为内存耗尽。上游将引入版本追溯至 0.71。
  - name: CHM LZX 匹配偏移
    description: 畸形 CHM LZX 匹配可导致堆越界写。上游将引入版本追溯至 0.80。
  - name: Rust 到 C 的日志格式处理
    description: 上游描述攻击者可控日志文本导致崩溃、进程内存泄露或破坏；Cisco 描述了调试日志 DoS 路径。从 0.105.0 引入。
  - name: UPX 解压及 PE 重建边界
    description: 上游描述解包畸形可执行文件时的堆越界写；Cisco 描述为越界读取/DoS。从 0.94.1 引入。
  - name: OLE2 目录链扫描时间绕过
    description: 畸形 OLE2 目录链可超出配置的扫描时间并消耗过多 CPU。上游将引入版本追溯至 0.98.1。
  - name: XAR 解包资源限制绕过
    description: 上游描述解包时临时存储耗尽；Cisco 描述为绕过 MaxFileSize 并可能陷入循环。从 0.98 引入。
fixed:
  - status: 11 月安全修复
  - status: 回移植的 11 月安全修复
  - status: Cisco 列出的首个修复版本
  - status: Cisco 列出的首个修复版本
  - status: Cisco 列出的首个修复版本
timeline:
  - date: 11月18日 16:00 UTC
    title: Cisco 发布下游公告
    body: 十项相互独立的 ClamAV 漏洞影响 Secure Endpoint Connector；Cisco 给出各平台修复版本，未提供替代修复措施。
  - date: 11月18日 16:30 UTC
    title: ClamAV 发布上游安全版本
    body: 项目发布 1.5.5 和 1.4.7，修复相同的十项 CVE。Docker 镜像可能晚于公告上线。
checklist:
  - title: 更新扫描引擎并核实运行中的部署
    hint: 通过项目下载页面、GitHub 发布或发行版更新包安装 ClamAV 1.5.5 或 1.4.7。容器镜像可用后也应更新并部署修复后的引擎，不能把病毒特征库更新当成引擎升级。
  - title: 内置部署应使用 Cisco 的 Connector 修复
    hint: Cisco 通过 Secure Endpoint 门户提供 Linux 1.29.3、Mac 1.27.5 和 Windows 8.6.4。检查自动更新策略及实际 Connector 版本。Private Cloud 客户在客户端版本可用后通过常规内容更新取得 Connector 更新；Private Cloud 服务本身不是受影响组件。
  - title: 核对相应扫描路径，不要仅依赖现有资源限制
    hint: 盘点邮件和文件扫描中的 CHM、yC/UPX 可执行文件、InstallShield、OLE2/CFB 及 XAR 输入。Phishcheck 的 CVE-2026-76411 要求加载完整哈希钓鱼数据库条目；Cisco 对 CVE-2026-76422 的说明要求启用调试日志。部分漏洞可绕过扫描时间、文件大小或解包限制，现有上限不能替代修复。
  - title: 部署后确认扫描功能正常
    hint: 检查更新后的扫描器是否运行并能完成预期扫描，调查崩溃、工作进程卡住、CPU/内存耗尽或临时存储耗尽。这些是已记录的可能影响，并非已公布的入侵指标。Cisco 未提供能解决这些漏洞的替代修复措施。
sources:
  - name: ClamAV 11 月安全发布
    says: 列出十项修复、历史引入版本、上游 1.5.5/1.4.7 目标版本及容器镜像可用性说明，并描述部分内存写入和日志漏洞影响。
  - name: Cisco 下游 ClamAV 公告
    says: 说明 DoS/限制绕过影响、各平台 Connector 修复、Windows 与 Linux/Mac 严重性差异、无替代修复措施及尚无已知恶意利用。
---

ClamAV 在 11 月 18 日发布安全更新，通过 1.5.5 及回移植版本 1.4.7 修复十项相互独立的漏洞。攻击者控制的内容必须到达相应扫描器、解包器或日志路径才能触发。Phishcheck 问题还要求加载完整哈希钓鱼数据库条目；Cisco 对日志漏洞的说明要求启用调试日志。受一项漏洞影响不代表一定受全部十项影响。

上游博客逐项给出历史引入版本，并将受影响开发版本范围描述到 1.5.4，同时明确 1.4.7 是已修复的回移植版本。应按上表中各发行线的修复升级，不能把这一历史范围中的最大版本当成唯一升级目标。这些是引擎修复；发布公告也提醒，更新后的 Docker 镜像可能不会立即可用。

**来源对影响细节的描述不同。** ClamAV 描述栈/堆越界写、可泄露或破坏进程内存的日志格式字符串问题、扫描循环及资源耗尽。Cisco 下游公告及 CNA 记录主要描述其产品中的拒绝服务和扫描限制绕过。尤其是 UPX 的读与写、OLE2 的内存与栈耗尽，以及 XAR 的文件大小/循环与解包存储限制，两者表述均有差异。应保留各自产品范围内的描述，不能仅凭“内存写入”或 Windows 扫描器权限，断言已有远程代码执行攻击链。

展示的 7.5 分均为 Cisco 对这十个编号给出的 CVSS 3.1 分值，并非所有部署的统一评估。Cisco 将 Windows Connector 的影响评为 High，Linux/Mac 为 Medium，平台分数分别为 7.5 和 5.3。Cisco 表示 Secure Endpoint Private Cloud 本身不受影响，问题在于其分发的 Connector。修复表仍为 Private Cloud 保留版本占位，应遵循 Connector 目标版本及内容更新流程，不能虚构服务器补丁版本。

Cisco 表示尚未发现恶意利用或公开利用公告，也未提供能解决这些漏洞的替代修复措施。远程输入可到达广泛部署的扫描引擎，且存在已记录的内存安全及可用性影响，支持定为 L3；这不是受害者已失陷的报告。上述来源未公布事件特定的攻击指标或受害数量。
