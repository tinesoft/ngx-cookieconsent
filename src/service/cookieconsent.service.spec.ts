/* tslint:disable:no-unused-variable */
import { NgModule } from '@angular/core';
import { TestBed, async, inject } from '@angular/core/testing';
import { NgcCookieConsentModule } from './../cookieconsent.module';
import { NgcCookieConsentService } from './cookieconsent.service';
import { NgcCookieConsentConfig } from './cookieconsent-config';
import { WindowService } from './window.service';
import { InitializeEvent } from './../event/Initialize.event';
import { StatusChangeEvent } from './../event/status-change.event';

const myConfig: NgcCookieConsentConfig = {
  content: {
    header: '[custom]Cookies used on the website!',
    message: '[custom]This website uses cookies to ensure you get the best experience on our website.',
    dismiss: '[custom]Got it!',
    allow: '[custom]Allow cookies',
    deny: '[custom]Decline',
    link: '[custom]Learn more',
    href: 'http://cookiesandyou.com/[custom]',
    close: '&#x2789;'
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

describe('Service: NgcCookieConsent', () => {

  it('should create the service instance from providers...', () => {
    TestBed.configureTestingModule({
      providers: [WindowService, NgcCookieConsentService, NgcCookieConsentConfig]
    });
    let service = TestBed.get(NgcCookieConsentService);// inject the service from root injector

    expect(service).toBeTruthy();
  });

  it('should create the service instance from module imports...', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot()]
    });

    let service = TestBed.get(NgcCookieConsentService);// inject the service from root injector

    expect(service).toBeTruthy();
  });

  it('should inject the default CookieConsent UI when injecting the service without config', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot()]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    expect(CookieConsentUi.getCcElement()).not.toBeNull();

    expect(CookieConsentUi.getCcMessageElement().textContent).toEqual('This website uses cookies to ensure you get the best experience on our website. Learn more');
    expect(CookieConsentUi.getCcDismissElement().textContent).toEqual('Got it!');
    expect(CookieConsentUi.getCcLinkElement().textContent).toEqual('Learn more');
    expect(CookieConsentUi.getCcLinkElement().getAttribute('href')).toEqual('http://cookiesandyou.com');

    //clean up
    CookieConsentUi.clearPage();
  });

  it('should inject a custom CookieConsent UI when injecting the service with custom config', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector

    expect(CookieConsentUi.getCcElement()).not.toBeNull();

    expect(CookieConsentUi.getCcMessageElement().textContent).toEqual(myConfig.content.message + ' ' + myConfig.content.link);
    expect(CookieConsentUi.getCcDismissElement().textContent).toEqual(myConfig.content.dismiss);
    expect(CookieConsentUi.getCcLinkElement().textContent).toEqual(myConfig.content.link);
    expect(CookieConsentUi.getCcLinkElement().getAttribute('href')).toEqual(myConfig.content.href);

    //clean up
    CookieConsentUi.clearPage();
  });

  it('should not inject the CookieConsent UI when not injecting the service', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot()]
    });

    expect(CookieConsentUi.getCcElement()).toBeNull();
  });

  it('should return default status when calling getStatus()', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector

    expect(service.getStatus()).not.toBeNull();
    expect(service.getStatus()).toEqual({ deny: 'deny', allow: 'allow', dismiss: 'dismiss' });

    //clean up
    CookieConsentUi.clearPage();
  });

  it('should return default transition when calling getTransition()', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector

    expect(service.getTransition()).toBe(true);

    //clean up
    CookieConsentUi.clearPage();
  });


  it('should set callbacks on provided config', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    expect(typeof (config.onPopupOpen)).toEqual('function');
    expect(typeof (config.onPopupClose)).toEqual('function');
    expect(typeof (config.onInitialize)).toEqual('function');
    expect(typeof (config.onStatusChange)).toEqual('function');
    expect(typeof (config.onRevokeChoice)).toEqual('function');

    // clean up
    CookieConsentUi.clearPage();
  });

  it('should emit onPopupOpen$ event when calling onPopupOpen() callback', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    let calls = 0;
    service.popupOpen$.subscribe(() => calls++);

    config.onPopupOpen();
    config.onPopupOpen();

    expect(calls).toEqual(2);

    // clean up
    CookieConsentUi.clearPage();
  });


  it('should emit popupClose$ event when calling onPopupClose() callback', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    let calls = 0;
    service.popupClose$.subscribe(() => calls++);

    config.onPopupClose();
    config.onPopupClose();

    expect(calls).toEqual(2);

    // clean up
    CookieConsentUi.clearPage();
  });


  it('should emit initialize$ event when calling onInitialize() callback', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    let calls = 0;
    service.initialize$.subscribe((event: InitializeEvent) => {
      calls++;
      expect(event).toEqual({ status: `status${calls}` });
    });

    config.onInitialize('status1');
    config.onInitialize('status2');

    expect(calls).toEqual(2);

    // clean up
    CookieConsentUi.clearPage();
  });

  it('should emit statusChange$ event when calling onStatusChange() callback', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    let calls = 0;
    service.statusChange$.subscribe((event: StatusChangeEvent) => {
      calls++;
      expect(event).toEqual({ status: `status${calls}`, chosenBefore: `chosenBefore${calls}` });
    });

    config.onStatusChange('status1', 'chosenBefore1');
    config.onStatusChange('status2', 'chosenBefore2');

    expect(calls).toEqual(2);

    // clean up
    CookieConsentUi.clearPage();
  });

  it('should emit revokeChoice$ event when calling onRevokeChoice() callback', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    let calls = 0;
    service.revokeChoice$.subscribe(() => calls++);

    config.onRevokeChoice();
    config.onRevokeChoice();

    expect(calls).toEqual(2);

    // clean up
    CookieConsentUi.clearPage();
  });

});

/**
 * Utility class to access ui elements related to the CookieConsent.
 */
export class CookieConsentUi {

  constructor() {
    throw new Error('Utiliy class, no public constructor');
  }

  /**
  * Removes any previous cookie consent element from the page
   */
  public static clearPage() {
    let cookieConsentElm = this.getCcElements();
    Array.from(cookieConsentElm).forEach(el => el.remove());
  }

  public static getCcElement(): Element {
    return this.getCcElements().item(0);
  }

  public static getCcElements(): NodeListOf<Element> {
    return document.querySelectorAll('div.cc-window.cc-banner');
  }

  public static getCcMessageElement(): Element {
    return document.querySelectorAll('span.cc-message').item(0);
  }

  public static getCcLinkElement(): Element {
    return document.querySelectorAll('a.cc-link').item(0);
  }

  public static getCcDenyElement(): Element {
    return document.querySelectorAll('a.cc-btn.cc-deny').item(0);
  }

  public static getCcDismissElement(): Element {
    return document.querySelectorAll('a.cc-btn.cc-dismiss').item(0);
  }
}
