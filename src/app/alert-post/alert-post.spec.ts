import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPost } from './alert-post';

describe('AlertPost', () => {
  let component: AlertPost;
  let fixture: ComponentFixture<AlertPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertPost],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
