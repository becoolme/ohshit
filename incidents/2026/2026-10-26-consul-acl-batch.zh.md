---
title: "Consul 修复五项漏洞，涉及网格私钥、ACL 绕过及 API 拒绝服务"
tags: [Consul, Kubernetes, ACL, 服务网格]
summary: "HashiCorp 10 月 26 日的五项公告涉及未认证读取缓存中的网格证书及私钥、服务和健康检查授权绕过、未认证 API 内存耗尽，以及 consul-k8s 跨命名空间提权。各漏洞的触发前提不同。"
splash: "可访问的 Consul agent HTTP API；启用 ACL 的网格；启用 global.acls.manageSystemACLs=true 的 consul-k8s"
wipe: "按产品更新：Consul CE 2.1.0、Enterprise 2.1.0/1.21.19、consul-k8s 2.1.0/1.8.18；限制 agent API 访问"
inTheWildNote: "HashiCorp 的五项公告未报告恶意利用"
cves:
  - name: 缓存中的网格叶证书授权绕过
    description: "受影响的 Consul/Enterprise 版本从 1.17.0 至 2.0.4，已修复的 Enterprise 1.21.19 除外，可在未验证 ACL 令牌时返回已有缓存的服务叶证书及私钥。要求启用 ACL 且能够访问 agent HTTP API；默认绑定回环地址限制了远程暴露。"
  - name: 代理 escape-hatch 权限绕过
    description: "影响 Consul 2.0.4 及 Enterprise 2.0.4、1.22.12、1.21.18。启用 ACL 时，具有代理及其目标服务写权限、但无 mesh write 的主体，可绕过覆盖配置键检查并提交 Envoy 配置。"
  - name: HTTP 请求内存消耗不受限制
    description: "受影响的 Consul/Enterprise 版本截至 2.0.4，已修复的 Enterprise 1.21.19 除外，在 ACL 检查前解码请求体且没有大小上限。能够访问 HTTP API 的攻击者无需有效令牌即可耗尽 agent 内存。"
  - name: 跨服务健康检查授权绕过
    description: "受影响的 Consul/Enterprise 版本从 0.7.2 至 2.0.4，已修复的 Enterprise 1.21.19 除外，启用 ACL 时，拥有同一节点上另一个服务的 service:write 权限的主体，可修改或重新绑定已有健康检查，影响服务发现或网格路由。"
  - name: consul-k8s 组件认证跨命名空间绕过
    description: "公告标明影响启用系统 ACL 管理的 consul-k8s 0.42.0 至 2.0.4，但已修复的 1.8.18 除外。攻击者需能在其他命名空间创建 ServiceAccount、取得其令牌并访问 Consul API，才能获得组件关联的 Consul 权限。"
fixed:
  - product: Consul 社区版
    status: 受影响社区版部署应升级
  - product: Consul Enterprise 2.x
    status: 厂商列出的修复版本
  - product: Consul Enterprise 1.x
    status: 厂商列出的修复版本，未单列 1.22 修复版
  - product: consul-k8s 2.x
    status: 修复组件 ACL 绑定规则
  - product: consul-k8s 1.x
    status: 修复组件 ACL 绑定规则
timeline:
  - date: 2026年10月26日
    title: HashiCorp 发布 HCSEC-2026-46 至 HCSEC-2026-50
    body: 五项公告分别列明攻击前提，以及 Consul、Enterprise 和 consul-k8s 的修复版本。
checklist:
  - title: 升级实际运行的 Consul agent 与 Kubernetes 集成
    hint: "盘点客户端与服务端 agent、部署镜像及 consul-k8s 控制器，不要只查本机 CLI。按产品采用 CE 2.1.0、Enterprise 2.1.0 或 1.21.19，以及 consul-k8s 2.1.0 或 1.8.18。不要将 1.21.19 当作 1.22 的通用降级指令，应规划厂商支持的升级路径。完成后验证每个运行组件。"
  - title: 立即限制 agent HTTP API 访问
    hint: "检查监听地址、主机进程及网络访问规则；默认回环绑定不能防止不可信本地工作负载访问。仅允许可信调用者访问。针对叶证书私钥漏洞，只有该 agent 上的 Connect-native 应用与 consul-template 配置均不依赖叶证书端点时，才可用 http_config.block_endpoints 阻断它。此缓解措施不能修复其他四项漏洞。"
  - title: 检查暴露的网格身份及低权限服务变更
    hint: "确认可访问 agent 上已缓存哪些叶证书；为 Dataplane 提供服务的服务器可能缓存多个身份。检查现有 API/审计及代理配置记录，查找异常证书获取、等价拼写的 Envoy 覆盖配置及跨服务健康检查变更。调查异常服务冒充；如确认暴露，按支持的流程轮换凭据。这些是行为排查线索，不是已发布的攻击者 IoC；单独命中不能证明失陷。"
  - title: 验证 Kubernetes 组件认证限于正确命名空间
    hint: "检查 global.acls.manageSystemACLs 与组件 ACL 绑定规则。若启用，审查哪些主体能在 Consul 命名空间以外创建 ServiceAccount、取得其令牌并访问 Consul API。更新 consul-k8s 后，用合成的非 Consul 命名空间身份验证已安装规则会拒绝认证，并排查异常组件令牌签发。关闭系统 ACL 管理的部署不受此特定漏洞影响。"
  - title: 更新后测试 HTTP 载荷兼容性与权限边界
    hint: "HCSEC-2026-48 说明，修复后多数写端点拒绝超过 512 KiB 的请求体，上线前检查较大配置提交。在测试环境确认未授权读取缓存叶证书失败，仅有服务权限的令牌不能提交网格覆盖配置，且一个服务的令牌不能改动同节点上另一服务的健康检查。"
sources:
  - name: HashiCorp HCSEC-2026-46
    says: "缓存叶证书及私钥泄露；ACL 与 API 前提、默认回环绑定，以及有使用条件的端点阻断措施。"
  - name: HashiCorp HCSEC-2026-47
    says: "明确列出受影响版本，以及 Envoy 覆盖配置注册时 service write 与 mesh write 检查不一致。"
  - name: HashiCorp HCSEC-2026-48
    says: "未认证 API 内存耗尽，以及修复后多数写端点的 512 KiB 上限。"
  - name: HashiCorp HCSEC-2026-49
    says: "同节点跨服务健康检查修改要求启用 ACL，且拥有另一服务的写权限。"
  - name: HashiCorp HCSEC-2026-50
    says: "组件身份绕过要求启用系统 ACL 管理、能在其他命名空间创建 ServiceAccount 并取得令牌，以及能够访问 Consul API。"
---

HashiCorp 于 10 月 26 日披露五项 Consul 相关漏洞。它们属于同一发布批次，但并不存在通用的未认证攻击路径。**L3：** 这些问题涉及主流服务发现与网格授权边界；公告没有确认恶意利用，也未提供受害者数量。

能够访问启用 ACL 的 agent HTTP API 的主体，可通过叶证书 API 漏洞读取**已有缓存的服务证书及其私钥**。这并不自动暴露所有网格身份：所请求证书必须已经缓存在该 agent。普通 agent 通常缓存其管理的 sidecar 身份，为 Consul Dataplane 提供服务的服务器可能缓存更多。HTTP API 默认绑定回环地址，因此远程暴露取决于部署方式，不可信本地进程仍需考虑。被窃取的身份只能访问相应网格 intentions 允许的服务；这不是根 CA 私钥泄露。

注册漏洞要求已认证主体拥有代理及其目标服务的写权限，但没有 mesh write。受影响版本中，等价拼写的 Envoy 覆盖配置键可以避开较窄的权限检查。HashiCorp 描述了可能发生在**该代理内部**的代码执行、流量读取或修改，以及该处的 intentions 绕过；不能将其描述成无条件的 Consul 服务端 RCE。独立的健康检查漏洞要求拥有同一节点上另一个服务的写权限，可操纵目标服务的健康及服务发现结果。

内存耗尽漏洞要求能够访问 API，但不需要有效 ACL 令牌。大请求体在授权前就会被处理，单纯启用 ACL 并不足够。修复也会改变兼容性：多数写端点将请求体限制为 512 KiB。

对于 consul-k8s，关键条件是 `global.acls.manageSystemACLs=true`。能够在其他 Kubernetes 命名空间创建 ServiceAccount、取得其令牌并访问 Consul API 的用户，可能冒充 Consul 组件并获得其关联权限。这不是匿名互联网攻击，也不能据此认定所有 Kubernetes 用户都能成为集群管理员。关闭系统 ACL 管理的部署不受此特定问题影响。

厂商列出的适用修复版本为 **Consul CE 2.1.0**、**Enterprise 2.1.0 或 1.21.19**，以及 **consul-k8s 2.1.0 或 1.8.18**。需特别注意，HCSEC-2026-47 将 Enterprise 1.22.12 列为受影响版本，却未单列 1.22 修复版本；应采用受支持的升级路径，不要猜测版本或盲目降级。由于产品和受影响版本集合不同，这里不提供自动版本检查器。限制或阻断单一端点只是叶证书私钥问题的临时缓解，不能替代整批更新。
