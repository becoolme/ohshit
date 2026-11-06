---
title: 搜狗 Windows 输入法明文 HTTP 配置遭劫持，用于投放 DarkVigil
tags:
- 搜狗
- Windows
- DNS 劫持
summary: ESET 观察到攻击者重定向搜狗输入法的 HTTP 配置请求，在 Windows 上投放 DarkVigil。攻击需要操纵 DNS 或网络路径，具体劫持位置仍不明。升级至 16.10，并调查既有感染；更新不能证明已植入的主机恢复干净。
splash: 16.10 之前的 Windows 搜狗输入法，且攻击者可通过 DNS／网络操纵重定向其 HTTP 配置流量。
wipe: 安装官方搜狗 16.10 或更高版本；隔离疑似主机、保留证据，调查 DarkVigil 后再恢复访问。
inTheWildNote: ESET 观察到恶意 SGTool.exe 配置下发及 DarkVigil 执行。
cves:
- name: 品牌推广配置经未加密连接获取
  description: SGTool.exe 使用 HTTP 获取配置，控制 DNS 解析或网络路径的攻击者可替换指令，将可执行载荷放入组件加载位置。ESET CNA 给出 CVSS 4.0 8.9 分，Windows 16.10 之前版本受影响。
fixed:
- product: Windows 搜狗输入法
  status: 厂商将受影响请求改为 HTTPS；ESET 还报告启用证书固定
timeline:
- date: 2026年7月1日
  title: ESET 开始观察到经搜狗投放 DarkVigil
  body: 这是针对特定环境的回溯遥测日期，不是公开披露日。
- date: 2026年9月11日
  title: ESET 向腾讯安全报告弱点
- date: 2026年9月21日
  title: 腾讯确认问题
- date: 2026年10月30日
  title: 官方 16.10 更新日志记录安全修复
  body: ESET 披露时间线也将修复列为 10 月 30 日，但正文一处另写 10 月 29 日。版本下限一致，原报告的日期存在内部差异。
- date: 2026年11月2日
  title: ESET 分配 CVE 编号
- date: 2026年11月4日
  title: ESET 公开行动及技术分析
checklist:
- title: 从可信渠道安装已核实的 Windows 版本
  hint: 检查已安装的搜狗输入法版本，从可信网络或设备通过已知搜狗官网获取官方 16.10 或更高版本。厂商日志确认 16.10，ESET 称受影响 HTTP 请求已改用 HTTPS 并固定证书。没有核实公开的四段式构建号下限或独立临时变通措施。更新成功不能视为已清除恶意软件。
- title: 隔离疑似主机，保留组件加载证据
  hint: 清理前保留 SGTool.exe 进程与网络记录、DNS 设置及响应、下载配置和文件。先找到实际 SogouInput 安装目录，检查其下的 Components\SogouComMgr.exe、Components\libcef.dll 及 Components\biz_center\<version_number>\ 载荷位置，包括 biz_helper.exe。这些均为相对安装目录的路径。攻击将有合法签名的 Adobe helper 改名为 SogouComMgr.exe 侧载 DLL，签名或熟悉文件名不能证明安全。检查 HKCU\Software\Microsoft\IME\<HWID>\pluginHash 中的压缩插件。按自身事件响应流程确定持久化范围，必要时从可信介质重建，并从干净设备更换暴露凭据。这些是防御步骤，不是厂商提供的清理工具。
- title: 结合上下文排查完整网络指标
  hint: ESET 列出五个域名和四个 IP：blog.wangmengfun.top；update.mssproxy.net；img.fusfun.top；dev.soft-png-cdn.com；sogou-cdn.com；47.86.15.162；47.236.254.159；47.237.122.175；47.239.250.102。结合 DNS／代理／终端日志，关联 SGTool.exe --appid=scdreg -update 及 HTTP config.pinyin.sogou.com/api/brandScd/getBrandScd.php 请求。配置主机是搜狗合法基础设施，不是攻击者域名。核查终端、路由器 DNS 控制及上游解析器，ESET 尚未确定劫持发生的位置。单个匹配不能证明入侵，未匹配也不能排除暴露主机受影响。
- title: 按原始哈希文件比对样本
  hint: 公开的两个 SHA-1 为 8A60A8E90E1F5F08F28FE5A6DD57BD686C20DC23（libcef.dll）及 3E16BA611782AF6E45576D390488D28FD676BADE（Microsoft.VisualStudio.HostingProcess.Utilities.Sync.dll）。MD5：92d5aa18041ccf0487a73ecaaa86f871；c0d248994187db08f6413df26c4c5d8c。SHA-256：fa9e3d0112fede8d31bbf759979fde3f9db48576c69e0e8ed4b5d6f9323fcec8；7e628dd33aa09877bdda13606de11978743d09e0a3ea4a51dbd7cbd4b0ae8fb6。通过 ESET 原始仓库保留哈希与样本的对应关系，不要执行样本。helper 的 SHA-1 79188C8DE2378B437D39E867475C5B4714A0D7C9 属于被滥用的合法签名文件，本身不等于恶意软件。匹配需结合上下文，未匹配不能排除其他版本。
sources:
- name: ESET 原始 SlippyNunchucks 调查
- name: 搜狗官方 Windows 更新日志
  says: 10 月 30 日发布 16.10 并修复安全问题，原始中文按 GB18030 解码。
- name: ESET 编写的 CNA 记录
- name: ESET 原始指标及样本哈希文件
---

ESET 描述的是定向监控行动，不是全部搜狗安装遭入侵，也不能证明腾讯服务器被攻破。受影响 Windows 组件经 HTTP 获取品牌词库图标配置；在受害环境中，DNS 将合法配置域名指向攻击者暂存服务器。替代配置把签名 Adobe helper 及 DarkVigil DLL 放到现有组件加载流程使用的位置，实现 DLL 侧载及持久化。

攻击需要控制 DNS 解析或流量路径，ESET 未能确定操纵发生在路由器、运营商或其他位置。研究称自 7 月 1 日起，在香港、泰国、日本、越南、斯里兰卡及阿曼观察到搜狗相关活动；更广、较早的 DarkVigil 生态另行讨论，没有公开受害者总数或损失总额。ESET 将这一与中国利益一致的活动集群称为 SlippyNunchucks，称未发现足以建立 Mustang Panda 关联的重叠。这是研究者判断，不是已确认身份，也不能证明此前提及的全部应用均使用同一攻击路径。

L4 依据是经广泛使用的客户端进行的实际恶意下发与执行。本条对应 CVE-2026-120422，不是报告回顾的另一个 CVE-2026-51990。CNA 将受影响平台列为 Windows，不能据此认定移动端存在同样漏洞。16.10 修复下发弱点，但此前植入的恶意程序及插件仍需事件响应。原报告中 10 月 29／30 日的修复日期差异已保留，两者均不改变 11 月 4 日的公开披露日。
