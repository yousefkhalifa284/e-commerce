import { TestBed } from '@angular/core/testing';

import { AllOrdersService } from './all-orders';

describe('AllOrdersService', () => {
  let service: AllOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
