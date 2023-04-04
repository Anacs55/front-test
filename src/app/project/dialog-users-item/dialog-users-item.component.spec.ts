import { ComponentFixture, TestBed } from '@angular/core/testing';

import DialogUsersItemComponent from './dialog-users-item.component';

describe('DialogUsersItemComponent', () => {
  let component: DialogUsersItemComponent;
  let fixture: ComponentFixture<DialogUsersItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUsersItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUsersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
