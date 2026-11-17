---
title: Stolen Sonicmoov support credentials expose customer data in COMSBI SaaS
summary: Sonicmoov says an attacker used internal support accounts with access to multiple customers of COMSBI SaaS, a LINE integration service. The attacker obtained customer data and also accessed the cloud environment, taking configuration data and credentials. The vendor is rotating integration credentials.
splash: Organizations using the affected COMSBI SaaS tenants, their end users and followers of connected LINE Official Accounts.
wipe: Confirm tenant scope and credential rotation with Sonicmoov. Review LINE activity and verify unexpected messages through a known channel.
tags:
- SaaS
- LINE
- Data breach
date: '2026-11-12'
updated: 2026-11-17
level: 4
inTheWild: 'yes'
timeline:
- date: Nov 9–10, 2026
  title: Internal accounts are used to obtain tenant data
  body: Sonicmoov says it detected abnormal cloud activity on November 10, blocked the abused permissions and attack traffic, reset internal passwords and forced logouts.
- date: Nov 12, 2026
  title: Sonicmoov discloses the SaaS compromise
  body: The company confirms exfiltration and says LINE integration credential rotation is in progress. The SaaS remains available.
- date: Nov 13, 2026
  title: Tokyo Tatemono and Human Adjust disclose their scope
  body: Tokyo Tatemono confirms exposure involving up to 490 people. Human Adjust reports two potential exposure categories, up to 58,510 service users and up to 116,518 LINE followers.
- date: Nov 13, 2026
  title: LIFULL, Kintetsu Real Estate and Nippon Pet Food identify affected LINE accounts
  body: LIFULL and Kintetsu Real Estate give account-level estimates. Nippon Pet Food reports reissue of credentials for its LINE integration.
- date: Nov 14, 2026
  title: Keihan Holdings reports scope across four subsidiaries
  body: The group lists potentially affected LINE followers and other customer data by account and warns that counts can overlap. Cable TV separately confirms exposure of its LINE profile and survey data.
- date: Nov 16, 2026
  title: Sonicmoov opens a COMSBI inquiry form
  body: Potentially affected users can contact the company via the form linked from its official notice.
- date: Nov 16, 2026
  title: Nissin Foods confirms LINE profile and prize delivery data were taken
  body: The notice lists 1,374,157 LINE profile records. The 543 prize-winner records are within that affected group. Nissin began notifying reachable users through its official account.
checklist:
- title: Confirm exposure and containment for your tenant
  hint: Use support@sonicmoov.com or a known Sonicmoov support channel. Ask which tenant data and integrations were involved, whether vendor sessions and cloud permissions were revoked, and which integration credentials have been replaced.
- title: Check connected LINE Official Accounts
  hint: Coordinate credential reissue and invalidation with Sonicmoov for affected integrations. Verify that only expected credentials work, review outbound messages and integration changes, and preserve access and delivery logs. Notify affected users through established channels.
- title: Verify messages through a channel you already trust
  hint: If you follow an affected LINE account or receive a notice, verify unusual messages, calls, links or attachments with the organization using a known contact. Sonicmoov says it will not ask for your password or credentials.
- title: Verify a Nissin campaign notice through the official channel
  hint: Nissin is contacting users it can reach via its LINE account @nissin_campaign. If you cannot receive LINE messages or get a suspicious request, use the contact form linked from Nissin’s notice. Nissin says it will never request passwords or verification codes for this response.
sources:
- name: Sonicmoov COMSBI contact form announcement
  url: https://sonicmoov.com/news/92uaoo64n
  says: Links to a dedicated form for potentially affected users.
  primary: true
- name: Sonicmoov SaaS incident notice
  says: Confirms the entry path, affected data categories, containment and ongoing credential rotation.
  url: https://sonicmoov.com/news/5ttj9ndzh
  primary: true
- name: Tokyo Tatemono customer notice
  says: Confirms exposure and gives the current upper bound for its Nihonbashi building workers LINE account.
  url: https://tatemono.com/news/images/8e3fa062877536ef406dc45520e09dc9.pdf
  primary: true
- name: Human Adjust disclosure
  says: Lists separate upper bounds for service users and followers.
  url: https://human-adjust.co.jp/system/wp-content/uploads/2026/11/2bc5fe7b03948188b21ef5e120684a70.pdf
  primary: true
- name: Sonicmoov Enterprise Infrastructure follow-up
  says: Describes a separate event and its credential response.
  url: https://sonicmoov.com/news/t_ujy0ugk
  primary: true
- name: Keihan Holdings November 14 customer notice
  says: Lists affected LINE accounts, upper bounds by data category and possible double counting.
  url: https://www.keihan.co.jp/corporate/info/release/assets/261114_keihan-holdings.pdf
  primary: true
- name: LIFULL customer notice
  url: https://lifull.com/news/51097/
  primary: true
  says: Identifies the affected LINE account, profile and shipping fields, counts and individual notifications.
- name: Kintetsu Real Estate customer notice
  url: https://www.kintetsu-re.co.jp/r/pdf/261113.pdf
  primary: true
  says: Gives separate upper bounds for LINE followers and other user records for Paradis Gakuenmae.
- name: Nippon Pet Food customer notice
  url: https://www.npf.co.jp/news/detail/33
  primary: true
  says: Names the affected account and gives data categories, credential reissue and notification details.
- name: Cable TV customer notice
  url: https://www.cc9.jp/news/13680/
  primary: true
  says: Identifies follower registration and survey data and gives the incident contact.
- name: Nissin Foods customer notice
  url: https://cdn.nissin.com/gr-documents/attachments/news_posts/13997/07e7740722022791/original/20261116-3.pdf
  primary: true
  says: Confirms the two overlapping data categories, individual notifications and restart of applications on a separate system.
---

The compromised Sonicmoov accounts could administer multiple customers. How the attacker obtained the credentials remains under investigation. Sonicmoov says affected fields varied by customer and included names, phone numbers, email addresses, postal addresses, birth dates and gender. LINE follower data included display names, profile images, status messages and system-assigned LINE user IDs, which differ from the LINE IDs people choose for friend search. The SaaS does not store credit card data.

Tokyo Tatemono’s notice applies to registered members of its Nihonbashi building workers account. It excludes passwords, home addresses, dates of birth and card data for that account. Human Adjust’s two figures are preliminary upper bounds. Overlap is unknown and Sonicmoov has published no aggregate affected count.

Sonicmoov says this compromise affected the SaaS environment. Its separately hosted Enterprise Infrastructure had its own earlier incident and credential response; Sonicmoov explicitly excludes it from this SaaS incident. For the SaaS, Sonicmoov says it restricted bulk data access and plans mandatory two-step authentication and source restrictions for the admin interface. Its notice does not confirm completion of every LINE credential rotation.

Keihan Holdings published upper bounds by account. Potential exposure at Keihan Railway’s fan account covers 26,914 follower profiles. Kyoto Tower Sando lists 90,550 follower profiles and nine people’s names or addresses. Hirakata Mall lists 46,957 follower profiles and 35,025 people’s birth dates or gender. Keihan Department Store lists 51,223 follower profiles and 28,000 people’s other personal details. THE THOUSAND KYOTO and Kyoto Century Hotel together list 8,742 follower profiles and 1,298 people’s other personal details. Keihan says the counts can overlap both across accounts and between data categories within an account.

LIFULL confirmed that data from its LIFULL HOME’S member LINE account was taken. It gave an upper bound of 2,479 people as of November 12. The profile fields include display names, profile-image URLs and LINE user IDs. It was still checking status messages. Among those 2,479 people, campaign shipping records included 313 names, 761 email addresses and 422 addresses, with possible overlap. On November 13, LIFULL reported the incident to Japan’s Personal Information Protection Commission and began contacting affected people who could receive messages from that LINE account. If you cannot receive those messages, use the privacy inquiry form linked from LIFULL’s notice. Kintetsu Real Estate identified up to 3,716 follower records and up to 137 records containing address or gender for the Paradis Gakuenmae account.

Nippon Pet Food confirmed exposure involving its Beauty Pro LINE account, including profile details and some contact, prize delivery and survey data. It says credentials used to connect its LINE account were reissued and that notifications would begin on November 13. Cable TV’s November 14 notice identified LINE profile and survey information and directed inquiries to Sonicmoov at support@sonicmoov.com. The notices from Nippon Pet Food and Cable TV include former followers who blocked or removed the accounts. Verify any notification through the affected organization’s established channel.

Sonicmoov’s [November 16 announcement](https://sonicmoov.com/news/92uaoo64n) links a form for potentially affected users to ask about the incident.

Nissin Foods confirmed that COMSBI held 1,374,157 affected LINE profiles for its campaign account, including display names, system-assigned user IDs, profile-image URLs and status messages where set. The notice covers followers during September 9 to November 5, including people who never entered the campaign and some who had blocked the account. The same group includes 543 winners whose names, name readings, postal codes, addresses and phone numbers were taken. The two counts describe overlapping records for one customer. Nissin began individual LINE notifications on November 16 where delivery was possible. After finding no unauthorized access or leak on its separate Cup Noodle points platform, it resumed applications there in phases that day.
