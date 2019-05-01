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
* [Angular](https://angular.io) (*requires* Angular 6+, [v1.1.0](https://github.com/tinesoft/ngx-cookieconsent/tree/v1.1.0) is the latest version for Angular < 6 )
* [Cookie Consent](https://cookieconsent.insites.com/) (*requires* Cookie Consent 3 or higher, tested with 3.1.0)


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

To do so, edit your `angular-cli.json` as such:
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
  private noCookieLawSubscription: Subscription;

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

      this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
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
    this.noCookieLawSubscription.unsubscribe();
  }
}

```

See [Cookie Consent Documentation](https://cookieconsent.insites.com/documentation/about-cookie-consent/) to see more about how to customize the UI or interact with user interactions.

## I18n Support

Messages displayed in the Cookie Consent Bar can easily be translated, using libraries like [ngx-translate](https://github.com/ngx-translate/core).
Basically this involved the following steps (using ngx-translate + Anglar CLI):

* [Install](https://github.com/ngx-translate/core#installation) and [configure](https://github.com/ngx-translate/core#usage) `ngx-translate`

* Provide the translation JSON files in `src/assets/`, for e.g: `en.json`, `fr.json`, ...

```JSON
{
    "cookie": {
        "header": "Cookies used on the website!",
        "message": "This website uses cookies to ensure you get the best experience on our website.",
        "dismiss": "Got it!",
        "allow": "Allow cookies",
        "deny": "Decline",
        "link": "Learn more",
        "policy": "Cookie Policy"
    }
}
```

> **Note:** see [content-options.ts](https://github.com/tinesoft/ngx-cookieconsent/blob/master/src/model/content-options.ts) for complete list of messages that can be translated.

* Configure your main component `AppComponent`

```ts
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private ccService: NgcCookieConsentService, private translateService:TranslateService) {
  }

  ngOnInit() {
    // Support for translated cookies messages
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('en');

    const browserLang = this.translateService.getBrowserLang();
    this.translateService.use(browserLang.match(/en|fr/) ? browserLang : 'en');

    this.translateService//
      .get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
      .subscribe(data => {

        this.ccService.getConfig().content = this.ccService.getConfig().content || {} ;
        // Override default messages with the translated ones
        this.ccService.getConfig().content.header = data['cookie.header'];
        this.ccService.getConfig().content.message = data['cookie.message'];
        this.ccService.getConfig().content.dismiss = data['cookie.dismiss'];
        this.ccService.getConfig().content.allow = data['cookie.allow'];
        this.ccService.getConfig().content.deny = data['cookie.deny'];
        this.ccService.getConfig().content.link = data['cookie.link'];
        this.ccService.getConfig().content.policy = data['cookie.policy'];

        this.ccService.destroy();//remove previous cookie bar (with default messages)
        this.ccService.init(this.ccService.getConfig()); // update config with translated messages
      });
  }
```

## Custom Layout Support

Cookie Consent supports [custom layouts](https://cookieconsent.insites.com/documentation/javascript-api/#layout_options), and so does `ngx-cookieconsent`.
So if your are not happy with the default appearance of the cookie bar, you can totally customize it to better suit your needs. This involves overriding a few options:

* [NgcCookieConsentConfig.layout](https://github.com/tinesoft/ngx-cookieconsent/blob/master/src/service/cookieconsent-config.ts#L78): to define the name of your custom layout to use. For e.g `my-custom-layout`
* [NgcCookieConsentConfig.layouts](https://github.com/tinesoft/ngx-cookieconsent/blob/master/src/service/cookieconsent-config.ts#L73): to define your custom layout HTML. Elements between `{{` and `}}` will be replaced by their content (see in `[NgcCookieConsentConfig.content` below)
* [NgcCookieConsentConfig.elements](https://github.com/tinesoft/ngx-cookieconsent/blob/master/src/model/cookieconsent-config.ts#L44) : html elements referenced in the custom layout (between `{{` and `}}`)
* [NgcCookieConsentConfig.content](https://github.com/tinesoft/ngx-cookieconsent/blob/master/src/model/cookieconsent-config.ts#L36) : content of elements referenced in the custom elements above (between `{{` and `}}`)

Here is a example of a **custom layout**, that is inspired from the default 'basic' layout , but simply changes the message and links that are displayed in the bar.

<p align="center">
  <img style="text-align: center;" src="https://cdn.rawgit.com/tinesoft/ngx-cookieconsent/master/demo/src/assets/custom-cookie-bar.png">
</p>

```ts
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'// it is recommended to set your domain, for cookies to work properly
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
  type: 'opt-out',
  layout: 'my-custom-layout',
  layouts: {
    "my-custom-layout": '{{messagelink}}{{compliance}}'
  },
  elements:{
    messagelink: `
    <span id="cookieconsent:desc" class="cc-message">{{message}} 
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">{{cookiePolicyLink}}</a>, 
      <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a> and our 
      <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank">{{tosLink}}</a>
    </span>
    `,
  },
  content:{
    message: 'By using our site, you acknowledge that you have read and understand our ',
    
    cookiePolicyLink: 'Cookie Policy',
    cookiePolicyHref: 'https://cookie.com',

    privacyPolicyLink: 'Privacy Policy',
    privacyPolicyHref: 'https://privacy.com',

    tosLink: 'Terms of Service',
    tosHref: 'https://tos.com',
  }
};


@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgcCookieConsentModule.forRoot(cookieConfig), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

## Credits

`ngx-cookieconsent` is built upon [Cookie Consent](https://cookieconsent.insites.com/), created by [Insites](https://insites.com)

## License

Copyright (c) 2019 Tine Kondo. Licensed under the MIT License (MIT)

