import { NgModule, ModuleWithProviders, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService, NgcCookieConsentService, NgcCookieConsentConfig } from './service/index';


export {
  WindowService, NgcCookieConsentService, NgcCookieConsentConfig,
  NgcHasCookieConsent, NgcCookieConsent
} from './service/index';

export {
  NgcContentOptions, NgcHTMLElements, NgcLawOptions, NgcLocationOptions, NgcPaletteOptions,
  NgcCompliance, NgcLayouts,  NgcPalette, NgcCookieConsentStatus,
  NgcCookiePosition, NgcCookieLayout, NgcCookieType, NgcCookieTheme, NgcCookieCompliance
} from './model/index';

export { NgcInitializeEvent, NgcStatusChangeEvent } from './event/index';

/**
 * Main module of the library
 */
@NgModule({
  imports: [
    CommonModule
  ]
})
export class NgcCookieConsentModule {

  static forRoot( @Optional() config?: NgcCookieConsentConfig): ModuleWithProviders {
    return {
      ngModule: NgcCookieConsentModule,
      providers: [WindowService, NgcCookieConsentService, { provide: NgcCookieConsentConfig, useValue: config }]
    };
  }
}
