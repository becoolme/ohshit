---
title: BlackX 在已打补丁但未完成安全启动吊销的 Windows 主机上保持持久化
summary: Kaspersky 报告中亚外交机构出现 BlackX 感染。攻击者已掌握管理员权限，并利用已知安全启动绕过；安装 Windows 更新并未自动完成所需吊销。对 APT41 的归因为中等置信度。
splash: 缺少安全启动吊销的 Windows 主机；部署前需要已取得管理员权限
wipe: 安装最新 Windows 更新，核实安全启动吊销和恢复介质，并调查启动层持久化
inTheWildNote: Kaspersky 在定向入侵中观察到 BlackX 及后续载荷
cves:
- name: 被 BlackX 复用的 Baton Drop 安全启动绕过
  description: 在未完成所需吊销的主机上复用已知绕过来维持持久化，并非新的远程初始访问漏洞。
timeline:
- date: 2026年10月22日
  title: Kaspersky 发布 BlackX 调查
  body: 新增活动细节解释了安装 Windows 补丁后仍能持久化的原因。
- date: 约 2026年初
  title: 研究人员在中亚外交机构发现感染
checklist:
- title: 同时核实吊销状态和 Windows 补丁
  hint: 遵循 Microsoft KB5025885 部署指引；审计安全启动 DB / DBX 状态，不要假定更新安装后已强制执行吊销
- title: 部署吊销前准备恢复措施
  hint: 保留 BitLocker 恢复密钥，更新恢复介质，并测试有代表性的固件型号；Microsoft 提醒吊销无法仅靠重新格式化撤销
- title: 排查已发布的 BlackX 痕迹
  hint: 关联 www.archivetj.com、inst.exe、C:\ProgramData\Intel\inst.exe、PVMDIJGKAX2、RC4 密钥 Q46F6MDLI3RX2KV1、googleupdate.exe / jcef_helper.exe（合法加载器 MD5：AF8A983B9ADA07EAE1259BF2953ABD40）、v8_context_snapshot.bin、驱动证书序列号 0bcdf5e0da32d68900b8b7638459d072 及 C:\Users\xdd\Desktop PDB 路径上下文。OxiDLLRunner 和云存储任务后缀 0X01–0X06 / SSSR 可作额外排查线索。仅命中指标不能证明入侵，合法加载器和云服务需结合上下文判断
sources:
- name: Kaspersky Securelist BlackX 调查
  says: 已观察到的攻击活动、痕迹、缺失的吊销，以及中等置信度 APT41 归因
- says: 受支持的部署步骤、固件测试、恢复介质准备及 BitLocker 恢复注意事项
---

这批新披露细节的攻击活动已确认利用漏洞并实现启动层持久化，因此评为 L4，并非新发现的 Windows 零日漏洞。Kaspersky 观察到塔吉克斯坦、乌兹别克斯坦和土库曼斯坦的外交机构遭攻击；最初如何进入网络尚未说明。与 APT41 的关联属于分析判断，不能当作已确认归因。

安装前需要管理员权限。调查发现主机已打补丁，却未完成吊销步骤；证书过期不等于已加入 DBX 阻止列表。应遵循 Microsoft 包含恢复准备的分阶段流程，不要只复制孤立的注册表命令。
