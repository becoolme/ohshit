---
title: Spring Security 修复条件性 SpEL 代码执行及另外五项安全漏洞
summary: Spring Security 11 月 19 日公告修复六项漏洞，最严重的一项可在外部输入绑定到 ELRequestMatcher 属性时执行代码。其他问题涉及响应式认证、WebAuthn、RSocket、IP 规则及 OAuth2 密钥，具体暴露取决于功能和配置。
splash: 使用受影响绑定、认证、RSocket、IP 匹配或客户端注册路径的 Spring Security 应用。
wipe: 按所用版本线升级至厂商修复版；旧版本线补丁及四段式替代版本需要企业支持。
inTheWildNote: 本次阅读的 Spring 公告未确认真实环境中的利用。
cves:
- name: ELRequestMatcher 表达式执行
  description: 外部输入若绑定到 ELRequestMatcher 类型的 bean 属性，可在应用进程中执行不受限的 SpEL。
- name: 响应式认证用户名时序泄露
  description: 可达的响应式认证端点若使用 AbstractUserDetailsReactiveAuthenticationManager 或其子类，响应时间差可能泄露有效用户名。
- name: WebAuthn 克隆认证器检测失效
  description: 7.0.0–7.0.8 和 7.1.0–7.1.2 的 Webauthn4JRelyingPartyOperations 未能拒绝不递增的签名计数；攻击者须已持有可生成有效断言的克隆认证器。
- name: RSocket 认证内存耗尽
  description: 可达 RSocket 端点若保留 BasicAuthenticationPayloadExchangeConverter 作为 AuthenticationPayloadInterceptor 转换器，特制元数据可触发过量内存分配。
- name: 跨地址族 IP 访问规则绕过
  description: 7.1.0–7.1.2 的 IP 限制在网络栈提供另一地址族且前缀字节匹配时，可能错误地在 IPv4/IPv6 间匹配。
- name: OAuth2 客户端密钥泄露
  description: ClientRegistration.toString() 包含客户端密钥；日志、字符串拼接或异常输出可能把密钥暴露到不应保存凭据的位置。
fixed:
- product: Spring Security 7.1
  status: 开源版
- product: Spring Security 7.1 企业替代版本
  status: 仅限企业支持
- product: Spring Security 7.0
  status: 开源版
- product: Spring Security 7.0 企业替代版本
  status: 仅限企业支持
- product: Spring Security 6.5
  status: 仅限企业支持
- product: Spring Security 6.4
  status: 仅限企业支持
- product: Spring Security 5.8
  status: 仅限企业支持
- product: Spring Security 5.7
  status: 仅限企业支持
timeline:
- date: 2026年11月19日
  title: Spring 发布六份 Spring Security 安全公告
  body: 厂商列出各功能的利用前提和修复版本，包括仅限企业支持的替代版本。
checklist:
- title: 盘点实际解析版本及受影响功能
  hint: 检查 Maven dependency:tree 或 Gradle dependencies 中部署的 spring-security 依赖。追踪外部输入到 ELRequestMatcher 属性的绑定、可达的响应式及 RSocket 认证、WebAuthn 操作、IP 规则和 ClientRegistration 输出；仅存在依赖不能证明可利用。
- title: 选择正确修复版本及支持渠道
  hint: 开源版使用 7.1.3 或 7.0.9，或使用下表对应企业版。所列旧版本线补丁需要企业支持；不受支持的版本线应迁至已修复且受支持的版本线。重新构建部署，核实运行时实际依赖，并测试认证、授权及 RSocket 行为。
- title: 按配置核实暴露前提
  hint: 代码执行要求攻击者输入可到达匹配器属性。RSocket 风险要求默认转换器路径；WebAuthn 风险要求攻击者已持有有效的克隆认证器。IP 规则风险要求跨地址族呈现。逐项核对公告，不要假设所有 Spring 应用均可被远程利用。
- title: 复查客户端密钥是否进入输出
  hint: 在获准范围检查日志及异常路径中的 ClientRegistration 输出，不要把密钥复制到工单。作为一般响应建议，若发现泄露，应限制暴露日志访问并轮换受影响 OAuth2 客户端密钥。升级可阻止后续输出，但不会删除旧日志；仅存在依赖不能证明密钥已被盗。
sources:
- name: Spring Security CVE-2026-59273
  says: 外部输入若绑定到 ELRequestMatcher 类型的 bean 属性，可在应用进程中执行不受限的 SpEL。
- name: Spring Security CVE-2026-59329
  says: 可达的响应式认证端点若使用 AbstractUserDetailsReactiveAuthenticationManager 或其子类，响应时间差可能泄露有效用户名。
- name: Spring Security CVE-2026-59330
  says: 7.0.0–7.0.8 和 7.1.0–7.1.2 的 Webauthn4JRelyingPartyOperations 未能拒绝不递增的签名计数；攻击者须已持有可生成有效断言的克隆认证器。
- name: Spring Security CVE-2026-59331
  says: 可达 RSocket 端点若保留 BasicAuthenticationPayloadExchangeConverter 作为 AuthenticationPayloadInterceptor 转换器，特制元数据可触发过量内存分配。
- name: Spring Security CVE-2026-59333
  says: 7.1.0–7.1.2 的 IP 限制在网络栈提供另一地址族且前缀字节匹配时，可能错误地在 IPv4/IPv6 间匹配。
- name: Spring Security CVE-2026-59400
  says: ClientRegistration.toString() 包含客户端密钥；日志、字符串拼接或异常输出可能把密钥暴露到不应保存凭据的位置。
---

代码执行要求应用把不可信输入绑定到 ELRequestMatcher 类型的 bean 属性，随后不受限的 SpEL 反射及方法调用以应用权限运行。不能据此声称普通请求匹配本身即可执行代码。评级 L3 基于主流安全库中的条件性代码执行；这些公告未确认实际受害者或利用事件。

各漏洞范围不同。代码执行和客户端密钥问题列出的范围为 7.1.0–7.1.2、7.0.0–7.0.8、6.5.0–6.5.12、6.4.0–6.4.19、5.8.0–5.8.28，以及 5.7.26 或更早版本。响应式时序问题的最旧范围为 5.7.0–5.7.26，其余所列范围相同。RSocket 还涵盖 6.0.0–6.4.19，最旧范围列为 5.7.0–5.7.26。WebAuthn 仅影响所列 7.0 和 7.1 范围；跨地址族 IP 匹配仅影响 7.1.0–7.1.2。不要把其中一项的范围套用到全部六项。

下表保留厂商所列全部八种修复版本，不将企业版本当成开源版。公告要求升级，并表示修复后无需其他缓解措施。下列本地暴露复查及历史日志调查属于一般运维建议，不代表厂商要求所有用户统一重置凭据。
