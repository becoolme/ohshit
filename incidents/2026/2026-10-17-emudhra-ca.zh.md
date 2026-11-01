---
title: "eMudhra CA 中间证书私钥弱到离谱：每一个都是小于 256 的数"
headline: "eMudhra：八个 CA 私钥，计算器按几下就猜出来了"
summary: >-
  emSign ECC Root CA - G3 下的八张中间证书（六张 TLS，两张代码签名）由 Sectigo 交叉签名，它们的 P-384 私钥都是小于 256 的整数。任何人都能瞬间还原出私钥，给任意域名签发证书。受影响的 Dart、Flutter 和 Firestore 客户端构建需要更新。
splash: "信任 emSign ECC G3 或 Sectigo 交叉签名的客户端；网络路径上的攻击者可针对未修补的运行时及内嵌 SDK"
wipe: "更新浏览器、系统和信任库（certifi 2026.10.19、Go 1.27.3 / 1.26.10、Node 22.23.4+）；赶在 Chrome 约 10月27日移除根证书前，更换 emSign ECC G3 下的证书"
inTheWildNote: CT 日志里没发现终端实体证书；几小时内就被拦截
oneLiner: >-
  CA 的私钥本该是一个 384 位的秘密；这几个却小到掰着手指脚趾就能数过来，谁都能给任意网站签出“受信任”的证书。
cves:
  - name: Go crypto/x509 信任了被攻破的中间证书
    description: Go 的根证书和中间证书处理逻辑接受了这条弱密钥的 eMudhra 证书链。Go 1.27.3 和 1.26.10 已修复；1.25 及更早版本不会修复。
  - name: Firefox 信任了被攻破的中间证书
    description: Firefox 的修复：不再信任这八张中间证书，并移除该根证书。
  - name: certifi 内置根证书移除
    description: 公告列出 2026.10.18；Python 安全指南建议使用 2026.10.19，以兼容未受影响的根证书。
  - name: uv 内置根证书移除
    description: 0.13.4 之前的 uv 默认信任受影响的根证书；系统或自定义证书库需要单独核验。
  - name: Dart 和 Flutter 信任被攻破的中间证书
    description: 网络路径上的攻击者可拦截 Android、Windows，以及保留受影响根证书的 Linux 上的 dart:io HTTPS；须使用修补后的 SDK 重建。
  - name: Oracle Java 中间证书取消信任更新
    description: Oracle 10月21日的 JSSE 公告涉及被攻破的 eMudhra 中间证书；初次更新与后续移除根证书的修复不同。
  - name: Oracle Java 根证书移除更新
    description: Oracle 10月24日的 JSSE 公告从 Java SE 和 GraalVM 移除相关根证书；攻击者需要受信任的受影响证书链，并处于可拦截 TLS 的网络路径上。
  - name: Checkmk 内置 CA 信任
    description: Checkmk 的 certifi 和 webpki-roots 证书包仍信任受影响层级。攻击者需要拦截 TLS 连接；这属于同一 eMudhra 事件，不是新的 CA 失陷。
  - name: PyPI 发布 Action 内置 CA 信任
    description: 该 Action 内置的 certifi 根证书由 Sigstore 依赖使用；公告列出 1.14.3 为修复版本。
fixed:
  - { status: "CVE-2026-111943。Go 1.25 及更早版本不会修复" }
  - {}
  - { status: 内置 NSS 3.131.1 的 CA 证书包 }
  - { status: 10月20日移除根证书 }
  - {}
  - { status: Oracle 10月24日根证书移除补丁已提供；具体修复构建须向厂商核验。其他 JDK 和自定义证书库需单独检查 }
  - { status: 需要 Python 3.10 或更新版本；逐个环境单独更新 pip }
  - { status: 刷新内置 CA 根证书 }
  - { status: Python 安全团队建议的最低版本 }
  - { status: 其他环境中的 CA 软件包也需更新 }
  - { status: 更新内置 CA 依赖 }
  - { product: Dart SDK 稳定版 / beta, status: 重建并重新分发受影响的应用 }
  - { product: Flutter SDK 稳定版 / beta, status: 使用修补后的 Dart SDK 重建 }
  - { product: Apple 平台的 FirebaseFirestore, status: CocoaPods 使用 12.19.3；重新发布应用 }
  - { product: FlutterFire cloud_firestore（Apple / Windows）, status: 重建并重新发布应用 }
  - { status: Apple 及桌面平台上的 Firestore；重建并重新发布 }
  - { status: Apple 及桌面平台上的 Firestore；重建并重新发布 }
  - { status: 刷新 CI 依赖；无需重新发布应用 }
  - { product: Checkmk 2.4, status: 已修复 }
  - { product: Checkmk 2.3, status: 已修复 }
  - { product: Checkmk 2.5, status: 已公布目标；厂商标记为尚未发布 }
  - { product: Checkmk 2.2, status: 已停止维护；迁移到受支持的已修复分支 }
  - { status: 除本地工具外，也须更新固定的 Action 引用 }
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
  - date: 2026年10月20日
    title: Python 安全指南列出打包工具更新
    body: 每个环境都要更新 pip；只在系统层取消信任，不能替换 pip 内置的 CA 根证书。
  - date: 2026年10月21日
    title: Conda 发布包管理工具及 CA 证书包更新说明
  - date: 2026年10月21日
    title: Node.js 安全更新拒绝这些密钥
  - date: 2026年10月21日
    title: Docker 使用更新后的 CA 证书重建 Sandboxes 模板
    body: 现有沙箱必须用新镜像重建；只更新 sbx 不够。
  - date: 2026年10月21日
    title: Sonatype 报告 Java 指纹阻止列表绕过
    body: 重新编码的中间证书通过所测配置的验证；移除相关根证书后，两条测试证书链均被拒绝。
  - date: 2026年10月21日
    title: Oracle 发布初次中间证书取消信任公告
    body: CVE-2026-91403 涉及 Java SE 和 GraalVM；后续公告移除相关根证书。
  - date: 2026年10月21日
    title: PyPI 发布 Action 公告列出内置 CA 修复
  - date: 2026年10月22日
    title: eMudhra 宣布退出全球 SSL/TLS 证书签发业务
    body: 合作伙伴免费提供替换证书；吊销与状态服务持续到所有已签发证书过期或被替换。未给出退出日期。
  - date: 2026年10月23日
    title: Dart 公告和 Firebase 指南列出应用层修复
    body: SDK 更新后须重建并重新分发客户端；Gradle 插件只需在构建流水线中更新。
  - date: 2026年10月24日
    title: Oracle 发布根证书移除更新
    body: CVE-2026-114820 及修订后的操作指南取代了仅依赖中间证书指纹阻止的做法。
  - date: 2026年10月26日
    title: Checkmk 2.3.0p52 发布 CA 信任库修复
  - date: 2026年10月27日
    title: Checkmk 2.4.0p39 发布 CA 信任库修复
  - date: 2026年10月27日
    title: Google 扩充 Cloud 与 Firebase 运维指导
    body: 自管信任库、Cloud CLI 及 COS 节点需单独更新；托管服务正在更新。
  - date: 2026年10月28日
    title: eMudhra 说明受影响客户的迁移情况
    body: 厂商称，G3 层级下约 30,800 张证书属于一个美国客户生态，正临时使用 G1 RSA 签发路径；没有给出停止经 G1 签发 TLS 证书的确定日期。
  - date: 2026年10月29日
    title: Checkmk 为内置信任库问题发布 CVE-2026-117611
    body: 2.5.0p18 仍标记为尚未发布；系统 CA 更新不能替换所有内置证书包。
  - date: 2026年10月27日前后
    title: Chrome Root Store v43 移除 emSign ECC Root CA - G3
checklist:
  - title: 更新浏览器和操作系统
    hint: Chrome、Firefox、Safari、Edge、Android 和 Windows 都已发布拦截
  - title: 更新各语言的信任库
    hint: certifi 2026.10.19、Go 1.27.3 / 1.26.10、Node 22.23.4 / 24.22.1 / 26.12.1
  - title: 更新每个虚拟环境中的 pip
    hint: 使用 Python 安全公告中带固定哈希的 wheel；确认 pip 达到 26.2.2 或更新版本后，再升级其他软件包
  - title: 更新所用的其他 Python 包管理及验证工具
    hint: uv 0.13.4、sigstore-python 4.5.1、conda 26.9.4、Pixi 0.82.1；检查 CI 工具和单独安装的副本
  - title: 刷新 conda、Mamba 的 CA 软件包并重建镜像
    hint: 更新每个相关环境的 certifi 和 ca-certificates；同步更新 mamba/libmamba，重建容器时禁用层缓存
  - title: 核验 Java 信任路径，不要只依赖指纹阻止列表
    hint: Oracle 运行时应安装 10月24日的根证书移除补丁，或按 ops.java/emudhra/ 备份 cacerts、移除所列四张根证书，并重启每个安装实例。其他 JDK 和自定义信任库应遵循各自厂商指南。测试依赖的 TLS 服务并监控失败；Sonatype 的测试表明仅依赖指纹阻止不够
  - title: 修补自定义信任库
    hint: 内部 CA 证书包、各类设备和 distroless 镜像需要单独更新；系统更新不会刷新所有应用证书包
  - title: 检查代码签名信任
    hint: 八张里有两张是受微软信任的代码签名 CA
  - title: 你自己的证书如果链到 emSign ECC Root CA - G3，赶紧换掉
    hint: 找别的 CA 重新签发。这八张中间证书已经验证不过了，Chrome 也会在 10月27日前后移除该根证书
  - title: 在 CT 监控里搜 emSign 签发的证书
    hint: 你的域名下只要出现不是你申请的证书，就是危险信号
  - title: 刷新 Docker Sandboxes 模板并重建现有沙箱
    hint: 先保存文件和未推送提交；创建时使用 --pull always。只更新 sbx 不会刷新现有沙箱
  - title: 重建 Dart 和 Flutter 客户端
    hint: 使用 Dart 3.13.7，或搭配已修补 Dart 的 Flutter 3.47.8；beta 最低版本分别为 3.14.0-315.3.beta 和 3.50.0-0.2.pre。重建并分发二进制文件。Android 和 Windows 不读取系统中间证书阻止列表；Linux 是否暴露取决于 CA 证书包
  - title: 发布更新后的 Firestore 客户端并刷新 App Distribution CI
    hint: 使用上表中对应平台的 SDK 版本。重建、重新发布 Firestore 应用并提示用户升级；浏览器或系统修复不能替换内嵌证书包。将 App Distribution Gradle 插件升级到 5.3.1 或更新版本并刷新 CI 依赖；此插件无需重新发布应用
  - title: 按所管理的层级应用 Google Cloud 指导
    hint: 更新 gcloud CLI，以及操作系统或自定义镜像的信任库。COS 应升级或重启节点以使用当前里程碑版本，或遵循 cos_ca_cert_mitigation 指导。核对链接中的 GKE 版本矩阵及各托管服务通告；Google 的托管服务更新不能代替客户镜像和 SDK 更新。Google 称基础设施未遭入侵，未发现面向 Cloud 工作负载的利用。
  - title: 更新 Checkmk 站点及受影响 Agent 组件
    hint: 使用 2.4.0p39 或 2.3.0p52；2.5.0p18 已公布但尚未发布，2.2 已停止维护。按部署更新 Pro/Ultimate/Cloud 版 Linux Agent 更新器及 Windows Python Agent 插件。check_httpv2 始终使用内置根证书，切换 Use system wide CAs 不能消除暴露。由 cron 启动的站点进程可能使用内置 certifi；还要更新系统及站点 CA 信任库。
  - title: 更新 CI 中的 PyPI 发布 Action
    hint: 使用 pypa/gh-action-pypi-publish 1.14.3 或更新版本，包括替换固定到旧提交 SHA 的引用。仅更新运行器或本地 certifi 不会替换 Action 内置副本。
sources:
  - says: 私钥是小于 256 的整数；报告时间、OneCRL 条目，以及 10月18日的吊销
  - name: eMudhra 声明
    says: 归因于密钥封装/解封装缺陷；称其中 7 张从未用于生产，第 8 张没签发过任何证书
  - says: 援引 Scott Helme 的说法，其中一个私钥就是数字 4；各厂商的拦截时间线
  - says: 浏览器和操作系统厂商的应对
  - name: Docker 安全公告
    says: 内置 Sandboxes 模板已重建；保存本地工作后，用 --pull always 重建现有沙箱
  - name: eMudhra 退出 SSL/TLS 业务公告
    says: 董事会批准退出；通过合作伙伴替换证书，继续提供吊销及状态服务；未指定完成日期
  - name: Chrome 与 Android 安全团队
    says: 移除根证书也会影响合法证书链；替换证书须使用另一受信任层级；预计 10月27日 PDT 推出
  - name: Python 安全指南
    says: 工具最低版本、带固定哈希的 pip 引导升级、逐环境更新及容器重建；pip 同时使用内置根证书
  - name: uv 安全公告
    says: uv 0.13.4 移除根证书；覆盖内置默认值时须核验系统或自定义证书库
  - name: certifi 安全公告
    says: 2026.10.18 移除根证书；Python 指南建议使用兼容性后续版本 2026.10.19
  - name: Conda 安全更新说明
    says: Conda 26.9.4、Pixi 0.82.1；单独更新 CA 软件包，注意渠道最低版本及 Mamba 构建号
  - name: pip 26.2.2 发布
    says: 日期为 10月20日的官方发布标签
  - name: sigstore-python 4.5.1 发布
    says: Python 安全团队引用的版本
  - name: Pixi 0.82.1 发布
    says: 为此事件将 webpki-root-certs 升至 1.0.10，rustls-webpki 升至 0.103.16
  - name: pip 26.2.2 软件包元数据
    says: 需要 Python 3.10 或更新版本
  - name: Dart SDK 安全公告
    says: 10月23日公告；Android 和 Windows 不读取系统中间证书阻止列表，Linux 取决于 CA 证书包；列出稳定版及 beta 修复版本
  - name: Firebase eMudhra 处置指南
    says: 各平台 SDK 和 Gradle 插件更新；已安装应用需要重新分发二进制文件；Firebase 后端不受影响
  - name: Sonatype Java 阻止列表研究
    says: 测试中重新编码可绕过精确指纹阻止，移除根证书后两条测试链均被拒绝；结论限于所测配置
  - name: Oracle CVE-2026-91403 公告
    says: 10月21日的中间证书取消信任更新；列出受影响的 Java SE 和 GraalVM 版本
  - name: Oracle CVE-2026-114820 公告
    says: 10月24日的根证书移除更新；版本表列出受影响版本，并非修复构建
  - name: Oracle JDK 操作指南
    says: 10月24日指南包含逐运行时备份证书库、移除根证书并重启，以及吊销检查和 CheckCerts.java
  - name: Google Cloud GCP-2026-071
    says: 10 月 27 日更新：客户管理的信任库、gcloud/COS/GKE 指导及托管服务更新，不代表基础设施遭入侵。
  - name: Checkmk Werk 22169
    says: HTTP 检查始终使用内置根证书，不受系统 CA 开关影响；目标版本包括尚未发布的 2.5.0p18。
  - name: Checkmk Werk 22623
    says: 说明 Linux 更新器、Windows Python 插件及站点外启动进程的内置 certifi 暴露。
  - name: Checkmk CNA 记录
    says: 10 月 29 日发布；CVSS 4.0 为 7.1，列出受影响版本。
  - name: Checkmk 2.3.0p52 发布公告
    says: 10 月 26 日版本包含两项 CA 信任库修复。
  - name: Checkmk 2.4.0p39 发布公告
    says: 10 月 27 日版本包含两项 CA 信任库修复。
  - name: PyPA 发布 Action 公告
    says: 列出 1.14.3 为修复版本；正文与受影响版本元数据对 1.14.2 边界的描述不同。
  - name: PyPA 1.14.3 发布
---
CA 的私钥，是“这真的是你的银行”这句话能成立的根本。eMudhra 有八张中间证书，P-384 私钥都是**小于 256 的整数**。据研究人员 Scott Helme 说，其中一个就是数字 4。谁要是注意到了，就能给任意域名签证书，而所有信任这条链的客户端都会照单全收。

这些中间证书挂在 **emSign ECC Root CA - G3** 下面，还带着 **Sectigo 的交叉签名**，信任它们的范围因此更大。六张是 TLS CA，两张是受微软信任的代码签名 CA。eMudhra 称问题出在密钥封装/解封装的一个缺陷上，导致生成了一批弱密钥。

### 为什么是 L4 而不是 L5

信任锚被攻破，一般都够得上 L5“屎无前例”。复核之后，我们把它降了一级：

- 没有迹象表明有人滥用过。证书透明度（CT）日志里没有这些中间证书签发的终端实体证书。
- 浏览器在收到报告几小时内就拦截了它们，各大平台三天内全部跟进。

真正的风险在长尾：各语言运行时、Java `cacerts`、各类设备，以及还带着旧证书包的老容器。

**10月22日更正：** 此前我们认为，约 3 万张证书需要迁移，与八张弱密钥中间证书未签发终端实体证书的说法矛盾。Google 解释，移除父级根证书也会影响其他中间证书下的合法证书。两者属于不同群体，迁移数量不能证明被攻破的密钥签发过证书。

**10月22日更新：** Docker 已记录使用更新后的 CA 证书重建 Sandboxes 模板。更新 CLI 或缓存模板不会更新现有沙箱。重建前先保存本地文件和未推送的提交，再拉取新镜像重新创建。这次更新改变处置步骤，L4 评级不变。

**10月22日进一步更新：** eMudhra 董事会决定退出全球 SSL/TLS 证书业务。公司承诺通过合作伙伴免费提供替换证书，并持续提供吊销及状态服务，直到所有已签发证书过期或被替换。退出日期和合作伙伴未明确。Chrome 仍在审查其余 RSA 层级，不能把厂商的过渡计划当作未来浏览器信任的保证。请及时更换受影响的网站证书；Chrome 预计于 10月27日 PDT 移除根证书。

**10月23日更新：** 此前的指南漏列了自带根证书的包管理工具。即使系统证书或独立 certifi 已更新，也要逐个环境更新 pip，使用 Python 安全公告中带固定哈希的引导升级方式。pip 26.2.2 需要 Python 3.10 或更新版本；旧解释器需要兼容的处置方案，不能假定其 CA 证书包安全。上表新增最低版本来自 Python 及工具维护者，不能替代运行时更新或 10月27日的证书迁移期限。使用 conda 时，base 之外环境的 CA 软件包也要更新。Mamba 重建可能沿用相同版本号，因此还要检查软件包构建号。

### 应用内嵌证书包与 Java 缓解缺口

**10月24日更新：** [Dart 公告](https://github.com/dart-lang/sdk/security/advisories/GHSA-frr6-h895-5pxp) 涉及网络路径上的攻击者拦截 Android、Windows，以及保留受影响根证书的 Linux 环境中的 `dart:io` HTTPS。公告排除 Web 和 Apple 验证路径，不代表使用独立内嵌 TLS 库的 Firestore 也不受影响。

[Firebase](https://firebase.google.com/support/guides/compromised-emudhra-intermediate-ca) 为原生 Apple 应用、iOS/macOS/Windows 上的 FlutterFire，以及 iOS/Linux/macOS/Windows 上的 Unity 或 C++ 列出 Firestore 修复。这些客户端 SDK 的影响范围与上面的 Dart 公告不同。须发布重建后的应用并让用户安装。Cloud Firestore 和 App Distribution 后端不受影响。

[Sonatype](https://www.sonatype.com/blog/the-limits-of-fingerprint-blocklists-a-reproducible-java-certificate-bypass) 发现，使用 ECDSA 或 RSA 签名的中间证书经替代编码后，可在其测试中绕过 Java 指纹阻止。移除相关根证书可拒绝这两条证书链，但可能中断合法连接。请按厂商指南核验每个已部署运行时及信任库；这是实验室复现的缓解绕过，并非在野攻击证据，也不能推广到所有 JDK。

**10月25日更新：** Oracle 在 10月21日发布中间证书取消信任公告 CVE-2026-91403 后，于 10月24日通过 CVE-2026-114820 提供移除根证书的补丁。两者属于同一事件。公开版本表列出的是受影响构建，并非安全版本；应通过 Oracle 的补丁可用性文档获取对应补丁。仍须完成上面其他运行时和应用的更新。这些公告没有证实在野利用。

未修补的 Oracle 运行时可采用[操作指南](https://ops.java/emudhra/)中的替代办法：备份 `cacerts`，移除 `emsignrootcag1 [jdk]`、`emsignrootcag2 [jdk]`、`emsigneccrootcag3 [jdk]` 和 `comodoaaaca [jdk]`，然后重启每个已安装的运行时。JDK 8 使用 `$JDK_HOME/jre/lib/security/cacerts`；JDK 11+ 使用 `$JDK_HOME/lib/security/cacerts`。移除前测试合法证书链，之后监控失败，并单独检查应用专用信任库。指南也列出吊销检查选项和验证工具。

**10 月 28 日更新：** Google 的 10 月 27 日公告区分托管服务更新与客户控制的信任库、自定义镜像及内置客户端。按服务核对具体指导；受影响产品清单不能证明 Cloud 后端遭入侵。既有运行时、SDK 及证书替换措施仍然适用。

**10 月 29 日更新：** eMudhra 在 10 月 28 日更新中称，受影响 G3 层级下约 30,800 张证书属于一个美国客户生态，现已使用其 G1 RSA 签发路径。公司计划在该生态完成迁移后停止经 G1 签发 TLS 证书，但没有确定日期。该厂商迁移数量不能证明八张弱密钥中间证书签发过证书，也不能证明在野利用。G1 不能保证未来继续受浏览器信任；上文的证书替换和信任库更新仍须完成。

**10 月 29 日进一步更新：** Checkmk 为同一 CA 信任事件分配 CVE-2026-117611（CVSS 4.0 为 7.1）。HTTP 检查始终使用内置根证书，系统 CA 开关不能绕过这一暴露。内置 Python 信任库影响 Pro/Ultimate/Cloud 版 Linux Agent 更新器、Windows Python 插件，以及从站点环境之外启动且 SSL_CERT_FILE 和 REQUESTS_CA_BUNDLE 均未设置的进程。通过 `omd start` 或站点 Shell 启动的进程则使用站点 CA 文件。分别更新相关证书包及系统、站点信任库。2.5.0p18 尚未发布，不能将已公布目标视为已安装的修复。这次补充产品处置措施，不代表已发现利用。

**11 月 1 日补充：** PyPA 的 10 月 21 日公告属于同一信任库事件，不是 PyPI 发布渠道另遭入侵。元数据将 1.14.2 列为受影响，而正文说早于 1.14.2；两者均指向 1.14.3。应更新 Action 本身，不能假定运行器的 CA 更新已经足够。该公告没有证实发布凭据遭窃。
