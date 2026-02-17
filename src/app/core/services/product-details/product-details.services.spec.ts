import { TestBed } from '@angular/core/testing';

import { ProductDetailsServices } from './product-details.services';

describe('ProductDetailsServices', () => {
  let service: ProductDetailsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
