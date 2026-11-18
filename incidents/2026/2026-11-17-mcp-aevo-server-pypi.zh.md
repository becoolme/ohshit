---
title: 恶意 mcp-aevo-server 包窃取 Aevo 凭据及钱包私钥
tags: [PyPI, 恶意软件, MCP, 加密资产]
summary: 研究人员发现六个恶意 mcp-aevo-server 版本，利用未被注册的 PyPI 包名针对 Aevo 交易工具用户。分析发现凭据外传及远程命令功能。未公布修复版或已确认的受害、损失总量；应停止服务器，并从干净系统替换暴露的凭据。
splash: 运行了所列 mcp-aevo-server 版本的主机或 CI 任务，尤其是环境中含 Aevo API 凭据或钱包私钥的实例。
wipe: 停止并隔离受影响服务器，通过干净工具移除恶意包、重建环境，吊销 API 凭据并替换暴露的钱包密钥。
inTheWildNote: 已识别恶意发布版本；实际受害者执行情况及损失尚未量化。
cves:
- name: 恶意 mcp-aevo-server 分发
  description: 报告指出，该包针对未注册的依赖名称，外传环境凭据，并包含后台远程命令监听线程。
fixed:
- product: mcp-aevo-server 0.2.0、0.2.0.post1、post2、post3、post4 及 post6
  status: 恶意版本；未列出修复版
timeline:
- date: 11月17日 14:45 UTC
  title: 研究目录记录恶意包
  body: MAL-2026-20068 列出六个受影响版本。这是披露或目录时间，不是已确定的攻击起始时间。
- date: 11月18日 00:32 UTC
  title: OpenSSF 记录纳入 Amazon Inspector 分析
  body: 记录修订说明服务器启动时收集凭据、Telegram 外传、可选遥测 URL 及磁盘队列重试，并给出 post1 制品证据。
checklist:
- title: 停止服务器，再处理受影响环境
  hint: 停止 MCP 服务器、智能体及依赖任务，隔离主机或运行器，保留日志及包证据。检查锁文件、环境元数据、MCP 启动命令及 CI 定义中的 mcp-aevo-server，不要启动包。标记版本准确为 0.2.0、0.2.0.post1、0.2.0.post2、0.2.0.post3、0.2.0.post4、0.2.0.post6；未列出的版本不因此被证明安全。已记录的触发点是服务器启动，尚未证明仅安装就触发。
- title: 从干净系统替换暴露的凭据和钱包密钥
  hint: 检查传给进程的 AEVO_API_KEY、AEVO_API_SECRET、AEVO_SIGNING_KEY_PRIVATE_KEY、AEVO_WALLET_PRIVATE_KEY。通过服务既有渠道吊销并换发 API 凭据；暴露的钱包私钥应视为失密，通过可信工具将剩余资产转移到安全新生成的钱包。检查权限、交易及转账，并轮换远程受控进程能够访问的其他凭据。这些是处置建议，不代表已证明某个账户损失资金。
- title: 重建环境并移除恶意依赖路径
  hint: 通过干净工具从依赖和 MCP 或智能体启动配置中移除此包，然后使用审查过的来源与制品重建环境。不要启动恶意服务器来卸载或测试。报告指出，目标为引用未注册 PyPI 包名的 ribbon-finance/aevo-trading-skills 用户；应核验包归属与仓库引用，不能仅信熟悉的项目名称。尚未确立安全替代版本。AEVO_TELEMETRY=0 不是恢复方案，无法撤销此前泄露或远程命令。
- title: 结合进程上下文排查已公布的样本证据
  hint: 详细报告列出 src/mcp_aevo_server/_telemetry.py、main() 调用 _telemetry.arm()、api.telegram.org/bot8867174343:.../sendMessage 及聊天 8838719553，另有可配置的 AEVO_TELEMETRY_URL 和磁盘队列重试。原文已隐去 bot 令牌。将 Telegram 请求与受影响进程、bot 和聊天标识关联；共用域名 api.telegram.org 本身不是恶意指标。post1 遥测文件 SHA-256 为 8e8a5a24dc15128554984123aa90662fc6a06d0c507e1375ef948e4f02bee299，TLSH 为 05328359fd5a6c33c253c56dc822c561e33a79073a41a934faac43296f5e03982fd6ec。mcp_aevo_server-0.2.0.post1-py3-none-any.whl 的 SHA-256 为 e1d7c618697ec9160ac82314e2845ee2af80b7023bbd2a6fe192ae60d0cc458d、MD5 为 b7fc9ab6309f85d55c3a96af4027c378、BLAKE2b-256 为 c9aa2f56b7c605c932f947fca7679e0000a98971afd4ecc44a007b15681d789b；mcp_aevo_server-0.2.0.post1.tar.gz 的 SHA-256 为 4540499b3cf6261c04b5cd3f7b31786fa2b52e400df29f30f6b1aff7bad87d8f、MD5 为 1d1f9207b19f14ad7816a69f9fbc9d77、BLAKE2b-256 为 b5a65577f6349096b97cde77cf0c328129b441afa700df6ac7a61eaa84fa7323。这些指纹覆盖报告样本，不覆盖所有版本。OpenSSF 的来源报告摘要不是包制品哈希。网络或文件命中本身不能证明执行或账户失陷。
sources:
- name: Kamil Mańkowski 原始包报告
  says: 识别目标项目、未注册包名路径、六个受影响版本、环境变量窃取、Telegram 使用及命令集合尚不明确的远程命令线程。
- name: 含 Amazon Inspector 分析的 OpenSSF 记录修订
  says: 保留最初披露时间，并加入启动、凭据、Telegram、重试行为及 post1 证据；来源元数据摘要标识报告，不是恶意制品。
- name: GitHub 恶意软件公告
  says: 列出同样六个版本，未列修复版，并链接两个 OpenSSF 修订。这是研究报告转载，不是受害损失的独立确认。
---

Kamil Mańkowski 报告称，此 PyPI 包针对 ribbon-finance/aevo-trading-skills 用户，该项目曾引用未注册的包名。此次发现涉及恶意分发，并非已确认 Aevo 交易所基础设施或合法项目仓库遭入侵。报告识别了凭据外传及远程命令线程，命令可能仅限特定集合；未确立不受限的 shell 控制，也未公布受害者数量或已确认的被盗资金总额。

GitHub 所链接 OpenSSF 修订保留的 Amazon Inspector 分析说明，服务器启动时 main() 调用 _telemetry.arm()，收集 Aevo API 凭据、钱包或签名私钥、主机名、系统用户、工作目录、启动参数及以 AEVO_ 或 UV_ 开头的环境变量名称。默认发送完整凭据值，作为明文消息内容传给 Telegram bot；这不代表 HTTPS 传输本身未加密。配置的遥测 URL 接收同样数据，磁盘队列允许跨重启重试。将代码称为遥测不能使此收集行为变得无害。

post1 的详细文件和制品指纹不代表每个被标记版本拥有相同字节或行为。当前评为 L3，是因为已经发布的恶意集成能暴露交易和钱包凭据，但部署范围及已确认受害影响仍未知。下载或发现包，不能证明服务器已运行或凭据已被盗；若进程确实携带这些凭据运行，应按上述步骤遏制和替换。
