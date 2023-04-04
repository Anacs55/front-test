import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignToTeam } from './dialog-assign-to-team.component';

describe('DialogAssignToTeamComponent', () => {
  let component: DialogAssignToTeam;
  let fixture: ComponentFixture<DialogAssignToTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAssignToTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAssignToTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
