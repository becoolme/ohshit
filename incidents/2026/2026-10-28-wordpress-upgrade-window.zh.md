---
title: WordPress 修复更新窗口 RCE，攻击者正探测暂存安装程序
tags: [WordPress, RCE, 竞争条件]
summary: WordPress 7.1.4 修复无需认证的更新窗口 RCE 及其他安全问题。Wordfence 观察到利用尝试，尚未确立成功入侵；该 RCE 需要完整包更新及可从公网执行的暂存文件。
splash: 未修复的 WordPress 4.7–7.1.3 在完整包更新期间，暂存目录可从公网访问并执行 PHP
wipe: 安装 7.1.4 或对应分支安全回移版本，更新时保护暂存目录访问，并核对实际运行版本
inTheWildNote: Wordfence 报告主动利用尝试，尚未确立成功入侵。
cves:
  - name: 无需认证的暂存安装程序竞争条件
    description: 攻击者可在更新清理前访问临时安装文件，执行服务器代码；无需账户。
fixed:
  - product: WordPress 7.1
  - product: WordPress 7.0
  - product: WordPress 6.9
  - product: WordPress 6.8
  - product: WordPress 6.7
  - product: WordPress 6.6
  - product: WordPress 6.5
  - product: WordPress 6.4
  - product: WordPress 6.3
  - product: WordPress 6.2
  - product: WordPress 6.1
  - product: WordPress 6.0
  - product: WordPress 5.9
  - product: WordPress 5.8
  - product: WordPress 5.7
  - product: WordPress 5.6
  - product: WordPress 5.5
  - product: WordPress 5.4
  - product: WordPress 5.3
  - product: WordPress 5.2
  - product: WordPress 5.1
  - product: WordPress 5.0
  - product: WordPress 4.9
  - product: WordPress 4.8
  - product: WordPress 4.7
  - product: WordPress 4.6 及更早版本
    status: 不再接收安全更新，需迁移
timeline:
  - date: 2026年10月28日
    title: WordPress 发布安全更新
  - date: 2026年10月29日
    title: Wordfence 报告暂存安装程序利用尝试
checklist:
  - title: 更新全部安装并核对完成状态
    hint: 在 Dashboard → Updates → Update Now 更新，再核对运行版本。确认自动更新实际完成。只有最新 WordPress 分支受到积极支持；旧分支提供酌情安全回移。4.6 及更早版本需迁移。
  - title: 保护更新窗口
    hint: 若能控制 Web 服务器，在更新前拒绝对 wp-content/upgrade 的公网 HTTP 访问并验证限制。无法配置时不要因此推迟修补。Wordfence 用户需启用 Extended Protection 才能保护直接 PHP 请求；付费套餐于 10 月 28 日获得规则，免费版为 11 月 27 日。规则不能替代更新。
  - title: 调查此前暴露
    hint: 检查 Web 日志中 wp-content/upgrade 下的异常 PHP 请求，包括暂存的 setup-config.php；检查陌生管理员、插件及 PHP 文件，更新后扫描。保留可疑证据以供调查。仅请求匹配不能证明代码执行；报告未发布攻击者 IP 或哈希清单。
sources:
  - name: WordPress 安全发布公告
  - name: WordPress 详细发布说明及分支回移
  - name: Wordfence 原始研究及处置建议
  - name: Wordfence 漏洞记录
  - name: NHS England CC-4884
---

10 月 28 日发布批次将存储型 XSS、Interactivity API、信息泄露、权限修复与安装程序竞争条件及证书信任更新一并发布。各项所需权限及受影响分支不同，不能把无需认证 RCE 的前提套用到全部同批问题。

攻击者必须定位临时目录，并在清理前完成攻击；Wordfence 测试中通常只有数秒。处于空闲状态的 WordPress 安装并非持续暴露于该竞争条件。L4 反映主流平台正遭主动攻击，并不代表已证明大规模入侵。尚无受害者数量。
