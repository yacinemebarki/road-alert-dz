import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiveSection } from './servive-section';

describe('ServiveSection', () => {
  let component: ServiveSection;
  let fixture: ComponentFixture<ServiveSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiveSection],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiveSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
