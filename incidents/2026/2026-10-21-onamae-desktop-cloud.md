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
summary: GMO confirms customer-data exfiltration alongside malware in Onamae Desktop Cloud. It announces compensation and migration arrangements; broker IS6FX reports correcting confirmed unauthorized trades. The 26,739-server figure remains potential scope, not an infection count.
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
  - date: Oct 24, 2026
    title: GMO confirms data exfiltration and announces compensation and replacement-service plans
  - date: Oct 27, 2026
    title: GMO confirms publication of purported data and expands precautions
    body: Authenticity remains under review; the vendor has not confirmed ransomware activation.
  - date: Oct 27, 2026
    title: GMO announces additional assistance conditional on confirmed publication of customer data
  - date: Oct 28, 2026
    title: GMO reports takedown of the alleged leak-site domain and mirrors
    body: This does not establish that copied data has been erased.
  - date: Oct 29, 2026
    title: IS6FX reports compensation and trading-history corrections for verified unauthorized trades
    body: The broker does not publish an affected-account count or total compensation amount.
checklist:
  - title: Follow GMO’s customer-PC isolation guidance
    hint: The October 27 notice requests a full virus scan and backup, followed by network disconnection, shutdown and unplugging PC cables. This concerns customer PCs, beyond the vendor-hosted servers; do not reconnect solely because no ransomware has been confirmed.
  - title: Rotate credentials stored or used on the hosted desktops from a clean device
    hint: Use a separate clean device to replace credentials saved or used on the cloud desktops. IS6FX specifically advises changing Client Portal and all MT4/MT5 trading passwords, enabling portal two-factor authentication and keeping fresh passwords off an unverified VPS.
  - title: Change reused passwords on other services
    hint: Replace matching passwords on other services through their official websites.
  - title: Review connected accounts for unauthorized activity
    hint: Check login history, trades, balances and active sessions. IS6FX warns that a password change or VPS logout alone may leave connections active; ask the broker to invalidate them. Preserve trade records and screenshots. Consult the broker or automation provider about open positions before stopping or moving an automated trading system.
  - title: Follow official recovery notices and beware of phishing
    hint: Open official notices directly. Never give trading passwords, PINs or authentication codes to compensation callers. GMO describes possible read-only account verification; verify any such request against its separately announced official procedure. Do not visit or redistribute the alleged data dump.
  - title: Document losses and verify compensation through official channels
    hint: Keep account numbers, trade times and evidence of losses; ask the broker about corrections and refunds. GMO plans to assess incident-related realized trading losses and deduct broker refunds. Its separate ¥5,000 goodwill payment is for current service customers regardless of monetary loss; conditional data-publication assistance is a different program. Market losses, hypothetical profits and indirect damages are outside the trading-loss scheme. GMO promised claim procedures by November 6; that promise is not confirmation that claims or payments are complete.
  - title: Verify replacement-service instructions before reconnecting
    hint: GMO plans migration to an independent cloud platform with customer consent and six free months, rather than simply restarting the compromised platform. Check official instructions and terms; the announcement alone does not establish that migration is available or the old environment is safe.
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
  - name: GMO fourth notice
    url: https://www.onamae.com/news/article/11598
    primary: true
    says: Confirms exfiltration and describes compensation, replacement-service plans and verification safeguards.
  - name: GMO twelfth notice
    url: https://www.onamae.com/news/article/11615
    primary: true
    says: Additional assistance depends on verified publication of customer information; customers will be contacted individually.
  - name: GMO thirteenth notice
    url: https://www.onamae.com/news/article/11616
    primary: true
    says: Reports leak-site domain and mirror takedowns while continuing to monitor new sites.
  - name: IS6FX compensation and security notice
    url: https://is6.com/news/en/notice/20261029-3/
    primary: true
    says: Reports compensation for verified unauthorized trades and explains password, session and evidence-preservation steps.
date: 2026-10-21
updated: 2026-11-01
---

The vendor distinguishes possible exposure from proven misuse: the server total is a potential scope, not an infection count. Its dated notice does not identify the access method or attacker. L4 reflects confirmed compromise of customer environments at a hosting provider.

**Update, October 28:** The original notice’s lack of confirmed misuse is an early assessment. GMO now confirms that an apparent attacker published material claiming to concern the company and customers; it is verifying that material and will individually notify confirmed affected customers. Its October 27 tenth notice says ransomware activation had not been confirmed as of that update. That is not an all-clear. The new customer-PC isolation advice supplements the hosted-server shutdown and credential rotation, and does not establish that every potentially affected server or customer PC is infected.

**Update, November 1:** GMO’s October 24 fourth notice confirms that customer information was taken outside the service. That finding is separate from verification of the subsequently published material. On October 27, GMO announced further assistance conditional on confirming that a customer’s data was published; the leak-site takedown announced October 28 cannot retract copies already obtained.

IS6FX’s October 29 notice reports completed corrections and compensation for the unauthorized trades it verified. This is the broker’s account of its own response, not a statement that every Onamae customer has been reimbursed or that the original service has recovered. Investigation, individual data verification and GMO’s compensation procedures remain separate.
