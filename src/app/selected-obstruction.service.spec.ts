import { TestBed, inject } from '@angular/core/testing';

import { SelectedObstructionService } from './selected-obstruction.service';

describe('SelectedObstructionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedObstructionService]
    });
  });

  it('should ...', inject([SelectedObstructionService], (service: SelectedObstructionService) => {
    expect(service).toBeTruthy();
  }));
});
