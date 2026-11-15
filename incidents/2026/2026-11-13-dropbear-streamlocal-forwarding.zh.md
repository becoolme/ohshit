---
title: Dropbear 按密钥设置的转发限制可被 Unix 套接字转发绕过
summary: 持有限制用途 SSH 密钥的用户可通过请求 Unix 域套接字转发，绕过 Dropbear 针对 TCP 转发目的地的限制。在实验环境中，研究人员借此从已有套接字权限的 SSH 账户访问了 Docker API。
splash: 启用了 Unix 套接字转发，并依赖 permitopen 或 permitlisten 限制已认证密钥的 Dropbear 服务器。
wipe: 为受影响的密钥设置 no-port-forwarding，或在服务器构建中关闭 Unix 套接字转发。
inTheWildNote: 研究人员已在实验环境复现，报告未提及实验环境之外的利用。
timeline:
  - date: 11月13日 19:38 UTC
    title: 研究人员披露转发限制绕过问题
    body: 报告记录了针对 Dropbear 修订版本 99baf182 的本地套接字测试，并分析了两条 Unix 转发处理路径。
checklist:
  - title: 找出依赖目的地限制的密钥
    hint: 运行 dropbear -V，检查设备固件或软件包是否含下游改动。在服务账户和管理员账户的 authorized_keys 文件中查找 permitopen 和 permitlisten，并确认当前构建是否启用了本地或远程 Unix 套接字转发。
  - title: 关闭 Unix 套接字转发路径
    hint: 在可以停用隧道的受影响密钥上加 no-port-forwarding。该设置也会关闭该密钥的 TCP 转发。如需保留 TCP 隧道，在 localoptions.h 中将 DROPBEAR_SVR_LOCALSTREAMFWD 和 DROPBEAR_SVR_REMOTESTREAMFWD 设为 0 后重新构建。如无法重新构建且可关闭全部转发，请在服务器启动参数中加上 -j 与 -k，再按设备文档重新加载或重启服务。调整 SSH 访问前，先保留一个用于恢复的会话。
  - title: 检查敏感套接字权限并复测
    hint: 核查 SSH 账户的组成员身份和套接字权限，包括 /var/run/docker.sock 及本地数据库或代理服务的套接字。移除不必要的权限，结束受影响的会话。使用新的受限会话验证 Unix 转发被拒绝，并确认仍需使用的 TCP 隧道遵守原有策略。
sources:
  - name: 研究人员在 oss-security 上发布的报告
    says: 给出测试版本、复现结果和访问 Docker 套接字的前提。
  - name: Dropbear 2026.94 Unix 转发源码
    says: 两条处理路径都会检查整体转发开关和强制命令限制，均未查询按目的地设置的 TCP 限制。
  - name: Dropbear 2026.94 密钥选项源码
    says: 展示按密钥设置的转发开关和独立的 TCP 目的地检查。
  - name: Dropbear 2026.94 构建默认设置
    says: 展示两个套接字转发构建开关，以及覆盖默认值的配置文件。
  - name: Dropbear 2026.94 启动参数
    says: 定义关闭本地和远程端口及套接字转发的参数。
  - name: Dropbear 发行记录
    says: 列出上游发行版本。截至 11 月 15 日，尚未找到修复版本。
---

TCP 转发会检查 `permitopen` 和 `permitlisten` 指定的目的地。2026.94 的 Unix 域套接字处理路径会检查整体转发开关和强制命令设置，但不会查询这些目的地列表。攻击者需要持有有效的 SSH 密钥，账户需要获准使用 Unix 套接字转发。通过本地转发可连接该会话有权访问的套接字，通过远程转发可在服务器允许的路径上申请监听。

研究人员在实验环境中使用受限密钥连接了测试套接字，并在账户属于 Docker 组时访问了 Docker API。能够访问该守护进程可能获得主机控制权。报告测试的是 11 月 11 日的开发版本。正式发行的 2026.94 源码也包含这两条处理路径。请核对设备厂商的构建，再判断其他版本或设备是否受影响。
