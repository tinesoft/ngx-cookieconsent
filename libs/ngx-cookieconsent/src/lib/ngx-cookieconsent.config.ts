import { NgModule, ModuleWithProviders, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService, NgcCookieConsentConfig, NgcCookieConsentService } from './service/index';

/**
 * Provides the necessary dependencies to use the library in a Standalone Application
 */

export function provideNgcCookieConsent(config: NgcCookieConsentConfig): Provider[] {
  return [
    [WindowService, { provide: NgcCookieConsentConfig, useValue: config }, NgcCookieConsentService]
  ]
}