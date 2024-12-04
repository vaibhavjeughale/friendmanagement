import { TestBed } from '@angular/core/testing';

import { CanMatchAuthGuard } from './can-match-auth.guard';

describe('CanMatchAuthGuard', () => {
  let guard: CanMatchAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanMatchAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
