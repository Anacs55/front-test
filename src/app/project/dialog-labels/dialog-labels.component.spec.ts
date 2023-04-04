import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLabelsComponent } from './dialog-labels.component';

describe('DialogLabelsComponent', () => {
  let component: DialogLabelsComponent;
  let fixture: ComponentFixture<DialogLabelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLabelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
