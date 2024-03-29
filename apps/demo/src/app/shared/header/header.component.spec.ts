import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';
import { RouterLinkStubDirective, RouterLinkActiveStubDirective } from './../../../testing/router-stubs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let linkDes: DebugElement[];
  let links: RouterLinkStubDirective[];

  beforeEach(waitForAsync(() => {
    TestBed
      .overrideComponent(HeaderComponent, {
        set: {
          imports: [RouterLinkStubDirective,
            RouterLinkActiveStubDirective, NgbCollapseModule]
        },
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    // trigger initial data binding
    fixture.detectChanges();

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));

    // get the attached link directive instances using the DebugElement injectors
    links = linkDes.map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can get RouterLinks from template', () => {
    expect(links.length).toBe(2);
    expect(links[0].linkParams).toBe('/home');
    expect(links[1].linkParams).toBe('/getting-started');
  });

  it('can click Home link in template', () => {
    const homeLinkDe = linkDes[0];
    const homeLink = links[0];

    expect(homeLink.navigatedTo).toBeNull();

    homeLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(homeLink.navigatedTo).toBe('/home');
  });

  it('can click GettingStarted link in template', () => {
    const gettingStartedLinkDe = linkDes[1];
    const gettingStartedLink = links[1];

    expect(gettingStartedLink.navigatedTo).toBeNull();

    gettingStartedLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(gettingStartedLink.navigatedTo).toBe('/getting-started');
  });
});
