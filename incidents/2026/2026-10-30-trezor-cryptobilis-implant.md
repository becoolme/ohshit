---
title: Trezor confirms three Safe 5 hardware implants in CryptoBilis purchases
date: 2026-10-30
updated: 2026-11-13
level: 3
tags: [Trezor, hardware wallet, supply chain]
summary: Trezor found implants in three Safe 5 devices bought from CryptoBilis between August 20 and September 23. Firmware 2.13.1 blocks capture by the implants found. Buyers of any Trezor model from CryptoBilis since March should still move funds to a wallet with a fresh seed.
splash: Confirmed in three CryptoBilis Safe 5 devices. The precaution covers every Trezor model CryptoBilis supplied from March 2026.
wipe: Move funds to a secure wallet with a fresh seed and arrange a replacement with Trezor Support.
inTheWild: 'yes'
inTheWildNote: Trezor confirmed implants in three devices. It reports no customer reports of lost funds.
fixed:
- { product: Trezor Safe 5 firmware, version: '2.13.1', status: Blocks capture by known implants }
timeline:
- date: Oct 9, 2026
  title: Trezor removes CryptoBilis as a reseller
- date: Oct 28, 2026
  title: Safe 5 buyer reports a suspected implant
- date: Oct 30, 2026
  title: Trezor warns buyers before laboratory confirmation
- date: Nov 11, 2026
  title: Safe 5 firmware adds protection against the identified implants
- date: Nov 12, 2026
  title: Trezor confirms three affected Safe 5 devices
  body: The lab examined the first device and identified two more from owner photos. Forty-eight customers had contacted Trezor.
checklist:
- title: Check the seller and move funds
  hint: Check receipts for CryptoBilis supply, including Tokopedia and Shopee. Move funds to a secure replacement wallet using a newly generated seed. If needed, Trezor suggests a familiar software wallet or exchange temporarily. Verify the entire receiving address. A firmware update cannot revoke a previously captured backup.
- title: Stop using a suspected device
  hint: Keep the device for support. Do not set it up, use it or enter a recovery phrase until Trezor advises you. Weighing or opening it cannot reliably establish safety.
- title: Arrange a replacement safely
  hint: Buyers from March 2026 onward can contact trezor.io/support for replacement. Shipping restrictions can lead to an alternate model with a price adjustment, another delivery country or a refund. Never share recovery words or a passphrase.
sources:
- name: Trezor initial security notice
  url: https://trezor.io/blog/news/implant-reported-in-a-trezor-sold-by-cryptobilis
  primary: true
- name: Trezor investigation update
  url: https://trezor.io/blog/news/our-cryptobilis-investigation-what-we-found-and-what-weve-changed
  primary: true
  says: Confirms device scope, implant behavior, firmware protection and replacement guidance.
---
Trezor examined the first Safe 5 and analyzed the implant firmware. A board between the main board and display records displayed recovery words and passphrases, encrypts them and sends them over a cellular connection. It retries if it cannot connect. Trezor says the board does not modify the wallet firmware or Secure Element.

The three confirmed units were bought between August 20 and September 23, 2026, via CryptoBilis directly or its Tokopedia and Shopee stores. Trezor found no implants in the other models or other resellers' devices it checked. The 48 people who contacted Trezor are inquiries, and the manufacturer says no customer has reported losing funds. The broader precaution applies to all models from that seller since March. Trezor also reduced its reseller network by about 80% and tightened sourcing, storage and access controls. L3 reflects a confirmed hardware supply-chain issue with a narrow observed scope.
