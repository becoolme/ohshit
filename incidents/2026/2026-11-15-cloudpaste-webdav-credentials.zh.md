---
title: CloudPaste 公开文件分享可泄露 WebDAV 存储凭据
summary: 在 CloudPaste 1.1.0 至 1.9.1 中，知道公开分享标识符的未认证请求者可能获得后端 WebDAV 用户名和密码。限制代理链接接口的访问并轮换暴露的存储凭据。尚未确认有修复版本。
splash: 代理链接接口可被访问，且存在直连上游的公开 WebDAV 分享的 CloudPaste 1.1.0 至 1.9.1 实例。
wipe: 禁止从公网访问 /api/proxy/link，并轮换可能暴露的 WebDAV 存储账户凭据。
inTheWildNote: 研究人员在实验环境中复现了泄露，尚无生产环境遭利用的报告。
cves:
- name: 代理链接响应回传 WebDAV 凭据
  description: 未认证的代理链接接口在解析公开分享时，可能回传 WebDAV 的 Basic Authorization 请求头。
timeline:
- date: 2026年10月29日
  title: 较早的报告披露同一接口的访问控制缺陷
  body: 报告描述未经授权读取文件及绕过分享密码的问题。
- date: 11月15日 02:57 UTC
  title: 研究人员公布 WebDAV 凭据泄露的复现
  body: 测试实例回传存储凭据，研究人员用这些凭据读取了未分享的文件。
- date: 11月16日 00:00 UTC
  title: VulnCheck 发布 CVE-2026-129494
  body: 记录列出 1.1.0 至 1.9.1 为受影响版本。
checklist:
- title: 限制代理链接接口
  hint: 在边缘和源站阻断外部对 POST /api/proxy/link 的访问，包括适用的 Worker 直连地址。若可信反向代理需要该接口，仅允许该代理访问，并确认其他网络的未认证请求会遭拒绝。阻断接口可能影响链接解析。
- title: 轮换可能暴露的 WebDAV 凭据
  hint: 若接口曾对外开放，将使用直连上游的公开 WebDAV 分享所用凭据按已暴露处理。在 WebDAV 服务端吊销旧凭据，通过可信管理渠道更换，仅给替代账户授予必要的存储权限。
- title: 排查存储访问并跟踪补丁
  hint: 保留 CloudPaste 代理链接路由和后端 WebDAV 服务的访问日志。排查异常请求及随后以该存储账户执行的读取、写入或删除。维持访问限制，直到可验证的补丁发布，并确认响应不会向外部调用者返回存储凭据。
sources:
- name: Wu Yulun 的 CloudPaste 复现报告
  says: 记录公开 WebDAV 分享、直连上游请求，以及如何重用响应中的存储凭据。
- name: VulnCheck CVE 记录
  says: 列出受影响版本范围及 CVSS 4.0 评分 8.7。
- name: 较早的代理链接访问控制报告
  says: 记录同一接口的文件访问和分享密码绕过问题。
- name: CloudPaste 发布列表
  says: 核查时最新发布版本为 v1.9.1。
---

11 月 15 日公开的复现显示，未认证的请求者可将公开 WebDAV 文件分享的标识符提交到 `POST /api/proxy/link`。在直连上游模式（`use_proxy: 0`）下，CloudPaste 回传上游 URL 和含有存储账户凭据的 Basic Authorization 请求头。研究人员解码请求头后，用所得凭据从测试 WebDAV 服务读取了未分享的文件。若后端服务可访问且账户权限更广，这些凭据还可能用于修改或删除文件。

10 月的报告记录了同一接口的文件访问和密码校验问题。11 月的报告进一步复现了后端账户的可重用凭据泄露。应限制接口访问，并在存储服务端吊销此前暴露的凭据。发布本文时尚未确认有修复版本。
