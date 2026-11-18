---
title: Apache 扩大正遭利用的 Roller XML-RPC RCE 影响范围
tags: [Apache, RCE, XML-RPC]
summary: Apache 确认 Roller 的 XML-RPC 反序列化漏洞正遭利用，将影响范围扩展至 4.0.0–6.1.4，加上此前披露的 6.1.5。应升级至 6.1.6 或更高版本，当前推荐 6.1.7。旧版管理界面关闭 XML-RPC 无法封住攻击路径。
splash: 网络可达的 Apache Roller 4.0.0–6.1.5 XML-RPC 端点；无需登录，也不需要非默认 XML-RPC 配置。
wipe: 升级至 6.1.7（最低修复版 6.1.6）；暂时无法升级时在 web.xml 禁用扩展类型，或移除 XML-RPC servlet 映射，然后重启。
inTheWildNote: Apache 报告正遭利用；CVE 中的 CISA ADP 补充评估仍标为未利用。
cves:
- name: Roller 4.0.0–6.1.4 的 XML-RPC 反序列化
  description: 厂商扩展类型在认证前被反序列化，可导致远程代码执行；此次扩展此前已披露漏洞的影响版本范围。
- name: 此前仅列 Roller 6.1.5 的同一 XML-RPC 漏洞
  description: 即使全局 XML-RPC 功能关闭，请求解析仍接受攻击者控制的序列化字节。
fixed:
- product: Apache Roller 4.0.0–6.1.5
  status: 最低修复版本；当前推荐版本为 6.1.7
timeline:
- date: 2026年9月5日
  title: Apache 合并端点修复
  body: PR 171 禁用未使用的扩展类型，并在解析前按 XML-RPC 设置拦截端点。
- date: 2026年9月24日
  title: Roller 6.1.6 发布
  body: 此版本修复 XML-RPC 端点漏洞。
- date: 9月25日 20:12 UTC
  title: Apache 公开披露 6.1.5 漏洞
  body: CVE-2026-82384 的原始邮件列表通知早于 9 月 28 日的 CVE 记录发布。
- date: 2026年11月11日
  title: Roller 6.1.7 发布
  body: 当前推荐版本还修复其他漏洞，不代表此次端点漏洞的最低修复版本发生变化。
- date: 11月17日 11:02 UTC
  title: Apache 扩大范围并确认利用
  body: CVE-2026-129448 覆盖 4.0.0–6.1.4，并明确与 CVE-2026-82384 相同。Apache 未公布攻击起始日期、攻击者身份或受害者数量。
checklist:
- title: 升级已部署应用并核对实际运行版本
  hint: 盘点 Roller WAR 包及部署实例。备份配置和数据，阅读 6.1.7 发布说明，从 Apache 下载页获取版本并核验公布的签名或校验和。替换已部署应用、重启并确认运行版本；最低修复版为 6.1.6，当前推荐 6.1.7。这些部署检查不能代替事件调查。
- title: 无法立即升级时采用服务器端缓解
  hint: 在已部署的 WEB-INF/web.xml 中将 enabledForExtensions 设为 false，或移除 /roller-services/xmlrpc servlet 映射，然后重启 Roller。后者会移除 XML-RPC 服务。通过用户实际访问的网络路径验证；在受影响版本仅操作管理界面的关闭复选框不足以缓解。保留临时措施直至升级完成并验证。
- title: 复查暴露情况并调查可疑执行
  hint: 保留可取得的代理、servlet 容器和主机日志，结合异常 Java 子进程、文件或出站连接检查 /roller-services/xmlrpc 请求。所引用的 Apache 警告未提供攻击者 IP、域名或哈希。这些属于通用行为检查，不是已公布的攻击特征；单个请求或异常不能证明失陷。怀疑失陷时隔离并调查主机，从干净系统轮换暴露的凭据；修补本身不能清除持久化。
sources:
- name: Apache 11 月 17 日公告原始 oss-security 归档
  says: 将范围扩展至 4.0.0–6.1.4，确认与此前漏洞相同及已发生利用，并给出最低修复版本和两种临时缓解选项。
- name: Apache 9 月 25 日原始公告
  says: 覆盖 6.1.5，说明默认配置及管理界面禁用 XML-RPC 为何不能阻止认证前解析。
- name: Apache 安全版本表
  says: 列出 9 月 24 日修复版本与 11 月 11 日当前版本；旧版本分支不会原地获得修复。
- name: Apache Roller 下载页
  says: 推荐 6.1.7，提供发布说明及签名、校验和核验链接。
- name: Apache 端点修复 PR 171
  says: 禁用厂商扩展类型，并在 XML-RPC 关闭时于读取请求体前拒绝请求；启用时保留普通调用。
- name: Apache CNA 记录及 CISA ADP 补充评估
  says: Apache 描述确认利用；11 月 17 日 CISA ADP 的 SSVC 补充评估却标为未利用。这不是 KEV 收录。
---

11 月 17 日警告新覆盖 Roller 4.0.0–6.1.4，并报告正遭利用。Apache 明确将其关联到 9 月 25 日针对 6.1.5 公开披露的同一 XML-RPC 漏洞。这些编号描述同一个问题，不是两条独立攻击路径，也不是两组受害数量。原始漏洞及 6.1.6 补丁并非 11 月才出现。

网络可达的 XML-RPC 端点可在检查凭据或 XML-RPC 启用状态前解析厂商扩展类型，因此未认证攻击者无需改变默认配置就能触达不安全反序列化。修复后的端点在服务关闭时先拒绝请求再解析，且即使 XML-RPC 启用也拒绝扩展类型。仅升级 JVM 不能代替 Roller 应用修复。

Apache 的直接利用警告支持当前严重程度。其 CVE 记录同时包含标为未利用的 CISA ADP SSVC 评估，与 CNA 描述不同。11 月 18 日核查的 CISA KEV 数据源未包含这两个编号；未被 KEV 收录不能推翻 Apache 的报告。所引用原始材料未提供攻击归属、失陷数量、起始日期或攻击者指标。
