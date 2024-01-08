import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { appConfig } from '../../app.config';
import { PlaygroundComponent } from './playground.component';


describe('PlaygroundComponent', () => {
  let component: PlaygroundComponent;
  let fixture: ComponentFixture<PlaygroundComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule(Object.assign({}, appConfig, {
      schemas: [NO_ERRORS_SCHEMA]
    }))
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
