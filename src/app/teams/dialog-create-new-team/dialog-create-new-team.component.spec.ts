import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateNewTeamComponent } from './dialog-create-new-team.component';

describe('DialogCreateNewTeamComponent', () => {
  let component: DialogCreateNewTeamComponent;
  let fixture: ComponentFixture<DialogCreateNewTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreateNewTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateNewTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
