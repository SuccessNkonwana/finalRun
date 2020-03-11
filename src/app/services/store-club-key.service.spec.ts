import { TestBed } from '@angular/core/testing';

import { StoreClubKeyService } from './store-club-key.service';

describe('StoreClubKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreClubKeyService = TestBed.get(StoreClubKeyService);
    expect(service).toBeTruthy();
  });
});
