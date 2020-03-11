import { TestBed } from '@angular/core/testing';

import { ClubupdateService } from './clubupdate.service';

describe('ClubupdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClubupdateService = TestBed.get(ClubupdateService);
    expect(service).toBeTruthy();
  });
});
