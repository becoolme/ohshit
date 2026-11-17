---
title: ONLYOFFICE Docs 只读权限可被用来取得容器内 root
tags: [ONLYOFFICE, Document Server, Docker, JWT]
summary: Rapid7 演示了两条从只读文档访问取得 ONLYOFFICE Document Server 官方容器内 root 权限的攻击链。若启用了 WOPI，且服务器可访问过滤规则允许的攻击者控制源，另一入口无须已有账户或令牌。
splash: 已在官方 Document Server 9.4.0-129 上复现。这组漏洞的完整影响版本范围尚不明确。
wipe: 升级到仍受支持的 Document Server 10.0.0 或更高版本。升级前限制访问，并停用未使用的 WOPI 集成。
inTheWildNote: Rapid7 已公布可复现的验证代码，未报告实际攻击。
cves:
  - name: DocBuilder 读取本地文件并伪造会话
    description: 可被接受的编辑器令牌可用于读取文件，取得伪造会话令牌所需的签名材料。
  - name: DocBuilder 输出路径注入
    description: Inbox 兼容令牌可触发转换任务在预定任务目录之外写入文件，进而以 ds 身份执行命令。
  - name: 完整保存流程中的路径穿越
    description: 会话令牌可访问某个保存流程，向预定目标之外写入文件。
  - name: 特权维护脚本命令注入
    description: 在官方容器内以 ds 身份执行代码后，可借助 sudoers 允许的维护脚本提权至 root。
  - name: 绕过只读导出限制
    description: 即使下载及表单填写已停用，查看者仍可导出未显示的文档数据。
fixed:
  - {}
timeline:
  - date: 2026年10月14日
    title: DocBuilder 输出路径漏洞 CVE 公布
    body: 公布的 CVE 描述了文件写入，以及以文档服务账户执行命令的风险。
  - date: 2026年10月23日
    title: ONLYOFFICE 向 Rapid7 确认五项修复
    body: Rapid7 称厂商确认 Document Server 10.0 修复了全部五项问题。
  - date: 2026年11月16日
    title: Rapid7 披露组合攻击路径并公布验证代码
    body: 研究人员从只读会话以及满足条件的 WOPI 入口演示了获取容器内 root 权限。
checklist:
  - title: 升级 Document Server 并核实运行版本
    hint: 检查运行的软件包或镜像版本，以及集成的兼容性。备份持久化数据，保留配置的挂载目录和密钥。按厂商针对所用产品版本的升级指引操作，确认运行版本。验证受限用户只能查看获准共享的内容，并确认有权限的用户仍可编辑和保存。
  - title: 升级前限制暴露
    hint: 如无需 WOPI，请停用。如必须使用，只允许已知集成作为 WOPI 源，并用出站控制阻止服务器访问不受信的来源。限制未修补服务器的公开访问和外部分享。这些措施不能修复只读令牌路径。
  - title: 重建或轮换凭据之前调查可疑访问
    hint: 保全容器、反向代理、集成和主机日志。检查对 /docbuilder 或 WOPI 启动端点的异常请求、runtime.json 的变更、异常回调目的地，以及由文档服务或缓存维护脚本启动的 Shell。命中不能单独证明失陷。如怀疑失陷，隔离工作负载，检查主机及挂载数据，使用干净镜像重建，并在恢复访问前轮换暴露的 JWT 密钥和集成凭据。
sources:
  - name: Rapid7 协调披露及技术分析
    says: 记录五项问题、测试构建、前提、验证代码及厂商确认的修复。
  - name: ONLYOFFICE Document Server 更新日志
    says: 列出 10.0.0 的安全变更，包括 DocBuilder 和 WOPI 的修复。
  - name: ONLYOFFICE 社区版 Docker 更新指引
    says: 说明如何升级 Docker 安装并保留映射目录。
  - name: DocBuilder 输出路径漏洞的 CVE 记录
    says: 记录较早的披露，并说明 10.0.0 之前以 ds 身份执行代码的风险。
---

Rapid7 在官方 9.4.0 镜像的 9.4.0-129 软件包中测试，JWT 核验保持开启，Browser 和 Inbox 核验使用相同的实际签名密钥。两条链均利用 DocBuilder 授权缺陷，但通过不同路径写入文件。两者均可先以文档服务账户执行命令，再滥用维护脚本取得容器内 root 权限。报告未演示容器逃逸。

另一入口需启用默认关闭的 WOPI，且 Document Server 能访问攻击者控制、通过过滤规则的 WOPI 源。满足这些条件时，Rapid7 无须已有账户或令牌即演示了两条链。另有一项漏洞让查看者导出重建的 DOCX，其中可包含界面从未显示的自定义 XML 及字段指令等内容。

ONLYOFFICE 确认 Document Server 10.0 修复了全部五项问题。Rapid7 在 10.0.0-169 上进行了针对性验证。除已测试的受影响软件包外，这组漏洞的完整影响范围尚不明确。先前单独披露的 CVE-2026-110385 在其自身前提下影响低于 10.0.0 的版本。
