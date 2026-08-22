import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpInputs } from './sign-up-inputs';

describe('SignUpInputs', () => {
  let component: SignUpInputs;
  let fixture: ComponentFixture<SignUpInputs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpInputs],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpInputs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
