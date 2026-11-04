---
title: Rails fixes Active Storage file access and code execution in a 21-advisory security release
level: 3
date: '2026-11-04'
tags:
- Rails
- Active Storage
- RCE
summary: Rails 8.0.5.2 and 8.1.4.1 fix 21 issues, including crafted-upload file access and possible code execution in Active Storage. ImageMagick policy, Disk storage and FFmpeg build options determine exposure. Update Rails and mini_magick, review GCS upload CORS, and rotate potentially exposed secrets. No real-world attacks are established.
splash: Rails accepting untrusted attachments processed by ImageMagick or FFmpeg; other batch flaws have separate configuration prerequisites.
wipe: Upgrade to Rails 8.0.5.2 or 8.1.4.1; check processing dependencies, upload settings and exposed secrets.
inTheWild: unknown
inTheWildNote: Vendor advisories describe attack paths, not confirmed real-world exploitation.
cves:
- id: GHSA-f3w6-w445-fwh9
  name: ImageMagick attachment analysis file write/read
  description: Untrusted attachments reach unsafe ImageMagick coders; arbitrary writes and, with Disk storage, reads may expose application secrets and enable further code execution.
- id: GHSA-v924-7rp8-4mxh
  name: Upload filename selects an unsafe media decoder
  description: Attacker-chosen extensions can select FFmpeg/ImageMagick decoders. The AviSynth path additionally needs an AviSynth-enabled FFmpeg and AviSynthPlus runtime.
fixed:
- product: Rails 8.0 / affected component gems
  version: 8.0.5.2
  status: Security support for Rails 8.0 ends November 7, 2026
- product: Rails 8.1 / affected component gems
  version: 8.1.4.1
  status: Security release
- product: Older Rails lines
  version: none
  status: Unsupported; migrate to a supported line
- product: mini_magick for :mini_magick applications
  version: '5.1'
  status: Minimum required for the shipped policy; not a standalone Rails fix
timeline:
- date: Nov 4, 2026
  title: Rails releases both supported-line security updates
  body: The batch addresses 21 advisories; the critical ImageMagick and high-severity media-decoder issues have no assigned CVE in their original records.
checklist:
- title: Upgrade the deployed Rails gems and check boot
  hint: Check Gemfile.lock and the deployed bundle for Rails/activestorage and other component gems. Upgrade to 8.0.5.2 or 8.1.4.1 and redeploy. Applications using :mini_magick also need mini_magick >=5.1 or the new policy raises a boot error. Rails 8.0 security support ends November 7, 2026; plan migration.
- title: Audit image and media processing before accepting uploads
  hint: Check config.active_storage.variant_processor, load_defaults and ImageMagick policy. :mini_magick is the default for load_defaults 6.1 or earlier. Untrusted uploads plus policies permitting unsafe coders expose image analysis on attachment; no explicit variant/preview call is required. If unable to upgrade, apply the complete shipped policy from activestorage/lib/active_storage/image_magick/policy.xml to the host policy; the advisory’s minimum rules alone are not equivalent to the full policy. Review custom MiniMagick.cli_env/cli_prefix/Shell overrides and GraphicsMagick separately. PDF/PostScript workflows need careful policy testing.
- title: Check FFmpeg build and disable risky processing if patching waits
  hint: The described AviSynth execution path requires --enable-avisynth plus AviSynthPlus; upstream/common Linux/Homebrew builds do not enable it, but referenced GPL builds do. Other extension-selected decoders remain relevant. Until upgraded, remove VideoPreviewer from config.active_storage.previewers and VideoAnalyzer/AudioAnalyzer from config.active_storage.analyzers to stop Active Storage FFmpeg use; this does not fix ImageMagick. Test the fixed extension/content-type handling and allowed media formats.
- title: Replace secrets reachable through vulnerable processing
  hint: 'The vendor directs Disk-storage/ImageMagick deployments and deployments meeting the AviSynth condition to change every secret readable by the application process: secret_key_base, the master key and decrypted config/credentials.yml.enc values, storage/database credentials and third-party tokens. Do this from a trusted environment and do not keep exposed secrets as rotation fallbacks. Changing secret_key_base expires sessions, signed/encrypted cookies, signed global IDs and Active Storage URLs; plan the user impact. Patching does not undo prior disclosure.'
- title: Test GCS uploads and session/cache changes
  hint: For GCS direct uploads, allow x-goog-content-length-range in the bucket CORS responseHeader after upgrading or browser uploads fail. Review the release’s separate GCS cache_control, CacheStore session-revocation, cookie rotation/Active Storage proxy-cache, SameSite and content-negotiation fixes against your configuration. Shared caches should not store Set-Cookie responses; do not assume every app meets every advisory’s prerequisites.
sources:
- name: Rails November 4 security release
  url: https://rubyonrails.org/2026/11/4/Rails-8.0.5.2-and-8.1.4.1-have-been-released
  primary: true
  says: 21-advisory batch, fixed versions, maintenance deadline and links to each original advisory.
- name: Rails GHSA-f3w6-w445-fwh9
  url: https://github.com/rails/rails/security/advisories/GHSA-f3w6-w445-fwh9
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-v924-7rp8-4mxh
  url: https://github.com/rails/rails/security/advisories/GHSA-v924-7rp8-4mxh
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-wm3x-v3qw-4jh3
  url: https://github.com/rails/rails/security/advisories/GHSA-wm3x-v3qw-4jh3
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-2gff-2mmg-m73p
  url: https://github.com/rails/rails/security/advisories/GHSA-2gff-2mmg-m73p
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-8474-xrp6-wh69
  url: https://github.com/rails/rails/security/advisories/GHSA-8474-xrp6-wh69
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-2p2f-4rq4-gjwc
  url: https://github.com/rails/rails/security/advisories/GHSA-2p2f-4rq4-gjwc
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-v6rj-xm57-3p59
  url: https://github.com/rails/rails/security/advisories/GHSA-v6rj-xm57-3p59
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-rq8q-p985-fjq7
  url: https://github.com/rails/rails/security/advisories/GHSA-rq8q-p985-fjq7
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-68p9-83h6-5wpj
  url: https://github.com/rails/rails/security/advisories/GHSA-68p9-83h6-5wpj
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-2w9f-fxwj-w2qf
  url: https://github.com/rails/rails/security/advisories/GHSA-2w9f-fxwj-w2qf
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-rwvh-fw6r-pwvp
  url: https://github.com/rails/rails/security/advisories/GHSA-rwvh-fw6r-pwvp
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-4v2w-w6g6-f8f8
  url: https://github.com/rails/rails/security/advisories/GHSA-4v2w-w6g6-f8f8
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-p2pm-g2h6-7j5j
  url: https://github.com/rails/rails/security/advisories/GHSA-p2pm-g2h6-7j5j
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-3w93-6hmw-whh4
  url: https://github.com/rails/rails/security/advisories/GHSA-3w93-6hmw-whh4
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-hfr4-8rjc-97m2
  url: https://github.com/rails/rails/security/advisories/GHSA-hfr4-8rjc-97m2
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-2586-8ghr-69fj
  url: https://github.com/rails/rails/security/advisories/GHSA-2586-8ghr-69fj
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-x6mj-8jx9-qhqv
  url: https://github.com/rails/rails/security/advisories/GHSA-x6mj-8jx9-qhqv
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-r9jg-fmfx-2gv6
  url: https://github.com/rails/rails/security/advisories/GHSA-r9jg-fmfx-2gv6
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-3f4q-8x5m-76v8
  url: https://github.com/rails/rails/security/advisories/GHSA-3f4q-8x5m-76v8
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-5957-c7qm-m469
  url: https://github.com/rails/rails/security/advisories/GHSA-5957-c7qm-m469
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
- name: Rails GHSA-gmj8-hvj3-49mw
  url: https://github.com/rails/rails/security/advisories/GHSA-gmj8-hvj3-49mw
  primary: true
  says: Maintainer-authored original read through its public GitHub API; configuration-specific impact, patches and mitigation.
---

This is one coordinated Rails release, not 21 separate incidents. The two upload-processing advisories detailed above affect activestorage below 8.0.5.2 and 8.1 releases before 8.1.4.1. They are configuration-dependent; neither a default modern Rails deployment nor every FFmpeg build is necessarily exposed. No victim count or confirmed in-the-wild campaign is established. L3 reflects a mainstream framework and potential server-side file access/code execution.

For the ImageMagick flaw, untrusted attachment uploads and a permissive coder policy are enough to reach analysis. Disk storage adds the documented arbitrary-read exposure; file contents can include credentials that enable further attacks. For the decoder flaw, attacker-chosen filename extensions influence external processing; the described native-library execution route needs additional AviSynth build/runtime support. Lack of AviSynth does not address all extension-driven decoding risks.

The other 19 advisories cover parameter handling, IP spoofing, XSS, denial of service, GCS direct uploads, session handling, cache negotiation and Mailgun signature replay. The complete batch and individual configuration prerequisites are linked in the release and sources. Upgrading the batch is preferable to assuming only the two highlighted paths matter. GCS CORS, processing policies, dependency compatibility and secret replacement need explicit checks beyond changing a version number. The new policy denies dangerous coders and delegates; do not broadly re-enable them to make a failing workflow pass.
