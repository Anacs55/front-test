import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInviteTeamMemberComponent } from './dialog-invite-team-member.component';

describe('DialogInviteTeamMemberComponent', () => {
  let component: DialogInviteTeamMemberComponent;
  let fixture: ComponentFixture<DialogInviteTeamMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogInviteTeamMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogInviteTeamMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
