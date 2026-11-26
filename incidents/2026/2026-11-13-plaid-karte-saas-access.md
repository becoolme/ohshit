---
title: PLAID confirms KARTE data theft and suspends all projects
date: '2026-11-13'
updated: '2026-11-26'
level: 4
inTheWild: 'yes'
tags:
- Data breach
- Personal information
summary: PLAID reports overlapping company counts for imported, analytics, cache and credential exposure, including former customers. Its 79,249 account emails and DHC's 19.11 million records are separate counts. All projects stopped November 13; requested-data delivery continues. Phased restart targets mid-January 2027, not a confirmed recovery date.
splash: Current and former KARTE customer data and integration credentials; all tracking, delivery, Datahub and administration services.
wipe: Revoke affected integration credentials, verify PLAID’s project notice, and save logs and reconcile interrupted jobs before retrying.
inTheWildNote: PLAID confirms the attacker exploited a server vulnerability and read data.
timeline:
- date: Nov 13, 2026 05:44 UTC
  title: Plaid announces staggered shutdown
  body: All KARTE projects are affected. In-progress email and data workflow jobs may stop partway.
- date: Nov 13, 2026 14:35 UTC
  title: Plaid reports customer notifications
  body: Plaid says it identified potentially exposed information and emailed affected customers.
- date: Nov 14, 2026 12:05 UTC
  title: Plaid continues investigating
  body: Plaid still gives no restart time.
- date: Nov 14, 2026
  title: SOMPO Himawari restores its official LINE functions
  body: Its later customer guide reports communication blocking and credential invalidation, and restoration of LINE functions. This is not restoration of KARTE as a whole.
- date: Nov 15, 01:37 UTC
  title: PLAID reports network isolation has contained further access
  body: The vendor says the affected environment has been disconnected and new unauthorized access and ongoing data outflow have stopped. This is a containment statement, not a service restart or recovery of copied data.
- date: Nov 16, 2026
  title: PLAID confirms data exposure and entry path
  body: Exposed data includes KARTE account email addresses, external integration credentials and some customer imports. Numbers for the last two categories remain under investigation.
- date: Nov 17, 2026
  title: No restart date yet
  body: PLAID continues investigating by data category and contacting affected customers directly.
- date: Nov 17, 11:53 UTC
  title: PLAID starts sending affected imports to customers who requested them
  body: Identification of affected records and customers continues. PLAID has not given a restart estimate.
- date: Nov 17, 2026
  title: Shueisha describes notification outages and credential revocation
  body: The publisher suspended member-data links and revoked integration keys. Member-data impact remains under review; no connected-service intrusion or secondary harm was confirmed, and no delivery restart date was given.
- date: Nov 17, 2026
  title: Shimamura confirms two categories of exposed records
  body: The retailer reports about seven million member records and 50,000 family records. These are category counts, not a cross-customer unique-person total; confirmed fields and unconfirmed categories differ.
- date: Nov 17, 2026
  title: Morisawa confirms exposure of purchaser records
  body: Morisawa reports 23,957 records with names, email addresses and user IDs for some Morisawa Fonts purchasers since May 2023; the detailed scope remains under investigation.
- date: Nov 17, 2026
  title: JINS confirms downstream exposure with an account-count ceiling
  body: The issuer reports up to approximately 18.29 million registered accounts potentially affected; this is not a verified number of leaked accounts or unique people. Passwords and credit-card data are excluded.
- date: Nov 18, 2026
  title: Mitsubishi UFJ Trust and Banking confirms its downstream data exposure
  body: The bank reports approximately 230,000 records across two customer categories, with transformed membership identifiers and limited attributes. It excludes banking credentials and account numbers and says its own systems were not intruded upon. This is not a new count of unique victims.
- date: Nov 18, 2026
  title: MeetsMore separates KARTE exposure from its own earlier intrusion
  body: Its KARTE notice reports 60,000 people with personal contact fields and 3,398,469 with only member identifiers and prefectures. This is separate from its November 16 disclosure about an attack on MeetsMore itself.
- date: Nov 18, 2026
  title: DHC confirms approximately 19.11 million customer records leaked
  body: Its notice lists seven information categories, excludes online-shop passwords and payment-card details, and describes integration-credential revocation and planned individual notifications.
- date: Nov 18, 2026
  title: MUFG Bank confirms approximately 6.5 million limited-attribute records
  body: Fields are gender, age and region. The bank excludes identifying/contact information, says its own systems were not intruded upon and plans individual notices. This is distinct from Mitsubishi UFJ Trust and Banking's disclosure.
- date: Nov 18, 2026
  title: Mitsubishi UFJ Morgan Stanley Securities confirms category-data exposure
  body: About 280,000 Online Trade records contain gender and age-band codes; identifying/contact information and account credentials are excluded.
- date: Nov 19, 2026
  title: SOMPO Himawari confirms two separate service datasets
  body: MY Himawari has 60,000 records and aruku has 260,000, with different fields. Individual notification is planned for November 24–December 4.
- date: Nov 19, 2026
  title: Timee confirms employer-contact information exposure
  body: Timee reports up to 226,662 employer contacts, excludes worker data and login credentials, and plans individual contacts. Its 227,561 management IDs are not a unique-person count.
- date: Nov 20, 2026
  title: PLAID publishes revised scope and former-customer retention failure
  body: Company counts are 570 for imported data, 487 for analytics, up to an estimated 409 for cache and 754 for integration credentials; they overlap. PLAID also confirms 45,816 sales/support contact records, separately from 79,249 account emails including Wicle. Former contracts are included because required deletion was missed.
- date: Nov 20, 2026
  title: Recovery target, data handover and billing measures announced
  body: PLAID says its scope investigation finished by November 19, plans detailed customer-data handover from November 24 and independent validation before recovery, and waives applicable November and outage-period service fees. This does not establish completed handover, deletion or recovery.
- date: Mid-January 2027 (target)
  title: Phased service restart targeted after structural improvements
  body: Announced November 20; not a committed date for full restoration. PLAID says it will announce changes to this target.
checklist:
- title: Revoke affected external integration credentials
  hint: Revoke affected secrets or access tokens on the connected service, review unexpected calls, and reissue and verify credentials using PLAID’s guidance.
- title: Confirm your project’s exposure
  hint: Follow the dated November 20 report as well as the older status incident. Through your existing PLAID support channel or support+status@plaid.co.jp, verify any email and ask for affected project IDs, fields, time ranges and credentials across imports, analytics and cache. Former customers should ask too, even without a notice, because old contact details may be stale. Ask how to obtain your affected data and confirm actual handover; the November 24 date was a plan, not proof of delivery to everyone.
- title: Preserve logs and reconcile failed jobs
  hint: Save available application, integration and delivery logs. Check downstream records for partially delivered KARTE Message mail or Datahub transfers. Prevent duplicate side effects by replaying only missing work after recovery.
- title: Validate recovery
  hint: Mid-January 2027 is a phased restart target, not present recovery or a full-service deadline. Wait for PLAID's actual restart instructions before resuming workflows. Verify tracking, deliveries and integrations on a limited set of jobs first, then confirm the expected recipients and results. Independent validation is planned; no completed validation report is established here.
- title: Follow the notice for the downstream service you actually use
  hint: Mitsubishi UFJ Trust and Banking will contact affected customers individually. Verify messages through the bank's established channels or its published incident contact (0120-304-560, weekdays during the hours in its notice, November 18–December 11). The bank says it never requests PINs or passwords by email, SMS or telephone. Shueisha users should check the publisher's delivery notices; missing newsletters, restock pushes or convenience-store payment reminders do not establish whether a payment or order deadline changed. That last check is general workflow guidance, not a declared extension.
- title: Use Shimamura's current guidance without inventing a reset requirement
  hint: Shimamura says no special customer procedure is required and that it cannot confirm an individual's exposure through inquiries. Use its official member contact page https://www.shop-shimamura.com/common/contact/entry/?bk=0 (login required) if needed, follow updates and avoid unsolicited links or requests for passwords/authentication codes. Do not turn its unconfirmed member-number/email/LINE-ID exposure into a claim that those fields leaked, or promise that risk is zero.
- title: Check Morisawa and MeetsMore notices separately
  hint: Morisawa plans individual notices; avoid suspicious email links and attachments. MeetsMore began notices from no-reply@meetsmore.com and provides a contact form in its KARTE notice. Verify messages through the official page. MeetsMore says this KARTE exposure requires no password change; its separate account-intrusion notice has different reset instructions.
- title: Use DHC's dedicated contacts and verify notification messages
  hint: DHC plans individual notices through its existing customer contact details. Use the notice's dedicated line 0120-087-370 (09:00–17:00, including weekends and holidays) or customer consultation line 0120-575-391 (09:00–17:00, excluding Sundays and holidays); the PDF does not state a timezone. Do not open suspicious DHC-themed email links or attachments or enter personal details or passwords through them.
- title: Follow JINS's issuer notice without treating the ceiling as confirmed loss
  hint: Check the November 17 issuer disclosure and later official JINS updates for your data categories. Do not reply to suspicious emails, open their links or attachments, or enter IDs, passwords or card information through them. JINS disconnected its KARTE data link on November 13; that does not recover data already copied.
- title: Use MUFG Bank's own inquiry and security channels
  hint: The bank's dedicated incident line is 0120-322-250, weekdays 09:00–17:00 from November 18 through December 18; the notice gives no timezone. Delete unsolicited emails/SMS or end unexpected calls without responding. If you entered a password or PIN on a fake bank site or gave it to a third party, contact the bank through https://www.bk.mufg.jp/info/security/toiawase.html . The Trust bank's separate hotline is not this bank's incident channel.
- title: Use the securities firm's separate incident contact
  hint: Mitsubishi UFJ Morgan Stanley Securities plans individual email or other notices. Its dedicated line is 0120-99-3840, weekdays 09:00–17:00 excluding holidays, November 18–December 11; the PDF gives no timezone. Avoid suspicious links, attachments and requests for personal information. This is a different firm and hotline from either MUFG bank above.
- title: Follow SOMPO Himawari's notification and recovery guidance
  hint: Notices are planned for November 24–December 4 and will not request password resets or account information. Do not provide PINs, passwords, card numbers or authentication codes, transfer money or operate an ATM on an unsolicited caller's instructions. Delete suspicious messages without opening links. The dedicated line is 0120-113-029, weekdays 09:00–18:00 and weekends/holidays 10:00–17:00; no timezone is stated. The guide says delayed points will be credited automatically after recovery, including past qualifying activity; no recovery date is promised.
- title: Verify Timee employer-contact notices
  hint: Use Timee’s published support form https://taimee.zendesk.com/hc/ja/requests/new to verify unexpected contacts. Avoid suspicious links or attachments; Timee and PLAID will not request service passwords or credentials by email/SMS. Worker data is excluded from this notice.
- title: Verify retention and fee handling through official support
  hint: Ask PLAID for the affected former-contract data and its eventual deletion confirmation; the November 20 report says records are still preserved for recovery validation and will be deleted afterward, not already erased. Confirm the applicable November/outage-period fee waiver through your normal billing contact. End users can reach the official inquiry route at https://plaid.co.jp/notice/202611-faq/ . A fee waiver does not establish compensation for other losses.
sources:
- name: Plaid incident notice
  says: Confirms detected third-party access and the all-project shutdown.
  url: https://plaid.co.jp/news/20261113/
  primary: true
- name: KARTE incident status
  says: Tracks notifications, job impact, delivery of affected imports on request and recovery status.
  url: https://status.karte.io/incidents/rs1gsmckc197
  primary: true
- name: PLAID November 16 breach confirmation
  url: https://plaid.co.jp/news/20261116/
  says: Documents server vulnerability, credential theft, exposure and customer notification.
  primary: true
- name: PLAID November 17 progress notice
  url: https://plaid.co.jp/notice/202611171100/
  says: Gives no restart estimate.
  primary: true
- name: Mitsubishi UFJ Trust and Banking November 18 customer notice
  url: https://www.tr.mufg.jp/ippan/release/pdf_mutb/261118_2.pdf
  primary: true
  says: Confirms approximately 230,000 downstream records, specific fields and exclusions, no intrusion into its own systems, planned customer contacts and a dedicated support period.
- name: Shueisha November 17 service and response notice
  url: https://www.shueisha.co.jp/wp-content/uploads/2026/11/b985e138d872933dc2ccc3b83c3a53e9.pdf
  primary: true
  says: Describes halted deliveries, revoked integration credentials and suspended data links; member-data impact remains under review and credit-card data was not entrusted to KARTE.
- name: PLAID November 18 16:00 JST progress notice
  url: https://plaid.co.jp/notice/202611181600/
  primary: true
  says: Continues requested-data delivery and recipient identification; there is still no restart estimate.
- name: Shimamura November 17 first disclosure
  url: https://www.shimamura.gr.jp/assets-c/uploads/release20261117_Informationleak.pdf
  primary: true
  says: Confirms member and family record categories, separates known exposure from fields not confirmed leaked and data not held in KARTE, and gives customer guidance.
- name: Morisawa November 17 customer notice
  url: https://www.morisawa.co.jp/about/news/19310
  primary: true
  says: Confirms 23,957 purchaser records, fields and exclusions, continued service, planned individual notices and phishing precautions.
- name: MeetsMore November 18 KARTE notice
  url: https://company.meetsmore.com/page/notice-20261118-karte
  primary: true
  says: Gives two affected-person categories, credential revocation and customer guidance; explicitly separates this breach from its own system intrusion disclosed November 16.
- name: DHC November 18 customer notice
  url: https://dhc-corporate.co.jp/cms_dH8vjpRq/wp-content/uploads/2026/11/2d7a589cb5008fbc262624582782444f.pdf
  primary: true
  says: Confirms approximately 19.11 million customer records, seven information categories and exclusions, revoked integration credentials, planned regulatory reporting and individual contacts, and two inquiry lines.
- name: JINS Holdings November 17 original exchange disclosure
  url: https://www2.jpx.co.jp/disc/30460/140120261117582109.pdf
  primary: true
  says: Confirms downstream JINS exposure, lists eight fields and exclusions, defines approximately 18.29 million as a maximum registered-account population, and dates data-link disconnection and vendor notification.
- name: MUFG Bank November 18 original customer notice
  url: https://www.bk.mufg.jp/news/news2026/pdf/news1118.pdf
  primary: true
  says: Confirms about 6.5 million records with three attributes, excludes identification/contact data and intrusion into the bank's systems, and supplies a distinct dedicated inquiry line and security-response channel.
- name: Mitsubishi UFJ Morgan Stanley Securities November 18 notice
  url: https://www.mumss.com/company/news/000023203.pdf
  primary: true
  says: Confirms approximately 280,000 category-data records, exclusions, stopped data sharing, planned individual notices and a separate inquiry line.
- name: SOMPO Himawari November 19 breach disclosure
  url: https://www.himawari-life.co.jp/-/media/himawari/files/company/news/2026/a-02-2026-11-19.pdf?la=ja-JP
  primary: true
  says: Confirms separate MY Himawari and aruku datasets, specific fields, exclusions and planned notification dates.
- name: SOMPO Himawari November 19 customer and service guide
  url: https://www.himawari-life.co.jp/-/media/himawari/files/company/topics/2026/a-01-2026-11-19.pdf?la=ja-JP
  primary: true
  says: Gives containment, service-specific recovery, automatic points credit, notification safeguards and a dedicated support line.
- name: Timee November 19 employer-contact notice
  url: https://corp.timee.co.jp/news/detail-7442/
  primary: true
  says: Confirms employer-contact fields and different counts, excludes worker/login data, and supplies notification and phishing guidance.
- name: PLAID November 20 investigation and recovery outlook
  url: https://plaid.co.jp/news/20261120/
  primary: true
  says: Revises exposure to four overlapping company categories and sales/support contacts, corrects former-customer scope and deletion failures, and announces phased recovery target, handover plan, fee waiver and support channels.
---

PLAID says an attacker exploited a server vulnerability to steal connection credentials, read data from certain databases and take over a PLAID account to access the administration console. The 79,249 figure counts account email addresses, including Wicle. Personal information in imports depends on what each customer uploaded. The shutdown affected all projects. Its November 20 report replaces the earlier unresolved company scope with the categories below; these are not counts of individual people.

In its November 15 01:37 UTC status update, PLAID said network isolation of the affected environment was complete and had stopped new unauthorized access and continuing data outflow. That is the vendor's containment assessment. It does not establish that copied data was recovered, that every downstream credential was revoked or that service had restarted. The November 19 status update gave no restart estimate; the newer November 20 company report supplies the phased target below.

**November 26 correction and follow-up:** The earlier entry missed PLAID's November 20 findings. PLAID reports imported-data exposure at 570 companies, analytics at 487, cache at an estimated maximum of 409 and integration credentials at 754. Categories overlap and must not be summed. Cache contents were overwritten and individual reads were not logged, so all possibly present cache data is treated as potentially exposed. A separate 45,816 sales/support contact records includes names and emails; do not add it to account emails or downstream record totals as unique victims.

PLAID says its internal scope investigation finished by November 19, not that every notification or remediation was complete. It corrects its earlier current-customer wording: data from ended contracts remained because required deletion failed. Those records were still preserved for recovery validation, with deletion and notification to follow. It planned detailed handover from November 24. Structural improvements and third-party validation precede a targeted phased restart in mid-January 2027; this is not an actual restart or full-recovery commitment. Applicable November and outage-period KARTE charges are waived, with customer-specific details to follow; other damages are not covered by that statement.

At 11:53 UTC on November 17, PLAID said it had begun sending the affected subset of imported customer data to companies that had requested it. The statement covers data such as imports through KARTE’s linked tables. PLAID was still identifying affected records and customers and planning further notifications. It gave no service restart date.

Mitsubishi UFJ Trust and Banking's November 18 notice reports about 230,000 exposed records across two customer categories. Fields include transformed online-banking membership identifiers, gender and an email-registration flag; the latter is not an email address. Some customers who also use the bank's official LINE account have its user-identification number and survey attributes (gender, age and prefecture) included. The bank excludes names, addresses, birth dates, phone numbers, email addresses, account numbers, PINs and passwords. It says these records alone cannot directly identify an individual or authorize online banking or transactions; no asset or transaction impact was confirmed. Its own systems were not breached. These are bank-reported records, not a verified unique-person count, and must not be added to PLAID's separate account-email figure.

Shueisha's November 17 notice says newsletters, restock notifications and convenience-store prepayment reminders remained disrupted. It revoked integration credentials and stopped sharing member data with KARTE. It was still assessing member-data impact and had confirmed neither unauthorized access at connected services nor secondary harm. It says it had not entrusted credit-card information to KARTE; this exclusion applies to Shueisha's data, not every KARTE customer. PLAID's November 18 16:00 JST notice still gives no restart estimate.

Shimamura's November 17 first notice confirms about seven million member records containing birth dates, gender, prefecture and postal codes, plus about 50,000 registered-family records containing children's birth year/month. It had not established leakage of member numbers, email addresses or LINE IDs as of that notice, and says KARTE did not hold names, telephone numbers, detailed street/building addresses, credit-card data or member-login passwords. It reported no confirmed misuse. These are two retailer-reported categories; overlap and unique-person totals across them and other customers are not established. Do not combine them with the bank's records or PLAID's administrative-account emails into a total victim count.

Morisawa's November 17 notice confirms 23,957 records containing names, email addresses and user IDs for some customers who purchased through the Morisawa Fonts service site from May 2023 onward. Detailed customer scope and other data remain under investigation. Credit-card information and login passwords were not handled in KARTE and are excluded. Morisawa reported no confirmed misuse, said font-service use was unaffected and planned individual notifications.

MeetsMore's November 18 KARTE notice reports 60,000 people with one or more of name, email, telephone or birth date, and 3,398,469 with only member identifiers and prefectures. Passwords, cards, detailed addresses and LINE IDs are excluded; identifiers alone cannot log in. It revoked affected integration credentials on November 13, stopped KARTE data sharing and began individual notices November 18. No related intrusion into its own systems or secondary harm was confirmed. ProOne does not use KARTE. This is separate from the [MeetsMore system intrusion disclosed November 16](/incidents/meetsmore-schedule-data-theft/), with different causes, paths and data. Do not combine these downstream figures with other KARTE counts.

DHC's November 18 notice confirms approximately 19.11 million customer records leaked through KARTE. Listed information comprises names, email addresses, birth dates, ages, gender, member IDs and newsletter-delivery preferences. Online-shop login passwords and payment-card details are excluded. DHC learned of the incident on November 13 and says it invalidated integration credentials. It reports no confirmed resulting misuse, plans joint reporting with PLAID to Japan's Personal Information Protection Commission and plans individual customer notifications. Neither process is described as completed. The figure is DHC's record count, not a confirmed number of unique people or a total across KARTE customers; do not add it to PLAID's account-email or other customers' counts.

JINS Holdings' November 17 disclosure confirms exposure of some JINS member data. Its approximately 18.29 million figure is the maximum potentially affected registered-account population, not the established number of stolen accounts or people. Listed fields are member IDs, email, surname only, birth date, age, gender, postal code and prefecture only. Passwords and credit-card information are excluded; fields and counts remain under investigation. JINS disconnected data sharing on November 13, received PLAID's exposure confirmation on November 15 and investigated scope internally on November 16. Do not expand surname/prefecture into full names or street addresses.

MUFG Bank's November 18 notice confirms approximately 6.5 million records containing gender, age and region (prefecture or designated city). It excludes names, street addresses, phone numbers, email and other identifying/contact information, reports no confirmed resulting misuse and says its own systems were not intruded upon. It received scope details on November 17 and plans individual notification. This is MUFG Bank, a different entity and dataset from Mitsubishi UFJ Trust and Banking's approximately 230,000 records above; neither figure establishes compromised banking accounts or a combined unique-person total.

Mitsubishi UFJ Morgan Stanley Securities' November 18 notice confirms about 280,000 Online Trade records containing numeric gender and age-band classifications. It excludes names, addresses, birth dates, phone numbers, email, account numbers and passwords. The firm says its own systems were not intruded upon, stopped KARTE data sharing and reports no trading impact. It received scope details November 17 and plans individual notices. These records belong to a third, distinct MUFG entity; do not combine the figures into a unique-person total.

SOMPO Himawari Life's November 19 disclosure confirms 60,000 MY Himawari records with internal management IDs and email-consent flags, and 260,000 aruku records with internal IDs plus optionally entered birth dates and gender. Internal IDs are not login IDs or email addresses. It excludes names, addresses, phone/email, policy/account numbers, payment-card data, PINs and login passwords; aruku health data such as steps/weight is also excluded. Records deleted on withdrawal before the November 13 shutdown are excluded. The insurer reports no intrusion into its own systems or confirmed resulting misuse or contract/transaction impact. These are separate service-record counts, not an established combined unique-person total.

The insurer's customer guide says LINE functions recovered November 14, while MY Himawari app health buttons, achievement messages and immediate points credit remain affected; aruku step counting works but banners are paused. Other basic services continue. Data links were blocked and credentials invalidated November 14. This limited LINE recovery is not a KARTE restart or completed notification; individual emails are planned for November 24–December 4.

Timee’s November 19 notice reports up to 226,662 employer contacts as of November 17: 226,662 email records, 93,862 surname-or-given-name records, 19,289 phone records and 227,561 customer-management IDs. One email can map to several IDs across establishments; these are not login IDs, and passwords/login credentials and job-seeker/worker data are excluded. Timee says its own systems were not intruded upon and reports no confirmed misuse. It plans to contact affected customers and applied on November 19 to join PLAID’s regulatory report; that is not a completed joint filing.
