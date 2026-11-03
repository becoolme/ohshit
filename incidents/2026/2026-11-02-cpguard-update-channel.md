---
title: cPGuard update channel delivers root credential theft; later report expands scope
level: 4
date: '2026-11-02'
updated: '2026-11-03'
tags:
- cPGuard
- supply chain
- credentials
summary: OPSSHIELD confirms a poisoned cPGuard update and later reports ~2,950 servers ran it and ~7,900 billing accounts were copied. Update to the latest release, replace root/cloud/database secrets and billing passwords, and check removed tasks. Earlier 32-file retrieval is not the total scope; investigation continues.
splash: 'cPGuard online Nov 2, 02:08–03:20 UTC: assume root secrets exposed; billing-portal accounts are separately affected'
wipe: Install the latest cPGuard, verify cleanup, rotate host/cloud/SSH secrets and reset the billing password with 2FA
inTheWild: 'yes'
inTheWildNote: OPSSHIELD confirms malicious updates, copied secrets and attacker data retrieval.
cves: []
fixed:
- product: cPGuard cleanup baseline; install latest follow-up too
  version: 5.88.26
  status: Known-shell removal; follow-up cron cleanup also required
timeline:
- date: Nov 1, 22:58 UTC
  title: Attacker executes commands on billing/licensing server
  body: The later report traces access through a newly registered customer account; the exact successful request was not logged.
- date: Nov 2, 02:04–02:09 UTC
  title: Stolen update key publishes the malicious package
  body: The later report gives the upload window, refining the earlier advisory’s 02:06 UTC update-infrastructure access time.
- date: Nov 2, 02:08–03:20 UTC
  title: Customer agents install and run the fake update as root
  body: OPSSHIELD says root-level secrets should be assumed exposed on cPGuard servers online during this window.
- date: Nov 2, 21:12 UTC
  title: Early advisory estimates 32 retrieved files
  body: 'Original timestamp: November 3, 02:42 IST (UTC+05:30). Each file corresponds to a customer server; the vendor explicitly says this is not the full potentially affected population.'
- date: Nov 2, 21:47 UTC
  title: Support-access key removal announced
  body: 'Original timestamp: November 3, 03:17 IST. This precaution does not replace credential rotation.'
- date: Nov 3, 2026
  title: Later disclosure expands server and billing-account scope
  body: The company reports about 2,950 servers ran the update and about 7,900 billing accounts were copied; latest cleanup and conditional rebuild guidance supersede the earlier narrower assessment.
checklist:
- title: Update every cPGuard server and verify cleanup
  hint: Run cpgcli update --start and then cpgcli --version. The earlier known-file cleanup starts at 5.88.25; the later report names 5.88.26 and a further cron-removal update, so install the latest release rather than stopping at the old minimum. Confirm /etc/cron.d/i93677, /var/tmp/.i93677/ and /var/tmp/.cpg91511_sh are gone; preserve evidence before removing remnants and ask OPSSHIELD Support if cleanup/version verification fails. An updated version or absent files does not prove secrets were never copied.
- title: Check update history and preserve all published indicators
  hint: Review grep 'Successfully updated' /opt/cpguard/logs/install_log for 5.88.12–5.88.19. Missing/incomplete logs do not rule out exposure. Check retained network/web/file evidence for 94.183.188.91, fake User-Agent cPGuard/5.88.11, /i90248_probe.txt, /i90573_probe.txt, /i90573_sh.php, /i90573_x.php, URL paths *_rx.php, /etc/cron.d/i93677, /var/tmp/.i93677/, /var/tmp/.cpg91511_sh, cpguard-v58812-i91511*.sh and earlier /var/tmp/.cpg91511/loot.tgz (/var/tmp/.cpg91511). The four script hashes, reproduced as labeled SHA-256 by the vendor, are 2c2acd988da531d133d0e17f245c49bf15781278f837543d18c95e8410eabd38, ffd7a47f65fa1244429baa936ae94be54676b53d2f88bc39564f24e22011de8a, d73919af84bf46de941db85e27fd1abc65701ef9ce6cf33bb27c5397f4a41c26, 6add0201e9a3d02de772d561d05e0da86eb1c538686753b7adcc3aedf7366f77. Additional vendor-internal indicators are /usr/bin/defunct, defunct.service, /lib/systemd/system/defunct.dat, process [slub_flushwq], /usr/sbin/pythno3, /usr/sbin/netstat.cfg, /etc/profile.d/bash.cfg, /usr/lib/system.mark, /usr/lib/libgdi.so.0.8.2, /boot/system.pub, process [rcu_gp] and /etc/profile.d/gateway.sh. Those last implant groups were found on the vendor’s internal server, not confirmed customer implants. Use a trusted boot environment/known-good static tools because some hide from ordinary tools. A match alone is not proof; absence after cleanup does not rule out execution.
- title: Replace root, database, SSH and cloud secrets from a trusted environment
  hint: Reset root and every password-enabled local account from a trusted recovery environment, and change reused passwords elsewhere from a clean device. Replace root SSH private keys and remove old public keys from every trusting server; inspect authorized_keys for unexpected entries and assess other hosts reachable by those keys. Rotate MySQL root/other database passwords in /root/.my.cnf, S3 keys in /root/.s3cfg, DigitalOcean tokens and every secret recorded in root shell history. Do not enter replacement secrets on an untrusted host. Password hashes are not plaintext passwords, but offline cracking risk still requires resets.
- title: Reset the billing password and verify server recovery with support
  hint: Through your established manage.opsshield.com account, reset the billing password and enable two-factor login even if cPGuard was offline during the update window. The company reports account details and bcrypt password hashes were copied. It reset billing sessions/rotated reseller API keys and is reissuing license keys; coordinate dependent integrations through known support. If OPSSHIELD notified you of manual attacker login, rebuild from a clean backup before November 1. Its earlier no-routine-rebuild advice is provisional; additional compromise signs or unverifiable integrity warrant an individual assessment.
sources:
- name: OPSSHIELD original update-channel advisory
  url: https://opsshield.com/notice/cpguard-update-channel-compromise.html
  primary: true
  says: 'Full public browser original read: affected 5.88.12–5.88.19; 5.88.25 cleanup, data collection/32-file retrieval, resets and timestamped IST updates. Superseded in scope by linked later report; HTTP fetch returned 406.'
- name: OPSSHIELD later manage.opsshield.com incident disclosure
  url: https://opsshield.com/notice/security-incident-disclosure-servermanage.html
  primary: true
  says: 'Full public browser report: UTC attack/update timeline, about 2,950 execution servers/about 7,900 copied accounts; 5.88.26 plus follow-up cleanup, full IoCs, license/session changes and conditional rebuild. Exact successful billing request absent from logs.'
---

OPSSHIELD’s later November 3 report traces the incident to a newly registered customer account and billing/licensing-server command execution, then theft of update-storage keys. The exact successful request was not logged; two possible entry points were patched, but no CVE or proven upstream-component cause is published. About 2,950 update-execution servers and 7,900 billing-account records are vendor estimates, not independently audited unique people. Billing records include name, company, postal address, email and bcrypt password hashes. The earlier 32-file retrieval estimate measures a narrower observation and cannot cap the later scope or be added to it.

The first advisory’s timestamped November 3 IST updates fall on November 2 UTC (02:42 IST = 21:12 UTC; 03:17 IST = 21:47 UTC), which is the disclosure day used here. The later report says the poisoned-update installation window was 02:08–03:20 UTC on November 2 and asks online servers to assume root-secret exposure. An affected-version installation is not proof that every file was exfiltrated, and absent logs are not proof of safety. The vendor’s “short script” description does not negate its confirmed hidden root shell and scheduled task.

The earlier 5.88.25 cleanup/no-routine-rebuild advice is historical. The later report names 5.88.26 plus a further cron-removal update, asks for the latest version, and specifically requires a clean pre-November 1 backup rebuild if it notified you of manual attacker login. Cleanup cannot revoke copied secrets. Reissued license keys and reset billing sessions do not replace customer password, SSH, database and cloud-secret rotation. Vendor infrastructure rebuilding is separate from customer-host recovery. The vendor’s statement that its listed steps close exposure is not an independent assurance that a host is clean.
