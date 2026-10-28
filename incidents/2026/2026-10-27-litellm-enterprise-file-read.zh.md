---
title: LiteLLM Enterprise 代理文件读取漏洞可在未认证时泄露主密钥
tags:
  - LiteLLM
  - 凭据
  - Enterprise
summary: 启用 Enterprise 许可证的 LiteLLM 代理可通过未认证 LLM 请求泄露本地文件，进而被取得管理权限；部分配置还可导致 root 代码执行。应升级至修复版本，未启用许可证的 OSS 部署不受影响。
splash: 通过 HTTP 可达且启用 Enterprise 许可证的代理；外传需要连接攻击者端点
wipe: 升级至 1.103.10 / 1.104.8 / 1.105.6 / 1.106.5；修复前过滤触发键并限制入站、出站访问
inTheWildNote: 公告未证实在野利用。
cves:
  - name: Enterprise 代理未认证文件读取
    description: 本地文件外传可暴露主密钥并允许管理代理；宿主代码执行取决于配置。
fixed:
  - {}
  - {}
  - {}
  - {}
timeline:
  - date: 2026年10月6日
    title: 厂商向 Enterprise 客户私下分发修复
  - date: 2026年10月27日
    title: 禁运结束，公开公告及修复构建
checklist:
  - title: 更新启用许可证的代理
    hint: 从经核实的官方渠道选择上方对应修复版本；10 月 21 日投毒事件的回退版本 1.106.2 无法修复本次独立 Enterprise 漏洞。
  - title: 阻断触发条件并限制网络路径
    hint: 在入口拒绝或移除 POST JSON 键 standard_callback_dynamic_params、gcs_path_service_account、callbacks、success_callback 和 failure_callback。出站仅允许已配置的 LLM 服务商；通过 VPN、mTLS、认证入口或 IP 白名单限制访问。
  - title: 减少密钥暴露并调查可访问凭据
    hint: 从密钥管理器加载主密钥，设置独立的 LITELLM_SALT_KEY，并检查疑似文件访问及外传，包括 /proc/self/environ。通用事件响应建议：保留日志，若发现暴露应轮换主密钥及服务商密钥；没有公开的攻击活动专属指标。
sources:
  - name: LiteLLM Enterprise 安全公告
    says: Enterprise 专属前提、四个修复版本、CVSS 10.0、五个触发键及缓解措施；未列出 CVE。
  - name: LiteLLM 私有仓库披露
    says: 10 月 6 日私下修复，10 月 27 日公开；确认版本及仅限 Enterprise 的范围。
---

本公告独立于 [10 月 21 日发布链投毒](/zh/incidents/litellm-pypi-compromise/)。启用 Enterprise 许可证才会加载易受攻击路径；请求可将本地文件内容发送至指定令牌端点。若环境文件被读取，其中的主密钥及服务商密钥会暴露。root 代码执行依赖配置，并非每个代理都会发生。广泛使用的网关存在未认证管理权限获取风险，但尚无已确认的真实攻击或受害者总数，因此评为 L3。
