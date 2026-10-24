---
title: "PHP 披露尚未修复的会话上传进度 RCE，依赖罕见的序列化配置"
headline: "紧急冲水后，还有一根罕见管道没堵上"
tags: [PHP, RCE, 尚未修复]
summary: "CVE-2026-115560 是额外的 PHP RCE 风险：上传进度开启，且应用在 session_start() 前将配置中的 php_binary 或 php_serialize 切换为 php。应关闭上传进度，等待下次常规修复。"
splash: "上传进度开启，且在 session_start() 前用 ini_set() 将配置中的 php_binary/php_serialize 切换为 php"
wipe: "设置 session.upload_progress.enabled=0，并保留 10月21日的 PHP2Shell 补丁。完整修复待发布"
inTheWildNote: "PHP 的说明性公告未报告在野利用"
cves:
  - name: 运行时切换序列化处理器时的会话上传进度 RCE
    description: "需要上传进度开启，且在 session_start() 前将配置中的 php_binary/php_serialize 在运行时改为 php。"
fixed:
  - product: PHP 会话上传进度
    status: "计划在下次常规修复版本中解决；尚未公布受影响版本范围"
mitigation:
  note: "在服务器配置中应用并重启 worker；此前为 PHP2Shell 关闭此功能的，应保持关闭。"
timeline:
  - date: 2026年10月23日
    title: PHP 发布风险说明及缓解措施
    body: "完整公告及修复计划随常规版本发布；具体版本和严重性评分尚未说明。"
checklist:
  - title: 为暴露的应用关闭上传进度
    hint: "在服务器配置中设置 session.upload_progress.enabled=0 并重启 worker；已关闭的应保持关闭"
  - title: 同时检查配置和会话初始化代码
    hint: "查找 php_binary/php_serialize 设置，以及 session_start() 前的 ini_set('session.serialize_handler', 'php') 调用；从不在运行时切换的应用不受此路径影响"
  - title: 保留 PHP2Shell 补丁并关注下次 PHP 发布
    hint: "8.5.12 / 8.4.27 / 8.3.36 / 8.2.35 解决的是此前两个 CVE，不能替代这次新增的缓解措施"
sources:
  - name: PHP 10月23日风险说明
    says: "需要罕见配置；下次常规修复发布前应关闭会话上传进度"
---

这份公告独立于 10月21日已修复的两个 [PHP2Shell 漏洞](/zh/incidents/php2shell/)。PHP 认为所需配置在实践中很罕见，因此按较窄的暴露范围评为 L3。

此路径需要同时满足：会话上传进度开启，配置中的 `session.serialize_handler` 为 `php_binary` 或 `php_serialize`，应用又在 `session_start()` 前通过 `ini_set()` 将其切换为 `php`。

从不在运行时修改会话序列化处理器的应用，可以继续开启上传进度。完整的受影响版本范围、严重性评分和首个修复版本尚未公布。此前的 PHP2Shell 版本检查不能证明不受此问题影响。
