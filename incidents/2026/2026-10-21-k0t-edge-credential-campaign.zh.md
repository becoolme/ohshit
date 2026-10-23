---
title: k0t 边缘设备攻击活动泄露逾 7 万条凭据，并建立持久网络访问
summary: Group-IB 和 NyxLab 报告了一批不同的凭据数据及针对暴露的 FortiGate、FortiWeb 和 GlobalProtect 的入侵。逾 7 万条凭据不等于受害者人数；与勒索软件组织的隶属关系尚未证实。
splash: 弱密码 FortiGate、存在漏洞的 FortiWeb，或开启 override cookie 且复用门户/网关证书的 GlobalProtect
wipe: 修补受影响设备、限制访问、排查持久化，并轮换泄露的设备和目录凭据
inTheWildNote: Group-IB 和 NyxLab 观察到持久访问及数据外传
cves:
- name: FortiWeb 初始访问路径
  description: 攻击工具通过该漏洞利用的是 FortiWeb，而非 FortiGate。
- name: GlobalProtect 认证绕过路径
  description: 需要认证覆盖 cookie 及受影响的证书配置；该活动用门户证书伪造 cookie。
timeline:
- date: 2026年10月21日
  title: Group-IB 和 NyxLab 发布联合调查
- date: 约 2026年2月至6月
  title: 多起已观察到的 FortiGate 入侵发生于这一时期
checklist:
- title: 修补设备并限制管理访问
  hint: 根据所引用的厂商公告清点 FortiWeb 和 GlobalProtect 配置；FortiGate 也遭到密码暴力破解
- title: 排查边缘设备访问及凭据泄露
  hint: 检查意外出现的管理员、配置导出、可信主机变更和异常 VPN 登录；控制入侵后轮换设备及目录密钥
- title: 排查攻击基础设施及持久化
  hint: 报告列出 15 行网络指标和 21 个文件哈希，正文另有 alknene.shop。网络主机及端点：mesh.buttruyen.com, 62.60.131.43, Meshcentral.girydsfsggvb.com, 62.60.135.64, agent.afahimsa.top, 193.149.187.81:1287, 64.94.85.14, 168.100.11.99, 162.33.178.213:8888, sthyjk.com:8443, alknene.shop, 162.33.179.249, 193.24.123.162, 193.149.176.50, radesashar.com, 193.169.194.21。完整哈希、URL、/meshagents 查询及 clear-thinking_61.92.4_INSTALL.exe 路径见其完整 IoC 表格。关联未经授权的 RMM、AdaptixC2 和 Rclone 活动；仅命中指标不能证明入侵
sources:
- name: Group-IB 和 NyxLab 联合调查
  says: 观察到漏洞利用、不同的凭据数据集、持久化、数据外传，并提供防御指标
- says: 10月23日报道该活动；原始研究于 10月21日发布
- name: Palo Alto Networks CVE-2026-0257 公告
  says: 所需配置及缓解：使用专用 cookie 证书，或关闭认证覆盖
---

研究人员发现，这批凭据与此前 FortiBleed 数据集的重合极少。与 FortiBleed 和勒索软件组织的关联仍是分析判断，不能证明由相同人员操控。受害者归属尚未全部核实。本报告记录的是新披露的攻击活动证据，并非新漏洞。

对 GlobalProtect，检查 Network → GlobalProtect → Portals/Gateways → Agent 中的认证设置。关闭认证覆盖，或新生成专用 cookie 证书，不要复用门户/网关证书。根据厂商各版本对应的表格升级所有门户和网关。
