import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WindowService } from './service/window.service';
import { NgcCookieConsentService } from "./service/cookieconsent.service";
import { NgcCookieConsentConfig } from './service/cookieconsent-config';


@NgModule({
  imports: [
    CommonModule
  ]
})
export class NgcCookieConsentModule {

  static forRoot(@Optional() config?:NgcCookieConsentConfig): ModuleWithProviders {
    return {
      ngModule: NgcCookieConsentModule,
      providers: [WindowService, NgcCookieConsentService, { provide: NgcCookieConsentConfig, useValue: config}]
    };
  }
}
