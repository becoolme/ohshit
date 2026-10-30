---
title: Searchjacked 研究发现数百款浏览器扩展通过代理截取搜索查询
summary: Socket 记录了通过运营者控制的代理转发搜索查询的扩展。319 款扩展、约 1340 万用户的统计横跨十年，不代表新感染或独立受害者数量。本次报告新增识别 264 款扩展。
splash: 安装了所列扩展、且启用了其搜索引擎覆盖设置的浏览器配置
wipe: 移除相关扩展，恢复可信搜索设置，并核查企业浏览器策略
inTheWildNote: 研究人员实际测试了在线代理跳转，并记录了已安装的扩展。
cves: []
fixed: []
timeline:
  - date: 2026年10月29日
    title: Socket 发布扩充的扩展识别及代理跳转分析
  - date: 约2025年4月
    title: 早期研究记录相关搜索劫持扩展
checklist:
  - title: 清点并移除已识别的扩展
    hint: 报告涵盖 319 款扩展，但本次可读公开正文未提供完整的机器可读 ID 列表。检查 chrome://extensions 及企业扩展清单，先核对已验证示例，并向研究方索取完整线索集。Predator Search 的扩展 ID 为 odkcfoohjiicbelloepgcomekdknchjh。对每个同步配置移除确认不需要的扩展，并检查 chrome://policy 是否强制重新安装；名称和商店是否可搜索不能单独判断可信度。
  - title: 恢复搜索设置并检查跳转
    hint: 检查默认搜索引擎及 manifest 的 chrome_settings_overrides.search_provider。报告示例包括 search.safesearchgame[.]com/query、suggest.safesearchgame[.]com/querying/autocomplete、searchlio[.]net、searchtosearch[.]com、mcftink[.]com、extension-search[.]online、newtabsearch[.]net、newtabhub[.]net、getsimplepdfsearch[.]com、*.system1[.]partners、*.s1search[.]co、axt.iadispatcher[.]com。移除后恢复可信搜索引擎。这些域名仅为排查线索，并非完整封禁列表；单独命中不证明失陷。
  - title: 评估查询暴露，避免扩大结论
    hint: 通过保留的浏览器及代理日志确认敏感查询是否经过相关代理。报告未证明所有密码或令牌被盗，也未确认所有跳转都投递恶意软件。采用扩展允许列表并审查新增安装；无法获取完整数据集时，不能据此认为未列出的 ID 安全。
sources:
  - says: 对新增扩展、历史统计、代理行为和排查方法的一手研究。
  - says: 转述同一研究人员的发现，不构成对历史用户总数的独立确认。
---

本次新研究在既有搜索劫持模式中新增识别了运营者和扩展，并不代表整个活动始于 10 月 29 日。即使扩展没有显眼的权限申请或后台代码，搜索覆盖设置仍能将查询发往中间服务器。

Socket 实测发现服务器可选择跳转目标。将用户带到钓鱼或恶意软件下载页属于潜在后果，并非每款扩展都已确认发生的结果。用户统计来自研究方，尚未在该调查之外独立核实，且涵盖不同年份的扩展，不能表述为 1340 万个新泄露账号。L3 基于广泛的浏览器暴露和具体查询截取行为，不代表全网漏洞利用。
