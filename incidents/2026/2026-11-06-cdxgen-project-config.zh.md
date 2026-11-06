---
title: cdxgen 仓库配置可绕过扫描防护执行命令
tags:
- cdxgen
- CI
- SBOM
summary: 恶意仓库可让 cdxgen 在使用 --no-install-deps 及 secure 模式时执行命令。同批另有解析阻塞、输出符号链接和 Git 重定向问题。@cyclonedx/cdxgen 12.9.1 已修复；@cdxgen/cdxgen 13.x 计划在 13.7.0 修复，公告尚未列出已发布补丁。
splash: 用 cdxgen 扫描攻击者控制仓库的开发者及 CI；配置执行要求从该仓库内运行扫描器。
wipe: 使用 @cyclonedx/cdxgen 12.9.1；13.x 在确认补丁发布前执行公告中的临时缓解措施。
inTheWildNote: 维护者公开了 PoC；尚未报告实际在野利用或受害者人数。
cves:
- name: 仓库配置命令执行
  description: '@cyclonedx/cdxgen >=12.0.0、<12.9.1 及 @cdxgen/cdxgen >=13.0.0 从工作目录加载不安全项目配置。控制仓库者可用扫描用户身份执行代码。'
- name: CrewAI 解析拒绝服务
  description: '@cyclonedx/cdxgen >=12.3.1、<12.9.1 及 @cdxgen/cdxgen >=13.0.0 使用平方复杂度正则同步解析恶意 CrewAI agents.py／tasks.py，可能阻塞 CLI 或 ai-skill／ai 服务端扫描。'
- name: 输出符号链接文件破坏
  description: '@cyclonedx/cdxgen >=8.1.6、<12.9.1 及 @cdxgen/cdxgen >=13.0.0 跟随输出路径的符号链接，用生成的 BOM 覆盖可预测且可写的目标，而非写入攻击者任意指定的字节。'
- name: Git 重定向绕过主机允许列表
  description: '@cyclonedx/cdxgen >=11.2.5、<12.9.1 及 @cdxgen/cdxgen >=13.0.0 的 Git HTTP 重定向可绕过主机检查，前提是允许的主机能重定向到攻击者选择的目标。'
fixed:
- status: 四项公告均已发布修复
- status: 计划在 13.7.0 修复；公告尚未列出已发布补丁
timeline:
- date: 2026年11月6日
  title: 维护者公开四项公告及演示
  body: 同批补丁在 12.9.1 修复 12.x；13.x 源码修复位于 PR 4759，13.7.0 仍为计划版本。
checklist:
- title: 确认包名并核实修复
  hint: 检查 package.json、锁文件及扫描镜像或构建清单，区分 @cyclonedx/cdxgen 与 @cdxgen/cdxgen。前者升级至 12.9.1，重建固定版本镜像。13.x 跟进 PR 4759 及发布公告；源码补丁或计划版本不能证明安装产物已修复。
- title: 停止加载不可信仓库中的配置
  hint: 从可信工作目录运行 cdxgen，将待扫描仓库作为路径参数传入；或扫描前移除全部四个项目配置文件：.cdxgenrc、.cdxgen.json、.cdxgen.yml、.cdxgen.yaml。仅使用 --no-install-deps、secure 模式或 cdxgen-secure 无法阻止此漏洞。从 CDXGEN_ALLOWED_COMMANDS 移除 shell 只能阻断 dosai 路径。
- title: 保护输出文件并限制不可信解析任务
  hint: 用 -o 指定仓库外的输出路径，或扫描前移除仓库中的 bom.json 符号链接。修复前不要对不可信仓库运行 ai-skill／ai 扫描，服务端也应拒绝不可信客户端提交这些类型。可信工作目录的缓解仅处理项目配置加载，不能解决这些独立问题。
- title: 从网络边界限制 Git 目标
  hint: 修复前只允许无法重定向到任意目标的主机，或从网络层阻止扫描服务访问内网。仅设置 CDXGEN_GIT_ALLOWED_HOSTS 及 CDXGEN_SERVER_ALLOWED_HOSTS 无法检查 Git 重定向目标。修复后使用当前规范仓库 URL，因为带主机允许列表的 Git 请求会在重定向处停止。
- title: 复用凭据前调查可疑扫描
  hint: 保留 CI 日志及扫描的仓库修订。检查四个配置文件中的 dosaiCommand、scalasem-command、traceCmd、traceWritePaths、traceDisableNetwork、extends 和输出别名；检查 agents.py／tasks.py、bom.json 链接、异常子进程及 Git 目标。这些是攻击面及 PoC 痕迹，不是已确认攻击活动的 IoC；仅命中不能证明入侵。若确认代码执行，确定 CI 凭据暴露范围，从干净环境吊销、更换凭据并重建受影响产物。
sources:
- name: cdxgen 维护者公告：仓库配置命令执行
  says: '@cyclonedx/cdxgen >=12.0.0、<12.9.1 及 @cdxgen/cdxgen >=13.0.0 从工作目录加载不安全项目配置。控制仓库者可用扫描用户身份执行代码。'
- name: cdxgen 维护者公告：CrewAI 解析拒绝服务
  says: '@cyclonedx/cdxgen >=12.3.1、<12.9.1 及 @cdxgen/cdxgen >=13.0.0 使用平方复杂度正则同步解析恶意 CrewAI agents.py／tasks.py，可能阻塞 CLI 或 ai-skill／ai 服务端扫描。'
- name: cdxgen 维护者公告：输出符号链接文件破坏
  says: '@cyclonedx/cdxgen >=8.1.6、<12.9.1 及 @cdxgen/cdxgen >=13.0.0 跟随输出路径的符号链接，用生成的 BOM 覆盖可预测且可写的目标，而非写入攻击者任意指定的字节。'
- name: cdxgen 维护者公告：Git 重定向绕过主机允许列表
  says: '@cyclonedx/cdxgen >=11.2.5、<12.9.1 及 @cdxgen/cdxgen >=13.0.0 的 Git HTTP 重定向可绕过主机检查，前提是允许的主机能重定向到攻击者选择的目标。'
- name: cdxgen 12.9.1 发布记录
  says: 已发布的 12.x 版本；四项公告均将其列为修复版本。
- name: cdxgen 13.x 补丁 PR 4759
  says: 四项公告的源码修复；不能据此认定 13.7.0 包已发布。
---

11 月 6 日这批公告涉及扫描器处理不可信仓库时的信任边界，不代表已发布的 cdxgen 包遭投毒。维护者将命令执行及解析拒绝服务评为中危，将符号链接及重定向问题评为低危。本文评为 L3，依据是公开演示表明，攻击者控制的仓库可绕过安全工具声明的防护，在 CI 或开发者环境执行代码。尚无已确认的实际受害人数或在野利用。

cdxgen 从当前工作目录加载配置。公告说明四条执行路径：.NET 证据辅助程序接受 dosaiCommand；从 13.4.0 起，Scala 证据功能接受 scalasem-command；动态跟踪接受 traceCmd 及沙箱调整；yargs 18 在扫描器进程内加载 extends。最后一条路径涉及从 12.0.0 起使用 yargs 18 的版本。从另一个可信目录运行可避免加载目标仓库配置，但不能保证其他扫描操作均安全。

其余三项问题各有前提。CrewAI 解析可阻塞 Node.js 事件循环。输出路径末端的符号链接可破坏扫描用户可写的其他文件，包括 Node 权限模型路径之外的文件，但写入内容是生成的 BOM。Git 重定向要求允许列表中的主机能够重定向；未认证的服务端客户端可选择初始仓库 URL。这可能导致内网主机探测、内网仓库 SBOM 泄露或资源耗尽；在 secure 模式之外，配置中的 Git HTTP 请求头也可能发往重定向目标。

四项公告均将 @cyclonedx/cdxgen 12.9.1 列为修复版本。@cdxgen/cdxgen 13.x 尚未列出补丁版本，公告称修复将随 13.7.0 发布；核实时 13.7.0 发布页返回 404。不要将计划版本或已合并补丁当成可安装的修复产物。两个包名的受影响范围不同，且 13.x 处置仍待发布，因此不提供版本检查器。

补丁限制项目配置键，解析路径时处理符号链接，替换不安全的输出链接，采用有界解析，并在启用主机允许列表或 secure 模式时禁用 Git 重定向。此前捆绑 Node 的 Brotli 问题仍记录于 [Node.js 10 月事件](/zh/incidents/nodejs-oct-2026/)；这是独立漏洞，仅修复它不能解决本批问题。
