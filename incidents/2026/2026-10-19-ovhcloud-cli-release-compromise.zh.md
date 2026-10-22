---
title: OVHcloud CLI 在 GitHub 上的发布二进制文件被替换为窃密版本
headline: OVHcloud CLI：标签没变，管道换了
summary: 被劫持的 GitHub 账号替换了 OVHcloud CLI 0.11.0–0.15.0 的二进制文件。调查者将替换窗口定位为 10月19日 12:47–14:21 UTC。源码构建和 Docker 镜像未被替换；运行投毒文件会暴露主机上可读取的密钥。
splash: 在 10月19日替换窗口下载了受影响 OVHcloud CLI 发布附件的用户
wipe: 隔离受影响主机，在干净机器上轮换可读取的凭据，重新安装并验证 0.16.0
inTheWildNote: 恶意发布附件通过官方仓库分发
fixed:
  - status: 干净的不可变发布，带有来源证明
timeline:
  - date: 10月19日 12:47–14:21 UTC
    title: GitHub 已有发布附件遭替换，随后被移除
  - date: 10月19日 17:16 UTC
    title: 发布干净的 0.16.0，附件设置为不可变
checklist:
  - title: 检查 10月19日的安装及 CI 下载记录
  - title: 隔离执行过被替换二进制文件的机器
  - title: 在可信机器上轮换所有可读取的凭据
  - title: 安装 0.16.0，验证来源证明和锁定的哈希
sources:
  - name: "OVHcloud 仓库 issue #300"
    says: 报告者记录了被替换的发布附件及构建元数据
  - name: OVHcloud 0.16.0 发布
    says: 10月19日发布；附件不可变，带有来源证明
  - says: 重建 UTC 暴露窗口；源码构建和 Docker 不受影响；GlassWorm 归因仍属研判
---

仅锁定版本号没能阻止暴露：攻击者替换了已有发布 URL 背后的文件。重装可以移除二进制文件，却无法吊销它已经读走的密钥。下载数量和完整的初始入侵路径仍不清楚。云管理工具遭恶意投毒，因此定为 L4。
