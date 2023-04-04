import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignProjectToTeamComponent } from './dialog-assign-project-to-team.component';

describe('DialogAssignProjectToTeamComponent', () => {
  let component: DialogAssignProjectToTeamComponent;
  let fixture: ComponentFixture<DialogAssignProjectToTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAssignProjectToTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAssignProjectToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
