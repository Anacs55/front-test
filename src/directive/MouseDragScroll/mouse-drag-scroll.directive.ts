import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[mouseDragScroll]' })
export class MouseDragScrollDirective {

  private initXPosition: number = 0;
  handleMouseMove = this.onMouseMove.bind(this);

  constructor(
    private el: ElementRef,
  ) { }

  @Input() disable = false;

  onDestroy() {
    this.el.nativeElement.removeEventListener('mousemove', this.handleMouseMove);
  }

  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    if (this.disable) return;
    const element = this.el.nativeElement;
    this.initXPosition = event.clientX;
    element.addEventListener('mousemove', this.handleMouseMove);
  }

  @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    const element = this.el.nativeElement;
    this.onDestroy();
  }

  @HostListener('mouseleave', ['$event']) onMouseLeave(event: MouseEvent) {
    this.onDestroy();
  }

  onMouseMove(event: MouseEvent) {
    if (event.clientX === this.initXPosition) return;
    const element = this.el.nativeElement;
    const clientX = event.clientX;
    element.scrollLeft = Math.round(element.scrollLeft - clientX + this.initXPosition);
    this.initXPosition = clientX;
  }
}