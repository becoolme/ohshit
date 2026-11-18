---
title: Contabo 披露内部系统遭未授权访问，重置全部 VNC 密码
summary: Contabo 确认部分内部基础设施遭未授权访问，已重置全部 VNC 密码并轮换内部凭据。调查仍在进行，尚未证实客户服务器遭入侵或个人数据泄露。
splash: 需要复查服务器、账户及远程控制台访问权限的 Contabo 客户。
wipe: 复查访问和凭据、启用 MFA、关闭不使用的 VNC，并保留服务器异常活动证据。
inTheWildNote: Contabo 确认内部系统遭未授权访问；对客户的具体影响仍在调查。
timeline:
  - date: 11月13日 14:29 UTC
    title: 厂商所报访问窗口开始
    body: Contabo 后续将未授权访问时间确定为 11月13日 15:29 CET 至 11月14日 11:28 CET。
  - date: 11月14日 10:28 UTC
    title: 厂商所报访问窗口结束
    body: Contabo 称在 11月14日发现入侵并停止了访问。
  - date: 11月16日 20:00 UTC
    title: 首次公开公告
    body: Contabo 报告已重置 VNC 密码、轮换内部凭据，并引入外部取证协助。
  - date: 11月18日 12:45 UTC
    title: 调查继续
    body: Contabo 称已向主管机关报告，目前尚无个人数据泄露迹象；业务正常运行。
checklist:
  - title: 复查服务器和账户活动
    hint: 保留可用的登录及系统日志，调查 11月13日至14日前后的陌生用户、访问和变更。Contabo 建议监控并复查凭据及权限；公告未公开技术入口或事件 IoC。异常需要调查，不能据此断言所有客户服务器都被攻破。
  - title: 保护客户面板访问
    hint: 更换默认或复用密码，复查已授权访问。在 Account → Access & Security → Authentication → Multi-factor Authentication 中启用认证器，在下次登录时完成设置并安全保存恢复码。迁移至新面板的账户需要重新设置 MFA，旧面板设置不会继承。
  - title: 不需要时关闭 VNC
    hint: 在客户面板选择 Servers & Hosting → VPS/VDS → More → Access → VNC control，关闭 VNC 并确认。Contabo 称已重置全部 VNC 密码，但这不能证明攻击者使用了 VNC 或进入某台服务器。需要控制台访问时，按厂商最新说明操作。
  - title: 通过厂商核实后续公告
    hint: 直接阅读来源中的事件页面，避开陌生消息内的链接。其每日更新目标时间为 14:00 CET；仍在调查或服务正常，不能证明没有数据遭访问。
sources:
  - name: Contabo 事件公告
    says: 首次公开于 11月16日，后续补充访问窗口、遏制措施及调查进展。
  - name: Contabo VNC 控制指南
    says: 说明启用或关闭远程控制台的操作位置。
  - name: Contabo MFA 指南
    says: 说明设置流程、恢复码及迁移至新面板后的要求。
---

Contabo 确认内部系统遭入侵，具体系统及对客户的影响仍在调查。厂商报告已遏制访问并更换凭据，截至 11月18日尚无个人数据泄露迹象。这是厂商调查结论，并非客户工作负载未受影响的独立保证。因托管服务商发生已确认的未授权访问，定为 L4；不声称发生大规模泄露或所有 VPS 均被攻破。
