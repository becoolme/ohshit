---
title: LXD 和 MicroCloud 可被利用受信任公钥证书冒充客户端
tags: [LXD, MicroCloud, 身份认证]
summary: 攻击者若能访问 HTTPS API 并取得受信任客户端的公钥证书，无需对应私钥即可冒充该客户端。能否取得宿主机 root 权限取决于被冒充身份的权限。
splash: 攻击者可访问 API 并取得受信任客户端公钥证书的 LXD 或 MicroCloud 部署
wipe: 在现有通道刷新两个 snap，并核对已安装版本
inTheWildNote: Canonical 确认漏洞，公告未报告在野利用。
cves:
  - name: 未验证的客户端证书链
    description: 认证检查了中间证书，而未要求叶证书证明其密钥所有权。
fixed:
  - { product: LXD 6/stable }
  - { product: LXD 5.21/stable }
  - { product: LXD 5.0/stable }
  - { product: LXD 4.0/stable }
  - { product: MicroCloud 2/stable }
  - { product: MicroCloud 3/stable }
timeline:
  - date: 10月28日 17:50 UTC
    title: Canonical 发布公告
  - date: 2026年10月29日
    title: 表中修复版 snap 发布
checklist:
  - title: 更新并核实两个组件
    hint: 对已安装的组件执行 sudo snap refresh lxd 和 sudo snap refresh microcloud；用 snap list lxd microcloud 对照表格。LXD 稳定通道正在渐进发布，刷新成功本身不代表已装上修复版。若版本仍低于修复版，限制 API 访问并联系 Canonical。
sources:
  - name: Canonical 公告及完整 snap 版本表
---

MicroCloud 新加入成员的证书也可能被截获并复用。仅有证书、无法访问 API 时不足以利用。L3 反映主流守护进程的认证绕过；是否已被利用及受害者数量仍未确认。
