import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineCreatorComponent } from './inline-creator.component';

describe('InlineCreatorComponent', () => {
  let component: InlineCreatorComponent;
  let fixture: ComponentFixture<InlineCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlineCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
