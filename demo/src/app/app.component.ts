import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, RouterEvent } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import { NgcCookieConsentService, NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from 'ngx-cookieconsent';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { NgcNoCookieLawEvent } from '../../../src/event/no-cookie-law.event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(private ccService: NgcCookieConsentService, private translateService:TranslateService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    this.router.events.pipe(
      filter((event:RouterEvent) => event instanceof NavigationEnd)
    ).subscribe(event => {
      if (isPlatformBrowser(this.platformId)) {
        window.scroll(0, 0);
      }
    });
  }

  ngOnInit() {
    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log('popupOpen');
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log('popuClose');
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(`initialize: ${JSON.stringify(event)}`);
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(`statusChange: ${JSON.stringify(event)}`);
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(`revokeChoice`);
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
        console.log(`noCookieLaw: ${JSON.stringify(event)}`);
      });


    // (Optional) support for translated cookies messages
    this.translateService.addLangs(['en', 'fr']);
    this.translateService.setDefaultLang('en');
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
