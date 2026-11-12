---
title: Go 修复多条构建时代码执行路径和一处 HTTP/1 服务崩溃漏洞
summary: Go 1.27.4 和 1.26.11 修复 12 项漏洞。恶意构建输入可触发代码执行。另一处竞态可使使用 MaxBytesReader 或 MaxBytesHandler 并并发读取请求体与写入响应头的 HTTP/1 服务崩溃。
splash: 构建不可信 Go 包的环境，以及使用 Go 请求体大小限制辅助函数并并发读取请求体和写入响应头的 HTTP/1 服务
wipe: 升级到 Go 1.27.4 或 1.26.11，重新构建并部署受影响的二进制文件，同时隔离不可信构建。
inTheWildNote: Go 发布公告和漏洞记录均未报告在野利用。
cves:
- name: 不安全的 cgo 编译参数
  description: 恶意 cgo 包可利用 --sysroot 或 -target 等编译或链接参数在构建时执行代码。
- name: 加载不可信 GCC specs 文件
  description: 使用 GCC 时，恶意 cgo 包可借特定链接选项加载由包控制的 specs 文件并执行命令。
- name: 绕过 Clang 和 GCC 参数检查
  description: 恶意 cgo 包可借 Clang -gen-* 或 GCC -gnat* 参数执行代码或向任意目录写文件。
- name: Apple 链接器加载插件
  description: 在 Darwin 上，恶意 cgo 包可让 Apple 链接器合并 -l 和 to_library 来加载包指定的插件。
- name: cgo 链接器脚本注入
  description: 恶意 cgo 包可利用分离的 -Wl, 参数及 GNU ld.bfd 接受的部分选项传入可执行代码的链接器脚本。
- name: 恶意链接输入文件
  description: 特制 .syso 文件或 cgo 链接输入可在链接时注入参数或执行代码。
- name: 绕过 pkg-config 参数检查
  description: '恶意包可通过 #cgo pkg-config: 指令加载不可信 .pc 文件或传入未经校验的编译和链接参数。'
- name: Go 对象文件伪装成 .syso
  description: 包可将 Go 对象文件伪装成 .syso，借此注入 cgo 链接指令。
- name: ELF 链接参数注入
  description: 在 ELF 平台上，恶意包可利用特制 //go:cgo_* 指令向外部链接器注入任意参数。
- name: 不安全的动态导入
  description: 恶意包可通过 //go:cgo_import_dynamic 或 Windows 上的特制 PE 对象传入不安全的库参数。
- name: 用转义引号绕过 cgo 检查
  description: 恶意 cgo 包可借 //go:cgo_ldflag 中的转义引号在构建时执行代码，或使 go 命令触发 panic。
- name: HTTP/1 响应头竞态
  description: HTTP/1 服务的处理器使用 MaxBytesReader 或 MaxBytesHandler，并在请求体超限时并发读取请求体和写入响应头，可能导致服务崩溃。
fixed:
- status: 受支持
- status: 受支持
- product: 更早的 Go 版本
  status: 升级到受支持分支
timeline:
- date: 11月10日 17:14 UTC
  title: Go 发布 1.27.4 和 1.26.11
  body: 公告说明了 11 项工具链修复和 1 项 net/http 修复。
- date: 11月11日 02:51 UTC
  title: Go 发布漏洞记录
  body: 12 条记录给出了受影响范围和两个修复版本。
checklist:
- title: 升级各构建环境
  hint: 在 CI、开发机和容器构建阶段运行 go version 和 go env GOTOOLCHAIN。将 setup-go 固定版本、go.mod 的 toolchain 指令及构建镜像更新到 Go 1.27.4、1.26.11 或更新的受支持补丁版。仍在旧分支的构建应迁移到受支持分支。
- title: 重新构建和部署受影响的 HTTP 服务
  hint: 检查使用 MaxBytesReader 或 MaxBytesHandler 的处理器是否并发读取请求体和写入响应头。用修复后的工具链重新构建和部署，通过 go version -m 核对二进制版本，并在预发布环境测试超限的 HTTP/1 请求。
- title: 隔离不可信构建
  hint: 暂停在持有密钥或发布权限的运行器上构建不可信包和 PR。使用一次性运行器和权限受限的凭据，将签名和发布移出不可信作业。
- title: 排查可疑构建
  hint: 保全运行器和编译器日志。核对不可信依赖变更、#cgo 指令和 .syso 文件，并排查异常进程或产物变更。若构建环境失陷，吊销暴露的凭据、更换受影响的运行器，并用可信输入重新生成产物。
sources:
- says: 确认两个版本的发布日期和版本支持政策。
- says: Go 团队原始公告，说明全部 12 项修复的利用前提及影响。
- says: CVE-2026-97043 的官方技术细节和版本范围。
- says: CVE-2026-97042 的官方技术细节和版本范围。
- says: CVE-2026-97041 的官方技术细节和版本范围。
- says: CVE-2026-97040 的官方技术细节和版本范围。
- says: CVE-2026-97039 的官方技术细节和版本范围。
- says: CVE-2026-97038 的官方技术细节和版本范围。
- says: CVE-2026-97037 的官方技术细节和版本范围。
- says: CVE-2026-97036 的官方技术细节和版本范围。
- says: CVE-2026-97035 的官方技术细节和版本范围。
- says: CVE-2026-97034 的官方技术细节和版本范围。
- says: CVE-2026-97033 的官方技术细节和版本范围。
- says: CVE-2026-97054 的官方技术细节和版本范围。
---

Go 于 11 月 10 日发布 1.27.4 和 1.26.11。其中 11 项修复涉及 cgo 指令、原生对象文件、编译或链接参数等构建输入。构建恶意包时，部分漏洞可让攻击者以构建用户身份执行代码。具体路径取决于输入和工具链，例如 GCC specs 文件、Apple 链接器插件或特制 .syso 对象。排查会编译不可信贡献或新引入依赖、同时可访问凭据或发布权限的 CI 作业。

另一项 net/http 漏洞影响使用 MaxBytesReader 或 MaxBytesHandler 的 HTTP/1 处理器。请求体超限时，并发读取请求体和写入响应头可能触发 panic 并使服务崩溃。升级用于生成部署产物的工具链并重新构建受影响服务。只更新构建机，已有二进制文件仍包含旧代码。
