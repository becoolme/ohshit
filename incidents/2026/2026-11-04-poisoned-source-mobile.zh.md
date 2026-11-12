---
title: Poisoned Source 利用受侵网站、仿冒站及 Plerdy 脚本投递移动端利用链
summary: Sekoia 披露 Poisoned Source 通过网站、仿冒站及 Plerdy 8–9 月脚本事件投递已有补丁的 iOS／Android 利用链，以中高置信度关联 APT29。Plerdy 确认服务器及客户联系资料遭访问，但未发现访客失陷证据；感染人数未知。
splash: 访问攻击页面或 8 月 27 日至 9 月 3 日载入被篡改 Plerdy 代码的未更新移动设备；暴露不等于感染。
wipe: 更新移动系统及浏览器，保留网站／设备证据，核验脚本，从可信设备吊销暴露会话。
inTheWildNote: Sekoia 记录实际部署的利用投递，未提供确认的访客感染总数。
cves:
- name: A／B 类 WebKit 初始入口
  description: 已知且早已修补的漏洞，用于取得的移动利用链，不是新披露的零日。
- name: A 类指针认证绕过
  description: 已知且早已修补的漏洞，用于取得的移动利用链，不是新披露的零日。
- name: B 类指针认证绕过
  description: 已知且早已修补的漏洞，用于取得的移动利用链，不是新披露的零日。
- name: B 类沙箱逃逸第一步
  description: 已知且早已修补的漏洞，用于取得的移动利用链，不是新披露的零日。
- name: B 类沙箱逃逸第二步
  description: 已知且早已修补的漏洞，用于取得的移动利用链，不是新披露的零日。
- name: B 类内核提权
  description: 已知且早已修补的漏洞，用于取得的移动利用链，不是新披露的零日。
- name: C 类 Chrome 初始入口
  description: 已知且早已修补的漏洞，用于取得的移动利用链，不是新披露的零日。
- name: C 类 Android 提权
  description: 已知且早已修补的漏洞，用于取得的移动利用链，不是新披露的零日。
timeline:
- date: 2026年8月27日
  title: Plerdy 脚本被篡改窗口开始
- date: 2026年9月3日
  title: Plerdy 移除未授权跟踪代码
  body: 厂商称已更换服务器凭据，9 月 4 日重置全部密码并结束全部会话。
- date: 2026年11月4日
  title: Sekoia 披露更广的 Poisoned Source 活动
  body: 报告关联三类投递路径及取得的 iOS／Android 利用链；归因是中高置信度评估，不证明每名访客均已感染。
- date: 2026年11月6日
  title: Plerdy 更新公开回应
  body: 确认管理员凭据被盗、客户联系资料遭访问及此前重置，称未发现访客失陷，并可向客户提供技术指标。
- date: 2026年11月11日
  title: Report URI 公布另一投递域名及后续观察
  body: 研究人员在波兰网站的 WordPress 插件以及另一机构网站的 CMS 内容中发现加载器。
checklist:
- title: 更新移动操作系统及浏览器
  hint: 通过设备及浏览器官方渠道更新。Sekoia 观察到的投递配置为 iOS 16.7、iOS 18.5 和 Android Chrome 139–145（不含 143），不是通用影响／修复版本范围；取得的利用链均使用已修补漏洞。怀疑利用时联系安全团队，保留设备证据，从干净设备吊销暴露会话及凭据；不要推断仅访问即已窃密。
- title: 核验网站脚本及 Plerdy 回应
  hint: 清理前保留 8 月 27 日至 9 月 3 日的 HTML／JavaScript、哈希、时间、CDN／代理日志及设备网络证据。Plerdy 称当前构建已验证、无需移除；从浏览器开发工具检查实际请求，通过官方支持索取技术报告及域名清单。厂商于 9 月 4 日重置全部密码并结束会话；更改其他服务复用的密码，启用其邮箱验证码两步登录。
- title: 核查全部公开网络指标及两组哈希
  hint: 公开攻击者域名／IP：static.flux-telemetry.com (109.104.106.107), edge-ord.clouds-stacks.com (95.133.231.28), ad.starx-net.com (195.58.140.105), america250.holiday (192.121.46.25), theowo.club (188.190.17.232), adsprism-stat.com, ads-it-assets.com, cdn.adv-static.com, wpvortex-mod.com, assets-int.com，以及 uismart-asset[.]com。a.plerdy.com/public/js/click/main.js 是遭篡改的合法来源，不是攻击者拥有的 Plerdy 域名。核查 /module/5b4c8fea5cbcee273e8d830f52-temfp.js、/api/uGmlx2pmMHU1jq7wZU2QWgeC28vbXalf/v1、/api/<NONCE>/v1–v3、8881 端口 /telemetry/v12 及 VDGH_TOKEN_REF。完整报告公开 13 个不同 SHA256：指标表九个及正文另四个不同变体，两组均须使用，不能假设每阶段只有一个哈希。另有未公开指标，因此这是完整公开集，不是完整活动覆盖；命中或载入跟踪脚本不证明已利用。
sources:
- name: Sekoia 的 Poisoned Source 原始调查
  says: 11 月 4 日更广活动报告：三类路径、八个实际使用的 CVE、观察到的配置、全部公开网络／13 个哈希指标及归因置信度；部分基础设施未公开。
- name: Plerdy 原始回应，11 月 6 日更新
  says: 确认 8–9 月服务器及脚本事件、客户联系资料、9 月 4 日密码／会话重置，称无已知访客失陷、当前构建已验证并可提供技术报告。
- name: Report URI 后续调查
  says: 公布新增投递域名、WordPress 和 CMS 观察结果，以及向 CISA 报告的情况。
---

11 月 4 日披露的是更广活动；Plerdy 此前组件公告不代表 11 月发生新入侵。其脚本只是投递路径之一，另有直接注入及仿冒反向代理。由于该主机已离线，Sekoia 按相同文件名及重定向推断 Plerdy 指纹脚本关联；Plerdy 称无已知访客失陷。数百／数千个载入跟踪脚本的网站是暴露估计，不是感染设备数；归因仍是 Sekoia 评估。未确立最终受害者总数或确认盗卡。L4 依据是实际部署的利用投递；完整更新的设备不受取得的这些已知漏洞链影响，不代表免疫全部攻击。

Report URI 在 10 月存档中发现，波兰一个 WordPress 网站的插件文件被修改，从 uismart-asset[.]com 加载同一路径的指纹识别脚本。研究人员称该网站已清理。其扫描记录还显示，一个美国化工行业机构的网站在 9 月 2 日、9 月 21 日及 10 月 31 日加载了同一指纹识别脚本。11 月 5 日，加载器仍在 CMS 内容中，研究人员已通知 CISA。这证实另一投递域名和持续的网站暴露，尚不能据此确认设备感染，也没有延长早先 Plerdy 脚本失陷的时间窗口。
