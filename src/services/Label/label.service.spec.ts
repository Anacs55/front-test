import { TestBed } from '@angular/core/testing';

import { TagService } from './label.service';

describe('LabelService', () => {
  let service: TagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
