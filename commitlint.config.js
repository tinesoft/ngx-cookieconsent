module.exports = {
    extends: ['@commitlint/config-angular'],
    rules: {
      'type-enum': [
        2,
        'always',
        [
          // Minor
          'feat',
          // Patch
          'perf',
          'fix',
          // None
          'chore',
          'ci',
          'revert',
          'test',
          'docs',
          'build',
          'refactor'
        ],
      ],
      'scope-empty': [0],
    },
    ignores: [message => message.toLowerCase().startsWith('wip')],
  };
  