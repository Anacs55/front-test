import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsView } from './projects-view.component';

describe('DashView', () => {
  let component: ProjectsView;
  let fixture: ComponentFixture<ProjectsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsView]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
