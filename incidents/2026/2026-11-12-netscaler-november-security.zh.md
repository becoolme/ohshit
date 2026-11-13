---
title: Citrix 修复 NetScaler ADC 和 Gateway 的 28 个漏洞及 Console 认证绕过
summary: NetScaler ADC 和 Gateway 的默认部署也受数据包处理溢出影响。其他漏洞取决于 VPN 或 AAA 等功能。能访问 NetScaler Console 的攻击者无需认证即可绕过登录控制。先更新 ADC 和 Gateway，再更新 Console。
splash: 客户自管的 NetScaler ADC、Gateway 和 Console，包括 Secure Private Access Hybrid 部署中的 ADC/Gateway。
wipe: 先更新 ADC 和 Gateway，再将 NetScaler Console 升至 14.1-74.34 或更新版本。按产品核对固件构建。
inTheWildNote: Citrix 未发现这批漏洞存在已知利用，也未公布相关指标。
cves:
- name: 数据包引擎溢出
  description: 影响所有 ADC 或 Gateway 配置，包括默认配置。触发无需认证。
- name: SMPP 溢出
  description: 需要 SMPP 负载均衡或内容交换虚拟服务器。
- name: DNS 内存损坏
  description: 需要 DNS 负载均衡和递归解析。
- name: DoH 重复释放
  description: 需要 DNS over HTTPS 负载均衡。
- name: Push 溢出
  description: 需要 PUSH 类型的负载均衡虚拟服务器。
- name: RTSP ALG 溢出
  description: 需要 RTSP 负载均衡虚拟服务器，或启用了 RTSP ALG 的 LSN 组。
- name: Gateway 与 AAA 内存溢出
  description: 无需认证即可触发，前提是配置了 Gateway 或 AAA 虚拟服务器。
- name: SAML 溢出
  description: 需要配置 SAML 认证操作。
- name: WebAuth 溢出
  description: 需要配置 WebAuth 操作。
- name: 邮件 OTP 溢出
  description: 需要配置邮件认证操作。
- name: 知识问答认证溢出
  description: 需要配置带 KBAttribute 的 LDAP 操作或邮件操作。
- name: 客户端证书认证溢出
  description: 需要配置客户端证书认证操作。
- name: LDAP 认证溢出
  description: 需要配置 Gateway 或 AAA 虚拟服务器。
- name: 认证请求溢出
  description: 需要配置 Gateway 或 AAA 虚拟服务器。
- name: 端点分析溢出
  description: 需要启用端点分析的 VPN 或 AAA 虚拟服务器。
- name: 请求处理可导致反复重启
  description: 前提是能够通过数据路径访问 ADC 或 Gateway。
- name: HTTP/2 溢出
  description: 需要在 HTTP 或 SSL 虚拟服务器的配置文件中启用 HTTP/2。
- name: Base64 策略溢出
  description: 影响绑定了 B64DECODE 策略表达式或配置了应用防火墙的设备。
- name: 日志记录认证数据
  description: 需要在发生过注销的设备上具备 /var/log/httperror.log 的本地读取权限。
- name: 应用防火墙检查溢出
  description: 需要在 AppFW 配置文件中启用公告列出的受影响检查功能之一。
- name: 协议负载均衡溢出
  description: 需要 Diameter、SIP-over-TCP、MQTT 或 RADIUS 负载均衡虚拟服务器。
- name: GSLB 与地理定位溢出
  description: 需要启用 GSLB MEP、静态邻近性、自动同步配置或地理定位响应策略。
- name: SIP ALG 与 DNS 日志溢出
  description: 需要在 LSN 组启用 SIP ALG，或启用 DNS 应答区安全日志。
- name: 管理面溢出
  description: 不受信任的主机需能访问 NSIP 或 NSIP6 地址。
- name: ICA 代理溢出
  description: 需要 VPN Gateway、AAA 虚拟服务器或 HDX 内容重定向虚拟服务器。
- name: HTTP/3 溢出
  description: 需要 HTTP_QUIC 负载均衡或内容交换虚拟服务器。
- name: BGP 路由溢出
  description: 需要配置 BGP 邻居且该邻居未启用 TCP-MD5 认证。攻击者必须是该邻居或能冒充它。
- name: SSL/TLS/DTLS 溢出
  description: 需要配置 ECH 的 TLS 1.3 虚拟服务器（包括公告所列 Intel QAT 场景），或绑定了 SafeNet HSM 密钥的 SSL 虚拟服务器。
- name: Console 认证绕过
  description: 能访问 Console IP 的攻击者无需认证即可访问受限资源。
fixed:
- {}
- {}
- {}
- {}
- {}
timeline:
- date: 2026年11月12日
  title: Citrix 发布固件和 Console 安全公告
  body: CERT-EU 建议优先更新面向互联网的 Gateway 和 AAA 设备。
checklist:
- title: 先更新 ADC 和 Gateway
  hint: 优先处理面向互联网的 Gateway 和 AAA 设备。安装 14.1-73.57、13.1-64.39 或下列对应的 FIPS/NDcPP 构建。更新所有受影响节点，并安排 ICA 会话重新连接。
- title: 更新 Console 并先检查许可证
  hint: 更新 ADC/Gateway 后安装 Console 14.1-74.34 或更新版本。若从 14.1-51.x 之前的构建升级且仍用旧版 Pooled 或 Flexed 文件许可证，请联系 Citrix 或合作伙伴申请 LAS 文件扩展，并在更新 Console 前应用。
- title: 检查网络可达性和功能暴露
  hint: 在配置中查找 add vpn vserver 和 add authentication vserver 条目。按 CTX697305 核对各协议和功能。部署补丁期间，将 Console 和 NSIP/NSIP6 管理访问限制在可信网络。
- title: 验证业务流量并保留诊断日志
  hint: 确认各节点实际运行的构建。变更后测试 Gateway 登录、ICA 重连、负载均衡服务和 Console 管理。如果异常持续，保留崩溃、重启和访问日志供调查。
sources:
- says: 列出 28 个 CVE、功能前提和固件构建。
- says: 说明 Console 认证绕过及其独立修复。
- says: 说明升级顺序、LAS 许可证、ICA 会话中断和已知利用情况。
- says: 建议优先更新面向互联网的 Gateway 和 AAA 设备。
---

Cloud Software Group 在同一批更新中发布了两份 NetScaler 公告。CTX697305 列出了客户自管 ADC 和 Gateway 设备的 28 个 CVE。数据包处理溢出 CVE-2026-120868（CVSS 4.0 评分 9.3）影响默认配置，无需认证即可触发。CVE-2026-107412（9.5）影响配置了 Gateway 或 AAA 虚拟服务器的设备，涵盖 SSL VPN、ICA Proxy、CVPN 或 RDP Proxy 等场景。厂商称这两处溢出可能导致设备行为异常或拒绝服务。CTX697320 单独修复 Console 认证绕过 CVE-2026-120869（9.4），触发前提是能通过网络访问 Console IP。

ADC/Gateway 公告也适用于 Secure Private Access Hybrid 部署中的 NetScaler 实例。Citrix 表示，这批公告涉及的 Citrix 托管云服务已完成更新。厂商未公布指标，也未发现这批新披露漏洞存在已知利用。此次更新与[九月遭在野利用的 NetScaler 漏洞](https://support.citrix.com/external/article/CTX697096)分属不同批次。

默认配置下的数据包处理路径受影响，VPN 网关又常面向外部网络，因此定为 L3。即使未启用其他漏洞所需的功能，也应更新设备。[厂商升级指南](https://community.citrix.com/techzone-blogs/110_security-updates/security-updates-for-netscaler-adc-netscaler-gateway-and-netscaler-console/)列出了顺序及旧版许可证的例外流程。
