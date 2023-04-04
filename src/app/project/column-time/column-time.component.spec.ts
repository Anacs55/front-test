import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTimeComponent } from './column-time.component';

describe('ColumnTimeComponent', () => {
  let component: ColumnTimeComponent;
  let fixture: ComponentFixture<ColumnTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColumnTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
