import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPage } from './alert-page';

describe('ReportPage', () => {
  let component: AlertPage;
  let fixture: ComponentFixture<AlertPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
