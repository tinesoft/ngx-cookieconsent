# [8.0.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v7.0.0...v8.0.0) (2024-12-22)

### Features

- update to Angular v19+ ([7b294af](https://github.com/tinesoft/ngx-cookieconsent/commit/7b294af107e313ba30a806c63cdb501e4885a6dd)), closes [#153](https://github.com/tinesoft/ngx-cookieconsent/issues/153)

### BREAKING CHANGES

- Angular v19+ is now the minimal version to use the library.

# [7.0.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v6.0.0...v7.0.0) (2024-12-22)

### Features

- update to Angular v18+ ([8924f12](https://github.com/tinesoft/ngx-cookieconsent/commit/8924f12bfd7ade3002f183462f2ce5f71d0e3073))

### BREAKING CHANGES

- Angular v18+ is now the minimal version to use the library.

# [6.0.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v5.0.0...v6.0.0) (2024-01-10)

### Features

- update to Angular `v16+` ([6031528](https://github.com/tinesoft/ngx-cookieconsent/commit/60315282f353e1293ec434e9b1d64e55ab1af914)), closes [#134](https://github.com/tinesoft/ngx-cookieconsent/issues/134)

### BREAKING CHANGES

- Angular ` v16+` is now the minimal version to use the library.

# [5.0.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v4.0.2...v5.0.0) (2024-01-10)

### Features

- **core:** add `mobileForceFloat` option in the config ([38c0346](https://github.com/tinesoft/ngx-cookieconsent/commit/38c03466781913dea59ec03e775e83e47347c664)), closes [#139](https://github.com/tinesoft/ngx-cookieconsent/issues/139)
- update to Angular `v15` and add standalone api support via `provideNgcCookieConsent()` ([e34b18a](https://github.com/tinesoft/ngx-cookieconsent/commit/e34b18aa1f5ddbd78c8ef654606a1ae102364f73)), closes [#132](https://github.com/tinesoft/ngx-cookieconsent/issues/132)

### BREAKING CHANGES

- Angular `v15` is now the minimal version to use the library

If you're using new Angular Standalone API, you can now leverage `provideNgcCookieConsent(config)`
(instead of `NgcCookieConsentModule.forRoot(config)`) to configure your (ng)module-less application

## [4.0.2](https://github.com/tinesoft/ngx-cookieconsent/compare/v4.0.1...v4.0.2) (2023-03-06)

### Bug Fixes

- **core:** make `rxjs` dependency less restrictive ([66d6ebc](https://github.com/tinesoft/ngx-cookieconsent/commit/66d6ebc20a4801221e007c515aecf553b5832c86)), closes [#129](https://github.com/tinesoft/ngx-cookieconsent/issues/129)

## [4.0.1](https://github.com/tinesoft/ngx-cookieconsent/compare/v4.0.0...v4.0.1) (2022-10-16)

### Bug Fixes

- **core:** fix `rxjs ` `peerDependencies` for rxjs for Angular v14+ ([0215a2f](https://github.com/tinesoft/ngx-cookieconsent/commit/0215a2f3960cfb11374c98b6fe4e0452f5d76180)), closes [#146](https://github.com/tinesoft/ngx-cookieconsent/issues/146)

# [4.0.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v3.0.1...v4.0.0) (2022-10-10)

### Bug Fixes

- **version:** update docs about version compatible with Ng 12 to 13 ([c323e26](https://github.com/tinesoft/ngx-cookieconsent/commit/c323e263038b54682737c67553655dc6f24b4da4))

### Features

- **core:** migrate to Angular 14 and Nx 14 ([#125](https://github.com/tinesoft/ngx-cookieconsent/issues/125)) ([7d8024d](https://github.com/tinesoft/ngx-cookieconsent/commit/7d8024da22be4e9e7bebc0c10f51a4d27461192a)), closes [#123](https://github.com/tinesoft/ngx-cookieconsent/issues/123)

### BREAKING CHANGES

- **core:** Angular 14 is now the minimum required version to use the module.

# [3.1.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v3.0.1...v3.1.0) (2022-10-10)

### Features

- **core:** migrate to Angular 14 and Nx 14 ([#125](https://github.com/tinesoft/ngx-cookieconsent/issues/125)) ([35d0e61](https://github.com/tinesoft/ngx-cookieconsent/commit/35d0e61cd99d716fa2e85611191f1d22f9f488db))

## [3.0.1](https://github.com/tinesoft/ngx-cookieconsent/compare/v3.0.0...v3.0.1) (2022-10-09)

### Bug Fixes

- **core:** remove wrong peerDependency on `platform-browser-dynamic` ([7ccf807](https://github.com/tinesoft/ngx-cookieconsent/commit/7ccf807f70bb43348aa907ef43798f690e6267cc))

# [3.0.0](https://github.com/tinesoft/ngx-cookieconsent/compare/v2.2.3...v3.0.0) (2022-10-08)

### Bug Fixes

- **core:** add `rel="noopener"` in html templates with `target="_blank"` ([4907c35](https://github.com/tinesoft/ngx-cookieconsent/commit/4907c354aaf77c26249db3b43b6a5cdf979c1158))
- add missing generic type to angular module ([7a44f3f](https://github.com/tinesoft/ngx-cookieconsent/commit/7a44f3fac3894c2b66671eb2bd6433b8cb5a6e36))
- **bundling:** missing external dependency 'rxjs/operators' ([baa7af8](https://github.com/tinesoft/ngx-cookieconsent/commit/baa7af8273d2756ba4c5643be960555ca3665d1e))
- **demo:** workaround for StackBlitz not supporting external scripts ([845af1a](https://github.com/tinesoft/ngx-cookieconsent/commit/845af1ad626f4c505979e57f21c66334a05626e9)), closes [#69](https://github.com/tinesoft/ngx-cookieconsent/issues/69)
- cookieconsent may be undefined ([290cac3](https://github.com/tinesoft/ngx-cookieconsent/commit/290cac31a8789ae8e536c6f14fec6b996f5fa3c6))

### Code Refactoring

- **core:** rename `initialize$` subscription into `initializing$` ([7233aa0](https://github.com/tinesoft/ngx-cookieconsent/commit/7233aa0325393774456500c2c69fda93498822be))

### Features

- **config:** allow `whitelistPage`/ `blacklistPage` to accept RegExp[] ([8c95e6d](https://github.com/tinesoft/ngx-cookieconsent/commit/8c95e6d4a7cef368af94f1dc5f69158c8f0442cc)), closes [#100](https://github.com/tinesoft/ngx-cookieconsent/issues/100)
- **core:** add `initialized$` and `initializationError$` subscriptions ([a994f5e](https://github.com/tinesoft/ngx-cookieconsent/commit/a994f5e3eb8f5f23001f3f1913017b424c7931a1))
- **core:** improve `WindowService` to work on both browser and server ([cdb5e0a](https://github.com/tinesoft/ngx-cookieconsent/commit/cdb5e0ac6d99e6b32c5c8e5e129a0478495813b4))
- **core:** loosen version of angular peerDependencies to v12 or higher ([ad9b4a2](https://github.com/tinesoft/ngx-cookieconsent/commit/ad9b4a2718e46e3e04ff574faac8d8de82bb0035))
- **core:** migrate to Angular 12 and Nx workspace ([0d36a56](https://github.com/tinesoft/ngx-cookieconsent/commit/0d36a5650f7fc479faf0de7422cb8eb69e34ef07))
- **core:** migrate to Angular 13 and Nx 13 ([c398496](https://github.com/tinesoft/ngx-cookieconsent/commit/c398496a7031b8ed128e9407eb9b825ef356d356))

### BREAKING CHANGES

- **core:** `initialize$` has been renamed to better reflect when this event is triggered

Use `initialized$` to get notify when the `cookieconsent` **has done** initializing successfully
