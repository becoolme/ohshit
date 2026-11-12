---
title: Apache HTTP Server 2.4.71 修复 HTTP/2 堆内存破坏漏洞
summary: Apache 修复了 mod_http2 中可能导致远程代码执行的竞态条件。上游 httpd 2.4.55–2.4.70 及独立 mod_h2 2.0.8–2.0.42 受影响。同批发版还修复了 mod_md 和 mod_vhost_alias 中的两个漏洞。
splash: 通过受影响 mod_http2 接受 HTTP/2 连接的 Apache 服务器。其余两个 CVE 涉及其他模块。
wipe: 安装 httpd 2.4.71 或经核实的发行商回移补丁。无法及时升级时禁用 HTTP/2。
inTheWildNote: Apache 已发布修复。已查阅的来源未证实在野利用。
timeline:
- date: 2026年11月11日
  title: Apache 发布 2.4.71 及三个漏洞的修复
  body: 上游公告将 CVE-2026-119618 定为严重，mod_md 和 mod_vhost_alias 的修复随同发版。
checklist:
- title: 清点正在运行的 HTTP/2 配置
  hint: 使用 httpd -v 或 apache2 -v、软件包管理器和 httpd -M 或 apache2ctl -M。检查各虚拟主机和可直连源站监听器实际使用的 Protocols 设置，包括 TLS 上的 h2 和 h2c。另行检查独立安装的 mod_h2。
- title: 安装受支持的修复并核对运行实例
  hint: 源码构建升级至 httpd 2.4.71 或更高版本。发行版软件包按供应商公告核对确切修复版本。将受影响的独立模块替换为受支持的修复构建，随后检查配置、重启或重新部署服务，并核对实际运行的程序及模块。
- title: 在未修补的监听器上禁用 HTTP/2
  hint: 升级需推迟时，从实际生效的 Protocols 设置中移除 h2 和 h2c，或停用 mod_http2。检查配置后重新加载，验证直连和代理请求均无法与受影响监听器协商 HTTP/2，并测试必要业务。此措施降低 HTTP/2 漏洞暴露，其他两个受影响模块仍需升级。
sources:
- name: Apache 2.4.71 安全公告
  says: 列出三个 CVE、受影响版本及发版日期。
- name: Apache CNA 记录
  says: 确认竞态、远程代码执行影响及上游与独立模块的受影响版本。
- name: 独立 mod_h2 维护者仓库
  says: 独立仓库已归档，维护者指引用户转向 Apache httpd。
cves:
- name: HTTP/2 堆内存破坏
  description: mod_http2 的 assign_headers() 存在竞态，可能导致远程代码执行。
- name: mod_md 子进程崩溃
  description: 处理 HTTP 请求时的空指针解引用可导致子进程崩溃。
- name: mod_vhost_alias 栈覆写
  description: 模块可能覆写栈中的一个字节。
fixed:
- product: Apache HTTP Server
---

CVE-2026-119618 是 HTTP/2 请求头处理中的竞态。能访问受影响 HTTP/2 监听器的远程客户端可触发内存破坏，进而可能在服务器进程中执行代码。Apache 列出的范围为 httpd 2.4.55 至 2.4.70、独立 mod_h2 2.0.8 至 2.0.42。独立项目已归档，请使用 Apache httpd 随附的修复模块，或由下游供应商确认已修复的构建。

同批还修复了 2.4.30 至 2.4.70 的 mod_md 子进程崩溃漏洞，以及 2.4.69 和 2.4.70 的 mod_vhost_alias 单字节栈覆写漏洞，暴露取决于各自模块。下游回移补丁后版本号仍可能较旧，请按供应商公告核对实际软件包版本。
