import { TestBed } from '@angular/core/testing';

import { GoogleSignupGuard } from './google-signup.guard';

describe('GoogleSignupGuard', () => {
  let guard: GoogleSignupGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GoogleSignupGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
