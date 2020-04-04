## [2.2.3](https://github.com/tinesoft/ngx-cookieconsent/compare/v2.2.2...v2.2.3) (2019-06-14)


### Features

* **location:** allow activating location services in config and improve typings for `NgcLawOptions`, `NgcLocationOptions` ([306fe18](https://github.com/tinesoft/ngx-cookieconsent/commit/306fe18)), closes [#57](https://github.com/tinesoft/ngx-cookieconsent/issues/57)



## [2.2.2](https://github.com/tinesoft/ngx-cookieconsent/compare/v2.2.1...v2.2.2) (2019-05-28)


### Bug Fixes

* **NgcCookieOptions:** add missing export ([971b65e](https://github.com/tinesoft/ngx-cookieconsent/commit/971b65e)), closes [#53](https://github.com/tinesoft/ngx-cookieconsent/issues/53)
* **sponsorship:** fix github sponsorship of yours truly ([d3a7b3d](https://github.com/tinesoft/ngx-cookieconsent/commit/d3a7b3d))



## [2.2.1](https://github.com/tinesoft/ngx-cookieconsent/compare/v2.2.0...v2.2.1) (2019-05-14)


### Bug Fixes

* **typings:** correct ` ERROR TS2411` when compiling with `strict` mode on ([4fb02eb](https://github.com/tinesoft/ngx-cookieconsent/commit/4fb02eb)), closes [#49](https://github.com/tinesoft/ngx-cookieconsent/issues/49)



# [2.2.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v2.1.1...v2.2.0) (2019-03-28)


### Features

* **customLayout:** allow customizing the cookie bar layout and content ([4b32ce0](https://github.com/tinesoft/ngx-cookieconsent/commit/4b32ce0))



## [2.1.1](https://github.com/tinesoft/ngx-cookieconsent/compare/v2.1.0...v2.1.1) (2019-02-06)


### Bug Fixes

* **typings:** fix lint isssue due to bad typings in NgcCookieConsentStatus ([27ebb55](https://github.com/tinesoft/ngx-cookieconsent/commit/27ebb55)), closes [#11](https://github.com/tinesoft/ngx-cookieconsent/issues/11)



# [2.1.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v2.0.0...v2.1.0) (2018-10-25)


### Features

* **core:** update to `cookieconsent v3.1.0` and its features ([d674b93](https://github.com/tinesoft/ngx-cookieconsent/commit/d674b93))
* **options:** add `policy` and `target` options to `NgcContentOptions` ([a0849f2](https://github.com/tinesoft/ngx-cookieconsent/commit/a0849f2)), closes [#23](https://github.com/tinesoft/ngx-cookieconsent/issues/23)



# [2.0.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v1.1.1...v2.0.0) (2018-07-19)


### Features

* **ng6:** add support for angular 6 ([2ab9341](https://github.com/tinesoft/ngx-cookieconsent/commit/2ab9341)), closes [#17](https://github.com/tinesoft/ngx-cookieconsent/issues/17) [#18](https://github.com/tinesoft/ngx-cookieconsent/issues/18)
* **onNoCookieLaw:** add support for `onNoCookieLaw` callback ([2d960c8](https://github.com/tinesoft/ngx-cookieconsent/commit/2d960c8))


### BREAKING CHANGES

* **ng6:** - Minimum version of Angular is now v6+
- Minimum version of Node is v8+



## [1.1.1](https://github.com/tinesoft/ngx-cookieconsent/compare/v1.1.0...v1.1.1) (2018-07-18)


### Bug Fixes

* **initialize$:** callback was never called due to typo (`onInitialise`) ([6cd260f](https://github.com/tinesoft/ngx-cookieconsent/commit/6cd260f)), closes [#19](https://github.com/tinesoft/ngx-cookieconsent/issues/19)



# [1.1.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v1.0.1...v1.1.0) (2018-07-03)


### Bug Fixes

* **demo:** fix wrong assets url on deployed demo app ([fedcbd9](https://github.com/tinesoft/ngx-cookieconsent/commit/fedcbd9))


### Features

* **close:** add `close` method to allow fully closing the 'Coookie Policy' bar ([02ada28](https://github.com/tinesoft/ngx-cookieconsent/commit/02ada28)), closes [#15](https://github.com/tinesoft/ngx-cookieconsent/issues/15)
* **demo:** add support for translated cookie consent messages + update docs ([e1bf9bf](https://github.com/tinesoft/ngx-cookieconsent/commit/e1bf9bf)), closes [#14](https://github.com/tinesoft/ngx-cookieconsent/issues/14)



## [1.0.1](https://github.com/tinesoft/ngx-cookieconsent/compare/v1.0.0...v1.0.1) (2017-11-22)


### Features

* **core:** make `cookie.domain`option mandatory in configuration service and update doc ([9835145](https://github.com/tinesoft/ngx-cookieconsent/commit/9835145))
* **demo:** update demo app to Angular CLI `1.4.7` ([37371b6](https://github.com/tinesoft/ngx-cookieconsent/commit/37371b6))
* **packaging:** relax `peerDependencies` versions ([02496e8](https://github.com/tinesoft/ngx-cookieconsent/commit/02496e8)), closes [#8](https://github.com/tinesoft/ngx-cookieconsent/issues/8)



# [1.0.0](https://github.com/tinesoft/ngx-cookieconsent/compare/5f8a340...v1.0.0) (2017-09-07)


### Features

* **all:** initial commit ([5f8a340](https://github.com/tinesoft/ngx-cookieconsent/commit/5f8a340))



