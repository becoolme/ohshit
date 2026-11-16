---
title: GitHub 将 Univer 表格数据透视图 npm 包 1.5.0 标记为恶意版本
summary: GitHub 将 @univerjs-pro/sheets-pivot-chart 1.5.0 标为恶意版本。npm 已不再列出该版本供安装。请排查相关构建，使用经过验证的软件包重新构建，并轮换受影响主机可访问的凭据。
splash: 曾安装或运行 @univerjs-pro/sheets-pivot-chart 1.5.0 的应用、CI 运行器和开发主机。
wipe: 移除标记版本，在干净的环境中重新构建，并轮换受影响主机可访问的凭据。
inTheWildNote: GitHub 已标记该版本，公告尚未确认下游环境遭入侵。
cves:
- name: 恶意数据透视图组件版本
  description: GitHub 将 1.5.0 标为恶意，并建议将曾安装或运行它的主机按已失陷处置。
timeline:
- date: 11月14日 09:49 UTC
  title: npm 记录 1.5.0 发布
- date: 11月16日 00:14 UTC
  title: GitHub 发布恶意软件公告
  body: npm 保留发布时间。可安装版本列表已不再列出该版本，当前 latest 标签指向 1.4.0。
checklist:
- title: 找出受影响的构建
  hint: 在 npm、pnpm 和 Yarn 锁文件、仓库日志、软件物料清单和产物元数据中查找 @univerjs-pro/sheets-pivot-chart 1.5.0。检查 CI、自定义 Worker 产物和间接安装。锁文件命中应继续调查，单凭命中无法证明代码已经执行。
- title: 隔离受影响主机并轮换凭据
  hint: 隔离曾安装或运行该版本的开发主机及运行器。保留锁文件、日志和缓存产物哈希。从干净的主机吊销并替换适用的软件仓库、代码仓库、云服务和签名凭据。在凭据签发方和部署日志中排查异常使用。
- title: 替换受影响的产物和部署
  hint: 锁定经过验证且互相兼容的软件包，排除 1.5.0。npm 当前将该包的 1.4.0 标为 latest。隔离可疑缓存和产物，在干净的环境中重建，并替换包含 1.5.0 的浏览器或 Worker 产物。
sources:
- name: GitHub 恶意软件公告
  says: 列出受影响的 npm 版本，并建议移除该版本和轮换凭据。
- name: npm 软件包元数据
  says: 保留 1.5.0 的发布时间，目前 latest 指向 1.4.0。
- name: npm 分版本下载数据
  says: 于 11 月 16 日查询时，滚动统计接口显示 1.5.0 下载了 458 次。
- name: Univer 数据透视图文档
  says: 说明该包用于表格数据透视图集成。
---

Univer 文档将该 npm 包列为表格集成组件。GitHub 公告仅列出 **`@univerjs-pro/sheets-pivot-chart@1.5.0`**。Univer 的其他软件包各有发布记录，请逐个核对构建实际解析到的包名和版本。

npm 保留了 11 月 14 日的发布时间。11 月 16 日查询 1.5.0 版本元数据时，接口返回 404，包的 latest 标签指向此前发布的 1.4.0。GitHub 尚未列出修复版本。npm 分版本接口在滚动统计期内记录了 1.5.0 的 **458 次下载**。其中可能有重复下载，无法据此确定安装量或失陷系统数量。

GitHub 建议将曾安装或运行该版本的主机按已失陷处置。公告未披露载荷细节、入侵指标或发布者账号调查结论。移除该版本可避免后续安装，已有主机和产物仍需分别排查并清理。
