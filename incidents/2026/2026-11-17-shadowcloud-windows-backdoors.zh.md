---
title: ShadowCloud 后门利用 GitHub、Ably 和 SharePoint 与失陷系统通信
tags: [Windows, MeshAgent, GitHub, SharePoint]
summary: 卡巴斯基记录了一场仍在进行的入侵活动，受害者主要是亚洲和非洲的政府机构。攻击者在失陷系统中利用 MeshAgent 部署 Windows 后门，经 GitHub、Ably 和 SharePoint 传递命令和数据。
splash: 出现未经授权的 MeshAgent 活动，或出现相互关联的 ShadowCloud 加载器及网络指标的 Windows 系统。
wipe: 隔离可疑主机，保全执行和云端证据，确认入侵范围后移除未经授权的远程访问。
inTheWildNote: 卡巴斯基在以政府机构为主的入侵活动中观察到多个后门版本及受害者。
timeline:
  - date: 2026 年初
    title: 卡巴斯基发现正在进行的入侵
    body: 研究人员在一家台湾组织中发现 MeshAgent 投递加载器及加密载荷。
  - date: 2026年11月17日
    title: 卡巴斯基发布 ShadowCloud 调查
    body: 两篇技术报告介绍 GitDoor、GraphDoor、云端命令通道及相关基础设施。
checklist:
  - title: 核实远程访问工具并追查运行路径
    hint: 将 MeshCentral 和 MeshAgent 的安装记录、配置的服务器及服务创建时间与授权清单核对。在可疑主机上保全进程父子关系、DLL 加载记录、网络日志及与合法可执行文件同目录的文件。
  - title: 排查公布的网络指标并与主机行为交叉核对
    hint: '两份报告共列出 37 个网络指标，另有文件哈希。IP：27[.]102[.]66[.]162, 104[.]194[.]154[.]28, 216[.]73[.]158[.]72, 122[.]147[.]252[.]16, 103[.]106[.]230[.]33, 123[.]58[.]205[.]105, 223[.]165[.]4[.]203, 172[.]86[.]66[.]19, 103[.]214[.]68[.]20, 216[.]146[.]25[.]173, 103[.]137[.]63[.]39, 103[.]227[.]224[.]189, 104[.]194[.]152[.]173, 66[.]42[.]52[.]137, 153[.]75[.]94[.]148, 45[.]59[.]124[.]164, 104[.]194[.]153[.]161, 153[.]75[.]95[.]27, 216[.]73[.]158[.]117, 154[.]205[.]154[.]209, 43[.]134[.]62[.]111, 38[.]54[.]17[.]113, 38[.]52[.]17[.]113。域名：buildersemp[.]sharepoint[.]com, cskautogo[.]sharepoint[.]com, twnic[.]top, ekmt[.]tw, upload.gofile[.]io。GitHub 账户路径：LatonyCharnleyaW, StevenDFournier, VenoraKlanimU, JeneLeo, AlexandaJazzmynwC, FloraineSuvitC, bvgarciajocelynxccZ, Eclemensadolph1n, aYulysseserinYtas。哈希见两份报告，并排查 DLL 侧加载和异常上传。GitHub 和共享云服务也用于正常业务，单独命中不能证明失陷。'
  - title: 遏制受影响系统并排查后门可能触及的资源
    hint: 隔离存在相互印证证据的主机，保全内存、主机和出站记录。从干净系统核查受影响的 Windows 账户和凭据，查明可能被访问的资源，遏制后轮换暴露凭据。用可信镜像重建确认失陷的主机，重新接入前核实远程访问配置。
sources:
  - name: 卡巴斯基 Securelist ShadowCloud 调查第一部分
    says: 记录 MeshAgent 投递、DLL 侧加载、GitDoor 以及网络和文件指标。
  - name: 卡巴斯基 Securelist ShadowCloud 调查第二部分
    says: 记录 GraphDoor、应用认证、云端端点及插件。
---

卡巴斯基在一家台湾组织中发现两个运行中的 MeshAgent 实例。该工具连接配置好的外部服务器，投递一个合法可执行文件、恶意 DLL 和加密载荷。可执行文件加载 DLL 后，DLL 解包运行后门。初始访问方式仍不明确，研究人员发现与更早感染相符的证据。报告未证实 MeshAgent 存在漏洞，也未证实云服务商失陷。

GitDoor 使用 GitHub 仓库及 Ably 消息服务与操作者交换数据。GraphDoor 使用内置应用凭据取得 Microsoft Graph 令牌，通过 SharePoint 交换命令及执行结果。卡巴斯基取得了用于截图、记录按键及代理流量的插件。观察到的受害者主要是亚洲和非洲的政府机构，报告未公布总数。
