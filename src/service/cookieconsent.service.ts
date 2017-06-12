import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

import { StatusChangeEvent } from '../event/status-change.event';
import { InitializeEvent } from '../event/Initialize.event';
import { NgcCookieConsentConfig } from './cookieconsent-config';
import { WindowService } from "./window.service";


/**
 * Basic interface to represent cookieconsent object
 */
export interface CoookieConsent {
  status: CookieConsentStatus;
  hasTransition: boolean;
  initialise(config: NgcCookieConsentConfig);
}

/**
 * Interface representing the cookie consent status
 */
export interface CookieConsentStatus {
  [key: string]: 'deny' | 'allow' | 'dismiss';
  allow?: 'allow';
  deny?: 'deny';
  dismiss?: 'dismiss';
}

export interface HasCoookieConsent {
  cookieconsent: CoookieConsent;
}

/**
 * Service to interact with Cookie Consent API.
 */
@Injectable()
export class NgcCookieConsentService {

  // the Magic Maker !
  // this objet is added to window scope when linking the cookieconsent.js library
  private cookieconsent: CoookieConsent;
  // Window Object
  private window: Window & HasCoookieConsent;

  private config: NgcCookieConsentConfig;

  // Observable  sources
  private popupOpenSource: Subject<void>;
  private popupCloseSource: Subject<void>;
  private InitializeSource: Subject<InitializeEvent>;
  private statusChangeSource: Subject<StatusChangeEvent>;
  private revokeChoiceSource: Subject<void>;

  /**
   * Observable to subscribe to and get notified when Cookie Consent popup opens.
   */
  popupOpen$: Observable<void>;
  /**
   * Observable to subscribe to and get notified when Cookie Consent popup closes.
   */
  popupClose$: Observable<void>;
  /**
   * Observable to subscribe to and get notified when Cookie Consent initializes.
   */
  initialize$: Observable<InitializeEvent>;
  /**
  * Observable to subscribe to and get notified when Cookie Consent status changes.
  */
  statusChange$: Observable<StatusChangeEvent>;
  /**
  * Observable to subscribe to and get notified when Cookie is revoked.
  */
  revokeChoice$: Observable<void>;

  constructor(windowService: WindowService, config: NgcCookieConsentConfig) {
    // Observable  sources
    this.popupOpenSource = new Subject<void>();
    this.popupCloseSource = new Subject<void>();
    this.InitializeSource = new Subject<InitializeEvent>();
    this.statusChangeSource = new Subject<StatusChangeEvent>();
    this.revokeChoiceSource = new Subject<void>();

    // Observable  streams
    this.popupOpen$ = this.popupOpenSource.asObservable();
    this.popupClose$ = this.popupCloseSource.asObservable();
    this.initialize$ = this.InitializeSource.asObservable();
    this.statusChange$ = this.statusChangeSource.asObservable();
    this.revokeChoice$ = this.revokeChoiceSource.asObservable();

    this.window = windowService.nativeWindow;

    this.init(config);

  }


  /**
   * Initializes Cookie Consent with the provided configuration.
   * @param config the configuration object
   */
  init(config: NgcCookieConsentConfig): void {

    if (this.window) {// for Angular Universal suport
      this.cookieconsent = this.window.cookieconsent;

      this.config = config || {};
      //set callbacks hooks:
      this.config.onPopupOpen = () => this.popupOpenSource.next();
      this.config.onPopupClose = () => this.popupCloseSource.next();
      this.config.onInitialize = (status: string) => this.InitializeSource.next({ status: status });
      this.config.onStatusChange = (status: string, chosenBefore: boolean) => this.statusChangeSource.next({ status: status, chosenBefore: chosenBefore });
      this.config.onRevokeChoice = () => this.revokeChoiceSource.next();

      // init the cookieconsent library with injected config
      this.cookieconsent.initialise(this.config);
    }
  }

/**
 * Gets the current configuration  used by the Cookie Consent.
 */
  getConfig(): NgcCookieConsentConfig {
    return this.config;
  }

/**
 * Gets the current cookie status.
 */
  getStatus(): CookieConsentStatus {
    return this.cookieconsent.status;
  }

/**
 * Gets the current browser support for translations
 */
  getTransition(): boolean {
    return this.cookieconsent.hasTransition;
  }


}
