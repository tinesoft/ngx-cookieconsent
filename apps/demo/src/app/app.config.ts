import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, SecurityContext, ApplicationConfig } from '@angular/core';

import {
  NgcCookieConsentConfig,
  provideNgcCookieConsent,
} from 'ngx-cookieconsent';

import { environment } from '../environments/environment';

import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';
import { appRoutes } from './app.routes';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faBolt,
  faBook,
  faCheck,
  faClipboard,
  faFileText,
  faGear,
  faLanguage,
  faImage,
  faInfo,
  faLink,
  faMapMarker,
  faUndo,
  faVcard,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { provideClientHydration } from '@angular/platform-browser';

const iconsList: IconDefinition[] = [
  faUndo,
  faMapMarker,
  faLanguage,
  faLink,
  faGear,
  faFileText,
  faVcard,
  faImage,
  faCheck,
  faClipboard,
  faInfo,
  faBook,
  faBolt,
  faGithub,
];

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain, // it is recommended to set your domain, for cookies to work properly
  },
  palette: {
    popup: {
      background: '#000',
    },
    button: {
      background: '#f1d600',
    },
  },
  theme: 'edgeless',
  type: 'opt-out',
};

// AoT requires an exported function for factories
export function httpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideRouter(appRoutes,
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top'
      })),
    provideHttpClient(),
    provideHttpClient(),
    provideTranslateService({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    provideNgcCookieConsent(cookieConfig),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: (iconLibrary: FaIconLibrary) => async () => {
        // Add any icons needed here:
        iconLibrary.addIcons(...iconsList);
      },
      // When using a factory provider you need to explicitly specify its dependencies.
      deps: [FaIconLibrary],
      multi: true,
    },
  ],
};
