---
title: XCPE 固件后门将超过 130 万台 Android 电视盒接入僵尸网络
summary: Google 将固件后门归因于 Videostrong，披露超过 130 万台电视盒感染。Google 已打击控制基础设施并禁用该供应商资质，但网络关停不会移除设备上的持久化恶意软件。
splash: 固件含 XCPE 的 Android 设备，主要是电视盒；已观察到的其他设备包括远程医疗设备和数字标牌。
wipe: 隔离可疑设备并保留证据，寻求经过验证的干净固件或更换受影响硬件。
inTheWildNote: Google 披露了已观察到的后门操作、数据窃取及代理和广告欺诈模块。
timeline:
- date: 2026年11月2日
  title: Google 披露 XCPE 打击行动并禁用供应商资质
  body: 报告以高置信度将故意部署行为归因于 Videostrong。其至少另有 1,000 万台设备的估计指关联模块控制设施被打击的影响，并非又有 1,000 万台 XCPE 电视盒。
checklist:
- title: 查找并隔离受影响设备
  hint: 检查 Android 电视盒及其他 IoT 固件中的 x.cpe、com.oemservice、com.abc.nexus，以及较新的 com.android.system.ntp 或 com.android.sso.auth.handler 包。将可疑设备与敏感网络隔离，保留固件和日志。
- title: 排查完整网络指标
  hint: Google 附录列出 169 个网络指标：amhib[.]com、disview[.]com、prataw[.]com、auqee[.]com、alptk[.]com、mfiny[.]com、leisurepuz[.]com、earn[.]fm、geo-loadbalanced[.]com、collection[.]shixunsuda[.]com、analysis[.]shixunsuda[.]com、gtxvdqvuweqs[.]com、hiddeninplainsight[.]top、absolut[.]fit、alpivara[.]com、beepityping[.]com、beezlepongmad[.]com、bloopondle[.]com、blustpong[.]com、braigwshat[.]com、brisping[.]com、bronglepong[.]com、clapslpist[.]com、clapslport[.]com、craipivolta[.]com、creapslpinut[.]com、crodipolis[.]com、delpiverno[.]com、depomancy[.]com、dewswyra[.]com、drackpingcare[.]com、dramapi[.]com、drapithon[.]com、fawsilver[.]com、fawsindra[.]com、fizzlepong[.]com、flaigwern[.]com、flapilo[.]com、flapslwstorm[.]com、flawsino[.]com、flewsnark[.]com、floporin[.]com、floppipple[.]com、flumpipoodle[.]com、frosping[.]com、gapslpinch[.]com、gapslwsbor[.]com、glapoton[.]com、glewsnap[.]com、glippinger[.]com、gloobfnatch[.]com、gloopong[.]com、glowspar[.]com、grasplpond[.]com、grinapslpocal[.]com、hawsith[.]com、lapslponze[.]com、lepovia[.]com、limpingcare[.]com、lorapslpifyx[.]com、lowswyn[.]com、lunapiris[.]com、mopith[.]com、mudponger[.]com、nepiral[.]com、opostra[.]com、pibberflop[.]com、pikaroodle[.]com、ploponix[.]com、qepoth[.]com、rapinel[.]com、rapslpine[.]com、rapslponic[.]com、rapslwsweave[.]com、raspongle[.]com、ripotus[.]com、rowswyn[.]com、scapslwshell[.]com、snarpong[.]com、snorpdoodle[.]com、sofpilan[.]com、soporth[.]com、spopel[.]com、tawserin[.]com、tawswizzle[.]com、teowsmera[.]com、tepiol[.]com、tewsmariel[.]com、thaiporix[.]com、thapolex[.]com、torpoodle[.]com、trapslwsin[.]com、trawsica[.]com、tripikazu[.]com、twindping[.]com、vaiporun[.]com、vespilara[.]com、vorpolis[.]com、whispong[.]com、winklenark[.]com、wizzleplonk[.]com、wogglenift[.]com、yapodust[.]com、yewsara[.]com、zarflonk[.]com、zenapslpinic[.]com、zerapslpomat[.]com、zimpire[.]com、zingpingbees[.]com、zippypongbee[.]com、zoraipinex[.]com、zorapslwsnic[.]com、zrawsomble[.]com、bestipip[.]com、fecebbbk[.]xyz、guangzhouroot[.]com、bd-devmetrics[.]net、jaguar-distributor[.]logreporter[.]com、jaguar-distributor[.]syslogcollector[.]com、tx-devmetrics[.]net、linkfog[.]cn、cloudbrokerapi[.]xyz、dddlink[.]link、smrtai[.]cc、bkdomain[.]cn、columbus2024[.]com、dmurdce[.]xyz、edisajalsjfdfh[.]shop、fshuaons2[.]online、fuioahsdoa3[.]store、fuisans1[.]online、haimnsgsjhansj[.]shop、ishano456[.]sbs、ishuoabh3years[.]online、sdoisanadf[.]shop、shaiosjdaln[.]shop、shsuanalsjai[.]shop、ty4523[.]space、ty54fgd435[.]my、ue886578433[.]online、vrr8345[.]site、xmsae[.]sbs、xshaon123[.]sbs、dgjm[.]online、drgdj[.]top、spiritlib[.]cyou、*[.]traffmonetizer[.]com、219[.]134[.]163[.]210、219[.]134[.]163[.]211、23[.]94[.]49[.]57、38[.]145[.]197[.]135、Hosts anyevonline[.]com and file server、*[.]anyevonline[.]com、intermedia-arts[.]tv、szbboys[.]com、ott[.]szbboys[.]com、mqtt[.]szbboys[.]com、github[.]com/Aviciiii/、github[.]com/Spink1984/、github[.]com/undowildcats-sketch/、github[.]com/szjkkax/、github[.]com/szsoft01/、github[.]com/ktpeng2026/、github[.]com/yf-videostrong/、github[.]com/vspeng/、github[.]com/szwzy43/、github[.]com/ChenHui1026/、github[.]com/zurant/、yokatvonline[.]com。对照 DNS、代理和出站日志；MQTT 使用 3885–3887 端口。同一附录提供完整核心及关联模块的样本哈希和包名。命中本身不能证明入侵，共享托管和合法代理服务需要结合上下文判断。 另查历史 HTTP 引导流量：mcstb.anyevonline[.]com:8000 或 stb[AndroidVersion][Type].anyevonline[.]com:8000，路径 /router/config/mqtt、/router/config/acs、/router/config/app，以及 ott.szbboys[.]com:8000/cpe/file/upload。报告还观察到 filemail[.]com 文件托管和 ip-api[.]com 定位请求；这些共享合法服务不能单独作为封禁依据。
- title: 通过可信固件恢复
  hint: Google 披露恶意软件可从 /oem/ 重新安装，较新载荷还会持久化于 /system/priv-app/。卸载应用或重启无法证明固件干净。向可信供应商获取经过验证的干净镜像，或更换硬件；这是根据持久化机制给出的恢复建议，并非厂商已发布修复版本。
- title: 保持设备防护开启
  hint: Google 建议使用可信应用商店、检查 VPN 和代理权限，并开启 Play Protect。采购替代设备时查看 Android TV 合作伙伴名单；认证本身并未阻止此次攻击。
sources:
- name: Google Threat Intelligence Group 的 XCPE 调查
  says: 恶意软件原始分析、设备数量估计、归因、打击措施、用户建议及完整指标附录。
---

暴露前提是设备运行受影响固件，并非所有 Android 设备都存在此漏洞。Google 观察到特权预装后门及犯罪模块，并将行动归因于 Videostrong。报告没有给出通用修复固件；关停基础设施属于遏制措施，不代表设备已确认清理干净。
