---
title: Istio 11 月批次修复 mTLS、策略及代理绕过、多集群密钥泄露和拒绝服务
summary: Istio 在 1.31.4／1.30.8 修复八项公告及 JWKS 缓存校验问题。特定配置下可绕过 ambient mTLS、授权或 sidecar 拦截，泄露多集群密钥，或中断 istiod／ztunnel。调试请求导致的控制面崩溃需要网格身份；已核阅厂商通告未报告实际利用。
splash: Istio 1.31.0–1.31.3、1.30.0–1.30.7；影响取决于 ambient、HBONE、策略、多集群及网格身份使用。
wipe: 升级至 Istio 1.31.4+ 或 1.30.8+，更新控制面及数据面并验证相关策略和流量路径。
inTheWildNote: 已核阅厂商公告及发行说明未报告实际利用。
cves:
- name: Ambient 端口级 mTLS 绕过
  description: 网格 STRICT 下，工作负载设为 PERMISSIVE／DISABLE 时，端口级 STRICT PeerAuthentication 可能被跳过，允许明文进入该端口。
- name: Host 标头授权绕过
  description: Host 值字母大小写变化可绕过 request.headers[:authority] 或 request.headers[host] 上的 AuthorizationPolicy 条件。
- name: 过期连接跟踪绕过 sidecar
  description: 复用已拆除连接的四元组可能命中过期 ESTABLISHED 记录，绕过 iptables／nftables sidecar 流量拦截。
- name: 已认证调试请求使 istiod 崩溃
  description: 持有网格身份的工作负载可在 istio.io/debug xDS 请求发送无法解析的资源名，使整个网格控制面持续崩溃。
- name: 空 ambient 策略使 istiod 崩溃
  description: 带空 to／from 条目且未被 webhook 拒绝的 ambient AuthorizationPolicy 可使 istiod 持续崩溃，直至删除该策略。
- name: 多集群 SDS 密钥泄露
  description: 代理可声称属于另一 CLUSTER_ID，通过 SDS 取得另一集群的 kubernetes:// 密钥。
- name: 畸形 traceparent 中断 HBONE 流
  description: 畸形 55 字节 traceparent 标头可终止 ztunnel 入站 HBONE 连接任务，中断其中全部复用流。
- name: HBONE 客户端 IP 拒绝规则失效
  description: Ambient waypoint 及接收 HBONE 的 sidecar 中，ipBlocks／notIpBlocks／source.ip 可能匹配内部监听地址，使 DENY 规则放行。
fixed:
- product: Istio 1.31
- product: Istio 1.30
timeline:
- date: 2026年11月6日
  title: Istio 发布 2026-009 安全批次和两条分支修复
  body: 公告及发行说明涵盖八项 GHSA，另修复周期性 JWKS 刷新缺少响应校验。
checklist:
- title: 同时完成控制面及相关数据面升级
  hint: 盘点 Istio 修订、istiod、sidecar／waypoint 代理、CNI 拦截及 ztunnel 组件。遵循官方 1.31.4 或 1.30.8 升级文档完成数据面滚动更新，核实实际组件版本，不能只更新 chart 或 CLI。升级后测试 mTLS、授权、多集群密钥分发和代表性流量。公告没有确立更旧分支的安全状态。
- title: 核对具体策略和拓扑前提
  hint: 检查 ambient PeerAuthentication 的网格／工作负载／端口组合、AuthorizationPolicy 空 to／from 条目、Host 标头条件、sidecar 拦截规则及多集群身份。针对 HBONE 客户端 IP 问题，厂商临时方法是用 remoteIpBlocks／notRemoteIpBlocks／remote.ip
    替代 ipBlocks／notIpBlocks／source.ip；采用前验证可信代理及客户端 IP 行为符合预期。此方法只针对该策略问题，不能解决整个批次。
- title: 保留证据并调查异常网格行为
  hint: 通过现有网格和平台日志检查 istiod／ztunnel 重启、异常或被拒绝的调试 xDS 请求、意外明文或应拒绝却被接受的流量，以及可疑跨集群 SDS 访问。如适用空策略崩溃，定位并删除异常空 to／from 条目，同时安装修复。仅确认暴露后才按范围轮换密钥。公告未提供专用入侵指标，崩溃或配置匹配本身不证明利用。
sources:
- name: Istio 2026-009 原始安全公告
  says: 八项 GHSA、拓扑／策略前提、分支范围、修复版本及客户端 IP 临时方法。
- name: Istio 1.31.4 发行说明
  says: 确认八项修复、JWKS 周期刷新校验及控制面／数据面相关变更。
- name: Istio 1.30.8 发行说明
  says: 确认 1.30 分支回移的安全批次及相应修复。
---

这是新的 Istio 公告批次，与此前 eMudhra 信任锚处置不同。各漏洞条件不同，并非每个安装都暴露于所有绕过；调试崩溃需要有效网格身份。JWKS 修复是在缓存前校验周期获取的响应，不代表发现新的恶意密钥或确认客户资料被盗。未确立受害人数或实际攻击活动。L3 依据是主流服务网格安全边界风险，而非已确认利用。
