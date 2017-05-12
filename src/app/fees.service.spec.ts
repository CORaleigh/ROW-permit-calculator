import { TestBed, inject } from '@angular/core/testing';

import { FeesService } from './fees.service';

describe('FeesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeesService]
    });
  });

  it('should ...', inject([FeesService], (service: FeesService) => {
    expect(service).toBeTruthy();
  }));
});
