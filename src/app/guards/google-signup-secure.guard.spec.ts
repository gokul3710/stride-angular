import { TestBed } from '@angular/core/testing';

import { GoogleSignupSecureGuard } from './google-signup-secure.guard';

describe('GoogleSignupSecureGuard', () => {
  let guard: GoogleSignupSecureGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GoogleSignupSecureGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
