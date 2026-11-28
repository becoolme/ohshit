---
title: pCloud 确认 Pass 遭攻击及邮箱泄露，加密密码库是否被复制仍未说明
tags: [pCloud, 密码管理器, 数据泄露]
summary: pCloud 确认针对 pCloud Pass 的攻击已受控，部分用户邮箱地址暴露，登录尝试触发了通知。厂商称保存的密码和笔记仍受保护，Cloud Storage 未受影响。受影响人数、初始入口及加密密码库是否被复制均未披露。
splash: 邮箱地址遭暴露的 pCloud Pass 用户；人数和攻击前提尚未披露
wipe: 检查账户设备，处置异常访问，启用 2FA，拒绝索要主密码或恢复词的消息。
inTheWildNote: pCloud 原始声明确认攻击、邮箱地址暴露和登录尝试。
timeline:
  - date: 2026年11月27日
    title: pCloud 确认 Pass 安全事件
    body: pCloud 团队称攻击已受控，部分 Pass 用户邮箱地址暴露，登录尝试触发自动通知。厂商称密码库内容及 Cloud Storage 未遭攻破，但未提供人数或技术入口。
checklist:
  - title: 直接进入服务核对陌生设备通知
    hint: 自行打开 pCloud 网站，在 Settings > Security > Logged devices 移除不认识的会话。保留通知、设备名、IP 和时间，将无法解释的访问提交给 support@pcloud.com；不要发送主密码或恢复词。通知本身不能证明密码库被访问。
  - title: 处置异常账户访问
    hint: pCloud 的通用登录指南建议在出现陌生登录后修改 pCloud 账户密码。打开 my.pcloud.com > 账户头像 > Settings > Security，重新输入当前密码并按提示设置强且唯一的密码。这是账户保护措施，不代表厂商已要求重置 Pass 中保存的所有密码。
  - title: 启用双重验证并保留恢复途径
    hint: 在 my.pcloud.com > Settings > Security 启用 Two-factor authentication，确认账户密码，再输入短信接收号码或扫描验证器二维码，输入收到或生成的验证码并安全保存恢复码。如果只通过第三方账户登录、尚无账户密码，应先在官方登录页使用 Forgot password 流程设置密码。已经启用 2FA 的用户应继续保留；本次事件尚未证实存在 2FA 绕过。
  - title: 拒绝后续钓鱼
    hint: pCloud 表示不会通过邮件、电话或聊天索要 Master Password 或恢复词。不要在回复通知或陌生客服消息时提供这些信息；自行打开官方服务核查。
sources:
  - name: pCloud 团队原始事件声明
    says: pCloudApp 账户确认 Pass 攻击已受控、邮箱地址暴露和登录尝试，称密码库内容及 Cloud Storage 未受影响，并提醒防范钓鱼；未说明加密密码库副本是否被获取。
  - name: pCloud 登录与账户访问指南
    says: 通用指南提供账户密码修改步骤、陌生登录通知处置及联系支持的方法，并非本次事件的全面重置指令。
  - name: pCloud 双重验证指南
    says: 说明 2FA 配置、恢复码及可疑登录设备移除方法，不能据此确定本次攻击机制。
---

11 月 27 日，pCloud 团队确认 pCloud Pass 遭到网络攻击，数量未披露、厂商形容为少量的用户邮箱地址暴露，并出现登录尝试。厂商称攻击已受控。密码管理服务确认遭攻击，支持定为 L4；公开声明没有给出受害者总数或已确认的资金损失。

pCloud 称保存的密码、笔记及其他 Pass 信息仍由客户端加密和主密码保护，Cloud Storage 服务未受影响。这些是厂商声明，并非独立取证排除影响的结论。声明未明确回答加密密码库文件是否曾被访问或复制；不能据此认定密码库被盗，也不能据此证明没有副本被获取。

原始讨论中的用户质疑“登录尝试”的解释，并报告在已启用 2FA 时仍收到陌生设备通知。这些报告不足以证实 2FA 被绕过、密码库被解密访问或 Cloud Storage 遭入侵。初始入口、攻击前提及受影响软件版本均未披露。pCloud 对 AI 加速漏洞发现的讨论，并未认定 AI 是本次事件的原因。

声明未公布针对本次事件的修复版本、全面重置主密码或轮换所有已保存凭据的要求。按上述通用账户指南核查陌生活动，并向 pCloud 寻求说明；执行这些步骤时，应区分账户密码与 Pass 主密码。
