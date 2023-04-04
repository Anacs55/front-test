import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectColorComponent } from './dialog-select-color.component';

describe('DialogSelectColorComponent', () => {
  let component: DialogSelectColorComponent;
  let fixture: ComponentFixture<DialogSelectColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSelectColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSelectColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
