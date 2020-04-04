const _ = require('lodash');
const del = require('del');
const gulp = require('gulp');
const acolors = require('ansi-colors');
const fancyLog = require('fancy-log');
const helpers = require('./config/helpers');

/** TSLint checker */
const tslint = require('tslint');
const gulpTslint = require('gulp-tslint');

/** External command runner */
const process = require('process');
const execSync = require('child_process').execSync;

/** File Access */
const fs = require('fs');
const path = require('path');
const gulpFile = require('gulp-file');

/** To properly handle pipes on error */
const pump = require('pump');

/** Testing/Code Coverage */
const gulpCoveralls = require('zyan-gulp-coveralls');

/** To order tasks */
const runSequence = require('run-sequence');

/** To compile & bundle the library with Angular & Rollup */
const ngc = (args) => new Promise((resolve, reject)=>{// Promisify version of the ngc compiler
  let exitCode = require('@angular/compiler-cli/src/main').main(args);
  resolve(exitCode);
});
const rollup = require('rollup');
const rollupUglify = require('rollup-plugin-uglify').uglify;
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const rollupCommonjs = require('rollup-plugin-commonjs');

/** To load templates and styles in Angular components */
const gulpInlineNgTemplate = require('gulp-inline-ng2-template');

//Bumping, Releasing tools
const gulpGit = require('gulp-git');
const gulpBump = require('gulp-bump');
const gulpConventionalChangelog = require('gulp-conventional-changelog');
const conventionalGithubReleaser = require('conventional-github-releaser');

/** To load gulp tasks from multiple files */
const gulpHub = require('gulp-hub');

/** Documentation generation tools **/
const gulpCompodoc = require('@compodoc/gulp-compodoc');

const yargs = require('yargs');
const argv = yargs
  .option('version', {
    alias: 'v',
    describe: 'Enter Version to bump to',
    choices: ['patch', 'minor', 'major'],
    type: "string"
  })
  .option('ghToken', {
    alias: 'gh',
    describe: 'Enter Github Token for releasing',
    type: "string"
  })
  .version(false) // disable default --version from yargs( since v9.0.0)
  .argv;

const config = {
  libraryName: 'ngx-cookieconsent',
  unscopedLibraryName: 'ngx-cookieconsent',
  allSrc: 'src/**/*',
  allTs: 'src/**/!(*.spec).ts',
  demoDir: 'demo/',
  buildDir: 'tmp/',
  outputDir: 'dist/',
  outputDemoDir: 'demo/dist/browser/',
  coverageDir: 'coverage/'
};

const rootFolder = path.join(__dirname);
const buildFolder = path.join(rootFolder, `${config.buildDir}`);
const distFolder = path.join(rootFolder, `${config.outputDir}`);
const es5OutputFolder = path.join(buildFolder, 'lib-es5');
const es2015OutputFolder = path.join(buildFolder, 'lib-es2015');

//Helper functions
const startKarmaServer = (isTddMode, hasCoverage, cb) => {
  const karmaServer = require('karma').Server;
  const isCI = process.env.TRAVIS;

  let config = { configFile: `${__dirname}/karma.conf.js`, singleRun: !isTddMode, autoWatch: isTddMode };

  if (isCI) {
    config['browsers'] = ['ChromeHeadlessCI'];
  }

  config['hasCoverage'] = hasCoverage;

  new karmaServer(config, cb).start();
};

const getPackageJsonVersion = () => {
  // We parse the json file instead of using require because require caches
  // multiple calls so the version number won't be updated
  return JSON.parse(fs.readFileSync('./package.json', 'utf8')).version;
};

const isOK = condition => {
  if(condition === undefined){
    return acolors.yellow('[SKIPPED]');
  }
  return condition ? acolors.green('[OK]') : acolors.red('[KO]');
};

const readyToRelease = () => {
  let isTravisPassing = /build #\d+ passed/.test(execSync('npm run check-travis').toString().trim());
  let onMasterBranch = execSync('git symbolic-ref --short -q HEAD').toString().trim() === 'master';
  let canBump = !!argv.version;
  let canGhRelease = argv.ghToken || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN;
  let canNpmPublish = !!execSync('npm whoami').toString().trim() && execSync('npm config get registry').toString().trim() === 'https://registry.npmjs.org/';

  fancyLog(`[travis-ci]      Travis build on 'master' branch is passing............................................${isOK(isTravisPassing)}`);
  fancyLog(`[git-branch]     User is currently on 'master' branch..................................................${isOK(onMasterBranch)}`);
  fancyLog(`[npm-publish]    User is currently logged in to NPM Registry...........................................${isOK(canNpmPublish)}`);
  fancyLog(`[bump-version]   Option '--version' provided, with value : 'major', 'minor' or 'patch'.................${isOK(canBump)}`);
  fancyLog(`[github-release] Option '--ghToken' provided or 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' variable set......${isOK(canGhRelease)}`);

  return isTravisPassing && onMasterBranch && canBump && canGhRelease && canNpmPublish;
};

const execCmd = (name, args, opts, ...subFolders) => {
  const cmd = helpers.root(subFolders, helpers.binPath(`${name}`));
  return helpers.execp(`${cmd} ${args}`, opts)
    .catch(e => {
      fancyLog(acolors.red(`${name} command failed. See below for errors.\n`));
      fancyLog(acolors.red(e));
      process.exit(1);
    });
};

const execExternalCmd = (name, args, opts) => {
  return helpers.execp(`${name} ${args}`, opts)
    .catch(e => {
      fancyLog(acolors.red(`${name} command failed. See below for errors.\n`));
      fancyLog(acolors.red(e));
      process.exit(1);
    });
};


/////////////////////////////////////////////////////////////////////////////
// Cleaning Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('clean:dist', () => {
  return del(config.outputDir);
});

gulp.task('clean:build', () => {
  return del(config.buildDir);
});

gulp.task('clean:coverage', () => {
  return del(config.coverageDir);
});

gulp.task('clean:doc', () => {
  return del(`${config.outputDir}/doc`);
});

gulp.task('clean', ['clean:dist', 'clean:coverage', 'clean:build']);

/////////////////////////////////////////////////////////////////////////////
// Compilation Tasks
/////////////////////////////////////////////////////////////////////////////

gulp.task('lint', (cb) => {
  pump([
    gulp.src(config.allTs),
    gulpTslint(
      {
        program: tslint.Linter.createProgram('./tsconfig.json'),
        formatter: 'verbose',
        configuration: 'tslint.json'
      }),
    gulpTslint.report()
  ], cb);
});

// Inline Styles and Templates into components
gulp.task('inline-templates', (cb) => {
  const options = {
    base: `${config.buildDir}`,
    useRelativePaths: true
  };
  pump(
    [
      gulp.src(config.allTs),
      gulpInlineNgTemplate(options),
      gulp.dest(`${config.buildDir}`)
    ],
    cb);
});

// Prepare files for compilation
gulp.task('pre-compile', (cb) => {
   pump([
    gulp.src([config.allSrc]),
    gulp.dest(config.buildDir)
    ], cb);
});

gulp.task('ng-compile',() => {
  return Promise.resolve()
    // Compile to ES5.
    .then(() => ngc(['--project',`${buildFolder}/tsconfig.lib.es5.json`])
      .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
      .then(() => fancyLog('ES5 compilation succeeded.'))
    )
    // Compile to ES2015.
    .then(() => ngc(['--project',`${buildFolder}/tsconfig.lib.json`])
      .then(exitCode => exitCode === 0 ? Promise.resolve() : Promise.reject())
      .then(() => fancyLog('ES2015 compilation succeeded.'))
    )
    .catch(e => {
      fancyLog(acolors.red('ng-compilation failed. See below for errors.\n'));
      fancyLog(acolors.red(e));
      process.exit(1);
    });
});

// Lint, Prepare Build,  and Ng-Compile
gulp.task('compile', (cb) => {
  runSequence('lint', 'pre-compile', 'inline-templates', 'ng-compile', cb);
});

// Build the 'dist' folder (without publishing it to NPM)
gulp.task('build', ['clean'], (cb) => {
  runSequence('compile', 'test', 'npm-package', 'rollup-bundle', cb);
});

// Same as 'build' but without cleaning temp folders (to avoid breaking demo app, if currently being served)
gulp.task('build-watch', (cb) => {
  runSequence('compile', 'test', 'npm-package', 'rollup-bundle', cb);
});

// Same as 'build-watch' but without running tests
gulp.task('build-watch-no-tests', (cb) => {
  runSequence('compile', 'npm-package', 'rollup-bundle', cb);
});

// Watch changes on (*.ts, *.html) and Re-build library
gulp.task('build:watch', ['build-watch'], () => {
  gulp.watch([config.allTs], ['build-watch']);
});

// Watch changes on (*.ts, *.html) and Re-build library (without running tests)
gulp.task('build:watch-fast', ['build-watch-no-tests'], () => {
  gulp.watch([config.allTs], ['build-watch-no-tests']);
});


/////////////////////////////////////////////////////////////////////////////
// Packaging Tasks
/////////////////////////////////////////////////////////////////////////////

// Prepare 'dist' folder for publication to NPM
gulp.task('npm-package', (cb) => {
  let pkgJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  let targetPkgJson = {};
  let fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage'];

  targetPkgJson['name'] = config.libraryName;

  //only copy needed properties from project's package json
  fieldsToCopy.forEach((field) => { targetPkgJson[field] = pkgJson[field]; });

  targetPkgJson['main'] = `./bundles/${config.unscopedLibraryName}.umd.js`;
  targetPkgJson['module'] = `./esm5/${config.unscopedLibraryName}.es5.js`;
  targetPkgJson['es2015'] = `./esm2015/${config.unscopedLibraryName}.js`;
  targetPkgJson['typings'] = `./${config.unscopedLibraryName}.d.ts`;

  // defines project's dependencies as 'peerDependencies' for final users
  targetPkgJson.peerDependencies = {};
  Object.keys(pkgJson.dependencies).forEach((dependency) => {
    // versions are defined as '^' by default, but you can customize it by editing "dependenciesRange" in '.yo-rc.json' file
    targetPkgJson.peerDependencies[dependency] = `>=${pkgJson.dependencies[dependency].replace(/[\^~><=]/,'')}`;
  });

  // copy the needed additional files in the 'dist' folder
  pump(
    [
      gulp.src(['README.md', 'LICENSE', 'CHANGELOG.md', 
      `${config.buildDir}/lib-es5/**/*.d.ts`,
      `${config.buildDir}/lib-es5/**/*.metadata.json`]),
      gulpFile('package.json', JSON.stringify(targetPkgJson, null, 2)),
      gulp.dest(config.outputDir)
    ], cb);
});

// Bundles the library as UMD/FESM bundles using RollupJS
gulp.task('rollup-bundle', (cb) => {
  return Promise.resolve()
  // Bundle lib.
  .then(() => {
    // Base configuration.
    const es5Input = path.join(es5OutputFolder, `${config.unscopedLibraryName}.js`);
    const es2015Input = path.join(es2015OutputFolder, `${config.unscopedLibraryName}.js`);
    const globals = {
      // The key here is library name, and the value is the name of the global variable name
      // the window object.
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#globals for more.

      // Angular dependencies 
      '@angular/core': 'ng.core',
      '@angular/common': 'ng.common',

      // Rxjs dependencies
      'rxjs': 'rxjs',
      "rxjs/operators": "rxjs.operators",

      // ATTENTION:
      // Add any other dependency or peer dependency of your library here
      // This is required for UMD bundle users.
      // See https://github.com/tinesoft/generator-ngx-library/TROUBLESHOUTING.md if trouble
      'cookieconsent': _.camelCase('cookieconsent'.replace('/','.'))

    };
    const rollupBaseConfig = {
      output:{
        name: _.camelCase(config.libraryName),
        sourcemap: true,
        globals: globals
      },
      // List of dependencies
      // See https://github.com/rollup/rollup/wiki/JavaScript-API#external for more.
      external: Object.keys(globals),
      plugins: [
        rollupCommonjs({
          include: ['node_modules/rxjs/**']
        }),
        rollupSourcemaps(),
        rollupNodeResolve({ 
          jsnext: true,
          module: true,
          jail: distFolder, // to use final 'package.json' from 'dist/'
         })
      ]
    };

    // UMD bundle.
    const umdConfig = _.merge({}, rollupBaseConfig, {
      input: es5Input,
      output: {
        format: 'umd',
        file: path.join(distFolder, `bundles`, `${config.unscopedLibraryName}.umd.js`)
      }
    });

    // Minified UMD bundle.
    const minifiedUmdConfig = _.merge({}, rollupBaseConfig, {
      input: es5Input,
      output: {
        format: 'umd',
        file: path.join(distFolder, `bundles`, `${config.unscopedLibraryName}.umd.min.js`),
      },
      plugins: rollupBaseConfig.plugins.concat([rollupUglify({})])
    });

    // ESM+ES5 flat module bundle.
    const fesm5config = _.merge({}, rollupBaseConfig, {
      input: es5Input,
      output: {
        format: 'es',
        file: path.join(distFolder, 'esm5', `${config.unscopedLibraryName}.es5.js`),
      }
    });

    // ESM+ES2015 flat module bundle.
    const fesm2015config = _.merge({}, rollupBaseConfig, {
      input: es2015Input,
      output: {
        format: 'es',
        file: path.join(distFolder, 'esm2015', `${config.unscopedLibraryName}.js`),
      }
    });

    const allBundles = [
      umdConfig,
      minifiedUmdConfig,
      fesm5config,
      fesm2015config
    ].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg.output)));

    return Promise.all(allBundles)
      .then(() => fancyLog('All bundles generated successfully.'))
  })
  .catch(e => {
    fancyLog(acolors.red('rollup-bundling failed. See below for errors.\n'));
    fancyLog(acolors.red(e));
    process.exit(1);
  });
});


/////////////////////////////////////////////////////////////////////////////
// Documentation Tasks
/////////////////////////////////////////////////////////////////////////////
gulp.task('build:doc', (cb) => {
  pump([
    gulp.src('src/**/*.ts'),
    gulpCompodoc({
      tsconfig: 'src/tsconfig.lib.json',
      hideGenerator:true,
      disableCoverage: true,
      output: `${config.outputDemoDir}/doc/`
    })
  ], cb);
});

gulp.task('serve:doc', ['clean:doc'], (cb) => {
  pump([
    gulp.src('src/**/*.ts'),
    gulpCompodoc({
      tsconfig: 'src/tsconfig.lib.json',
      serve: true,
      output: `${config.outputDir}/doc/`
    })
  ], cb);
});



/////////////////////////////////////////////////////////////////////////////
// Demo Tasks
/////////////////////////////////////////////////////////////////////////////
const execDemoCmd = (args,opts) => {
  if(fs.existsSync(`${config.demoDir}/node_modules`)){
    return execCmd('ng', args, opts, `/${config.demoDir}`);
  }
  else{
    fancyLog(acolors.yellow(`No 'node_modules' found in '${config.demoDir}'. Installing dependencies for you...`));
    return helpers.installDependencies({ cwd: `${config.demoDir}` })
      .then(exitCode => exitCode === 0 ? execCmd('ng', args, opts, `/${config.demoDir}`) : Promise.reject())
      .catch(e => {
        fancyLog(acolors.red(`ng command failed. See below for errors.\n`));
        fancyLog(acolors.red(e));
        process.exit(1);
      });
  }
};

gulp.task('test:demo', () => {
  return execDemoCmd('test --preserve-symlinks', { cwd: `${config.demoDir}`});
});

gulp.task('serve:demo', () => {
  return execDemoCmd('serve --aot --proxy-config proxy.conf.json', { cwd: `${config.demoDir}` });
});

gulp.task('serve:demo-hmr', () => {
  return execDemoCmd('serve --configuration hmr --aot --proxy-config proxy.conf.json', { cwd: `${config.demoDir}` });
});

gulp.task('build:demo', () => {
  return execDemoCmd(`build --preserve-symlinks --prod --base-href /ngx-cookieconsent/ --deploy-url /ngx-cookieconsent/`, { cwd: `${config.demoDir}`});
});

gulp.task('serve:demo-ssr',['build:demo-ssr'], () => {
  return execExternalCmd('node', 'dist/server.js', { cwd: `${config.demoDir}` });
});

gulp.task('build:demo-ssr', () => {
  return execDemoCmd(`build --preserve-symlinks --prod`, { cwd: `${config.demoDir}`})
    .then(() => execDemoCmd(`run ngx-cookieconsent-demo:server`, { cwd: `${config.demoDir}` }))
    .then(() => execCmd('webpack', '--config webpack.server.config.js --progress --colors', { cwd: `${config.demoDir}` }, `/${config.demoDir}`))
    .catch(e => {
      fancyLog(acolors.red(`build:demo-ssr command failed. See below for errors.\n`));
      fancyLog(acolors.red(e));
      process.exit(1);
    });
});

gulp.task('push:demo', () => {
  return execCmd('ngh',`--dir ${config.outputDemoDir} --message="chore(demo): :rocket: deploy new version"`);
});

gulp.task('deploy:demo', (cb) => {
  runSequence('build:demo', 'build:doc', 'push:demo', cb);
});


/////////////////////////////////////////////////////////////////////////////
// Test Tasks
/////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////
// Release Tasks
/////////////////////////////////////////////////////////////////////////////
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
    fancyLog(acolors.red(`You must specify a Github Token via '--ghToken' or set environment variable 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' to allow releasing on Github`));
    throw new Error(`Missing '--ghToken' argument and environment variable 'CONVENTIONAL_GITHUB_RELEASER_TOKEN' not set`);
  }

  conventionalGithubReleaser(
    {
      type: 'oauth',
      url: 'https://api.github.com/',
      token: argv.ghToken || process.env.CONVENTIONAL_GITHUB_RELEASER_TOKEN
    },
    { preset: 'angular' },
    cb);
});

gulp.task('bump-version', (cb) => {
  if (!argv.version) {
    fancyLog(acolors.red(`You must specify which version to bump to (Possible values: 'major', 'minor', and 'patch')`));
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

// Build and then Publish 'dist' folder to NPM
gulp.task('npm-publish', ['build'], () => {
  return execExternalCmd('npm',`publish ${config.outputDir} --access public`)
});

// Perfom pre-release checks (no actual release)
gulp.task('pre-release', cb => {
  readyToRelease();
  cb();
});

gulp.task('release', (cb) => {
  fancyLog('# Performing Pre-Release Checks...');
  if (!readyToRelease()) {
    fancyLog(acolors.red('# Pre-Release Checks have failed. Please fix them and try again. Aborting...'));
    cb();
  }
  else {
    fancyLog(acolors.green('# Pre-Release Checks have succeeded. Continuing...'));
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
          fancyLog(acolors.red(error.message));
        } else {
          fancyLog(acolors.green('RELEASE FINISHED SUCCESSFULLY'));
        }
        cb(error);
      });
  }
});


/////////////////////////////////////////////////////////////////////////////
// Utility Tasks
/////////////////////////////////////////////////////////////////////////////

// Link 'dist' folder (create a local 'ng-scrollreveal' package that symlinks to it)
// This way, we can have the demo project declare a dependency on 'ng-scrollreveal' (as it should)
// and, thanks to 'npm link ng-scrollreveal' on demo project, be sure to always use the latest built
// version of the library ( which is in 'dist/' folder)
gulp.task('link', () => {
  return execExternalCmd('npm', 'link', { cwd: `${config.outputDir}` });
});

gulp.task('unlink', () => {
  return execExternalCmd('npm', 'unlink', { cwd: `${config.outputDir}` });
});

// Upload code coverage report to coveralls.io (will be triggered by Travis CI on successful build)
gulp.task('coveralls', (cb) => {
  pump(
    [
      gulp.src(`${config.coverageDir}/coverage.lcov`),
      gulpCoveralls()
    ], cb);
});

gulp.task('default', ['build']);

// Load additional tasks
gulpHub(['./config/gulp-tasks/*.js']);
