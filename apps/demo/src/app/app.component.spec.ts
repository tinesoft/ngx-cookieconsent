/* tslint:disable:no-unused-variable */

import { APP_BASE_HREF } from '@angular/common';
import { TestBed, waitForAsync } from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgcCookieConsentConfig, provideNgcCookieConsent } from 'ngx-cookieconsent';
import { AppComponent } from './app.component';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  }
};
const mockTranslateService = {
  use: () => { },
  addLangs: () => { },
  setDefaultLang: () => { },
};

describe('App: ngx-cookieconsent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideRouter([]),
        provideNgcCookieConsent(cookieConfig),
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
