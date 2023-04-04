import { TestBed } from '@angular/core/testing';

import { EventListenerService } from './eventListener.service';

describe('EventListenerService', () => {
  let service: EventListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
