---
title: 新攻击链可影响 N-central HF2 服务器和 Windows 受管终端
summary: Huntback 报告有 21 台 N-central 服务器遭 4EverAble2Shell 利用后运行矿工，其中 19 台使用 2026.4.1.26 HF2。服务器链需要启用 Legacy API。另行公开的 Windows Agent 和 Probe 攻击路径有各自的前提。
splash: 启用 Legacy API 且可被访问的 N-central HF2，以及满足已披露条件的 Windows Agent 或 Probe
wipe: 关闭 Legacy API，限制不可信网络访问设备，检查服务器和终端日志，并分别跟踪两类路径的修复。
inTheWildNote: Huntback 报告服务器攻击链已在野利用。Windows 攻击路径的在野利用仍待确认。
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
checklist:
- title: 立即关闭 Legacy API 并限制暴露
  hint: 在系统级打开 Administration → Mail and Network Settings → Network Security → Legacy APIs，确认已停用旧版 API。限制不可信网络访问设备，通过受控路径保留 Agent 和 Probe 所需的连接，并确认受管设备仍能报到。
- title: 排查服务器和下游 Windows 活动
  hint: 保全代理、设备、任务和终端日志。排查 157.20.241[.]16（TCP 8080 和 19202–19418）、139.99.69[.]109:10128、79.76.51[.]56:39100，并关联 /dms/services/ServerUI 请求、异常进程及 Windows Agent 或 Probe 任务。Huntback 的报告末尾列出 12 组指标和主机痕迹。单条命中无法证明失陷。
- title: 分别跟踪设备和 Windows 攻击链的修复
  hint: 保留先前的 HF2 安全更新，并查阅 N-able 官方公告了解新攻击路径的处置进展。放宽网络限制前，核对托管或自管部署以及 Agent 和 Probe 构建的适用指导。若确认失陷，隔离受影响的设备和受管系统，吊销暴露的凭据，并从核验过的干净系统恢复。
sources:
- says: 记录测试服务器构建、SOAP 端点、root 攻击链及 Legacy API 前提。
- says: 记录测试构建、设备标识符，以及 Windows Agent 和 Probe 攻击链各自的利用前提。
- says: 记录仓库的初始提交及 Legacy API 补充说明。
- says: 说明重新启用旧版 API 的设置位置。
- says: 确认 HF2 构建号为 2026.4.1.26，并说明先前修复中 Agent 和 Probe 的部署方法。
- says: 第一方传感器记录了来自同一源 IP 的两次尝试，未证明成功。
- says: 将诱捕系统中的完整攻击链和矿池遥测与 21 台实际 N-central 服务器关联，提供排查指标。
- says: 记录 Apache Axis 1.x 处理入站 SOAP 故障时的类实例化漏洞。
cves:
- name: Apache Axis SOAP 类实例化
  description: 可达的 Axis 1.x SOAP 路径允许未认证调用者实例化类。在 N-central 中，已披露的服务器链要求启用 Legacy API，并利用另一处缺陷提权至 root。
---

[先前披露 Able2Shell 的研究者](/zh/incidents/ncentral-able2shell/) 又公开了在 N-central Appliance 2026.4.1.26 HF2 上测试的新攻击链。服务器测试中，启用 Legacy API 后，攻击者可以访问 SOAP 端点。攻击链先以设备服务账户执行命令，再借特权辅助程序取得 root 权限。

Agent2Shell 报告另行记录了 Windows 攻击路径。Reactive 路径需要设备 ID，以及已启用 Reactive 且在线的 Agent。研究者演示了以 SYSTEM 身份执行命令。Probe 路径还需要设备和任务数据、在线的 Probe，以及一个受攻击者控制并用作输出载体的现有任务。关闭 Legacy API 可消除服务器链已披露的利用前提。应单独核对 Windows 路径的处置指导，再判断受管终端是否受到保护。

Previdian 在传感器上记录了两次利用尝试。Huntback 随后在诱捕系统上记录了完整攻击链，其最后一步是安装 XMRig。研究人员按矿工名称中的 IP，将 21 个刚提交份额的矿工与可访问的 N-central 生产服务器关联，其中 19 台报告的构建是 2026.4.1.26。这是 Huntback 根据矿池遥测和服务器响应得出的结论，支持将服务器链的在野利用定为 L4。它既未给出受影响组织或下游设备的数量，也未证实 Windows 链已在野利用。

服务器链首先利用 Apache Axis 的 CVE-2026-90436，以 N-central 服务账户执行命令，再利用特权辅助程序提权。Apache 的公告说明 Axis 1.x 已停止维护。N-central 的完整受影响版本范围和这两条新攻击路径的修复构建仍待确认。继续保留先前的 HF2 更新，并实施网络和配置控制。若证据显示攻击者取得 root，应将设备视为完全失陷，调查其管理的终端是否有未授权活动，并从可信系统恢复。
