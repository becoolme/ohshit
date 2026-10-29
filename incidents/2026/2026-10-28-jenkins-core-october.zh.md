---
title: Jenkins 修复 15 个核心漏洞，涉及控制器 RCE 和管理员账户接管
summary: Jenkins 在每周版 2.588 和 LTS 2.580.2 中修复 15 个核心漏洞。多条路径可在控制器上执行代码，其他漏洞影响账户、会话和页面渲染。多数需要特定权限或控制 Agent；其中一个针对首次初始化窗口。在野利用尚未确认。
splash: 每周版 ≤2.587 或 LTS ≤2.580.1；各漏洞所需权限或 Agent 控制条件不同，初始化竞态无需认证
wipe: 将控制器升级到每周版 2.588 或 LTS 2.580.2；修复前限制不可信用户和 Agent
inTheWildNote: Jenkins 公告未报告在野利用。
cves:
- name: XStream 类型过滤绕过
  description: 具有 Overall/Read，且拥有非匿名账户或 config.xml POST 权限的攻击者，可在反序列化时引入未经过滤的 resolves-to 类型，可能执行代码。
- name: 集合类型混淆
  description: 具有 Item/Configure 的攻击者可通过恶意任务 XML 插入非预期的集合元素，造成存储型 XSS；还可能存在其他影响。
- name: Agent 启动审批绕过
  description: 旧启动命令迁移到 Command Agent Launcher Plugin 时未检查管理员批准，具有 Agent/Configure 的攻击者可在控制器 JVM 中执行代码。
- name: 重命名时跟随符号链接
  description: 具有 Item/Create 和 Item/Configure 的攻击者，可利用重命名任务时的目录复制和符号链接读取控制器文件，进而可能执行代码。
- name: Agent 配置路径遍历
  description: 具有 Overall/Read 的攻击者可将控制器上的 config.xml 作为 Agent 配置加载，保存该 Agent 时可覆盖另一个 config.xml，可能执行代码。
- name: 制品解包竞态
  description: 具有 Item/Configure 的攻击者可通过并发归档制品绕过符号链接检查，向控制器解包目录之外写入文件，可能执行代码。
- name: 首次管理员创建竞态
  description: 在初始化向导删除初始用户、尚未创建替代用户的短暂窗口中，未认证攻击者可抢先创建管理员账户。
- name: 通过 Cookie 绕过 API 令牌吊销
  description: 被盗 API 令牌可换取持久的“保持登录” Cookie；令牌吊销或过期后，该 Cookie 仍可用于访问。
- name: 旧数据提示导致账户覆盖
  description: 具有 Overall/Read 的攻击者可注入旧数据警告；管理员处理警告时可能覆盖用户数据，使用 Jenkins 自有用户数据库时还包括密码。
- name: Agent 操控工作区浏览器 XSS
  description: 控制 Agent 进程的攻击者可向控制器工作区浏览器提供恶意文件链接，造成 XSS。
- name: Agent 错误响应 XSS
  description: 被攻击者控制的 Agent 可发送实现 Stapler HttpResponse 的异常，控制器将其渲染为网页响应时造成 XSS。
- name: 面包屑提示存储型 XSS
  description: 具有 Overall/Read 的攻击者可利用面包屑溢出菜单中未转义的提示文本造成存储型 XSS。
- name: 持久化根对象嵌套注入
  description: 反序列化边界绕过允许嵌套对象。已确认影响仅为创建姓名和显示名称记录，不能据此创建可登录的新账户。
- name: HTTP 代理配置泄露
  description: 具有 Overall/Read 的攻击者可读取代理服务器、端口、用户名和免代理主机列表。公告未将代理密码列入泄露范围。
- name: 文件浏览器元数据遍历
  description: 具有 Overall/Read 的攻击者可读取控制器文件名称、大小和修改时间；具有 Item/Workspace 时，还可获取在同一 Agent 上拥有工作区的任务名称。
fixed:
- product: Jenkins 每周版
  status: 已修复
- status: 已修复
timeline:
- date: 2026年10月28日
  title: 披露核心安全更新并发布修复
  body: Jenkins 公告及两条发布日志公布每周版 2.588 和 LTS 2.580.2。
checklist:
- title: 升级所有运行中的控制器
  hint: 清点控制器版本，包括 WAR 安装包和容器镜像标签。部署每周版 2.588 或 LTS 2.580.2，重启后核对运行版本。仅更新插件不会替换 Jenkins 核心。
- title: 升级期间限制访问
  hint: 检查 Overall/Read、Item/Create、Item/Configure 和 Agent/Configure 授权，限制不可信 Agent。初始化向导仅允许管理员访问。15 个漏洞的前提条件各不相同。
- title: 保留新增的反序列化保护
  hint: 升级后测试典型任务和 Agent 配置。不要把 SUPPRESS_TYPE_PERMISSION 或 skipFieldValueElementTypeCheck 当作安全缓解措施，它们会关闭新增检查。按公告排查兼容性错误。
- title: 核查异常配置与账户活动
  hint: 将任务和 Agent 的 config.xml、用户记录及控制器文件系统变化与可信备份比对，检查现有访问日志中的异常配置请求。这些是行为排查方向，公告没有发布 IoC；单个异常不足以证明入侵。
- title: 单独处理被盗令牌换取的 Cookie
  hint: API 令牌泄露后，不要假定吊销令牌就会终止既有“保持登录”访问。限制控制器访问，按事件响应流程使相关持久会话失效，并更换泄露凭据。
sources:
- name: Jenkins 10 月 28 日核心安全公告
  says: 15 个核心 CVE、各自访问前提、修复和兼容性注意事项；没有确认利用的说法。
- name: Jenkins 每周版发布日志
  says: 每周版 2.588 于 2026 年 10 月 28 日发布，包含安全修复。
- name: Jenkins LTS 发布日志
  says: LTS 2.580.2 于 2026 年 10 月 28 日发布，包含安全修复。
- says: XStream 类型过滤绕过。
- says: 集合类型混淆。
- says: Agent 启动审批绕过。
- says: 重命名时跟随符号链接。
- says: Agent 配置路径遍历。
- says: 制品解包竞态。
- says: 首次管理员创建竞态。
- says: 通过 Cookie 绕过 API 令牌吊销。
- says: 旧数据提示导致账户覆盖。
- says: Agent 操控工作区浏览器 XSS。
- says: Agent 错误响应 XSS。
- says: 面包屑提示存储型 XSS。
- says: 持久化根对象嵌套注入。
- says: HTTP 代理配置泄露。
- says: 文件浏览器元数据遍历。
---

Jenkins 的 10 月 28 日更新影响广泛使用的构建控制器，因此评为 L3。每周版 2.587 及更早版本、LTS 2.580.1 及更早版本需要安装对应的核心修复。来源未给出受害者数量。

这些是不同的攻击路径，不能统称为无需认证的通用利用。多数需要可读取控制器及额外权限、控制 Agent，或管理员交互。初始化竞态则需要访问首次账户替换的短暂窗口。上方各漏洞条目保留了这些区别。

根对象漏洞目前仅确认能创建不可登录的用户记录。文件浏览器漏洞泄露的是元数据，不能任意读取文件内容。两者均不应被描述为完整账户接管或不受限制的文件读取。

厂商指出，每周版 2.539 / LTS 2.541.1 及更新版本启用 Content Security Policy 强制执行，可缓解集合、工作区浏览器和面包屑菜单的 XSS。这不能覆盖整个更新批次，也不能替代核心升级。公告还列出了放宽新增检查的兼容性开关；关闭保护不属于修复。
