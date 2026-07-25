import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinSection } from './join-section';

describe('JoinSection', () => {
  let component: JoinSection;
  let fixture: ComponentFixture<JoinSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinSection],
    }).compileComponents();

    fixture = TestBed.createComponent(JoinSection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
