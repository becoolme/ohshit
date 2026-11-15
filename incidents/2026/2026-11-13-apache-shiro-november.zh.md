---
title: Apache Shiro 披露 LDAP 登录与授权绕过漏洞
summary: Apache 披露 8 个 Shiro 漏洞。启用 LDAP 身份验证缓存后，攻击者只要知道此前成功登录的用户名，就可用任意密码登录。其他漏洞涉及授权注解、会话处理及可选集成。请升级至 3.0.2 或更新版本。
splash: 启用了 LDAP 身份验证缓存、使用受影响授权注解或符合下列其他配置条件的 Shiro 应用。
wipe: 将 Shiro 模块一并升级至 3.0.2 或更新版本。升级前关闭 LDAP 身份验证缓存，并在实现方法上显式声明授权。
cves:
  - name: LDAP 身份验证缓存绕过
    description: Shiro 3.0.0 及更早版本中，若 DefaultLdapRealm 或 JndiLdapRealm 启用了身份验证缓存并使用宽松的默认匹配器，知道已缓存用户名的攻击者可用任意密码登录。
  - name: 授权注解被跳过
    description: 3.0.1 及更早版本的 Guice、AspectJ、CDI 和 Jakarta EE 集成可能跳过接口注解。Guice 或 AspectJ 也可能跳过类和父类注解。受影响的 CDI 和 Jakarta EE 模块最早为 2.0.0-alpha-0。
  - name: 过滤器区分路径大小写
    description: 在 3.0.1 中，手动创建的 ShiroFilterFactoryBean 可能漏掉不区分大小写的文件系统上的受保护静态路径。由 Shiro Spring starter 创建的 bean 不在此范围内。
  - name: 空密码匹配空凭据
    description: 在 3.0.1 及更早版本中，对于存储凭据为空的账户，DefaultPasswordService 和 SimpleCredentialsMatcher 可能接受空密码。
  - name: 身份主体标签输出未转义
    description: 在 3.0.1 及更早版本中，若应用对不可信的身份主体值使用 Jakarta Pages 或 Jakarta Faces 的 principal 标签，页面可能执行脚本。受影响的 Jakarta Faces 模块最早为 2.0.0-alpha-0。
  - name: 文件型身份域保留旧权限
    description: 在 3.0.1 及更早版本中，重新加载基于文件的 PropertiesRealm 时，已删除用户和旧权限可能依然有效。
  - name: 表单重放存在风险
    description: 从 2.0.0-alpha-0 到 3.0.1，启用了表单保存（默认开启）的 Jakarta EE 集成可能削弱 Cookie 的安全属性，或把重放的表单数据和 Cookie 发送给不可信主机。
  - name: 记住登录功能导致会话固定
    description: 在 3.0.0 及更早版本中，恢复记住的用户时可能保留原会话 ID，并在关闭 URL 重写时仍接受 URL 中的会话 ID。前提是启用了记住登录功能。
fixed:
  - status: 修复本批披露的全部 8 个漏洞
  - product: Apache Shiro 1.x 和 2.x
    status: 上游已由新分支替代
timeline:
  - date: 2026年11月8日
    title: Apache 宣布发布 Shiro 3.0.2
  - date: 11月13日 23:28 UTC
    title: 首份公告披露静态路径过滤问题
  - date: 2026年11月14日
    title: 邮件列表随后发布其余 7 份公告
checklist:
  - title: 立即关闭有风险的 LDAP 缓存
    hint: 在 Shiro 配置中查找 DefaultLdapRealm 和 JndiLdapRealm。将 authenticationCachingEnabled 设为 false，并清除旧的身份验证缓存。如果必须保留缓存，请使用 SimpleCredentialsMatcher 等能校验缓存凭据的匹配器，并测试成功登录一次后，错误密码是否仍被拒绝。
  - title: 升级并测试受保护的路由和方法
    hint: 用 Maven 或 Gradle 盘点运行时依赖，将 Shiro 模块统一升级至 3.0.2 或更新版本。用无权限账户验证授权。升级前可将授权注解直接加在实现方法上。如果应用自行创建 ShiroFilterFactoryBean，且静态文件位于不区分大小写的文件系统上，升级前调用 setCaseInsensitive(true)，并用不同大小写访问受保护的路径。
  - title: 核查会话和账户变更
    hint: 验证恢复记住的用户时会话 ID 是否更换。检查删除用户或收紧权限是否生效、空凭据是否被拒绝，以及保存的表单是否仅向预期主机重放。升级前，拒绝空密码，在渲染前校验不可信的身份主体值，并在更改文件型 PropertiesRealm 的访问权限后重启应用。通过 org.apache.shiro.form-resubmit-host 和 org.apache.shiro.form-resubmit-port 系统属性限制表单重放目标。发现异常登录时，保留应用、代理及 LDAP 日志，并使相关会话失效。
sources:
  - name: Apache Shiro 安全报告
    says: 列出 8 个漏洞的配置前提、受影响版本和修复。
  - name: Apache Shiro 发布消息
    says: 标明 3.0.2 的发布公告日期。
  - name: Apache 维护者在 oss-security 发布的 LDAP 公告
    says: 列出缓存登录的前提、CVSS 4.0 评分及临时措施。
  - name: 11 月 14 日 oss-security 归档
    says: 链接全部 8 份公告。首封邮件的 UTC 邮件头日期为 11 月 13 日。
---

CVE-2026-129349 要求应用开启 LDAP 身份验证缓存，且目标用户此前成功登录过。随后命中缓存时会跳过 LDAP 绑定，受影响身份域的默认匹配器会直接接受提交的密码。Apache 给出的 CVSS 4.0 评分为 9.1。公告未报告在野攻击。

Shiro 3.0.1 首次修复 LDAP 和记住登录漏洞，其余 6 项需要 3.0.2。Apache 开源项目只为最新发行分支提供全部安全修复，仍在使用 1.x 或 2.x 的应用需要安排迁移。Shiro 是广泛使用的身份验证库，严重绕过需要特定配置和缓存登录，本批漏洞定为 L3。
