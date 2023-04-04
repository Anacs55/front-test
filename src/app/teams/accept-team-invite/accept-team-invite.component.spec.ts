import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptTeamInvite } from './accept-team-invite.component';

describe('AcceptTeamInviteComponent', () => {
  let component: AcceptTeamInvite;
  let fixture: ComponentFixture<AcceptTeamInvite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceptTeamInvite]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AcceptTeamInvite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
