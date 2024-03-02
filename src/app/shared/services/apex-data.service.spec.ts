import { TestBed } from '@angular/core/testing';

import { ApexDataService } from './apex-data.service';

describe('ApexDataService', () => {
  let service: ApexDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApexDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
