import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

/**
 * Service to interact with the `window` object (or its equivalent on a server platform).
 */
@Injectable()
export class WindowService {

  constructor(@Inject(DOCUMENT) private _doc: Document) {}

  get nativeWindow(): any {
    return this._doc?.defaultView || window;
  }
}

