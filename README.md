<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/tinesoft/ngx-cookieconsent/master/demo/src/assets/logo.svg">
</p>

# ngx-cookieconsent - [Cookie Consent](https://cookieconsent.insites.com/) module for Angular.

[![npm version](https://badge.fury.io/js/ngx-cookieconsent.svg)](https://badge.fury.io/js/ngx-cookieconsent)
[![Build Status](https://travis-ci.org/tinesoft/ngx-cookieconsent.svg?branch=master)](https://travis-ci.org/tinesoft/ngx-cookieconsent)
[![Coverage Status](https://coveralls.io/repos/github/tinesoft/ngx-cookieconsent/badge.svg?branch=master)](https://coveralls.io/github/tinesoft/ngx-cookieconsent?branch=master)
[![dependency Status](https://david-dm.org/tinesoft/ngx-cookieconsent/status.svg)](https://david-dm.org/tinesoft/ngx-cookieconsent)
[![devDependency Status](https://david-dm.org/tinesoft/ngx-cookieconsent/dev-status.svg?branch=master)](https://david-dm.org/tinesoft/ngx-cookieconsent#info=devDependencies)
[![Greenkeeper Badge](https://badges.greenkeeper.io/tinesoft/ngx-cookieconsent.svg)](https://greenkeeper.io/)

## Demo

View the module in action at https://tinesoft.github.io/ngx-cookieconsent

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0 and 4.0.0)
* [Cookie Consent](https://cookieconsent.insites.com/) (*requires* Cookie Consent 3 or higher, tested with 3.0.4)


## Installation
Install above dependencies via *npm*. In particular for `Cookie Consent`:
```shell
npm install --save cookieconsent
```

Now install `ngx-cookieconsent` via:
```shell
npm install --save ngx-cookieconsent
```

---
##### Angular-CLI
>**Note**: If you are using `angular-cli` to build your app, make sure that `cookieconsent` is properly listed as a [global library](https://github.com/angular/angular-cli/wiki/stories-global-scripts), and as [global style](https://github.com/angular/angular-cli/wiki/stories-global-styles).

To do so, edit your `.angular-cli.json` as such:
```
      "scripts": [
        "../node_modules/cookieconsent/build/cookieconsent.min.js"
      ],

      "styles": [
        "../node_modules/cookieconsent/build/cookieconsent.min.css"
      ],

```

##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-cookieconsent`:
```js
map: {
  'ngx-cookieconsent': 'node_modules/ngx-cookieconsent/bundles/ngx-cookieconsent.umd.js',
}
```
In your systemjs config file, `meta` needs to tell the System loader how to load `cookieconsent`:
```js
    meta: {
    './node_modules/cookieconsent/build/cookieconsent.min.js': {
            format: 'amd'
        }
    }
```
In your index.html file, add script and link tags to load  `cookieconsent` globally:
```html
    <!-- 1. Configure SystemJS -->
    <script src="system.config.js"></script>
    <!-- 2. Add cookieconsent dependency-->
    <link rel="stylesheet" type="text/css" href="node_modules/cookieconsent/build/cookieconsent.min.css"/>
    <script src="node_modules/cookieconsent/build/cookieconsent.min.js"></script>
```

---

Once installed you need to import the main module:
```ts
import {NgcCookieConsentModule} from 'ngx-cookieconsent';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice `NgcCookieConsentModule.forRoot()`):
```ts
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};


@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgcCookieConsentModule.forRoot(cookieConfig), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import `NgcCookieConsentModule`:

```ts
import {NgcCookieConsentModule} from 'ngx-cookieconsent';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgcCookieConsentModule, ...], 
})
export class OtherModule {
}
```

## Usage

Once the module is imported, you can use the `NgcCookieContentService` in your component (i.e. `AppComponent`) to subscribe to main events fired by Cookie Consent and do stuff like disabling cookies or other.

Here is how it works:

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;

  constructor(private ccService: NgcCookieConsentService){}

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
  }
}

```

See [Cookie Consent Documentation](https://cookieconsent.insites.com/documentation/about-cookie-consent/) to see more about how to customize the UI or interact with user interactions.

## Credits

`ngx-cookieconsent` is built upon [Cookie Consent](https://cookieconsent.insites.com/), created by [Insites](https://insites.com)

## License

Copyright (c) 2017 Tine Kondo. Licensed under the MIT License (MIT)

