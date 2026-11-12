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
checklist:
- title: 检查并遏制支付页面改动
  hint: 将生产主题、插件、内联脚本和第三方资源与已知干净版本比对。以访客身份在隔离浏览器中用测试资料核验支付。若发现窃卡脚本，保留页面、网络及部署证据，暂停受影响的结账并与支付服务商协调。
- title: 排查已公布的网络指标
  hint: Guardio 的 Selected indicators 附录分七组列出 90 项。网络指标包括 kjhg[.]lol · ath.pleh[.]org · gentle-dew-e922.avsecurity.workers[.]dev (newusdt.png, /download/Pro*.dll) · fastly.jsdelivr[.]net/gh/Katy7684/ · fastly.jsdelivr[.]net/gh/sdedyk172/ · cdn.jsdelivr[.]net/gh/zor-876/futures-import@04e2419/llm · dc84406c-gei55kj16cf-d1fa3d9fc.fablegrid[.]cc/install.ps1 · swingerwives[.]com · escapeai[.]live/loader_v2.sh · t-trustrest[.]com/govnologi/ · cosmical2049[.]com · copiose[.]org · interseq[.]at · latoem[.]biz · ncheck-brows[.]beer · hagosuro[.]lc · gfisoda[.]biz · forecast-chaos[.]com · stand-medal[.]com · notion-brown[.]com · railroad-boot[.]com · great-basic[.]com · highlight-pyramid[.]com · basic-junior[.]com · cold-pyramid[.]com (September) · rehearsal-b[.]com · correspondabb[.]com · chordapple[.]com (October; some already in September) · hostpdf[.]co · zendlock[.]shop · ledon[.]pics · iresume[.]shop · jetmaster[.]wiki · globalstat[.]shop · gload[.]pics · hightraff[.]shop · homed[.]pics (g.php,
    r.php) · ymsi[.]my · phobosp[.]info · armedsurf[.]wiki · xincha[.]vip · habcd[.]cc · hiends[.]top · bidirect[.]shop · vsign[.]biz · dccome[.]app · resultip[.]cc · geotagcloud[.]shop · ministat[.]shop · hyperstat[.]shop · statmaster[.]shop (/cdn/) · streetmeriks[.]top · worldpixelwide[.]top · searchpixelstuff[.]top · variuspixel[.]top · fabulo[.]xyz (/api/accept-car) · google-api.hhos[.]net · lomivos[.]com · onlinestatus[.]site · gstatls[.]cc · pixelhaimer[.]top · jinoapi[.]com · bugsolve[.]net · speed-rankeer-east[.]com · visscoregate[.]com · securities-cdn[.]com · socket-connect[.]com · medianinfer[.]com · iostatic[.]net · llvechatinc[.]com · api.securesflare[.]com · cloud.protectionflare[.]com · api.cloudservicecon[.]com (TURN on 443)。哈希、合约及路径见附录。共享服务只匹配列出的具体路径或子域名，单独命中不能证明失陷。
- title: 恢复可信结账并处置用户暴露
  hint: 用可信代码重建，移除注入资源，调查入口及异常账户，轮换相关管理及部署凭据，核验外发请求后再开放。遵循支付服务商的事件指引。若在确认受影响的结账页输入过银行卡资料，请通过可信渠道联系发卡行。
sources:
- name: Guardio Labs CartJacked 报告
  says: 提供爬取样本估算、实际访问检查、受控测试卡抓取及指标。
---

这是多起实际观察到的攻击活动。约 12,200 家是根据 Common Crawl 10 月约 238 万家商店样本校正后的估算。63 家来自用 10 月样本代码运行的隔离测试，衡量测试资料被抓取，不能用来计算客户损失。Guardio 记录了伪造输入框替换正规支付框架、通过外部主机或浏览器存储收集资料，以及将命令复制到剪贴板的伪造验证提示。部分工具包会对已登录管理员隐藏伪造表单，应以访客身份测试。
