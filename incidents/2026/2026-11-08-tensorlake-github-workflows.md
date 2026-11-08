---
title: Tensorlake reports malicious GitHub workflow runs after an upstream breach
level: 4
date: 2026-11-08
tags: [Tensorlake, GitHub Actions, Secrets]
summary: Tensorlake says an attacker used engineering sandbox access to push malicious branch commits and trigger GitHub Actions to probe build and deployment secrets. The company removed the internal app, rotated secrets and asked customers to rotate their Tensorlake API keys as a precaution.
splash: Tensorlake engineering repositories reachable from its internal automation sandboxes and the workflows triggered from those branches.
wipe: Rotate Tensorlake API keys, update dependent workloads and revoke superseded keys. Review usage and follow the vendor’s updates.
inTheWild: 'yes'
inTheWildNote: Tensorlake confirms malicious pushes and workflow runs probing for secrets.
timeline:
  - date: Nov 8, 00:39 UTC
    title: Tensorlake discloses unauthorized branch pushes and workflow runs
    body: Founder Diptanu Choudhury says the company rotated its secrets, removed the internal app and notified paying customers by email. Customers are asked to rotate their API keys.
  - date: Nov 8, 01:44 UTC
    title: Founder links the entry path to an upstream breach
    body: In a follow-up, Choudhury attributes Tensorlake’s exposure to a provider breach.
checklist:
  - title: Rotate Tensorlake API keys
    hint: Sign in directly to the Tensorlake console, replace API keys, update secret stores and workloads using TENSORLAKE_API_KEY, verify the replacements work, and revoke the old keys. Apply the same rotation to CI and scheduled jobs.
  - title: Review usage and watch for vendor follow-up
    hint: Compare recent API usage and sandbox activity with your own deployment and job records. Save timestamps and identifiers for unexpected activity and contact Tensorlake through its official site. Check official customer email and the trust center for further incident details.
sources:
  - name: Tensorlake founder’s disclosure
    url: https://x.com/diptanu/status/2119228351978328379
    primary: true
    says: Confirms the repository and workflow activity, secret rotation, internal app removal and customer guidance.
  - name: Tensorlake founder’s follow-up
    url: https://x.com/diptanu/status/2119244751178551446
    primary: true
    says: Attributes exposure to an upstream provider breach.
  - name: Tensorlake Cloud console
    url: https://cloud.tensorlake.ai/login
    primary: true
    says: Official entry point for Tensorlake customers.
  - name: October Tensorlake npm advisory
    url: https://github.com/tensorlakeai/tensorlake/security/advisories/GHSA-8g63-53c9-65j2
    primary: true
    says: Documents the separate October 8 malicious npm release.
---

Tensorlake says an internal automation app running on an upstream provider started sandboxes under engineering team accounts. Those sandboxes had access to Tensorlake GitHub repositories. An attacker pushed malicious code to branches and triggered GitHub Actions to probe for build and deployment secrets. Tensorlake says it found no evidence of access to critical systems beyond the probing and reports that customer API keys and sandboxes were unaffected. The company has not published affected branch names, workflow identifiers or evidence that particular secrets were retrieved.

The founder’s initial public post named Railway as the app host. The follow-up described an upstream provider breach. The initial post and follow-up are available in [the disclosure’s public copy](https://teapaw.org/diptanu/status/2119228351978328379) and [the reply’s public copy](https://teapaw.org/diptanu/status/2119244751178551446). The relationship to [Railway’s October incident](/incidents/railway-env-vars/) has not been independently verified. The earlier Tensorlake npm advisory covers a different event.

Tensorlake says it rotated its secrets and removed the app from the upstream host. It emailed paying customers and asked customers to rotate Tensorlake API keys as a precaution. Further details are expected by email and in the [Tensorlake trust center](https://trust.tensorlake.ai/).
