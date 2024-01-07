import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService, NgcCookieConsentConfig, NgcCookieConsentService } from './service/index';
import { provideNgcCookieConsent } from './ngx-cookieconsent.config';

/**
 * Main module of the library
 */
@NgModule({
  imports: [
    CommonModule
  ]
})
export class NgcCookieConsentModule {

  static forRoot(config: NgcCookieConsentConfig): ModuleWithProviders<NgcCookieConsentModule> {
    return {
      ngModule: NgcCookieConsentModule,
      providers: provideNgcCookieConsent(config)
    };
  }
}
