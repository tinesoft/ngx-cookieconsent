# ng-cookieconsent - Angular integration of cookieconsent.js: a free solution to the EU Cookie Law.

[![npm version](https://badge.fury.io/js/ng-cookieconsent.svg)](https://badge.fury.io/js/ng-cookieconsent)
[![Build Status](https://travis-ci.org/tinesoft/ng-cookieconsent.svg?branch=master)](https://travis-ci.org/tinesoft/ng-cookieconsent)
[![Coverage Status](https://coveralls.io/repos/github/tinesoft/ng-cookieconsent/badge.svg?branch=master)](https://coveralls.io/github/tinesoft/ng-cookieconsent?branch=master)
[![dependency Status](https://david-dm.org/tinesoft/ng-cookieconsent/status.svg)](https://david-dm.org/tinesoft/ng-cookieconsent)
[![devDependency Status](https://david-dm.org/tinesoft/ng-cookieconsent/dev-status.svg?branch=master)](https://david-dm.org/tinesoft/ng-cookieconsent#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/tinesoft/ng-cookieconsent.svg)](https://greenkeeper.io/)

## Demo

View all the directives in action at https://tinesoft.github.io/ng-cookieconsent

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ng-cookieconsent` via:
```shell
npm install --save ng-cookieconsent
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ng-cookieconsent`:
```js
map: {
  'ng-cookieconsent': 'node_modules/ng-cookieconsent/bundles/ng-cookieconsent.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import {NgCookieconsentModule} from 'ng-cookieconsent';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice `NgCookieconsentModule.forRoot()`):
```js
import {NgCookieconsentModule} from 'ng-cookieconsent';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgCookieconsentModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import `NgCookieconsentModule`:

```js
import {NgCookieconsentModule} from 'ng-cookieconsent';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgCookieconsentModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2017 Tine Kondo. Licensed under the MIT License (MIT)

