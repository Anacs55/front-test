import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputInviteMemberComponent } from './input-invite-member.component';

describe('InputDataInviteMemberComponent', () => {
  let component: InputInviteMemberComponent;
  let fixture: ComponentFixture<InputInviteMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputInviteMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputInviteMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
