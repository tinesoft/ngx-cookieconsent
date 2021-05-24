export * from './lib/ngx-cookieconsent.module';

export {
    WindowService, NgcCookieConsentConfig, NgcCookieConsentService,
    NgcHasCookieConsent, NgcCookieConsent
} from './lib/service/index';

export {
    NgcContentOptions, NgcHTMLElements, NgcLawOptions, NgcLocationOptions, NgcPaletteOptions,
    NgcCompliance, NgcLayouts, NgcPalette, NgcCookieConsentStatus,
    NgcCookiePosition, NgcCookieLayout, NgcCookieType, NgcCookieTheme, NgcCookieCompliance, NgcCookieOptions
} from './lib/model/index';

export { NgcInitializeEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from './lib/event/index';
