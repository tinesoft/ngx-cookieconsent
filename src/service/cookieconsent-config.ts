import { Injectable } from '@angular/core';

import { NgcHTMLElements } from '../model/html-elements';
import { NgcLocationOptions } from '../model/location-options';
import { NgcLawOptions } from '../model/law-options';
import { NgcContentOptions } from '../model/content-options';
import { NgcCookieOptions } from '../model/cookie-options';
import { NgcPaletteOptions } from '../model/palette-options';
import { NgcCompliance, NgcLayouts } from '../model/common-interfaces';
import { NgcCookieType, NgcCookieLayout, NgcCookiePosition, NgcCookieTheme } from '../model/common-types';


/**
 * Cookie Consent configuration object.
 */
@Injectable()
export class NgcCookieConsentConfig {

  /**
   * If false, this prevents the popup from showing (useful for giving to control to another piece of code)
   */
  enabled?= true;
  /**
   * Optional (expecting a HTML element) if passed, the popup is appended to this element. default is `document.body`
   */
  container?: HTMLElement;

  /**
   * Defaults cookie options - it is RECOMMENDED to set these values to correspond with your server
   */
  cookie: NgcCookieOptions;

  /**
   * Each item defines the inner text for the element that it references
   */
  content?: NgcContentOptions;

  /**
   * This is the HTML for the elements above. The string {{header}} will be replaced with the equivalent text below.
   * You can remove '{{header}}' and write the content directly inside the HTML if you want.
   * - ARIA rules suggest to ensure controls are tabbable (so the browser can find the first control),
   *    and to set the focus to the first interactive control (http://w3c.github.io/aria-in-html/)
   */
  elements?: NgcHTMLElements;

  /**
   * The placeholders {{classes}} and {{children}} both get replaced during initialisation:
   * - {{classes}} is where additional classes get added
   * - {{children}} is where the HTML children are placed
   */
  window?: string;

  /**
   * This is the html for the revoke button. This only shows up after the user has selected their level of consent
   * It can be enabled of disabled using the `revokable` option
   */
  revokeBtn?: string;

  /**
   * Define types of 'compliance' here. '{{value}}' strings in here are linked to `elements`
   */
  compliance?: NgcCompliance;

  /**
   * Select your type of popup here
   * refers to `compliance` (in other words, the buttons that are displayed)
   */
  type?: NgcCookieType;

  /**
   * define layout layouts here
   */
  layouts?: NgcLayouts;

  /**
   * Default layout (see above)
   */
  layout?: NgcCookieLayout;

  /**
   * This refers to the popup windows position. we currently support:
   * - banner positions: top, bottom
   * - floating positions: top-left, top-right, bottom-left, bottom-right
  *
   * adds a class `cc-floating` or `cc-banner` which helps when styling
   */
  position?: NgcCookiePosition;

  /**
   * Available styles
   * - block (default, no extra classes)
   * - edgeless
   * - classic
   * Use your own style name and use `.cc-theme-STYLENAME` class in CSS to edit.
   * Note: style 'wire' is used for the configurator, but has no CSS styles of its own, only palette is used.
   */
  theme?: NgcCookieTheme;

  /**
   * The popup is `fixed` by default, but if you want it to be static (inline with the page content), set this to false
   * Note: by default, we animate the height of the popup from 0 to full size
   */
  static?: boolean;

  /**
   * If you want custom colours, pass them in here. this object should look like this.
   * ideally, any custom colours/themes should be created in a separate style sheet, as this is more efficient.
   *
   * {
   *     popup: {background: '#000000', text: '#fff', link: '#fff'},//
   *     button: {background: 'transparent', border: '#f8e71c', text: '#f8e71c'},//
   *     highlight: {background: '#f8e71c', border: '#f8e71c', text: '#000000'},//
   * }
   *
   * `highlight` is optional and extends `button`. if it exists, it will apply to the first button
   * only background needs to be defined for every element. if not set, other colors can be calculated from it
   */
  palette?: NgcPaletteOptions;

  /**
   * Some countries REQUIRE that a user can change their mind. You can configure this yourself.
   * Most of the time this should be false, but the `cookieconsent.law` can change this to `true` if it detects that it should
   */
  revokable?: boolean;
  /**
   * If true, the revokable button will tranlate in and out
   */
  animateRevokable?: boolean;

  /**
   * Used to disable link on existing layouts
   * replaces element messagelink with message and removes content of link
   */
  showLink?: boolean;

  /**
   * Set value as scroll range to enable
   */
  dismissOnScroll?: boolean | number;

  /**
   * Set value as time in milliseconds to autodismiss after set time
   */
  dismissOnTimeout?: boolean | number;

  /**
   * The application automatically decide whether the popup should open.
   * Set this to false to prevent this from happening and to allow you to control the behaviour yourself
   */
  autoOpen?: boolean;

  /**
   * By default the created HTML is automatically appended to the container (which defaults to <body>). You can prevent this behaviour
   * by setting this to false, but if you do, you must attach the `element` yourself, which is a public property of the popup instance:
   *
   * var instance = cookieconsent.factory(options);
   * document.body.appendChild(instance.element);
   *
    */
  autoAttach?: boolean;

  /**
   * Simple whitelist for pages. specify page by:
   * - using a string : '/index.html'           (matches '/index.html' exactly) OR
   * - using RegExp   : /\/page_[\d]+\.html/    (matched '/page_1.html' and '/page_2.html' etc)
   *
   */
  whitelistPage?: string[] = [];
  /**
   * Simple blacklist for pages. specify page by:
   * - using a string : '/index.html'           (matches '/index.html' exactly) OR
   * - using RegExp   : /\/page_[\d]+\.html/    (matched '/page_1.html' and '/page_2.html' etc)
   *
   */
  blacklistPage?: string[] = [];

  /**
   * If this is defined, then it is used as the inner html instead of layout. This allows for ultimate customisation.
   * Be sure to use the classes `cc-btn` and `cc-allow`, `cc-deny` or `cc-dismiss`. They enable the app to register click
   * handlers. You can use other pre-existing classes too. See `src/styles` folder.
   *
   */
  overrideHTML?: string;

  /**
   * Law Options
   */
  law?: NgcLawOptions;

  /**
   * Location Options
   */
  location?: NgcLocationOptions;

  /**
   * Set value as click anything on the page, excluding the `ignoreClicksFrom` below (if we click on the revoke button etc)
   */
  dismissOnWindowClick?: boolean;

  /**
   * If `dismissOnWindowClick` is true, we can click on 'revoke' and we'll still dismiss the banner, so we need exceptions.
   * Should be an array of class names (not CSS selectors).
   */
  ignoreClicksFrom?: string[];

  // these callback hooks are called at certain points in the program execution
  onPopupOpen?: () => void;
  onPopupClose?: () => void;
  onInitialise?: (status: string) => void;
  onStatusChange?: (status: string, chosenBefore: boolean) => void;
  onRevokeChoice?: () => void;
  onNoCookieLaw?: (countryCode: string, country: string) => void;

}
