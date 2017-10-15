import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService, NgcCookieConsentConfig, NgcCookieConsentService } from './service/index';

/**
 * Main module of the library
 */
@NgModule({
  imports: [
    CommonModule
  ]
})
export class NgcCookieConsentModule {

  static forRoot(config: NgcCookieConsentConfig): ModuleWithProviders {
    return {
      ngModule: NgcCookieConsentModule,
      providers: [WindowService, { provide: NgcCookieConsentConfig, useValue: config }, NgcCookieConsentService]
    };
  }
}
