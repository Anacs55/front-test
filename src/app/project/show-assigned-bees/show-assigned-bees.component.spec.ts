import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAssignedBeesComponent } from './show-assigned-bees.component';

describe('ShowAssignedBeesComponent', () => {
  let component: ShowAssignedBeesComponent;
  let fixture: ComponentFixture<ShowAssignedBeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAssignedBeesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowAssignedBeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
