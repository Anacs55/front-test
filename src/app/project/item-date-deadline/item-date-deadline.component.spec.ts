import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDateDeadlineComponent } from './item-date-deadline.component';

describe('ItemDateDeadlineComponent', () => {
  let component: ItemDateDeadlineComponent;
  let fixture: ComponentFixture<ItemDateDeadlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDateDeadlineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDateDeadlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
