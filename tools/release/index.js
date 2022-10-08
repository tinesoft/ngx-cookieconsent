
const buildReversePath = path =>
  path
    .split('/')
    .map(() => '..')
    .join('/');

const formatFile = file => `nx format:write --files ${file}`;
const copyFile = (file, dest) => `cp ${file} ${dest}`;


function createReleaseConfig({
  projectName,
  projectRoot,
  buildOutput,
}) {
  projectRoot = projectRoot || `libs/${projectName}`;
  buildOutput = buildOutput || `dist/libs/${projectName}`;

  const relativeWorkspaceRoot = buildReversePath(projectRoot);
  const relativeBuildOutput = `${relativeWorkspaceRoot}/${buildOutput}`;

  const releaseCommit = `chore(release): 🚀 release v\${nextRelease.version}\n\n\${nextRelease.notes}\n\n***\n[skip ci]`;
  return {
    preset: 'angular',
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator', 
      '@semantic-release/changelog',
      '@semantic-release/github',
      ['@semantic-release/npm', { pkgRoot: relativeBuildOutput }],
      [
        '@semantic-release/exec',
        {
          prepareCmd: [
            formatFile(`${projectRoot}/CHANGELOG.md`),
            copyFile(`${projectRoot}/CHANGELOG.md`, buildOutput),
            copyFile(`CHANGELOG.md`, relativeWorkspaceRoot),
            copyFile(`README.md`, buildOutput),
            copyFile(`LICENSE`, buildOutput),
          ].join(' && '),
          execCwd: relativeWorkspaceRoot,
        },
      ],
      [
        '@semantic-release/git',
        {
          assets: ["package.json", "CHANGELOG.md"],
          message: releaseCommit,
        },
      ],
    ],
    tagFormat: `v\${version}`
  };
}

module.exports = {
  createReleaseConfig,
};
