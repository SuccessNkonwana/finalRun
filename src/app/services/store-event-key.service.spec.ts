import { TestBed } from '@angular/core/testing';

import { StoreEventKeyService } from './store-event-key.service';

describe('StoreEventKeyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreEventKeyService = TestBed.get(StoreEventKeyService);
    expect(service).toBeTruthy();
  });
});
