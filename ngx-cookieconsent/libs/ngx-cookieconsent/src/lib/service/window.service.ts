import { Injectable } from '@angular/core';

/**
 * Service to interact with the window object.
 */
@Injectable()
export class WindowService {

  get nativeWindow(): any {
    return _window();
  }
}

function _window(): any {
  // Return the global native browser window object
  return typeof window !== 'undefined' ? window : undefined;
}
