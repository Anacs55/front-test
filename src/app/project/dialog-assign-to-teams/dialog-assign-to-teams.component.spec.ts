import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignToTeams } from './dialog-assign-to-teams.component';

describe('DialogAssignToTeamsComponent', () => {
  let component: DialogAssignToTeams;
  let fixture: ComponentFixture<DialogAssignToTeams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogAssignToTeams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAssignToTeams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
