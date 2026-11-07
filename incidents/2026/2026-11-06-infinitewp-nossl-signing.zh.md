---
title: InfiniteWP Client 的 NOSSL 签名密钥可从捕获的请求中恢复
tags:
- WordPress
- InfiniteWP
- 认证
summary: 研究人员利用一条捕获的请求及面板公钥，恢复了以 NOSSL 注册的 InfiniteWP Client 1.13.10 测试站点管理签名密钥。伪造请求成功修改数据库选项。核实修复前应限制或停用管理通道。
splash: 以 NOSSL 模式注册的 InfiniteWP Client 1.13.10 站点。恢复密钥需要一条捕获的签名请求及面板公钥。
wipe: 核实注册模式，限制或停用有风险的管理访问，并排查异常命令。
inTheWildNote: 研究人员在受控测试环境中演示了密钥恢复及命令伪造。
timeline:
- date: 2026年11月6日
  title: 研究人员公开 NOSSL 密钥恢复演示
  body: 研究人员在 291.9 秒内离线恢复测试密钥，并用其伪造了改变状态的命令。
checklist:
- title: 找出以 NOSSL 注册的站点
  hint: 盘点 InfiniteWP Client 版本，与面板管理员核查每个站点的注册方式。即使主机支持 RSA，面板也可选择 NOSSL。仅凭 HTTPS 端点或 PHP 支持 RSA 无法确定当前注册模式。
- title: 限制有风险的管理通道
  hint: 在网关上将管理请求限制到可信面板路径。若无法约束该路径，停用客户端插件。恢复访问前向 InfiniteWP 核实注册及替换流程。已核阅的变更日志未列出针对该报告的修复。
- title: 排查可能的命令伪造
  hint: 保留 WordPress、网关日志及面板命令历史。将异常管理请求和数据库选项变更与已知面板操作比对。如发现未经授权的活动，按站点事件流程处置，必要时从可信产物重建，并在干净系统轮换受影响凭据。
sources:
- name: 研究人员在 oss-security 发布的披露
  says: 说明测试版本、NOSSL 注册、密钥恢复前提、耗时及受控命令伪造。
- name: 研究人员的公开资料
  says: 记载实验并链接签名论文。
- name: InfiniteWP Client WordPress 插件页面
  says: 厂商插件页面及变更日志。已核阅页面未能确认针对该报告的修复。
---

NOSSL 使用公开前缀及最多 31 位的秘密随机值派生管理密钥。研究人员使用面板公钥及捕获的 `get_stats` 请求离线验证候选值，随后通过伪造的 `maintain_site` 请求在测试站点写入新的数据库选项。签名覆盖动作及消息 ID，未覆盖参数。

结果适用于 NOSSL 注册方式。报告所提约 20 万个安装指整个插件，以 NOSSL 注册的数量未知。报告记录的是受控演示。
