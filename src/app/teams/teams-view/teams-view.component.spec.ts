import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsView } from './teams-view.component';

describe('TeamsViewComponent', () => {
  let component: TeamsView;
  let fixture: ComponentFixture<TeamsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamsView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamsView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
