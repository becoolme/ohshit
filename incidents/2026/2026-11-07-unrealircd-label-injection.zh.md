---
title: "UnrealIRCd 标签注入漏洞允许普通用户执行特权 IRC 命令"
summary: >-
  攻击者正利用 CVE-2026-114713，从普通客户端连接向互联的 UnrealIRCd 服务器注入服务器间命令。
  6.2.7.1 和 11 月 7 日的热补丁修复了该漏洞及另外八项安全问题。
splash: "至少有两台服务器互联、加载 labeled-response 模块且未修补的 UnrealIRCd 6 和 5 网络。"
wipe: "条件满足时先部署 IRCOp 过滤规则，再逐台热修补受影响的类 Unix 6.x 服务器，或升级到 6.2.7.1 并重启。"
inTheWildNote: "UnrealIRCd 维护者于 11 月 8 日报告漏洞已被用于实际攻击。"
cves:
  - name: "IRCv3 label 命令注入"
    description: "构造的 label 标签可向互联服务器的流量注入 IRC 命令。普通客户端可用服务器权限执行 KILL、GLINE 等命令。"
fixed:
  - product: "UnrealIRCd 6"
    status: "仍受支持。类 Unix 上的 6.0.0 至 6.2.7 可用热补丁。"
  - product: "UnrealIRCd 5"
    status: "已停止支持。迁移至 6.2.7.1 或更新版本期间，禁用 labeled-response 并重启。"
timeline:
  - date: "2026 年 11 月 4 日"
    title: "项目预告安全更新"
    body: "预告让运维人员提前准备应用严重漏洞修复和热补丁。"
  - date: "11 月 7 日 15:00 UTC"
    title: "UnrealIRCd 发布 6.2.7.1 和热补丁"
    body: "维护者披露特权 IRC 命令注入漏洞和另外八项修复。"
  - date: "11 月 8 日 02:31 UTC"
    title: "CVE 记录公开"
    body: "MITRE 发布 CVE-2026-114713，CVSS 3.1 评分为 8.6。"
  - date: "2026 年 11 月 8 日"
    title: "维护者报告实际攻击"
    body: "项目更新公告，敦促管理员立即部署防护。"
checklist:
  - title: "所有服务器均支持时部署临时过滤规则"
    hint: >-
      所有互联服务器均运行 6.0.4 或更新版本时，由 IRCOp 执行一次
      `/SPAMFILTER add -regex T block - Invalid_label ^label=(?![^\r\n;\x20]*\z)`。
      规则在整个网络生效，仅覆盖 CVE-2026-114713。若任一互联服务器早于 6.0.4，
      直接修补或升级受影响的节点。
  - title: "逐台热修补或升级受影响服务器"
    hint: >-
      在运行 6.0.0 至 6.2.7 的类 Unix 服务器上，逐台执行
      `./unrealircd hot-patch bundle-20261107`，确认安装和重新加载配置成功。
      Windows 或热修补失败时，升级至 6.2.7.1 或更新版本并重启。
      类 Unix 可执行 `./unrealircd upgrade` 或安装官方版本，Windows 使用项目提供的安装程序。
      若系统升级后热补丁构建失败，参阅项目 FAQ 的 Hot-patching failed 章节。
  - title: "逐台验证并排查异常特权命令"
    hint: >-
      6.0.2 或更新版本可执行 `./unrealircd module-status | grep labeled-response`。
      确认显示 `5.0-hot-patch-bundle-20261107` 或修复版模块版本，例如 `6.2.7.1`。
      只显示 `5.0` 表示未应用补丁包。若命令不可用或无输出，IRCOp 可执行 `/MODULE -all`，
      或用 `/MODULE -all remote.server.name` 检查互联节点。验证失败时升级并复查。
      在可用的操作员和服务器日志中检查无法解释的 KILL 或 GLINE。这些命令也有正常用途。
  - title: "遏制并替换已停止支持的服务器"
    hint: >-
      对 UnrealIRCd 5，在每台服务器的配置中添加 `blacklist-module "labeled-response";` 并重启进程。
      仅重新加载配置会让模块保持运行。将已停止支持的版本迁移至 6.2.7.1 或更新版本。
      维护者未测试其他已停止支持的系列。
sources:
  - name: "UnrealIRCd 维护者公告及在野利用更新"
    says: "确认实际攻击及受影响的 5.x 系列，给出过滤、热修补、升级和验证步骤。"
  - name: "UnrealIRCd 项目发布公告"
    says: "给出预告和 11 月 7 日安全更新的发布日期。"
  - name: "MITRE CVE 记录"
    says: "明确服务器互联的前提和 CVSS 3.1 评分 8.6。记录正文描述 6.x，项目另行确认 5.x。"
  - name: "维护者在 oss-security 的披露"
    says: "解释 label 标签中未转义的换行符如何将 IRC 命令注入服务器链路。"
  - name: "UnrealIRCd 热补丁故障排查"
    says: "说明如何排查热补丁失败，以及何时需要升级服务进程。"
---

连接到受影响 IRC 网络的客户端可发送构造的 IRCv3 `label` 标签。`labeled-response` 模块把未转义的
分隔符带入服务器间转发的回复，接收服务器会将其解释为额外的 IRC 命令。这条路径需要至少两台服务器互联。
命令以服务器权限执行，客户端可用 KILL 断开其他用户，或用 GLINE 实施全网封禁。公告描述的是 IRC 协议命令。

项目将此注入漏洞评为严重，MITRE 记录的 CVSS 3.1 评分为 8.6。维护者于 11 月 8 日确认在野利用，
尚未公布受害者数量或攻击指标。同批另外八项修复涉及两种用户 IP 泄露、重新检查黑名单时挂起、服务组件的
CHGIDENT 触发崩溃、错误地向新连接返回服务器已满、服务组件设置过多封禁、TLS 重新协商可能造成洪泛，
以及 WHOWAS 数据库可能崩溃。
临时过滤规则覆盖命令注入，其余问题须应用完整热补丁或安全版本。
