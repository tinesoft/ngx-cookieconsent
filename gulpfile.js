
const _ = require('lodash');
const del = require('del');
const gulp = require('gulp');
const gulpUtil = require('gulp-util');


/** TSLint checker */
const gulpTslint = require('gulp-tslint');

/** External command runner */
const process = require('process');
const gulpShell = require('gulp-shell');
const execSync = require('child_process').execSync;

/** File Access */
const fs = require('fs');
const path = require('path');
const gulpFile = require('gulp-file');

/** To properly handle pipes on error */
const pump = require('pump');

/** To upload code coverage to coveralls */
const gulpCoveralls = require('gulp-coveralls');

/** To order tasks */
const runSequence = require('run-sequence');

/** To bundle the library with Rollup */
const gulpRollup = require('gulp-better-rollup');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupUglify = require('rollup-plugin-uglify');

//Bumping, Releasing tools
const gulpGit = require('gulp-git');
const ghPages = require('angular-cli-ghpages');
const gulpBump = require('gulp-bump');
const gulpConventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');


const yargs = require('yargs');
const argv = yargs
  .option('version', {
    alias: 'v',
    describe: 'Enter Version to bump to',
    choices: ['patch', 'minor', 'major']
  })
  .option('ghToken', {
    alias: 'gh',
    describe: 'Enter Github Token for releasing'
  })
  .argv;

const config = {
  allTs: 'src/**/!(*.spec).ts',
  demoDir: 'demo/',
  outputDir: 'dist/',
  coverageDir: 'coverage/'
};

const LIBRARY_NAME = 'ngx-cookieconsent';

//Helper functions

const startKarmaServer = (isTddMode, hasCoverage, cb) => {
  const karmaServer = require('karma').Server;
  const travis = process.env.TRAVIS;

  let config = { configFile: `${__dirname}/karma.conf.js`, singleRun: !isTddMode, autoWatch: isTddMode };

  if (travis) {
    config['browsers'] = ['Chrome_travis_ci']; // 'Chrome_travis_ci' is defined in "customLaunchers" section of config/karma.conf.js
  }

  config['hasCoverage'] = hasCoverage;

  new karmaServer(config, cb).start();
}

const getPackageJsonVersion = () => {
  // We parse the json file instead of using require because require caches
  // multiple calls so the version number won't be updated
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
}

const isOK = condition => {
  return condition ? gulpUtil.colors.green('[OK]') : gulpUtil.colors.red('[KO]');
};

const readyToRelease = () => {

  let isTravisPassing = /build #\d+ passed/.test(execSync('npm run check-travis').toString().trim()) ;
  let onMasterBranch = execSync('git symbolic-ref --short -q HEAD').toString().trim() === 'master';
  let canBump = !!argv.version;
  let canGhRelease = argv.ghToken || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN;
  let canNpmPublish = !!execSync('npm whoami').toString().trim() && execSync('npm config get registry').toString().trim() === 'https://registry.npmjs.org/';

  gulpUtil.log(`[travis-ci]      Travis build on 'master' branch is passing............................................${isOK(isTravisPassing)}`);
  gulpUtil.log(`[git-branch]     User is currently on 'master' branch..................................................${isOK(onMasterBranch)}`);
  gulpUtil.log(`[npm-publish]    User is currently logged in to NPM Registry...........................................${isOK(canNpmPublish)}`);
  gulpUtil.log(`[bump-version]   Option '--version' provided, with value : 'major', 'minor' or 'patch'.................${isOK(canBump)}`);
  gulpUtil.log(`[github-release] Option '--ghToken' provided or 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' variable set......${isOK(canGhRelease)}`);

  return isTravisPassing && onMasterBranch && canBump && canGhRelease && canNpmPublish;
};

// Clean Tasks
gulp.task('clean:dist', () => {
  return del(config.outputDir);
});

gulp.task('clean:coverage', () => {
  return del(config.coverageDir);
});

gulp.task('clean:doc', ()=>{
  return del(`${config.outputDir}/doc`);
});

gulp.task('clean', ['clean:dist', 'clean:coverage']);

// TsLint the source files
gulp.task('lint', (cb) => {
  pump([
    gulp.src(config.allTs),
    gulpTslint({ formatter: "verbose" }),
    gulpTslint.report()
  ], cb);
});

// Compile TS files with Angular Compiler (ngc)
gulp.task('ngc', gulpShell.task(`ngc -p ./tsconfig-aot.json`));


// Test tasks
gulp.task('test', (cb) => {
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
  startKarmaServer(false, true, cb);
});

gulp.task('test:ci', ['clean'], (cb) => {
  runSequence('compile', 'test');
});

gulp.task('test:watch', (cb) => {
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
  startKarmaServer(true, true, cb);
});

gulp.task('test:watch-no-cc', (cb) => {//no coverage (useful for debugging failing tests in browser)
  const ENV = process.env.NODE_ENV = process.env.ENV = 'test';
  startKarmaServer(true, false, cb);
});

// Prepare 'dist' folder for publication to NPM
gulp.task('package', (cb) => {
  let pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  let targetPkgJson = {};
  let fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

  targetPkgJson['name'] = LIBRARY_NAME;

  //only copy needed properties from project's package json
  fieldsToCopy.forEach((field) => { targetPkgJson[field] = pkgJson[field]; });

  targetPkgJson['main'] = `bundles/${LIBRARY_NAME}.umd.js`;
  targetPkgJson['module'] = 'index.js';
  targetPkgJson['typings'] = 'index.d.ts';

  // defines project's dependencies as 'peerDependencies' for final users
  targetPkgJson.peerDependencies = {};
  Object.keys(pkgJson.dependencies).forEach((dependency) => {
    targetPkgJson.peerDependencies[dependency] = `^${pkgJson.dependencies[dependency]}`;
  });

  // copy the needed additional files in the 'dist' folder
  pump(
    [
      gulp.src(['README.md', 'LICENSE', 'CHANGELOG.md']),
      gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)),
      gulp.dest(config.outputDir)
    ], cb);
});

// Bundles the library as UMD bundle using RollupJS
gulp.task('bundle', (cb) => {
  const globals = {
    // Angular dependencies 
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',

  // Rxjs dependencies
  'rxjs/Subject': 'Rx',
  'rxjs/add/observable/fromEvent': 'Rx.Observable',
  'rxjs/add/observable/forkJoin': 'Rx.Observable',
  'rxjs/add/observable/of': 'Rx.Observable',
  'rxjs/add/observable/merge': 'Rx.Observable',
  'rxjs/add/observable/throw': 'Rx.Observable',
  'rxjs/add/operator/auditTime': 'Rx.Observable.prototype',
  'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
  'rxjs/add/operator/map': 'Rx.Observable.prototype',
  'rxjs/add/operator/filter': 'Rx.Observable.prototype',
  'rxjs/add/operator/do': 'Rx.Observable.prototype',
  'rxjs/add/operator/share': 'Rx.Observable.prototype',
  'rxjs/add/operator/finally': 'Rx.Observable.prototype',
  'rxjs/add/operator/catch': 'Rx.Observable.prototype',
  'rxjs/add/observable/empty': 'Rx.Observable.prototype',
  'rxjs/add/operator/first': 'Rx.Observable.prototype',
  'rxjs/add/operator/startWith': 'Rx.Observable.prototype',
  'rxjs/add/operator/switchMap': 'Rx.Observable.prototype',
  'rxjs/Observable': 'Rx'
  };

const rollupOptions = {
  context: 'this',
  external: Object.keys(globals),
  plugins: [
    rollupNodeResolve({ module: true }),
    rollupUglify()
  ]
};

const rollupGenerateOptions = {
  // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
  moduleId: '',
  moduleName: `${_.camelCase(LIBRARY_NAME)}`, //require for 'umd' bundling, must be a valid js identifier, see rollup/rollup/issues/584
  format: 'umd',
  globals,
  dest: `${LIBRARY_NAME}.umd.js`
};

pump(
  [
    gulp.src(`${config.outputDir}/index.js`),
    gulpRollup(rollupOptions, rollupGenerateOptions),
    gulp.dest(`${config.outputDir}/bundles`)
  ], cb);
});

//Demo Tasks
gulp.task('test:demo', gulpShell.task('ng test', { cwd: `${config.demoDir}` }));

gulp.task('serve:demo', gulpShell.task('ng serve --proxy-config proxy.conf.json', { cwd: `${config.demoDir}` }));

gulp.task('build:demo', gulpShell.task(`ng build --prod --aot --base-href https://tinesoft.github.io/${LIBRARY_NAME}/`, { cwd: `${config.demoDir}` }));

gulp.task('build:doc', gulpShell.task(`compodoc -p tsconfig.json --hideGenerator --disableCoverage -d  ${config.demoDir}/dist/doc/`));

gulp.task('serve:doc',  ['clean:doc'], gulpShell.task(`compodoc -p tsconfig.json -s -d  ${config.outputDir}/doc/`));

gulp.task('push:demo', gulpShell.task(`ngh --dir ${config.demoDir}/dist --message="chore(demo): :rocket: deploy new version"`));

gulp.task('deploy:demo', (cb) => {
  runSequence('build:demo', 'build:doc', 'push:demo', cb);
});

// Link 'dist' folder (create a local 'ng-scrollreveal' package that symlinks to it)
// This way, we can have the demo project declare a dependency on 'ng-scrollreveal' (as it should)
// and, thanks to 'npm link ng-scrollreveal' on demo project, be sure to always use the latest built
// version of the library ( which is in 'dist/' folder)
gulp.task('link', gulpShell.task('npm link', { cwd: `${config.outputDir}` }));

gulp.task('unlink', gulpShell.task('npm unlink', { cwd: `${config.outputDir}` }));


// Upload code coverage report to coveralls.io (will be triggered by Travis CI on successful build)
gulp.task('coveralls', (cb) => {
  pump(
    [
      gulp.src(`${config.coverageDir}/coverage.lcov`),
      gulpCoveralls()
    ], cb);
});

// Lint and Compile
gulp.task('compile', (cb) => {
  runSequence('lint', 'ngc', cb);
});

// Watch changes on (*.ts) and Compile
gulp.task('watch', () => {
  gulp.watch([config.allTs], ['compile']);
});

// Build the 'dist' folder (without publishing it to NPM)
gulp.task('build', ['clean'], (cb) => {
  runSequence('compile', 'test', 'package', 'bundle', cb);
});

// Release Tasks
gulp.task('changelog', (cb) => {
  pump(
    [
      gulp.src('CHANGELOG.md', { buffer: false }),
      gulpConventionalChangelog({ preset: 'angular', releaseCount: 0 }),
      gulp.dest('./')
    ], cb);
});

gulp.task('github-release', (cb) => {
  if (!argv.ghToken && !process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN) {
    gulpUtil.log(gulpUtil.colors.red(`You must specify a Github Token via '--ghToken' or set environment variable 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' to allow releasing on Github`));
    throw new Error(`Missing '--ghToken' argument and environment variable 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' not set`);
  }

  conventionalGithubReleaser(
    {
      type: 'oauth',
      token: argv.ghToken || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
    },
    { preset: 'angular' },
    cb);
});

gulp.task('bump-version', (cb) => {
  if (!argv.version) {
    gulpUtil.log(gulpUtil.colors.red(`You must specify which version to bump to (Possible values: 'major', 'minor', and 'patch')`));
    throw new Error(`Missing '--version' argument`);
  }

  pump(
    [
      gulp.src('./package.json'),
      gulpBump({ type: argv.version }),
      gulp.dest('./'),
    ], cb);
});

gulp.task('commit-changes', (cb) => {
  let version = getPackageJsonVersion();
  pump(
    [
      gulp.src('.'),
      gulpGit.add(),
      gulpGit.commit(`chore(release): bump version number to ${version}`)
    ], cb);
});

gulp.task('push-changes', (cb) => {
  gulpGit.push('origin', 'master', cb);
});

gulp.task('create-new-tag', (cb) => {
  let version = `v${getPackageJsonVersion()}`;
  gulpGit.tag(version, `chore(release): :sparkles: :tada: create tag for version v${version}`, (error) => {
    if (error) {
      return cb(error);
    }
    gulpGit.push('origin', 'master', { args: '--tags' }, cb);
  });

});

gulp.task('pre-release', cb => {
  readyToRelease();
  cb();
});

gulp.task('release', (cb) => {
  gulpUtil.log('# Performing Pre-Release Checks...');
  if (!readyToRelease()) {
    gulpUtil.log(gulpUtil.colors.red('# Pre-Release Checks have failed. Please fix them and try again. Aborting...'));
    cb();
  }
  else {
    gulpUtil.log(gulpUtil.colors.green('# Pre-Release Checks have succeeded. Continuing...'));
    runSequence(
      'bump-version',
      'changelog',
      'commit-changes',
      'push-changes',
      'create-new-tag',
      'github-release',
      'npm-publish',
      'deploy:demo',
      (error) => {
        if (error) {
          gulpUtil.log(error.message);
        } else {
          gulpUtil.log(gulpUtil.colors.green('RELEASE FINISHED SUCCESSFULLY'));
        }
        cb(error);
      });

  }
});


// Build and then Publish 'dist' folder to NPM
gulp.task('npm-publish', ['build'], gulpShell.task(`npm publish ${config.outputDir}`));

gulp.task('default', ['build']);
