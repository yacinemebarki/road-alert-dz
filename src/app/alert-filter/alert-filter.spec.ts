import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertFilter } from './alert-filter';

describe('AlertFilter', () => {
  let component: AlertFilter;
  let fixture: ComponentFixture<AlertFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
