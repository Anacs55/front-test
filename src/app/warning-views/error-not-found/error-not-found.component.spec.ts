import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorerrorNotFoundComponent } from './error-not-found.component';

describe('ErrorFindComponent', () => {
  let component: ErrorerrorNotFoundComponent;
  let fixture: ComponentFixture<ErrorerrorNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorerrorNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorerrorNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
