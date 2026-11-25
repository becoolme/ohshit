---
title: PHP 11月安全版本修复条件性 RCE、FPM 请求走私及 worker 到 master 提权
headline: 又有一组管道需要检查
tags:
- PHP
- RCE
- PHP-FPM
summary: PHP 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36 和 8.6.0 修复 11月安全漏洞。持久 FPM 连接可开启请求走私 RCE；其他路径依赖特定回溯、日志或会话配置。另一处 FPM 漏洞可将已有 worker 代码执行提升到 master 权限。
splash: 前提因漏洞而异：持久后端连接、特殊 PHP 设置、共享会话状态或已有 FPM worker 代码执行
wipe: 升级至 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36 或 8.6.0；重启 worker 并按配置采取防护
inTheWildNote: PHP 公布了利用演示；这些材料未确认在野利用。
cves:
- name: FPM worker 到 master 提权
  description: Linux epoll、开启 catch_workers_output 且已有 worker 代码执行权限时，可能控制 FPM master；只有 master 本身为 root 时才提升到 root。
- name: 关闭阶段的回溯状态残留到下一请求
  description: 仅影响 PHP 8.5：关闭后期的诊断可能重建已释放的回溯；同一 worker 后续请求的早期诊断可能破坏内存。这些入口尚未演示 RCE。
- name: 启动时区缓存指向已释放内存
  description: 启动诊断经 PHP 文件错误日志写入时，可能为新 worker 的请求留下失效缓存。已演示的本地 FPM/mod_php 命令执行需要已知地址和额外条件。
- name: 会话清理残留已释放的脚本文件名
  description: PHP 8.3–8.5：会话清理中的致命错误可能使请求所有的文件名内存残留到同一 worker 的下一请求。已确认崩溃和 UAF，未演示 RCE。
- name: 魔术方法参数回溯导致内存破坏
  description: PHP 8.5：可达魔术方法调用、特定时机的致命错误、启用致命错误回溯且包含参数时，可导致 worker 权限 RCE。生产 INI 排除参数可阻断已演示路径。
- name: 持久 FPM 连接请求走私
  description: 复用后端连接，且应用打开 php://input 但未读完时，可能接收伪造 FastCGI 请求并导致 worker 权限 RCE。LSAPI 也存在流失步，但未确认 LSAPI RCE。
- name: 超大 RFC 3986 URI 序列化异常
  description: PHP 8.5 的 Uri\Rfc3986\Uri 在内存充足且输入接近 2 GiB 时可能返回无效或截断文本。parse_url 与 WhatWG URL 不受影响，未演示 RCE。
- name: CGI 路径修正访问无效内存
  description: php-cgi 开启 cgi.fix_pathinfo=1 且服务器路径映射不一致时，可能崩溃、泄露或破坏内存。PHP-FPM/mod_php 不受影响，代码执行尚未确认。
- name: 会话文件替换中断导致对象注入
  description: files 会话处理器在写入中断后可能混合新旧数据。RCE 需要攻击者影响内容、恰当的中断时机及应用对象利用链。
- name: SOAP XML 清理使用已释放的 DTD 数据
  description: 含 DTD 实体引用的特制 SOAP XML 可使 worker 崩溃；不可信 WSDL/模式处理也能到达错误清理路径。内存泄露与 RCE 尚未确认。
- name: 现代 DOM XML 序列化双重释放
  description: PHP 8.4–8.5 对攻击者控制的文档使用现代 DOM saveXml() 时，可能破坏内存并崩溃。旧 DOMDocument 不受影响，尚未演示实际应用中的 RCE。
- name: 安全 URL 协议中的大写 S 导致丢失 TLS
  description: 内置流封装器遇到协议中含大写 S 的 HTTPS/FTPS URL 时，可能明文发送数据，重定向也受影响。网络观察者可能取得传输的秘密。
- name: 折叠 HTTP 响应头消耗过量 CPU
  description: 攻击者控制的服务器响应包含大量续行时，可占用通过内置 HTTP 流请求数据的 worker；仅启用 allow_url_fopen 不足以证明受影响。
- name: FPM 完整状态输出注入标记
  description: 请求元数据可能为查看完整 HTML 状态的运维人员植入脚本。转发 Basic 认证头可开启其中一条路径；仅限制状态页访问不能阻止植入。
- name: SOAP 数组解码泄露堆片段
  description: 无效 arraySize 维度可能让小段堆数据成为数组键；应用返回解码数组时才可能泄露。未确认默认分配器下的 RCE 或内存破坏。
- name: Phar 签名算法降级
  description: 替换签名归档并将签名改为无密钥摘要，可能绕过可信旁置公钥；加载修改后的归档可执行代码，必须独立保护公钥。
fixed:
- status: 包含 11月安全修复；各 CVE 的影响版本范围不同
- status: 包含 11月安全修复；各 CVE 的影响版本范围不同
- status: 包含 11月安全修复；各 CVE 的影响版本范围不同
- status: 包含 11月安全修复；各 CVE 的影响版本范围不同
- status: 包含 11月安全修复；各 CVE 的影响版本范围不同
- product: PHP 8.1 及更早版本
  status: 上游已停止维护；使用持续维护的厂商修复或迁移
timeline:
- date: 2026年11月18日
  title: PHP 预告常规严重安全版本
  body: 预告指出严重攻击路径依赖非默认或罕见配置，尚未公布详细公告。
- date: 2026年11月19日
  title: PHP 发布安全版本及详细公告
  body: 8.5.13、8.4.28、8.3.37 和 8.2.36 包含修复，新发布的 8.6.0 也已包含。
- date: 2026年11月21日
  title: Google 发布已修复的 PHP 运行时镜像
  body: App Engine 与 Cloud Run 发布说明列出 8.2.36 / 8.3.37 / 8.4.28 / 8.5.13；自动交付取决于产品和更新策略，其他部署需要重新发布。
- date: 2026年11月23日
  title: Google 说明 PHP 补丁交付方式及会话漏洞
  body: GCP-2026-090 确认已修复运行时可用，并区分自动更新与重建、重新发布要求；其中列出 CVE-2026-126714 以及单独追踪的 CVE-2026-115560。
checklist:
- title: 为每个运行时部署安全版本
  hint: 安装 8.5.13 / 8.4.28 / 8.3.37 / 8.2.36 或 8.6.0，重建镜像并重启全部 PHP worker。核对实际 Web 运行时，不要只看 php -v；设备使用对应厂商更新，不要手动替换嵌入式 PHP。
- title: 修复前关闭持久后端连接
  hint: 针对 CVE-2026-129289，关闭 nginx fastcgi_keep_conn、Apache mod_proxy_fcgi enablereuse 或等效 FastCGI 复用。FPM/LSAPI 监听器只允许可信前端访问。读完输入有帮助，但错误路径使其不足以作为唯一防线。
- title: 关闭 PHP 8.5 的致命错误回溯路径
  hint: 针对 CVE-2026-129182 和 129474，通过管理配置设置 fatal_error_backtraces=0，禁止请求覆盖并重启 worker。zend.exception_ignore_args=1 也可阻断已演示的 129474 致命错误链。display_errors=0 不会阻止生成回溯。
- title: 降低时区缓存及关闭中断风险
  hint: 针对 129496，修正启动警告和弃用配置并重启 master 与 worker，或改用 syslog 等避开 PHP 文件时间戳格式化的日志目的地。针对 129481，避免会话清理回调触发致命错误；FPM 设置 pm.max_requests=1 并重启 worker 可阻断已演示的跨请求序列，但会降低性能。仅关闭上传进度或开启 OPcache 不能修复 129481。
- title: 移除 FPM worker 到 master 提权前提
  hint: 针对 129291，更新前在使用 epoll 的受影响池中关闭 catch_workers_output。非 root master 可限制后果，但不能修复 UAF。关闭 Curl 或 OPcache 只移除演示链的一部分；取得容器 master 权限本身不等于容器逃逸。
- title: 加固会话存储及归档校验
  hint: 针对 126714，关闭不需要的上传进度并限制不可信会话数据；自行存储这类数据的应用仍受文件写入中断影响，可考虑原子替换后端。针对 128090，通过可信渠道取得发布者公钥，并使 <archive>.pubkey 独立于归档替换和删除权限，或加载前使用固定可信公钥验证。phar.require_hash 本身不能认证来源。
- title: 约束 CGI 路径及运维状态输出
  hint: 针对 129538，确认路由兼容性后设置 cgi.fix_pathinfo=0，或修正并校验全部脚本/PATH_INFO 映射。针对 129292，关闭完整 HTML 状态输出，或让读取工具把全部字段视为不可信文本；仅限制运维访问并不充分。
- title: 约束出站 URL 及不可信解析
  hint: 将 HTTPS/FTPS 协议规范为小写并验证每次重定向，必要时关闭自动重定向（128064）。限制出站目的地并在出口代理设置响应头大小和数量上限（127960）。限制 SOAP 端点并只信任受控 WSDL；用正确处理编码的解析拒绝 DTD（129506），SOAP 解码前校验 arraySize，避免返回未经验证的数组（15353）。不要对不可信文档调用现代 DOM saveXml；只需 HTML 输出时 saveHtml 可避开该 XML 序列化器（129501）。构造或解析 RFC3986 URI 前，将长度限制在远低于 2 GiB 的范围（129438）。这些措施不能替代 PHP 更新。
- title: 核对 Google 托管运行时的补丁交付
  hint: App Engine standard PHP 8.2–8.5，以及启用自动基础镜像更新的 Cloud Run 服务和函数会自动接收补丁；需要立即刷新常驻实例时重新发布。撤除临时 session.upload_progress.enabled=0 设置前，先确认实际运行的 PHP 版本。
- title: 重建不会自动更新的 Google 部署
  hint: 使用已修复运行时重建并重新发布 App Engine flexible、自定义容器、Cloud Run 作业和 worker pool，以及固定补丁版本的部署；未启用自动更新的函数（包括第一代函数）需要重新发布。PHP 7.2–8.1 没有上游修复，应迁移到受支持运行时。实际工作负载修复前，保留适用的会话缓解措施。
sources:
- name: PHP 11月18日预告及 11月19日版本公告
  says: 严重路径需要非默认或罕见配置；发布日期及可用分支
- name: PHP 变更记录
  says: 各分支的 11月修复，包括 8.6.0
- name: PHP CVE-2026-129291 公告
  says: Linux epoll、开启 catch_workers_output 且已有 worker 代码执行权限时，可能控制 FPM master；只有 master 本身为 root 时才提升到 root。
- name: PHP CVE-2026-129182 公告
  says: 仅影响 PHP 8.5：关闭后期的诊断可能重建已释放的回溯；同一 worker 后续请求的早期诊断可能破坏内存。这些入口尚未演示 RCE。
- name: PHP CVE-2026-129496 公告
  says: 启动诊断经 PHP 文件错误日志写入时，可能为新 worker 的请求留下失效缓存。已演示的本地 FPM/mod_php 命令执行需要已知地址和额外条件。
- name: PHP CVE-2026-129481 公告
  says: PHP 8.3–8.5：会话清理中的致命错误可能使请求所有的文件名内存残留到同一 worker 的下一请求。已确认崩溃和 UAF，未演示 RCE。
- name: PHP CVE-2026-129474 公告
  says: PHP 8.5：可达魔术方法调用、特定时机的致命错误、启用致命错误回溯且包含参数时，可导致 worker 权限 RCE。生产 INI 排除参数可阻断已演示路径。
- name: PHP CVE-2026-129289 公告
  says: 复用后端连接，且应用打开 php://input 但未读完时，可能接收伪造 FastCGI 请求并导致 worker 权限 RCE。LSAPI 也存在流失步，但未确认 LSAPI RCE。
- name: PHP CVE-2026-129438 公告
  says: PHP 8.5 的 Uri\Rfc3986\Uri 在内存充足且输入接近 2 GiB 时可能返回无效或截断文本。parse_url 与 WhatWG URL 不受影响，未演示 RCE。
- name: PHP CVE-2026-129538 公告
  says: php-cgi 开启 cgi.fix_pathinfo=1 且服务器路径映射不一致时，可能崩溃、泄露或破坏内存。PHP-FPM/mod_php 不受影响，代码执行尚未确认。
- name: PHP CVE-2026-126714 公告
  says: files 会话处理器在写入中断后可能混合新旧数据。RCE 需要攻击者影响内容、恰当的中断时机及应用对象利用链。
- name: PHP CVE-2026-129506 公告
  says: 含 DTD 实体引用的特制 SOAP XML 可使 worker 崩溃；不可信 WSDL/模式处理也能到达错误清理路径。内存泄露与 RCE 尚未确认。
- name: PHP CVE-2026-129501 公告
  says: PHP 8.4–8.5 对攻击者控制的文档使用现代 DOM saveXml() 时，可能破坏内存并崩溃。旧 DOMDocument 不受影响，尚未演示实际应用中的 RCE。
- name: PHP CVE-2026-128064 公告
  says: 内置流封装器遇到协议中含大写 S 的 HTTPS/FTPS URL 时，可能明文发送数据，重定向也受影响。网络观察者可能取得传输的秘密。
- name: PHP CVE-2026-127960 公告
  says: 攻击者控制的服务器响应包含大量续行时，可占用通过内置 HTTP 流请求数据的 worker；仅启用 allow_url_fopen 不足以证明受影响。
- name: PHP CVE-2026-129292 公告
  says: 请求元数据可能为查看完整 HTML 状态的运维人员植入脚本。转发 Basic 认证头可开启其中一条路径；仅限制状态页访问不能阻止植入。
- name: PHP CVE-2026-15353 公告
  says: 无效 arraySize 维度可能让小段堆数据成为数组键；应用返回解码数组时才可能泄露。未确认默认分配器下的 RCE 或内存破坏。
- name: PHP CVE-2026-128090 公告
  says: 替换签名归档并将签名改为无密钥摘要，可能绕过可信旁置公钥；加载修改后的归档可执行代码，必须独立保护公钥。
- name: Google Cloud GCP-2026-090，11月23日更新
  says: 已修复运行时的可用性、各产品交付方式、不受支持版本，以及两处会话 CVE 的区别。
- name: App Engine standard PHP 11月21日发布说明
  says: PHP 运行时补丁自动交付；重新发布可刷新常驻实例。
- name: App Engine flexible PHP 11月21日发布说明
  says: 重建并重新发布后，才能撤除临时上传进度缓解措施。
- name: Cloud Run 11月21日发布说明
  says: 区分自动基础镜像更新与自定义容器、作业、worker pool 及未启用自动更新的部署。
- name: Cloud Run functions 11月21日发布说明
  says: 启用自动更新时自动交付；否则重新发布函数以取得已修复运行时。
---

这是 11月18日首次预告的 11月发布批次，并非再次报道 10月的 [PHP2Shell 事件](/zh/incidents/php2shell/)。批次还包含单独追踪的 [CVE-2026-115560 序列化不匹配](/zh/incidents/php-session-upload-progress/)，其 10月披露日期和已有 URL 均保留。此处 CVE 列表收录本批次已核实的另外 16 份公告，不重复该编号。

PHP 预告指出，严重问题依赖非默认配置或罕见部署。L3 反映运行时广泛部署、已有演示攻击路径和公开修复，并不意味着大规模入侵或在野利用。这些公告未确认受害者数量或攻击活动。各 CVE 影响分支不同，版本表列出包含该批次修复的版本，并不意味着每个旧运行时都受全部漏洞影响。

**最直接的远程路径是 CVE-2026-129289：** 前端必须复用后端连接，且应用路径打开 `php://input` 却未读完。nginx 的 `fastcgi_keep_conn on` 或 Apache 的 `enablereuse=on` 是相关配置。畸形上传可留下被 PHP-FPM 解读为另一条 FastCGI 请求的字节，其中包含攻击者提供的脚本及管理参数。演示链需要知道一个已存在脚本的路径，但不需要内存破坏利用、竞争条件或地址泄露。每次请求后关闭连接的前端可避开该已演示 FPM 路径。LSAPI 共用错误清理逻辑，但公告确认的是流失步，并非同一代码执行链。

PHP 8.5 的回溯问题需要分别评估。CVE-2026-129474 需要可达的魔术方法调用、合适的致命错误时机、启用致命错误回溯且包含参数；已演示的链还需要可用地址。仅展示 Laravel 或 Magento 使用魔术方法，并不等于演示了完整框架入侵。CVE-2026-129182 需要关闭诊断重建回溯，再由同一 worker 后续请求中的早期诊断触发；这些具体入口已演示 UAF/崩溃，未演示 RCE。这是此前失效状态处理的不完整修复。PHP 8.4 及更早版本没有该致命错误回溯全局变量。

CVE-2026-129481 是 PHP 8.3–8.5 会话关闭阶段的另一处失效状态不完整修复。清理回调中的致命错误可能让请求所有的脚本文件名残留到同一 worker 的下一请求，不需要上传进度。尚未演示通过该字段执行代码。PHP 8.2 没有该字段。CVE-2026-129496 则要求合适的启动诊断确实写入 PHP 文件错误日志，且新 worker 出现早期请求诊断。仅有 FPM 自身日志不满足前提。已在本地通过已知地址及额外条件演示原生命令执行，但未演示完整独立的远程 ASLR 绕过。

**worker 代码执行不等于 root 代码执行。** CVE-2026-129291 需要 Linux epoll FPM worker 中已有本地代码执行、开启 `catch_workers_output`，并能控制进程生命周期和继承描述符。master 通常为 root，受影响的官方 PHP-FPM Docker 配置也如此；非 root master 会限制最终权限。这本身不等于容器逃逸。这类配置之外的上游默认值关闭输出捕获。

其余公告涉及会话文件写入中断、签名 Phar 降级、CGI 路径修正、现代 DOM 和 SOAP 解析、状态页注入、出站 TLS 协议处理以及超大 URI/HTTP 头处理。前提和临时措施见上文。特别是 PHP-FPM 和 mod_php 不受 CGI PATH_INFO 问题影响，旧 DOMDocument 不受现代 DOM 序列化问题影响。不能仅凭安装某扩展就断言全部应用均可被远程利用。

可用性应以 PHP 当前发布说明及各公告为准。部分公告仍写着“可用时升级”，而 11月19日版本公告已经确认发布。10月的 PHP2Shell 版本仍是原 CVE 的历史修复版本，但不能覆盖这次公布的不完整修复路径。

Google 的 11月23日更新同时涉及本次 11月会话文件漏洞与单独追踪的 10月序列化不匹配问题，不会合并两者的事件身份，也未确认在野利用。托管运行时补丁已经可用，不代表固定版本、自定义或仍在常驻的部署已经运行修复。关闭上传进度可阻断 CVE-2026-126714 的主要上传进度路径，但自行把攻击者可控数据写入文件会话的应用，仍需补丁或合适的会话后端。
