import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyMessage } from './privacy-message';

describe('PrivacyMessage', () => {
  let component: PrivacyMessage;
  let fixture: ComponentFixture<PrivacyMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(PrivacyMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
