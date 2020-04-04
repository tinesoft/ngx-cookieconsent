/* tslint:disable:no-unused-variable */
import { TestBed, fakeAsync, tick} from '@angular/core/testing';
import { NgcCookieConsentModule } from './../cookieconsent.module';
import { NgcCookieConsentService } from './cookieconsent.service';
import { NgcCookieConsentConfig } from './cookieconsent-config';
import { WindowService } from './window.service';
import { NgcInitializeEvent } from './../event/initialize.event';
import { NgcStatusChangeEvent } from './../event/status-change.event';
import { NgcNoCookieLawEvent } from './../event/no-cookie-law.event';

 
const minimumConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'my.domain.com',
  },
};

const myConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'custom.domain.com',
    expiryDays: 250,
    name: '[custom]cookieconsent_status',
    path: '/custom/path'
  },
  content: {
    header: '[custom]Cookies used on the website!',
    message: '[custom]This website uses cookies to ensure you get the best experience on our website.',
    dismiss: '[custom]Got it!',
    allow: '[custom]Allow cookies',
    deny: '[custom]Decline',
    link: '[custom]Learn more',
    href: 'https://cookiesandyou.com/[custom]',
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

  afterEach(()=>{
    // clean up
    CookieConsentUi.clearPage();
  });

  it('should create the service instance from providers...', () => {
    TestBed.configureTestingModule({
      providers: [WindowService, NgcCookieConsentService, NgcCookieConsentConfig]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector

    expect(service).toBeTruthy();
  });

  it('should create the service instance from module imports...', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(minimumConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector

    expect(service).toBeTruthy();
  });

  it('should inject the default NgcCookieConsent UI when injecting the service without config', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(minimumConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    expect(CookieConsentUi.getCcElement()).not.toBeNull();

    expect(CookieConsentUi.getCcMessageElement().textContent).toEqual('This website uses cookies to ensure you get the best experience on our website. Learn more');
    expect(CookieConsentUi.getCcDismissElement().textContent).toEqual('Got it!');
    expect(CookieConsentUi.getCcLinkElement().textContent).toEqual('Learn more');
    expect(CookieConsentUi.getCcLinkElement().getAttribute('href')).toEqual('https://cookiesandyou.com');
  });

  it('should inject a custom NgcCookieConsent UI when injecting the service with custom config', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector

    expect(CookieConsentUi.getCcElement()).not.toBeNull();

    expect(CookieConsentUi.getCcMessageElement().textContent).toEqual(myConfig.content.message + ' ' + myConfig.content.link);
    expect(CookieConsentUi.getCcDenyElement().textContent).toEqual(myConfig.content.deny);
    expect(CookieConsentUi.getCcAllowElement().textContent).toEqual(myConfig.content.allow);
    expect(CookieConsentUi.getCcLinkElement().textContent).toEqual(myConfig.content.link);
    expect(CookieConsentUi.getCcLinkElement().getAttribute('href')).toEqual(myConfig.content.href);
  });

  it('should not inject the NgcCookieConsent UI when not injecting the service', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(minimumConfig)]
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
  });

  it('should return default transition when calling getTransition()', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector

    expect(service.getTransition()).toBe(true);
  });


  it('should set callbacks on provided config', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    expect(typeof (config.onPopupOpen)).toEqual('function');
    expect(typeof (config.onPopupClose)).toEqual('function');
    expect(typeof (config.onInitialise)).toEqual('function');
    expect(typeof (config.onStatusChange)).toEqual('function');
    expect(typeof (config.onRevokeChoice)).toEqual('function');
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
  });


  it('should emit initialize$ event when calling onInitialise() callback', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    let calls = 0;
    service.initialize$.subscribe((event: NgcInitializeEvent) => {
      calls++;
      expect(event).toEqual({ status: `status${calls}` });
    });

    config.onInitialise('status1');
    config.onInitialise('status2');

    expect(calls).toEqual(2);
  });

  it('should emit statusChange$ event when calling onStatusChange() callback', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    let calls = 0;
    service.statusChange$.subscribe((event: NgcStatusChangeEvent) => {
      calls++;
      expect(event).toEqual({ status: `status${calls}`, chosenBefore: `chosenBefore${calls}` });
    });

    config.onStatusChange('status1', 'chosenBefore1');
    config.onStatusChange('status2', 'chosenBefore2');

    expect(calls).toEqual(2);
  });

  it('should emit noCookieLaw$ event when calling onNoCookieLaw() callback', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });

    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    let config = service.getConfig();

    let calls = 0;
    service.noCookieLaw$.subscribe((event: NgcNoCookieLawEvent) => {
      calls++;
      expect(event).toEqual({ countryCode: `countryCode${calls}`, country: `country${calls}` });
    });

    config.onNoCookieLaw('countryCode1', 'country1');
    config.onNoCookieLaw('countryCode2', 'country2');

    expect(calls).toEqual(2);
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
  });

  it('should destroy the NgcCookieConsent UI when calling "destroy"', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(minimumConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    expect(CookieConsentUi.getCcElement()).not.toBeNull();

    service.destroy();

    expect(CookieConsentUi.getCcElement()).toBeNull();
  });

  it('should toggle RevokeButton the NgcCookieConsent UI when clicking "deny"', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(myConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    expect(CookieConsentUi.getCcElement()).not.toBeNull();

    let revokeBtn:HTMLElement = CookieConsentUi.getCcRevokeElement();
    expect(revokeBtn.style.display).toEqual("none");

    tick(100);// let the bar time to appear and then simulate click on "Decline" button
    let denyBtn:HTMLElement = CookieConsentUi.getCcDenyElement();
    denyBtn.click();

    revokeBtn = CookieConsentUi.getCcRevokeElement();
    expect(revokeBtn.style.display).toEqual("");

    expect(CookieConsentUi.getCcElement()).not.toBeNull();
  }));

  it('should fade in the NgcCookieConsent UI when calling "fadeIn"', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(minimumConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    expect(CookieConsentUi.getCcElement()).not.toBeNull();

    service.fadeIn();

    expect(CookieConsentUi.getCcElement()).not.toBeNull();    
  });

  it('should fade out the NgcCookieConsent UI when calling "fadeOut"', () => {
    TestBed.configureTestingModule({
      imports: [NgcCookieConsentModule.forRoot(minimumConfig)]
    });
    let service = TestBed.get(NgcCookieConsentService); // inject the service from root injector
    expect(CookieConsentUi.getCcElement()).not.toBeNull();

    service.fadeOut();

    expect(CookieConsentUi.getCcElement()).not.toBeNull();    
  });

});

/**
 * Utility class to access ui elements related to the NgcCookieConsent.
 */
export class CookieConsentUi {

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

  public static getCcMessageElement(): HTMLElement {
    return document.querySelectorAll('span.cc-message').item(0) as HTMLElement;
  }

  public static getCcLinkElement(): HTMLElement {
    return document.querySelectorAll('a.cc-link').item(0) as HTMLElement;
  }

  public static getCcDenyElement(): HTMLElement {
    return document.querySelectorAll('a.cc-btn.cc-deny').item(0) as HTMLElement;
  }

  public static getCcAllowElement(): HTMLElement {
    return document.querySelectorAll('a.cc-btn.cc-allow').item(0) as HTMLElement;
  }

  public static getCcDismissElement(): HTMLElement {
    return document.querySelectorAll('a.cc-btn.cc-dismiss').item(0) as HTMLElement;
  }

  public static getCcRevokeElement(): HTMLElement {
    return document.querySelectorAll('div.cc-revoke').item(0) as HTMLElement;
  }

  constructor() {
    throw new Error('Utiliy class, no public constructor');
  }

}
