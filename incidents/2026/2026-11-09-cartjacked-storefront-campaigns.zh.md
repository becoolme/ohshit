---
title: CartJacked 研究证实电商页面存在窃卡脚本和恶意软件诱饵
summary: Guardio 在失陷电商网站观察到实际运行的注入脚本、伪造支付表单和 ClickFix 诱饵。研究估算 10 月爬取样本约有 12,200 家商店遭劫持。隔离测试中，63 家 10 月样本商店的代码抓取了测试卡。研究未统计实际被盗客户卡。
splash: 遭入侵的电商页面，包括加载窃卡脚本的结账页和展示伪造验证提示的店铺页面。
wipe: 以访客身份检查店铺和结账页，遏制可疑脚本，并在重新开放前核验恢复后的支付流程。
inTheWildNote: Guardio 观察到实际运行的恶意代码，并用测试资料复现卡信息被抓取。
timeline:
- date: 2026年11月9日
  title: Guardio 发布 CartJacked 调查
  body: 报告分别给出爬取样本估算、实际访问观察及隔离结账测试。
- date: "2026年11月12日"
  title: "Ohey 披露 RTCGnaw 支付窃取脚本细节"
  body: "11 月 12 日的统计记录了自 9 月 4 日起观测到的 26 个受影响站点，其中两个相关主机也出现在 CartJacked 的附录中。"
checklist:
- title: 检查并遏制支付页面改动
  hint: 将生产主题、插件、内联脚本和第三方资源与已知干净版本比对。以访客身份在隔离浏览器中用测试资料核验支付。若发现窃卡脚本，保留页面、网络及部署证据，暂停受影响的结账并与支付服务商协调。
- title: 排查已公布的网络指标
  hint: Guardio 的 Selected indicators 附录分七组列出 90 项。网络指标包括 kjhg[.]lol · ath.pleh[.]org · gentle-dew-e922.avsecurity.workers[.]dev (newusdt.png, /download/Pro*.dll) · fastly.jsdelivr[.]net/gh/Katy7684/ · fastly.jsdelivr[.]net/gh/sdedyk172/ · cdn.jsdelivr[.]net/gh/zor-876/futures-import@04e2419/llm · dc84406c-gei55kj16cf-d1fa3d9fc.fablegrid[.]cc/install.ps1 · swingerwives[.]com · escapeai[.]live/loader_v2.sh · t-trustrest[.]com/govnologi/ · cosmical2049[.]com · copiose[.]org · interseq[.]at · latoem[.]biz · ncheck-brows[.]beer · hagosuro[.]lc · gfisoda[.]biz · forecast-chaos[.]com · stand-medal[.]com · notion-brown[.]com · railroad-boot[.]com · great-basic[.]com · highlight-pyramid[.]com · basic-junior[.]com · cold-pyramid[.]com (September) · rehearsal-b[.]com · correspondabb[.]com · chordapple[.]com (October; some already in September) · hostpdf[.]co · zendlock[.]shop · ledon[.]pics · iresume[.]shop · jetmaster[.]wiki · globalstat[.]shop · gload[.]pics · hightraff[.]shop · homed[.]pics (g.php,
    r.php) · ymsi[.]my · phobosp[.]info · armedsurf[.]wiki · xincha[.]vip · habcd[.]cc · hiends[.]top · bidirect[.]shop · vsign[.]biz · dccome[.]app · resultip[.]cc · geotagcloud[.]shop · ministat[.]shop · hyperstat[.]shop · statmaster[.]shop (/cdn/) · streetmeriks[.]top · worldpixelwide[.]top · searchpixelstuff[.]top · variuspixel[.]top · fabulo[.]xyz (/api/accept-car) · google-api.hhos[.]net · lomivos[.]com · onlinestatus[.]site · gstatls[.]cc · pixelhaimer[.]top · jinoapi[.]com · bugsolve[.]net · speed-rankeer-east[.]com · visscoregate[.]com · securities-cdn[.]com · socket-connect[.]com · medianinfer[.]com · iostatic[.]net · llvechatinc[.]com · api.securesflare[.]com · cloud.protectionflare[.]com · api.cloudservicecon[.]com (TURN on 443)。哈希、合约及路径见附录。共享服务只匹配列出的具体路径或子域名，单独命中不能证明失陷。
- title: 恢复可信结账并处置用户暴露
  hint: 用可信代码重建，移除注入资源，调查入口及异常账户，轮换相关管理及部署凭据，核验外发请求后再开放。遵循支付服务商的事件指引。若在确认受影响的结账页输入过银行卡资料，请通过可信渠道联系发卡行。
- title: "排查支付流量中的 RTCGnaw"
  hint: "查阅 Ohey 公布的完整指标，包括 14 个在链上存放载荷的合约和浏览器指标。网络指标包括 systmshield[.]com · threatblck[.]com · defendsstm[.]com · guardsstm[.]com · contentprotectiongate[.]com · cdn[.]api-middle-connect[.]com/metrics · tawoauth[.]com/chat · scomper[.]store/sslsocket · mouseflow[.]nexus/connection · woocompay[.]com/assets · wpguarding[.]com/system · api[.]cloudservicecon[.]com · cloud[.]protectionflare[.]com · 185[.]141[.]27[.]56:3479 · 103[.]141[.]13[.]26:3479。检查结账流量中的 WebRTC 数据通道和信标请求，再结合报告列出的脚本特征和支付日志核对。信标载荷按敏感数据处理，确认失陷前需有其他证据印证。"
sources:
- name: Guardio Labs CartJacked 报告
  says: 提供爬取样本估算、实际访问检查、受控测试卡抓取及指标。
- says: "记录了观测到的站点、虚假结账行为、重叠的基础设施及指标。"
---

这是多起实际观察到的攻击活动。约 12,200 家是根据 Common Crawl 10 月约 238 万家商店样本校正后的估算。63 家来自用 10 月样本代码运行的隔离测试，衡量测试资料被抓取，不能用来计算客户损失。Guardio 记录了伪造输入框替换正规支付框架、通过外部主机或浏览器存储收集资料，以及将命令复制到剪贴板的伪造验证提示。部分工具包会对已登录管理员隐藏伪造表单，应以访客身份测试。

Ohey 截至 11 月 12 日观测到自 9 月 4 日起共有 26 个站点提供 RTCGnaw 脚本，其中 16 个出现在此前 30 天内。这批观测与 Guardio 的爬取估算和受控测试分别统计。两份报告列出了两个相同的主机。Ohey 在不同店铺记录到了仿 Stripe 和仿 Poynt 的表单。伪造的付款失败提示可让窃取脚本暂停 15 分钟，用户重试时可能通过正常流程付款。排查时将用户报告的失败与支付处理商的交易记录对照，并检查 WebRTC 数据通道，或部分变种所用的带 p 和 t 参数的图片信标。
