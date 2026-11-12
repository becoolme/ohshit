---
title: 遭投毒的 Bee JS 和 Swarm Desktop 发行版窃取节点密钥并安装远程访问
tags: [npm, Swarm, 供应链]
summary: Swarm 确认 @ethersphere/bee-js 13.3.0 和 Swarm Desktop 0.56.2 为恶意版本，现已移除。载荷窃取节点密钥并安装远程访问。将 npm 包锁定至 13.2.0，使用 Desktop 0.56.3，隔离受影响主机，从干净设备保护资金。
splash: 运行过 Swarm Desktop 0.56.2，或启用生命周期脚本并安装过 @ethersphere/bee-js 13.3.0 的系统。
wipe: 阻止 npm 13.3.0 和 Desktop 0.56.2。干净主机使用核验过的 13.2.0 和 0.56.3。转移暴露密钥关联的资金及质押。
inTheWildNote: Swarm 确认已发布的恶意版本窃取节点密钥并安装远程访问。
fixed:
- status: 此前版本不含该安装钩子。请精确锁定该版本。
- product: Swarm Desktop
timeline:
- date: 11月9日 00:06 UTC
  title: 项目在 GitHub 公开 v13.3.0
- date: 11月9日 00:09 UTC
  title: npm 发布受影响的 13.3.0
  body: 清单将 scripts/generate-version.cjs 配置为 postinstall 钩子，并带有 npm 来源证明元数据。
- date: 11月9日 00:51 UTC
  title: Bitbison 公开软件包与载荷分析
  body: 研究人员记录了 Swarm Desktop 密钥收集行为和可持久运行的 Linux 远程访问代理。
- date: 11月9日 12:52 UTC
  title: Swarm Desktop 发布替代版本 0.56.3
  body: Swarm 确认已移除遭投毒的 Desktop 和 npm 发行版。
- date: 2026年11月11日
  title: SafeDep 补充发布范围及持久化证据
  body: SafeDep 报告 Desktop 0.56.2 的九个安装包均含加载器，并依据相同植入程序和以太坊控制设施将载荷与 SleepyDuck 关联。失陷 GitHub 账户的入侵方式及感染主机总数仍未知。
checklist:
- title: 查找并拦截受影响版本
  hint: 检查锁文件、npm 日志、CI 构建日志及软件仓库代理缓存中的 @ethersphere/bee-js 13.3.0，包括传递依赖。拦截该确切版本，并找出可能安装过它的所有主机和运行器。检查应用清单及自动更新日志中是否有 Swarm Desktop 0.56.2。
- title: 隔离运行过任一恶意发行版的系统
  hint: 断开受影响主机的网络连接并停用暴露的运行器。保留日志、软件包产物和 systemd 状态。检查用同一镜像构建的其他主机。保全证据后，清除缓存中的 13.3.0 及受影响的构建产物。重新生成锁文件并锁定 13.2.0，再用可信输入在干净的运行器上重建。同时排查 Desktop 0.56.2 主机，遏制后用 0.56.3 替换客户端。另行安装的远程代理可在卸载软件包后继续运行。
- title: 更换暴露的密钥和凭据
  hint: 检查 Swarm Desktop 节点配置和 ~/.local/share/Swarm Desktop/data-dir/keys/swarm.key 密钥是否暴露。从干净系统更换暴露的节点密钥，并检查关联钱包的活动。若钱包密钥暴露，按 Swarm 官方指引转移资产。吊销并轮换安装用户可读的其他凭据，包括开发和 CI 令牌，并审计其使用记录。
- title: 排查加载器和已观察到的 Linux 持久化
  hint: '查看 DNS 和代理日志中是否出现 frameworkmetrics[.]xyz 或 api.frameworkmetrics[.]xyz，以及 /v1/analytics、/v1/swarm/report、/v1/assets/linux_amd64 和 /v1/assets/linux_arm64。初始请求以 Node 平台名作为 User-Agent，并带有 X-Ethersphere: 1。检查 package/scripts/generate-version.cjs（SHA-256 ee2f762e9ed3fd89f106e0b80c2e923bf1aed9a280277d3d998a5902c4d9ec0f）、~/.solidity/linux_amd64、~/.solidity/linux_arm64、~/.solidity/.run.py 和 ~/.config/systemd/user/solidity-langsupport-runner.service。单条命中无法证明系统失陷。'
- title: 调查 macOS 和 Windows 的持久化
  hint: 在 macOS 上检查 ~/.solidity/ 及名为 com.solidity.langsupport.runner 的 LaunchAgent。在 Windows 上检查 ScreenConnect Client (5cbe79c9c25524df)、中继 185[.]232[.]84[.]169:8041 以及 invoke.ps1 和 %TEMP% 下的 .stuffed-* 暂存痕迹。先保留证据，再移除未经授权的代理和持久化机制；若无法确认清理完整，应从可信镜像重建。结合实例 ID 和中继核验，不要把正常的 ScreenConnect 客户端视为失陷。对照两份分析中的完整指标，并在镜像、代理、开发缓存及留存的源码归档中排查已移除版本。
sources:
- name: Ethersphere GitHub v13.3.0 发布页
  says: 发布 API 记录 GitHub 发布时间为 00:06 UTC。
- name: npm 软件包及版本历史
  says: 记录发布时间、受影响版本的安装钩子和来源证明元数据。13.2.0 的清单不含该钩子。
- name: Ethersphere 源码提交
  says: 展示清单的变更及加载器如何以安装用户权限执行 HTTPS 响应。
- name: Bitbison 软件包分析
  says: 记录已观察到的 Swarm 密钥收集、Linux 二进制文件及持久化指标。
- name: StepSecurity 初步调查
  says: 核实安装时加载器及针对钱包的行为。周下载数据涵盖所有版本。
- name: Swarm Desktop 替代版本
  says: 0.56.3 替代遭投毒的 Desktop 0.56.2。发布 API 记录公开时间为 12:52 UTC。
- name: Swarm 官方安全公告（公开嵌入）
  says: 确认两个恶意版本已移除，说明密钥窃取与远程访问，并要求 Desktop 用户转移资金和质押。
- name: SafeDep 原始分析及 11 月 11 日更新
  says: 分析各平台载荷、受影响安装包、发布账户活动、仍可获取的工件及攻击活动关联。
- name: Socket 原始跨平台及链上分析
  says: 记录更新推送范围、各平台持久化方式以及与 SleepyDuck 共用的以太坊设施。
---

13.3.0 把版本生成脚本改成了 npm postinstall 加载器。启用生命周期脚本时，安装包就可能以安装用户权限执行服务器提供的代码，应用无需先导入这个依赖。加载器通过 HTTPS 请求获取并执行响应，无需安装 Swarm Desktop 也能启动。收集 Swarm Desktop 密钥则要求文件存在且可读。

Bitbison 观察到一份载荷读取 Swarm Desktop 配置和节点密钥，上传到同一域名，并安装 Linux 用户服务来运行远程访问代理。这是研究期间服务器返回的载荷。服务器可以改变响应，因此缺少这些 Linux 文件也无法排除代码已运行。npm 来源证明指向项目工作流，源码提交本身含有加载器。攻击者如何进入发布流程仍不清楚。

软件仓库现将 13.2.0 列为 latest，包元数据中已移除 13.3.0。检查内部缓存及锁文件中是否仍有副本。事件日期采用 11 月 9 日 UTC，以软件仓库的发布时间和 Bitbison 带时间戳的报告为准。StepSecurity 的初步公告标注 11 月 8 日，未注明时区。其披露的 3,560 次下载覆盖 13.3.0 发布前一周的所有版本，无法用来计算受影响的安装数。受害者人数和被盗金额均未核实。

Swarm 公告确认两个发布渠道都分发了恶意代码，并要求更新过 Desktop 的用户立即转移资金及质押。请使用另一台干净设备并遵循经核实的 Swarm 指引。在调查并清理或重建主机后，用 0.56.3 替换 Desktop 0.56.2。维护方确认密钥被窃及远程访问，故上调至 L4。损失范围和金额仍未核实。

SafeDep 报告 Swarm Desktop 0.56.2 的九个安装包均含加载器。macOS 应用经过签名及公证。Socket 发现更新程序可能向 Apple Silicon 和 Windows x64 安装推送该版本。收到更新或下载不等于已执行。SafeDep 在 GitHub 活动日志中发现 11 月 6 日归于一个维护者账户的 13 次推送，其中注入工作流窃取 CI 凭据的尝试未成功；研究人员还将恶意发布与发布机器人关联。账户如何被入侵仍未知。两家研究团队依据相同的以太坊配置合约、控制钱包及匹配的植入程序，将这些发布与先前的 SleepyDuck Open VSX 攻击关联。这不能确定感染主机数或被盗金额。
