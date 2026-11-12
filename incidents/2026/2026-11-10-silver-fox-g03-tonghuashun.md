---
title: Silver Fox G03 spreads through fake Tonghuashun installers
summary: CNCERT and Beijing Guancheng Technology traced a campaign that uses search poisoning and lookalike stock-trading downloads to install a Windows remote-access trojan. CNCERT counted 25,164 controlled endpoints in China from October 4 to November 2.
splash: Windows users who ran the fake Tonghuashun installer. The payload can capture screens and keystrokes, run commands, and load plugins.
wipe: Isolate suspected hosts, hunt the published indicators, and reset credentials used on affected devices from a clean system.
inTheWildNote: CNCERT observed bot activity and documented the staged payload.
level: 4
date: '2026-11-10'
tags:
- Silver Fox
- Windows
- search poisoning
inTheWild: 'yes'
timeline:
- date: Nov 10, 2026
  title: CNCERT and Guancheng publish the G03 analysis
  body: The report documents the installer chain, October 4 to November 2 telemetry, and the full indicator list.
checklist:
- title: Isolate and preserve evidence
  hint: Disconnect endpoints that ran the installer or show multiple related signals. Preserve the download, process and registry telemetry, DNS and outbound connections. Check the HKCU Run value SystemKKfile and Microsoft.exe in %TEMP%, and inspect scheduled tasks.
- title: Hunt and contain across the fleet
  hint: Search endpoint and egress telemetry for the defanged indicators below and the related lookalike domains in the report. Block campaign infrastructure at egress and run a full endpoint scan. Correlate shared infrastructure matches with host activity.
- title: Recover from trusted media and secure accounts
  hint: Remove malicious artifacts and persistence. Reimage endpoints with confirmed remote control from trusted media. From a clean device, reset credentials used on affected hosts, revoke sessions, and review brokerage account activity. Obtain the replacement installer directly from the vendor or a trusted store.
sources:
- name: CNCERT and Beijing Guancheng Technology analysis
  says: Documents the installer, affected endpoint telemetry, behavior and indicators.
  url: https://www.cert.org.cn/portal/yjtb/eydmtb/2026/11/27ae286da3f0454ead6047d81b8b8b90.htm
  primary: true
---

The campaign drew users to a fake download center through search manipulation and keyword ads. Running the unsigned `THS.exe` from `THS.zip` starts the `Microsoft.exe` loader alongside a genuine signed Tonghuashun installer. The loader persists at user logon and retrieves a remote-control module over TCP. The researchers’ 25,164 count covers controlled endpoints across the group’s monitored domestic infrastructure during the stated period. The report gives no count of affected brokerage accounts or confirmed financial losses.

Section 8 indicators are defanged below. The original report marks the initial two URLs and the first three C2 entries inactive at publication. Its infrastructure table also identifies four lookalike domains for investigation.

```text
https[:]//lojqka[.]com
https[:]//dowmasfz[.]cv/THS.zip
43.199.114[.]131:7777
52.223.22[.]103:2026
76.223.113[.]170:6789
134.122.155[.]140
204.194.50[.]202
143.92.40[.]155
134.122.189[.]47
143.92.40[.]243
134.122.155[.]157
118.107.44[.]141
134.122.204[.]118
134.122.200[.]118
134.122.155[.]105
154.201.82[.]55
118.107.47[.]92
134.122.204[.]71
134.122.129[.]44
134.122.189[.]31
1.32.250[.]70
134.122.155[.]16
134.122.129[.]33
103.101.176[.]18
143.92.40[.]244
118.107.44[.]226
143.92.43[.]162
134.122.155[.]14
134.122.155[.]150
143.92.37[.]202
134.122.189[.]27
118.107.44[.]15
yhao.sxkj999[.]vip
hk3.1984233[.]xyz
tj.edatonee[.]com
afa.sxkj999[.]vip
www.khop112[.]cfd
ahua.sxkj999[.]vip
gcheng.sxkj999[.]vip
laomo.sxkj999[.]vip
dan.sxkj999[.]vip
yifan.sxkj999[.]vip
haiwen.sxkj999[.]vip
test.nanhuasell[.]com
andi.sxkj999[.]vip
four.x517l[.]com
xsi.sxkj999[.]vip
cchen.sxkj999[.]vip
ae4697dc3688a45299a038e4b3d08df55a25dd4484273f63ae8922d80f765d35
c7fc37bc64f00c3aaf8422737a4c11ccb2d682ad283c0191e40c3b0fe7861279
413bbbcb3d3a0a97da6fbdbb71a92ce048c1016acfaf3cafbd5e58b1c6cb1008
```
