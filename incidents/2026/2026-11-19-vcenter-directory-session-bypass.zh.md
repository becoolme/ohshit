---
title: VMware vCenter 认证绕过漏洞在 11 月修复前已遭利用
summary: Mandiant 发现攻击者在 9 月利用 CVE-2026-123890 获取 vCenter 管理员会话并窃取签名密钥。Broadcom 的 11 月公告修复了该漏洞及另外四个 SDDC Manager／Windows Tools 漏洞。打补丁不会清除已窃取的凭据或持久化入口。
splash: 管理网络可达的未修复 vCenter；SDDC Manager 和 Windows Tools 漏洞各有独立前提
wipe: 将 vCenter 升至 9.1.1.0200、9.0.2.0200 或 8.0 U3m，排查历史访问，并按完整产品矩阵修复。
inTheWildNote: Mandiant 报告了 9 月上旬使用 BONESAW 利用该漏洞的取证证据。
cves:
  - name: vCenter Directory Service 认证绕过
    description: 能访问存在漏洞的 vCenter 服务即可在未认证状态下泄露会话密钥并获取管理员会话。GTIG 观察到利用通过 DCE/RPC TCP 2012 进行。
  - name: SDDC Manager SQL 注入
    description: 已认证攻击者可通过特制 SQL 对数据库进行未授权读写。
  - name: SDDC Manager 认证后命令注入
    description: 已认证攻击者可在设备上执行任意命令。
  - name: SDDC Manager 本地提权
    description: 在 SDDC Manager 上具有管理员权限的攻击者可提升至 root。
  - name: Windows VMware Tools SAML 签名绕过
    description: 攻击者须能访问配置了 Guest Alias 映射的 Windows 客体内的本地特权进程，可在该客体内提权，并非虚拟机逃逸。
fixed:
  - status: 厂商列出的修复构建
  - status: 厂商列出的修复构建
  - product: vCenter 8.0／VCF 5.x 的 vCenter 组件
    status: VCF 5.x 必须采用异步补丁流程
  - status: 扩展支持客户须联系 Broadcom；未列出公开修复构建
  - status: 推荐的累积构建；9.1.1.0 已包含三个 SDDC 修复
  - status: 厂商列出的修复构建
  - status: 厂商列出的修复版本
  - status: 厂商列出的修复构建
  - status: 包含适用于 32 位 Windows 的已修复 12.4.10
timeline:
  - date: 2026年11月19日
    title: Broadcom 发布 VMSA-2026-0009，GTIG 披露在野利用
    body: 包含五个漏洞的公告提供修复。GTIG 原文日期为 11 月 19 日，描述了 9 月上旬的取证证据；在野利用判断不依赖 PoC 或编译时间戳。
  - date: 2026年11月20日
    title: Broadcom 修订公告
    body: 0009.1 修订版将 vCenter 7.0 列为受影响版本，要求扩展支持客户联系支持团队。当前 FAQ 还提示升级兼容性及 Windows Guest Alias 前提。
checklist:
  - title: 按支持的升级路径修复各组件
    hint: 阅读 VMSA-2026-0009.1，在 vCenter 的 Summary 页或 PowerCLI DefaultVIServer.Version/Build 中核对版本。应用 9.1.1.0200、9.0.2.0200 或 8.0 U3m；VCF 5.x 按 KB 88287 操作并将 SDDC Manager 升至 5.2.5。Telco 部署按 KB 463116 处理；vCenter 7.0 扩展支持客户须联系 Broadcom。这些 vCenter 更新不支持 Quick Patch。正在升级的环境应先核对互操作兼容性和 Back-in-Time 限制；集成设备须遵循其厂商验证过的指导。
  - title: 单独更新 SDDC Manager 和 Windows 客体内的 Tools
    hint: SDDC Manager 目标为 9.1.1.0200、9.0.2.0100 和 5.2.5；9.1.1.0 已包含三个 SDDC 修复。Windows Tools 使用 13.1.5.0 或 12.5.5，后者包含用于 32 位 Windows 的 12.4.10。在各 VM 的 Summary 页盘点 Tools，并以客体管理员身份运行 VGAuthCLI.exe list 检查别名。禁用 guest operations、停止或卸载 Tools 都不是厂商认可的替代修复，应安装补丁。无需升级虚拟机硬件版本。
  - title: 保全证据并排查整条入侵路径
    hint: GTIG 发布了 11 个疑似混淆网络 IP：103.147.251.5、103.190.38.3、118.174.128.34、118.174.128.36、118.174.128.38、176.9.89.66、185.71.15.109、220.121.128.41、222.108.77.44、61.216.56.127 和 81.45.89.43，以及六个文件指标 ActiveSer.jsp、u.jsp、/tmp/123、/tmp/sss、/tmp/dbr 和 /usr/bin/vmtoolscs。处置前保全设备、SSO、VAMI、ESXi 和网络日志。使用报告完整 IOC 表及六条 YARA 规则，覆盖其他暂存和输出痕迹；检查 /tmp/123.rar、/tmp/rar、/tmp/gdb_file、/tmp/123.key、/tmp/rsa_host_key、/tmp/ecdsa_host_key、/tmp/dss_host_key、/bin/env 的 SUID 改动、extracted_tenant_signer_* 输出、idp_key.pem、trusted_cert_2.pem、domain.txt、vmfs-pydist.tar.gz、vmfs_browser.py、隐藏的 VMFS .a 暂存目录和 o.tar.gz。排查 sps-*@vsphere.local 账户、PUT /rest/appliance/access/ssh、root authorized_keys 改动、TCP 53/33992 上的 SSH-2.0-pulsesecure_23345 监听，以及异常 Slack API C2。Slack 是共享基础设施，不应当作攻击者专有域名整体封禁。命中只是线索，不足以证明失陷；未命中也不能证明安全。
  - title: 将签名密钥窃取及下游访问纳入事件响应
    hint: 发现可疑访问后，联合响应团队及 Broadcom Support 确定 vmdir 数据库和 STS/SAML 签名密钥窃取、异常 SSO 账户、vCenter 主密钥／数据库凭据窃取、ESXi root 密钥，以及客体 NTDS/SYSTEM/SECURITY 数据访问的范围。保全证据、隔离受影响系统，并按确认范围协调可信重建及凭据／密钥更换。打补丁或只改一个管理员密码不会使所有已窃取签名密钥失效，也不会清除持久化入口。
  - title: 限制管理面访问并将日志发送到设备之外
    hint: 仅允许必要管理来源和端口，包括 TCP 2012、443、5480 和 22；采用外部网络隔离和出站控制，不要只依赖 VAMI GUI 防火墙。审阅 GTIG 的 VCSA Hardening & Logging Tool 和 Defender's Guide，经正式变更及测试后应用规则，保留 vCenter/ESX 合法依赖，并将被拒连接和 shell 活动转发到远端 SIEM。Broadcom 未列出替代修复；这些控制只能补充补丁。
sources:
  - says: 11 月 19 日首次发布，11 月 20 日更新；列出五个 CVE、各产品利用前提、累积修复矩阵，未提供替代修复。
  - name: Broadcom VMSA-2026-0009 FAQ
    says: 与 7 月 CVE-2026-59309 是不同问题；解释扩展支持、Tools 前提、异步补丁、Quick Patch 及 Back-in-Time 升级限制。
  - name: GTIG 与 Mandiant — ARMORY CASTLE Exploits vSphere
    says: 11 月 19 日的原始事件响应分析确认 9 月利用，描述 BONESAW 和横向移动，并发布排查指标及加固建议。
  - name: Broadcom Telco Cloud 修复指导
    says: 列出的 TCP/TCI 版本使用 vCenter 8.0 U3m；未列出或处于扩展支持的部署须联系支持团队。
---

CVE-2026-123890 允许能访问 vCenter 易受攻击的 Directory Service 的未认证攻击者获取管理员会话。GTIG 描述了 TCP 2012 上 SRP DCE/RPC 接口的会话密钥泄露。该会话可通过 Directory Service RPC 接口执行命令和获取文件。漏洞不要求启用 Enhanced Linked Mode。

Mandiant 发现 BONESAW 在 9 月上旬已被用于攻击一台安装了 7 月 CVE-2026-59309 修复的 vCenter。这是两个不同漏洞。工具中记录的 7 月构建时间不能证明攻击发生于 7 月，因为构建元数据可以修改。GTIG 原文日期为 11 月 19 日，部分后续媒体则将其写作 11 月 20 日。

在调查的入侵中，攻击者先攻破 BeyondTrust，再经内部 Linux 设备进入 vCenter。BONESAW 窃取目录数据库和 STS 签名材料并建立 SSO 管理员访问。SAWSNAKE 用签名材料伪造 SAML 认证；后续活动进入 ESXi 主机，从客体磁盘提取数据，包括 Active Directory 数据库和注册表材料。这条已观察到的攻击链不意味着利用 vCenter 漏洞必须先获得 BeyondTrust 访问。GTIG 将行动归因于疑似与中国有关的 ARMORY CASTLE，该组织此前称为 UNC5221；报告未给出受害者数量。L4 反映虚拟化控制平面已遭真实利用，不代表已证实互联网范围的大规模失陷。

同一 Broadcom 公告还覆盖三个独立的 SDDC Manager 漏洞和一个 Windows Tools 漏洞。SDDC 漏洞需要认证，本地提权还要求管理员权限。Tools 漏洞要求访问本地特权进程并配置 Guest Alias 映射，提权范围限于 Windows VM。Broadcom 没有将这些漏洞或 vCenter 漏洞描述为从客体逃逸到宿主机。ESX 本身不受本公告影响，但调查中的攻击者在控制管理面后进入了主机。GTIG 的调查未证实另外四个 CVE 已遭利用。

应使用上表中的精确产品构建，不宜套用通用三段版本检查器。9.1 分支的 SDDC SQL／命令注入修复最早在 9.1.0.0 提供，本地提权修复在 9.1.1.0 提供；当前推荐累积构建为 9.1.1.0200。这不意味着 vCenter 9.1.1.0 修复了其独立的认证绕过。Broadcom 未列出公开 vCenter 7.0 修复构建，要求扩展支持客户申请支持；更旧的停止维护版本应假定受影响，不能因矩阵未列出就视为安全。

安排补丁时仍须保持紧迫性：FAQ 表示，vCenter 8.0 U3m 和 9.0.2.0200 会因 Back-in-Time 限制阻止升级到 VCF 9.1.1，预计在 9.1.2 恢复兼容。通过 Broadcom 和互操作矩阵核对支持的顺序。更新期间管理界面会不可用，运行中的工作负载继续运行；vCenter 离线时部分新增加密／密钥轮换操作不可用。补丁关闭入口，但先前窃取的签名密钥、凭据或客体数据仍需单独隔离和恢复处置。
