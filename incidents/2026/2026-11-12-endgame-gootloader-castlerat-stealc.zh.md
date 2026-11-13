---
title: “终局行动”打击 Gootloader、CastleRAT 和 StealC 的基础设施
summary: “终局行动”宣布对 235 台服务器和 257 个域名采取措施，并在犯罪基础设施中发现约 640 万份受害者数据。CastleRAT 受害者可通过 Have I Been Pwned 查询邮箱是否暴露。
splash: 遭入侵网站的运营者，以及设备运行过 Gootloader、CastleRAT 或 StealC 的个人与组织。
wipe: 隔离并调查感染设备，从干净设备撤销会话并轮换暴露凭据，检查并修补受影响的 WordPress 网站。
inTheWildNote: 执法机构确认了恶意软件感染及相关勒索软件案件。
timeline:
  - date: 2026年11月12日
    title: “终局行动”公布新一轮基础设施打击结果
    body: 行动针对 Gootloader 分发渠道、CastleRAT 基础设施和 StealC 服务器。合作机构协助通知受害者和修复受影响系统。
  - date: 2026年11月12日
    title: 美国司法部公布针对 Gootloader 的行动
    body: 司法部报告已从逾 100 台服务器移除恶意软件，并查封了用于分发或控制该软件的美国域名。
  - date: 11月13日 05:41 UTC
    title: Have I Been Pwned 收录 CastleRAT 数据
    body: 可查询与感染相关的邮箱，另有约 89.3 万个不同的密码可在 Pwned Passwords 查询。
checklist:
  - title: 遏制并调查可能感染的终端
    hint: 隔离受影响主机并保留终端遥测记录。检查从陌生网站下载的文件，尤其是伪装成法律文件的下载，追踪随后执行的程序。确认后续访问和勒索软件的影响后，再恢复主机运行。
  - title: 从干净设备撤销暴露的访问权限
    hint: 在 Have I Been Pwned 查询相关邮箱，并核实安全团队或服务商发出的通知。如果设备已确认感染，即使查不到邮箱，也应将设备上保存的密码视为已暴露。切勿把密码发给声称提供帮助的联络人。撤销浏览器和账户会话，轮换曾保存或重复使用的凭据，在支持时启用多因素认证。检查登录记录和账户恢复设置是否有异常变化。
  - title: 清理遭入侵的网站后再恢复访问
    hint: 检查受影响的 WordPress 网站访问日志，以及站点文件和管理员账户的异常变更。清除恶意内容，更新 WordPress 及扩展，轮换管理员凭据并启用多因素认证，再恢复服务。
sources:
  - name: “终局行动”公告
    says: 说明 11 月行动范围、缴获的数据、受害者通知渠道和 WordPress 处置指引。
  - name: 美国司法部 Gootloader 行动公告
    says: 说明美国针对 Gootloader 采取的措施，并估算其历史影响。
  - name: Have I Been Pwned 泄露事件索引
    says: 列出 179,745 个 CastleRAT 相关账户，并注明受影响数据包括邮箱地址和密码。
---

Gootloader 利用包括 WordPress 在内的遭入侵网站，诱使访客下载伪装成法律文件的内容。犯罪团伙出售受感染设备的访问权限，买家可借此部署勒索软件。CastleRAT 让操作者远程控制感染设备。StealC 窃取密码及其他已保存的账户数据。11 月的行动延续了 6 月开始的另一轮 StealC 打击工作。

约 640 万是本轮行动查获的受害者数据集数量。Have I Been Pwned 的索引记录了 179,745 个与 CastleRAT 相关的账户，另有约 89.3 万个不同的密码进入独立的 Pwned Passwords 查询库。美国司法部另行估算，Gootloader 自 2018 年以来在全球感染至少 2.5 万台电脑，并被用于针对至少 44 名美国受害者的勒索软件攻击，造成约 2880 万美元损失。这些数字的统计对象和时间范围各异。即使相关犯罪基础设施已遭打击，仍需调查并修复受影响系统。
