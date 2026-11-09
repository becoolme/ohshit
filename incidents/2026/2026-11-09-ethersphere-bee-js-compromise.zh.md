---
title: Bee JavaScript 客户端遭供应链入侵，安装时运行远程载荷
tags: [npm, Swarm, 供应链]
summary: '@ethersphere/bee-js 13.3.0 会在安装时运行远程 JavaScript。研究人员观察到载荷瞄准 Swarm Desktop 密钥，并在 Linux 上建立持久远程访问。拦截 13.3.0，隔离执行过安装钩子的主机，再用可信版本重建。'
splash: 启用生命周期脚本并安装了 @ethersphere/bee-js 13.3.0 的开发机和 CI 运行器。
wipe: 拦截 13.3.0，锁定经核验的 13.2.0，隔离并重建暴露主机，再从干净系统更换暴露凭据。
inTheWildNote: 恶意版本及服务器返回的载荷已核实。受害安装数量未知。
fixed:
- status: 此前版本不含该安装钩子。等待维护方指引期间请精确锁定版本。
timeline:
- date: 11月9日 00:06 UTC
  title: 项目在 GitHub 公开 v13.3.0
- date: 11月9日 00:09 UTC
  title: npm 发布受影响的 13.3.0
  body: 清单将 scripts/generate-version.cjs 配置为 postinstall 钩子，并带有 npm 来源证明元数据。
- date: 11月9日 00:51 UTC
  title: Bitbison 公开软件包与载荷分析
  body: 研究人员记录了 Swarm Desktop 密钥收集行为和可持久运行的 Linux 远程访问代理。
checklist:
- title: 查找并拦截受影响版本
  hint: 检查锁文件、npm 日志、CI 构建日志及软件仓库代理缓存中的 @ethersphere/bee-js 13.3.0，包括传递依赖。拦截该确切版本，重新生成受影响的锁文件并锁定经核验的 13.2.0，然后在干净的运行器上重建。清除缓存中的 13.3.0 和受影响的构建产物。
- title: 隔离执行过安装钩子的系统
  hint: 断开受影响主机的网络连接并停用暴露的运行器。保留日志、软件包产物和 systemd 状态。检查用同一镜像构建的其他主机。使用可信输入重建，因为单独卸载软件包无法清除另行安装的远程代理。
- title: 更换暴露的密钥和凭据
  hint: 从干净系统更换暴露的 Swarm 节点密钥，并检查关联钱包的活动。若钱包密钥暴露，按 Swarm 官方指引转移资产。吊销并轮换安装用户可读的其他凭据，包括开发和 CI 令牌，并审计其使用记录。
- title: 排查加载器和已观察到的 Linux 持久化
  hint: '查看 DNS 和代理日志中是否出现 frameworkmetrics[.]xyz 或 api.frameworkmetrics[.]xyz，以及 /v1/analytics、/v1/swarm/report、/v1/assets/linux_amd64 和 /v1/assets/linux_arm64。初始请求以 Node 平台名作为 User-Agent，并带有 X-Ethersphere: 1。检查 package/scripts/generate-version.cjs（SHA-256 ee2f762e9ed3fd89f106e0b80c2e923bf1aed9a280277d3d998a5902c4d9ec0f）、~/.solidity/linux_amd64、~/.solidity/linux_arm64、~/.solidity/.run.py 和 ~/.config/systemd/user/solidity-langsupport-runner.service。单条命中无法证明系统失陷。'
sources:
- name: npm 软件包及版本历史
  says: 记录发布时间、受影响版本的安装钩子和来源证明元数据。13.2.0 的清单不含该钩子。
- name: Ethersphere 发布版本的源码提交
  says: 展示清单的变更及加载器如何以安装用户权限执行 HTTPS 响应。
- name: Bitbison 软件包分析
  says: 记录已观察到的 Swarm 密钥收集、Linux 二进制文件及持久化指标。
- name: StepSecurity 初步调查
  says: 核实安装时加载器及针对钱包的行为。周下载数据涵盖所有版本。
---

13.3.0 把版本生成脚本改成了 npm postinstall 加载器。启用生命周期脚本时，安装包就可能以安装用户权限执行服务器提供的代码，应用无需先导入这个依赖。加载器通过 HTTPS 请求获取并执行响应，无需安装 Swarm Desktop 也能启动。收集 Swarm Desktop 密钥则要求文件存在且可读。

Bitbison 观察到一份载荷读取 Swarm Desktop 配置和节点密钥，上传到同一域名，并安装 Linux 用户服务来运行远程访问代理。这是研究期间服务器返回的载荷。服务器可以改变响应，因此缺少这些 Linux 文件也无法排除代码已运行。npm 来源证明指向项目工作流，源码提交本身含有加载器。攻击者如何进入发布流程仍不清楚。

事件日期采用 11 月 9 日 UTC，以软件仓库的发布时间和 Bitbison 带时间戳的报告为准。StepSecurity 的初步公告标注 11 月 8 日，未注明时区。其披露的 3,560 次下载覆盖 13.3.0 发布前一周的所有版本，无法用来计算受影响的安装数。受害者人数和被盗金额均未核实。
