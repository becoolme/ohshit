---
title: European supermarkets hit by a new wave of refrigeration-controller attacks
level: 4
date: '2026-11-02'
updated: '2026-11-07'
tags:
- OT
- cold chain
- active attack
summary: Supermarkets in multiple European countries reported refrigeration disruption on November 2. Sabcobel described remotely enabled defrost cycles; a researcher confirmed internet-facing management interfaces. Isolate controllers and restore safe settings with refrigeration specialists.
splash: Internet-exposed refrigeration management; exact affected models in the November wave remain unconfirmed
wipe: Remove public management access; verify defrost settings, use protected remote access and follow model-specific recovery
inTheWild: 'yes'
inTheWildNote: CERT-FR confirmed the earlier compromises; EU authorities confirm the November 1–2 wave.
ecosystems:
- industrial-control
fixed:
- product: Refrigeration controller firmware
  version: Model-specific
  status: No universal fixed version established; isolate EOL equipment and plan replacement
timeline:
- date: Oct 12, 2026
  title: CERT-FR warns about refrigeration-controller compromises
  body: Earlier French wave; Danfoss AK-SM/AK-SC and Copeland/Dixell xweb are named.
- date: Oct 16, 2026
  title: CERT-FR revises its recovery guidance
  body: This remains the alert’s last revision; it is not a new November alert.
- date: Nov 2, 2026
  title: Installers and retailers report a new European wave
  body: Belga interviews Sabcobel about remote defrost changes; Supermarket News obtains an Ahold Delhaize statement about affected stores.
- date: Nov 2, 13:37 UTC
  title: Researcher reports internet-facing management on affected systems
  body: Kevin Beaumont says he confirmed this with contacts, and warns that many devices are end of life. No named CVE or detailed forensic report accompanies the post.
- date: Nov 3, 2026
  title: Ireland's NCSC publishes cold-chain operator guidance
  body: The advisory recommends reviewing all remotely accessible refrigeration equipment, including alarm and notification settings and remote-access permissions.
- date: Nov 4, 2026
  title: EU authorities confirm a second wave and urge immediate mitigation
  body: ENISA and partner bodies date the new wave to November 1–2 and say affected member states are investigating.
- date: Nov 5, 2026
  title: Censys measures remaining public controller exposure
  body: Censys counted 3,124 distinct internet-visible hosts across two product families, down from 6,695 on October 9. These are measurements of exposure, not attack or victim counts.
checklist:
- title: Isolate exposed management while preserving safe refrigeration
  hint: 'Follow CERT-FR: remove public IP exposure, coordinate with the refrigeration contractor and check insurance/monitoring obligations before cutting provider telemetry. Keep safe local operation under qualified supervision; do not turn off cooling blindly.'
- title: Verify the complete controller configuration
  hint: Check defrost schedules, temperature settings, alarm thresholds and notification delivery, and remote-access permissions and user accounts against approved values. Have refrigeration and food-safety staff independently check temperatures and the safety of stored stock before returning it to sale.
- title: Recover compromised controllers with the maintainer
  hint: CERT-FR recommends restarting affected Danfoss equipment, or a factory reset if needed, then reconfiguring for service. Preserve available logs/configuration before destructive recovery when safe. A reset alone does not patch a vulnerability.
- title: Restore remote access through a protected network
  hint: Use a secure VPN or protected network. Source-IP filtering limited to the refrigeration provider is an emergency measure, not a durable fix. Verify all other controllers sharing public exposure too.
- title: Apply model-specific hardening and replace unsupported equipment
  hint: Install vendor firmware, change defaults and, for applicable Danfoss controllers, configure Strict security mode. Confirm the right procedure with the manufacturer. Keep unpatchable EOL systems off the public internet; factory reset leaves them open to reinfection.
sources:
- name: CERT-FR CERTFR-2026-ALE-012
  url: https://cert.cyber.gouv.fr/alerte/CERTFR-2026-ALE-012/
  primary: true
  says: October 12 alert, last revised October 16; earlier affected families and recovery steps, not confirmation of each November device.
- name: Kevin Beaumont original public post
  url: https://cyberplace.social/@GossiTheDog/117547117661284939
  primary: true
  says: November 2 observation based on contacts; management exposure and EOL warning, without public forensic evidence.
- name: Public Mastodon status JSON
  url: https://cyberplace.social/api/v1/statuses/117547117661284939
  primary: true
  says: Readable original post and explicit UTC creation time.
- name: Belga interview with Sabcobel
  url: https://www.belganewsagency.eu/press-releases/38269/cyber-attack-sabotages-refrigeration-systems-of-supermarket-chains/
  primary: false
  says: 'Original installer interview: remote defrost manipulation, disconnection and possible food loss.'
- name: Supermarket News interview with Ahold Delhaize
  url: https://www.supermarketnews.com/grocery-technology/new-freezer-cyberattack-hits-ahold-delhaize-others
  primary: false
  says: Separate retailer statement confirms refrigeration disruption; further scope is reported, not a final victim census.
- name: Irish NCSC refrigeration-controller advisory
  url: https://www.ncsc.gov.ie/pdfs/2611020249_Danfoss-Advisory.pdf
  primary: true
  says: Recommends removing direct exposure, inspecting alarms and access permissions, and checking devices regardless of manufacturer.
- name: ENISA and EU partners' joint statement
  url: https://www.enisa.europa.eu/news/joint-statement-on-cyber-incidents-in-refrigeration-systems-across-the-eu
  primary: true
  says: Confirms the November 1–2 wave and urges immediate mitigation while member states investigate.
- name: Censys measurements of controller exposure
  url: https://censys.com/blog/european-refrigeration-controller-exposure-sitrep/
  primary: true
  says: Original host measurements for Danfoss StoreView and Copeland/Dixell XWEB, with limits on causal inference.
---

This is a new November wave, distinct from the French attacks covered by the October CERT-FR alert. Belga’s direct interview with Sabcobel describes attackers switching evaporators into defrost mode at Belgian supermarkets, including Delhaize, Carrefour and Spar. In a separate interview, Ahold Delhaize confirmed refrigeration disruption to Supermarket News. Broader country and store counts remain provisional; this article does not treat installer estimates as a final victim count or quantify losses.

Kevin Beaumont’s original November 2 post says he confirmed internet-facing management on affected systems with contacts, and that many systems have no patch because they are end of life. That is a researcher’s attributed observation, not a published forensic demonstration of one exploit across all stores. No specific CVE, shared attacker or connection to other retail/US incidents has been established here.

The earlier CERT-FR alert names Danfoss AK-SM and AK-SC, Copeland xweb and Dixell xweb. It confirms previous compromises and supplies actionable isolation and recovery guidance, but does not establish that every November victim uses those models. Apply its steps with the device manufacturer and refrigeration contractor; there is no verified universal firmware threshold for this new wave.

The case is rated L4 because reported attacks are already disrupting physical refrigeration and putting food stock at risk. Changing a controller password or resetting it while leaving an unpatched management interface public does not remove the exposure.

The November 4 joint EU statement confirms a second wave on November 1–2 and directs operators to [national advisories collected by ENISA](https://github.com/enisaeu/CNW/blob/main/advisories/2026/CNW-2026-05_retail-incidents.md). Ireland's NCSC recommends checking all remotely accessible equipment, including alarms and their notification routes. In a separate measurement, Censys found 3,124 distinct hosts visible on the internet across Danfoss StoreView and Copeland/Dixell XWEB on November 5, versus 6,695 on October 9, a 53% decline. Its dataset cannot show which hosts were attacked or why a host stopped appearing.
