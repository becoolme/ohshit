---
title: Spoofed KuCoin security emails direct users to Overlord remote access software
level: 3
date: '2026-11-05'
tags: [KuCoin, Phishing, Malware, DMARC]
summary: GCSA examined phishing emails impersonating KuCoin and identified an Overlord remote access client in the Windows download. Windows and two macOS samples shared a callback address. GCSA says KuCoin enabled DMARC quarantine for ku.com after disclosure. The number of infections and any losses remain unknown.
splash: KuCoin users who got the fake security email, especially those who entered credentials or ran its Windows or macOS download.
wipe: If you ran a download, disconnect the device. Use a clean device to secure your account, review activity and contact KuCoin through its official app or site.
inTheWild: 'yes'
inTheWildNote: GCSA examined delivered phishing mail and confirmed an Overlord Windows payload.
timeline:
- date: Oct 29, 2026
  title: GCSA finds ku.com without DMARC
  body: The researchers found that SPF and DKIM passed for the delivery domain, which differed from the domain displayed in From.
- date: Nov 5, 2026
  title: GCSA publishes sample analysis and KuCoin response
  body: GCSA identifies the Windows download as Overlord and reports that KuCoin confirmed the configuration issue and enabled a quarantine policy for ku.com.
checklist:
- title: Isolate any device that ran a download
  hint: Disconnect the device from Wi-Fi and wired networks. Keep the message with full headers, download details and activity records. Ask your security team to inspect the device and verify cleanup before reconnecting it.
- title: Secure your KuCoin account from a clean device
  hint: If you entered a password or code or ran a download, open KuCoin directly. Change the password, sign out other sessions, review account security and recent withdrawals, and report suspicious activity to official support. If the device held exchange API keys, revoke and replace exposed keys.
- title: Verify alerts directly
  hint: Open your usual KuCoin app or bookmark to check any claimed account issue. Compare your anti-phishing code when configured. If you only opened the link, close the page without entering anything or downloading a file.
- title: Hunt for related mail, downloads and callbacks
  hint: 'Search mail for the displayed security@ku.com with return path security@ku-security[.]com or host mail.ku-security[.]com. Search web and endpoint logs for ku-security[.]com:5173, paths /api/file-share/290924a0-2064-477f-b0dd-0cbfd6fa18ab/download and /api/file-share/e9daf83a-5bf2-4d72-a98e-deece8984e87/download, and Windows SHA-256 3beb5f5fa9e01b382b79c152a6eb14b096e1ef0fabbc1ab6faf6b19326899d21. Check outbound TLS to 3.1.159[.]255:5173 and, where logged, /api/clients/{id}/stream/ws?role=client. Correlate findings with execution and account events. A match alone does not prove compromise.'
sources:
- name: GCSA original investigation
  url: https://media.gcsa.com/en-US/news-3730650
  primary: true
  says: Documents delivered phishing mail, sender alignment, the fake download page, Windows static analysis, callbacks across three samples and the response GCSA received from KuCoin.
- name: KuCoin account security guidance
  url: https://www.kucoin.com/support/360015207473
  primary: true
  says: Explains anti-phishing codes, official verification and account safeguards. This is general guidance.
---

The lure presented an urgent account warning from a supposed KuCoin security center. GCSA found that the visible sender was `security@ku.com`, while SPF and DKIM authenticated the attacker's `ku-security[.]com` domain. The missing DMARC record on `ku.com` meant the domain had published no quarantine or reject policy for mail that failed alignment. GCSA reports that KuCoin enabled quarantine after being notified.

The fake site offered Windows and macOS downloads. GCSA confirmed the Windows sample as an Overlord client through static analysis. The Windows, macOS arm64 and macOS amd64 samples contained the same remote callback. GCSA's report establishes phishing delivery and malware distribution. Whether recipients ran the files, lost funds or had their accounts accessed remains unknown. The evidence concerns impersonation of KuCoin's sender identity. The report does not establish access to KuCoin infrastructure.
