---
title: Gitea 28.4.0 fixes command execution and repository owner password hash exposure
level: 3
date: 2026-11-15
tags: [Gitea, RCE, Credentials, Actions]
summary: Gitea 28.4.0 fixes a repository creation race that can lead to command execution as the service account, and a dashboard search that exposed repository owners’ password hash material to signed-in users.
splash: Self-hosted Gitea up to 28.3.0. The command execution path needs an account that can create and push to a repository and win a race.
wipe: Upgrade to Gitea 28.4.0 or later. Review repository creation and Actions logs, and reset potentially exposed owner passwords.
inTheWild: unknown
inTheWildNote: The maintainer published lab reproduction details. Live exploitation is unconfirmed.
cves:
  - name: "Repository creation race"
    id: CVE-2026-125423
    description: "Users allowed to create and push to repositories can race auto-initialization and overwrite a server hook via a symlink."
  - name: "Repository owner credential exposure"
    id: CVE-2026-123006
    description: "A signed-in user can obtain password hash material and email addresses of owners of visible repositories with a commit status."
  - name: "Cross-release attachment deletion"
    id: CVE-2026-123065
    description: "Someone with release write access can delete another attachment's stored file if they know its UUID."
  - name: "Protected file pattern bypass"
    id: CVE-2026-123638
    description: "A writer can bypass protected file patterns using names Git quotes during matching."
  - name: "Cross-repository review context leak"
    id: CVE-2026-126338
    description: "A signed-in user with a review ID can copy diff context from a repository they cannot read."
  - name: "Issue hover stored XSS"
    id: CVE-2026-120729
    description: "A crafted issue reference to attacker-controlled content can run script when another user hovers over it."
  - name: "Workflow trust survives repository transfer"
    id: CVE-2026-118535
    description: "A transferred workflow source can still run in former owner repositories with their Actions secrets and token."
  - name: "Unlimited TOTP attempts"
    id: CVE-2026-123002
    description: "An attacker who already knows an account password can repeatedly guess its six-digit TOTP."
  - name: "Fork retains upstream code access"
    id: CVE-2026-123009
    description: "A user with an existing fork can copy a base branch through the web editor after losing upstream read permission."
  - name: "RubyGems compact index injection"
    id: CVE-2026-118389
    description: "A registry publisher can use newlines in gem metadata to inject index entries. This fix first shipped in 28.3.0."
  - name: "Issue and pull request permission confusion"
    id: CVE-2026-129525
    description: "Shared routes could expose issue or pull request data to users with only the other permission. Earlier releases covered some API routes."
  - name: "Actions approval satisfies required review"
    id: CVE-2026-128365
    description: "In an affected organization, a user who can change review requests can make an Actions approval count toward required approvals."
  - name: "Write access during repository provisioning"
    id: CVE-2026-129337
    description: "A user with read access can push over HTTP before a migration, fork or template-created repository has its hooks."
  - name: "Former uploader can remove a release asset"
    id: CVE-2026-129341
    description: "A previous uploader with sufficient read access can delete the asset after losing write rights."
  - name: "Shared package blob removal"
    id: CVE-2026-120991
    description: "On instances enforcing a package quota, a rejected upload can delete blobs shared with other packages when the uploader has matching bytes."
  - name: "AGit bypasses pull request permissions"
    id: CVE-2026-123642
    description: "A user or deploy key with code read access or wiki write access can open a pull request through AGit without pull request access."
  - name: "Hidden organization role disclosure"
    id: CVE-2026-125617
    description: "A signed-in user can look up another user's role in a public or limited organization."
  - name: "Disabled user can obtain OAuth2 tokens"
    id: CVE-2026-128359
    description: "When Gitea is an OAuth2 or OIDC provider, an existing refresh token or unused authorization code can yield new tokens after account deactivation."
  - name: "Anonymous Git LFS reads"
    id: CVE-2026-120725
    description: "Git LFS ignores required sign-in for non-private repositories if the requester knows the repository path and object SHA-256."
  - name: "Draft review disclosure"
    id: CVE-2026-127958
    description: "Draft reviews created through the API can appear in timelines and notifications before submission."
fixed:
  - { product: Gitea, version: 28.4.0 }
timeline:
  - date: Nov 15, 2026
    title: Gitea publishes 28.4.0 and its security advisories
    body: The maintenance release closes the initialization race, restricts repository search output and repairs other access control and workflow issues.
checklist:
  - title: Upgrade the Gitea instance
    hint: Back up the database, configuration and repositories. Use the official update procedure for your deployment, restart the service and verify the running version with gitea --version inside the service environment.
  - title: Review possible exposure through repository search
    hint: On installations that ran 28.0.0 through 28.3.0, check proxy logs for unusual GET /repo/search use if logs are available. Identify owners of visible repositories with a commit status and reset passwords that may have been exposed. Ask owners to change reused passwords on other services.
  - title: Investigate suspect hooks and workflows
    hint: Correlate new auto-initialized repository pushes with changes to post-receive.d/gitea and unexpected processes under the service account. Review owner-scoped workflow sources that changed hands and rotate affected secrets if unauthorized runs occurred. A hook change alone does not prove compromise.
sources:
  - name: "Gitea 28.4.0 release announcement"
    url: https://blog.gitea.com/release-of-28.4.0/
    primary: true
    says: "Lists the release batch and earlier partial fixes."
  - name: "Gitea repository initialization advisory"
    url: https://github.com/go-gitea/gitea/security/advisories/GHSA-6m4f-m9vc-7946
    primary: true
    says: "Documents tested versions, exploit conditions and the 28.4.0 patch."
  - name: "Gitea repository search advisory"
    url: https://github.com/go-gitea/gitea/security/advisories/GHSA-frjx-8pcw-8c9q
    primary: true
    says: "Documents vulnerable versions and exposed password material."
  - name: "Gitea workflow transfer advisory"
    url: https://github.com/go-gitea/gitea/security/advisories/GHSA-q3q9-39vr-q35j
    primary: true
    says: "Shows when a transferred source can access secrets in consuming workflows."
---

The initialization race, CVE-2026-125423, needs repository creation and push rights, automatic initialization with the default README, and a server layout where a crafted symlink can resolve to a writable Git hook. Successful execution has the operating system permissions of the Gitea service. The maintainer reproduced the issue on 28.3.0, 28.2.0, 1.27.1 and 1.25.5. Turning off user-defined Git hooks alone does not close this path.

The repository search leak, CVE-2026-123006, affects 28.0.0 through 28.3.0. Access requires a signed-in account and a visible repository with a commit status. The exposed password material can support offline guessing. The source does not establish which accounts, if any, were targeted.

The 28.4.0 binaries also use Go 1.27.4 for the HTTP server fix already covered in the [Go November advisory](/incidents/go-november-security/). Some Gitea fixes shipped earlier. The RubyGems index fix first shipped in 28.3.0, and parts of the issue and pull request authorization fix shipped in 28.2.0 and 28.3.0. Upgrade to the full release to pick up the remaining fixes.
