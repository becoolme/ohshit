---
title: SuperPixel 篡改商店自托管 JavaScript，以假结账表单窃取银行卡资料
summary: Report URI 发现 SuperPixel 通过商店托管的被篡改 JavaScript 窃取银行卡及账单资料，报告超过 100 家 WordPress、PrestaShop 和 OpenCart 商店感染；这是未独立核实的研究计数。收集地址由以太坊合约提供，初始入口仍不明。
splash: 使用遭篡改结账页面的消费者，以及本地托管 JavaScript 被修改的商店运营者
wipe: 暂停受影响结账、保留证据、恢复经验证的资源，并在重开前调查服务端写入权限来源。
inTheWildNote: Report URI 观察到商店感染，并分析了替换支付表单的代码。
timeline:
  - date: 2026年11月5日
    title: Report URI 发布 SuperPixel 原始调查
    body: 研究人员描述三个商店平台上的活跃感染、假支付表单及由以太坊控制的收集地址，未给出确认消费者人数、损失总额或入口漏洞。
checklist:
  - title: 暂停受影响结账并保留修改后的文件
    hint: 替换前私下保存实际分发的 JavaScript、服务端及访问日志、结账网络证据。以官方校验值检查 WordPress wp-includes/js/jquery/jquery.min.js，并单独核查主题及插件资源；另检查 PrestaShop 的 jQuery UI、tools.js、Fancybox 及 OpenCart common.js。查找约一兆字节的追加代码，包括重复副本。这些是已观察位置，不是完整受影响文件清单。
  - title: 结合上下文排查全部已公布指标
    hint: '收集域名：metrics-onclick.com。以太坊合约：0x4F3D0C43acdF8308B9258dfC9d8aA45DdF3E1D17，选择器 0xa38f3568；据报创建地址：0x21f6dBC1E3Efb16014E5E6bd56F0A2f27da98934。RPC 端点 ethereum-rpc.publicnode.com、1rpc.io、eth.drpc.org 是被滥用的合法服务，并非天然恶意主机。标记：window.__SuperPixelRunning、localStorage.superpixel_rendered、#superpixel-original-hide-style、#superpixel-replace-hide-style、<!--superpixel-render-guard-->、restoreMarkedReplaceTargets。WordPress URL 线索：wp-includes/js/jquery/jquery.min.js?v=12 或 ?v=13。单一匹配不能证明失陷或操作者归属；合约可更改收集地址，各构建哈希也不同。'
  - title: 使用干净浏览器配置检查结账
    hint: 检查结账时实际分发的资源及对外请求，不输入真实银行卡资料。盗卡代码隐藏真实支付字段，每种浏览器存储状态只显示一次替代表单，回访会话可能看到真表单。单次正常显示或自动扫描不能排除感染；报告另发现有访问门槛的独立加载器，其与 SuperPixel 的关系不明。
  - title: 恢复完整性并关闭最初的写入通道
    hint: 从验证过的干净发行资源替换文件，并调查服务端或发布链路如何获得写入权限。不能只删追加行就恢复销售。报告没有确认 CVE 或通用修复版本；重复载荷提示可能反复注入，但不能证明原因。恢复正常业务前，确定潜在银行卡资料暴露范围。
  - title: 验证脚本完整性并限制结账对外连接
    hint: 允许 self 的 script-src 策略不能识别受信任同源文件内部的修改。恢复可信资源及页面标记后，验证 SRI 哈希，并按结账所需服务审查强制执行的 connect-src 允许清单；仅上报不阻断请求。监控意外 RPC 及资料收集流量。不要将合法 RPC 服务全局标为恶意，也不能将 CSP／SRI 视为清除既有服务端访问。
  - title: 曾使用受影响结账时联系发卡机构
    hint: 保留商店通知及交易记录，通过发卡机构既有应用或电话号码核查银行卡及陌生扣款。不要向陌生追回联系人发送银行卡资料。研究没有确定哪些具体消费者资料被盗，也未确立货币损失总额。
sources:
  - name: Scott Helme 在 Report URI 发布的 SuperPixel 原始研究
    says: 通过公开正式博客及内容相同的 Ghost 发布页完整核阅 11 月 5 日报告，描述感染观察、表单替换、全部指标、调查局限及完整性和连接控制。超过 100 家是研究人员未独立核实的商店计数，不是厂商确认的消费者人数。
---

Report URI 描述了一项盗卡活动：在被入侵商店已托管的 JavaScript 中追加混淆代码。已观察文件包括 jQuery 及主题、插件资源，这不能证明 jQuery 上游项目或所有使用所列电商平台的安装遭入侵。研究人员报告超过 100 家商店感染，这是**未独立核实的研究计数**；最初服务端入口及暴露时段仍未确定。

载荷监控结账元素，隐藏真实支付表单后用自己的表单替代，将卡号、有效期、CVC 及账单资料编码后发送至通过以太坊合约只读调用取得的地址。合约可在不更改各商店文件的情况下提供新地址。合法 RPC 提供商及记录中的合约创建地址，本身不能识别操作者，也不能证明以太坊遭入侵。

各受害商店的构建不同，浏览器存储还会抑制假表单再次出现，因此静态哈希、熟悉的脚本 URL 或看似正常的回访会话都不能证明安全。L4 依据是活跃商店感染中已观察到的支付资料窃取代码，不是已经证实的被盗卡数量或资金损失。没有确立通用升级下限或活动已被全面关闭。重开结账前应保留证据、调查初始访问并评估资料暴露。
