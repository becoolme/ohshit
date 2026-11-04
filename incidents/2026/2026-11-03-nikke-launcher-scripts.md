---
title: NIKKE PC launcher scripts linked to remote-access malware; client fix does not clean infected PCs
level: 3
date: '2026-11-03'
updated: '2026-11-04'
tags:
- NIKKE
- Supply chain
- Credentials
summary: A researcher reports malicious code in four official NIKKE PC launcher scripts and remote-access payload execution. The operator acknowledges possible script tampering and reports a client update. A November 4 researcher recheck found the four known CDN assets clean, while stale caches and existing infections still need cleanup; victim scope is unknown.
splash: NIKKE PC launcher users; researcher reports Windows and Linux/Steam Deck through Proton exposure, not mobile-app impact.
wipe: Keep the launcher closed while checking exposure; verify official remediation, preserve evidence, clear stale cache and replace exposed secrets.
inTheWild: disputed
inTheWildNote: Researcher reports infection; operator acknowledges possible tampering, scope unclear.
timeline:
- date: Sep 27, 2026
  title: Modified launcher files carry September timestamps
  body: The researcher derives these dates from CDN file headers; this is not the public disclosure date.
- date: Oct 23, 16:40 UTC
  title: Earliest agent start reported to the researcher
  body: A commenter’s logs are reported evidence, not a vendor-confirmed campaign start.
- date: Nov 3, 16:57 UTC
  title: Researcher publishes the technical report
  body: GitHub Gist metadata records publication; analysis uses files, caches, logs and static payload inspection.
- date: Nov 3, 2026
  title: Operator reports a client update around 17:30 UTC
  body: The public official notice says November 4 around 02:30 UTC+9. No fixed launcher version is specified.
- date: Nov 3, 22:26 UTC
  title: Researcher still observes a modified CDN copy
  body: Two CDN servers still served FeedList after the stated client-update time; a client fix is not proof of a complete CDN purge.
- date: Nov 4, 2026
  title: Official notice acknowledges possible third-party script tampering
  body: The accessible public embed establishes this acknowledgment and the update time; the full notice was not readable during this check.
- date: Nov 4, 07:14–07:20 UTC
  title: Researcher rechecks all four known official assets and finds clean responses
  body: WormW reports clean bodies from the four URLs and both canonical and cache-busting FeedList requests. This is a bounded observation, not proof that every CDN edge, client cache or infected host is clean.
checklist:
- title: Stop the launcher and preserve evidence before cleanup
  hint: Close the launcher, including its tray process; disconnect a suspected infected machine. Preserve Launcher/intl_service/debug.log, Launcher/log/tinyget and the launcher cache before deleting or reinstalling anything. The report says updates and server shutdown do not undo prior remote access.
- title: Hunt the published network and local indicators
  hint: 'The report lists over 30 indicator values and 264 targeted credential/config paths; use its complete Indicators of compromise and target-paths.md sections. Network indicators: insightjs.com; analytics.insightjs.com; insightjs.org; 89.127.233.127; 89.126.250.172; https://insightjs.com/l.js?f=aegis; https://insightjs.com/l.js?f=images; https://insightjs.com/l.js?f=feedlist; https://insightjs.com/l.js?f=vue; https://analytics.insightjs.com/comm/assets/insight.bundle; https://analytics.insightjs.com/px/<32 hex>. Modified official URLs: https://sg-gpts.playerinfinite.com/comm/assets/lib/aegis-fix.min.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/images.7fec4c32.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/FeedList.feb647c9.js; https://na-webassets.playerinfinite.com/comm/assets/lib/vue-bucket.min.js. CDN nodes 43.175.144.148 and 43.175.145.181 served stale modified copies; they are shared delivery nodes, not proof of attacker ownership. insightjs.org was subsequently registered by a third party as a warning site. WormW’s expanded list has over 100 indicator rows; consult its full iocs/iocs.csv for hashes, ETags and local artifacts. Additional network hunting pivots: portal.insightjs.com; docs.insightjs.com; https://insightjs.org/l.js; https://analytics.insightjs.com/px/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>; POST /speed; hooks.slack.com/(services|workflow|triggers). Bare /collect/<32 hex> is reported as a decoy; Slack and official CDN traffic may be legitimate. Search debug.log for k2f_chan registered, Local Storage for k2f.agent.state, and Windows for the HKCU CLSID and DLL below. A match needs context and does not alone prove compromise; missing hashes, DNS or log entries do not establish safety.'
- title: Remove Windows persistence in the documented order or rebuild
  hint: 'After preserving evidence, follow the researcher’s cleanup: remove only HKCU\Software\Classes\CLSID\{E77CC89B-7401-4C04-8CED-149DB35ADD04}, restart Windows, then remove the 64-hex subfolder containing platform_experience_helper.dll under %LOCALAPPDATA%\Google\Chrome\User Data\PlatformExperienceHelper. Leave the normal HKLM CLSID and the normal PlatformExperienceHelper parent folder. The DLL can stay locked until restart and has victim-specific hashes. Because arbitrary commands were possible, rebuilding from trusted media is the safer option when compromise is suspected; a clean antivirus result is insufficient.'
- title: Replace secrets and revoke sessions from a clean device
  hint: For suspected infection, change NIKKE/Level Infinite and other exposed account passwords, terminate active sessions, and revoke/reissue API tokens, SSH keys and developer/cloud credentials. If a wallet seed may be exposed, move assets using a clean device to a newly generated wallet. Static capability does not prove every listed secret or wallet was actually stolen. Proton exposes host-readable files and environment variables; absence of Windows Chrome persistence does not make a Linux host safe.
- title: Verify the official update and clear stale cache before resuming
  hint: Check current official NIKKE notices and remediation before reopening. After preserving evidence, clear %APPDATA%\nikke_launcher\tbs_cache, including the corresponding path inside a Proton prefix, as the researcher recommends. Check launcher and proxy caches against the historical hashes/ETags in WormW’s attack-path report and full indicator CSV. Its November 4 07:14–07:20 UTC recheck found the four known assets clean, but cannot establish every edge or cache is clean; the reported client update has no published version threshold here. Cache removal or updating the launcher does not remove preexisting malware or stolen sessions.
sources:
- name: MotherSphere original technical report and indicator list
  url: https://gist.github.com/MotherSphere/d6c049a09ba8ac3085c51ee9df24a4e5
  primary: true
  says: Full original report read through the public GitHub Gist API. Separates own-host/static analysis from commenter reports; lists CDN cache observations, indicators and cleanup corrections.
- name: NIKKE official notice, public embed excerpt
  url: https://publish.twitter.com/oembed?url=https%3A%2F%2Fx.com%2FNIKKE_en%2Fstatus%2F2117817602659770434&omit_script=true
  primary: true
  says: Readable official excerpt acknowledges possible PC script tampering and a November 4 02:30 UTC+9 client fix. Direct X page returned 403; the embed truncates the remainder, which is not treated as read.
- name: MotherSphere public GitHub Gist API original-content copy
  url: https://api.github.com/gists/d6c049a09ba8ac3085c51ee9df24a4e5
  primary: true
  says: Full English file content and UTC creation metadata actually read; the same origin as the original report, not independent corroboration.
- name: WormW original sample analysis and current-asset recheck
  url: https://raw.githubusercontent.com/WormW/nikke_malware_analysis/main/docs/en/attack-path.md
  primary: true
  says: November 4 07:14–07:20 UTC recheck found all four known assets clean; documents historical poisoned copies, current hashes and cache limits. Original delivery observations are attributed to MotherSphere and third-party reports.
- name: WormW full indicator CSV
  url: https://raw.githubusercontent.com/WormW/nikke_malware_analysis/main/iocs/iocs.csv
  primary: true
  says: Over 100 indicator rows with confidence labels, including historical hashes and ETags, network patterns and local artifacts; shared services and historical indicators need context.
---

The November 3 original analysis reports four altered JavaScript files on Level Infinite’s official CDN loading an external script, which used the PC launcher’s embedded Chromium bridge to download a LuaJIT remote-access agent. The researcher analyzed one affected machine and static payload code, and labels additional users’ observations as reported evidence. Commands could read files, execute programs and capture screenshots; the analysis also identifies browser/credential theft capabilities and a Windows Chrome persistence path. Capability is not proof that every secret was stolen. No victim total or confirmed aggregate wallet loss is established.

The operator’s readable official excerpt acknowledges possible third-party script tampering and dates a client fix to November 4 around 02:30 UTC+9 (November 3 17:30 UTC). The researcher still observed a modified FeedList script on two CDN nodes at November 3 22:26 UTC. WormW subsequently reports that all four known official assets returned clean bodies during its November 4 07:14–07:20 UTC recheck, including both canonical and cache-busting FeedList requests. It cannot fully distinguish origin from intermediate cache state. These statements concern different layers: client updates, origin cleanup, CDN caches and already infected hosts. Do not treat the notice as proof that every cached copy or infected machine is clean. The full official notice remained inaccessible; no claims are made about its unread portion.

The report corrects earlier advice: the PlatformExperienceHelper parent is legitimate Chrome content, and onominan.tmp is not an infection marker. The attacker’s initial CDN/publishing access remains unknown. Mobile clients are outside the cited analysis, not proved unaffected. L3 reflects a widely used launcher and documented malicious distribution, while operator-confirmed execution scope is still unresolved.
