import { TestBed } from '@angular/core/testing';

import { EventupdateService } from './eventupdate.service';

describe('EventupdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventupdateService = TestBed.get(EventupdateService);
    expect(service).toBeTruthy();
  });
});
