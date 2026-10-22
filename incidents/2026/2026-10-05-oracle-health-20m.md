---
title: "The Oracle Health breach tally quietly climbs to nearly 20 million patients"
headline: "Oracle Health: the 2025 breach is now ~20 million people"
level: 4
date: 2026-10-05
tags: [healthcare, data leak]
ecosystems: [cerner]
summary: >-
  Stolen logins on two legacy Cerner servers in early 2025. The true size only surfaced through a Texas
  attorney-general filing: 19.9 million people, with SSNs, diagnoses, medications and medical images.
  Oracle still hasn't published a total.
splash: "~19.9M patients of legacy Cerner clients in the US, at least 29 hospitals and health systems"
wipe: "Freeze your credit, watch for fake “Oracle Health” notices; providers: enforce MFA and retire legacy servers"
inTheWild: "yes"
inTheWildNote: Data stolen in 2025; this is the updated count
oneLiner: >-
  Someone logged into two old Cerner servers that never got moved to the cloud, and walked out with the medical
  records of about one in seventeen Americans.
timeline:
  - date: Jan 22, 2025
    title: Intrusion into two legacy Cerner servers
    body: Through stolen credentials. Oregon lists the exposure window as Jan 22 to Apr 1, 2025.
  - date: Feb–Mar 2025
    title: Oracle discovers it
    body: Discovery is reported as Feb 20 or Mar 7, 2025.
  - date: ~Mar 31, 2025
    title: Oracle starts quietly notifying hospital clients
  - date: Oct 2, 2026
    title: Updated total filed with the Texas attorney general
    body: 19.9 million people, including 2,992,244 Texans.
  - date: Oct 5, 2026
    title: Bloomberg reports “nearly 20 million”
checklist:
  - title: Freeze your credit
    hint: Equifax, Experian and TransUnion. It's free in the US
  - title: Watch for medical identity theft
    hint: Read your Explanation of Benefits for care you never got
  - title: Ignore unsolicited “Oracle Health” notices with links
    hint: Breach news always brings phishing
  - title: "Providers: inventory legacy Cerner servers"
    hint: Retire or isolate anything not migrated
  - title: "Providers: enforce MFA everywhere"
    hint: This started with a stolen password
sources:
  - name: HIPAA Journal
    url: https://www.hipaajournal.com/oracle-health-data-breach/
    says: 19.9M per Texas AG filings; total not independently verified; HHS OCR still shows a placeholder
  - name: Becker's Hospital Review
    url: https://www.beckershospitalreview.com/healthcare-information-technology/ehrs/oracle-health-breach-exposed-data-of-nearly-20-million-people-report/
    says: Reports the near-20M figure
  - name: BankInfoSecurity
    url: https://www.bankinfosecurity.com/oracle-healths-cerner-ehr-breach-figure-soars-to-20-million-a-33033
    says: Breach figure history
  - name: Yahoo Finance / Bloomberg
    url: https://finance.yahoo.com/healthcare/articles/oracle-2025-health-breach-compromised-230919298.html
    says: Bloomberg's Oct 5 report
---

This is an old breach whose size kept growing. In **January 2025** someone used **stolen credentials** to
get into two legacy Cerner servers that had not yet been migrated to Oracle Cloud. The servers held data
from hospitals and health systems that use Cerner's electronic health records.

Oracle never published a total. The number came out through state filings: on **October 2, 2026** a
filing with the **Texas attorney general** put it at **19.9 million people**. HIPAA Journal notes that
the figure is not independently verified, and the federal HHS breach portal still shows a placeholder.

Exposed data includes names, Social Security numbers, addresses, diagnoses, medications, test results,
medical images, medical record numbers and physician names. Lawsuits are ongoing.

> No primary source here: neither Oracle nor the Texas AG has commented publicly. If you can link the
> filing itself, please [open a pull request](https://github.com/becoolme/ohshit/blob/main/CONTRIBUTING.md).
