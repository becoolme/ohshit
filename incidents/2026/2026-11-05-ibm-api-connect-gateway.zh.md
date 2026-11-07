---
title: IBM API Connect 更新修复认证绕过及远程代码执行漏洞
tags: [IBM, API Connect, 网关, 认证]
summary: IBM 11 月 5 日的 API Connect 公告涵盖认证绕过与代码执行漏洞，其中部分无需登录。API Connect 10.0.8.0–10.0.8.12 应升至 10.0.8.13，V12 OnPrem 12.1.0.0–12.1.1.2 应升至 12.1.1.3。具体 CVE 随版本线而异。
splash: 可经网络访问且使用受影响 10.0.8 或 V12 OnPrem 构建的 IBM API Connect。认证前提因漏洞而异。
wipe: 限制不可信来源访问，安装对应版本线的 IBM 修复，核查网关配置及管理员访问。
inTheWildNote: IBM 公告说明漏洞影响及补丁，未报告实际利用。
cves:
- name: 签名验证缺陷导致认证绕过
  description: 产品错误验证加密签名时，未认证攻击者可绕过认证。两份公告均列出该漏洞。
- name: 对象属性可导致已认证代码执行
  description: 已认证攻击者可修改系统保留属性，并可能执行代码。两份公告均列出该漏洞。
- name: 路径穿越导致远程代码执行
  description: IBM V12 公告列出可导致代码执行的路径穿越漏洞，评分标为无需权限。
- name: 硬编码凭据可导致完整管理员控制
  description: IBM V12 公告称远程攻击者可通过硬编码凭据取得管理员控制。
- name: 目录认证缺陷可导致访问令牌被获取
  description: 两份公告均列出关联目录的认证缺陷，远程攻击者可借此取得其他用户的访问令牌。
fixed:
- status: 使用 V10 Fix Central 软件包
- status: 使用 V12 OnPrem 软件包并遵循升级说明
timeline:
- date: 2026年11月5日
  title: IBM 分别发布 V10 和 V12 OnPrem 安全公告
  body: 两份公告列出不同的 CVE 清单及各版本线的修复。
checklist:
- title: 盘点部署并限制不可信来源访问
  hint: 确认确切的 API Connect 版本，检查管理端、门户及网关接口的网络访问范围。在准备升级期间，尽可能限制不可信来源访问。IBM 未列出临时缓解方案。
- title: 升级受影响的版本线
  hint: 使用对应 IBM 公告中的 Fix Central 链接并遵循升级说明。核查整个部署的运行构建，再测试授权登录及网关流量。
- title: 审查访问及配置变更
  hint: 保留网关、门户及管理审计日志，调查异常令牌签发、管理员操作、租户变更及网关配置修改。若确认失陷，先确定受影响密钥及会话范围，再进行吊销或轮换。
sources:
- name: IBM API Connect V12 OnPrem 公告
  says: 列出 12.1.0.0–12.1.1.2 受影响范围、12.1.1.3 修复及完整 CVE 清单。
- name: IBM API Connect V10 公告
  says: 列出 10.0.8.0–10.0.8.12 受影响范围、10.0.8.13 修复及完整 CVE 清单。
---

11 月 5 日的两份公告涵盖部分相同的 CVE，也分别列有各版本线特有的漏洞。上文重点列出严重的认证及执行路径。请查阅对应版本的公告，确认完整清单及利用前提。文中分数采用 IBM 的 CVSS 3.1 基础评分。IBM 未在公告中公布受害数据或确认在野利用。
