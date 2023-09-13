import { TestBed } from '@angular/core/testing';

import { SigninGuard } from './signin.guard';

describe('SigninGuard', () => {
  let guard: SigninGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SigninGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
