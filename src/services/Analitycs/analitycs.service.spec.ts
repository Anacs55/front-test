import { TestBed } from '@angular/core/testing';

import AnalitycsService from './analitycs.service';

describe('AanlitycsService', () => {
  let service: AnalitycsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalitycsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
