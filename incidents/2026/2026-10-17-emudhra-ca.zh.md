---
title: "eMudhra CA 中间证书私钥弱到离谱：每一个都是小于 256 的数"
headline: "eMudhra：八个 CA 私钥，计算器按几下就猜出来了"
summary: >-
  emSign ECC Root CA - G3 下的八张中间证书（六张 TLS，两张代码签名）由 Sectigo 交叉签名，它们的 P-384 私钥都是小于 256 的整数。任何人都能瞬间还原出私钥，给任意域名签发证书。
splash: "所有信任 emSign ECC Root CA - G3 或 Sectigo 交叉签名的东西：浏览器、操作系统、Go、Python、Node"
wipe: "更新浏览器和操作系统，升级到 certifi 2026.10.19、Go 1.27.3 / 1.26.10、Node 22.23.4+；在自定义信任库里拉黑这 8 张中间证书"
inTheWildNote: CT 日志里没发现终端实体证书；几小时内就被拦截
oneLiner: >-
  CA 的私钥本该是一个 384 位的秘密；这几个却小到掰着手指脚趾就能数过来，谁都能给任意网站签出“受信任”的证书。
cves:
  - name: Go crypto/x509 信任了被攻破的中间证书
    description: Go 的根证书和中间证书处理逻辑接受了这条弱密钥的 eMudhra 证书链。Go 1.27.3 和 1.26.10 已修复；1.25 及更早版本不会修复。
  - name: Firefox 信任了被攻破的中间证书
    description: Firefox 的修复：不再信任这八张中间证书，并移除该根证书。
fixed:
  - { status: "CVE-2026-111943。Go 1.25 及更早版本不会修复" }
  - {}
  - { status: 内置 NSS 3.131.1 的 CA 证书包 }
  - { status: 10月20日移除根证书 }
  - {}
  - { status: 我们查阅的来源均未提及，请向厂商确认 }
timeline:
  - date: 2025年4月30日
    title: 私钥生成，同一批共 24 张中间证书
  - date: 2026年10月17日
    title: 一名研究人员向 Chrome（18:05 UTC）和 Mozilla（20:06 UTC）报告
    body: Chrome 在 19:45 UTC 前通过 CRLSet 拦截了六张 TLS 中间证书；Mozilla 在 22:59 UTC 前通过 OneCRL 拦截。Mozilla 自己也还原出了私钥。
  - date: 2026年10月18日
    title: 八张证书全部以 caCompromise 为由吊销
    body: 这是 Mozilla bug 里的说法。eMudhra 自己的声明说吊销发生在 10月19日。
  - date: 2026年10月19日
    title: Apple 和 Android 拦截这些证书；certifi 发布修复
  - date: 2026年10月20日
    title: 微软拦截；Go 发布修复；NSS 移除根证书
  - date: 2026年10月21日
    title: Node.js 安全更新拒绝这些密钥
  - date: 2026年10月27日前后
    title: Chrome Root Store v43 移除 emSign ECC Root CA - G3
checklist:
  - title: 更新浏览器和操作系统
    hint: Chrome、Firefox、Safari、Edge、Android 和 Windows 都已发布拦截
  - title: 更新各语言的信任库
    hint: certifi 2026.10.19、Go 1.27.3 / 1.26.10、Node 22.23.4 / 24.22.1 / 26.12.1
  - title: 修补自定义信任库
    hint: Java cacerts、内部 CA 证书包、各类设备、distroless 镜像
  - title: 检查代码签名信任
    hint: 八张里有两张是受微软信任的代码签名 CA
  - title: 你自己的证书如果链到 emSign ECC Root CA - G3，赶紧换掉
    hint: 找别的 CA 重新签发。这八张中间证书已经验证不过了，Chrome 也会在 10月27日前后移除该根证书
  - title: 在 CT 监控里搜 emSign 签发的证书
    hint: 你的域名下只要出现不是你申请的证书，就是危险信号
sources:
  - says: 私钥是小于 256 的整数；报告时间、OneCRL 条目，以及 10月18日的吊销
  - name: eMudhra 声明
    says: 归因于密钥封装/解封装缺陷；称其中 7 张从未用于生产，第 8 张没签发过任何证书
  - says: 援引 Scott Helme 的说法，其中一个私钥就是数字 4；各厂商的拦截时间线
  - says: 浏览器和操作系统厂商的应对
---
CA 的私钥，是“这真的是你的银行”这句话能成立的根本。eMudhra 有八张中间证书，P-384 私钥都是**小于 256 的整数**。据研究人员 Scott Helme 说，其中一个就是数字 4。谁要是注意到了，就能给任意域名签证书，而所有信任这条链的客户端都会照单全收。

这些中间证书挂在 **emSign ECC Root CA - G3** 下面，还带着 **Sectigo 的交叉签名**，信任它们的范围因此更大。六张是 TLS CA，两张是受微软信任的代码签名 CA。eMudhra 称问题出在密钥封装/解封装的一个缺陷上，导致生成了一批弱密钥。

### 为什么是 L4 而不是 L5

信任锚被攻破，一般都够得上 L5“屎无前例”。复核之后，我们把它降了一级：

- 没有迹象表明有人滥用过。证书透明度（CT）日志里没有这些中间证书签发的终端实体证书。
- 浏览器在收到报告几小时内就拦截了它们，各大平台三天内全部跟进。

真正的风险在长尾：各语言运行时、Java `cacerts`、各类设备，以及还带着旧证书包的老容器。

还有一个问题没有定论。Mozilla 的 bug 里提到大约 3 万张订户证书需要迁移，这和 eMudhra 声明中“这些密钥没签发过任何终端实体证书”的说法对不上。
