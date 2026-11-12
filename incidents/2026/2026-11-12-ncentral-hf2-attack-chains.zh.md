---
title: 新攻击链可影响 N-central HF2 服务器和 Windows 受管终端
summary: 研究者公开了在 N-central Appliance 2026.4.1.26 HF2 上测试的新攻击链。服务器链要求启用 Legacy API，Windows Agent 和 Probe 攻击链各有利用前提。传感器发现了针对服务器路径的尝试。
splash: 启用 Legacy API 且可被访问的 N-central HF2，以及满足已披露条件的 Windows Agent 或 Probe
wipe: 关闭 Legacy API，限制不可信网络访问设备，检查服务器和终端日志，并分别跟踪两类路径的修复。
inTheWildNote: Previdian 在传感器上观察到利用尝试，尚未确认成功入侵。
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
checklist:
- title: 立即关闭 Legacy API 并限制暴露
  hint: 在系统级打开 Administration → Mail and Network Settings → Network Security → Legacy APIs，确认已停用旧版 API。限制不可信网络访问设备，通过受控路径保留 Agent 和 Probe 所需的连接，并确认受管设备仍能报到。
- title: 排查服务器和下游 Windows 活动
  hint: 保全代理、设备、任务和终端日志。将异常的 /dms/services/ServerUI 请求、设备服务异常执行命令、Windows Agent 或 Probe 异常活动与任务及设备记录关联核对。仅匹配路径不足以证明失陷。
- title: 分别跟踪设备和 Windows 攻击链的修复
  hint: 保留先前的 HF2 安全更新，并查阅 N-able 官方公告了解新攻击路径的处置进展。放宽网络限制前，核对托管或自管部署以及 Agent 和 Probe 构建的适用指导。若确认失陷，隔离受影响的设备和受管系统，吊销暴露的凭据，并从核验过的干净系统恢复。
sources:
- says: 记录测试服务器构建、SOAP 端点、root 攻击链及 Legacy API 前提。
- says: 记录测试构建、设备标识符，以及 Windows Agent 和 Probe 攻击链各自的利用前提。
- says: 记录仓库的初始提交及 Legacy API 补充说明。
- says: 说明重新启用旧版 API 的设置位置。
- says: 确认 HF2 构建号为 2026.4.1.26，并说明先前修复中 Agent 和 Probe 的部署方法。
- says: 第一方传感器记录了来自同一源 IP 的两次尝试，未证明成功。
---

[先前披露 Able2Shell 的研究者](/zh/incidents/ncentral-able2shell/) 又公开了在 N-central Appliance 2026.4.1.26 HF2 上测试的新攻击链。服务器测试中，启用 Legacy API 后，攻击者可以访问 SOAP 端点。攻击链先以设备服务账户执行命令，再借特权辅助程序取得 root 权限。

Agent2Shell 报告另行记录了 Windows 攻击路径。Reactive 路径需要设备 ID，以及已启用 Reactive 且在线的 Agent。研究者演示了以 SYSTEM 身份执行命令。Probe 路径还需要设备和任务数据、在线的 Probe，以及一个受攻击者控制并用作输出载体的现有任务。关闭 Legacy API 可消除服务器链已披露的利用前提。应单独核对 Windows 路径的处置指导，再判断受管终端是否受到保护。

Previdian 报告其传感器观测到来自同一源 IP 的两次尝试，说明已出现针对服务器链的利用尝试。现有来源尚未证实客户遭成功入侵，完整受影响版本范围和新攻击链的修复构建仍待确认。保留针对先前漏洞的 HF2 更新，同时采取配置和网络限制措施，并跟踪厂商后续指导。
