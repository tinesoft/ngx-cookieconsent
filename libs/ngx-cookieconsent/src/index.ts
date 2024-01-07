export * from './lib/ngx-cookieconsent.module';
export * from './lib/ngx-cookieconsent.config';


export {
    WindowService, NgcCookieConsentConfig, NgcCookieConsentService,
    NgcHasCookieConsent, NgcCookieConsent
} from './lib/service/index';

export {
    NgcContentOptions, NgcHTMLElements, NgcLawOptions, NgcLocationOptions, NgcPaletteOptions,
    NgcCompliance, NgcLayouts, NgcPalette, NgcCookieConsentStatus,
    NgcCookiePosition, NgcCookieLayout, NgcCookieType, NgcCookieTheme, NgcCookieCompliance, NgcCookieOptions
} from './lib/model/index';

export { NgcInitializingEvent, NgcInitializationErrorEvent, NgcStatusChangeEvent, NgcNoCookieLawEvent } from './lib/event/index';
