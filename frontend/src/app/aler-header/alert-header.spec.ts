import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertHeader } from './alert-header';

describe('ReportHeader', () => {
  let component: AlertHeader;
  let fixture: ComponentFixture<AlertHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
