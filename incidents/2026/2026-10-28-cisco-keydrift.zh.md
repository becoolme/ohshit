---
title: Talos 披露 KeyDrift：攻击者在 Cisco SD-WAN 控制组件中植入后门并收集密钥材料
summary: Talos 报告 UAT-11473 利用 CVE-2026-20127 植入持久化后门并收集控制组件中的密钥材料。这是新披露的攻击活动，使用的是已有补丁的漏洞，并非新的零日漏洞。
splash: 未修补的 Catalyst SD-WAN Controller、Manager 和 Validator；曾暴露或失陷的控制组件需要排查
wipe: 按 Cisco 公告升级、限制控制组件访问，并与 TAC 排查持久化后再确认恢复
inTheWildNote: Cisco Talos 报告了实际利用，并恢复了控制组件中的恶意植入物。
cves:
  - name: SD-WAN 对等认证绕过
    description: 未认证的远程攻击者可用特制请求获得高权限访问，并修改网络配置。
fixed:
  - {}
  - {}
  - {}
  - {}
  - product: 更早版本及已停止维护的版本
    status: 按 Cisco 兼容性矩阵和升级矩阵迁移
timeline:
  - date: 2026年2月25日
    title: Cisco 发布认证绕过公告及修复
  - date: 2026年10月28日
    title: Talos 发布 KeyDrift 分析；Cisco 更新公告
checklist:
  - title: 修补所有受影响的控制组件
    hint: 清点 Controller/vSmart、Manager/vManage 和 Validator/vBond。按 Cisco 发布表及兼容性矩阵选择 20.9.8.2、20.12.5.3 或 20.12.6.1、20.15.4.2、20.18.2.1；不受支持的分支应迁移。这些四段版本不提供版本检查器。
  - title: 限制管理与对等连接访问
    hint: 自托管部署的 22、830 端口仅允许已知控制组件及必需的可信 IP；其余控制平面端口按 Cisco 加固指南配置。修改前验证拓扑需求。ACL 只能降低暴露，不能代替补丁。
  - title: 保留证据并排查控制组件持久化
    hint: 检查 /var/log/auth.log 中异常的 Accepted publickey for vmanage-admin 记录，并将每个对等连接的 IP、角色和时间与 Manager 清单及维护记录核对。Talos 线索包括 /etc/sv/sshd/ 和 /etc/sv/aaamgr/ 的 run 启动脚本、conf_sshd、rsshd、libdssl.so、aaamgrd、libcommon.so、/tmp/system-vdaemon、/var/tmp/vdaemon.bin 及读取后删除的 /var/tmp/vdaemon.conf。研究未恢复固定的外部 C2 IP 或域名；单独命中不能证明失陷。对控制组件执行 request admin-tech 保存材料，启动事件响应并联系 Cisco TAC；打补丁本身不能证明已有植入物已清除。
sources:
  - says: 记录恢复的植入物、密钥收集、目标、排查线索及响应建议。
  - says: 列明受影响角色、修复版本、临时访问限制及日志核查方法。
  - says: 提供部署加固指导；访问限制需兼顾合法拓扑。
---

Talos 于 10 月 28 日披露这轮攻击活动。PolyFlame 在控制组件进程内提供持久化访问；LittleFilch 检查解密后的控制流量，并提取被研究人员判断为 IPsec 数据平面密钥的材料。受影响的是控制组件，并非所有 Cisco 防火墙。公告涵盖自托管及 Cisco 托管部署，不受配置差异限制。

入口漏洞早在 2 月已披露。L4 基于本次新报告活动中恢复的植入物及实际利用。Talos 判断其基础设施与 Volt Typhoon 的 Silent Train 网络有重叠，但这不能证明两个攻击组织相同。报告没有给出受害者总数，也未证明所有客户流量均已被解密。

升级与调查应同时按厂商流程执行。达到修复版本不能证明曾失陷的控制组件已经干净。
