/* tslint:disable:no-unused-variable */

import { DOCUMENT } from '@angular/common';
import { TestBed, inject } from '@angular/core/testing';
import { WindowService } from './window.service';

declare const document: Document

describe('Service: Window, Angular Tests', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: document}, WindowService]
    });
  });

  it('should inject the service instance...', inject([WindowService], (service: WindowService) => {
    expect(service).toBeTruthy();
    expect(service.nativeWindow).toBeDefined();
    expect(service.nativeWindow).toBe(window);
  }));
});

