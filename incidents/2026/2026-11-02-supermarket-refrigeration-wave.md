---
title: European supermarkets hit by a new wave of refrigeration-controller attacks
level: 4
date: '2026-11-02'
tags:
- OT
- cold chain
- active attack
summary: Supermarkets in multiple European countries reported refrigeration disruption on November 2. Sabcobel described remotely enabled defrost cycles; a researcher confirmed internet-facing management interfaces. Isolate controllers and restore safe settings with refrigeration specialists.
splash: Internet-exposed refrigeration management; exact affected models in the November wave remain unconfirmed
wipe: Remove public management access; verify defrost settings, use protected remote access and follow model-specific recovery
inTheWild: 'yes'
inTheWildNote: Earlier compromises confirmed by CERT-FR; installers report fresh attacks.
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
checklist:
- title: Isolate exposed management while preserving safe refrigeration
  hint: 'Follow CERT-FR: remove public IP exposure, coordinate with the refrigeration contractor and check insurance/monitoring obligations before cutting provider telemetry. Keep safe local operation under qualified supervision; do not turn off cooling blindly.'
- title: Verify the complete controller configuration
  hint: Check defrost schedules, temperature settings and other configuration against approved values. Have refrigeration and food-safety staff independently check temperatures and the safety of stored stock before returning it to sale.
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
---

This is a new November wave, distinct from the French attacks covered by the October CERT-FR alert. Belga’s direct interview with Sabcobel describes attackers switching evaporators into defrost mode at Belgian supermarkets, including Delhaize, Carrefour and Spar. In a separate interview, Ahold Delhaize confirmed refrigeration disruption to Supermarket News. Broader country and store counts remain provisional; this article does not treat installer estimates as a final victim count or quantify losses.

Kevin Beaumont’s original November 2 post says he confirmed internet-facing management on affected systems with contacts, and that many systems have no patch because they are end of life. That is a researcher’s attributed observation, not a published forensic demonstration of one exploit across all stores. No specific CVE, shared attacker or connection to other retail/US incidents has been established here.

The earlier CERT-FR alert names Danfoss AK-SM and AK-SC, Copeland xweb and Dixell xweb. It confirms previous compromises and supplies actionable isolation and recovery guidance, but does not establish that every November victim uses those models. Apply its steps with the device manufacturer and refrigeration contractor; there is no verified universal firmware threshold for this new wave.

The case is rated L4 because reported attacks are already disrupting physical refrigeration and putting food stock at risk. Changing a controller password or resetting it while leaving an unpatched management interface public does not remove the exposure.
