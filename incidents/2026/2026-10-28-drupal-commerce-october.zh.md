---
title: Drupal Commerce 修复六项漏洞，其中访问绕过漏洞已遭利用
tags:
  - Drupal
  - Commerce
  - 访问绕过
summary: Drupal 确认 Commerce Core 路由及字段访问绕过漏洞 CVE-2026-118539 已遭利用。10 月 28 日批次修复六项漏洞，应升级至 3.3.13 或 8.x-2.41，并审计订单异常。
splash: 低于 2.41 或处于 3.0.0–3.3.12 的 Drupal Commerce Core；已遭利用的漏洞无需登录
wipe: 将 Commerce Core 升级至 3.3.13 或 8.x-2.41，审计订单并检查已启用的 API 集成
inTheWildNote: Drupal 确认 CVE-2026-118539 遭在野利用，不代表批次内所有漏洞均遭利用。
cves:
  - name: 路由及实体字段访问绕过
    description: 访问检查不足可能造成商户财务损失，已确认遭利用。
  - name: 未发布变体泄露
    description: JSON:API 可暴露已发布产品的未发布变体。Commerce 3.3.x 不受这一特定漏洞影响。
  - name: 跨促销优惠券变更
    description: 启用 JSON:API 或 REST 写入时，只能管理自身促销的用户也可更改其他促销的优惠券。
  - name: 默认商店访问绕过
    description: 拥有创建商店或编辑自身商店权限的不可信用户，可修改默认商店并接收其他订单。
  - name: Commerce 收件箱 CSRF
    description: 恶意页面可诱导商店管理员关闭共享通知，包括安全更新通知。
  - name: 变体字段推断
    description: 反复执行 JSON:API 查询可泄露访问者无权查看的产品变体字段。
fixed:
  - {}
  - {}
timeline:
  - date: 2026年10月28日
    title: 发布六项 Commerce Core 公告及修复
    body: SA-CONTRIB-2026-254 确认漏洞遭利用，并建议审计订单。
checklist:
  - title: 升级已安装的 Commerce 分支
    hint: 通过 composer show drupal/commerce 检查版本，更新至 3.3.13 或 Drupal 命名的 8.x-2.41 版本。部署更新后的锁文件并核实运行版本；仅更新 Drupal core 不能修复此模块。
  - title: 审计订单及 API 权限
    hint: 按 SA-CONTRIB-2026-254 审计订单，将意外变更与支付及履约记录对照。检查 JSON:API/REST 写权限、商店权限及未发布产品变体；其他公告的利用前提各不相同。
sources:
  - {}
  - {}
  - {}
  - {}
  - {}
  - {}
---

已遭利用的漏洞无需登录，影响 Commerce Core，并非 Drupal core。此处将同一发布批次的另外五项公告合并记录。公告未提供受害者数量或静态指标。L4 依据已确认的利用情况；其余漏洞的权限及配置前提各不相同。
