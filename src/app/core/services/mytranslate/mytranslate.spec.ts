import { TestBed } from '@angular/core/testing';

import { Mytranslate } from './mytranslate';

describe('Mytranslate', () => {
  let service: Mytranslate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Mytranslate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
