'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ngx-cookieconsent documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/NgcCookieConsentModule.html" data-type="entity-link" >NgcCookieConsentModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/NgcContentOptions.html" data-type="entity-link" >NgcContentOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgcCookieOptions.html" data-type="entity-link" >NgcCookieOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgcHTMLElements.html" data-type="entity-link" >NgcHTMLElements</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgcLawOptions.html" data-type="entity-link" >NgcLawOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgcLocationOptions.html" data-type="entity-link" >NgcLocationOptions</a>
                            </li>
                            <li class="link">
                                <a href="classes/NgcPaletteOptions.html" data-type="entity-link" >NgcPaletteOptions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/NgcCookieConsentConfig.html" data-type="entity-link" >NgcCookieConsentConfig</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NgcCookieConsentService.html" data-type="entity-link" >NgcCookieConsentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WindowService.html" data-type="entity-link" >WindowService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/NgcCompliance.html" data-type="entity-link" >NgcCompliance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcCookieConsent.html" data-type="entity-link" >NgcCookieConsent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcCookieConsentPopup.html" data-type="entity-link" >NgcCookieConsentPopup</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcCookieConsentStatus.html" data-type="entity-link" >NgcCookieConsentStatus</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcHasCookieConsent.html" data-type="entity-link" >NgcHasCookieConsent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcInitializationErrorEvent.html" data-type="entity-link" >NgcInitializationErrorEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcInitializingEvent.html" data-type="entity-link" >NgcInitializingEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcLayouts.html" data-type="entity-link" >NgcLayouts</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcNoCookieLawEvent.html" data-type="entity-link" >NgcNoCookieLawEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcPalette.html" data-type="entity-link" >NgcPalette</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NgcStatusChangeEvent.html" data-type="entity-link" >NgcStatusChangeEvent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});