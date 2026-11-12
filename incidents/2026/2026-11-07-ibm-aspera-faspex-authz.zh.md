---
title: IBM Aspera Faspex 授权绕过可取得完整管理员权限
tags: [IBM, Aspera, 授权]
summary: IBM 称，构造的消息可在 Faspex 5.0.0 至 5.0.19 取得完整管理员权限。正文描述的是已认证用户，CVSS 向量却标为无需权限。Linux 修复为 5.0.19 PL1，需核对运行的 faspex-core 镜像为构建 1ce4b13、Fix Pack 1。
splash: IBM Aspera Faspex 5.0.0 至未打补丁的 5.0.19。IBM 正文与评分对登录前提的说明不一致。
wipe: 限制不可信来源访问并安装 5.0.19 PL1，核查运行的 faspex-core 镜像及管理员权限变更。
inTheWildNote: CISA 于 11 月 9 日将 Faspex 授权漏洞列入 KEV。
cves:
- name: 授权绕过并取得完整管理员权限
  description: IBM 称构造的消息可取得完整管理员权限，分数来自 IBM 的 CVSS 3.1 评估。
fixed:
- product: Linux 上的 IBM Aspera Faspex
  status: 核实 faspex-core 5.0.19 构建 1ce4b13、Fix Pack 1
timeline:
- date: 2026年11月7日
  title: IBM 公开 Faspex 安全公告及 CVE
  body: IBM 列出受影响版本，并建议安装 Linux 补丁。
- date: 2026年11月9日
  title: CISA 将 CVE-2026-123218 列入 KEV
  body: 目录确认已知在野利用。适用的美国联邦民事机构应在 2026 年 11 月 12 日前完成处置，并遵循厂商指引及 CISA BOD 26-04 取证排查要求。
checklist:
- title: 盘点 Faspex 并限制访问范围
  hint: 核对部署的 Faspex 版本，检查防火墙或反向代理规则。准备打补丁期间限制不可信网络的访问。IBM 对认证前提的说明仍不明确，勿只依赖登录页面。
- title: 安装厂商补丁并核对运行的镜像
  hint: 按 IBM 链接的 Faspex 容器镜像修补说明安装 5.0.19 PL1。确认运行的 faspex-core 镜像为 5.0.19 构建 1ce4b13、Fix Pack 1，再测试授权文件传输及管理操作。
- title: 审查管理员权限变更并保留证据
  hint: 保留 Faspex 及代理访问日志，对照已批准变更，审查新增管理员授权和异常管理活动。若发现可疑行为，调查访问范围及受影响凭据，再从干净系统轮换相关凭据。
sources:
- name: IBM Faspex 安全公告
  says: 列出受影响版本、对利用前提相互矛盾的表述，以及准确的 Linux 修复及镜像构建。
- name: IBM CNA 记录
  says: 记录 IBM 的漏洞描述、CVSS 向量和补丁验证细节。
- name: CISA 已知被利用漏洞目录
  says: 11 月 9 日收录 CVE-2026-123218，处置期限为 11 月 12 日。
---

IBM 公告摘要描述的是已认证用户，漏洞正文称需要已获授权的用户。同一公告及 CNA 记录的 CVSS 向量使用 `PR:N`。现有来源无法确定是否需要凭据。即使 Faspex 已要求登录，也应限制访问并修补。IBM 公告未列出临时缓解方案。CISA 随后确认已知在野利用，故上调至 L4。已核阅来源尚未确定受害者或攻击方法。

目录确认已知在野利用。适用的美国联邦民事机构应在 2026 年 11 月 12 日前完成处置，并遵循厂商指引及 CISA BOD 26-04 取证排查要求。
