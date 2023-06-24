import { TestBed } from '@angular/core/testing';

import { BankdataService } from './bankdata.service';

describe('BankdataService', () => {
  let service: BankdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
