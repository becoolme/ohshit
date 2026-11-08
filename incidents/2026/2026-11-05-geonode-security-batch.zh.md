---
title: "GeoNode 代理绕过可访问内网服务，矢量上传可执行服务器命令"
summary: "GeoNode 披露了 7 项漏洞。代理允许列表可被绕过并返回内网 HTTP 响应，矢量上传还存在命令注入。代理漏洞公告已公开概念验证。"
splash: "暴露受影响代理的 GeoNode 部署，以及允许用户上传矢量数据、文档或其他资产的部署。"
wipe: "升级至 GeoNode 5.0.3、5.1.0 或更新版本。升级前限制对代理、上传功能和资产链接的访问。"
inTheWildNote: "代理绕过和资产文件读取均已有公开概念验证。公告未确认在野利用。"
cves:
  - name: "代理允许列表绕过"
    description: "包含允许主机名的特制 URL 可通过 /proxy/ 访问其他目标，并返回上游响应。"
  - name: "矢量上传命令注入"
    description: "有矢量上传权限的低权限用户可在图层名中插入 shell 语法，以服务端导入进程的权限执行命令。"
  - name: "跨用户读取资产文件"
    description: "已登录的资产所有者可利用资产下载链接中的路径穿越读取其他用户的本地资产文件。"
  - name: "文档缩略图 SSRF"
    description: "有权添加远程文档的已登录用户可诱使服务器向回环地址或其他内网服务发起请求。"
  - name: "文档元数据存储型 XSS"
    description: "用户查看受影响内容时，文档摘要中的脚本可能在浏览器中执行。"
  - name: "GeoStory DOM 型 XSS"
    description: "低权限攻击者可在受影响的 MapStore2 客户端中植入浏览器脚本，利用需要受害者与特制内容交互。"
  - name: "不受限制的文件上传"
    description: "特制上传请求可绕过校验，使 GeoNode 存储并提供恶意文件。"
fixed:
  - status: "已修复本批漏洞"
  - status: "已修复本批漏洞"
timeline:
  - date: 2026年8月18日
    title: "GeoNode 发布 5.0.3 和 5.1.0"
  - date: 2026年11月5日
    title: "维护者发布 7 份安全公告"
  - date: 2026年11月6日
    title: "矢量命令注入、文件上传和元数据 XSS 的 CVE 记录发布"
checklist:
  - title: "升级所有已部署组件"
    hint: "备份数据库和资产存储，升级 Web 应用和导入工作进程，确认每个副本均运行修复版本。"
  - title: "升级期间缩小暴露面"
    hint: "限制 /proxy/、资产链接下载及不可信用户的上传，尽可能禁用远程文档导入。使用出站网络规则阻止对内网服务和云元数据端点的不必要访问。"
  - title: "排查利用迹象"
    hint: "检查代理请求中的异常编码 URL 和内网目的地址、发往 /api/v2/assets/<pk>/link/<path> 的请求中的编码路径穿越，以及上传工作进程日志中的异常子进程。单个匹配项不足以证明入侵。"
  - title: "检查已存储内容"
    hint: "恢复正常访问前检查可疑的文档摘要、GeoStory 和上传文件。保留副本供调查，再隔离或移除恶意内容。"
  - title: "处置已确认的入侵"
    hint: "隔离受影响主机，保全日志及上传文件，再用可信镜像重建。吊销受影响进程可访问的凭据，包括涉及的数据库或云凭据。"
sources:
  - name: "GeoNode 安全公告索引"
    says: "汇总 7 份披露及各自的利用条件和受影响版本。"
  - name: "GeoNode 代理漏洞公告"
    says: "记录允许列表绕过、公开复现和 5.0.3 修复版本。"
  - name: "GeoNode 矢量导入补丁"
    says: "停止向 shell 传递可受用户输入影响的命令字符串。"
  - name: "GeoNode 5.0.3 发布说明"
    says: "发布包含修复的 5.0.x 版本。"
  - name: "GeoNode 5.1.0 发布说明"
    says: "发布包含修复的 5.1 版本。"
---

GeoNode 用于发布地图、数据集和文档。代理转发请求前会检查允许列表。公开示例把一个获准的主机名嵌入特制 URL，使代理连接到其他目标并返回其 HTTP 响应。攻击者需要能够访问代理，并知道该部署允许的一个主机名。另一项缩略图抓取漏洞可让有权上传远程文档的已登录用户向内网目标发起请求。

有权上传矢量数据的用户可以通过图层名改变导入进程执行的命令。[CNA 记录](https://cveawg.mitre.org/api/cve/CVE-2026-33050)列出了 5.1.0，[5.0.3 标签中的导入代码](https://github.com/GeoNode/geonode/blob/5.0.3/geonode/upload/handlers/common/vector.py)也已改用参数列表启动转换进程，并禁用 shell 执行。项目仓库的原始公告仍未列出该漏洞的修复版本。

这批公告还包括跨用户读取本地资产文件、两项浏览器脚本漏洞和上传校验绕过。文档存储型 XSS 的仓库公告列出 5.0.1，[CNA 记录](https://cveawg.mitre.org/api/cve/CVE-2026-55649)和元数据清理的回移补丁则支持以 5.0.3 为升级目标。GeoStory 公告列出的 4.4.5 和 5.0.2 只修复该客户端漏洞。运行旧版本或独立打包客户端的站点应核实已部署客户端是否包含 GeoStory 修复，并计划升级 GeoNode 以修补服务器漏洞。

上述 CVE 对应的厂商公告为 [GHSA-9fpx-fr6j-2vh6](https://github.com/GeoNode/geonode/security/advisories/GHSA-9fpx-fr6j-2vh6)、[GHSA-q88x-rvm8-wxp4](https://github.com/GeoNode/geonode/security/advisories/GHSA-q88x-rvm8-wxp4)、[GHSA-r4hm-p9f9-fj9v](https://github.com/GeoNode/geonode/security/advisories/GHSA-r4hm-p9f9-fj9v)和 [GHSA-fqpv-mq26-pr4j](https://github.com/GeoNode/geonode/security/advisories/GHSA-fqpv-mq26-pr4j)。
