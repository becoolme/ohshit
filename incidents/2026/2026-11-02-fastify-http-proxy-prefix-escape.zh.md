---
title: Fastify HTTP 代理可被解码后的路由参数绕过上游路径限制
tags:
- Node.js
- Fastify
- SSRF
summary: '@fastify/http-proxy 9.0.0 至 11.6.5 在用带参数的 prefix 和 rewritePrefix 限制上游路径时，可被未认证请求绕过。取决于上游服务，可造成 SSRF 或授权绕过。升级至 11.6.6；维护者未列出临时规避方案。'
splash: 使用 @fastify/http-proxy 9.0.0–11.6.5，并通过带参数的 prefix/rewritePrefix 限制上游路径的应用
wipe: 将 @fastify/http-proxy 升级到 11.6.6 或更高并验证上游路径限制；厂商未列出临时规避方案
inTheWildNote: 维护者公告未报告真实环境利用。
cves:
- name: 解码参数绕过路径前缀
  description: 解码后的路径分隔符与查询或片段分隔符改变上游路径，移除本应强制保留的后缀。
fixed:
- product: '@fastify/http-proxy'
  status: 已修复；受影响范围 >=9.0.0、<11.6.6
timeline:
- date: 2026年11月2日
  title: 维护者发布公告，指定 11.6.6 为修复版本
checklist:
- title: 定位受影响代理配置
  hint: 检查部署版本及锁文件，查找在 prefix 和 rewritePrefix 中使用路由参数来限制上游路径的 @fastify/http-proxy 注册配置。影响取决于这种路径限制用法，不能仅凭安装 Fastify 就认定受影响。
- title: 升级并重新部署受影响服务
  hint: 按正常依赖更新流程使用 @fastify/http-proxy 11.6.6 或更高，更新锁文件，并核实已部署服务中的实际版本。维护者没有列出临时规避方案，单纯重启代理不是修复。
- title: 验证边界并调查意外路径
  hint: 在自己的测试环境确认编码后的路径分隔符及查询、片段分隔符不能移除预期上游后缀。检查代理和上游日志中超出允许路径的访问，调查未授权数据访问或修改。仅出现此类请求不能证明已成功入侵。
sources:
- name: Fastify 维护者公告 GHSA-h3vp-4jfr-v364
---

代理将 URL 解码后的路由参数直接写入 rewritePrefix，未重新编码。解码后的斜杠结合片段或查询分隔符，可插入额外路径并丢弃强制后缀，无需使用父目录跳转。攻击需要能访问有漏洞的代理配置，实际获得的访问还取决于上游自身的授权；这不代表 Fastify 或全部代理部署都遭入侵。

GHSA-h3vp-4jfr-v364 给出了影响范围与修复版本。公开公告有请求示例，但未确认在野利用，也未公布受害者数量。
