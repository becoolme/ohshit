---
title: Researcher reports 150 million image files exposed in Kik-linked cloud storage
level: 4
date: 2026-11-16
tags: [Kik, cloud storage, data exposure, privacy]
summary: Jeremiah Fowler reports a publicly accessible database containing 150,146,000 profile image files linked to Kik resources. The total includes thumbnails and originals, with about 75 million unique images estimated. Access was later secured; exposure duration and third-party access remain unknown.
splash: People depicted in profile images linked to Kik; the file count is not an affected-user count
wipe: Review profile-photo privacy, report impersonation through official support, and await verified scope and remediation details
inTheWild: unknown
inTheWildNote: Researcher verified public access; malicious access or misuse has not been established.
timeline:
  - date: Nov 16, 2026
    title: Fowler publishes the exposure investigation
    body: The report says the database was secured several days after disclosure attempts. Discovery, notification and closure dates are not specified.
checklist:
  - title: Review the privacy of profile images you use
    hint: General user guidance: check your current Kik profile image and available privacy controls, and avoid photos that reveal sensitive personal details. Replacing or deleting a photo cannot establish that earlier public copies have disappeared; ask official support about your image's exposure and retention.
  - title: Report impersonation through established channels
    hint: If a known account or image is being impersonated, preserve the offending profile URL, timestamps and relevant messages, then use Kik's official support/reporting flow. The research does not prove that impersonation occurred in this exposure. Do not treat file totals as evidence that your account or password was accessed.
  - title: For storage operators, verify access controls and retain evidence
    hint: General operator guidance: check object-storage policies and unauthenticated object access, restrict unintended public access and retain available access/audit logs for investigation. Review original and thumbnail copies and intended application delivery paths. An index count alone cannot determine who downloaded data; only the responsible operator's investigation can establish exposure scope and duration.
sources:
  - name: Jeremiah Fowler's original investigation published by ExpressVPN
    url: https://www.expressvpn.com/research/kik-data-exposed
    primary: true
    says: Reports the file count, estimated unique images, Kik-associated resource correlation, disclosure attempts and later closure; explicitly leaves management, access duration and third-party misuse unknown.
---

Fowler found publicly reachable cloud storage with profile images whose database naming and matching Kik-associated resource URLs linked the collection to the messaging platform. The research reports 150,146,000 files, including original and thumbnail versions, and estimates about 75 million unique images. These are researcher observations and an estimate, not a vendor-confirmed count of individuals. A person or account can have multiple images; the report does not establish that every depicted person is a Kik user.

The collection included images indexed across 2021–2026. Those dates do not establish how long public access was available. Fowler says most disclosure emails bounced, a support ticket was created without a substantive reply, and the database was secured several days later. The exact management responsibility—Kik, MediaLab, a contractor or another provider—remains unresolved. No internal-system intrusion, account access or malicious reuse is established. The large observed public exposure supports L4 even though unauthorized third-party downloads have not been confirmed.

The researcher also reported suspected illegal imagery to NCMEC and the Connecticut Attorney General's office. Apparent age in a photograph does not establish the account holder's age. The earlier state child-safety investigation is separate context, not proof of the cause of this storage exposure. No customer patch, specific credential-reset requirement or final forensic report is supplied. The checklist's privacy and storage actions are general guidance, not a claim that Kik has prescribed them.
