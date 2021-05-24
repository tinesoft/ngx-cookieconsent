import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { NgcCookieConsentService, NgcCookieConsentConfig, NgcCookiePosition, NgcCookieTheme, NgcCookieCompliance } from 'ngx-cookieconsent';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {

  options: NgcCookieConsentConfig;
  minOptions: NgcCookieConsentConfig;
  optionsBackup: NgcCookieConsentConfig;
  areOptionsCopied = false;

  positions:{value: NgcCookiePosition, text:string}[] = [
    { value: 'top', text: 'Banner top' },
    { value: 'bottom', text: 'Banner bottom' },
    { value: 'top-left', text: 'Banner top left' },
    { value: 'top-right', text: 'Banner top right' },
    { value: 'bottom-left', text: 'Banner bottom left' },
    { value: 'bottom-right', text: 'Banner bottom right' }
  ];

  themes: {value: NgcCookieTheme, text:string}[] = [
    { value: 'block', text: 'Block' },
    { value: 'classic', text: 'Classic' },
    { value: 'edgeless', text: 'Edgeless' }
  ];

  compliances :{value: NgcCookieCompliance, text:string}[] = [
    { value: 'info', text: 'Just tell users that we use cookies' },
    { value: 'opt-out', text: 'Let users opt out of cookies (Advanced)' },
    { value: 'opt-in', text: 'Ask users to opt into cookies (Advanced)' }
  ];

  // palettes = [
  //   { popup: { background: '#000' }, 'button': { background: '#f1d600' } },
  //   { popup: { background: '#eaf7f7', text: '#5c7291' }, 'button': { background: '#56cbdb', text: '#ffffff' } },
  //   { popup: { background: '#252e39' }, 'button': { background: '#14a7d0' } },
  //   { popup: { background: '#000', text: '#0f0' }, 'button': { background: '#0f0' } },
  //   { popup: { background: '#3937a3' }, 'button': { background: '#e62576' } },
  //   { popup: { background: '#64386b', text: '#ffcdfd' }, 'button': { background: '#f8a8ff', text: '#3f0045' } },
  //   { popup: { background: '#237afc' }, 'button': { background: '#fff', text: '#237afc' } },
  //   { popup: { background: '#aa0000', text: '#ffdddd' }, 'button': { background: '#ff0000' } },
  //   { popup: { background: '#383b75' }, 'button': { background: '#f1d600' } },
  //   { popup: { background: '#1d8a8a' }, 'button': { background: '#62ffaa' } },
  //   { popup: { background: '#edeff5', text: '#838391' }, 'button': { background: '#4b81e8' } },
  //   { popup: { background: '#343c66', text: '#cfcfe8' }, 'button': { background: '#f71559' } },
  //   { popup: { background: '#216942', text: '#b2d192' }, 'button': { background: '#afed71' } },
  //   { popup: { background: '#3c404d', text: '#d6d6d6' }, 'button': { background: '#8bed4f' } },
  //   { popup: { background: '#eb6c44', text: '#ffffff' }, 'button': { background: '#f5d948' } },
  //   { popup: { background: '#efefef', text: '#404040' }, 'button': { background: '#8ec760', text: '#ffffff' } }
  // ];

  constructor(private ccService: NgcCookieConsentService, public translate: TranslateService) { 
    this.translate.use('en');// default language

    this.minOptions = {
      cookie: {
        domain: environment.cookieDomain
      }
    };

    this.options = {
      cookie: {
        domain: environment.cookieDomain
      },
      position: 'bottom',
      theme: 'classic',
      palette: {
        popup: {
          background: '#000000',
          text: '#ffffff'
        },
        button: {
          background: '#f1d600',
          text: '#000000'
        }
      },
      type: 'info',
      content: {
        message: 'This website uses cookies to ensure you get the best experience on our website.',
        dismiss: 'Got it!',
        deny: 'Refuse cookies',
        link: 'Learn more',
        href: 'https://cookiesandyou.com',
        policy: 'Cookie Policy',

      }
    };

    this.optionsBackup = Object.assign(this.minOptions, this.options);
  }

  selectPosition(position: NgcCookiePosition): void {
    this.options.position = position;
  }

  selectTheme(theme: NgcCookieTheme) {
    this.options.theme = theme;
  }

  selectCompliance(compliance: NgcCookieCompliance): void {
    this.options.type = compliance;
  }

  changeLang(lang: string){
    this.translate.use(lang);
    this.translate//
      // See assets/i18n/**.json for the keys
      .get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
      .subscribe(data => {

        if(!this.options.content)
          this.options.content = {};

        this.options.content.header = data['cookie.header'];
        this.options.content.message = data['cookie.message'];
        this.options.content.dismiss = data['cookie.dismiss'];
        this.options.content.allow = data['cookie.allow'];
        this.options.content.deny = data['cookie.deny'];
        this.options.content.link = data['cookie.link'];
        this.options.content.policy = data['cookie.policy'];

        this.updateConfig();
      });
  }

  updateConfig(): void {
    this.ccService.clearStatus();
    this.ccService.destroy();
    this.ccService.init(this.options);
    this.areOptionsCopied = false;
  }

  resetConfig(): void {
    this.options = Object.assign(this.minOptions, this.optionsBackup);
    this.updateConfig();
  }
}
