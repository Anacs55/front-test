import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeeChipsComponent } from './bee-chips.component';

describe('BeeChipsComponent', () => {
  let component: BeeChipsComponent;
  let fixture: ComponentFixture<BeeChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeeChipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeeChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
