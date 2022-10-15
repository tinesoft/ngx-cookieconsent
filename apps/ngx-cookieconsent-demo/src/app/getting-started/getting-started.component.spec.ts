import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { GettingStartedComponent } from './getting-started.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('GettingStartedComponent', () => {
  let component: GettingStartedComponent;
  let fixture: ComponentFixture<GettingStartedComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      declarations: [GettingStartedComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(GettingStartedComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
