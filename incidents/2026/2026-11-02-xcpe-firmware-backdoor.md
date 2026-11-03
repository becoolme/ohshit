---
title: XCPE firmware backdoor enrolled over 1.3 million Android TV boxes in a botnet
level: 4
date: 2026-11-02
tags:
- Android
- Supply chain
- Botnet
summary: Google attributes a firmware backdoor to Videostrong and reports over 1.3 million infected TV boxes. It disrupted control infrastructure and banned the supplier; network takedown does not remove persistent device malware.
splash: Android devices carrying XCPE firmware, mainly TV boxes; other observed devices include telehealth equipment and digital signage.
wipe: Isolate suspect devices, preserve evidence and seek verified clean firmware or replace affected hardware.
inTheWild: 'yes'
inTheWildNote: Google reports observed backdoor operations, data theft and proxy/ad-fraud modules.
timeline:
- date: Nov 2, 2026
  title: Google discloses XCPE disruption and supplier ban
  body: The report attributes intentional deployment to Videostrong with high confidence. Its estimate of at least 10 million additional devices concerns affiliate C2 disruption, not another 10 million XCPE TV boxes.
checklist:
- title: Find and isolate affected devices
  hint: Inventory Android TV and other IoT firmware for x.cpe, com.oemservice, com.abc.nexus and newer com.android.system.ntp or com.android.sso.auth.handler packages. Quarantine suspect devices from sensitive networks while preserving firmware and logs.
- title: Hunt the complete network indicator set
  hint: 'Google lists 169 network indicators in its appendix: amhib[.]com, disview[.]com, prataw[.]com, auqee[.]com, alptk[.]com, mfiny[.]com, leisurepuz[.]com, earn[.]fm, geo-loadbalanced[.]com, collection[.]shixunsuda[.]com, analysis[.]shixunsuda[.]com, gtxvdqvuweqs[.]com, hiddeninplainsight[.]top, absolut[.]fit, alpivara[.]com, beepityping[.]com, beezlepongmad[.]com, bloopondle[.]com, blustpong[.]com, braigwshat[.]com, brisping[.]com, bronglepong[.]com, clapslpist[.]com, clapslport[.]com, craipivolta[.]com, creapslpinut[.]com, crodipolis[.]com, delpiverno[.]com, depomancy[.]com, dewswyra[.]com, drackpingcare[.]com, dramapi[.]com, drapithon[.]com, fawsilver[.]com, fawsindra[.]com, fizzlepong[.]com, flaigwern[.]com, flapilo[.]com, flapslwstorm[.]com, flawsino[.]com, flewsnark[.]com, floporin[.]com, floppipple[.]com, flumpipoodle[.]com, frosping[.]com, gapslpinch[.]com, gapslwsbor[.]com, glapoton[.]com, glewsnap[.]com, glippinger[.]com, gloobfnatch[.]com, gloopong[.]com, glowspar[.]com, grasplpond[.]com, grinapslpocal[.]com, hawsith[.]com, lapslponze[.]com, lepovia[.]com, limpingcare[.]com, lorapslpifyx[.]com, lowswyn[.]com, lunapiris[.]com, mopith[.]com, mudponger[.]com, nepiral[.]com, opostra[.]com, pibberflop[.]com, pikaroodle[.]com, ploponix[.]com, qepoth[.]com, rapinel[.]com, rapslpine[.]com, rapslponic[.]com, rapslwsweave[.]com, raspongle[.]com, ripotus[.]com, rowswyn[.]com, scapslwshell[.]com, snarpong[.]com, snorpdoodle[.]com, sofpilan[.]com, soporth[.]com, spopel[.]com, tawserin[.]com, tawswizzle[.]com, teowsmera[.]com, tepiol[.]com, tewsmariel[.]com, thaiporix[.]com, thapolex[.]com, torpoodle[.]com, trapslwsin[.]com, trawsica[.]com, tripikazu[.]com, twindping[.]com, vaiporun[.]com, vespilara[.]com, vorpolis[.]com, whispong[.]com, winklenark[.]com, wizzleplonk[.]com, wogglenift[.]com, yapodust[.]com, yewsara[.]com, zarflonk[.]com, zenapslpinic[.]com, zerapslpomat[.]com, zimpire[.]com, zingpingbees[.]com, zippypongbee[.]com, zoraipinex[.]com, zorapslwsnic[.]com, zrawsomble[.]com, bestipip[.]com, fecebbbk[.]xyz, guangzhouroot[.]com, bd-devmetrics[.]net, jaguar-distributor[.]logreporter[.]com, jaguar-distributor[.]syslogcollector[.]com, tx-devmetrics[.]net, linkfog[.]cn, cloudbrokerapi[.]xyz, dddlink[.]link, smrtai[.]cc, bkdomain[.]cn, columbus2024[.]com, dmurdce[.]xyz, edisajalsjfdfh[.]shop, fshuaons2[.]online, fuioahsdoa3[.]store, fuisans1[.]online, haimnsgsjhansj[.]shop, ishano456[.]sbs, ishuoabh3years[.]online, sdoisanadf[.]shop, shaiosjdaln[.]shop, shsuanalsjai[.]shop, ty4523[.]space, ty54fgd435[.]my, ue886578433[.]online, vrr8345[.]site, xmsae[.]sbs, xshaon123[.]sbs, dgjm[.]online, drgdj[.]top, spiritlib[.]cyou, *[.]traffmonetizer[.]com, 219[.]134[.]163[.]210, 219[.]134[.]163[.]211, 23[.]94[.]49[.]57, 38[.]145[.]197[.]135, Hosts anyevonline[.]com and file server, *[.]anyevonline[.]com, intermedia-arts[.]tv, szbboys[.]com, ott[.]szbboys[.]com, mqtt[.]szbboys[.]com, github[.]com/Aviciiii/, github[.]com/Spink1984/, github[.]com/undowildcats-sketch/, github[.]com/szjkkax/, github[.]com/szsoft01/, github[.]com/ktpeng2026/, github[.]com/yf-videostrong/, github[.]com/vspeng/, github[.]com/szwzy43/, github[.]com/ChenHui1026/, github[.]com/zurant/, yokatvonline[.]com. Compare DNS, proxy and egress logs; MQTT ports 3885–3887 are used. The same appendix provides the full core/affiliate sample hashes and package names. A match alone does not prove compromise; shared hosting and legitimate proxy services need context.'
- title: Recover from a trusted firmware source
  hint: Google describes reinstalling malware from /oem/ and newer payloads persisting under /system/priv-app/. App removal or a reboot cannot establish that firmware is clean. Obtain a verified clean image from a trusted supplier or replace hardware; this recovery advice follows from the reported persistence, not a vendor-issued fixed version.
- title: Keep device protections enabled
  hint: Google advises trusted app stores, reviewing VPN/proxy permissions and keeping Play Protect active. Check the Android TV partner list when procuring replacements; certification alone did not prevent this campaign.
sources:
- name: Google Threat Intelligence Group XCPE investigation
  url: https://cloud.google.com/blog/topics/threat-intelligence/shutting-the-door-on-the-xcpe-botnet/
  says: Original malware analysis, device estimate, attribution, disruption actions, consumer guidance and full indicator appendix.
  primary: true
---

The exposure requires affected firmware; this is not a vulnerability in every Android device. Google observed privileged preloads and criminal modules, and attributes the operation to Videostrong. No universal fixed firmware is identified. Removing infrastructure is containment, not verified device cleanup.
