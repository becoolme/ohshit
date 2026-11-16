---
title: "固件 TPM 状态回滚削弱 Windows Hello 和 BitLocker 的 PIN 保护"
summary: >-
  研究人员演示了通过物理访问回滚部分固件 TPM 的失败尝试状态。按实验设备的实测尝试速率，最坏情况下猜中四位 Windows Hello PIN 约需 40 小时，猜中六位 BitLocker 启动 PIN 约需 20 天。
splash: "可被物理接触，且使用受影响 AMD 固件 TPM 配置或 Winbond RPMC 闪存的 Windows 设备。"
wipe: "加长较短的数字 PIN，防止设备被物理篡改，并向整机厂商确认经过验证的固件或硬件修复。"
inTheWildNote: "研究人员在实验室演示了攻击，尚无在野利用报告。"
timeline:
  - date: 2026年11月14日
    title: ACM 发布 Hello Again 论文
    body: 研究人员说明了在受测 AMD 和 Intel 配置上回滚固件 TPM 状态的方法，并演示了针对 Windows Hello 和 BitLocker 的攻击。
  - date: 2026年11月16日
    title: 研究人员补充 AMD 设备的 RPMC 检查方法
    body: 研究仓库说明了 Linux 固件安全属性，以及读不到相关属性时应如何理解。
checklist:
  - title: 识别可能被物理接触的硬件配置
    hint: 盘点准确的设备型号、固件和 TPM 类型，并向整机厂商核实主板和闪存配置。AMD 设备可在 Linux 上查看 fwupdmgr security 的 AMD SPI Replay protections，或读取可用的 rpmc_spirom_available 和 rpmc_production_enabled。缺少这些属性时无法据此判定。
  - title: 更换较短的数字 PIN 并提高最低长度
    hint: 研究人员建议至少增加两位数字。对应论文中的四位和六位示例，Windows Hello 至少设为六位，BitLocker TPM+PIN 至少设为八位。分别设置两项 PIN 策略并检查现有 PIN。更改启动 PIN 前先确认可以取得 BitLocker 恢复密钥。
  - title: 保护设备并核实整机厂商的修复
    hint: 限制设备的物理访问，调查可疑的主板篡改。按准确的主板和固件配置跟踪整机厂商公告。在确认修复前继续使用较长的 PIN。
sources:
  - name: Hello Again 研究论文
    says: 说明攻击前提、实测尝试速率、受测硬件、厂商回应和临时缓解措施。
  - name: ACM 会议论文出版元数据
    says: 将 11 月 14 日列为会议论文的发布日期。
  - name: 研究人员的 RPMC 仓库
    says: 提供硬件识别方法，并说明如何检查 AMD RPMC 属性。
  - name: Microsoft Windows Hello for Business 策略设置
    says: 说明如何设置 Windows Hello for Business PIN 的最低长度。
  - name: Microsoft BitLocker 配置
    says: 说明 BitLocker 启动 PIN 的独立最低长度策略。
---

固件 TPM 可将失败的 PIN 尝试次数等加密状态保存在外部 SPI 闪存中。部分系统通过闪存上的防重放单调计数器（RPMC）拒绝旧状态。研究人员证明，在受影响的硬件上，能修改闪存内容或接入主板 SPI 总线的攻击者可以恢复旧状态，绕过 PIN 尝试之间的等待时间。

在 HP OmniBook 3 上测试的 AMD 路径中，阻止计数器递增后，平台仍认为递增已经成功。该设备启用 Pluton 后，研究人员也观察到类似的未经验证的计数器递增。在一台使用受影响 Winbond 闪存的 Intel Framework Laptop 13 上，提取闪存认证密钥后可以伪造计数器响应。团队还在两台没有 RPMC 的受测 AMD 系统上通过恢复旧闪存镜像回滚了状态。这些结果对应特定的攻击路径和测试配置。设备是否受影响取决于实际固件和闪存。

论文在 HP 设备上测试了 Windows Hello，在 Framework 设备上测试了 BitLocker 的 TPM+PIN 启动保护。40 小时和 20 天是按实验设备实测速率计算的最坏情况估计。按同一模型，六位数字 Hello PIN 和八位数字 BitLocker PIN 分别需约 168 天和六年。较长的 PIN 会提高猜测成本，回滚弱点仍然存在。论文称 Windows Hello 个案没有 CVE，发表时也未给出针对 AMD 和 Winbond 主要问题的已验证固件或芯片修复。
