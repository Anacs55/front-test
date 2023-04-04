import { ComponentFixture, TestBed } from '@angular/core/testing';

import DialogDeleteAttachmentComponent from './dialog-delete-attachment.component';

describe('DialogDeleteAttachmentComponent', () => {
  let component: DialogDeleteAttachmentComponent;
  let fixture: ComponentFixture<DialogDeleteAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteAttachmentComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
