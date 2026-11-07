---
title: 未使用 PAM 的 musl Linux OpenSSH 可接受超长密码，绕过纯密钥账户登录
summary: Alpine 确认可经网络访问、使用 musl 且未用 PAM 的 sshd 存在密码绕过，需启用密码认证，目标账户密码字段为 '*'，另有账户带 $5$/$6$ 哈希。OpenSSH 10.6p2 及 Alpine 回补可阻断；更新或禁用密码认证后必须重启 sshd。
splash: 网络可达的 musl Linux sshd，未用 PAM、启用密码登录，目标为 '*' 账户且另有本地 $5$/$6$ 哈希
wipe: 安装对应 Alpine 分支的修复 OpenSSH 包并重启 sshd；否则禁用 PasswordAuthentication 并验证实际配置。
inTheWildNote: 厂商确认可稳定绕过；已读通知未确立在野攻击。
cves:
  - name: musl 密码哈希错误标记绕过
    description: CNA 确认相同的有条件密码绕过，并未将影响扩大至 glibc 或启用 PAM 的构建。
fixed:
  - product: Portable OpenSSH 上游缓解版本
  - product: Alpine edge openssh
  - product: Alpine 3.24 openssh
  - product: Alpine 3.23 openssh
  - product: Alpine 3.22 openssh
  - { product: Alpine 3.21 openssh, status: 已结束支持；特殊安全修复 }
  - { product: Alpine 3.20 openssh, status: 已结束支持；特殊安全修复 }
  - { product: Alpine 3.19 openssh, status: 已结束支持；特殊安全修复 }
  - { product: Alpine 3.18 openssh, status: 已结束支持；特殊安全修复 }
  - { product: Alpine 3.17 openssh, status: 已结束支持；特殊安全修复 }
  - { product: Alpine 3.16 openssh, status: 已结束支持；特殊安全修复 }
timeline:
  - date: 2026年11月5日
    title: OpenSSH 发布 10.6p2，Alpine 公布各分支回补
    body: 缓解措施阻止通过 sshd 绕过密码认证；Alpine 列出精确账户前提、云镜像暴露、包版本及强制重启要求。已读 Alpine 通知尚未分配 CVE。
  - date: 2026年11月5日
    title: CNA 为同一绕过分配 CVE-2026-123158
    body: 已发布记录标识 musl／无 PAM 漏洞；Alpine 较早文字仍注明撰写时未分配编号。Red Hat 确认其 glibc／PAM 产品构建不受影响。
checklist:
  - title: 更新服务端包并重启运行中的守护进程
    hint: Alpine 使用 apk upgrade -U -a，以 apk info -v openssh-server 或 openssh-server-pam 对照上方对应分支版本，然后执行 rc-service sshd restart。仅安装包仍会保留旧进程。重建受影响镜像，替换或更新运行中的实例；新修复镜像不会自动修补现有 VM。3.21 及更早的特殊修复不代表恢复全面支持。
  - title: 无法立即修补时禁用密码登录
    hint: 先测试密钥登录并保留当前会话。备份 sshd 配置，在实际生效配置及适用的 Match 块中设置 PasswordAuthentication no，执行 sshd -t 并重启 sshd。核对 sshd -T 及代表性用户、来源的 Match 上下文，再测试新的密钥登录。Alpine 3.19+ 默认读取 sshd_config.d，旧版本可能忽略附加文件，不能只依赖该文件。验证期间继续限制 SSH 访问。
  - title: 核对所有账户及云镜像前提
    hint: 在本机检查账户密码字段类型，不公开哈希。易受攻击目标为 '*'，且另有本地账户带 $5$ 或 $6$ 哈希。按公告提醒，纳入经 musl-nscd（nslcd、winbind 或 sssd）解析、没有 shadow 条目的目录服务用户。openssh-server-pam 配合 UsePAM no 仍受影响。默认 PermitRootLogin prohibit-password 保护 root，但不保护其他获准的纯密钥用户。Tiny-cloud 3.18.11–3.24.3 镜像在加入此类哈希后可能暴露，其 alpine 用户可免密码使用 doas。公告排除不运行 sshd 的容器、实际 PasswordAuthentication no，以及 UsePAM yes 的 PAM 部署。
  - title: 保留认证证据并调查异常登录
    hint: 在 /var/log/messages 查找为无密码账户记录的 sshd Accepted password。保留日志，检查 doas 使用、新用户、文件及 authorized_keys 更改。日志匹配须结合上下文，未发现不证明安全。若不能排除未授权登录，隔离并按主机失陷处置；修补不会清除既有访问。
sources:
  - name: Alpine 原始密码认证绕过公告
    says: 列出精确前提、257–1024 字节输入、全部十个分支包版本、云镜像条件、重启及调查指引；发布时未分配 CVE。
  - name: OpenSSH 官方 10.6p2 发版说明
    says: 11 月 5 日版本缓解禁用 PAM 的 musl Linux 密码绕过；认为根因在 sshd 之外，但可通过 sshd 利用。
  - name: CVE-2026-123158 的 MITRE CNA 记录
    says: 11 月 5 日发布；CVSS 3.1 为 8.1，限未用 PAM 的 Linux musl，上游 10.6p2 之前缺少缓解措施。
  - name: Red Hat 产品适用性评估
    says: Red Hat 构建使用 glibc 和 PAM；列出的产品不受影响。
---

Alpine 描述，超长密码使 musl 的 crypt() 返回错误标记，sshd 将其与账户保存的 '*' 字段比较而产生错误。可经网络访问服务、知道用户名的攻击者，在启用密码认证、未使用 PAM 且另有本地账户提供 $5$ 或 $6$ 密码哈希时，可用 257–1024 字节密码登录。这不代表所有 OpenSSH 或 Alpine 均遭入侵。以 '!' 锁定的账户不受此路径影响；直接以密码登录 root 仍需 PermitRootLogin yes，但其他受影响账户可能通过自身权限提权至 root。

Alpine 列出 3.16–3.24 及 edge 受影响。其 tiny-cloud 镜像初始安全，但管理员加入符合条件的密码哈希后可能暴露，预设 alpine 账户可免密码使用 doas。经 cloud-init 禁用密码认证的镜像和未运行 sshd 的容器不属于该路径。上游 10.6p2 属于缓解措施，Alpine 稳定分支保留较旧上游号、以包修订号回补。本文不提供用于这些发行版特有版本的检查器。通知确立漏洞及处置要求，未确立实际利用或受害数量。

**编号跟进：** 现已核对 CNA，将本漏洞关联至 **CVE-2026-123158**。其简述写 256–1024 个字符；Alpine 详细解释要求超过 256 字节，明确为 **257–1024 字节**，上文保留该范围。编号不改变账户前提、修复包修订号或重启要求。Red Hat 的不受影响结论适用于其产品构建，不代表所有 Linux 安装。
