---
title: GitHub 仓库 README 下载诱饵分发 LuaJIT 加载器
summary: 火绒披露 GitHub README 下载诱饵投递 Windows 批处理／LuaJIT 加载器，可上传截图及系统资料、执行 C2 响应并继续下发窃密组件。样本涉及 30,738 个仓库、15,584 个账号，含伪造及部分被盗账号，不能视为受害者或感染人数。
splash: 下载并执行受影响仓库 README 所链 ZIP／批处理载荷的 Windows 用户或编程代理；未确立仅浏览就会感染。
wipe: 停止运行可疑仓库下载，保留证据，检查持久化及 Defender 排除项，从干净设备更换确认暴露的凭据。
inTheWildNote: 火绒记录实际恶意仓库分发，部分具有真实开发历史的账号遭盗用。
timeline:
- date: 2026年11月4日
  title: 火绒发布原始攻击活动分析
  body: 研究覆盖自 2025 年起监测的活动，以及 2026 年 2 月、10 月的批量仓库改动。11 月 4 日是报告日期，不是活动起点。
checklist:
- title: 运行前核实仓库下载
  hint: 检查 README 链接实际目标及提交历史，多种文本指向同一 ZIP、单行 start 启动器及反复只改 README 均属警讯。为编程代理隔离不可信代码，下载、执行前增加审核；热门项目名称或多年账号不足以证明可信。
- title: 保留并核查完整公开样本指标
  hint: SHA256 2602DC0D38834493CD2C2211F1231DAE24BEC59AC251E1FB12ED24D8BE33C59F；C2 213.176.73.151:80 and 144.31.108.193；路径 /api/NTE3YjdjNWU1NjYzNjU2YTA1N2Y=；multipart boundary a1u4xbodohy2cqdc2n0i336qy9tcap8w64yb424；文件 Launcher.cmd, luajit.exe, uix.txt、可选 lua51.dll，以及 %LOCALAPPDATA%/ODM5/ODM5.exe。Polygon 合约 0x1823A9a0Ec8e0C25dD957D0841e3D41a4474bAdc，eth_call selector 为 0x3bc5de30，用于取得回退配置。 公共基础设施 www.microsoft.com, ip-api.com/json/, polygon.drpc.org、polygon.publicnode.com 属于连通性、地理位置或 RPC 线索，不代表攻击者持有这些服务。 原文附录图片列出 20 条示例恶意 ZIP URL；按完整公开图片核查路径，不要下载或执行载荷。 单独命中不能证明失陷；共享服务、文件名及正常 LuaJIT 解释器本身不是恶意程序。
- title: 遏制疑似执行并检查持久化
  hint: 疑似主机先断网，清理前保留脚本、进程、网络及安全日志。报告建议全盘扫描并检查注册表启动项和计划任务。条件配置可向当前用户 Run 键写入 luajit 值及匹配的 StartupApproved/Run 值、建立每日任务、隐藏 uix.txt，并请求管理员权限将系统盘及 .exe／.dll 加入 Defender 排除。与安全团队检查未授权排除及持久化，不要仅凭名称删除正常项。确认凭据暴露时，从干净设备吊销及轮换；扫描无异常不能证明未执行任意代码。
sources:
- name: 火绒 11 月 4 日原始研究及指标、附录图片
  says: 仓库、账号及 URL 数量是观察到的资料，不是受害者数；已核阅样本逆向、两个 C2、一个 SHA256、七项条件配置及 20 个恶意 ZIP 示例 URL，包括仅在图片中的表格。
---

样本将下载伪装成 AI 工具及其他项目。火绒称部分仓库为伪造或克隆，另有具有真实历史的账号遭盗用。运行 Launcher.cmd 会启动改名的 LuaJIT 解释器并载入 uix.txt。加载器收集主机标识及截图，将转换后的 C2 响应作为 Lua 代码执行；进一步窃取凭据、聊天会话或钱包资料，取决于后续组件是否被下发并运行。这不能证明每个相关仓库均导致用户感染，也不能证明 GitHub 平台基础设施遭入侵。

火绒统计截至 2026 年 10 月有超过 56,000 条恶意 URL；仓库及账号总数混合不同资料类别，不能相加为受害者或假定全部账号均被盗。报告未确认受害者总数、钱包损失总额或通用清理补丁。L3 依据是已记录的开发下载恶意程序活动；GitHub 上存在 ZIP 不等于已安装或下游资料已被盗。
