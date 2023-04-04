import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShareLinkComponent } from './dialog-share-link.component';

describe('DialogShareLinkComponent', () => {
  let component: DialogShareLinkComponent;
  let fixture: ComponentFixture<DialogShareLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogShareLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogShareLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
