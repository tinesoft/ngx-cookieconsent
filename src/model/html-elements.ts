/* tslint:disable:max-line-length */
/**
 * HTML Elements
 */
export class NgcHTMLElements {

  header ? = '<span class="cc-header">{{header}}</span>&nbsp;';

  message ? = '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>';

  messagelink ? = '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>';

  dismiss ? = '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>';

  allow ? = '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow">{{allow}}</a>';

  deny ? = '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny">{{deny}}</a>';

  link ? = '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>';

  close ? = '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close">{{close}}</span>';

  [key: string]: string;
}
