import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColumnColorComponent } from './select-column-color.component';

describe('SelectColorComponent', () => {
  let component: SelectColumnColorComponent;
  let fixture: ComponentFixture<SelectColumnColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectColumnColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectColumnColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
