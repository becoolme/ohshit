/**
 * UI strings for every page, in English and Simplified Chinese.
 * English is the default and lives at /, Chinese lives under /zh/.
 * Incident content is translated separately, in incidents/<year>/<file>.zh.md.
 */
import type { Level } from './levels';

export type Lang = 'en' | 'zh';
export const LANGS: Lang[] = ['en', 'zh'];
export const HTML_LANG: Record<Lang, string> = { en: 'en', zh: 'zh-CN' };
export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', zh: 'zh_CN' };

/** "/zh/incidents/x/" -> "zh" */
export function langFromPath(pathname: string): Lang {
  return pathname === '/zh' || pathname.startsWith('/zh/') ? 'zh' : 'en';
}

/** "/zh/incidents/x/" -> "/incidents/x/" */
export function stripLang(pathname: string): string {
  return pathname.replace(/^\/zh(?=\/|$)/, '') || '/';
}

/** Prefix a site path ("/incidents/x/", "/#feed") for a language. */
export function localePath(lang: Lang, path: string): string {
  return lang === 'zh' ? `/zh${path}` : path;
}

const fmt = {
  en: {
    day: new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
    month: new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' }),
  },
  zh: {
    day: new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
    month: new Intl.DateTimeFormat('zh-CN', { month: 'long', year: 'numeric', timeZone: 'UTC' }),
  },
};

export function formatDateIn(lang: Lang, d: Date, approximate = false): string {
  return (approximate ? fmt[lang].month : fmt[lang].day).format(d);
}

interface LevelText {
  name: string;
  desc: string;
  when: string;
  advice: string;
}

const en = {
  site: {
    title: 'OhShit! Security incidents, graded by stench',
    description:
      'Every security incident on the internet, graded by stench, each with a clean-up guide. Open data, MCP, JSON API and RSS.',
    rssTitle: 'OhShit! Security incidents',
    rssLink: 'OhShit! incidents',
    skip: 'Skip to content',
  },
  levels: {
    1: { name: 'Silent Fart', desc: 'Smells, but clears fast. A theoretical bug with no exploitation in the wild.', when: 'Just be aware', advice: 'Barely a whiff. Carry on.' },
    2: { name: 'Bit of a Leak', desc: 'Narrow impact or hard-to-meet conditions.', when: 'Fix it next sprint', advice: 'Something’s dripping. Put it on the sprint.' },
    3: { name: 'Sharted', desc: 'A mainstream component is hit, or a proof-of-concept is public.', when: 'Handle it this week', advice: 'Find the plunger this week.' },
    4: { name: 'Septic Tank Blew', desc: 'Mass data leak or active exploitation in the wild.', when: 'Check and patch today', advice: 'Check your deps today.' },
    5: { name: 'Shitstorm', desc: 'Internet-scale. A worm is spreading, a core runtime or trust anchor is broken.', when: 'Drop everything now', advice: 'Everyone, drop everything.' },
  } as Record<Level, LevelText>,
  puns: ['Shit happens', 'Just not to you', 'Rotate your tokens', 'Pin your lockfile', 'Stop echoing secrets in CI', 'Enable 2FA, coward'],
  tape: ['CRIME SCENE', 'DO NOT FLUSH'],
  header: {
    home: 'OhShit! home',
    nav: 'Main',
    feed: 'Feed',
    scale: 'The Scale',
    dev: 'MCP / API / RSS',
    report: 'Report a Turd',
    subscribe: 'Subscribe to the Smell',
    crumbs: 'Breadcrumb',
    back: '← Back to the feed',
    here: 'Crime scene',
    switchTo: '中文',
    switchLabel: '切换到简体中文',
  },
  footer: {
    big: 'Shit happens.',
    sub: 'We’re just the first ones to yell about it. Compiled from public advisories and research.',
    error: 'Spotted an error?',
    tell: 'Tell us',
    updated: (d: string) => `Last updated ${d}`,
    nav: 'Footer',
    mcp: 'MCP Server',
    contribute: 'Contribute',
    legal: 'MIT licensed, code and data. Not affiliated with any vendor mentioned.',
  },
  copy: { copy: 'Copy', copied: 'Copied', failed: 'Select & copy' },
  home: {
    fresh: 'Fresh stink:',
    grab: 'Grab the toilet paper →',
    pill: 'Every security incident on the internet, collected in the open',
    big: 'Someone left their database naked on the internet again. We sniff out every turd before it splashes on you.',
    small:
      'Supply-chain poisonings, data leaks, zero-days and cloud misconfigs, graded by stench, each with a clean-up guide. Open data on GitHub, piped to your agents and feed readers through MCP, JSON and RSS.',
    seeToday: 'See who shat today',
    signLabel: 'Days since last security incident',
    signTop: 'This internet has gone',
    signBottom: 'days without an incident',
    signNote: 'Counted from the newest entry in our feed. It rarely gets past 01.',
    index: 'Today’s global Shit Index',
    indexWhy: 'Worst incident in the last 7 days.',
    feedTitle: 'Fresh out of the oven',
    feedLede: 'Newest first. Each one tells you what happened, who got splashed, and exactly how to wipe.',
    filterLabel: 'Filter by Shit Level',
    filters: ['All', 'L3+ Sharted', 'L4+ Septic', 'Shitstorms only'],
    empty: 'Nothing that stinky right now. Enjoy the fresh air while it lasts.',
    count: (n: number, since: string) => `${n} incidents on file since ${since}.`,
    raw: 'Browse the raw data on GitHub →',
    scaleKicker: 'The OhShit Scale™',
    scaleTitle: 'Graded by nose, not by CVSS',
    scaleLede: 'We weigh blast radius, exploit difficulty, in-the-wild activity, and the odds your boss calls you at 3 a.m.',
    subTitle: 'One fresh turd,<br />straight to your reader',
    subText: 'Subscribe to the RSS feed, or watch the GitHub repo for new incident pull requests. No diarrhea, no filler, no tracking.',
    subRss: 'Make me smell it (RSS)',
    subGithub: 'Watch on GitHub',
    newTitle: 'Smell something new?',
    newText:
      'Every incident is one Markdown file. Open an issue with an advisory link, or send a pull request with the file. Once it is merged it hits the feed, the API, the RSS feed and the MCP server.',
    newReport: 'Report a turd →',
    newHow: 'How to contribute',
  },
  card: { splash: 'Splash zone', wipe: 'How to wipe', more: 'Visit the crime scene →' },
  dev: {
    kick: 'For developers & agents',
    title: 'Let the smell<br />come to you',
    intro: 'Stop finding out you got hit by doomscrolling. Three ways to plug in — pick your plunger. All of it is',
    openSource: 'open source',
    tablist: 'Integration',
    mcpBlurb: 'Let Claude and other agents just ask: “are we hit?”',
    tabNames: ['MCP Server', 'JSON API', 'RSS'],
    mcpPoints: ['Filter by minimum level, ecosystem, tag and age', 'Full write-up, fixed versions and the wipe checklist', 'The current Shit Index and days since the last turd'],
    apiBlurb: 'Static JSON, no key, no rate limit. Cache it, mirror it, chart it.',
    apiPoints: ['Every incident, newest first', 'One incident with checklist and sources', 'Today’s global Shit Index, for your wallboard'],
    rssBlurb: 'A new turd drops? Your feed reader, Slack or Discord already knows how to listen.',
    rssCode: (feed: string) => `# Slack: pipe the feed into #security
/feed subscribe ${feed}

# Discord, Teams, email: any RSS bot or
# Zapier / IFTTT "new RSS item" trigger works.

# Or just add it to your reader:
${feed}`,
    rssPoints: [
      { k: '/rss.xml', v: 'Every incident, newest first, with level in the title' },
      { k: 'No signup', v: 'No account, no key, no email list' },
      { k: 'Works anywhere', v: 'Feedly, Slack, Discord bots, a Raspberry Pi in the toilet' },
    ],
  },
  incident: {
    disclosed: 'Disclosed',
    updated: (d: string) => `Updated ${d}`,
    publicDate: 'Public disclosure date',
    severity: 'Severity',
    cveCount: (n: number) => `${n} CVE${n > 1 ? 's' : ''} tracked here`,
    noCve: 'No CVE: a breach, not a bug',
    splash: 'Splash zone',
    wild: 'In the wild',
    wildValues: { yes: 'Yes', no: 'Not seen', disputed: 'Disputed', unknown: 'Unknown', 'n/a': 'Not applicable' },
    oneLiner: 'The one-sentence version',
    happened: 'What happened',
    bowl: 'What’s in the bowl',
    plain: 'In plain poop:',
    fixed: 'Fixed versions',
    product: 'Product',
    safeFrom: 'Safe from',
    note: 'Note',
    noFix: 'No fix',
    mitigation: 'Can’t patch tonight? Plug the hole',
    timeline: 'Crime-scene timeline',
    sources: 'Who said what',
    sourcesIntro:
      'We list each claim and who made it. Primary sources (the vendor, the researcher, the registry) are marked. Where reports disagree, we grade by the worst credible case.',
    primary: 'Primary',
    related: 'Other turds from around the same time',
    untranslated: '',
  },
  checklist: {
    eyebrow: 'Wipe guide',
    title: 'The wipe checklist',
    used: (n: number) => `of ${n} sheets used`,
    progress: 'Checklist progress',
    clean: 'Squeaky clean. Wash your hands, then go watch for the next one.',
    share: 'Pass this turd to your team',
    alert: 'Alert me next time',
    json: 'Get JSON',
    fix: 'Fix this page',
  },
  checker: {
    title: 'Are you standing in it?',
    how: (cmd: string) => `Run <code>${cmd}</code> on each box, then type the version or pick the closest match.`,
    label: (rt: string) => `Your ${rt} version`,
    placeholder: (v: string) => `e.g. ${v}`,
    submit: 'Sniff it',
    examples: (rt: string) => `Example ${rt} versions`,
    caption: (d: string) => `Fixed versions (${d})`,
    branch: 'Branch',
    safeFrom: 'Safe from',
    status: 'Status',
    verdict: {
      fullTitle: 'Enter a full version.',
      unknownTitle: 'Not covered by this advisory.',
      unknownPre: 'Pre-release builds aren’t covered. Check the vendor advisory, or move to a stable release.',
      unknownBody: 'Check the vendor advisory for this version.',
      eolTitle: 'No official patch for this branch.',
      eolBody: 'Upgrade to a patched branch or check your support vendor’s backport.',
      okTitle: 'Clean seat. You’re patched.',
      okBody: '{rt} {v} meets this advisory’s fixed-version threshold. Still check every server, container image and CI runner, not just this one.',
      badTitle: 'You’re standing in it.',
      badBody: 'Upgrade to {fixed} or later.',
    },
  },
  notFound: {
    title: 'Flushed',
    heading: 'Already flushed.',
    lede: 'This page went down the pipes. It might have been renamed, or it never existed.',
    back: 'Back to the feed',
  },
};

export type Dict = typeof en;

const zh: Dict = {
  site: {
    title: 'OhShit! 按臭度分级的安全事件',
    description: '全网安全事件，按臭度分级，每一条都附清理指南。开放数据，支持 MCP、JSON API 和 RSS。',
    rssTitle: 'OhShit! 安全事件',
    rssLink: 'OhShit! 安全事件（中文）',
    skip: '跳到正文',
  },
  levels: {
    1: { name: '闷屁', desc: '有味儿，但散得快。理论上的漏洞，还没有在野利用。', when: '知道就行', advice: '几乎闻不到，该干嘛干嘛。' },
    2: { name: '有点漏', desc: '影响面窄，或者触发条件苛刻。', when: '排进下个迭代', advice: '有点渗漏，排进下个迭代修。' },
    3: { name: '拉裤子了', desc: '主流组件中招，或者已有公开的 PoC。', when: '本周内处理', advice: '这周把马桶搋子找出来。' },
    4: { name: '化粪池炸了', desc: '大规模数据泄露，或者已被在野利用。', when: '今天就排查、打补丁', advice: '今天就查一遍你的依赖。' },
    5: { name: '屎无前例', desc: '全网级别。蠕虫正在扩散，或者核心运行时、信任根被攻破。', when: '立刻放下手头一切', advice: '所有人，放下手头的活。' },
  },
  puns: ['屎事难料', '但愿别轮到你', '记得轮换令牌', '锁好依赖版本', '别在 CI 里打印密钥', '快开两步验证，别怂'],
  tape: ['案发现场', '禁止冲水'],
  header: {
    home: 'OhShit! 首页',
    nav: '主导航',
    feed: '最新事件',
    scale: '臭度分级',
    dev: 'MCP / API / RSS',
    report: '我要报料',
    subscribe: '闻讯订阅',
    crumbs: '面包屑导航',
    back: '← 返回事件列表',
    here: '案发现场',
    switchTo: 'EN',
    switchLabel: 'Switch to English',
  },
  footer: {
    big: '屎事难料。',
    sub: '我们只是第一个喊出来的。内容整理自公开的安全公告和研究报告。',
    error: '发现错误？',
    tell: '告诉我们',
    updated: (d: string) => `最后更新：${d}`,
    nav: '页脚导航',
    mcp: 'MCP 服务',
    contribute: '参与贡献',
    legal: '代码和数据均以 MIT 许可证开源。与文中提到的任何厂商均无关联。',
  },
  copy: { copy: '复制', copied: '已复制', failed: '请手动复制' },
  home: {
    fresh: '新鲜出炉：',
    grab: '快拿纸 →',
    pill: '全网安全事件，公开收录',
    big: '又有人把数据库裸奔在公网上了。每一坨屎，我们都赶在它溅到你身上之前闻出来。',
    small:
      '供应链投毒、数据泄露、零日漏洞、云配置失误，按臭度分级，每一条都附清理指南。数据在 GitHub 上公开，通过 MCP、JSON 和 RSS 直达你的 AI 智能体和阅读器。',
    seeToday: '看看今天谁拉了',
    signLabel: '距上次安全事件的天数',
    signTop: '互联网已经连续',
    signBottom: '天没出事',
    signNote: '从最新一条事件算起。这个数字很少超过 01。',
    index: '今日全网臭度指数',
    indexWhy: '取最近 7 天里最严重的事件。',
    feedTitle: '新鲜出炉',
    feedLede: '按时间倒序。每一条都告诉你发生了什么、谁被溅到、具体该怎么擦。',
    filterLabel: '按臭度筛选',
    filters: ['全部', 'L3+ 拉裤子', 'L4+ 化粪池', '只看屎无前例'],
    empty: '眼下没有这么臭的。趁空气还新鲜，多吸两口。',
    count: (n: number, since: string) => `自 ${since}起，共收录 ${n} 起事件。`,
    raw: '去 GitHub 看原始数据 →',
    scaleKicker: 'OhShit 臭度分级™',
    scaleTitle: '靠鼻子打分，不靠 CVSS',
    scaleLede: '我们综合考虑影响范围、利用难度、在野利用情况，以及老板凌晨三点给你打电话的概率。',
    subTitle: '新鲜的屎，<br />直送你的阅读器',
    subText: '订阅 RSS，或者在 GitHub 上关注仓库里新事件的 PR。不刷屏、不注水、不追踪。',
    subRss: '让我闻闻（RSS）',
    subGithub: '在 GitHub 上关注',
    newTitle: '闻到新味儿了？',
    newText:
      '每起事件就是一个 Markdown 文件。附上公告链接开个 issue，或者直接提交这个文件的 PR。合并后会同步到首页、API、RSS 和 MCP 服务。',
    newReport: '我要报料 →',
    newHow: '贡献指南',
  },
  card: { splash: '波及范围', wipe: '怎么擦', more: '去案发现场 →' },
  dev: {
    kick: '给开发者和 AI 智能体',
    title: '让臭味<br />自己找上门',
    intro: '别再靠刷社交媒体才发现自己中招。三种接入方式，挑一把顺手的马桶搋子。全部',
    openSource: '开源',
    tablist: '接入方式',
    mcpBlurb: '让 Claude 等 AI 智能体直接问：“我们中招了吗？”',
    tabNames: ['MCP 服务', 'JSON API', 'RSS'],
    mcpPoints: ['按最低等级、生态、标签和时间筛选', '完整报告、修复版本和清理清单', '当前臭度指数，以及距上一坨的天数'],
    apiBlurb: '静态 JSON，不要密钥，不限速。随便缓存、镜像、画图。',
    apiPoints: ['所有事件，按时间倒序（数据为英文）', '单个事件，含清单和来源', '今日全网臭度指数，适合挂在大屏上'],
    rssBlurb: '又掉下一坨？你的阅读器、Slack 或 Discord 第一时间知道。',
    rssCode: (feed: string) => `# Slack：把订阅推到 #security 频道
/feed subscribe ${feed}

# Discord、Teams、邮件：任意 RSS 机器人，
# 或 Zapier / IFTTT 的“新 RSS 条目”触发器都行。

# 或者直接加到阅读器里：
${feed}`,
    rssPoints: [
      { k: '/zh/rss.xml', v: '按时间倒序列出每起事件，标题带等级' },
      { k: '无需注册', v: '不用账号、不用密钥、不进邮件列表' },
      { k: '哪里都能用', v: 'Feedly、Slack、Discord 机器人，甚至厕所里的树莓派' },
    ],
  },
  incident: {
    disclosed: '披露时间',
    updated: (d: string) => `更新于 ${d}`,
    publicDate: '公开披露日期',
    severity: '严重程度',
    cveCount: (n: number) => `本页收录 ${n} 个 CVE`,
    noCve: '无 CVE：这是入侵事件，不是漏洞',
    splash: '波及范围',
    wild: '在野利用',
    wildValues: { yes: '已发现', no: '未发现', disputed: '说法不一', unknown: '未知', 'n/a': '不适用' },
    oneLiner: '一句话说清楚',
    happened: '发生了什么',
    bowl: '马桶里有什么',
    plain: '说人话：',
    fixed: '修复版本',
    product: '产品',
    safeFrom: '安全版本',
    note: '备注',
    noFix: '无修复',
    mitigation: '今晚补不了？先把洞堵上',
    timeline: '案发时间线',
    sources: '各方说法',
    sourcesIntro: '我们列出每条说法和它的出处，并标出一手来源（厂商、研究人员、软件仓库）。各方说法不一致时，按最坏的可信情况定级。',
    primary: '一手来源',
    related: '同一时期的其他几坨',
    untranslated: '这起事件还没有中文翻译，下面是英文原文。',
  },
  checklist: {
    eyebrow: '清理指南',
    title: '擦屁股清单',
    used: (n: number) => `/ ${n} 张纸已用`,
    progress: '清单进度',
    clean: '擦干净了。洗洗手，等下一坨。',
    share: '把这坨转给你的团队',
    alert: '下次提醒我',
    json: '获取 JSON',
    fix: '纠正本页',
  },
  checker: {
    title: '你踩到了吗？',
    how: (cmd: string) => `在每台机器上运行 <code>${cmd}</code>，然后输入版本号，或者点一个最接近的。`,
    label: (rt: string) => `你的 ${rt} 版本`,
    placeholder: (v: string) => `例如 ${v}`,
    submit: '闻一闻',
    examples: (rt: string) => `${rt} 版本示例`,
    caption: (d: string) => `修复版本（${d}）`,
    branch: '分支',
    safeFrom: '安全版本',
    status: '状态',
    verdict: {
      fullTitle: '请输入完整的版本号。',
      unknownTitle: '这个版本不在本公告范围内。',
      unknownPre: '预发布版本不在范围内。请查看厂商公告，或者换成正式版。',
      unknownBody: '请到厂商公告里确认这个版本。',
      eolTitle: '这个分支没有官方补丁。',
      eolBody: '升级到有补丁的分支，或者问问你的支持厂商有没有移植修复。',
      okTitle: '坐垫是干净的，补丁已打上。',
      okBody: '{rt} {v} 已达到本公告的修复版本要求。不过别只查这一台，所有服务器、容器镜像和 CI 机器都要查。',
      badTitle: '你踩到了。',
      badBody: '请升级到 {fixed} 或更高版本。',
    },
  },
  notFound: {
    title: '已冲走',
    heading: '已经冲走了。',
    lede: '这个页面被冲进下水道了。可能改过名，也可能从来就不存在。',
    back: '返回事件列表',
  },
};

export const UI: Record<Lang, Dict> = { en, zh };
