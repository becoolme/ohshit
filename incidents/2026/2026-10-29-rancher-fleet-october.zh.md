---
title: Rancher 与 Fleet 修复管理集群接管及凭据外传等问题
tags:
  - Rancher
  - Fleet
  - Kubernetes
summary: 四份公告涉及 Fleet 集群管理员提权，以及 Rancher shell 越权、SSRF 和凭据转发。默认部署中的部分路径仅需普通已认证用户。需同时升级 Rancher 和 Fleet；暴露不等于已遭利用。
splash: 具有默认 user 角色的 Rancher 账户，以及云资源创建表单用户
wipe: 升级两个组件，核对 Fleet 实际版本，并使可能被转发的 Rancher 凭据失效
inTheWildNote: 厂商公告未报告在野利用或受害者数量。
cves:
  - name: Fleet 控制器提权
    description: 默认角色用户可诱使导入控制器使用管理集群凭据，取得 cluster-admin 及下游密钥。
  - name: 本地集群 shell 授权绕过
    description: 已认证用户可启动 cattle-system 中的非特权 shell pod，本身不增加 Kubernetes API 权限。
  - name: 元代理 SSRF
    description: 已认证的 HTTP/1.1 绝对形式请求若未被改写而直接抵达 Rancher，可绕过目标白名单。
  - name: 元代理凭据转发
    description: 普通资源创建查询，或缺少凭据选择请求头的 API 调用，可能向允许的第三方主机转发 Rancher 凭据。
fixed:
  - product: Rancher 2.15
  - product: Rancher 2.14
  - product: Rancher 2.13
  - product: Rancher 2.12
  - product: Rancher 2.11
    status: 仅为 Rancher 修复，须另查 Fleet
  - product: Fleet 0.16
  - product: Fleet 0.14
  - product: Fleet 0.13
  - product: Fleet 0.15
timeline:
  - date: 2026年10月29日
    title: Rancher 发布本文所引的管理面安全公告
checklist:
  - title: 同时升级 Rancher 及其内置 Fleet
    hint: 按表格核对两个已安装版本，协同升级兼容的 Rancher/Fleet 版本。Fleet 阈值针对控制器提权，Rancher 阈值针对所引三项 Rancher 漏洞；本表不保证十月发布批次内所有公告均已修复。
  - title: 检查跨命名空间 kubeconfig 引用
    hint: 升级后，手工管理的跨命名空间密钥须将 fleet.cattle.io/kubeconfig-referenceable-from 设为 Cluster 的命名空间，检查 Imported 条件。不要把 allowUnlabeledKubeConfigSecretNamespaces 长期开启作为绕过办法；已有代理仍会保留。
  - title: 使可能外传的凭据失效
    hint: 打补丁后轮换或删除经元代理使用的 Rancher API 令牌，并使用户会话失效。审计 whitelist-domain、驱动和 ProxyEndpoint。API 客户端若需指定上游 Authorization 值，须使用 X-API-Auth-Header。
  - title: 检查管理面访问及证据
    hint: 调查 cattle-system 中异常 dashboard-shell-* pod、shell 审计请求、本地 Fleet 代理及授予 cluster-admin 的 ClusterRoleBinding。移除无法解释的 shell pod。正常拒绝请求也会产生 Failed to proxy 日志，不能据此证明已转发或失陷。若怀疑 SSRF，轮换可访问的内部服务及云元数据凭据。
  - title: 安排升级期间降低暴露
    hint: 将 Fleet 工作区创建及集群、bundle 写权限收紧至可信操作人员。所有 Rancher 路径使用理解 HTTP 的入口代理，阻止非必要组件从 pod 直连 Service，并阻止 Rancher 对内部服务及元数据的非必要访问。shell 端点仅允许可信管理网络访问。这些措施只能降低暴露，不能取代补丁。
sources:
  - name: Fleet 控制器提权公告
  - name: Rancher 本地 shell 公告
  - name: Rancher SSRF 公告
  - name: Rancher 凭据转发公告
---

Fleet 默认启用。控制器漏洞只需普通已认证用户，无需已有本地集群角色。

shell 漏洞提供管理网络立足点，本身不授予 cluster-admin。SSRF 需要可直达的 HTTP/1.1 绝对形式请求；经测试的 HTTP 代理会改写或拒绝，但本地 pod 仍可能直达 Service。元数据凭据泄露取决于部署环境，例如 AWS IMDSv1。

凭据转发可在正常浏览云资源创建界面时发生，无需攻击者发起请求。补丁能阻止后续转发，但不会使已发送凭据失效。尚未确立已遭利用。L3 反映主流控制面和租户隔离影响。
