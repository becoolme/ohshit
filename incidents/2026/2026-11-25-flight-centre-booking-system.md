---
title: Flight Centre investigates possible customer-data access in a third-party accommodation system
level: 3
date: 2026-11-25
tags: [Data breach, Travel, Third party]
summary: Flight Centre says a significant number of accommodation customer records may have been accessed in a third-party system; extraction volume remains unknown. Its preliminary review includes limited passport and occasional health or mobility information. Flight and corporate bookings are reported unaffected.
splash: Accommodation customers of Flight Centre, Travel Associates, Cruiseabout and some independent agents using the affected system.
wipe: Verify booking messages through your existing agent, avoid unsolicited links and await individual scope notifications.
inTheWild: unknown
inTheWildNote: Suspected unauthorized access under investigation; extraction and victim totals unknown.
cves: []
fixed: []
timeline:
  - date: Nov 25, 2026
    title: Public disclosure is reported before midnight UTC
    body: Reuters publishes at 17:49 EST (22:49 UTC). The company's ASX statement bears the Australian date November 26; neither date establishes when the activity began.
checklist:
  - title: Authenticate booking-related messages independently
    hint: Open your existing booking confirmation and contact the agent using previously verified details. Do not follow unexpected links, open attachments or provide personal information, passwords or payment details in response to calls, emails or messages about the booking.
  - title: Establish your individual exposure
    hint: Ask the agent whether your accommodation record was in the affected system and which fields were involved. Keep any notice for follow-up; the company plans to contact relevant customers, but has not announced a completed notification process or a total.
  - title: Preserve suspicious requests and report them
    hint: Retain the original message, sender details and time, and report it through your verified agent. If you already shared credentials or payment details with an impersonator, contact the corresponding account provider or bank through its official channel for targeted recovery; this is separate from the booking-system investigation.
  - title: Check official updates before changing travel plans
    hint: Revisit the company's announcements and your agent's verified communications for revised scope and instructions. FLT says leisure operations and existing accommodation bookings continue. Confirm changes with the agent rather than acting on an unsolicited cancellation, refund or urgent-payment demand.
sources:
  - name: Flight Centre Travel Group statement to the ASX
    url: https://announcements.asx.com.au/asxpdf/20261126/pdf/07731r59zrz6zd.pdf
    primary: true
    says: Two-page November 26 Australian statement; preliminary data scope, response and customer guidance, with no affected-record total.
  - name: Reuters report republished by StreetInsider
    url: https://new.streetinsider.com/Reuters/Australias%2BFlight%2BCentre%2Bprobes%2Bdata%2Bbreach%2Bin%2Bthird-party%2Bsystem/27403948.html
    says: November 25 at 17:49 EST establishes publication on November 25 UTC; repeats the company's preliminary account, not an independent technical investigation.
---

FLT is investigating unusual activity with the unnamed accommodation-system supplier and Mandiant. The company believes many records may have been accessed, but does not establish how many were extracted. Most reportedly contain names, sometimes basic itinerary information; a small subset may include limited passport details, contact details or birth dates, and rare health or mobility information. No access to card, payment or bank-account details has been identified to date, according to FLT.

The company says flight bookings and corporate travel use unaffected systems. These are preliminary vendor findings, not an independent clearance. FLT describes containment work, authentication-key and credential changes, increased monitoring and authority notifications underway; it has not declared a completed investigation. Customer contact is planned. No customer password reset, fixed software version or technical indicator is supplied.

L3 reflects a potentially substantial data exposure with an unresolved scope, rather than a confirmed mass extraction. The supplier, entry method, activity dates and affected population remain unknown. Do not infer a breach of every brand system or every traveler from this announcement.
