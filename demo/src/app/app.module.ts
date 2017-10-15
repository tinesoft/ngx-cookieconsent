
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgcCookieConsentModule, NgcCookieConsentConfig } from 'ngx-cookieconsent';

import { AppRoutingModule } from './app-routing';
import { AppSharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { environment } from './../environments/environment';
import { HomeModule } from './home/home.module';

const cookieConfig:NgcCookieConsentConfig = {
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

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgcCookieConsentModule.forRoot(cookieConfig),
        AppRoutingModule,
        AppSharedModule,
        HomeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
