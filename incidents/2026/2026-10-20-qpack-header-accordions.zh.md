---
title: Header Accordions 研究披露多个 HTTP/3 协议栈中的 QPACK 拒绝服务路径
headline: HTTP/3：头部压缩了，管道撑爆了
summary: FoxIO 于 10月20日发布跨协议栈 QPACK 研究及复现代码。解码后头部缺少限制或检查过晚，会耗尽内存或卡死服务器。部分组件此前已修复；披露时 Bun、hyperium h3 和 aioquic/mitmproxy 仍存在未解决路径。
splash: 暴露受影响 HTTP/3 协议栈的应用；Wireshark 另有抓包解析问题
wipe: 升级已修复的库；停用对外 Bun HTTP/3 和 mitmproxy HTTP/3，并限制 h3 解码头部大小
inTheWildNote: 已有公开复现代码；所引报告未确认在野攻击
cves:
  - name: quic-go 解码头部内存耗尽
    description: 客户端和服务端解码后的头部超出按压缩体积计算的预算。
  - name: Cloudflare quiche 资源耗尽
    description: HTTP/3 帧分配与 QPACK 计数会允许过量内存使用。
  - name: Wireshark HTTP/3 解析器崩溃
    description: 解密 HTTP/3 流量或加载包含解密密钥的抓包时，解析器可能崩溃。
fixed:
  - {}
  - {}
  - {}
  - {}
  - status: FoxIO 在 10月20日披露时未记录修复
timeline:
  - date: 2025年至2026年
    title: 各组件先后发布公告和补丁
  - date: 2026年10月20日
    title: FoxIO 发布跨协议栈研究和复现代码
checklist:
  - title: 盘点应用和代理中的 HTTP/3 库版本
  - title: 升级受影响库至厂商修复版本
  - title: 修复前停用对外 Bun HTTP/3；mitmproxy 使用 --set http3=false
  - title: 为 hyperium h3 配置有限的 max_field_section_size
  - title: 监控 HTTP/3 端点的内存和 CPU
sources:
  - name: FoxIO 原始研究
    says: 10月20日跨协议栈披露、复现代码、未修复组件及缓解措施
  - name: quic-go 安全公告
    says: CVE-2025-64702，CVSS 5.3；0.57.0 修复
  - name: Cloudflare quiche 安全公告
    says: CVE-2026-12523，CVSS 7.5；最早修复版本为 0.29.3
  - name: lsquic 官方发布记录
    says: 4.9.0 限制缓冲的头部集合数量以约束内存使用
  - name: Wireshark 安全公告
    says: CVE-2025-13945；4.6.2 和 4.4.12 修复；没有已知利用
---

本条记录的是新公开的跨协议栈研究，不意味着所有列出的 CVE 都在本周披露。应用若内嵌旧库，早期修复版本仍然有意义。公开复现代码和主流依赖的影响足以达到 L3；所引材料没有证明正在发生在野攻击。
