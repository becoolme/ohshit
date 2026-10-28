---
title: Onamae Desktop Cloud confirms malware in customer servers and shuts down all plans for investigation
headline: "Onamae Desktop Cloud: the hosted desktop came with an extra tenant"
level: 4
tags:
  - cloud
  - malware
  - credentials
ecosystems:
  - onamae
summary: GMO confirms malware in some Onamae customer servers; 26,739 is the potential scope. Its October 27 update reports publication of purported company/customer data, with authenticity under review, and urges customers to disconnect and power off their PCs after backup.
splash: Onamae Desktop Cloud customers; 26,739 servers potentially affected, not confirmed infected
wipe: Back up, disconnect and power off customer PCs per GMO; rotate hosted-desktop secrets from a clean device and follow recovery notices
inTheWild: yes
inTheWildNote: Vendor confirms unauthorized programs installed on customer servers
timeline:
  - date: Oct 20, 2026
    title: Vendor confirms malicious programs in some customer environments
  - date: Oct 20, 19:00 UTC
    title: Service shutdown begins across all plans
    body: October 21 at 04:00 JST; the cited vendor notice is dated October 21.
  - date: Oct 27, 2026
    title: GMO confirms publication of purported data and expands precautions
    body: Authenticity remains under review; the vendor has not confirmed ransomware activation.
checklist:
  - title: Follow GMO’s customer-PC isolation guidance
    hint: The October 27 notice requests a full virus scan and backup, followed by network disconnection, shutdown and unplugging PC cables. This concerns customer PCs, beyond the vendor-hosted servers; do not reconnect solely because no ransomware has been confirmed.
  - title: Rotate credentials stored or used on the hosted desktops from a clean device
    hint: Use a separate clean device to replace credentials saved or used on the cloud desktops.
  - title: Change reused passwords on other services
    hint: Replace matching passwords on other services through their official websites.
  - title: Review connected accounts for unauthorized activity
    hint: "General response guidance: check login history and active sessions for services used on the desktops."
  - title: Follow official recovery notices and beware of phishing
    hint: Open GMO’s official notices directly; it will not ask for passwords or authentication codes. Do not visit or redistribute the attacker’s alleged data dump.
sources:
  - name: Onamae official notice
    url: https://www.onamae.com/news/article/11584
    primary: true
    says: 26,739 potentially affected servers; malware confirmed in some environments; data misuse unconfirmed
  - name: BleepingComputer
    url: https://www.bleepingcomputer.com/news/security/japans-onamae-desktop-cloud-hacked-up-to-27-000-servers-affected/
    says: Reports the service-wide interruption and credential-rotation advice
  - name: GMO eighth notice
    url: https://group.gmo/info/alert/20261027/
    says: Customer-PC scanning, backup, disconnection and shutdown precautions.
    primary: true
  - name: GMO tenth notice
    url: https://group.gmo/info/alert/2026102703/
    says: Purported data published; authenticity under review; no ransomware attack confirmed as of this update; precautions reiterated.
    primary: true
date: 2026-10-21
updated: 2026-10-28
---

The vendor distinguishes possible exposure from proven misuse: the server total is a potential scope, not an infection count. Its dated notice does not identify the access method or attacker. L4 reflects confirmed compromise of customer environments at a hosting provider.

**Update, October 28:** The original notice’s lack of confirmed misuse is an early assessment. GMO now confirms that an apparent attacker published material claiming to concern the company and customers; it is verifying that material and will individually notify confirmed affected customers. Its October 27 tenth notice says ransomware activation had not been confirmed as of that update. That is not an all-clear. The new customer-PC isolation advice supplements the hosted-server shutdown and credential rotation, and does not establish that every potentially affected server or customer PC is infected.
