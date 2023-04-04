import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningScreenComponent } from './warning-screen.component';

describe('InvitationErrorScreenComponent', () => {
  let component: WarningScreenComponent;
  let fixture: ComponentFixture<WarningScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
