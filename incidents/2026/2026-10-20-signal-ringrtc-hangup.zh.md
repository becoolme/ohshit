---
title: "Signal 的 RingRTC 漏洞可能让通话在本地挂断后继续传输音频"
tags: [Signal, 隐私, 通话]
summary: "恶意通话对端可以淹没 RingRTC 的事件队列，阻碍本地终止通话，导致音频、甚至视频继续传输。CVE-2026-113380 影响 2.72.0 之前的 RingRTC；请将 Signal 客户端更新至包含修复库的版本。"
splash: "集成了 2.72.0 之前版本 RingRTC 的 Signal 客户端"
wipe: "安装最新 Signal 更新；集成方应使用 RingRTC 2.72.0 或更新版本"
inTheWildNote: "CISA 在 10月20日的评估中未记录利用；公开演示仅为模拟"
cves:
  - name: 事件队列饱和阻碍通话终止
    description: 通话对端可以干扰本地挂断处理，可能导致媒体流保持活动。
fixed:
  - {}
  - product: Signal 应用
    status: 已查阅来源未确定各平台应用最早修复版本
timeline:
  - date: 2026年9月4日
    title: RingRTC 2.72.0 发布
    body: 库的修复早于 CVE 公开披露。
  - date: 2026年10月20日
    title: CVE 公开
    body: MITRE 公布受影响范围及 CVSS 4.0 评分；CISA 的评估未记录利用。
checklist:
  - title: 更新每台设备上的 Signal
    hint: 安装最新官方桌面和移动端版本；RingRTC 的版本号不是 Signal 应用版本号
  - title: 确认敏感通话确实结束
    hint: 检查通话及麦克风指示；若仍在采集，关闭应用
  - title: 检查集成的 RingRTC 依赖
    hint: 集成方应要求 2.72.0 或更新版本，并重新构建客户端
sources:
  - name: MITRE CVE 记录与 CISA 补充评估
    says: 10月20日公开；影响 2.72.0 之前版本；CVSS 4.0 为 9.3；CISA 的利用评估为无
  - name: Signal RingRTC 修复
    says: 独立于 FSM 事件队列跟踪通话终止请求
  - name: Signal RingRTC 更新日志
    says: 记录 2.72.0 库版本发布
  - name: 公开技术说明与概念演示
    says: 使用离线模型演示队列饥饿，不是针对真实 Signal 通话的利用程序
---

**CVE-2026-113380** 位于 Signal 的 RingRTC 通话库。已建立通话的对端可以淹没有限状态机的事件队列，延迟本地挂断流程，使音频、甚至视频继续传输。攻击者需要参与通话；来源未证实可对空闲设备静默采集。

厂商补丁独立于队列事件跟踪终止请求。修复库的门槛为 **RingRTC 2.72.0**。9月4日的库版本发布与 10月20日的漏洞公开是两个不同日期。这个库版本号和发布日期都不能确定各操作系统上 Signal 应用最早修复版本。

定为 **L3**，因为主流通信组件存在可信的保密性风险。公开演示仅离线模拟队列行为，并不是可用的 Signal 利用程序。CISA 在 10月20日的评估中未记录利用，但这不代表从未发生攻击。
