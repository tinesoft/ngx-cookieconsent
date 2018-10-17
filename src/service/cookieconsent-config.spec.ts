import { NgcLawOptions } from './../model/law-options';
import { NgcHTMLElements } from './../model/html-elements';
import { NgcCookieOptions } from './../model/cookie-options';
import { NgcContentOptions } from './../model/content-options';
import { NgcPaletteOptions } from './../model/palette-options';
import { NgcLocationOptions } from './../model/location-options';


import { NgcCookieConsentConfig } from './cookieconsent-config';

describe('cookieconsent-config', () => {
    it('should have sensible default values', () => {
        const config = new NgcCookieConsentConfig();

        expect(config.enabled).toBe(true);
        expect(config.container).toBeUndefined();
        expect(config.content).toBeUndefined();
        expect(config.elements).toBeUndefined();
        expect(config.window).toBeUndefined();
        expect(config.revokeBtn).toBeUndefined();
        expect(config.compliance).toBeUndefined();
        expect(config.type).toBeUndefined();
        expect(config.layouts).toBeUndefined();
        expect(config.layout).toBeUndefined();
        expect(config.position).toBeUndefined();
        expect(config.theme).toBeUndefined();
        expect(config.static).toBeUndefined();
        expect(config.palette).toBeUndefined();
        expect(config.revokable).toBeUndefined();
        expect(config.animateRevokable).toBeUndefined();
        expect(config.showLink).toBeUndefined();
        expect(config.dismissOnScroll).toBeUndefined();
        expect(config.dismissOnTimeout).toBeUndefined();
        expect(config.autoOpen).toBeUndefined();
        expect(config.autoAttach).toBeUndefined();
        expect(config.whitelistPage).toEqual([]);
        expect(config.blacklistPage).toEqual([]);
        expect(config.overrideHTML).toBeUndefined();
        expect(config.law).toBeUndefined();
        expect(config.location).toBeUndefined();
    });

    it('should have sensible "content" default values', () => {
        const config = new NgcCookieConsentConfig();

        config.content = new NgcContentOptions();

        expect(config.content.header).toEqual('Cookies used on the website!');
        expect(config.content.message).toEqual('This website uses cookies to ensure you get the best experience on our website.');
        expect(config.content.dismiss).toEqual('Got it!');
        expect(config.content.allow).toEqual('Allow cookies');
        expect(config.content.deny).toEqual('Decline');
        expect(config.content.link).toEqual('Learn more');
        expect(config.content.href).toEqual('http://cookiesandyou.com');
        expect(config.content.close).toEqual('&#x274c;');
        expect(config.content.policy).toEqual('Cookie Policy');
        expect(config.content.target).toEqual('_blank');
    });

    it('should have sensible "cookie" default values', () => {
        const config = new NgcCookieConsentConfig();

        config.cookie = new NgcCookieOptions();

        expect(config.cookie.name).toEqual('cookieconsent_status');
        expect(config.cookie.path).toEqual('/');
        expect(config.cookie.domain).toBeUndefined();
        expect(config.cookie.expiryDays).toEqual(365);
    });

    it('should have sensible "elements" default values', () => {
        const config = new NgcCookieConsentConfig();

        config.elements = new NgcHTMLElements();

        expect(config.elements.header).toEqual( '<span class="cc-header">{{header}}</span>&nbsp;');
        expect(config.elements.message).toEqual( '<span id="cookieconsent:desc" class="cc-message">{{message}}</span>');
        expect(config.elements.messagelink).toEqual( '<span id="cookieconsent:desc" class="cc-message">{{message}} <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a></span>');
        expect(config.elements.dismiss).toEqual( '<a aria-label="dismiss cookie message" tabindex="0" class="cc-btn cc-dismiss">{{dismiss}}</a>');
        expect(config.elements.allow).toEqual( '<a aria-label="allow cookies" tabindex="0" class="cc-btn cc-allow">{{allow}}</a>');
        expect(config.elements.deny).toEqual( '<a aria-label="deny cookies" tabindex="0" class="cc-btn cc-deny">{{deny}}</a>');
        expect(config.elements.link).toEqual( '<a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{href}}" target="_blank">{{link}}</a>');
        expect(config.elements.close).toEqual( '<span aria-label="dismiss cookie message" tabindex="0" class="cc-close">{{close}}</span>');
        expect(config.elements.compliance).toBeUndefined();
    });

    it('should have sensible "law" default values', () => {
        const config = new NgcCookieConsentConfig();

        config.law = new NgcLawOptions();

        expect(config.law.countryCode).toBeUndefined();
        expect(config.law.regionalLaw).toBe(true);
    });

    it('should have sensible "location" default values', () => {
        const config = new NgcCookieConsentConfig();

        config.location = new NgcLocationOptions();

        expect(config.location.timeout).toEqual(5000);
        expect(config.location.services).toEqual(['freegeoip', 'ipinfo', 'maxmind']);
        expect(config.location.serviceDefinitions).toBeUndefined();
    });

    it('should have sensible "palette" default values', () => {
        const config = new NgcCookieConsentConfig();

        config.palette = new NgcPaletteOptions();

        expect(config.palette.popup.background).toEqual('#000000');
        expect(config.palette.popup.text).toEqual('#fff');
        expect(config.palette.popup.link).toEqual('#fff');

        expect(config.palette.button.background).toEqual('transparent');
        expect(config.palette.button.border).toEqual('#f8e71c');
        expect(config.palette.button.text).toEqual('#f8e71c');

        expect(config.palette.highlight.background).toEqual('#f8e71c');
        expect(config.palette.highlight.border).toEqual('#f8e71c');
        expect(config.palette.highlight.text).toEqual('#000000');
    });
});