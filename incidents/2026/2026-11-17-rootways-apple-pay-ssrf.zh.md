---
title: "攻击者利用 Rootways Apple Pay 漏洞在 Magento 商店植入盗刷脚本"
tags: [Magento, SSRF, 盗刷脚本, 电商]
summary: >-
  Sansec 调查发现，攻击者利用 Magento 2 的 Rootways Authorize.net CIM Pro 扩展漏洞 CVE-2026-130583，在一家商店读取机密、取得管理员权限并植入窃取卡片数据的脚本。请升级至 4.1.5 或应用厂商补丁。
splash: "安装了 4.1.5 之前版本 Rootways Authorize.net CIM Pro Apple Pay 版的 Magento 2 商店。"
wipe: "升级扩展至 4.1.5 或应用厂商补丁。若端点曾经暴露，请调查并轮换机密。"
inTheWildNote: "Sansec 调查了一家遭到利用的 Magento 商店，当时运行扩展 4.0.0。"
cves:
  - name: Apple Pay 验证端点未授权 SSRF
    description: 商户验证控制器会获取攻击者指定的 URL 并返回内容，导致本地文件和内网服务暴露。
fixed:
  - product: Rootways Authorize.net CIM Pro
    status: 首个修复版本
timeline:
  - date: 11 月 14 日 22:58 UTC
    title: Sansec 后来调查的商店开始遭到探测
    body: 调查人员发现，在 Apple Pay 端点遭到利用前，攻击者曾尝试利用多个其他 Magento 漏洞。
  - date: 2026 年 11 月 15 日
    title: 攻击者利用验证端点并植入盗刷脚本
    body: 攻击者取得数据库凭据、创建管理员账号、实现代码执行，并将加载器注入店面页面。
  - date: 2026 年 11 月 16 日
    title: Sansec 确认漏洞并报告给 Rootways
  - date: 2026 年 11 月 17 日
    title: Rootways 发布 4.1.5，VulnCheck 公布 CVE
    body: Sansec 发布调查结果、缓解措施和入侵指标。
checklist:
  - title: 盘点并修复所有受影响安装
    hint: "运行 `composer show rootways/module-authorizecim`，手动安装则检查 `app/code/Rootways/Authorizecim/composer.json`。即使未启用 Apple Pay，也要升级至 4.1.5 或更新版本，或使用厂商补丁更新扩展中的 `Controller/ApplePay/Index.php` 和 `view/frontend/web/js/applepay/button.js`。如果 Marketplace 尚未提供修复版本，请联系 help@rootways.com。"
  - title: 打补丁期间限制访问验证端点
    hint: "如果业务允许暂停 Apple Pay，将 `payment/rootways_authorizecim_option_applepay/active` 设为 `0`，刷新 Magento 缓存，并在 Web 服务器拦截 `/rootways_authorizecim/applepay/index`。从商店外部确认拦截生效。即使已拦截该路由，仍应应用补丁。"
  - title: 保留日志并排查利用痕迹
    hint: "在 HTTP 日志中检查 Apple Pay 端点的请求，排查 `validationUrl` 中的异常主机名、非 HTTPS 协议以及 `z` 参数中的 PHP 注入。Sansec 的指标表列有完整的请求、文件、哈希和标记。网络指标包括 45-86-62-180[.]sslip[.]io、45.86.62.180、37.72.140.221、45.166.20.61、54.39.16.34 和 2.27.168.28。命中指标本身不足以证明失陷。"
  - title: 遏制商店入侵并更换暴露的机密
    hint: "怀疑失陷时，隔离受影响主机并保留日志、磁盘和数据库快照。从 `admin_user` 排查陌生账号，检查 `core_config_data` 中的 `design/head/includes`，并扫描 Web 根目录中的盗刷脚本和 `pub/media_sync.php` 等 Web Shell。恢复可信代码和配置，轮换数据库密码，并按照 Adobe 对应版本的说明轮换 `app/etc/env.php` 中的 `crypt/key`。在 2.4.8 上，进入维护模式并暂停 cron 后运行 `bin/magento encryption:key:change`，再按 Adobe 的说明处理数据重新加密和缓存。删除未授权的管理员账号，使受影响的会话失效，检查集成凭据，为 Redis 启用身份验证，将 Adminer 限制在可信 IP，并与支付处理商协调可能涉及的卡片数据暴露。"
sources:
  - name: Rootways 安全公告
    says: 确认受影响的产品版本、4.1.5 修复以及双文件补丁。
  - name: Sansec 取证调查
    says: 记录一起 Magento 商店在野利用，并提供缓解措施和入侵指标。
  - name: VulnCheck CNA 记录
    says: 确认 4.1.5 之前的版本受影响，CVSS 4.0 评分为 9.2。
  - name: Adobe Commerce 加密密钥指南
    says: 说明如何轮换密钥、2.4.8 的命令行要求，以及何时重新加密数据。
---

扩展的 Apple Pay 商户验证端点无需登录。攻击者可让 Magento 获取指定的 URL 并返回响应，从而读取 Magento 的 PHP 进程可访问的文件，或访问原本仅限内网的服务。Sansec 表示，补丁把目标限制为使用 HTTPS 的 Apple Pay 网关 URL，并禁用重定向。

Sansec 调查了一家运行 Magento 2.4.8、使用 Rootways 4.0.0 且启用了 Apple Pay 的商店。攻击者从 `app/etc/env.php` 中读取数据库凭据和 Magento 加密密钥，通过内网 Adminer 使用该凭据创建管理员，并利用模板预览执行代码。随后，攻击者部署了 Web Shell，并植入可将卡片字段发送至 WebSocket 收集端的加载器。Sansec 记录的是一家商店，未公布受影响持卡人数或已确认的损失。

如果无法立即升级整个扩展，请使用 [Rootways 公告](https://www.rootways.com/blog/security-update-authorizenet-cim-pro-extension-v415-apple-pay)链接的双文件补丁。Rootways 表示，不包含 Apple Pay 的版本不受影响。安装了 Apple Pay 版的商店即使关闭了该功能，也应应用修复。若该路由曾经暴露，应在恢复商店正常服务前排查持久化和凭据失窃。
