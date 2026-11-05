---
title: NIKKE confirms PC launcher tampering; client fix does not clean infected PCs
level: 3
date: '2026-11-03'
updated: '2026-11-05'
tags:
- NIKKE
- Supply chain
- Credentials
summary: Level Infinite confirms third-party tampering in NIKKE Windows launcher files and asks users who launched since September 27 to check their PCs. Official manual and ACE cleanup guidance is available. Mobile is unaffected according to the vendor; its malware-start date differs from researcher logs, and victim scope remains unknown.
splash: NIKKE Windows launcher users since September 27; researchers also report Proton exposure. Vendor says mobile is unaffected.
wipe: Keep the launcher closed while checking exposure; verify official remediation, preserve evidence, clear stale cache and replace exposed secrets.
inTheWild: 'yes'
inTheWildNote: Vendor confirms tampering; execution and victim scope remain under investigation.
timeline:
- date: Sep 27, 2026
  title: Modified launcher files carry September timestamps
  body: The researcher derives these dates from CDN file headers; this is not the public disclosure date. The November 4 vendor follow-up dates domain hijacking to 01:59 UTC and script tampering to 06:41 UTC; the initial intrusion mechanism remains under investigation.
- date: Oct 23, 16:40 UTC
  title: Earliest agent start reported to the researcher
  body: A commenter’s logs are reported evidence, not a vendor-confirmed campaign start.
- date: Oct 29, 18:52 UTC
  title: Vendor’s stated start of malicious-program distribution
  body: Its November 4 retrospective gives October 30 03:52 UTC+9. This is later than the researcher-reported October 23 execution logs; the discrepancy remains unresolved and does not exclude earlier exposure.
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
  body: Only a public embed excerpt of the initial notice was readable at first verification. The full follow-up and manual guidance have since been read separately, below.
- date: Nov 4, 2026
  title: Full vendor follow-up confirms tampering and offers manual and client cleanup
  body: It asks Windows users who launched since September 27 06:41 UTC to check, and says mobile is unaffected. ACE was announced from November 4 23:00 UTC with consent to delete logs, DLLs and registry entries; deployment or compensation completion was not independently tested.
- date: Nov 4, 03:09 UTC
  title: Vendor reports refreshing the remaining script’s CDN cache
  body: The notice gives 12:09 UTC+9, followed by gradual corrected-file rollout to CDN nodes; this does not establish clean client caches or infected hosts.
- date: Nov 4, 07:14–07:20 UTC
  title: Researcher rechecks all four known official assets and finds clean responses
  body: WormW reports clean bodies from the four URLs and both canonical and cache-busting FeedList requests. This is a bounded observation, not proof that every CDN edge, client cache or infected host is clean.
- date: Nov 4, 11:20 UTC
  title: Original researcher finds clean assets on four checked CDN nodes
  body: MotherSphere’s 12:11 GMT report says the four known files were clean on four checked nodes for both hosts. It reports stale FeedList delivery through 00:48 UTC and clean copies on those nodes by 03:12–03:21 UTC; other edges and infected hosts remain unverified.
- date: Nov 4, 13:39 UTC
  title: Researcher releases an optional local evidence checker
  body: GitHub release metadata dates NIKKE Launcher Check v0.5.1. The researcher describes read-only local checks; a negative scan is not proof of safety. Scan or preserve cache evidence before deleting it.
- date: Nov 4, 22:40 UTC
  title: Evidence checker corrects startup-failure handling and Google Play Games process detection
  body: Release metadata dates v0.5.2 to 22:40:34 UTC; the author adds an agent-loaded-but-startup-failed verdict. The tool is not independently audited and does not replace cleanup.
- date: Nov 4, 23:18 UTC
  title: Original report expands launcher variants, cache checks and failed-start limits
  body: This report revision includes user-reported Google Play Games exposure, HMT/Google cache paths and the rebuilt front-end. FeedList retains its URL; a UTF-8 startup failure after k2f_chan does not establish non-execution. Full scope remains unconfirmed.
checklist:
- title: Stop the launcher and preserve evidence before cleanup
  hint: Close the launcher, including its tray process; disconnect a suspected infected machine. Preserve Launcher/intl_service/debug.log, Launcher/log/tinyget and the launcher cache before deleting or reinstalling anything. The report says updates and server shutdown do not undo prior remote access. Keep an untouched private evidence copy. Before publicly sharing logs, redact Cookie lines and login_ticket, biz_ticket, uid, openid and sig values in tinyget.mem.log and dated tinyget API requests; path= may expose your Windows username. Also close nikke_launcher_google.exe for the Google Play Games variant. If the launcher used another account’s administrator credentials, also check that account’s %APPDATA%, %TEMP% and HKCU persistence key, not only the everyday account. The official manual also asks users to close the NIKKE game and Chrome. ACE cleanup deletes associated logs, so preserve private evidence before using it.
- title: Optionally inspect preserved evidence with the researcher’s checker
  hint: The original report links https://github.com/MotherSphere/NIKKE-Launcher-Check. Its README describes local checks on Windows, Linux/Proton and macOS/Wine, with no network access or cleanup; these are author claims, not an independent audit. Use the original project’s release and SHA256SUMS.txt to check the download. Run evidence checks before deleting tbs_cache, or retain a private copy. Enable Hide my info or --redact before sharing the report. No traces found only describes the paths checked; keep the manual checks and cleanup below. No tool was executed for this article. v0.5.2 improves Google Play Games process detection and startup-failure verdicts, and limits temporary-file counts to k2f-/k2f_ names; using the tool remains optional.
- title: Hunt the published network and local indicators
  hint: 'The report lists over 30 indicator values and 264 targeted credential/config paths; use its complete Indicators of compromise and target-paths.md sections. Network indicators: insightjs.com; analytics.insightjs.com; insightjs.org; 89.127.233.127; 89.126.250.172; https://insightjs.com/l.js?f=aegis; https://insightjs.com/l.js?f=images; https://insightjs.com/l.js?f=feedlist; https://insightjs.com/l.js?f=vue; https://analytics.insightjs.com/comm/assets/insight.bundle; https://analytics.insightjs.com/px/<32 hex>. Modified official URLs: https://sg-gpts.playerinfinite.com/comm/assets/lib/aegis-fix.min.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/images.7fec4c32.js; https://na-webassets.playerinfinite.com/comm/nikke_launcher/assets/FeedList.feb647c9.js; https://na-webassets.playerinfinite.com/comm/assets/lib/vue-bucket.min.js. CDN nodes 43.175.144.148 and 43.175.145.181 served stale modified copies; they are shared delivery nodes, not proof of attacker ownership. insightjs.org was subsequently registered by a third party as a warning site. WormW’s expanded list has over 100 indicator rows; consult its full iocs/iocs.csv for hashes, ETags and local artifacts. Additional network hunting pivots: portal.insightjs.com; docs.insightjs.com; https://insightjs.com/l.js; https://insightjs.org/l.js; https://analytics.insightjs.com/px/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>.<kind>; https://analytics.insightjs.com/collect/<32 hex>; insightjs.com POST /speed; hooks.slack.com/(services|workflow|triggers). Bare /collect/<32 hex> is reported as a decoy; 89.126.250.172 is a reported address, not independently verified by this research. /speed is a facade-beacon pivot; Slack and official CDN traffic may be legitimate. Search debug.log for k2f_chan registered, Local Storage for k2f.agent.state, and Windows for the HKCU CLSID and DLL below. A match needs context and does not alone prove compromise; missing hashes, DNS or log entries do not establish safety. The revised original also lists shared CDN node 43.175.139.78, temporary %TEMP%\k2f-keyscan-<time>-<rand>.db and %TEMP%\k2f_screen_<unix time>_<n>.png for an older reported build; current temporary database/screenshots use %TEMP%\k2f-bcreds-<unix time>-<random>.db and %TEMP%\k2f_screen_<unix time>_<n>.jpg. Agent state may also be in compressed Local Storage leveldb .ldb files; preserve them. Use the original report for the added historical payload hashes and seven ETags. Shared CDN addresses are not attacker ownership indicators. Additional sg-gpts script URLs: https://sg-gpts.playerinfinite.com/comm/nikke_launcher/assets/images.7fec4c32.js; https://sg-gpts.playerinfinite.com/comm/nikke_launcher/assets/FeedList.feb647c9.js; https://sg-gpts.playerinfinite.com/comm/assets/lib/vue-bucket.min.js. Another checked shared CDN node is 43.152.43.115. Warning-site insightjs.org resolves through Cloudflare 104.21.35.173 and 172.67.178.16; these are not attacker-IP or blanket-block indicators. Original-research verified historical malicious SHA-256 values are 04471ccf9f6ebac477ba4ca6b408a56621bccd16118c3112720adb35e6422e3d for aegis and 21d2fa4b6cdd15da3d5246687a01ef84fb848668144258b110606db5eb5ea7ce for images. Code Cache entries retain only keys, timestamps and short markers, not recoverable l.js; HTTP Cache scripts may be gzip-encoded and missed by plain-text searches. In tinyget, AddTask is only a request; confirm a completed download with curl perform success and OnDownloadResult result=0 with a nonzero total for the same task. curl_error, result=2 and total=0 mark that failed attempt, not a completed download; this does not exclude another run or cached payload.'
- title: Remove Windows persistence in the documented order or rebuild
  hint: 'After preserving evidence, follow the researcher’s cleanup: remove only HKCU\Software\Classes\CLSID\{E77CC89B-7401-4C04-8CED-149DB35ADD04}, restart Windows, then remove the 64-hex subfolder containing platform_experience_helper.dll under %LOCALAPPDATA%\Google\Chrome\User Data\PlatformExperienceHelper. Leave the normal HKLM CLSID and the normal PlatformExperienceHelper parent folder. The DLL can stay locked until restart and has victim-specific hashes. Because arbitrary commands were possible, rebuilding from trusted media is the safer option when compromise is suspected; a clean antivirus result is insufficient. The new official manual uses the same HKCU, restart, then target-64-hex-folder order; do not delete namesake keys elsewhere or the Chrome parent folder.'
- title: Replace secrets and revoke sessions from a clean device
  hint: For suspected infection, change NIKKE/Level Infinite and other exposed account passwords, terminate active sessions, and revoke/reissue API tokens, SSH keys and developer/cloud credentials. If a wallet seed may be exposed, move assets using a clean device to a newly generated wallet. Static capability does not prove every listed secret or wallet was actually stolen. Proton exposes host-readable files and environment variables; absence of Windows Chrome persistence does not make a Linux host safe.
- title: Verify the official update and clear stale cache before resuming
  hint: Check current official NIKKE notices and remediation before reopening. After preserving evidence, clear %APPDATA%\nikke_launcher\tbs_cache, including the corresponding path inside a Proton prefix, as the researcher recommends. Check launcher and proxy caches against the historical hashes/ETags in WormW’s attack-path report and full indicator CSV. Its November 4 07:14–07:20 UTC recheck found the four known assets clean, but cannot establish every edge or cache is clean; the reported client update has no published version threshold here. Cache removal or updating the launcher does not remove preexisting malware or stolen sessions. MotherSphere’s later 11:20 UTC check found those four files clean on four nodes for both hosts; keep the published malicious domains/IPs blocked because the initial publishing-access route remains unknown. Also preserve then clear %APPDATA%\nikke_launcher_hmt\tbs_cache for HMT and %APPDATA%\nikke_launcher_google\tbs_cache for Google Play Games. The rebuilt November 4 front-end retains the FeedList.feb647c9.js URL, so changed front-end filenames alone cannot establish cache cleanup.
- title: Verify official ACE guidance and report affected accounts or losses
  hint: 'Use the official PC Launcher Security Incident and Follow-up Measures notice for ACE instructions. The vendor announced it from November 5 08:00 UTC+9. Preserve evidence and close browsers before deciding whether to consent to deleting related logs, DLLs and registry entries; no pop-up does not establish safety. Alternatively follow the official manual for identified malicious downloads in Launcher\log\tinyget: its example is a 205,135-byte tinyget.<date>-<time>.log; research also reports an older 165,108-byte k2f.lua. One file size cannot rule out infection; preserve then remove only identified malicious files. Update trusted antivirus and run full-system and Defender Offline scans. Report suspected external-account impact or losses through established in-game support; case-by-case review is not promised or completed financial compensation.'
sources:
- name: MotherSphere original technical report and indicator list
  url: https://gist.github.com/MotherSphere/d6c049a09ba8ac3085c51ee9df24a4e5
  primary: true
  says: Full original report read through the public GitHub Gist API. Separates own-host/static analysis from commenter reports; lists CDN cache observations, indicators and cleanup corrections. November 4 12:11 GMT revision adds a four-node 11:20 UTC clean recheck, later historical stale-cache observations, older payload indicators and compressed .ldb evidence. The 23:18 GMT revision adds Google Play Games user reports, variant cache paths, rebuilt front-end observations and UTF-8 startup-failure limits.
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
- name: MotherSphere NIKKE Launcher Check original documentation
  url: https://raw.githubusercontent.com/MotherSphere/NIKKE-Launcher-Check/main/README.md
  primary: true
  says: Author-described read-only local scanner, optional report writing, checks/verdict limits, release checksums and redaction. Not an independent tool audit or guarantee of a clean host.
- name: NIKKE Launcher Check v0.5.1 release metadata
  url: https://api.github.com/repos/MotherSphere/NIKKE-Launcher-Check/releases/tags/v0.5.1
  primary: true
  says: Published November 4 13:39:38 UTC, with platform assets and checksum file; downloaded executables were not run.
- name: NIKKE Launcher Check v0.5.2 release metadata
  url: https://api.github.com/repos/MotherSphere/NIKKE-Launcher-Check/releases/tags/v0.5.2
  primary: true
  says: Published November 4 22:40:34 UTC; corrects startup-failure verdicts, Google Play Games process detection and temporary-file counts. No executable was run.
- name: Level Infinite full PC Launcher Security Incident and Follow-up Measures
  url: https://nikke-en.com/newsdetail.html?content_id=b4f23938a63a0a4e68aa577af395b1edb172
  primary: true
  says: November 4 official article read fully in a public browser. Confirms tampering, retrospective distribution and two response stages, announced ACE cleanup and loss-reporting channel. Distribution-start date differs from research logs; no victim total or compensation completion established.
- name: NIKKE official Manual Security Check Instructions
  url: https://nikke-en.com/newsdetail.html?content_id=ecdccd40a55a5a46aaa9abda64d436082db7
  primary: true
  says: 'November 4 full article read in a public browser: Windows/Google install paths, log checks, HKCU/restart/target-DLL-folder cleanup, download/cache removal, credential protection and full/offline scans. States mobile was unaffected.'
---

The November 3 original analysis reports four altered JavaScript files on Level Infinite’s official CDN loading an external script, which used the PC launcher’s embedded Chromium bridge to download a LuaJIT remote-access agent. The researcher analyzed one affected machine and static payload code, and labels additional users’ observations as reported evidence. Commands could read files, execute programs and capture screenshots; the analysis also identifies browser/credential theft capabilities and a Windows Chrome persistence path. Capability is not proof that every secret was stolen. No victim total or confirmed aggregate wallet loss is established.

The operator’s readable official excerpt acknowledges possible third-party script tampering and dates a client fix to November 4 around 02:30 UTC+9 (November 3 17:30 UTC). The researcher still observed a modified FeedList script on two CDN nodes at November 3 22:26 UTC. WormW subsequently reports that all four known official assets returned clean bodies during its November 4 07:14–07:20 UTC recheck, including both canonical and cache-busting FeedList requests. It cannot fully distinguish origin from intermediate cache state. These statements concern different layers: client updates, origin cleanup, CDN caches and already infected hosts. Do not treat the notice as proof that every cached copy or infected machine is clean. Earlier verification could read only an initial-notice excerpt; the full follow-up and manual guidance have now been read, as detailed below.

The report corrects earlier advice: the PlatformExperienceHelper parent is legitimate Chrome content, and onominan.tmp is not an infection marker. The attacker’s initial CDN/publishing access remains unknown. The cited research did not analyze mobile clients; the later vendor manual explicitly says mobile was unaffected. L3 reflects a widely used launcher and documented malicious distribution, while the operator now confirms file tampering and full execution/victim scope is still unresolved.

**November 4 original-research update:** MotherSphere now reports all four known files clean on four checked CDN nodes for both hosts at 11:20 UTC, while a checked public scan still received modified FeedList at 00:48 UTC. Its observed nodes took clean copies between 03:12 and 03:21 UTC. These observations extend, rather than invalidate, the earlier WormW recheck above; they do not prove a global purge. Preserve logs and cached Local Storage before clearing the documented launcher cache, including compressed `.ldb` files. Older reported payloads use additional temporary filenames and hashes, so absence of the latest hash does not establish safety. The initial CDN/publishing access and full victim scope remain unresolved.

**Optional evidence checker:** The report now links its author’s NIKKE Launcher Check; release v0.5.1 was published November 4 at 13:39 UTC. The documentation describes a local scanner and distinguishes script exposure, agent infection, no traces found and missing installation. These are tool verdicts, not a complete forensic determination. Preserve the cache before cleanup and redact any shared report. Manual investigation, persistence removal/rebuild and clean-device secret rotation remain necessary when compromise is suspected. The tool was not executed or independently audited for this article.

**November 4 late research revision:** Google Play Games PC exposure is user-reported, with installation/process pivots `C:\NIKKE_GOOGLE`, `Launcher\nikke_launcher_google.exe` and `%APPDATA%\nikke_launcher_google`; it is not a complete vendor scope assessment. The front-end was rebuilt, but FeedList retains its URL, so preserve evidence before clearing each variant’s cache. At 22:59 UTC the researcher still observed the two original malicious domains resolving to 89.127.233.127; DNS resolution does not prove the server recovered or was still issuing malicious commands.

If a run ends with `startup failed: EIO: invalid UTF-8 in string` immediately after `k2f_chan registered`, without an `adopted`, `resuming` or `agent started as` line, the researcher’s code inspection identifies non-ASCII Windows usernames as a possible system-information encoding failure. That run likely stopped before receiving a server ID. However, its l.js was not captured and subsequent behavior is unknown: the agent downloaded and ran, so suspected-infection cleanup still applies. v0.5.2 reports this separately as loaded but startup failed. Although the analyzed agent has no built-in scheduled-task, Run-key, service, WMI or Startup-folder persistence code, arbitrary commands could install additional persistence; do not limit investigation to the known CLSID. Static browser scanning takes cookies only from Chromium browsers and logins.json/key4.db from Firefox; arbitrary file-reading capability remains, and capability does not prove actual cookie or password exfiltration.

**November 4 official follow-up:** Level Infinite now confirms Windows launcher tampering and asks users who launched since September 27 15:41 UTC+9 (06:41 UTC) to check. It says mobile was unaffected, superseding our earlier limitation that the research did not cover mobile. Its retrospective dates malicious distribution to October 30 03:52 UTC+9 (October 29 18:52 UTC); researcher-reported logs begin October 23. Both accounts are retained, so the later date is not an exclusion rule. Domain hijacking and the CDN/network entry route remain part of the vendor’s investigation rather than an independently established complete root cause.

The vendor dates replacement of three scripts to November 3 17:04–17:23 UTC and the remaining script’s CDN refresh to November 4 03:09 UTC, with gradual rollout afterward. It announced official-client ACE scanning/removal from November 4 23:00 UTC, requiring consent to delete associated logs, DLLs and registry entries: preserve evidence first. This feature was not run here. Neither its claim that remaining DLLs cannot execute nor a missing pop-up proves a fully clean host; arbitrary commands could have installed other persistence. The manual also calls for full/Defender Offline scans, password changes, key/token rotation and support reports for suspected losses. No confirmed loss total or completed financial compensation is published in these notices.

The vendor also plans stronger monitoring, integrity verification for external launcher resources and a review of feature permissions. These are announced preventive measures, not independently verified completed controls or evidence that existing infections were removed.
