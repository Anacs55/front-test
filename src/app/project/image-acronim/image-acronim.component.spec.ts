import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAcronimComponent } from './image-acronim.component';

describe('ImageAcronimComponent', () => {
  let component: ImageAcronimComponent;
  let fixture: ComponentFixture<ImageAcronimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAcronimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageAcronimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
