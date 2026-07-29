import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Verfication } from './verfication';

describe('Verfication', () => {
  let component: Verfication;
  let fixture: ComponentFixture<Verfication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Verfication],
    }).compileComponents();

    fixture = TestBed.createComponent(Verfication);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
