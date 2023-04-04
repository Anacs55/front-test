import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTinyGlobalTimeComponent } from './item-tiny-global-time.component';

describe('ItemTinyGlobalTimeComponent', () => {
  let component: ItemTinyGlobalTimeComponent;
  let fixture: ComponentFixture<ItemTinyGlobalTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTinyGlobalTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTinyGlobalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
