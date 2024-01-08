
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { SecurityContext } from '@angular/core';
import { ApplicationConfig } from '@angular/platform-browser';

import { NgcCookieConsentConfig, provideNgcCookieConsent } from 'ngx-cookieconsent';

import { environment } from '../environments/environment';

import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { appRoutes } from './app.routes';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.cookieDomain // it is recommended to set your domain, for cookies to work properly
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

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }).providers,
    provideNgcCookieConsent(cookieConfig),
    MarkdownModule.forRoot(
      {
        markedOptions: {
          provide: MarkedOptions,
          useValue: {
            gfm: true,
            breaks: false,
            pedantic: false,
            smartLists: true,
            smartypants: false,
          },
        },
        sanitize: SecurityContext.NONE
      }
    ).providers,
  ]
}