---
title: FreeSWITCH 修复已遭利用的 SIP MESSAGE 命令执行漏洞
tags: [FreeSWITCH, SIP, RCE]
summary: FreeSWITCH 确认 SIP MESSAGE 选择 API 命令接口的路径遭利用。受影响版本为 1.11.2 及更早，1.11.3 默认关闭该路径。即使启用认证，普通注册用户仍可能利用。
splash: 接受入站 MESSAGE 的 SIP 配置；默认无密码用户可能使攻击无需已有账户
wipe: 升级至 1.11.3，关闭不用的入站聊天，保持 enable-chat-api-proto 禁用
inTheWildNote: SignalWire 确认该命令执行路径遭利用。
cves:
  - name: 入站 MESSAGE API 分发
    description: MESSAGE 获接受的对端可使用 FreeSWITCH 进程权限执行命令。
fixed:
  - {}
timeline:
  - date: 2026年10月28日
    title: 公告确认利用情况并公布修复版本
checklist:
  - title: 打补丁并核查各 SIP 配置
    hint: 通过 fs_cli -x version 检查版本。升级并保持 enable-chat-api-proto 禁用，在不需要入站聊天的配置中设置 enable-chat=false。重启受影响服务前检查配置管理。
  - title: 移除无密码用户，调查被接受的消息
    hint: 检查 default 和 Skinny 示例用户。仅启用认证、收紧入站 ACL 或设置 disable_system_api_commands 均不能封堵路径。保留 SIP 及主机日志，检查异常命令和凭据访问；仅日志匹配不能证明失陷。
sources:
  - name: SignalWire FreeSWITCH 公告
---

入站聊天默认开启。若启用 MESSAGE 认证，一个普通配置账户即足够；默认无密码用户可能允许无账户访问。修复默认拒绝 API 选择器。公告未发布受害数量或静态指标。L4 依据已确认的利用情况。
