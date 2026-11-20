---
title: Fireworks cloud intrusion exposed customer data including Notion AI transcripts
summary: Fireworks now says the cloud-host intrusion reached production and exposed account/billing data for all accounts created before October 30, plus some datasets, models or secrets. Notion reports Insights transcripts for fewer than 1% of workspaces; Infcurion identifies 232 personal-information records.
splash: Fireworks accounts created before October 30; some customer datasets/models/secrets and notified Notion Insights workspaces.
wipe: Review vendor notices and exposed data. Revoke and rotate credentials included in affected datasets or chats.
inTheWildNote: Fireworks and Notion confirmed unauthorized access to affected customer data.
level: 4
date: '2026-11-09'
updated: 2026-11-20
tags:
- AI
- SaaS
- data breach
inTheWild: 'yes'
timeline:
- date: Oct 10, 2026 05:00 UTC
  title: Fireworks publishes an earlier security bulletin
  body: Fireworks initially confirms access to stored secrets used in workflows including evaluation jobs.
- date: Oct 23–24, 2026
  title: Cloud provider incident leads to Fireworks development access
  body: Fireworks detects an unauthorized workload on October 24 and starts containment.
- date: Nov 9, 2026
  title: Fireworks and Notion publish scope findings
  body: Fireworks details additional data categories. Notion describes the Insights transcript exposure and notification process.
- date: Nov 11, 2026
  title: Notified customer LRM describes the data in its own workspace
  body: LRM says it was notified on November 10. It found business-contact names in potentially exposed Insights records and reports no system credentials in the records it reviewed.
- date: Nov 12, 2026
  title: Notion customer RECEPTIONIST describes its own possible exposure
  body: The company identified information about 53 people outside the company and employee data in the affected records. It plans individual emails and a regulatory report.
- date: Nov 12, 2026
  title: Interactive reports up to six potentially affected business contacts
  body: The scope covers some Notion AI conversations from October 5–22. The company is contacting those people and says it reported the incident to Japan’s Personal Information Protection Commission.
- date: Nov 13, 2026
  title: LegalOn finds customer information in some affected conversations
  body: The company is reviewing October 5–23 records and plans individual notifications to affected customers and business partners. It confirmed the information was present in the records and is still assessing possible disclosure.
- date: Nov 13, 2026
  title: Notion reports action on exposed API keys
  body: Notion says it revoked exposed Notion API keys on November 11 and reported exposed third-party keys to their issuers on November 12.
- date: Nov 14, 2026
  title: Sankei Shimbun reports a possible exposure and restores Sankei iD
  body: The publisher paused its membership service on November 13 and restored it the next morning after safety checks.
- date: Nov 16, 2026
  title: LayerX reports potentially exposed Notion AI records
  body: LayerX identified 2,070 instances of business contact information and 133 instances of recruiting information. Sales records are still under review.
- date: Nov 17, 2026
  title: Fireworks separates two incidents and broadens the later scope
  body: The cloud-host intrusion reached production; account and billing data for all accounts created before October 30 was accessed. Some customers also had datasets, models or secrets accessed. Fireworks calls both incidents contained and remediated; the second forensic investigation continues.
- date: Nov 18, 2026
  title: Infcurion identifies personal information in its Notion AI records
  body: It reports 232 personal-information records, with business-partner information in sales material still under review. Individual notices are planned and a privacy-regulator report has been made.
- date: Nov 20, 2026
  title: Eole publishes its final downstream findings
  body: Its October 5–24 records contain customer, contractor and employee information; actual third-party acquisition of individual entries is unconfirmed. It says all affected parties were notified by November 18 and excludes credentials and card information from its reviewed scope.
checklist:
- title: Review the data named in Fireworks notices
  hint: Use your incident notice or the contact listed on the security bulletin. Identify affected datasets, model material, metadata or billing records. Revoke and rotate exposed secrets at their issuers and review associated activity.
- title: Review affected transcripts inside Notion
  hint: If notified, a workspace owner can open the sidebar, select ? and then Security incident review to review and export affected transcripts. Share the review link with affected members. Treat affected chats as exposed and rotate passwords, API keys and other credentials they contain.
- title: Verify RECEPTIONIST notices through the company
  hint: The company says individual notices will come from @receptionist.co.jp. For an unexpected message, verify through pr@receptionist.co.jp as published in the November 12 filing. Watch for impersonation using inquiry details.
- title: Verify individual Interactive or LegalOn notices
  hint: Verify unexpected messages through Interactive’s official website or LegalOn’s official contact form, using the Other inquiries option for LegalOn. Avoid suspicious links or attachments and keep passwords and verification codes private. LegalOn says customers need no changes to its product settings.
- title: Hunt using the complete vendor indicator categories
  hint: 'Search Fireworks and third-party issuer logs as far back as retention allows. The vendor PDF lists 56 IPs: 49 alert/block egress IPs (141.148.43.50, 192.255.184.158, 130.61.45.127, 169.128.94.223, 207.244.233.138, 107.173.67.144, 142.249.130.148, 121.225.47.194, 180.111.130.132, 58.240.148.142, 183.213.133.12, 146.70.224.38, 146.70.224.113, 146.70.224.209, 170.62.100.234, 193.32.126.146, 80.66.197.113, 141.98.252.247, 134.209.82.225, 170.62.100.240, 170.62.100.236, 193.176.31.29, 31.169.53.59, 31.169.53.89, 31.169.53.47, 31.169.53.56, 88.214.21.66, 194.36.27.155, 185.209.196.171, 193.32.126.135, 193.32.126.178, 141.98.252.244, 185.209.199.80, 185.209.196.153, 147.78.241.134, 185.103.52.196, 185.209.196.135, 146.70.117.34, 45.129.59.47, 45.129.59.190, 185.195.233.170, 170.62.100.225, 170.62.100.107, 193.176.31.135, 193.176.31.138, 193.176.31.178, 147.78.241.245, 43.107.42.214, 85.203.54.115); 6 shared Cloudflare egress IPs for alerting only, not blanket blocking (104.28.243.187, 104.28.225.223, 104.28.193.223, 104.28.251.137, 104.28.211.188, 104.28.246.17); outbound destination 202.61.139.15 TCP 8777, POST /exfil. Also search curl/8.14.1, Python-urllib/3.14, python-requests/2.34.2, firectl-admin/1.7.x, grpc-python/1.84.0, Mozilla/5.0 hunt; names containing hunt/probe/jump; *__DUMP_B64; webhook.site; unexpected keys, users, service accounts, evaluators or jobs, and one-off model-list validation calls. See the full vendor PDF for context. A match is an investigation lead, not proof; no match does not clear exposure. Preserve logs/resources before deletion, revoke exposed credentials, and send timestamps, resource IDs and source IPs to security@fireworks.ai.'
- title: Verify Infcurion notices without replying to suspicious messages
  hint: Use https://infcurion.com/contact/ to verify unexpected messages. The company plans individual contacts and warns against unsolicited payment or password requests impersonating it or Notion. For exposed credentials, use the issuer-side revocation and activity checks above.
- title: Verify any Eole notice against its final report
  hint: Use Eole’s official November 20 notice at https://www.eole.co.jp/news/release/2026/news_post908/ and your established company contact to confirm unexpected messages. Eole says it notified all affected parties by November 18. Its own review excludes authentication credentials and card data; that exclusion does not apply to other Notion workspaces, so retain the transcript review and issuer-side credential checks above.
sources:
- name: LayerX downstream notice
  url: https://layerx.co.jp/news/202611161636/
  says: Describes the record categories, period and customer notification process.
  primary: true
- name: Fireworks November 9 bulletin
  says: Describes the October cloud-provider intrusion, data categories, mitigation and ongoing investigation.
  url: https://fireworks.ai/security/bulletins/october-2026-security-incident-update
  primary: true
- name: Notion security notice
  says: Explains the affected Insights transcripts, workspace notifications and credential guidance.
  url: https://www.notion.com/en-gb/security/advisories/security-incident-involving-a-third-party-ai-vendor
  primary: true
- name: LRM first-party customer notice
  url: https://www.lrm.jp/info/news/info_20261111/
  says: Identifies the affected customer’s record window, observed business information and notification process.
  primary: true
- name: RECEPTIONIST November 12 issuer filing
  says: Identifies possible exposure in the customer’s own Notion AI records and describes notifications, excluded data and unaffected services.
  url: https://tdnet-pdf.kabutan.jp/20261112/140120261112577184.pdf
  primary: true
- name: Sankei Shimbun November 14 incident notice
  says: Connects the potential exposure to a contractor’s use of Notion and documents the temporary Sankei iD suspension and restoration.
  url: https://www.sankei.jp/wp-content/uploads/2026/11/%E5%BD%93%E7%A4%BE%E3%81%AE%E5%8F%96%E5%BC%95%E5%85%88%E3%81%8C%E5%88%A9%E7%94%A8%E3%81%99%E3%82%8B%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%83%84%E3%83%BC%E3%83%AB%E3%81%A7%E3%81%AE%E4%B8%8D%E6%AD%A3%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B9%E3%81%8A%E3%82%88%E3%81%B3%E7%94%A3%E7%B5%8CiD%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%81%AE%E4%B8%80%E6%99%82%E5%81%9C%E6%AD%A2%EF%BC%88%E7%8F%BE%E5%9C%A8%E3%81%AF%E5%86%8D%E9%96%8B%EF%BC%89%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6.pdf
  primary: true
- name: Interactive November 12 notice
  says: Describes its Notion AI transcript window, maximum of six business contacts and completed report to the privacy regulator.
  url: https://www.inta.co.jp/news/42090/
  primary: true
- name: LegalOn November 13 notice
  says: Gives the affected workspace scope, customer information categories, exclusions and notification plan.
  url: https://legalontech.jp/11330/
  primary: true
- name: Fireworks November 17 scope and containment update
  url: https://fireworks.ai/security-bulletins
  says: Distinguishes two incidents, confirms later access to production and all pre-October30 accounts’ billing/account data, and attributes containment and forensic status.
  primary: true
- name: Fireworks customer indicator document
  url: https://cdn.sanity.io/files/pv37i0yn/horizon/f0628d65bbfefd792b0ee89e71b91b476d6515b7.pdf
  says: Undated document lists 56 IPs with different handling, user agents, naming/behavior indicators and preservation/rotation/contact instructions.
  primary: true
- name: Infcurion November 18 original issuer notice
  url: https://kabuyoho-sls-disclose.ifis.co.jp/9cc/140120261117582347.pdf
  says: Describes October5–24 Notion AI records, 232 personal-information records, sales-data uncertainty, completed regulatory reporting and planned individual notices.
  primary: true
- name: Eole November 20 final downstream report
  url: https://www.eole.co.jp/news/release/2026/news_post908/
  says: Identifies October5–24 information categories, completed November18 notifications, excluded credentials/cards and the limit that actual acquisition of each entry cannot be confirmed.
  primary: true
---

Fireworks says an October 23 incident at its R&D cloud host enabled access to its development machines on October 24. Its investigation found affected resource metadata and billing details, including addresses, payment history, balances and credit usage. Fireworks says payment card numbers were outside scope. It temporarily disabled self-serve dataset uploads and downloads for Batch Inference and dataset-based training. It reports no detected impact to Inference, Training SDK or Nexus in its investigation to date.

Notion says it disconnected from Fireworks by November 3 following a notification about synthetic test data and deleted its data in Fireworks on November 4. Fireworks notified Notion again on November 6 and confirmed a separate dataset on November 8. Notion says most affected workspaces’ transcripts lacked author or workspace labels and contained no tool-call results. The chat text itself could contain identifying information or secrets. Notion disabled Insights and continues investigating. The sources do not establish an incident-wide count of affected people.

In its November 11 notice, Japanese security company LRM says Notion notified it the day before. The company is reviewing a subset of its October 5–24 Insights records and found names of business contacts in the text. It is notifying those contacts individually and reports no system credentials in its reviewed records. That finding applies to LRM’s records. Other notified workspace owners should review their own exports, notify people whose information appears, and rotate any exposed credentials. LRM says its own services were outside the intrusion. The record count and whether outsiders obtained LRM’s records remain under investigation.

RECEPTIONIST says Notion notified it on November 10. Its November 12 filing identifies records from October 5–23 containing information about **53 people outside the company**, plus employee information. Depending on the person, the records may include names, company names, phone numbers, email addresses and inquiry details. The company excludes credit card and bank account information from those records. It is treating the records as exposed while it has yet to establish that a third party obtained them. The company plans individual emails and a report to Japan's Personal Information Protection Commission and reports no known misuse. RECEPTIONIST says its own services and customer data stored in them were outside this incident.

Interactive says names, job titles or parts of meeting notes for up to six business contacts were in potentially exposed Notion AI conversations from October 5–22. It excludes addresses, phone numbers, card information, passwords and Job Antenna applicants’ data. The company says it is contacting the individuals, has reported the incident to Japan’s Personal Information Protection Commission and has seen no misuse.

LegalOn says it received notice and the affected records from Notion on November 11. Its November 13 statement confirms that some conversations in the October 5–23 scope contain customer information, potentially including company names, contact names or email addresses. It is reviewing the scope and preparing individual notifications and required regulatory reports. It says customer data stored in its own products and services, such as contracts, and login credentials for those products were outside the incident. External disclosure and the affected-person count remain undetermined.

Notion’s update confirms it found API keys in affected messages. It revoked exposed Notion API keys it found on November 11 and reported the third-party API keys it found to their issuers on November 12. A report to an issuer does not establish revocation. Workspace owners should verify revocation with each issuer, replace the keys and check usage logs between exposure and revocation.

Sankei Shimbun says a contractor used Notion on one of its projects and reported that information about Sankei’s systems might have been exposed through Fireworks. Sankei suspended its membership service, Sankei iD, on November 13 and resumed it on November 14 after checking its safety. The notice does not confirm external disclosure, access to member records or an affected count. Use the [official Sankei iD inquiry form](https://id.sankei.jp/inquiry.html) to verify unexpected messages about the incident.

[Cursor’s separate downstream incident](/incidents/cursor-claude-extension/) involved a key that Cursor had issued to Fireworks. Cursor’s investigation explains how the exposed key led to copying historical traces and eventually to the tampered extension builds.

LayerX says the potential exposure covered some of its October 5–24 Notion AI inputs and responses, including business contacts and recruiting candidates. It reported the incident to Japan’s privacy regulator and says it will notify people individually as needed. It excludes its Bakuraku and Ai Workforce systems and their data from this intrusion.

Fireworks’ November 17 update separates an August 3–October 7 intrusion from the October 23–30 cloud-host incident. For the first, it now confirms that stolen Fireworks credentials and a service vulnerability enabled platform misuse and access to some customers’ secrets, model files and datasets, broadening the initial secrets-only findings. It says the latter reached part of production and exposed account and billing information for every account created before October 30, with datasets, models and/or secrets accessed for a smaller subset. This broadens the earlier November 9 description above; payment-card numbers remain excluded. Fireworks says both incidents are contained and remediated. Unit 42 completed the first investigation, while AprosSyber is investigating the second. Containment does not recover copied data or establish that every exposed third-party credential has been revoked.

Infcurion’s November 18 filing says Notion notified it on November 13 that some Notion AI inputs and answers had been taken through Fireworks. The scope is some October 5–24 conversations containing 232 personal-information records about business contacts, applicants and employees, including names, phone numbers and email addresses; business-partner information within sales records is still being assessed. This is a record count, not an incident-wide unique-person total. Infcurion reports no observed misuse, says it has reported to Japan’s privacy regulator and plans individual contacts. Its own services and the information stored in them were outside this downstream incident. That exclusion must not be applied to [Infcurion’s separate Wallet Station intrusion](/incidents/infcurion-wallet-station/), disclosed November 20.

Eole (イオレ) published a final downstream report on November 20. Its October 5–24 histories contained two customer-information entries, seven contractor-information entries and eighteen employee-information entries, including one former employee in a five-name category. Depending on the category, these contained company names, full or partial names and email addresses. These are information-entry counts, not a confirmed unique-person total or proof that every entry was taken. Eole cannot establish actual third-party acquisition of each item and is treating them as acquired for its response. It also reviewed business information and meeting content and separately contacted partners whose records warranted attention.

Eole says the reviewed material contained no passwords or other authentication credentials and no credit card information. That customer-specific exclusion does not narrow Fireworks’ incident-wide secrets exposure. It reports completing individual notifications to all affected parties by November 18 and making reports to relevant authorities. This concludes Eole’s public investigation report, not the wider Fireworks investigation; it will handle cases individually unless Notion or Fireworks publishes new facts.
