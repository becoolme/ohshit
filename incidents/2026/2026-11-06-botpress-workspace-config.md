---
title: Botpress intrusion exposes bot configurations in 16 customer workspaces
level: 4
date: '2026-11-06'
tags: [Botpress, SaaS, credentials]
summary: An attacker bypassed a Botpress internal authentication proxy and used a staff API credential to read bot configurations in 16 customer workspaces. Integration settings were changed in two other workspaces. Affected customers should rotate credentials stored in the bots named in their notices.
splash: Botpress workspaces identified in direct notices, and third-party services whose credentials were stored in the affected bots.
wipe: Use the notice to identify affected bots, revoke and replace their integration credentials, and audit the connected services.
inTheWild: 'yes'
inTheWildNote: Botpress confirms configuration reads and integration changes in customer workspaces.
timeline:
- date: Oct 12, 2026
  title: Probing begins against the internal authentication proxy
  body: A sign-in validation flaw allowed sessions that appeared to belong to staff.
- date: Oct 13–21, 2026
  title: The attacker accesses internal tools and some connected systems
  body: Botpress reports exposure of internal information about staff API credentials and visibility into customer account information.
- date: Oct 21, 07:44–08:23 UTC
  title: An employee credential is used to read bot configuration
  body: The employee had administrative access through workspace membership. Botpress identified configuration reads in 16 workspaces during this window.
- date: Oct 21, 2026
  title: Botpress fixes the proxy and revokes the employee credential
  body: Botpress fixed the proxy at about 16:25 UTC and also rotated its secret. It says the subsequent attempts it observed through November 3 were rejected.
- date: Nov 6, 2026
  title: Botpress publishes the incident report
  body: The company discloses a separate integration change in each of two other workspaces. It says it contacted affected owners with the bots and integrations involved. Its internal rotation and hardening work continues.
checklist:
- title: Identify the affected bots and integrations
  hint: Use the list in the notice from Botpress and confirm unclear scope through your existing support channel. Keep the notice and preserve integration settings and provider audit logs.
- title: Revoke and replace the secrets stored in those bots
  hint: In each issuing service, invalidate and replace the affected bot's AI provider keys, messaging tokens, CRM credentials and other stored secrets. In Studio, open the affected bot's Integrations panel, select the installed integration and enter the new values in its settings. Publish when the integration requires it, then test. Check development and production configurations separately where you use both.
- title: Audit connected services and verify settings
  hint: Compare the affected integrations against known-good configuration and restore any settings that were changed without authorization. Review provider audit and usage logs and billing for unexpected API calls or charges since the exposure. Report suspicious activity to the provider and Botpress through their established channels.
sources:
- name: Botpress incident report
  url: https://botpress.com/blog/security-incident-disclosure-november-2026
  primary: true
  says: Describes the proxy flaw, staff credential, two workspace groups, containment, scope limits and customer rotation request.
- name: Botpress Studio integration documentation
  url: https://www.botpress.com/docs/studio/concepts/integrations/
  primary: true
  says: Explains how to open and configure an installed integration in Studio.
---

Botpress says the attacker reached internal tools by exploiting a flaw in the proxy that validated sign-ins. A staff API credential then granted access to bot configurations through the employee’s workspace memberships. Two other workspaces had one integration setting changed apiece through weaknesses in integration setup. The published counts are workspaces, and Botpress did not give a count of valid secrets obtained or report misuse at downstream providers.

Botpress says its logs could not establish which affected bots held valid credentials when read. It asks affected customers to treat every credential stored in the named bots as exposed. The company found no evidence of access to end-user conversations or staff identity-provider accounts, or of changes to its source code, build pipelines or published packages. It assesses that the attacker sought AI capacity for resale and reports no ransom demand or sign of publication or sale of customer data.
