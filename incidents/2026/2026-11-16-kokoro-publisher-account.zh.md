---
title: "研究人员通过可重新注册的域名接管 Kokoro 的 Hugging Face 发布者账号"
tags: [AI, 供应链, 账号接管]
summary: >-
  Alon Hertz 报告称，研究团队注册 hexgrad.com 并重置密码，接管了 hexgrad 发布者账号。团队在本地测试了修改后的 Kokoro 权重，并表示已保护账号，未发布这些权重。
splash: "从 hexgrad/Kokoro-82M 获取 Kokoro 权重的部署，以及使用自有域名邮箱恢复账号的模型发布者。"
wipe: "固定已审核的模型修订，审计近期下载，保护发布者的恢复邮箱并启用 2FA。"
inTheWildNote: "研究演示。Hertz 表示修改后的权重从未上传。"
timeline:
  - date: 2026 年 11 月 16 日
    title: Hertz 发布账号接管演示
    body: 披露称账号已受到保护，未泄露、修改或上传任何内容。
checklist:
  - title: 固定生产环境使用的模型修订
    hint: "盘点直接和间接的 Kokoro 模型下载。使用 hf_hub_download 或 snapshot_download 时，将 revision 设为已审核的完整提交哈希，避免依赖默认的 main 分支。保留获批权重及其哈希，便于比较。"
  - title: 检查部署实际获取的内容
    hint: "将近期构建记录、模型修订 ID 和缓存快照与获批制品比较。未经审核的模型更新应先评估文本转语音行为是否符合预期，再推广至生产环境。通过正常安全响应流程处理意外的文件变化。"
  - title: 保护发布者账号的恢复和登录渠道
    hint: "将恢复邮箱放在持续控制并续费的域名上。检查账号邮箱与访问设置。在 Hugging Face 的 Settings > Security 中启用 2FA，安全保存恢复码，并在账号恢复后核实发布权限。"
sources:
  - name: Alon Hertz 原始披露
    says: 说明发布者账号接管、本地权重修改和账号保护情况。
  - name: Hugging Face 下载文档
    says: 说明下载时如何选择修订并使用完整提交哈希。
  - name: Hugging Face 双因素认证指南
    says: 说明账号 2FA 设置和恢复码。
  - name: 研究人员公开 RSS
    says: 记录原始文章于 2026 年 11 月 16 日发布。
---

Hertz 表示，注册 hexgrad.com 后，研究团队得以重置 Kokoro 所属 Hugging Face 发布者账号的密码。研究人员还在本地测试了修改后的模型权重，使语音内容与输入文本不同。披露称，团队与 Hugging Face 协调并保护了账号，未发布修改后的权重。

演示揭示了受信任发布者身份转手的风险。该事件被评为 L3，因为它展示了涉及广泛使用模型的供应链薄弱点。公开证据未证实恶意权重分发或下游受害者失陷。固定并评估模型制品有助于使用方控制进入生产环境的修订。
