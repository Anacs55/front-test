import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMessageComponent } from './item-message.component';

describe('ItemMessageComponent', () => {
  let component: ItemMessageComponent;
  let fixture: ComponentFixture<ItemMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
