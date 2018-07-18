import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { NgcCookieConsentStatus } from '../model/common-interfaces';
import { NgcStatusChangeEvent } from '../event/status-change.event';
import { NgcInitializeEvent } from '../event/initialize.event';
import { NgcCookieConsentConfig } from './cookieconsent-config';
import { WindowService } from './window.service';


/**
 * Basic interface to represent `cookieconsent` object.
 */
export interface NgcCookieConsent {
  hasTransition: boolean;
  status: NgcCookieConsentStatus;
  getStatus(): NgcCookieConsentStatus;
  initialise(config: NgcCookieConsentConfig, callback?: (popup: NgcCookieConsentPopup) => void): void;

}

/**
 * Basic interface to represent `cookieconsent.Popup` object.
 */
export interface NgcCookieConsentPopup {
  setStatus(status: NgcCookieConsentStatus): void;
  getStatus(): NgcCookieConsentStatus;
  clearStatus(): void;
  open(): NgcCookieConsentPopup;
  close(showRevoke: boolean): NgcCookieConsentPopup;
  destroy(): void;
  fadeIn(): void;
  fadeOut(): void;
  isOpen(): boolean;
  toggleRevokeButton(show: boolean): void;
  hasAnswered(): boolean;
  hasConsented(): boolean;
}


/**
 * Marker interface to indicate that an object (typically `window`) has `cookieconsent` property.
 */
export interface NgcHasCookieConsent {
  cookieconsent: NgcCookieConsent;
}


/**
 * Service to interact with Cookie Consent API.
 */
@Injectable()
export class NgcCookieConsentService {

  // the Magic Maker !
  // this objet is added to window scope when linking the cookieconsent.js library
  private cookieconsent: NgcCookieConsent;

  // the current instance of the cookie consent popup
  private popupInstance: NgcCookieConsentPopup;

  // Window Object
  private window: Window & NgcHasCookieConsent;

  private config: NgcCookieConsentConfig;

  // Observable  sources
  private popupOpenSource: Subject<void>;
  private popupCloseSource: Subject<void>;
  private InitializeSource: Subject<NgcInitializeEvent>;
  private statusChangeSource: Subject<NgcStatusChangeEvent>;
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
  initialize$: Observable<NgcInitializeEvent>;
  /**
  * Observable to subscribe to and get notified when Cookie Consent status changes.
  */
  statusChange$: Observable<NgcStatusChangeEvent>;
  /**
  * Observable to subscribe to and get notified when Cookie is revoked.
  */
  revokeChoice$: Observable<void>;

  constructor(windowService: WindowService, config: NgcCookieConsentConfig) {
    // Observable  sources
    this.popupOpenSource = new Subject<void>();
    this.popupCloseSource = new Subject<void>();
    this.InitializeSource = new Subject<NgcInitializeEvent>();
    this.statusChangeSource = new Subject<NgcStatusChangeEvent>();
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

  private checkPopupInstantiated(method: string) {
    if (this.popupInstance == null) {
      throw new Error(`Cookie popup has not yet been instantiated. Cannot invoke ${method}()`);
    }
  }

  /**
   * Initializes Cookie Consent with the provided configuration.
   * @param config the configuration object
   */
  init(config: NgcCookieConsentConfig): void {

    if (this.window) { // For Angular Universal suport
      this.cookieconsent = this.window.cookieconsent;

      this.config = config;
      // Set callbacks hooks:
      this.config.onPopupOpen =
        () => this.popupOpenSource.next();

      this.config.onPopupClose =
        () => this.popupCloseSource.next();

      this.config.onInitialise =
        (status: 'allow' | 'deny' | 'dismiss') => this.InitializeSource.next({ status: status });

      this.config.onStatusChange =
        (status: 'allow' | 'deny' | 'dismiss', chosenBefore: boolean) => {
          this.statusChangeSource.next({ status: status, chosenBefore: chosenBefore });
        };

      this.config.onRevokeChoice =
        () => this.revokeChoiceSource.next();

      // Init the cookieconsent library with injected config
      this.cookieconsent.initialise(this.config, (popup: NgcCookieConsentPopup) => this.popupInstance = popup);
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
  getStatus(): NgcCookieConsentStatus {
    return this.cookieconsent.status;
  }

  /**
   * Gets the current browser support for translations
   */
  getTransition(): boolean {
    return this.cookieconsent.hasTransition;
  }

  /**
   * Clears the current cookie status.
   */
  clearStatus(): void {
    this.checkPopupInstantiated('clearStatus');
    return this.popupInstance.clearStatus();
  }

  open(): NgcCookieConsentPopup {
    this.checkPopupInstantiated('open');
    return this.popupInstance.open();
  }

  close(showRevoke: boolean): NgcCookieConsentPopup {
    this.checkPopupInstantiated('close');
    return this.popupInstance.close(showRevoke);
  }

  destroy(): void {
    this.checkPopupInstantiated('destroy');
    this.popupInstance.destroy();
  }

  fadeIn(): void {
    this.checkPopupInstantiated('fadeIn');
    this.popupInstance.fadeIn();
  }

  fadeOut(): void {
    this.checkPopupInstantiated('fadeOut');
    this.popupInstance.fadeOut();
  }

  isOpen(): boolean {
    this.checkPopupInstantiated('isOpen');
    return this.popupInstance.isOpen();
  }

  toggleRevokeButton(show: boolean): void {
    this.checkPopupInstantiated('toggleRevokeButton');
    this.popupInstance.toggleRevokeButton(show);
  }

  hasAnswered(): boolean {
    this.checkPopupInstantiated('hasAnswered');
    return this.popupInstance.hasAnswered();
  }

  hasConsented(): boolean {
    this.checkPopupInstantiated('hasConsented');
    return this.popupInstance.hasConsented();
  }
}
