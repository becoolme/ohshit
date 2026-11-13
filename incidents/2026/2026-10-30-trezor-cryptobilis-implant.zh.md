---
title: Trezor 确认 CryptoBilis 售出的三台 Safe 5 存在硬件植入
tags: [Trezor, 硬件钱包, 供应链]
summary: Trezor 在 8 月 20 日至 9 月 23 日经 CryptoBilis 购买的三台 Safe 5 中发现植入。固件 2.13.1 可阻止已发现的植入板继续采集信息。自 3 月起从 CryptoBilis 购买任何 Trezor 型号的用户仍应将资金迁往使用全新助记词的钱包。
splash: 已确认涉及三台 CryptoBilis 售出的 Safe 5。预防措施覆盖该经销商自 2026 年 3 月起供货的所有 Trezor 型号。
wipe: 将资金迁往使用全新助记词的安全钱包，并联系 Trezor 支持办理更换。
inTheWildNote: Trezor 已确认三台设备存在植入，尚未收到客户资金损失报告。
fixed:
- { product: Trezor Safe 5 固件, status: 阻止已知植入板继续采集 }
timeline:
- date: 2026年10月9日
  title: Trezor 取消 CryptoBilis 经销商资格
- date: 2026年10月28日
  title: Safe 5 买家报告疑似植入
- date: 2026年10月30日
  title: Trezor 在实验室确认前警告买家
- date: 2026年11月11日
  title: Safe 5 固件加入针对已识别植入板的防护
- date: 2026年11月12日
  title: Trezor 确认三台 Safe 5 受影响
  body: 实验室检查了第一台设备，并从买家照片中确认另外两台。已有 48 名客户联系 Trezor。
checklist:
- title: 核对卖家并迁移资金
  hint: 查收据确认是否由 CryptoBilis 供货，包括 Tokopedia 和 Shopee 店铺。将资金迁往使用全新助记词的安全替代钱包。必要时，Trezor 建议暂时使用熟悉的软件钱包或交易所。核对完整收款地址。固件更新无法让先前已被采集的备份失效。
- title: 停用疑似被改装的设备
  hint: 保留设备供支持人员检查。收到 Trezor 指引前不要初始化、使用或输入助记词。称重或自行拆机无法可靠证明设备安全。若支持人员确认设备可以继续使用，请通过 Trezor Suite 安装官方固件。
- title: 安全办理更换
  hint: 2026 年 3 月起购买的客户可联系 trezor.io/support。受配送限制时，可能换用其他型号并退还差价、配送到其他国家或退款。切勿透露助记词或附加口令。
sources:
- name: Trezor 首份安全公告
- name: Trezor 调查更新
  says: 确认设备范围、植入板行为、固件防护和更换指引。
---
Trezor 检查了第一台 Safe 5，并分析了植入板的固件。主板与屏幕之间的电路板会采集屏幕上显示的助记词和附加口令，加密后通过移动网络发送，无法连接时会重试。Trezor 称，该电路板不会修改钱包固件或安全元件。

三台确认受影响的设备在 2026 年 8 月 20 日至 9 月 23 日之间购自 CryptoBilis，包括其 Tokopedia、Shopee 店铺以及直接购买。Trezor 在已检查的其他型号和其他经销商设备中未发现植入。已有 48 名客户联系 Trezor。厂商尚未收到客户资金损失报告。更广的预防措施覆盖该卖家自 3 月起供应的所有型号。Trezor 还将经销商网络缩减约 80%，并收紧采购、仓储和访问管理。已确认存在硬件供应链问题，目前观察到的影响范围较窄，维持 L3。
