import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingChatsComponent } from './floating-chats.component';

describe('FloatingChatsComponent', () => {
  let component: FloatingChatsComponent;
  let fixture: ComponentFixture<FloatingChatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FloatingChatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingChatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
