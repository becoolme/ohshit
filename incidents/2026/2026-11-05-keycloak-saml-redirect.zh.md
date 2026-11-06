---
title: Keycloak SAML 重定向签名绕过可接管联合登录账户
summary: Keycloak 会处理签名检查遗漏的百分号编码 SAML 参数名，导致未签名消息可接管联合登录账户。上游 26.8.2 包含修复。Red Hat Build of Keycloak 受影响，但已核阅记录未给出其修复构建；Red Hat Single Sign-On 7 被列为不受此漏洞影响。
splash: 受影响的 Keycloak SAML HTTP-Redirect 身份代理流程；攻击者须能经网络访问，无需已认证账户。
wipe: 上游升级到 Keycloak 26.8.2；Red Hat 用户须按具体产品勘误处理，不能直接套用上游版本。
inTheWildNote: 已核阅厂商记录未确立在野利用或受害数量。
cves:
- name: SAML HTTP-Redirect 签名绕过
  description: 消息处理接受编码参数名，签名验证却只检查原始字面名称。Red Hat 给出 CVSS 3.1 暂定评分 9.1。
fixed:
- product: 上游 Keycloak
  status: 发布记录明确列出 CVE-2026-117691／issue54714
timeline:
- date: 2026年11月5日
  title: 上游发布及 Red Hat 记录披露 SAML 漏洞
  body: Keycloak 26.8.2 列出修复；Red Hat 描述未认证联合账户接管，并区分下游产品影响。
checklist:
- title: 找出受影响的 SAML 身份代理部署
  hint: 盘点 Keycloak 服务器、容器镜像及已配置身份提供方，检查使用 SAML HTTP-Redirect 的流程。漏洞涉及联合用户及特定绑定方式，并非所有 OIDC 登录。Red Hat 将 Build of Keycloak 列为受影响，将 Single Sign-On 7 列为不受此 CVE 影响。
- title: 按实际发行版安装修复
  hint: 上游运营者使用官方 Keycloak 26.8.2 产物，升级前阅读发布页关联的迁移指南；重启或滚动更新容器后确认实际运行版本。Red Hat 用户通过产品勘误或支持核实修复构建。已核阅 Red Hat 记录未提供认可的缓解措施或下游修复版本下限。
- title: 排查可疑联合登录
  hint: 作为防御性调查，保留身份代理、认证及应用审计记录，与安全团队检查异常联合会话及权限使用。若发现未授权会话，按既有响应流程撤销。厂商记录未公布专用指标或攻击时段，安静的日志不能证明安全。
sources:
- name: Keycloak 原始 26.8.2 发布记录
  says: 11 月 5 日列出 issue54714／CVE-2026-117691，并关联迁移指引。
- name: Red Hat 原始 CVE 数据
  says: 说明机制、暂定 CVSS3.1 评分 9.1、Build of Keycloak 受影响、Single Sign-On7 不受影响，未提供认可缓解措施。
- name: Keycloak issue API
  says: 11 月 5 日公开条目标题说明编码参数签名绕过及任意用户代理登录；正文为空。
---

签名检查与 SAML 消息处理对编码查询参数名的理解不同，构造的未签名消息因而可能取代已签名消息被处理，取得联合用户身份及其角色、资料。这是可经网络触达的认证绕过，不要求攻击者已登录。已核阅原文未确立完整受影响版本范围、在野利用或确认受害者。

Keycloak 在较广的 26.8.2 发布批次中列出此修复。本文聚焦新披露的 SAML 根因；该版本还包含前提各异的其他安全修复。Red Hat 将此漏洞评为 Important，公布 CVSS 3.1 暂定评分 9.1。其下游产品标签不能证明可用上游产物替代受支持的 Red Hat 构建。主流身份服务器发生明确的身份边界失效，因此评为 L3。
