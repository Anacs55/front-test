import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationLoadingScreenComponent } from './invitation-loading-screen.component';

describe('InvitationLoadingScreenComponent', () => {
  let component: InvitationLoadingScreenComponent;
  let fixture: ComponentFixture<InvitationLoadingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationLoadingScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvitationLoadingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
