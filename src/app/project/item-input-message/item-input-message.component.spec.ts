import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemInputMessageComponent } from './item-input-message.component';

describe('ItemInputMessageComponent', () => {
  let component: ItemInputMessageComponent;
  let fixture: ComponentFixture<ItemInputMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemInputMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemInputMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
