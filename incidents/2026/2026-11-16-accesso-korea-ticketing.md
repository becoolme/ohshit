---
title: Accesso ticketing intrusion exposes annual pass records at two South Korean venues
level: 4
date: 2026-11-16
tags: [Accesso, data breach, ticketing, South Korea]
summary: LEGOLAND Korea Resort and SEA LIFE Busan Aquarium say an intruder accessed Accesso’s ticketing system and viewed some annual pass records. The notices identify contact details, encrypted dates of birth and pass barcodes. The affected customer count is still under investigation.
splash: Some LEGOLAND Korea Resort and SEA LIFE Busan Aquarium annual pass holders whose records were in Accesso’s ticketing system.
wipe: Verify notices through the venue, ask whether your pass data was affected and report suspicious use of your barcode.
inTheWild: yes
inTheWildNote: Both venues report unauthorized access to annual pass records.
timeline:
  - date: Nov 14, 2026
    title: The venues receive notice of the Accesso incident
    body: Both venues say they learned that an unauthorized party had accessed the ticketing system.
  - date: Nov 16, 2026
    title: LEGOLAND Korea publishes a customer notice
    body: LEGOLAND Korea identifies the types of records viewed and says the exact scope remains under investigation. SEA LIFE Busan separately published a notice describing the same categories.
checklist:
  - title: Ask the venue to verify your exposure and pass status
    hint: Open the venue’s official website and use the contact details in its notice. Ask what information was affected and whether your pass barcode needs to be replaced. Report any unexpected pass activity and avoid sharing a barcode screenshot in public.
  - title: Verify messages that mention your pass or booking
    hint: Confirm requests through the venue’s official support channel, especially messages that use your contact details and ask for a verification code or payment. Avoid unsolicited links and attachments. Save suspicious messages so the venue can investigate.
  - title: Check tenant exposure if your organization uses Accesso
    hint: Confirm affected endpoints, dates and data fields with Accesso. Preserve available ticketing and integration logs, review unusual access and barcode use, and coordinate notices and any barcode replacement with the vendor.
sources:
  - name: LEGOLAND Korea customer notice
    url: https://legoland.kr/%EB%B0%A9%EB%AC%B8-%EC%A0%95%EB%B3%B4/%EA%B3%A0%EA%B0%9D-%EC%A7%80%EC%9B%90/%EB%89%B4%EC%8A%A4-%EA%B3%B5%EC%A7%80/%EB%A0%88%EA%B3%A0%EB%9E%9C%EB%93%9C-%EC%BD%94%EB%A6%AC%EC%95%84-%EB%A6%AC%EC%A1%B0%ED%8A%B8-%EA%B3%A0%EA%B0%9D-%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4-%EC%9C%A0%EC%B6%9C-%EA%B0%80%EB%8A%A5%EC%84%B1-%EC%95%88%EB%82%B4/
    primary: true
    says: Dates the venue’s public disclosure and lists the records viewed, reported containment and customer contacts.
  - name: SEA LIFE Busan customer notice
    url: https://www.visitsealife.com/busan/plan-your-visit/information/%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD/
    primary: true
    says: Confirms that the aquarium was also notified about access to annual pass records and gives its own customer contact.
---

The venues use Accesso’s ticketing system for visitor reservations. They say an unauthorized party viewed some annual pass records containing names, encrypted dates of birth, addresses, email addresses, phone numbers and pass barcodes. The notices report the birth dates were stored encrypted. Investigators are still assessing their exposure and had found no evidence that credit card or bank account details were exposed.

According to the venues, Accesso removed the vulnerable endpoint, blocked the source addresses and tightened security rules. The exact time of the underlying access, number of people affected and which individual records left the system remain under investigation. The venues’ notices cover their own customers. They do not give impact figures for Accesso’s other customers.
