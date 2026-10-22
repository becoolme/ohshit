export const SITE = {
  name: 'OhShit',
  title: 'OhShit! Security incidents, graded by stench',
  description:
    'Every security incident on the internet, graded by stench, each with a clean-up guide. Open data, MCP, JSON API and RSS.',
  repo: 'https://github.com/becoolme/ohshit',
  /** Prefilled "new incident" issue. */
  get reportUrl() {
    return `${this.repo}/issues/new?template=new-incident.yml`;
  },
  get correctionUrl() {
    return `${this.repo}/issues/new?template=correction.yml`;
  },
  editUrl(filePath: string) {
    return `${this.repo}/edit/main/${filePath.replace(/^\.\//, '')}`;
  },
};
