---
title: "Report URI 在 178 家机构的 Optimizely 片段中发现恶意脚本"
summary: >-
  Report URI 在 178 家机构使用的 188 个 Optimizely Web 脚本片段中发现恶意 Project JavaScript。载荷会替换加密货币地址、窃取可访问的银行卡字段，并加载 iOS 漏洞利用代码。攻击者如何取得写权限及事件整体影响仍待确认。
splash: "访问加载了遭篡改 Optimizely Web 片段的页面的用户，包括加载客户自行托管副本的页面。"
wipe: "移除或隔离遭篡改的片段，保护项目写权限，并排查支付、钱包和暴露的会话。"
inTheWildNote: "Report URI 捕获了生产环境中的恶意脚本片段，并追踪了相关钱包转账。"
timeline:
  - date: 11月16日 04:21 UTC
    title: 研究人员捕获遭篡改的 Optimizely 片段
    body: Report URI 最早捕获的 Optimizely 注入样本出现在 BBC 网站，加载了此前的 webshell.lol 注入脚本。
  - date: 11月16日 08:28 UTC
    title: 研究人员观察到后续的钱包地址替换加载器
    body: Report URI 在 BBC 网站发现新载荷。研究人员于 13:43 UTC 在后续构建中观察到窃卡代码。
  - date: 11月16日 21:52 UTC
    title: 已知的 188 个受影响片段中仍有一个包含恶意代码
    body: Report URI 复查时发现仍有一个片段受影响。该结果仅覆盖当时复查的样本。
  - date: 11月16日 22:47 UTC
    title: Report URI 发布技术调查
    body: 研究人员披露载荷、受影响片段及清理核查。攻击者如何取得项目写权限仍未确定。
checklist:
  - title: 暂停使用受影响片段并保全证据
    hint: 检查 Project JavaScript、实验自定义代码、已部署片段和客户自行托管的副本。移除恶意代码前保存异常响应、哈希和时间戳。将每份已部署副本与可信基线比较，清理后检查 CDN 或网站缓存。
  - title: 保护 Optimizely 项目写权限并确认清理结果
    hint: 检查项目用户、角色、变更、API 令牌和集成。移除未经授权的访问权限，轮换暴露凭据。检查新注入的内联或编码加载器。测试并实施内容安全策略，收紧 script-src 和 connect-src 的允许列表并开启报告。可行时移除 unsafe-eval。即使 CDN 在允许列表中，也要确认每个主机返回干净内容。
  - title: 排查网络指标并评估暴露
    hint: "在 DNS、代理、CSP 和浏览器日志中排查以下 12 个域名和三个 IP，适用时包括子域。去活化域名为 1688360[.]cc、5vobauua3ojpklx[.]icu、eil786npto9u5bq[.]icu、l7bcsnwc7nzr3uo[.]icu、webshell[.]lol、linkforge[.]cc、je4ft3gn8vxudum[.]icu、q1ls1ho9x7wsxlu[.]icu、ios-hack[.]icu、p55abnw2pnsz0bo[.]icu、1y69gy2mdzaltz1[.]icu 和 gm38duxoihbmy5o[.]icu。IP 为 136.113.106.136、34.96.213.201 和 34.87.36.58。完整路径、脚本标记、两个哈希和八个钱包地址见 Report URI 报告。仅凭匹配无法确认失陷。"
  - title: 排查暴露的会话和支付
    hint: 使暴露的非 HttpOnly 会话令牌失效，轮换受影响的秘密。核实受影响页面内第一方字段曾接收哪些银行卡数据，并与支付处理商协调响应和通知。确认这些页面实际可读取的数据。
  - title: 核对交易并更新受影响访客的设备
    hint: 将加密货币转账的目的地址与可信地址核对，发现异常转账时联系钱包提供商或交易所。如果在受影响的页面输入过银行卡资料并发现可疑活动，请联系发卡机构。为 iPhone 或 iPad 安装设备可用的最新安全更新。
sources:
  - name: Report URI 技术调查
    says: 提供捕获的脚本片段、时间、实测行为、样本数量、指标和处置步骤。
  - name: Apple 安全发布
    says: 列出已发布的安全更新和适用设备。
---

Report URI 在 Optimizely Web 片段的 Project JavaScript 部分发现注入代码。无论片段由 Optimizely CDN 提供，还是由客户自行托管，代码都会在引用该片段的页面上运行。研究人员观察到远程、编码和内联加载器。攻击者取得项目写权限的方式仍未确定。

载荷可替换加密货币收款地址，并向攻击者发送网页截图和 JavaScript 可读取的 Cookie。窃卡代码针对页面能够读取的内容，例如第一方银行卡字段。Report URI 表示，该代码无法读取隔离在跨源支付 iframe 中的银行卡字段。针对 iPhone 和 iPad，加载器按设备选择不同路径，包括 Coruna 和 DarkSword。访问加载器本身无法证明漏洞利用成功。

Report URI 在 19:24–19:59 UTC 的扫描中检查了 1,611 个片段，其中 186 个受影响。完整调查确认 **178 家机构的 188 个片段遭篡改**。这是样本数量，无法确定有多少访客损失了数据或资产。研究人员还观察到与载荷关联的钱包收到转账。这些转账无法确定访客总损失，也无法确定被窃取的银行卡数据或 Cookie 数量。21:52 UTC 复查时，样本中仍有一个片段含恶意代码。随后返回干净内容无法消除清理前已经发生的暴露。
