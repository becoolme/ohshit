---
title: "Oracle Health 泄露人数悄悄涨到近 2000 万患者"
headline: "Oracle Health：2025 年那次泄露，现在算出来约 2000 万人"
tags: [医疗, 数据泄露]
summary: >-
  2025 年初，攻击者用盗来的登录凭据进了两台老旧的 Cerner 服务器。真实规模直到得克萨斯州总检察长收到的一份申报才浮出水面：1990 万人，泄露内容包括社保号、诊断、用药和医学影像。Oracle 至今没有公布总数。
splash: "美国老 Cerner 客户的约 1990 万患者，至少 29 家医院和医疗系统"
wipe: "冻结信用，当心冒充“Oracle Health”的通知；医疗机构：强制 MFA，下线老旧服务器"
inTheWildNote: 数据在 2025 年就被偷走了，这次是更新后的人数
oneLiner: >-
  有人登进了两台一直没迁上云的老 Cerner 服务器，顺手带走了大约每 17 个美国人里一个人的病历。
timeline:
  - date: 2025年1月22日
    title: 两台老旧 Cerner 服务器被入侵
    body: 用的是盗来的凭据。俄勒冈州给出的暴露窗口是 2025年1月22日至4月1日。
  - date: 2025年2月至3月
    title: Oracle 发现入侵
    body: 报道中的发现日期是 2025年2月20日或3月7日。
  - date: 2025年3月31日前后
    title: Oracle 开始悄悄通知医院客户
  - date: 2026年10月2日
    title: 更新后的总数报送得克萨斯州总检察长
    body: 共 1990 万人，其中得州居民 2,992,244 人。
  - date: 2026年10月5日
    title: 彭博社报道“近 2000 万”
checklist:
  - title: 冻结你的信用
    hint: Equifax、Experian 和 TransUnion 三家都要冻。在美国是免费的
  - title: 留意医疗身份盗用
    hint: 翻翻你的医保福利说明（EOB），看有没有你根本没接受过的诊疗
  - title: 不请自来、还带链接的“Oracle Health”通知一律别理
    hint: 每次泄露新闻一出，钓鱼邮件必然跟上
  - title: 医疗机构：盘点老旧 Cerner 服务器
    hint: 没迁移的一律下线或隔离
  - title: 医疗机构：全面强制 MFA
    hint: 这次就是从一个被盗的密码开始的
sourceException: "全美总数有多家媒体报道，但这里没有链接得州总检察长那份原始申报，该数字仍未经核实。"
sources:
  - says: 据得州总检察长申报为 1990 万；总数未经独立核实；HHS OCR 上仍是占位数字
  - says: 报道了近 2000 万这一数字
  - says: 泄露人数的变化历程
  - says: 彭博社 10月5日的报道
---
这是一次老泄露，只是规模越滚越大。**2025 年 1 月**，有人用**盗来的凭据**进了两台还没迁到 Oracle Cloud 的老旧 Cerner 服务器。服务器上存着使用 Cerner 电子病历系统的医院和医疗系统的数据。

Oracle 从没公布过总数，数字是从各州的申报里漏出来的：**2026年10月2日**提交给**得克萨斯州总检察长**的一份申报写的是 **1990 万人**。HIPAA Journal 指出这个数字未经独立核实，联邦 HHS 的泄露公示平台上至今还是占位数字。

泄露的数据包括姓名、社保号、住址、诊断、用药、检查结果、医学影像、病历号和医生姓名。相关诉讼仍在进行中。

> 这里没有一手信源：Oracle 和得州总检察长都没有公开表态。如果你能找到申报原件的链接，欢迎[提交 pull request](https://github.com/becoolme/ohshit/blob/main/CONTRIBUTING.md)。
