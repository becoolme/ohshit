---
title: Apache Shiro discloses LDAP login and authorization bypasses
level: 3
date: 2026-11-14
tags: [Apache Shiro, Java, LDAP, authentication]
ecosystems: [java]
summary: Apache disclosed eight Shiro flaws. With LDAP authentication caching enabled, an attacker who knows a previously authenticated username can log in with any password. Other flaws affect authorization annotations, session handling and optional integrations. Upgrade to 3.0.2 or later.
splash: Shiro apps with LDAP auth caching, affected authorization annotations, or one of the other configurations listed below.
wipe: Upgrade Shiro modules together to 3.0.2 or later. Until you can upgrade, disable LDAP authentication caching and enforce authorization on implementing methods.
inTheWild: unknown
cves:
  - id: CVE-2026-129349
    score: 9.1
    name: LDAP authentication cache bypass
    description: In Shiro through 3.0.0, a known username with cached authentication can log in with any password when DefaultLdapRealm or JndiLdapRealm uses authentication caching and the permissive default matcher.
  - id: CVE-2026-74763
    name: Authorization annotations skipped
    description: Through 3.0.1, interface annotations can be skipped in Guice, AspectJ, CDI and Jakarta EE integrations. Class and superclass annotations can also be skipped with Guice or AspectJ.
  - id: CVE-2026-114737
    name: Case-sensitive filter matching
    description: In 3.0.1, a manually created ShiroFilterFactoryBean can miss protected static paths on a case-insensitive filesystem. The Shiro Spring starter-created bean is outside this case.
  - id: CVE-2026-129347
    name: Empty password matches an empty credential
    description: Through 3.0.1, DefaultPasswordService and SimpleCredentialsMatcher can authenticate an empty submitted password for an account with an empty stored credential.
  - id: CVE-2026-129320
    name: Unescaped principal tag output
    description: Through 3.0.1, the Jakarta Pages and Jakarta Faces principal tags can render script when the application uses the tag with an untrusted principal value.
  - id: CVE-2026-129348
    name: Stale file-backed realm permissions
    description: Through 3.0.1, reloading a file-backed PropertiesRealm can leave deleted users and previous permissions in effect.
  - id: CVE-2026-88019
    name: Unsafe saved-form replay
    description: From 2.0.0-alpha through 3.0.1, Jakarta EE integration with form saving enabled (the default) can weaken cookie attributes or send replayed form data and cookies to an untrusted host.
  - id: CVE-2026-74762
    name: Remember-me session fixation
    description: Through 3.0.0, restoring a remembered user can retain the session ID and accept URL session IDs even with URL rewriting disabled. Remember-me must be enabled.
fixed:
  - { product: Apache Shiro 3.x, branch: "3", version: 3.0.2, status: Covers all eight disclosures }
  - { product: Apache Shiro 1.x and 2.x, version: none, status: Superseded upstream }
timeline:
  - date: Nov 8, 2026
    title: Apache announces Shiro 3.0.2
  - date: Nov 14, 2026
    title: Apache maintainer posts the eight advisories
checklist:
  - title: Disable vulnerable LDAP caching immediately
    hint: Find DefaultLdapRealm and JndiLdapRealm in Shiro configuration. Set authenticationCachingEnabled to false and clear old authentication cache entries. If caching must stay enabled, use a matcher that verifies cached credentials, such as SimpleCredentialsMatcher, and test that an incorrect password is rejected after a valid login.
  - title: Upgrade and test protected routes and methods
    hint: Inventory runtime dependencies with Maven or Gradle and align Shiro modules at 3.0.2 or later. Test authorization for a caller without privileges. While waiting for the upgrade, apply authorization annotations directly to implementing methods. Check case variants of protected static paths when the app creates its own filter bean.
  - title: Check sessions and account changes
    hint: Test that restoring a remembered user rotates the session ID. Check that deleted users or narrowed permissions take effect, that blank credentials fail, and that saved-form replay stays on the intended host. Before upgrading, restart file-backed realms after revoking access and restrict saved-form replay with org.apache.shiro.form-resubmit-host and org.apache.shiro.form-resubmit-port. If you find unexpected logins, preserve app, proxy and LDAP logs and invalidate the affected sessions.
sources:
  - name: Apache Shiro security reports
    url: https://shiro.apache.org/security-reports.html
    says: Gives the vulnerable configurations, affected versions and fixes for all eight issues.
    primary: true
  - name: Apache Shiro release news
    url: https://shiro.apache.org/blog/2026/11/apache-shiro-302-released.html
    says: Dates the release announcement for 3.0.2.
    primary: true
  - name: Apache maintainer LDAP advisory on oss-security
    url: https://www.openwall.com/lists/oss-security/2026/11/14/8
    says: Gives the cached-login prerequisites, CVSS 4.0 score and interim mitigations.
    primary: true
  - name: November 14 oss-security archive
    url: https://www.openwall.com/lists/oss-security/2026/11/14/
    says: Lists the eight announcements posted by the Apache maintainer.
    primary: true
---

CVE-2026-129349 requires an application to enable LDAP authentication caching and the target user to authenticate successfully first. Subsequent cache hits skip the LDAP bind. The default matcher on the affected realm accepts the submitted password without verifying it. Apache rates the bypass 9.1 under CVSS 4.0. The advisories do not report attacks in the wild.

Shiro 3.0.1 first fixed the LDAP and remember-me issues. The other six fixes require 3.0.2. Apache's open-source security support follows the newest release line, so applications still running 1.x or 2.x need a migration plan. The current batch is L3 because it affects a widely used authentication library and the critical bypass depends on specific configuration and a cached login.
