import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTagCreateComponent } from './dialog-tag-create.component';

describe('DialogTagCreateComponent', () => {
  let component: DialogTagCreateComponent;
  let fixture: ComponentFixture<DialogTagCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTagCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTagCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
