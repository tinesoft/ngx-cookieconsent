const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/ngx-cookieconsent-demo',
    '<rootDir>/libs/ngx-cookieconsent',
  ],
};
