import { TestBed } from '@angular/core/testing';

import { AddressGuard } from './address.guard';

describe('AddressGuard', () => {
  let guard: AddressGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AddressGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
