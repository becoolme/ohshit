---
title: "Report URI 在 178 家机构的 Optimizely 片段中发现恶意脚本"
summary: >-
  Report URI 在 178 家机构使用的 188 个 Optimizely Web 脚本片段中发现恶意 Project JavaScript。载荷会替换加密货币地址、窃取可访问的银行卡字段，并加载 iOS 漏洞利用代码。厂商确认 Experimentation 账户注册流程中的漏洞遭利用，并表示已移除注入代码。访客整体影响仍待确认。
splash: "访问加载了遭篡改 Optimizely Web 片段的页面的用户，包括加载客户自行托管副本的页面。"
wipe: "移除或隔离遭篡改的片段，保护项目写权限，并排查支付、钱包和暴露的会话。"
inTheWildNote: "Report URI 捕获了生产环境中的恶意脚本片段，并追踪了相关钱包转账。"
cves:
  - name: 注册流程控制缺陷允许篡改 Project JavaScript
    description: 攻击者可通过账户注册流程冒充现有客户用户并修改 Project JavaScript，再经 Optimizely 托管资源分发恶意代码。
timeline:
  - date: 2026年11月13日
    title: 归档响应显示相关脚本早于 Optimizely 这波攻击
    body: 后续分析发现，11 月 13 日的 Kissmetrics 和 StorifyMe 响应已包含恶意代码。存档只能确定这些响应的提供时间，无法确定入侵何时开始。
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
  - date: 11 月 16 日 23:11 UTC
    title: 最后一个已知遭篡改的 Optimizely 片段复查正常
    body: Report URI 在 11 月 17 日更新中表示，截至此次复查，所追踪的受影响文件均已返回干净内容。
  - date: 2026年11月16日
    title: Hudson Rock 记录经其他服务商分发的相关脚本
    body: Hudson Rock 和 Ohey 验证了 minute-ly、Kissmetrics 和 StorifyMe 的恶意响应，三者均加载了同一个早期注入脚本。
  - date: 11 月 17 日 01:02 UTC
    title: Optimizely 确认修复漏洞并移除注入代码
    body: 厂商称已采取账户保护措施，事件转入监控。
  - date: 11 月 17 日 06:30 UTC
    title: 研究人员发布后续证据
    body: Hudson Rock 和 Ohey 记录了更早的归档样本和移动端载荷的后续阶段。报告也引用了 Optimizely 对账户注册入口的说明。
  - date: 11 月 17 日 07:00 UTC
    title: Bitquery 估算疑似受害者付款
    body: 链上复查将疑似受害者付款与兑换交易产生的钱包流入区分开来。
  - date: 2026年11月17日
    title: Optimizely 发布初步客户调查报告
    body: 厂商说明注册流程冒充用户的机制，以及 11 月 16 日 16:10 UTC 修复、16:53 UTC 吊销会话与令牌的时间。其给出的清理完成时间为 22:24 UTC，并公布额外指标、撤回普遍禁用片段的建议。最终取证仍未完成。
  - date: 2026年11月17日
    title: Netskope 发布客户子集的流量观察
    body: 遥测包括片段清理后由浏览器缓存页面发出的请求，以及共享基础设施更早的出现记录。许多请求被拦截或来自不受利用链支持的设备，请求数不是利用成功数。
  - date: 2026年11月18日
    title: Socket 发布归档早期载荷的静态分析
    body: 11 月 16 日 08:08:15 UTC 的捕获样本包含钱包地址替换器和 iOS 加载器，没有后续构建中的窃卡模块。Socket 公布样本哈希，并指出其时间早于所报告的 08:10 首次构建时间，差异尚未解释。
  - date: 11月18日 14:49 UTC
    title: Optimizely 给出客户影响比例估计
    body: 厂商称受影响客户不足 5%，已联系所有 Web Experimentation 客户，其他产品未受影响。该客户比例与脚本片段、机构或访客数量是不同口径。
  - date: 2026年11月24日
    title: CISA 将注册流程漏洞加入 KEV
    body: CISA 以 CVE-2026-132224 跟踪已遭利用的问题，标记需要取证分诊，并将适用美国联邦机构的修复期限设为 11 月 27 日。
checklist:
  - title: 暂停使用受影响片段并保全证据
    hint: 检查 Project JavaScript、实验自定义代码、已部署片段和客户自行托管的副本。移除恶意代码前保存异常响应、哈希和时间戳。将每份已部署副本与可信基线比较，清理后检查 CDN 或网站缓存。
  - title: 保护 Optimizely 项目写权限并确认清理结果
    hint: 检查项目用户、角色、变更、API 令牌和集成。厂商 11 月 17 日报告表示，被冒充用户的会话与令牌已被吊销，不要求统一重置密码或 API 令牌。移除未经授权的访问权限，仅对另行确认已暴露的凭据进行轮换。下游访客会话暴露仍需评估。检查新注入的内联或编码加载器。测试并实施内容安全策略，收紧 script-src 和 connect-src 的允许列表并开启报告。可行时移除 unsafe-eval。即使 CDN 在允许列表中，也要确认每个主机返回干净内容。
  - title: 排查网络指标并评估暴露
    hint: "在 DNS、代理、CSP 和浏览器日志中排查以下 12 个域名和三个 IP，适用时包括子域。去活化域名为 1688360[.]cc、5vobauua3ojpklx[.]icu、eil786npto9u5bq[.]icu、l7bcsnwc7nzr3uo[.]icu、webshell[.]lol、linkforge[.]cc、je4ft3gn8vxudum[.]icu、q1ls1ho9x7wsxlu[.]icu、ios-hack[.]icu、p55abnw2pnsz0bo[.]icu、1y69gy2mdzaltz1[.]icu 和 gm38duxoihbmy5o[.]icu。IP 为 136.113.106.136、34.96.213.201 和 34.87.36.58。完整路径、脚本标记、两个哈希和八个钱包地址见 Report URI 报告。仅凭匹配无法确认失陷。"
  - title: 检查相关第三方组件是否加载同一脚本
    hint: 盘点公开页面引用的 minute-ly、Kissmetrics 和 StorifyMe 组件。在保存的响应中搜索 webshell[.]lol/get.js。Hudson Rock 的指标表列出 16 个归档的供应商响应及其哈希，以及八个移动端载荷阶段的哈希。将响应与可信版本比较，隔离确认遭篡改的资源。仅凭匹配无法确认失陷。
  - title: 排查暴露的会话和支付
    hint: 使暴露的非 HttpOnly 会话令牌失效，轮换受影响的秘密。核实受影响页面内第一方字段曾接收哪些银行卡数据，并与支付处理商协调响应和通知。确认这些页面实际可读取的数据。
  - title: 核对交易并更新受影响访客的设备
    hint: 将加密货币转账的目的地址与可信地址核对，发现异常转账时联系钱包提供商或交易所，并保留交易哈希、目的地址和时间戳以便报备。如果在受影响的第一方表单输入过银行卡资料，请查看交易记录并向发卡机构咨询保护措施。为 iPhone 或 iPad 安装设备可用的最新安全更新。
  - title: 获取客户专属证据并恢复合法代码
    hint: 向客户成功经理或 support@optimizely.com 获取受影响项目确认、各网站暴露窗口及变更日志。厂商允许重新启用已清理的 Web Experimentation，但未运行实验的敏感输入页面应移除片段。按此报告，Feature Experimentation、SDK 和旧版 Full Stack 无需变更。原始 Project JavaScript 被替换时，请 Support 协助恢复。保留至少覆盖 11 月 16 日的 web/CDN/WAF/CSP 及支付和欺诈监测日志，并与顾问评估通知义务。
  - title: 排查厂商新增的初步指标
    hint: 拦截并在 web、CDN、CSP 和代理日志中搜索 pay-cloud[.]online、pay.pay-cloud[.]online 及 pay-relay.wordpressadmin001.workers[.]dev。报告另列 193.176.211[.]170、193.176.211[.]203 为商业 VPN 来源地址，并明确提醒这些地址短期变动，不能作为可靠 IOC。保留此前研究人员公布的指标。仅凭匹配无法确认失陷、成功窃取数据或归属。
  - title: 将保存的早期载荷与 Socket 样本比较
    hint: Socket 列出 1688360[.]cc/track.js、5vobauua3ojpklx[.]icu/boot.js、window._k7 及样本 SHA-256 1ec4245b3b303304ea24a89b3b2351b0f0c085087050f517d23dcba9694c165a。解码后的替换地址为 0xC4026b06D82b0F0B363eda0642D61CfbDc17884e、THvs6p56XkUiMkJeSc51cAP64u2RsTYqxa 和 19g9rZcPeiz8rUvyWpTRyXXhPnjsWrc3kW；iOS 脚本设置 data-channel-code="02111110"、data-cfasync="false"。检查保存的响应，或在沙箱中做静态分析，不要直接执行在线载荷。此哈希仅覆盖一个归档构建；其他哈希不能据此排除风险，匹配也不能单独证明访客遭利用或损失。
  - title: 区分缓存页面请求、设备暴露与利用成功
    hint: Netskope 列出 1688360[.]cc、5vobauua3ojpklx[.]icu、eil786npto9u5bq[.]icu、l7bcsnwc7nzr3uo[.]icu、webshell[.]lol、je4ft3gn8vxudum[.]icu、q1ls1ho9x7wsxlu[.]icu、ios-hack[.]icu；IP 为 136.113.106[.]136、34.96.213[.]201、34.87.36[.]58；track.js 哈希为 814a963c0da480e2449d9b6664480156e1cd6d731014117401bf635badec3a0f、f7b84b9a94f749f8ced3f0112d0a66894e8bbc3b4aa5592021d1b8976a9bad40。保留此前完整指标集，在网页访问控制中拦截已确认的攻击域名和 IP；评估经过测试的 Newly Registered Domain/Security Risk URL 过滤，以及无法拦截时的浏览器隔离。优先检查访问过端点且运行 iOS 18 或 26 的 iPhone/iPad，但不能将系统版本当作失陷证据。将浏览器和出站日志与设备系统、策略结果及已保存内容关联，再评估输入卡片或复制钱包地址的行为。桌面设备访问 iOS 端点不能证明设备遭利用，匹配本身也不能证明失陷。Netskope 正将 v8hub[.]xyz 作为线索调查，尚未确认属于该套件。
sources:
  - name: Optimizely 官方安全事件状态
    says: 确认 Experimentation 漏洞遭利用、修复上线、注入代码移除及账户保护措施。
  - name: Report URI 技术调查
    says: 提供捕获的脚本片段、时间、实测行为、样本数量、指标和处置步骤。
  - name: Hudson Rock 与 Ohey 的脚本分析
    says: 记录经四家服务商提供的恶意响应，附有归档样本和哈希。
  - name: Amirul Cyber 的 OPTIMJACK 研究
    says: 记录用于识别受影响脚本的浏览器请求链和载荷行为。
  - name: Optimizely 向 BleepingComputer 提供的声明
    says: 指明受影响的注册流程，并说明 Optimizely 为保护受影响账户采取的措施。
  - name: Hudson Rock 与 Ohey 的后续调查
    says: 记录带时间的归档样本，并区分观察到的移动端载荷与已证实的漏洞利用。
  - name: Bitquery 链上复查
    says: 从钱包流入中区分与兑换有关的交易，估算疑似受害者付款，并指出其中一笔归属不明。
  - name: Apple 安全发布
    says: 列出已发布的安全更新和适用设备。
  - name: Optimizely 11 月 17 日初步客户事件报告
    says: 说明注册流程冒充机制、厂商初步时间线及指标、排除的产品、客户取证请求，以及更新后的重新启用与凭据处置建议。最终取证仍未完成。
  - name: Socket 归档载荷分析
    says: 静态解码 08:08:15 UTC 的归档捕获，公布样本哈希与标记，并区分其中的地址替换和 iOS 模块与后续窃卡构建。捕获时间与首次构建时间的差异仍未解释。
  - name: Netskope 原始客户子集遥测分析
    says: 报告共享基础设施更早的出现及后续缓存页面请求，区分设备流量与利用，并将 v8hub.xyz 保留为未确认的调查线索。
  - name: CISA 已知遭利用漏洞目录，11 月 24 日
    says: 将 CVE-2026-132224 对应至 Optimizely Web Experimentation 注册流程冒充及 Project JavaScript 篡改，标记取证分诊，修复期限为 11 月 27 日。

---

Report URI 在 Optimizely Web 片段的 Project JavaScript 部分发现注入代码。无论片段由 Optimizely CDN 提供，还是由客户自行托管，代码都会在引用该片段的页面上运行。研究人员观察到远程、编码和内联加载器。Optimizely 确认 Experimentation 漏洞遭利用，并向 BleepingComputer 说明漏洞位于账户注册流程，其 11 月 17 日初步报告说明，该漏洞让新账户通过公开信息及反复猜测邮箱地址冒充已有管理员用户，无需窃取或使用其密码。厂商称没有 Optimizely 管理员账户被攻破。

载荷可替换加密货币收款地址，并向攻击者发送网页截图和 JavaScript 可读取的 Cookie。窃卡代码针对页面能够读取的内容，例如第一方银行卡字段。Report URI 表示，该代码无法读取隔离在跨源支付 iframe 中的银行卡字段。针对 iPhone 和 iPad，加载器按操作系统版本选择不同路径。Report URI 识别出 Coruna 和 DarkSword，并在所检查的 iOS 26 路径上只观察到设备指纹采集。Hudson Rock 在后续调查中记录，Ohey 取得了 DarkSword 的后续阶段，代码可上传钥匙串数据库及其他文件。一个使用 iOS 26.3 用户代理字符串发出的请求抵达另一条路径的加载器和 worker，但攻击链自身的日志将该路径标记为不可用。这些证据均无法证明访客设备已失陷。

Report URI 在 19:24–19:59 UTC 的扫描中检查了 1,611 个片段，其中 186 个受影响。完整调查确认 **178 家机构的 188 个片段遭篡改**。这是样本数量，无法确定有多少访客损失了数据或资产。研究人员还观察到与载荷关联的钱包收到转账。这些转账无法确定访客总损失，也无法确定被窃取的银行卡数据或 Cookie 数量。21:52 UTC 复查时，样本中仍有一个片段含恶意代码。Report URI 于 11 月 17 日更新称，截至 11 月 16 日 23:11 UTC，追踪的受影响文件均已返回干净内容。研究人员在 11 月 17 日复查发现，1688360[.]cc 被注册商暂停后已无法解析，webshell[.]lol 也被暂停，eil786npto9u5bq[.]icu 已无法解析到 IP 地址，5vobauua3ojpklx[.]icu 仍可解析但无响应。这些观察无法消除清理前的暴露，也无法确认客户自行托管的副本是否已清理。

Bitquery 于 11 月 17 日估算，11 月 16 日有 19 笔疑似受害者付款，约合 2,260 美元。排除其中一笔归属不明的转账后，约为 2,210 美元。较早观察到的钱包流入约合 7,040 美元，其中很大一部分来自兑换交易，并非访客直接付款。该估算依据转入八个已知地址的时间和资金路径，无法确定每位付款者的意图，也不包括银行卡盗刷或样本钱包之外的损失。

除 Optimizely 脚本外，Hudson Rock 还取得了 minute-ly 的恶意响应。Ohey 的归档样本显示，Kissmetrics 和 StorifyMe 早在 11 月 13 日就返回了恶意脚本，比 Optimizely 的样本更早。这些证据无法说明期间是否一直在分发恶意脚本。这三家服务的响应均加载了此前的 webshell[.]lol 注入脚本。研究证实了实际返回的代码，这三家服务的初始入侵方式尚未确定。Optimizely 公布的遏制措施只涉及自家服务。

Optimizely 表示已修复漏洞，移除了受影响项目中的注入代码，并在给 BleepingComputer 的声明中表示已终止受影响的 Optimizely 账户的活跃会话、吊销令牌并重置访问权限。其状态页将事件列为监控中。下游网站仍需自行评估并处置本网站访客的会话暴露。请核查实际部署的脚本和缓存、审阅清理前日志，并按暴露情况处置访客会话及支付风险。


厂商初步时间线将 11 月 16 日首次创建账户的时间记为 00:37 UTC，首次向项目写入恶意代码记为 07:51 UTC。其记录的后续时间为：13:34 发现活动，16:06 在 Cloudflare 拦截，16:10 修复注册漏洞，16:53 吊销会话与令牌，22:24 UTC 完成清理。07:51 首次写入的说法晚于 Report URI 捕获注入的 04:21；已阅读来源没有解释这一差异。应保留两者，并索取客户专属暴露窗口，不能仅依据厂商窗口收窄日志复查。厂商清理完成与后续独立复查返回干净响应是不同观察。

Optimizely 将 Feature Experimentation、SDK 和旧版 Full Stack 排除在已确认影响范围之外，但表示被冒充用户可访问其权限所允许的 Experimentation 数据。厂商称客户密码未暴露，不要求普遍重置密码或 API 令牌，并允许重新启用已清理的 Web Experimentation 片段。报告称部分原始 Project JavaScript 被替换，因此恢复代码可能需要 Support 协助。这些厂商说明不能消除潜在的下游浏览器暴露，也不能确定访客损失总额或其他脚本服务商的入侵方式。Mandiant 协助开展的取证、最终根因分析及最终指标列表仍未完成。


Socket 的 11 月 18 日分析识别了一份于 11 月 16 日 08:08:15 UTC 捕获的 track.js 归档响应，大小为 19,513 字节。静态解码发现钱包地址替换器和 iOS 加载器，没有后续版本中描述的窃卡模块。这与后续窃卡观察并不矛盾，也不能说明所有实际分发的构建行为完全相同。归档捕获时间早于所报告的 08:10 首次构建时间；Socket 表示，其与所报告的 26 个构建之间的关系仍未确认。分析没有执行样本，不能证明 iOS 利用成功或存在额外访客损失。

Netskope 的 11 月 17 日原始分析覆盖其获得授权的客户子集，报告最早于 9 月 12 日观察到 webshell[.]lol 流量、11 月 10 日观察到 iOS 路由域名流量。这些是基础设施出现记录，不能证明 Optimizely 在这些日期已经失陷，也不能证明所有更早流量有同一入口。其于 11 月 17 日 11:38 UTC 观察到最后一次来自浏览器缓存页面的 1688360[.]cc 请求，因此清理后出现该请求不一定代表 CDN 重新分发了投毒响应。访问利用域名的请求主要来自桌面设备；所见 iOS 设备几乎都运行 iOS 27，Netskope 表示公开利用链并不针对该版本。这些发现不能确定移动端利用成功、新增访客损失总数，或其客户子集以外均受保护。


11 月 24 日，CISA 将注册流程问题以 **CVE-2026-132224** 加入已知遭利用漏洞目录。条目描述了冒充现有客户用户、篡改 Project JavaScript，再经受信任托管资源使代码在浏览器执行的链路。条目标记需要取证分诊，并将适用美国联邦机构的修复期限设为 **11 月 27 日**。正式列入利用目录不代表出现新一轮攻击、新增访客数量或新增损失；此前针对各客户的清理及暴露评估指引仍适用。

Optimizely 在 11 月 18 日 14:49 UTC 的状态更新中称，受影响客户不足 5%，已直接联系所有 Web Experimentation 客户，其他产品未受影响，且已完成修复。这是厂商按客户群体给出的估计，不是访客实测数量，也不是与 Report URI 脚本片段及机构数独立核对后的分母。该声明不能确定最终下游损失总额。
