---
title: "eMudhra CA 中间证书私钥弱到离谱：每一个都是小于 256 的数"
headline: "eMudhra：八个 CA 私钥，计算器按几下就猜出来了"
summary: emSign ECC G3 下八张中间证书（六张 TLS、两张代码签名，带 Sectigo 交叉签名）的 P-384 私钥均小于 256，可用于伪造证书。须更新 Dart、Flutter、Firestore 及 CA 包。Chrome 153 及更高版本将取消对 G1 根下最早 SCT 晚于 11 月 16 日 23:59:59 UTC 的 TLS 证书的默认信任；更早 SCT 不受这项新规则影响。
splash: "信任 ECC G3/Sectigo 且经过攻击者控制网络路径的客户端；在 Chrome SCT 截止时间后签发证书的 G1 TLS 网站。"
wipe: "更新系统、浏览器及应用 CA 证书包（certifi 2026.10.19、Go 1.27.3 / 1.26.10、Node 22.23.4+），立即更换受影响证书。"
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
  - name: Python grpcio 内置 CA 信任
    description: grpcio 内置根证书库受影响；按发布线更新至 1.78.2、1.80.1、1.82.3、1.83.2 或 1.84.1。系统及 certifi 更新不会替换该证书库。
  - name: Ruby grpc 内置 CA 信任
    description: Ruby grpc 内置证书库受影响；按发布线更新至 1.78.2、1.80.1、1.82.3、1.83.2 或 1.84.1，不能仅更新系统根证书。
  - name: PHP grpc/grpc 内置 CA 信任
    description: Composer grpc/grpc 1.84.1 之前使用受影响内置信任库。
  - name: Google Java API 客户端内置 CA 信任
    description: google-api-client 2.9.2 之前可经 newTrustedTransport() 加载受影响内置根证书；JDK 信任库需独立更新。
  - name: Objective-C gRPC CocoaPod 内置 CA 信任
    description: gRPC CocoaPod（含经 gRPC-ProtoRPC 引入）低于 1.84.1 受影响；升级并重建应用。其他独立 Core／C++ CocoaPod 和 grpc-ios SPM 包不使用这一证书库。
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
  - { product: Checkmk 2.5, status: 已修复；11月2日发布 }
  - { product: Checkmk 2.2, status: 已停止维护；迁移到受支持的已修复分支 }
  - { status: 除本地工具外，也须更新固定的 Action 引用 }
  - status: 受影响的 Python HTTP 传输在缺少 certifi 时使用此证书包
  - product: Python grpcio／Ruby grpc
    status: 按对应发布线选补丁；内置根证书与系统证书库分开
  - status: 适用于 GoogleNetHttpTransport.newTrustedTransport()；另须更新 JDK 及自定义证书库
  - status: 也可将服务库升级到 -2.9.2 后缀版本，或显式声明 google-api-client 2.9.2
  - status: 使用对应分支的补丁；引入 libraries-bom 26.91.0
  - status: 引入 grpc/grpc 1.84.1 或更新版本
  - status: 若使用内置 roots.pem 而非系统证书库，须重新构建
  - status: 重建并重新部署；RUSTSEC-2026-0382
  - status: 更新应用实际使用的根证书 crate；RUSTSEC-2026-0383 / 0381
  - status: 独立构件；公告列出 2.7.0–2.8.1 受影响；另须修补 JDK 信任库
  - { product: "Istio 1.31", status: "更新镜像、Go 构建及 ztunnel 证书信任处理" }
  - { product: "Istio 1.30", status: "更新镜像、Go 构建及 ztunnel 证书信任处理" }
  - { product: "Istio 1.29", status: "停止维护后的特殊版本；Go 组件仅修复 CA 证书包，须迁移至 1.30+" }
  - { product: "集群内 Cloud Service Mesh 1.31", status: "GCP-2026-076 修补版本" }
  - { product: "集群内 Cloud Service Mesh 1.30", status: "GCP-2026-076 修补版本" }
  - { product: "集群内 Cloud Service Mesh 1.29", status: "GCP-2026-076 修补版本；1.28 及更早版本已停止维护" }
  - product: PHP grpc/grpc
    status: Composer 包修复；不能把 Python／Ruby 的旧线版本套用到 PHP
  - product: Objective-C gRPC CocoaPod
    status: 升级并重建应用；不涵盖独立 gRPC-Core／gRPC-C++ CocoaPod 或 grpc-ios SPM 包
  - product: SonicOS 7.3.4 固件
    status: 移除 eMudhra 可信链，须满足平台及迁移要求
  - product: Rundeck／Runbook Automation／Runner 官方 Docker 镜像
    status: 拉取更新镜像并重建容器；主机安装 Rundeck 须分别更新系统及 Java 信任库
  - product: New Relic Synthetics job manager
    status: 拉取并重新部署全部 Private location 镜像，再重启；不会自动更新
  - product: New Relic Synthetics Node API runtime
    status: 拉取并重新部署全部 Private location 镜像，再重启；不会自动更新
  - product: New Relic Synthetics Node browser runtime
    status: 拉取并重新部署全部 Private location 镜像，再重启；不会自动更新
  - product: New Relic Synthetics ping runtime
    status: 拉取并重新部署全部 Private location 镜像，再重启；不会自动更新
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
  - date: 2026年10月22日
    title: Rundeck 发布 6.3.0，修正官方 Docker 镜像信任库
    body: 自托管 Rundeck、Runbook Automation 及容器化 Runner 需更换镜像，主机管理的系统及 Java 信任库须另行更新。厂商将 Runbook Automation SaaS 排除在影响范围外。
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
  - date: 2026年10月28日
    title: Objective-C 公告明确 CocoaPod 及应用重建要求
    body: GHSA-mm89-g5jq-mmfq 属于同一 CA 事件；gRPC CocoaPod 1.84.1 修复，GRPC_DEFAULT_SSL_ROOTS_FILE_PATH 变通不适用于该传输。
  - date: 2026年10月29日
    title: Checkmk 为内置信任库问题发布 CVE-2026-117611
    body: 当时 2.5.0p18 仍标记为尚未发布；系统 CA 更新不能替换所有内置证书包。
  - date: 2026年11月2日
    title: Checkmk 2.5.0p18 已可获取
    body: 官方下载归档将其列为11月2日发布，CA 信任库修复不再只是公布的目标。
  - date: 2026年11月2日
    title: Google 发布 Cloud SDK 各语言信任库修复指南
    body: GCP-2026-075 区分内置传输证书包、运行时及系统信任库；须更新实际使用的路径并重建应用。Google 未发现 Cloud 基础设施被入侵或工作负载遭利用的证据。
  - date: 2026年11月2日
    title: Google 公布 Cloud Service Mesh 证书信任修补版本
    body: GCP-2026-076 列出集群内版本 1.31.3-asm.3、1.30.7-asm.3 和 1.29.10-asm.0；托管版 Cloud Service Mesh 自动更新，无需客户操作。
  - date: 2026年11月3日
    title: Google 补充 Apigee 出站 TLS 处置指引
    body: GCP-2026-077 区分托管平台更新、Hybrid 镜像内信任库、OPDK 手动处置及客户自定义 TrustStore，尚未列出 Hybrid 修补版本。
  - date: 2026年11月4日
    title: Chrome 为 emSign Root CA - G1 公布独立 SCT 截止限制
    body: 最早 SCT 晚于 11 月 16 日 23:59:59 UTC 的证书将在 Chrome 153 及更高版本失去默认信任。更早 SCT 不受这项新限制影响，显式本地信任可覆盖限制。计划配合 11 月 17 日 Chrome 158 Stable 发布，日期可能调整。
  - date: 2026年11月5日
    title: gRPC 公告补充 Python 和 Ruby 的旧发布线补丁
    body: Python 01:44:12 UTC、Ruby 02:01:37 UTC 修订列出 1.82.3、1.83.2 和 1.84.1；PHP Composer 公告仍只列 1.84.1，不能跨语言推定旧线版本。
  - date: 2026年11月5日
    title: eMudhra 报告更多 G1 迁移期限及区域进展
    body: 颁发机构报告 Chrome 和 Mozilla 的 SCT 截止为 11 月 16 日，Apple 于 11 月 30 日移除全部 G1 信任；称美国以外迁移完成，美国仍在进行。具体浏览器政策仍以各根计划为准。
  - date: 2026年11月5日
    title: gRPC 为另外两条旧线发布根证书修复
    body: 1.78.2 和 1.80.1 发布记录包含根证书修复。Python 和 Ruby 公告现将它们与 1.82.3、1.83.2、1.84.1 一并列出。PHP Composer 保留独立的 1.84.1 下限。
  - date: 2026年11月6日
    title: New Relic 要求手动更新 Synthetics 镜像并迁移旧运行时
    body: NR26-12 列出四项 Private location 镜像下限，任何运行时均须更新并重启；最新版 Public location 已修补，但两种位置的 Node 16.10 监测均须在 11 月 18 日停止支持前迁至厂商运行时 22.23.0。
  - date: 2026年10月27日前后
    title: Chrome Root Store v43 移除 emSign ECC Root CA - G3
  - date: 2026年11月前后
    title: SonicWall 在 SonicOS 7.3.4-7015 移除该证书链
    body: 11 月发布说明将 GEN7-59578 列为从可信证书库移除 eMudhra 链，未注明准确发布日期。
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
    hint: 立即从其他 CA 重新签发。八张中间证书已被吊销；Chrome 公布的根证书移除目标约为 10月27日，期限已过。应核验客户端当前信任状态，不要继续等待该日期。
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
    hint: 按对应分支使用 2.5.0p18、2.4.0p39 或 2.3.0p52；2.5.0p18 已于11月2日发布，2.2 已停止维护。按部署更新 Pro/Ultimate/Cloud 版 Linux Agent 更新器及 Windows Python Agent 插件。check_httpv2 始终使用内置根证书，切换 Use system wide CAs 不能消除暴露。由 cron 启动的站点进程可能使用内置 certifi；还要更新系统及站点 CA 信任库。
  - title: 更新 CI 中的 PyPI 发布 Action
    hint: 使用 pypa/gh-action-pypi-publish 1.14.3 或更新版本，包括替换固定到旧提交 SHA 的引用。仅更新运行器或本地 certifi 不会替换 Action 内置副本。
  - title: 更新 Python、Ruby 与 PHP 的传输依赖
    hint: Python 使用 certifi 2026.10.19+、httplib2 0.32.1+（无 certifi 时使用其内置库）、grpcio 1.84.1+；Ruby 将 grpc 更新到 1.84.1+，或更新 google-cloud-* gems 以引入它；PHP 将 grpc/grpc 更新到 1.84.1+，或将 google/gax 更新到 1.51.2+。REST 路径还须更新系统证书库，不能假设 gRPC 会读取系统根证书。PHP PECL 扩展本身不内置根证书，但仍须更新其系统信任库。显式提供给 gRPC 的根证书集合需单独核验。 Python grpcio 和 Ruby grpc 也可按原发布线升级到 1.78.2、1.80.1、1.82.3 或 1.83.2。公告 API 将 1.81.x 归入 1.82.3 补丁路径；不要假定存在未列出的 1.79.x 补丁。PHP grpc/grpc 仍采用其公告的 1.84.1 下限。Ruby 临时方案须先修补系统 CA，再在进程启动前设置 GRPC_DEFAULT_SSL_ROOTS_FILE_PATH=/etc/ssl/certs/ca-certificates.crt（Debian 路径）；文件缺失或不可读会退回内置证书库。PHP-FPM 默认清理环境，若采用同类方案应在池配置设置 env[GRPC_DEFAULT_SSL_ROOTS_FILE_PATH]，并确认实际生效。
  - title: 核验 Google Java 客户端及旧版 gRPC
    hint: newTrustedTransport() 用户升级 google-api-client 至 2.9.2+ 或 libraries-bom 至 26.91.0+；单独声明服务库时，使用 -2.9.2 或更新后缀，也可显式声明客户端依赖。Spring 按对应分支使用 8.3.1、7.5.2、6.5.12、3.9.19 或更新版本。2.9.0 之前的 Apache newTrustedTransport() 也使用内置根证书；独立 google-api-client-apache-v5 构件的受影响 2.7.0–2.8.1 应升级至 2.9.0+。直接调用传输构造器使用 JDK 信任库。JDK 及 Windows 根证书仍须独立更新。已弃用的 Node grpc npm 包迁移至 @grpc/grpc-js，.NET Grpc.Core 迁移至 Grpc.Net.Client。
  - title: 重建 C++、Rust、Go 与 Swift 的实际信任路径
    hint: C++ 若使用回退 roots.pem，重新链接 gRPC 1.84.1+，并更新系统或镜像根证书。Rust 执行 cargo update，确认 rustls-webpki 0.103.16+ 及所用 webpki-root-certs 或 webpki-roots 1.0.10+。Go 使用上方已修补工具链和新基础镜像重建。Swift AsyncHTTPClient / grpc-swift-2 使用系统证书库，应更新系统；该指引不要求将 Objective-C CocoaPod 的独立修复套用到 Swift。随后重新分发应用或部署镜像。
  - title: 检查应用实际加载的根证书指纹
    hint: GCP-2026-075 要求确认实际信任库不含这三张证书：emSign ECC Root CA - G3，SHA-256 86:A1:EC:BA:08:9C:4A:8D:3B:BE:27:34:C6:12:BA:34:1D:81:3E:04:3C:F9:E8:A8:62:CD:5C:57:A3:6B:BE:6B；emSign Root TLS CA - G3，7D:D7:8D:5F:4F:13:45:9A:83:DF:F9:AB:BB:A6:2E:DB:AF:6F:2D:10:2B:F2:57:FD:71:2F:4D:9F:27:46:ED:8D；AAA Certificate Services，D7:A7:A0:FB:5D:7E:27:31:D7:71:E9:48:4E:BC:DE:F7:1D:5F:0C:3E:0A:29:48:78:2B:C8:3E:E0:EA:69:9E:F4。重建后的镜像及所有独立信任库均须核验；发现证书说明信任尚未移除，本身不证明遭到攻击。
  - title: 修补实际运行的 Istio 或 Cloud Service Mesh 发行版
    hint: 上游 Istio 升至 1.31.3、1.30.7 或特殊发布的 1.29.10；1.29 已停止维护，其 Go 1.25 构建缺少 Go 密钥拒信修复，应迁移至 1.30+。Google 集群内 Cloud Service Mesh 使用 1.31.3-asm.3、1.30.7-asm.3 或 1.29.10-asm.0，1.28 及更早版本已停止维护；托管版自动更新。检查未指定 caCertificates/credentialName 的 DestinationRule SIMPLE TLS、RequestAuthentication 的 jwksUri 获取，以及 XDS_ROOT_CA=SYSTEM。网格自行签发的 mTLS 证书不受影响。按需重新部署更新后的 sidecar、gateway 和工作负载；上游暂时无法升级时，对受影响外部 TLS 路径设置明确可信 CA 凭据或 caCrl，不要关闭验证。
  - title: 核查所有 Apigee 出站 TLS 信任路径
    hint: 备份密钥库、信任库及配置，在非生产环境测试。检查 TargetEndpoint、TargetServer、ServiceCallout 的 SSLInfo 及出站 JWKS 获取。逐环境核查自定义 TrustStore；托管平台更新不会移除客户上传的证书。核对上列根证书指纹及 GCP-2026-077 的被攻破中间证书名称；匹配表示信任尚未移除，并非已发现攻击。
  - title: 区分 Apigee 托管更新及 Hybrid 镜像升级
    hint: Google 称 Apigee X 和 Edge SaaS 平台默认信任库处置仍在进行，不能视为全部完成。立即核查自定义库。Hybrid 在容器镜像内嵌入独立 CA 库，不挂载宿主机 CA 库：待 Google 发布修补镜像后升级。公告未列出 Hybrid 修复版本，只更新操作系统不够。
  - title: 逐节点处置 Apigee Edge Private Cloud
    hint: 按 GCP-2026-077 在 RHEL/CentOS/Rocky 更新 ca-certificates 并重新生成系统信任库。若 FIPS 仍使用随产品提供的 BCFKS 库，先按链接的 FIPS Option A 创建客户自管库，产品更新会覆盖原库。使用正确的 provider 及库密码核查、删除实际受影响别名，保留 apigee:apigee 所有权，然后逐节点按文档滚动停止并启动 Apigee 服务。另须核查或创建明确的出站目标 TrustStore。
  - title: 先更换受影响后端证书，再移除相应信任
    hint: 检查后端证书签发者。对 eMudhra 签发的后端证书，先通过可信 CA 重新签发并替换，再删除自定义库中的受影响别名。在控制台进入 Apigee > Management > Environments > TLS Keystores，核查别名并删除受影响证书，将 SSLInfo 指向经核实的 TrustStore。ref:// 引用无需重新部署代理即可生效，直接名称引用则须重新部署代理。测试出站 TLS/mTLS 及依赖 JWKS 的流程，不要通过关闭验证恢复连接。
  - title: 规划替换新签发的 G1 根 TLS 证书
    hint: 检查实际服务证书链及最早 Signed Certificate Timestamp，不要仅看 NotBefore 或到期日。针对 emSign Root CA - G1，而非已移除的 ECC G3，Chrome 153 及更高版本将在最早 SCT 晚于 2026 年 11 月 16 日 23:59:59 UTC 时拒绝默认信任。在新签发或续期越过截止点前协调迁移到其他受信任 CA 层级，并在 Chrome 测试证书链。较早 SCT 只是不受本项变更影响，不代表所有信任检查均通过。核查 Windows GPO 等企业或用户显式信任，这会覆盖 SCT 限制；不要将添加覆盖作为常规缓解。跟进关联 Root Program 公告的实施时间修订。
  - title: 重建使用 Objective-C gRPC CocoaPod 的 Apple 应用
    hint: 检查 Podfile.lock 中的 gRPC，包括 gRPC-ProtoRPC 的传递依赖，升至 1.84.1 或更新版本并重建、重新分发应用。不能只更新 iOS／macOS。公告排除独立 gRPC-Core、gRPC-C++ CocoaPod 及 grpc-ios Swift Package Manager 包；其他产品的内置证书库需分别核查。GRPC_DEFAULT_SSL_ROOTS_FILE_PATH 对这里不适用。
  - title: 向颁发机构核实更广的 G1 替换计划
    hint: eMudhra 11 月 5 日 Update 8 报告 Apple 将于 11 月 30 日移除所有 G1 链证书的信任，不同于其所述 Chrome 和 Mozilla 于 11 月 16 日实施的 SCT 规则。通过既有支持在适用期限前获取并测试替代链，包括面向 Apple 的既有证书。按颁发机构说法，美国迁移仍在进行。核实各浏览器根计划，保留上方 Chrome 精确 UTC 规则，不绕过验证。
  - title: 按厂商升级说明更新受影响 SonicOS 信任库
    hint: SonicOS 7.3.4-7015 移除 eMudhra 链（GEN7-59578）。核实平台支持及升级前提，版本不支持降级。NSv 从 7.0.1 升至 7.1 或更高版本需要全新安装；管理 7.3.4 需要 NSM On-Premises 4.4，GMS 无法管理 SonicOS 7.1.x 及更高版本。若 GeoIP 曾固定为 204.212.170.21，改用默认解析或新 GeoIP 地址 204.212.170.31；不要将 Botnet Remote Server Address 设为后者。若 DNS 不可用，按发布说明手动设置 Botnet 端点。另行检查自定义证书及依赖连接。
  - title: 用修正信任库的镜像重建 Rundeck 和 Runner 容器
    hint: 拉取官方 6.3.0 镜像，重建 Rundeck、Runbook Automation 及 Docker／Kubernetes Runner 容器。仅在运行中容器执行 apt-get upgrade 的更改会在重建时丢失。RPM／DEB／WAR 安装的 Rundeck 或 Runbook Automation 需更新主机系统 ca-certificates 包与 Java 运行时信任库，再重启 Rundeck。主机安装的 Runner 使用主机信任库，按主机厂商指引更新该库。厂商称 Runbook Automation SaaS 未受影响。在容器内或主机执行 curl https://dv-g3b-emudhra.we-have-a-problem.com/，预期以证书错误拒绝；TLS 成功意味着仍保留受影响信任。curl 只检查其系统库，不能验证 Java 或全部自定义库，须分别核验。
  - title: 重新部署 New Relic Synthetics 并迁移 Node 16 监测
    hint: NR26-12 要求全部 Private location 拉取并重新部署 newrelic/synthetics-job-manager v642+、newrelic/synthetics-node-api-runtime 1.2.296+、newrelic/synthetics-node-browser-runtime 3.0.259+ 及 newrelic/synthetics-ping-runtime 1.87.0+，随后重启容器，不论原有运行时。于 NRQL 查询编辑器执行 SELECT uniques(monitorName) FROM SyntheticCheck WHERE runtimeType = 'NODE_API' AND runtimeTypeVersion = '16.10' SINCE 1 day ago，或在 Synthetics EOL 过滤 Script API。Public 和 Private location 的 Node 16.10 监测均应在 11 月 18 日前迁至 New Relic 所列运行时 22.23.0，并测试运行。Public 最新 Node 22／浏览器／ping 基础设施已修补，Public Node 16 自动迁移拟于 18 日开始，不代表今天已完成。没有具体失陷证据时不要求统一轮换 secure credentials；部署疑问联系 New Relic 支持。
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
    says: HTTP 检查始终使用内置根证书，不受系统 CA 开关影响；修复版本包括 2.5.0p18，现已列入厂商下载归档。
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
  - name: Checkmk 官方下载归档
    says: 列出11月2日的 Checkmk 2.5.0p18 及各版本、平台软件包
  - name: Google Cloud SDK 各语言处置公告
    says: 11月2日 GCP-2026-075：按语言列出传输证书包、客户端及系统根证书更新和核验指纹；同日 GCP-2026-071 增列 SDK Libraries。
  - name: gRPC Python 公告
    says: 原始内置根证书公告；升级与自定义信任库注意事项。
  - name: gRPC Ruby 公告
    says: 原始内置根证书公告；升级与自定义信任库注意事项。
  - name: gRPC PHP 公告
    says: 原始内置根证书公告；升级与自定义信任库注意事项。
  - name: Google Java API 客户端公告
    says: 原始传输影响范围及缓解说明；Java 另涵盖独立 Apache v5 构件。
  - name: Google Cloud Service Mesh GCP-2026-076
    says: 11 月 2 日公告给出三条集群内修补版本，并说明托管部署自动更新。
  - name: Istio ISTIO-SECURITY-2026-008
    says: 上游修复、公有 CA 信任前提、Go 1.25 的限制、ztunnel 拒信及外部 TLS 缓解措施；网格自签发的 mTLS 不受影响。
  - name: Google Apigee GCP-2026-077 安全公告
    says: 11 月 3 日发布：托管更新仍在进行、Hybrid 镜像独立信任库、OPDK 系统/FIPS/自定义库步骤及后端证书与重新部署检查；尚未指定 Hybrid 修补版本。
  - name: Chrome Root Program 11 月 4 日 G1 信任限制原始通知
    says: 区分 G1 与已移除的 ECC G3，给出最早 SCT 截止点、Chrome 版本、拟于 11 月 17 日实施及显式本地信任例外。
  - name: gRPC Objective-C 原始安全公告
    says: GHSA-mm89-g5jq-mmfq 于 10 月 28 日发布；限定 gRPC CocoaPod，列出 1.84.1、重建要求、未受影响包及不适用的环境变量变通。
  - name: gRPC Python 公告 API
    says: 列出含 1.78.2、1.80.1 在内的五项 Python 补丁下限；1.81.x 归入 1.82.3 路径。
  - name: gRPC Ruby 公告 API
    says: 列出五项 Ruby 补丁下限，与 PHP Composer 及 Objective-C 公告分别处理。
  - name: gRPC 1.78.2 发布记录
    says: 11 月 5 日发布，包含仓库根证书的安全更新。
  - name: gRPC 1.80.1 发布记录
    says: 11 月 5 日发布，包含仓库根证书的安全更新。
  - name: SonicWall SonicOS 7.3.4-7015 发布说明
    says: 2026 年 11 月固件移除 eMudhra 可信链，并列出平台、迁移和 GeoIP 升级要求。
  - name: Rundeck eMudhra 信任库公告
  - name: Rundeck 6.3.0 发布说明

  - name: New Relic NR26-12 Synthetics 公告
    says: 11 月 6 日发布，列明四项 Private location 镜像下限、全部运行时重启、Public location 例外、Node 16.10 迁移及11月18日停止支持、排查查询、未发现镜像篡改及无统一 secure credentials 轮换要求。
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

**10 月 29 日进一步更新：** Checkmk 为同一 CA 信任事件分配 CVE-2026-117611（CVSS 4.0 为 7.1）。HTTP 检查始终使用内置根证书，系统 CA 开关不能绕过这一暴露。内置 Python 信任库影响 Pro/Ultimate/Cloud 版 Linux Agent 更新器、Windows Python 插件，以及从站点环境之外启动且 SSL_CERT_FILE 和 REQUESTS_CA_BUNDLE 均未设置的进程。通过 `omd start` 或站点 Shell 启动的进程则使用站点 CA 文件。分别更新相关证书包及系统、站点信任库。在当时的10月29日更新中，2.5.0p18 尚未发布，不能将已公布目标视为已安装的修复。这次补充产品处置措施，不代表已发现利用。

**11 月 1 日补充：** PyPA 的 10 月 21 日公告属于同一信任库事件，不是 PyPI 发布渠道另遭入侵。元数据将 1.14.2 列为受影响，而正文说早于 1.14.2；两者均指向 1.14.3。应更新 Action 本身，不能假定运行器的 CA 更新已经足够。该公告没有证实发布凭据遭窃。

**11月2日更新：** 厂商下载归档现已列出11月2日的 Checkmk 2.5.0p18，并提供各版本、平台的软件包元数据。Werk 22169 和 22623 将该版本列为内置 CA 信任库修复，不再带有此前的尚未发布标记。这取代先前的可用性警告，但仍须更新受影响站点和 Agent 组件，以及单独的系统、站点信任库；不是新的利用证据。

**11月3日补充，追踪 11月2日官方更新：** Google 的 GCP-2026-075 明确，Google Cloud SDK Libraries 通常不自带 CA，信任来自传输依赖、运行时或系统；Java google-api-client 2.9.2 之前是例外。对于 GoogleNetHttpTransport.newTrustedTransport()，2.9.0 之前使用内置信任库，2.9.0 与 2.9.1 在无法加载 JDK 信任库时回退使用它。直接调用传输构造器使用 JDK 信任库，需安装其厂商更新。不能只升级 Cloud SDK 就认定所有应用已修复。Python grpcio、Ruby grpc 和 PHP grpc/grpc 的内置库不读取系统根证书；已弃用的 Node grpc 和 .NET Grpc.Core 需要迁移。按新增清单更新实际依赖、核验三张根证书已移除，并重建、重新分发或部署。Google 再次表示 Cloud 基础设施未被入侵，遥测未发现针对 Cloud 工作负载的利用；这是同一 CA 事件的下游修复补充。

**11 月 2 日网格处置指南：** Google 的 GCP-2026-076 补充了上列三条集群内 Cloud Service Mesh 修补版本，托管部署无需客户操作。所链接的 Istio 公告区分了公有根证书信任与网格自行签发的 mTLS。较旧 1.29 分支更新了 CA 镜像，但 Go 1.25 没有密钥拒信修复回移。这仍是既有 CA 证书被攻破事件，并非网格签发密钥发生新的泄露。

**11 月 4 日跟进 11 月 3 日发布的 GCP-2026-077：** Apigee 出站 TLS 仍可能通过默认或客户自定义信任库接受被攻破的证书链。攻击者需要网络拦截位置及被信任的伪造链；公告不是 Apigee 遭入侵或已被利用的证据。X 和 Edge SaaS 默认库仍在滚动更新，各产品客户均须核查自定义 TrustStore。Hybrid 须在修补镜像发布后更新容器，仅更新宿主机 CA 不够；OPDK 须处置系统及 JVM 信任并重启服务。移除信任前先安排后端证书替换，避免中断合法目标连接。上列运行时、SDK、网格及证书替换措施仍须完成。

**11 月 4 日 Chrome 策略：** Root Program 对 **emSign Root CA - G1** 增加独立限制。最早 SCT 晚于 **2026 年 11 月 16 日 23:59:59 UTC** 的 TLS 服务器证书，将在 Chrome 153 及更高版本失去默认信任。截止点或之前的证书不受本项变更影响，这不是对其他信任检查的全面保证。计划配合 11 月 17 日 Chrome 158 Stable 实施，项目可能调整日期或提前收紧限制。平台、用户或企业显式信任可覆盖这些 SCT 限制。G1 策略决定不能证明另有密钥被盗、新伪造证书或实际拦截，也不取代现有 ECC G3 移除及运行时、SDK 更新。

**11 月 5 日 gRPC 补充：** Python 和 Ruby 公告现明确 1.82.3／1.83.2／1.84.1 三条补丁路径；先前只写 1.84.1 的描述应按发布线理解，PHP Composer 公告仍仅列 1.84.1。另补入 10 月 28 日的 Objective-C 公告，涵盖 gRPC CocoaPod 及通过 gRPC-ProtoRPC 引入的副本，须升级并重建、分发应用；它明确排除独立 Core／C++ CocoaPod 和 grpc-ios SPM 包，且不支持上述环境变量变通。没有新增 CA 失陷或在野攻击证据。

**11 月 5 日颁发机构更新：** eMudhra 报告，美国以外客户已迁往其他供应商，美国客户仍在迁移。其报告 Chrome／Mozilla 的 SCT 限制日期为 11 月 16 日，Apple 将于 11 月 30 日移除全部 G1 证书信任，包括较早签发的证书。这是颁发机构对时间表的说明；独立核阅的 Chrome 精确规则仍见上文。不能据此认定美国已迁移完成或较早证书仍普遍受信任。

**11 月 6 日旧线覆盖修正：** 11 月 5 日发布的 1.78.2 和 1.80.1 也修复了内置根证书库。Python 和 Ruby 公告现列出五条补丁路径。选择安装发布线对应的补丁，或迁移至 1.84.1 及更高版本；1.81.x 须使用 1.82.3 路径。这是对先前三版本指引的扩充，不改变 PHP Composer 或 Objective-C 的最低版本。仍须核验显式、自定义根证书，并重建或重启受影响应用。这不代表又发生 CA 失陷或新增在野利用。

**SonicOS 信任库跟进：** 11 月发布说明确认 7.3.4-7015 移除 eMudhra 链。这是具体产品的处置，不是新的 CA 事件，也不能证明所有 SonicWall 版本均已移除该链。来源只给出月份，不推断准确发布日期。原有浏览器、运行时期限及证书更换要求仍适用。

**Rundeck 部署补充：** 厂商 10 月 23 日公告说明了 10 月 22 日发布的 6.3.0 官方 Docker 镜像对同一 CA 事件的修复。这里补上此前遗漏的下游处置路径，不是新的 CA 事件。SaaS 不受影响，主机管理的系统及 Java 信任库、容器化 Runner 则须按实际部署分别处理。curl 拒绝证书不能证明 Java 的独立信任库也已更新。

**11 月 6 日 New Relic 下游公告：** NR26-12 要求手动拉取并重新部署上方四项 Private location 镜像，随后重启容器；Private location 镜像不会自动更新。Public location 使用 Node 22 的 Scripted API、浏览器运行时及 ping 监测，其基础设施镜像已修补，针对本 CA 问题无需操作；固定在 Node 16.10 的监测属于例外，两种位置均须迁移。所列 22.23.0 是 New Relic 的 Synthetics 迁移运行时，不替代另一篇 10 月 Node 发布事件中的独立 Node 安全版本下限。应在 11 月 18 日停止支持及计划 Public 自动迁移前测试。New Relic 称未发现合成监测镜像篡改证据，仅在有具体理由怀疑网络或基础设施失陷时要求轮换 secure credentials。
