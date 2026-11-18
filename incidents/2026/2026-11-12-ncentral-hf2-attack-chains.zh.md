---
title: Apache Axis 漏洞已被用于攻击 N-central 和 Confluence Data Center
summary: Huntback 报告有 21 台 N-central 服务器遭 4EverAble2Shell 利用后运行矿工，其中 19 台使用 2026.4.1.26 HF2。服务器链需要启用 Legacy API。另行公开的 Windows Agent 和 Probe 攻击路径有各自的前提。Rapid7 还在 Confluence Data Center 中发现了对同一 Axis 漏洞的利用。
splash: 启用 Legacy API 且可访问的 N-central HF2、启用 Remote API 的受影响 Confluence Data Center，以及满足条件的 Windows Agent 或 Probe。
wipe: 部署 N-central HF3 和 Confluence 修复，限制不受信网络访问，并调查此前暴露的服务器和受管理端点。
inTheWildNote: Huntback 和 Rapid7 报告了服务器攻击。Windows 攻击路径的在野利用仍待确认。
timeline:
- date: 2026年11月12日
  title: 研究者发布新的服务器及 Windows 终端攻击链
  body: 公开测试使用 N-central Appliance 2026.4.1.26 HF2。
- date: 11月12日 07:48 UTC
  title: 研究仓库记录服务器攻击前提
  body: 4EverAble2Shell 测试时启用了 Legacy API。
- date: 11月12日 08:24 UTC
  title: Previdian 传感器观测到利用尝试
  body: 公开报告记录了来自同一个源 IP 的两次尝试，尚未证实成功入侵。
- date: 11月12日 09:16 UTC
  title: Huntback 在诱捕系统上捕获完整攻击链
  body: 攻击尝试在取得 root 后安装 XMRig。
- date: 11月12日 12:50 UTC
  title: Huntback 将 21 个活跃矿工与 N-central 服务器关联
  body: 该机构交叉比对矿池标签、最近提交的份额及对应地址上的 N-central 服务。19 台报告的版本为 2026.4.1.26。
- date: 11月12日 16:00 UTC
  title: N-able 限制 Intune 集成并发布分环境指引
  body: 厂商在托管环境部署临时防护，并要求自管客户确认 Legacy API 已禁用。此前更新 Agent 和 Probe 的指引继续适用。
- date: 11月13日 03:50 UTC
  title: N-able 开始与相关客户核查新增指标
  body: 厂商称正在与这些客户评估风险并采取缓解措施。
- date: 11月13日 13:40 UTC
  title: N-able 公布 Legacy API 相关指标
  body: 厂商提供下载和回连路径，供未禁用 Legacy API 的客户排查。安全评估和修复工作继续。
- date: 2026年11月13日
  title: N-able 公布 HF3 的 Legacy API 移除和端点加固计划
  body: 厂商计划永久移除 Legacy API，并加强 Agent、Probe 和设备之间的认证与通信。
- date: 2026年11月13日
  title: 意大利 CSIRT 报告 Apache Axis 漏洞在野利用
  body: 通报记录了针对 CVE-2026-90436 的在野利用，建议迁离已停止支持的 Axis 1.x，或手动应用 Apache 补丁。通报未指明所观察到的下游产品。
- date: 2026年11月16日
  title: N-able 发布 HF3
  body: 服务端构建号 2026.4.1.39，永久封锁 Legacy API。托管和自管客户都须将 Agent 和 Probe 更新至 2026.4.1 HF3。
- date: 2026年11月16日
  title: Rapid7 披露在客户环境中观察到针对 Confluence 的利用
  body: Rapid7 于 11 月 13 日在客户环境中发现针对 Confluence Data Center 的利用，并在报告中公布了四个关联 IP。
- date: 2026年11月18日
  title: CISA 将 Apache Axis 纳入 KEV
  body: CVE-2026-90436 被列为已遭利用，要求取证排查，并为美国联邦文职行政机构（FCEB）设定 11 月 21 日处置期限。
checklist:
- title: 立即关闭 Legacy API 并限制暴露
  hint: 在系统级打开 Administration → Mail and Network Settings → Network Security → Legacy APIs，确认已停用旧版 API。限制不可信网络访问设备，通过受控路径保留 Agent 和 Probe 所需的连接，并确认受管设备仍能报到。
- title: 排查服务器和下游 Windows 活动
  hint: 保全代理、设备、任务和终端日志。排查 157.20.241[.]16（TCP 8080 和 19202–19418）、139.99.69[.]109:10128、79.76.51[.]56:39100，并关联 /dms/services/ServerUI 请求、异常进程及 Windows Agent 或 Probe 任务。Huntback 的报告末尾列出 12 组指标和主机痕迹，包括 /tmp/.xvd、/var/tmp/.xvd、xvd.service 和 SOAP 类 jline.internal.TerminalLineSettings。单条命中无法证明失陷。
- title: 分别跟踪设备和 Windows 攻击链的修复
  hint: 升级自管服务器至 2026.4.1.39。N-able 负责更新托管服务器。所有客户都须将 Agent 和 Probe 更新至 2026.4.1 HF3；重新连接后，检查 Inactive Assets 中异常的 Agent。确认失陷时，按下文响应并排查下游终端。
- title: 按部署方式核查临时防护和 Intune 状态
  hint: 托管客户按 N-able 指引更新 Agent 和 Probe，厂商已部署临时服务端防护。部署 HF3 时，检查依赖的集成是否已移除 Legacy API 访问。N-able 暂停托管环境的 Intune 集成，并尝试暂停已启用该集成的自管环境。若无法暂停自管环境中的集成，N-able 支持团队会联系客户。请通过支持团队核实恢复安排。
- title: 对照厂商的 Legacy API 指标排查
  hint: '检查到 157.20.241[.]16（TCP 8080、19202–19418）、139.99.69[.]109:10128 和 79.76.51[.]56:39100 的出站流量。在 157.20.241[.]16:8080 上查找 /jup.sh、/xvgz、/xmrig.tgz、/ob/cronhit?h=jup_start_<rig>&persist=<method> 和 /ob/fcheck。将命中项与历史配置和主机活动关联，单项命中不能证明已失陷。'
- title: 盘点其他 Axis 1.x 部署并应用对应产品的修复
  hint: 独立部署可迁至仍受支持的 SOAP 引擎，或使用应用 Apache 补丁的 Axis 构建。Confluence Data Center 9.2 可升级至 9.2.28，或迁至仍受支持的 10.x 或更高版本。暂时无法升级时，先在非生产环境测试依赖该接口的脚本、自动化和插件。以管理员身份打开 General Configuration → Further Configuration（/admin/viewspacesconfig.action），点击 Edit，取消勾选 Remote API (XML-RPC & SOAP) 并保存。设置立即生效，无需重启。确认 /plugins/servlet/soap-axis1/confluenceservice-v2 返回 403，再检查曾暴露的实例是否存在入侵迹象。
- title: 排查曾暴露的 Confluence Data Center
  hint: 保全反向代理和 Confluence 访问日志，查看 SOAP 端点的异常请求，并与应用进程启动意外子进程的记录交叉核对。排查 192.238.253[.]176、5.133.47[.]243、163.182.68[.]109 和 104.13.106[.]166。命中不等于失陷，未命中也不能排除。
- title: 将取证排查纳入 Axis 响应
  hint: CISA 要求对 CVE-2026-90436 开展取证排查。针对曾暴露的部署保全并检查证据，同时按产品指引修复。KEV 的 11 月 21 日期限适用于 FCEB 机构，其他组织也应优先处理已确认遭利用的漏洞。
sources:
- name: N-able HF3 发布说明
  says: 给出修复构建号、Agent 和 Probe 升级要求及已知限制。
- says: 记录测试服务器构建、SOAP 端点、root 攻击链及 Legacy API 前提。
- says: 记录测试构建、设备标识符，以及 Windows Agent 和 Probe 攻击链各自的利用前提。
- says: 记录仓库的初始提交及 Legacy API 补充说明。
- says: 说明重新启用旧版 API 的设置位置。
- says: 确认 HF2 构建号为 2026.4.1.26，并说明先前修复中 Agent 和 Probe 的部署方法。
- says: 第一方传感器记录了来自同一源 IP 的两次尝试，未证明成功。
- says: 将诱捕系统中的完整攻击链和矿池遥测与 21 台实际 N-central 服务器关联，提供排查指标。
- says: 记录 Apache Axis 1.x 处理入站 SOAP 故障时的类实例化漏洞。也可通过 mail-archive.com 阅读 Apache 公告。
- name: Apache Axis 邮件列表公告（可读存档）
  says: 保留 Apache 原公告并链接补丁提交。
- name: N-able 事件 202613 公开记录
  says: 提供分部署方式的指引、Intune 暂停措施，以及适用于 Legacy API 仍启用环境的排查指标。
- name: N-able 11 月 13 日安全更新
  says: 公布 Legacy API 相关指标及托管和自管环境分别应采取的措施。
- name: N-able 漏洞修复进展
  says: 说明 HF3 计划移除 Legacy API，并加强 Agent、Probe 和设备的认证与通信。
- name: 意大利 CSIRT 预警（托斯卡纳 CSIRT 公开转载）
  says: 报告 Axis 漏洞的在野利用，并给出独立部署的迁移或手动打补丁建议。
- name: Atlassian Confluence Data Center 公告
  says: 说明 XML-RPC 和 SOAP 远程 API 这一利用前提、修复版本及禁用该接口的验证步骤。
- name: Rapid7 对 Confluence 实际利用的报告
  says: 记录了客户环境中的实际利用和四个相关 IP。
- name: CISA 已知遭利用漏洞目录
  says: 11 月 18 日新增 Axis 条目，要求取证排查，并为 FCEB 设定 11 月 21 日处置期限。
cves:
- name: Apache Axis SOAP 类实例化
  description: 可达的 Axis 1.x SOAP 路径允许未认证调用者实例化类。在 N-central 中，已披露的服务器链要求启用 Legacy API，并利用另一处缺陷提权至 root。
---

[先前披露 Able2Shell 的研究者](/zh/incidents/ncentral-able2shell/) 又公开了在 N-central Appliance 2026.4.1.26 HF2 上测试的新攻击链。服务器测试中，启用 Legacy API 后，攻击者可以访问 SOAP 端点。攻击链先以设备服务账户执行命令，再借特权辅助程序取得 root 权限。

Agent2Shell 报告另行记录了 Windows 攻击路径。Reactive 路径需要设备管理平台 ID，以及已启用 Reactive 且在线的 Agent。研究者演示了以 SYSTEM 身份执行命令。Probe 路径还需要设备和任务数据、在线的 Probe，以及一个受攻击者控制并用作输出载体的现有任务。关闭 Legacy API 可消除服务器链已披露的利用前提。应单独核对 Windows 路径的处置指导，再判断受管终端是否受到保护。

Previdian 在传感器上记录了两次利用尝试。Huntback 随后在诱捕系统上记录了完整攻击链，其最后一步是安装 XMRig。研究人员按矿工名称中的 IP，将 21 个刚提交份额的矿工与可访问的 N-central 生产服务器关联，其中 19 台报告的构建是 2026.4.1.26。这是 Huntback 根据矿池遥测和服务器响应得出的结论，支持将服务器链的在野利用定为 L4。它既未给出受影响组织或下游设备的数量，也未证实 Windows 链已在野利用。

服务器链首先利用 Apache Axis 的 CVE-2026-90436，以 N-central 服务账户执行命令，再利用特权辅助程序提权。Apache 的公告说明 Axis 1.x 已停止维护。N-central 的完整受影响版本范围仍待确认。HF3 封锁 Legacy API 路径；Windows 路径需另行更新 Agent 和 Probe。升级至 HF3，并继续实施网络和配置控制。若证据显示攻击者取得 root，应将设备视为完全失陷，调查其管理的终端是否有未授权活动，并从可信系统恢复。

**厂商处置更新。** N-able 已在托管环境部署临时防护，并要求自管客户确认 Legacy API 已禁用。11 月 13 日的下载和回连指标适用于未禁用 Legacy API 的客户。应同时核查历史暴露。厂商仍在评估和处置，尚未在这份更新中公布新攻击链的修复版本。

11 月 13 日，N-able 公布了 HF3 计划。厂商拟永久移除 Legacy API，并加强 Agent、Probe 和设备的认证与通信，以降低 Agent 冒用风险。N-able 表示，其描述的 Agent 冒用需要攻击者已在终端上取得立足点。11 月 16 日的发布说明确认了构建号及修复范围。

**其他 Axis 部署。** 意大利 CSIRT 在 11 月 13 日报告 CVE-2026-90436 正被在野利用，未说明所观察到的下游产品。Apache 将 Axis 1.x 至 1.4 列为受影响版本。引擎会在服务级认证处理器运行前解析 SOAP Fault。如果类路径中有可利用的类，攻击者可远程执行代码。独立部署可迁至受支持的 SOAP 引擎，或应用源代码补丁后重新构建。N-central 用户应遵循上文的厂商指引。[Apache 补丁](https://github.com/apache/axis-axis1-java/commit/41f3b4e8d04e310ca81f86b92630ab2c11d608bd)

Atlassian 将修复前启用了 Remote API (XML-RPC & SOAP) 的 Confluence Data Center 1.x 至 9.x 列为受影响版本。从 3.0 起，新安装实例默认关闭 Remote API。9.2.28 已修复该问题，10.0 移除了该功能，Atlassian Cloud 不受影响。Rapid7 在 11 月 16 日的报告中披露，11 月 13 日在一个客户环境中发现了对 Confluence Data Center 的实际利用。其报告未给出更广泛的受害数量或影响。

N-able 于 11 月 16 日发布 HF3，永久禁用 Legacy API，并列出 CVE-2026-129271 至 CVE-2026-129287 共 17 项修复。发布说明仍将除 Take Control 外的远程控制列为停用。服务器升级后也要更新所有 Agent 和 Probe，较旧端点仍可能遭冒用。
