---
title: "Researchers take over Kokoro's Hugging Face publisher account through a reusable domain"
level: 3
date: 2026-11-16
tags: [AI, supply-chain, account-takeover]
ecosystems: [hugging-face]
summary: >-
  Alon Hertz reports taking over the hexgrad publisher account by registering hexgrad.com and resetting its password. The team tested altered Kokoro weights locally and says it secured the account without publishing them.
splash: "Deployments that fetch Kokoro weights from hexgrad/Kokoro-82M and model publishers using domain-based recovery email."
wipe: "Pin reviewed model revisions, audit recent downloads and protect publisher recovery email and 2FA."
inTheWild: no
inTheWildNote: "Research demonstration. Hertz says the modified weights were never uploaded."
timeline:
  - date: Nov 16, 2026
    title: Hertz publishes the account-takeover demonstration
    body: The disclosure says the account is secured and nothing was leaked, changed or uploaded.
checklist:
  - title: Pin the model revision used in production
    hint: "Inventory direct and transitive Kokoro model downloads. With hf_hub_download or snapshot_download, set revision to a reviewed full-length commit hash, rather than relying on the default main branch. Retain the approved weights and their hashes for comparison."
  - title: Check what your deployments actually fetched
    hint: "Compare recent build records, model revision IDs and cached snapshots with your approved artifacts. Hold unreviewed model updates for evaluation of expected text-to-speech behavior before promoting them. Escalate unexpected file changes through your normal security response."
  - title: Protect publisher recovery and sign-in
    hint: "Keep recovery email on a domain you control and renew it. Review account email and access settings. Enable Hugging Face 2FA under Settings > Security, store recovery codes securely and verify publisher access after account recovery."
sources:
  - name: Alon Hertz's original disclosure
    url: https://medium.com/@alonhertz1/one-click-from-180-million-downloads-taking-over-the-hugging-face-account-behind-an-ai-model-ac61c16305b7
    primary: true
    says: Describes the publisher-account takeover, local weight modification and account protection.
  - name: Hugging Face download documentation
    url: https://huggingface.co/docs/huggingface_hub/guides/download
    primary: true
    says: Documents revision selection and full-length commit hashes for downloads.
  - name: Hugging Face two-factor authentication guide
    url: https://huggingface.co/docs/hub/security-2fa
    primary: true
    says: Documents account 2FA setup and recovery codes.
  - name: Researcher's public RSS feed
    url: https://medium.com/feed/@alonhertz1
    primary: true
    says: Dates the original article to November 16, 2026.
---

Hertz says registering hexgrad.com enabled a password reset for the Hugging Face publisher account behind Kokoro. The researchers also tested altered model weights locally, causing speech to differ from its input. The disclosure says they coordinated with Hugging Face, secured the account and published no altered weights.

The demonstrated risk is a trusted publisher identity changing hands. This incident is rated L3 because it demonstrates a supply-chain weakness affecting a widely used model. Public evidence does not establish malicious distribution or downstream victim compromise. Pinning and evaluating model artifacts helps consumers control which revisions reach production.
