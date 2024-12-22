
# ngx-cookieconsent

[![npm version](https://badge.fury.io/js/ngx-cookieconsent.svg)](https://badge.fury.io/js/ngx-cookieconsent)
[![Build Status](https://travis-ci.org/tinesoft/ngx-cookieconsent.svg?branch=master)](https://travis-ci.org/tinesoft/ngx-cookieconsent)
[![Coverage Status](https://coveralls.io/repos/github/tinesoft/ngx-cookieconsent/badge.svg?branch=master)](https://coveralls.io/github/tinesoft/ngx-cookieconsent?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/tinesoft/ngx-cookieconsent/master/badge.svg)](https://snyk.io/test/github/tinesoft/ngx-cookieconsent)

> [Cookie Consent](https://cookieconsent.insites.com/) module for Angular

<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://raw.githubusercontent.com/tinesoft/ngx-cookieconsent/master/apps/demo/src/assets/logo.svg">
</p>

## Demo

View the module in action at https://tinesoft.github.io/ngx-cookieconsent

## Dependencies

* [Angular](https://angular.io) (see  [Compatibility Matrix ](#compatibility-with-angular) below)
* [Cookie Consent](https://cookieconsent.insites.com/) (*requires* Cookie Consent 3 or higher, tested with 3.1.0)

## Installation

Install `Cookie Consent` dependency:

```shell
npm install --save cookieconsent

// or 

yarn add cookieconsent
```

Now install `ngx-cookieconsent` via:

```shell
npm install --save ngx-cookieconsent

// or

yarn add ngx-cookieconsent
```

>**Note**: If you are using `Angular CLI` or `Nx CLI` to build your app, make sure that `cookieconsent` is properly listed as a [global library](https://github.com/angular/angular-cli/wiki/stories-global-scripts), and as [global style](https://github.com/angular/angular-cli/wiki/stories-global-styles).

To do so, edit your `angular.json` (or `project.json` for Nx CLI based apps) as such:
```
      "scripts": [
        "node_modules/cookieconsent/build/cookieconsent.min.js"
      ],

      "styles": [
        "node_modules/cookieconsent/build/cookieconsent.min.css"
      ],

```

## Configuration

Prepare the config:

```ts
import {NgcCookieConsentConfig} from 'ngx-cookieconsent';

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

```

#### For Angular Standalone API-based apps

If you are using [Angular Standalone](https://angular.io/guide/standalone-components) API to bootstrap your application, you can configure the library by leveraging the new `provideNgcCookieConsent(config)` helper (added since `v5.x.x`), as such:

```ts
import {provideNgcCookieConsent} from 'ngx-cookieconsent';

//...

bootstrapApplication(AppComponent, {
  providers: [
    provideNgcCookieConsent(cookieConfig),
    // ...
  ]
});
```

#### For Angular (ng)Module-based apps

For traditional ngModule-based angular application, you need to import the library module in your application module, as such:

```ts
import {NgcCookieConsentModule} from 'ngx-cookieconsent';

//...

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

Inject the `NgcCookieContentService` in your main component (i.e. `AppComponent`) to show the cookie consent popup after the component is loaded. You don't need to explicitly call its `init()` method (done automatically when the service's constructor gets called upon instantiation By Angular).

Also, you can use the injected `NgcCookieContentService` to update the config (using `init()`), subscribe to events and do stuff like disabling cookies or other.

Here is how it works:

```ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

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

    this.initializingSubscription = this.ccService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      });
    
    this.initializedSubscription = this.ccService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      });

    this.initializationErrorSubscription = this.ccService.initializationError$.subscribe(
      (event: NgcInitializationErrorEvent) => {
        // the cookieconsent has failed to initialize... 
        console.log(`initializationError: ${JSON.stringify(event.error?.message)}`);
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
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
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

        this.ccService.destroy(); // remove previous cookie bar (with default messages)
        this.ccService.init(this.ccService.getConfig()); // update config with translated messages
      });
  }
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
      <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank" rel="noopener">{{cookiePolicyLink}}</a>, 
      <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank" rel="noopener">{{privacyPolicyLink}}</a> and our 
      <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank" rel="noopener">{{tosLink}}</a>
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

## Compatibility with Angular

Every Nx plugin relies on the underlying Nx Workspace/DevKit it runs on. This table provides the compatibility matrix between major versions of Nx workspace and this plugin.

| Library Version | Angular version
| -------------- | --------------------
| `>=v7.0.0`     | `>=v18.x.x`
| `>=v6.0.0`     | `>=v16.x.x`
| `>=v5.0.0`     | `>=v15.x.x`
| `>=v4.0.1`     | `>=v14.x.x`
| `v3.0.1`       | `>=v12.x.x`
| `>=v2.2.3`     | `>=v6.x.x`
| `v1.1.0`       | `<v6.x.x`

## Credits

`ngx-cookieconsent` is built upon [Cookie Consent](https://www.osano.com/cookieconsent/), by [Osano](https://osano.com)

## License

Copyright (c) 2018-present Tine Kondo. Licensed under the MIT License (MIT)
