/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GettingStartedComponent } from './getting-started/getting-started.component';
import { AppSharedModule } from './shared/shared.module';
import { AppRoutingModule } from './ngc-demo-routing';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  }
};
describe('App: ngx-cookieconsent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AppSharedModule,
        AppRoutingModule,
        NgcCookieConsentModule.forRoot(cookieConfig)],
      declarations: [
        AppComponent,
        GettingStartedComponent,
        HomeComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
