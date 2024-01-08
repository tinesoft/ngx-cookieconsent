import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgcCookieConsentConfig, provideNgcCookieConsent } from 'ngx-cookieconsent';
import { HomeComponent } from './home.component';

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

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNgcCookieConsent(cookieConfig),
        { provide: TranslateService, useValue: mockTranslateService },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
