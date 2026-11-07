---
title: Web3Auth 暂停嵌入式钱包，Keplr 调查社交登录钱包的未授权交易
tags: [Web3Auth, Keplr, 嵌入式钱包, 社交登录]
summary: Web3Auth 暂停嵌入式钱包服务。Keplr 收到部分通过 Google 或 Apple 登录创建的钱包发生未授权交易的报告后，暂停了这两种登录方式。Keplr 联合创始人初步估计，该群体约 20% 可能受影响，其中实际被利用的占比似乎更小。总损失及攻击机制仍不明。
splash: 通过 Google 或 Apple 登录创建的 Keplr 钱包。Keplr 初步判断助记词及硬件钱包未受影响。
wipe: 暂停向可能受影响的账户转入资金，也别重新导入这些账户。关注官方指引，通过 Keplr 支持报告不认识的交易。
inTheWildNote: Keplr 收到未授权交易报告，其联合创始人称已有账户遭利用。
timeline:
- date: 11月6日 21:13 UTC
  title: Web3Auth 披露嵌入式钱包安全问题
  body: Web3Auth 暂停了部分第三方使用的服务，并称初步调查未发现 MetaMask 用户受影响的证据。
- date: 11月7日 04:38 UTC
  title: Keplr 报告未授权交易并暂停社交登录
  body: 报告涉及部分使用 Google 或 Apple 登录创建的钱包。Keplr 正与 Web3Auth 联合调查。
- date: 11月7日 08:29 UTC
  title: Keplr 联合创始人公布初步影响估计
  body: Josh Lee 称问题源于 Web3Auth，并估计约 20% 的 Keplr 社交登录账户可能受影响，其中实际被利用的占比似乎更小。
checklist:
- title: 停止转入新资金，保留现有钱包配置
  hint: 如果账户是通过 Google 或 Apple 登录创建的，Keplr 要求调查期间不要继续向该账户转入资金，也别在任何地方重新导入或创建该账户。
- title: 保存并报告异常活动
  hint: 保留公开钱包地址、链名、交易哈希、时间和金额。通过 Keplr 官网联系支持，关注 Keplr 官方账号，忽略陌生人发来的资金追回链接。不要透露私钥或助记词。
- title: 恢复登录集成前核实上游状态
  hint: 依赖 Web3Auth 的应用应查看厂商状态事件及开发者公告。等厂商确认恢复步骤后，再启用受影响流程。状态页显示的是计划维护时段。
sources:
- name: Web3Auth 事件披露
  says: 通过公开副本核阅原始公告，确认服务暂停及对 MetaMask 用户影响的初步判断。
- name: Keplr 事件通知
  says: 通过公开副本核阅原始公告，报告未授权交易、涉及的钱包创建方式、暂停登录及用户应立即采取的措施。
- name: Keplr 联合创始人的初步调查结果
  says: 通过公开副本核阅原始公告，将事件归因于上游服务商，并给出初步影响估计及恢复工作进展。
- name: Web3Auth 登录服务维护
  says: 记录安全事件引发的维护，并称服务恢复后会公告。
- name: MetaMask 开发者公告
  says: 确认服务暂停，并重申初步调查未发现 MetaMask 用户受影响的证据。
---

Web3Auth 披露其部分第三方使用的嵌入式钱包服务存在安全问题。Keplr 收到部分通过 Google 或 Apple 登录创建的钱包发生未授权交易的报告。Keplr 初步判断，使用助记词创建或使用硬件钱包的账户未受影响。Web3Auth 初步调查未发现 MetaMask 用户受影响的证据。11 月 7 日开发者公告重申了这一判断。

Keplr 联合创始人 Josh Lee 称事件源于 Web3Auth，初步估计约 20% 的 Keplr Google 或 Apple 登录账户可能受影响。Lee 称实际被利用的占比似乎更小，恢复工作仍在进行。已核阅的披露尚未提供独立核实的账户数量、最终损失、攻击机制或赔偿方案。

可核阅原始声明的公开副本。[Web3Auth](https://teapaw.org/Web3Auth/status/2118814067359969745)、[Keplr](https://teapaw.org/keplrwallet/status/2118926087615045807)、[Josh Lee](https://teapaw.org/dogemos/status/2118984142151196677)。
