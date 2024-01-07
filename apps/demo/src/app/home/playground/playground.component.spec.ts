import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { NgcCookieConsentModule } from 'ngx-cookieconsent';

import { PlaygroundComponent } from './playground.component';
import { MockModule, MockProvider} from 'ng-mocks';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockModule(NgcCookieConsentModule.forRoot({}))],
      providers: [MockProvider(TranslateService)],
      declarations: [ PlaygroundComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
