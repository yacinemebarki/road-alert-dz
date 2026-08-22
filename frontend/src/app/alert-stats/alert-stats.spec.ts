import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertStats } from './alert-stats';

describe('AlertStats', () => {
  let component: AlertStats;
  let fixture: ComponentFixture<AlertStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertStats],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
