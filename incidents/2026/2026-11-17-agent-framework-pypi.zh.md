---
title: 微软 agent-framework 的 PyPI 发布在 Python 启动时窃取云与 CI 凭据
summary: agent-framework 1.26.1 和 1.26.2 恶意 wheel 安装 Python 启动钩子，收集秘密并请求云与 CI 身份令牌。微软确认两版均已下架。应先移除钩子再运行 pip，恢复到干净的 1.26.0，并处置凭据暴露。
splash: 安装了 agent-framework 1.26.1 或 1.26.2 的 Python 环境、CI 运行器及镜像；无需导入框架即可触发启动钩子
wipe: 隔离受影响主机，先移除启动钩子再使用 pip，以 1.26.0 重建环境并轮换暴露凭据
inTheWildNote: 微软确认存在恶意发布；研究人员已分析公开分发的 wheel。
fixed:
  - status: 已知干净的回退版本，并非更高版本的补丁
timeline:
  - date: 2026年11月12日
    title: 干净的 1.26.0 版本发布
  - date: 11月17日 20:35:20 UTC
    title: 恶意 1.26.1 wheel 发布
    body: .pth 钩子在受影响环境中的 Python 启动时加载凭据收集程序。
  - date: 11月17日 21:08:39 UTC
    title: 第一版移除后出现恶意 1.26.2
    body: 新布局恢复正常的包初始化文件，将启动载荷移至 af_runtime_diag.py，并新增 GitHub Actions OIDC 收集能力。
  - date: 11月17日 21:35 UTC
    title: 研究人员确认两版均已移除
    body: Issue 状态更新称 PyPI 已恢复为 1.26.0；微软维护者也确认下架。缓存和镜像仍可能分发恶意 wheel。
checklist:
  - title: 在不启动受影响 Python 的情况下排查暴露
    hint: 用 shell 工具检查 11 月 17 日 20:35 UTC 之后的 requirements、锁文件、构建日志、镜像及 site-packages。查找 agent_framework-1.26.1.dist-info、agent_framework-1.26.2.dist-info 和下列载荷文件。不要先运行 python、pip list 或 pip uninstall，正常启动会执行钩子。
  - title: 隔离主机，先移除钩子再重新安装
    hint: 保留文件、进程列表和出站日志，然后隔离环境。在调用 pip 之前，用 shell 工具从受影响的 site-packages 移除 agent_framework_meta.pth、af_runtime_diag.pth 和 af_runtime_diag.py。_AF_TEL=1 可临时阻止这两个已知载荷运行。重新安装干净的 1.26.0 还必须替换 agent_framework_meta/__init__.py 并移除 agent_framework_meta/_telemetry.py；只删钩子会留下 1.26.1 的显式导入触发路径。优先重建干净镜像或环境，并处理已脱离父进程的收集程序。
  - title: 恢复已验证的干净版本并清除分发缓存
    hint: 在重建环境中固定 agent-framework==1.26.0，并在包代理中拦截 1.26.1 和 1.26.2。干净 wheel 的 SHA-256 为 14267ec8e6929c139015f8ec918adc638a71c7656901413426bb30ab199b6d71。使用 pip --require-hashes 时，应为完整依赖集合生成哈希。清除 pip/uv 缓存、CI 缓存及内部镜像中的恶意 wheel；不能只依赖不固定版本的升级或 PyPI 下架。
  - title: 处置凭据与工作负载身份暴露
    hint: 若安装后运行过 Python，应将该进程能够读取或请求的凭据视为暴露。从干净系统轮换环境变量与文件中的秘密、Azure CLI 缓存、npm/PyPI/Docker/git/Hugging Face 凭据、云与模型密钥及 Azure DevOps 服务连接。检查联合身份凭据和托管身份角色分配，临时移除不安全权限并审阅 Entra 登录与活动日志。运行器凭据文件可读时，重新注册自托管运行器。已签发访问令牌可能在过期前继续有效。若导出了 ACTIONS_RUNTIME_TOKEN，应检查 Actions 缓存和产物写入；普通 run 步骤默认不会暴露该令牌。
  - title: 使用完整端点与已公布样本排查
    hint: 搜索发往 webhook[.]site/d381fd80-ec62-42ad-8f5c-d1b15103c9bb?t=telemetry 的 POST、User-Agent af-runtime-diagnostics/1 和 runtime-diagnostics/1，以及下列七个恶意 SHA-256。另查 _AF_TEL=1、脱离父进程的 Python 子进程和对 /proc/*/environ 的读取。关联异常 OIDC 请求及对合法 Azure 元数据端点 169.254.169.254/metadata/identity/oauth2/token 的集中请求；令牌请求可能使用 Python-urllib/3.x。端点创建来源 IP 18.142.122[.]94 只能说明托管位置，不能识别攻击者或受害者。仅凭域名、IP 或标记匹配无法确认失陷或成功外传；webhook.site 也有合法用途。
sources:
  - name: Upwind 原始报告与微软维护者确认
    says: 记录发布时间、两个载荷、先移除钩子的清理顺序、缓存与产物风险，以及微软维护者对两版下架的确认。具体发布凭据仍未确定。
  - name: Endor Labs 样本分析
    says: 分析两个 wheel、启动执行、身份令牌请求、七个恶意样本哈希及安全遏制步骤。最初的最新版本状态早于后续下架确认。
  - name: StepSecurity 静态分析
    says: 独立分析 wheel 并报告新增发布账户。第一版下架后仍能发布，不代表该权限目前仍有效。
  - name: PyPI agent-framework 发布元数据
    says: 11 月 18 日检查时，最新版本为 1.26.0，wheel 哈希与已知干净样本一致，发布映射中已无 1.26.1 和 1.26.2。
---

遭篡改的是已发布的 Python 元包，不能据此认定所有 Agent Framework 组件或微软源码仓库均遭修改。研究人员在两个官方 PyPI wheel 中发现恶意程序，微软维护者确认将其移除。已证实的恶意分发支持评为 L4。已阅读的来源没有提供经过核实的受影响安装量或被盗凭据数量。

安装后的 .pth 文件会在所在环境正常启动 Python 时执行导入语句。无需导入 Agent Framework，启动 pip 也可能触发收集程序。彼此独立的虚拟环境不会仅因使用相同 Python 可执行文件而自动感染。载荷读取可访问的环境变量、凭据文件和其他进程的环境，请求 Azure 托管身份及 Azure DevOps 令牌；1.26.2 还尝试请求 GitHub Actions OIDC 令牌。这些请求需要对应身份、权限或令牌请求变量，安装包本身不会赋予任意云访问权限。脱离父进程的子进程可能在任务结束后继续运行。

疑似发布权限失陷仍在调查中。StepSecurity 报告了新建维护者账户，Upwind 尚未确定具体凭据路径。不能据此推断微软更广泛失陷，或确定攻击者身份。Endor 最初的报告仍称 1.26.2 为最新版，但后续微软确认和当前 PyPI 元数据证明两个恶意版本均已移除。这不会清理已安装环境，也不能证明发布权限已被吊销。

下表完整列出已公布的恶意 SHA-256 指标。干净的 1.26.0 初始化文件与恶意 1.26.2 恢复后的初始化文件哈希相同，不能仅凭该文件正常就排除环境受影响。

| 样本 | SHA-256 |
| --- | --- |
| agent_framework-1.26.1-py3-none-any.whl | d27fa34414e6201d5e03e559ef634f020057554d7b3f4898dd5d7cd3e989e110 |
| agent_framework_meta.pth | 21f28e8517a10ffe431f8d68f5875c85eca4001ae6d118322b0a41873998eb5e |
| 1.26.1 中的 agent_framework_meta/__init__.py | c275ccbe520ef3c0f02dc6a35389e427f9f1b4e0b12e140cd7bf7179ce143f02 |
| agent_framework_meta/_telemetry.py | 39fa329f2a93f734b0bb8f5adb203ea3331d1ae479832a5015a54cb17aabd663 |
| agent_framework-1.26.2-py3-none-any.whl | 3d20a8bc91351a9a16b6db243b848ceca0206b7a8623b02d2af553a9c9f7e0a9 |
| af_runtime_diag.pth | 325e7e9f0ec94e41ad1a1b7a3f18a6b8b5bffece2e2b97b8d3369eb967452f93 |
| af_runtime_diag.py | 54d885b7d7161c9ed96489c66364c4bfbf635929166843bba10d97d46b5a2e1f |
