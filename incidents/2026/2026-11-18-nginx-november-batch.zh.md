---
title: nginx 十一月批次修复 HTTP/2 代码执行路径等十项漏洞
summary: nginx 1.30.7 和 1.31.9 修复新的十项 CVE。五项内存安全漏洞可在特定 HTTP/2、HTTP/3、解析器或邮件配置下导致 worker 权限代码执行。研究人员已展示利用，但 CERT-EU 尚未报告真实攻击。Plus 需要对应维护线的厂商修复。
splash: 未修补且启用了 HTTP/2、HTTP/3、解析子请求、邮件代理或所列 TLS/stream 配置的 nginx/NGINX Plus。
wipe: 开源版升级至 1.30.7/1.31.9 或已确认的发行版回补；Plus 使用对应修复，并替换运行中的二进制及旧 worker。
inTheWildNote: 研究人员已展示代码执行；CERT-EU 尚未报告在野利用。
cves:
  - name: HTTP/2 流控内存破坏
    description: 须启用 HTTP/2。特制流控流量可破坏堆内存；nginx.org 列出 1.9.5–1.31.8。F5 称代码执行要求关闭或绕过 ASLR；Wiz 展示了绕过，包括静态文件服务器。
  - name: HTTP/2 连接回收后使用
    description: HTTP/2 反向代理在 worker_connections 紧张时，可能释放上游请求仍使用的连接。nginx.org 列出 1.19.7–1.31.8。
  - name: HTTP/3 连接回收后使用
    description: QUIC/HTTP/3 上游处理及连接资源紧张时可触发释放后使用。nginx.org 列出 1.25.0–1.31.8；F5 还注明依赖攻击者无法控制的条件。
  - name: DNS 解析子请求释放后使用
    description: 代理主机名包含变量，且 SSI 或 mirror 子请求并发解析同一名称时可触发。nginx.org 列出 0.6.18–1.31.8；研究人员测试的较窄 mirror 路径始于 1.13.4。
  - name: 邮件代理释放后使用
    description: 邮件代理认证可在无有效凭据时触发释放后使用。Xint 测试配置为 proxy on 配合 auth_http。nginx.org 列出 0.5.33–1.31.8；Xint 将其路径追溯至 0.5.15。
  - name: TLS 1.3 请求体死循环
    description: 启用 TLS 1.3 的 SSL HTTP 监听器可在读取请求体时使 worker 陷入循环。nginx.org 列出 1.13.0–1.31.8；F5 的开源版评估范围较窄。
  - name: PROXY v2 配合动态证书导致 worker 崩溃
    description: 要求 stream 动态加载证书及 PROXY protocol v2，在简化 TLS 握手期间触发。nginx.org 列出 1.31.4–1.31.8；F5 还将 1.30.6 至 1.30.7 之前列为受影响。
  - name: alias/try_files 捕获变量缓冲区溢出
    description: alias、try_files、map 变量及正则捕获的特定组合可使 worker 崩溃。nginx.org 列出 0.9.6–1.31.8。
  - name: Stream 客户端证书验证绕过
    description: 非默认 stream 虚拟服务器要求 ssl_verify_client on 时，同步握手可能套用默认服务器的验证决定。nginx.org 列出 1.25.5–1.31.8。
  - name: ssl_preread 路由策略绕过
    description: 畸形 ClientHello 可伪造预读变量，在路由信任这些值时进入非预期后端。nginx.org 列出 1.15.2–1.31.8。
fixed:
  - product: nginx 稳定版 1.30.x
    status: 上游稳定版发行
  - product: nginx 主线版 1.31.x
    status: 上游主线版发行
  - product: NGINX Plus 37.0 维护线
    status: 整批目标；37.0.7.1 只修复部分问题
  - product: NGINX Plus 37.1+ 维护线
    status: 整批目标；37.2.0.1 只修复部分问题
  - product: 较旧上游分支及 Plus R33–R36
    status: 此处未确认完整修复版本；迁移或核实受支持的厂商回补
timeline:
  - date: 2026年10月21日
    title: Wiz 私下报告 HTTP/2 释放后使用漏洞
    body: 这是协调披露节点，不是公开披露日期。
  - date: 2026年11月18日
    title: 公开披露并发布开源版修复
    body: nginx 发布 1.30.7 和 1.31.9；F5 CNA 记录及研究报告说明新批次问题。
  - date: 2026年11月18日
    title: CERT-EU 要求优先修补
    body: 研究人员的演示不能证明已发生真实攻击。
checklist:
  - title: 盘点实际二进制、软件包及配置
    hint: 使用 nginx -v、nginx -V 和 nginx -T 查看版本、模块及生效监听器和配置。发行版回补可能保留旧上游版本号，应将完整软件包版本与发行版公告核对。也要盘点代理、设备及容器副本，不要只凭镜像标签判定已修复。Plus 和发行版版本需要按厂商规则判断，因此不提供交互式版本检查器。
  - title: 安装所在维护线的完整修复
    hint: 开源稳定版为 1.30.7，主线版为 1.31.9。所列 Plus 维护线在核实厂商产品及分支后，以 37.0.8.1 或 37.3.0.1 为目标。Plus 37.0.7.1 和 37.2.0.1 已修复 123633、123640，但仍留下其他批次漏洞；TLS 死循环记录另列 37.2.1.1。较旧或停止支持的产品需要厂商指引。按软件包重启或受支持的二进制升级流程操作，确认没有易受攻击的 master/worker 遗留。仅安装新文件或重载配置不会替换旧可执行文件。
  - title: 临时关闭每个外部共享监听器的 HTTP/2
    hint: 1.25.1 及以后在相关 server 中设置 http2 off，并移除旧式 listen 的 http2 参数；较旧版本需移除 listen 参数。运行 nginx -t、重载，确认不再协商 HTTP/2，同时核实 HTTPS 正常。连接失败不能证明缓解生效。原生 gRPC 等仅支持 HTTP/2 的客户端可能中断。关闭或重启残留旧 worker，已有连接仍使用旧配置。这只覆盖 123007、123633。
  - title: 覆盖另外三条内存安全路径
    hint: 121810：移除受影响 QUIC 监听器、设置 http3 off、清除 Alt-Svc 广告并确认相关 UDP 监听器已停止。123634：避开含变量的代理主机名及 SSI/mirror 子请求，使用固定 upstream 组去除已测试的请求期 DNS 路径；仅设置 mirror_request_body on 不是修复，仅禁用 mirror 会漏掉 SSI。113425：修补期间将所有邮件代理监听器限制在可信网络或回环地址；攻击不要求有效邮件凭据。验证、重载并结束旧会话及 worker，提前安排服务中断。
  - title: 同时复查 TLS、stream 和捕获变量问题
    hint: 120967：在共享套接字的默认服务器要求客户端证书，或让受保护 stream 服务器使用独立地址及端口。123640：将依赖 ssl_preread 的信任和路由改为终止 TLS、配置证书及基于 ssl_server_name 路由，按需保留后端 TLS 设置。125283：改用命名捕获且不要跨正则复用。120993：关闭 PROXYv2、改用 v1，或同时关闭会话票据和缓存；F5 将 BoringSSL/AWS-LC 构建排除在此漏洞之外。118899 未列临时方案，应优先修补对应 TLS 1.3 监听器。每个方案只针对对应 CVE，不能保护整个批次。
  - title: 结合日志及进程执行判断是否遭入侵
    hint: 查看配置中的错误日志（常见位置 /var/log/nginx/error.log），排查 worker 退出、signal 11、segfault 及 core dump。结合持续高入站低出站连接、重复 TLS 连接、接收字节远超已记录请求长度等迹象。Xint 提供可选 h2_hunt 格式及 /var/log/nginx/h2-hunt.log；现在添加无法还原旧流量。按 worker UID 和父 PID 复查 auditd 的 execve/execveat，寻找异常 /bin/sh、/bin/bash 等程序；同 UID 的应用及崩溃也可能正常。命中本身不能证明入侵，新启用日志没有记录也不能排除更早活动。
sources:
  - name: nginx.org 安全公告
    says: 列出十一月十项漏洞、上游范围及修复版本。
  - name: nginx 主线版发行说明
    says: 11月18日的 1.31.9 列出全部十项修复。
  - name: nginx 稳定版发行说明
    says: 11月18日的 1.30.7 列出九项修复；CNA 对稳定版 PROXYv2 范围有不同描述。
  - name: nginx 下载页面
    says: 列出已发布的主线版 1.31.9 及稳定版 1.30.7。
  - name: Wiz 原始 HTTP/2 研究
    says: 展示绕过 ASLR 的代码执行、HTTP/2 前提、Plus 不同修复及缓解和重载核查。
  - name: Xint 原始 nginx2root 研究
    says: 说明五条独立 nginx 路径、测试配置范围、暴露检查及缓解；主机 root 演示还依赖独立 Linux 内核漏洞。
  - name: CERT-EU 2026-022 公告
    says: 说明五项可导致代码执行的问题，尚未报告在野利用，建议优先处理外部部署。
  - name: nginx 进程控制文档
    says: 区分配置重载与可执行文件升级，并解释残留旧 worker。
  - name: F5 编写的 CVE-2026-123007 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-123633 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-121810 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-123634 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-113425 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-118899 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-120993 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-125283 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-120967 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
  - name: F5 编写的 CVE-2026-123640 记录
    says: 厂商编写的前提、评估版本范围、CVSS 3.1/4.0 及临时方案；停止技术支持的版本不在评估范围。
---

这是 11月18日的新批次，与[十月 nginx 发行](/zh/incidents/nginx-oct-2026/)不同。展示的分数均采用 F5 的 CVSS 3.1；其五项内存安全记录在 CVSS 4.0 下还评为 9.2。nginx.org 使用 major 或 medium 等级，不能混作同一种评分。因软件部署广泛、研究人员已展示利用，但尚未报告真实攻击，定为 L3。nginx 漏洞以 worker 权限执行代码，不会自动获得主机 root；Xint 的 root 及容器逃逸演示还串联了独立的 Linux SCTP 漏洞。

应保留来源边界。F5 称代码执行要求关闭或绕过 ASLR；Wiz 已展示绕过，因此开启 ASLR 不能单独作为缓解。解析器及邮件漏洞的上游历史起始版本与 Xint 测试路径不同，不能把较窄测试范围当成安全版本清单。F5 的 121810 记录写有格式异常的 1.25.09 下界，nginx.org 和研究人员给出 1.25.0。120993 的 CNA 还将稳定版 1.30.6 列为受影响，而上游公告只列主线，稳定版发行说明也未列此项；应升级，不要断言稳定版不受影响。这些来源未确立受害者数量或攻击活动专属的恶意网络指标。
