---
title: Drupal installer follow-up is exploited; upgrading also requires database updates
level: 4
date: '2026-11-25'
tags:
- Drupal
- access bypass
- exploited
summary: Drupal warns that CVE-2026-136716 lets attackers take over sites left in unusual or incomplete install states, even after the earlier installer fix. Exploitation is confirmed. Upgrade core, run the required update hook, block the installer and investigate user 1 changes.
splash: Drupal sites with a remotely accessible installer and affected install state, including production sites; UI does not reveal it.
wipe: Upgrade to 11.4.14, 11.3.23 or 10.6.23, run update.php, secure install.php and investigate possible takeover.
inTheWild: 'yes'
inTheWildNote: Drupal confirms live exploitation; CISA added CVE-2026-136716 to KEV November 27.
cves:
- id: CVE-2026-136716
  name: Installer state access bypass
  description: Unusual or incomplete installation states can still permit site takeover after the earlier installer fix.
fixed:
- product: Drupal 11.4.x
  branch: '11.4'
  version: 11.4.14
  status: Run update.php after updating core
- product: Drupal 11.3.x
  branch: '11.3'
  version: 11.3.23
  status: Run update.php after updating core
- product: Drupal 10.6.x
  branch: '10.6'
  version: 10.6.23
  status: Run update.php after updating core
- product: Drupal 11.2.x and earlier 11.x; 10.5.x and earlier 10.x; Drupal 8/9
  version: none
  status: End of life; move to a supported release
timeline:
- date: Nov 25, 2026
  title: Drupal publishes SA-CORE-2026-019
  body: The follow-up identifies remaining takeover states after SA-CORE-2026-017, confirms exploitation and requires an update hook for affected existing production sites.
- date: Nov 26, 2026
  title: Drupal publishes detailed installer-compromise checks
  body: The guide distinguishes immediate code protection from required database-state repair, orders evidence checks before updates and explains why patching alone does not remove persistence.
- date: Nov 27, 2026
  title: CISA adds the flaw to KEV
  body: The entry sets a November 30 due date for covered federal remediation and marks forensic triage required. This is not a general three-day deadline for every site.
- date: Nov 27, 2026
  title: Installer-hardening guide updated
  body: The guide covers durable web-server rules, Composer persistence and testing installer paths including PATH_INFO; update.php must remain usable.
checklist:
- title: Block remote installer access
  hint: After installation, follow Drupal’s securing-installer guide for /core/install.php, adjusting for subdirectories and every serving virtual host. Do not leave unfinished installs internet-accessible. Nginx uses a prefix location (^~), since an exact match can miss /core/install.php/foo. Apache Location rules belong in server configuration, not .htaccess. Validate configuration before reload. Preserve authorized installation access only when needed; Drush site:install does not use install.php.
- title: Investigate prior access and user 1 changes
  hint: 'Before database updates change the evidence, copy logs/files/database and follow the full linked installer-triage guide for each multisite site. Search from November18, allowing for timezone offsets (the guide uses November17 as margin): /var/log/nginx/access.log, /var/log/apache2/access.log, /var/log/httpd/access_log, CDN/host logs and installer GET/POST requests. A 200 alone is not proof: investigate POST 302/303, op= or id=, unusually large responses, bursts, Choose language or Installing Drupal pages. Check user1 email/password/changed date and sessions, unfamiliar admins at /admin/people, site name/email/timezone and update notification addresses; use drush user:information --uid=1. Compare install_task, install_time and install_session_token with deployment history and a pre-Nov18 backup. done or an empty session token cannot clear a completed attack; the update itself sets done and may set an empty install_time. Check settings.php/settings.local.php, duplicate hash_salt, unexpected database targets, /sites/*/files/*.php and changed .htaccess. Separate files/php/twig/ from other uploads and investigate unexpected PHP surviving a cache rebuild after evidence capture. Review unexpected modules, crontabs, ~/.ssh/authorized_keys and processes. Correlate findings; no attacker IP/hash list or victim total is published.'
- title: Update core and run the required database hook
  hint: Install 11.4.14, 11.3.23 or 10.6.23 for your branch, then run update.php (or the documented database-update path, drush updatedb). The code fix blocks this attack immediately; database updates repair the recorded install state and are still mandatory. Run system_post_update_mark_installation_finished through normal updates and record the time. Do not confuse state repair with removal of an existing compromise. Keep update.php usable when blocking install.php. Unsupported 11.2.x/older 11.x, 10.5.x/older 10.x and Drupal8/9 need migration, not the previous advisory’s patch thresholds.
- title: Make the block survive deployment and test it
  hint: 'Prefer durable server configuration. If using .htaccess, persist additions through Composer scaffold configuration; manual edits can be replaced on composer install. If deleting core/install.php, automate removal after core installation/updates and account for --no-scripts deployments. The guide recommends removal plus blocking as defense in depth. Test /core/install.php, the final redirect from /install.php, and /core/install.php/foo: expect 403/404, then verify normal site operation and database updates. Steward’s recommended mitigations protect known vectors, but Drupal still advises upgrading.'
- title: Recover a compromised site beyond patching
  hint: Keep it offline or its installer blocked and preserve evidence. Rebuild code from a trusted repository or Composer source; restore a database predating the earliest suspicious request, or review changed users, roles, configuration and content if none is old enough. Change database credentials, hash_salt, API keys and all admin passwords; invalidate all sessions using the documented procedure. Updating and resetting user1 alone leave backdoors and accounts behind. Complete core/database updates, update Twig/Symfony/Composer per the guide and keep the installer blocked. Use modern supported tools rather than legacy Drupal7 SQL in the older general guide.
sources:
- name: Drupal SA-CORE-2026-019
  url: https://www.drupal.org/sa-core-2026-019
  primary: true
  says: 'November25 follow-up: affected states, active exploitation, fixed releases, mandatory update hook, user1 checks and Steward qualification.'
- name: Drupal installer hardening guide
  url: https://www.drupal.org/docs/administering-a-drupal-site/security-in-drupal/securing-the-installer-installphp
  primary: true
  says: Updated November27; web-server and scaffold persistence, PATH_INFO caveat, installer removal and explicit verification paths.
- name: CISA KEV catalog
  url: https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json
  primary: true
  says: November27 entry for CVE-2026-136716, due November30, forensicTriage Yes; confirms federal remediation listing.
- name: Drupal incident-response guide
  url: https://www.drupal.org/docs/develop/security/your-drupal-site-got-hacked-now-what
  primary: true
  says: Evidence preservation, trusted rebuild choices, code/account/session review; older guidance, not a version-specific SQL recipe for current Drupal.
- name: Drupal installer-specific compromise checks
  url: https://www.drupal.org/docs/administering-a-drupal-site/security-in-drupal/checking-whether-your-site-was-compromised-through-the-installer
  primary: true
  says: 'Updated November26: log/state/account/file checks, update-induced evidence changes, multisite scope, trusted recovery and secret/session invalidation; code fix closes attack before database-state repair.'
---

SA-CORE-2026-019 is a new installer access-bypass advisory following SA-CORE-2026-017. Drupal says some unusual or incomplete installation states remain vulnerable to takeover, including production sites, and confirms live exploitation. A secured installer removes the stated exposure. Neither a normal-looking interface nor the absence of the vulnerable state after an attack proves a site was safe. Drupal does not publish victim totals here.

The affected ranges are earlier than 10.6.23, 11.0.0 through versions before 11.3.23, and 11.4.0 through versions before 11.4.14. Older branches are unsupported. The code fix closes this attack immediately. Database updates remain required to repair the recorded production install state; the hook is system_post_update_mark_installation_finished. Preserve and compare state evidence before running it, and record the update time. Do not substitute the earlier advisory’s 10.6.22/11.3.22/11.4.13 releases or assume writable-settings restrictions cover every path. CISA’s November27 listing reinforces urgency; its federal deadline and triage requirement are not proof that any particular installation was compromised.

Secure the installer on existing and new installations and investigate earlier exposure. Blocking it today does not remove persistence from a prior takeover. The official incident guide includes legacy examples; use supported administration tools rather than copying its old Drupal7 SQL into a current database.
