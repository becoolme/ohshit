---
title: Rails 修复 21 项安全问题，Active Storage 上传可导致文件访问及代码执行
summary: Rails 8.0.5.2 及 8.1.4.1 修复 21 项问题，包括 Active Storage 恶意上传导致文件访问及可能代码执行。ImageMagick 策略、Disk 存储及 FFmpeg 构建选项决定暴露范围。更新 Rails、mini_magick，检查 GCS 上传 CORS，并轮换可能暴露的凭据；尚未确立实际攻击。
splash: Rails 接受不可信附件并经 ImageMagick 或 FFmpeg 处理；同批其他问题各有配置前提。
wipe: 升级 Rails 8.0.5.2 或 8.1.4.1，检查处理依赖、上传配置及暴露凭据。
inTheWildNote: 厂商说明攻击路径，但未确认真实环境遭利用。
cves:
- name: ImageMagick 附件分析任意文件写入及读取
  description: 不可信附件可触发不安全 ImageMagick coder；任意写入及 Disk 存储下的读取可泄露应用凭据，并进一步导致代码执行。
- name: 上传文件扩展名选择不安全媒体解码器
  description: 攻击者控制的扩展名可选择 FFmpeg 或 ImageMagick 解码器；AviSynth 路径另需启用 AviSynth 的 FFmpeg 及 AviSynthPlus 运行时。
fixed:
- product: Rails 8.0／受影响组件 gem
  status: Rails 8.0 安全支持于 2026 年 11 月 7 日结束
- product: Rails 8.1／受影响组件 gem
  status: 安全修复版本
- product: 更早 Rails 分支
  status: 不再支持，迁移至受支持分支
- product: 使用 :mini_magick 应用的 mini_magick
  status: 应用新策略所需最低版本，不能单独替代 Rails 修复
timeline:
- date: 2026年11月4日
  title: Rails 为两个受支持分支发布安全更新
  body: 同批处理 21 条公告；ImageMagick 严重漏洞及媒体解码高危问题的原始记录尚未分配 CVE。
checklist:
- title: 升级已部署 Rails gem 并检查启动
  hint: 检查 Gemfile.lock 及实际部署 bundle 的 Rails、activestorage 和其他组件，升级至 8.0.5.2 或 8.1.4.1 后重新部署。使用 :mini_magick 的应用还需 mini_magick >=5.1，否则新策略导致启动异常。Rails 8.0 安全支持于 2026 年 11 月 7 日结束，应规划迁移。
- title: 接受上传前核查图片及媒体处理
  hint: 检查 config.active_storage.variant_processor、load_defaults 及 ImageMagick 策略。load_defaults 6.1 及更早默认使用 :mini_magick。不可信上传结合允许不安全 coder 的策略，会在附加附件时触发图片分析，无需显式调用变体或预览。暂不能升级时，将 activestorage/lib/active_storage/image_magick/policy.xml 的完整策略应用到主机策略；公告最低规则不等于完整策略。单独检查自定义 MiniMagick.cli_env、cli_prefix、Shell 及 GraphicsMagick；PDF、PostScript 流程须谨慎测试策略。
- title: 检查 FFmpeg 构建，等待补丁时关闭高风险处理
  hint: 所述 AviSynth 执行路径要求 --enable-avisynth 及 AviSynthPlus；上游、常见 Linux 和 Homebrew 构建未启用，但公告提到的 GPL 构建启用了。其他由扩展名选择的解码器仍需关注。升级前可从 config.active_storage.previewers 移除 VideoPreviewer，并从 config.active_storage.analyzers 移除 VideoAnalyzer、AudioAnalyzer，停止 Active Storage 使用 FFmpeg；这不能修复 ImageMagick。测试修复后的扩展名、内容类型处理及允许媒体格式。
- title: 更换漏洞处理流程可读到的凭据
  hint: 厂商要求 Disk 存储结合 ImageMagick 的部署，以及满足 AviSynth 条件的部署，更换应用进程可读取的全部秘密：secret_key_base、主密钥及 config/credentials.yml.enc 解密值、存储及数据库凭据、第三方令牌。从可信环境操作，不保留已暴露秘密作轮换回退。更换 secret_key_base 会使会话、签名及加密 Cookie、签名 global ID 和 Active Storage URL 失效，应安排用户影响。安装补丁不能撤销既有泄露。
- title: 测试 GCS 上传及会话、缓存变更
  hint: 使用 GCS 直接上传时，升级后须在 bucket CORS 的 responseHeader 中允许 x-goog-content-length-range，否则浏览器上传失败。对照应用配置检查同批独立的 GCS cache_control、CacheStore 会话撤销、Cookie 轮换与 Active Storage 代理缓存、SameSite 及内容协商修复。共享缓存不应储存含 Set-Cookie 的响应；不能假定每个应用都满足每条公告的前提。
sources:
- name: Rails 11 月 4 日安全发布
  says: 21 条公告的批次、修复版本、支持期限及各原文链接。
- name: Rails GHSA-f3w6-w445-fwh9
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-v924-7rp8-4mxh
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-wm3x-v3qw-4jh3
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-2gff-2mmg-m73p
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-8474-xrp6-wh69
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-2p2f-4rq4-gjwc
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-v6rj-xm57-3p59
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-rq8q-p985-fjq7
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-68p9-83h6-5wpj
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-2w9f-fxwj-w2qf
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-rwvh-fw6r-pwvp
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-4v2w-w6g6-f8f8
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-p2pm-g2h6-7j5j
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-3w93-6hmw-whh4
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-hfr4-8rjc-97m2
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-2586-8ghr-69fj
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-x6mj-8jx9-qhqv
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-r9jg-fmfx-2gv6
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-3f4q-8x5m-76v8
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-5957-c7qm-m469
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
- name: Rails GHSA-gmj8-hvj3-49mw
  says: 通过公开 GitHub API 核阅维护者原文；说明各自配置前提、补丁及缓解方法。
---

这是一次协调发布的 Rails 安全批次，不是 21 个独立事件。上方详细列出的两个上传处理问题影响低于 8.0.5.2 的 activestorage，以及 8.1 至 8.1.4.1 之前的版本；均取决于配置，不能认定现代 Rails 默认部署或每种 FFmpeg 构建都暴露。尚未确立受害者人数或真实环境攻击活动。主流框架及潜在服务器文件访问、代码执行风险支持 L3。

ImageMagick 问题在接受不可信附件且 coder 策略宽松时即可触发分析，Disk 存储另增加已说明的任意读取暴露；文件内凭据可能支持后续攻击。解码器问题中，攻击者控制的文件扩展名影响外部处理，所述加载本地库执行路径另需 AviSynth 构建及运行时支持；缺少 AviSynth 不能解决所有扩展名驱动的解码风险。

其他 19 条公告涵盖参数处理、IP 冒充、XSS、拒绝服务、GCS 直接上传、会话处理、缓存协商和 Mailgun 签名重放。完整批次及各自配置前提见发布页及来源。应升级整个批次，不能只考虑上方两个重点路径。除修改版本号，还须明确检查 GCS CORS、处理策略、依赖兼容性及凭据更换。新策略禁止危险 coder 及 delegate，不能为使失败流程通过而全面放开。
