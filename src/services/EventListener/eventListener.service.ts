import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';

interface Options {
  element?: any
  event: string
}

@Injectable({ providedIn: 'root' })
export class EventListenerService {
  constructor(
    private eventManager: EventManager,
    @Inject(DOCUMENT) private document: Document
  ) { }

  private readonly defaults: Partial<Options> = {
    element: this.document
  }

  add<IEvent extends Event>(event: string, preventDefault: boolean = false, element?: any) {
    const merged = { ...this.defaults, event };
    if (element) merged.element = element;

    return new Observable<IEvent>(observer => {
      const handler = (e: IEvent) => {
        preventDefault && e.preventDefault();
        observer.next(e);
      };

      const eventListener = this.eventManager.addEventListener(merged.element, merged.event, handler);
      // return launched when observable is unsubscribed
      return () => eventListener();
    })
  }
}