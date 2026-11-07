---
title: Apache Axis 1.x 在认证前可加载攻击者指定的类
tags:
- Apache Axis
- SOAP
- Java
summary: Apache Axis 1.x 至 1.4 会在服务认证前处理 SOAP 故障消息中由攻击者控制的类名。若应用类路径含合适的类，攻击者可执行代码。Apache 建议迁移，或部署包含其源码补丁的构建。
splash: 运行可达 Apache Axis 1.x 至 1.4 SOAP 端点的应用。执行代码还需类路径中存在合适的类。
wipe: 限制对 Axis 1.x 的访问，然后迁移至受支持的 SOAP 引擎，或部署经测试且包含 Apache 补丁的构建。
inTheWildNote: Apache 已披露漏洞并提供源码补丁。尚未确认在野利用。
cves:
- name: 未认证 SOAP 故障消息类加载
  description: 传入的 SOAP 故障消息可在 Axis 校验类型前加载指定的类并调用兼容构造函数。服务级认证执行得更晚。
fixed:
- product: Apache Axis 1.x 至 1.4
  status: 已停止维护，有源码补丁。
timeline:
- date: 11月6日 15:32 UTC
  title: Apache 发布公告
  body: 公告涵盖至 1.4 的版本，并为已停止维护的分支指明源码补丁。
checklist:
- title: 盘点 Axis 1.x 并限制 SOAP 端点
  hint: 检查已部署 WAR 和依赖清单中的 axis:axis 或 org.apache.axis:axis，包括内嵌副本。迁移期间通过网关或防火墙阻止不可信网络访问。服务级认证处理器无法拦截在其执行前发生的解析。
- title: 迁移或部署 Apache 源码修复
  hint: 规划迁移至 Axis2/Java 等受支持的 SOAP 引擎。若无法立即迁移，使用包含 41f3b4e8d04e310ca81f86b92630ab2c11d608bd 的已核验源码构建，或将补丁移植至当前分支。测试自定义故障处理，并确认运行产物含该变更。Apache 无计划发布含修复的 Axis 1.x 版本。
- title: 排查此前可访问的部署
  hint: 保留网关及应用日志。检查携带 exceptionName 的异常传入 SOAP 故障消息，以及异常 JVM 子进程、文件变更或出站请求。结合正常流量与类路径内容判断。单一命中不足以证实入侵。
sources:
- name: Apache 在 oss-security 发布的公告
  says: 说明认证前解析、类路径前提，以及迁移或源码修复方案。
- name: Apache CNA 记录
  says: 列出两个 Maven 坐标、至 1.4 的版本及受影响源码范围。
- name: Apache 源码补丁
  says: 查找时避免初始化类，并仅允许构造 AxisFault 的子类。
---

Axis 会先解析请求以确定目标服务，随后才运行该服务的处理器。无需登录的 SOAP 故障消息可抵达此路径，指使 Axis 加载某个类。类加载时可能运行静态初始化器，兼容的构造函数也可能接收故障数据。能否执行代码取决于应用类路径中的内容。

Apache 列出的受影响范围包括至 1.4 的 Axis 1.x 正式版本，以及从 `aac718c6035435d96b39d6aebb9c078a13af7cc8` 到 `41f3b4e8d04e310ca81f86b92630ab2c11d608bd` 之前的源码构建。后一个标识是源码提交。盘点时应覆盖重新打包或随应用分发的副本。
