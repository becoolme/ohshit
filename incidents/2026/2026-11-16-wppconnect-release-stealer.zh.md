---
title: WPPConnect 发布物携带窃取凭据和 WhatsApp 会话的代码
tags: [WPPConnect, npm, Docker, 供应链]
summary: WPPConnect 的发布流水线将恶意代码发到两个 npm 软件包、一个 GitHub 夜间构建和 Docker 镜像。代码会收集进程凭据和 WhatsApp 会话数据并发送到 Telegram 机器人。npm 的 latest 标签已回退。
splash: 运行受影响的 WhatsApp 自动化库、服务端、夜间构建或容器镜像的主机。
wipe: 锁定此前的 npm 版本并核验镜像摘要。从干净制品重建，轮换可被读取的凭据并撤销关联的 WhatsApp 会话。
inTheWildNote: 研究人员确认公开发布物包含恶意代码，受影响主机数未知。
cves:
- name: 恶意 WPPConnect 库版本
  description: 导入 2.4.1 时会加载收集主机数据和会话令牌的模块。
- name: 恶意 WPPConnect 服务端版本
  description: 启动 2.10.82 时会加载类似模块。库依赖还提供了另一条执行路径。
timeline:
- date: 11月15日 22:34 UTC
  title: 恶意提交进入库的默认分支
  body: StepSecurity 追踪到模块和导入语句由默认分支上的未签名提交加入，随后运行了发布工作流。
- date: 11月15日 23:31 UTC
  title: npm 发布库版本 2.4.1
  body: 该版本成为 latest，且持有对应恶意构建的有效来源证明。
- date: 11月16日 02:48–03:09 UTC
  title: 容器镜像和服务端软件包发布
  body: 标签为 2.10.82 和 2.10.83 的 Docker 镜像含有载荷。npm 于 03:09 UTC 发布服务端 2.10.82。
- date: 11月16日 04:00 UTC
  title: 研究人员公开报告两个 npm 版本
  body: 公开 Issue 发布后不久，项目的默认分支被强制推送。npm 回退 latest 标签，并废弃两个受影响版本。
- date: 2026年11月17日
  title: GitHub 发布两条恶意软件公告
  body: GitHub 列出受影响的 npm 版本。Docker 镜像和夜间构建制品应另行核查。
checklist:
- title: 停止受影响进程并找出具体制品
  hint: 检查锁文件、已安装模块、发布物下载记录及本地或已部署的容器摘要。查找 npm 2.4.1 和 2.10.82、Docker 2.10.82 和 2.10.83，以及受影响时段的夜间构建。另按 StepSecurity 的报告核查 2.4.3 和相关流水线制品。
- title: 用此前版本重建并锁定间接依赖
  hint: 使用库版本 2.4.0 和服务端版本 2.10.81。若 @wppconnect-team/wppconnect 是间接依赖，使用 npm override 锁定，从可信基线重新生成锁文件，并在 CI 验证解析后的版本。使用 Docker 时，按研究报告核验 2.10.81 的已知干净摘要，避免依赖浮动标签。
- title: 轮换凭据并撤销 WhatsApp 会话
  hint: 在干净主机上轮换曾出现在进程环境和工作目录配置中的凭据，审查相关账号活动。退出受影响的 WhatsApp 已关联设备，使旧会话数据失效，干净重建完成后再重新配对。
- title: 排查已知收集和上传指标
  hint: 检查 DNS 和代理日志中的 api[.]telegram[.]org 和 api[.]ipify[.]org。将 Telegram sendDocument 请求中的机器人 ID 9034051102 和聊天 ID 7343578055 与受影响进程关联。StepSecurity 列出十余项指标，包括文件路径、哈希和镜像摘要。两个网络服务都有正常用途，仅凭命中无法确认失陷。
sources:
- name: StepSecurity 对制品和发布流水线的原始调查
  says: 核实载荷行为、发布物和镜像来源、Docker 摘要及尚未确认的遏制事项。
- name: WPPConnect 库公开披露
  says: 原始仓库报告记录 npm 制品、触发路径及数据收集目标。
- name: GitHub 库恶意软件公告
  says: 确认库版本 2.4.1 和导入时的行为。
- name: GitHub 服务端恶意软件公告
  says: 确认服务端版本 2.10.82 和启动时的行为。
- name: npm 软件库登记数据
  says: 显示发布时间、回退至 2.4.0 以及针对 2.4.1 的废弃警告。
- name: npm 服务端登记数据
  says: 显示发布时间、2.10.81 的 latest 标签、依赖版本范围及针对 2.10.82 的废弃警告。
---

导入 WhatsApp 自动化库或启动服务端时，模块就会运行。它读取环境变量、工作目录中的 `.env` 和 `config.json` 等文件，以及 WhatsApp 令牌文件。它查询主机公网 IP，随后尝试将收集的数据发给 Telegram 机器人。服务端对该库的依赖范围为 `^2.3.6`，未锁定解析版本时也可能装入受影响版本。

StepSecurity 发现，库的有效 npm 来源证明指向含恶意代码的构建，之后的 Git 标签则指向不同的源码。研究人员核实了两个受影响的 Docker 镜像和一个 GitHub 夜间构建。11 月 16 日 03:54 UTC 前，浮动镜像标签 `latest`、`2` 和 `2.10` 指向 2.10.83 镜像。当天 07:31 UTC 前的 `main` 标签状态仍待核实。流水线日志还涉及库版本 2.4.3 和服务端版本 2.10.83，但核查的 npm 登记数据中未发现这两个版本。即使 npm 已回退，也应检查本地缓存的制品。

StepSecurity 引用的 155 次下载仅覆盖库的受影响版本处于 npm latest 状态的一部分时间，无法据此确定安装、执行或成功上传的数量。发布账号是否已恢复控制、Telegram 凭据是否已吊销，也仍待确认。
