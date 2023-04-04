import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectView } from './project-view.component';

describe('ProjectView', () => {
  let component: ProjectView;
  let fixture: ComponentFixture<ProjectView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectView]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
