const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/ngx-cookieconsent-demo',
    '<rootDir>/libs/ngx-cookieconsent',
  ],
};
