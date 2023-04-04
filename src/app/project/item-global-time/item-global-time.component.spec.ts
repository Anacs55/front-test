import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemGlobalTimeComponent } from './item-global-time.component';

describe('ItemGlobalTimeComponent', () => {
  let component: ItemGlobalTimeComponent;
  let fixture: ComponentFixture<ItemGlobalTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemGlobalTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGlobalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
