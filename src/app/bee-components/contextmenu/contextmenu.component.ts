import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'contextmenu',
  templateUrl: 'contextmenu.component.html',
  styleUrls: ['contextmenu.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuComponent {
  @ViewChild(MatMenuTrigger) menuTrigger?: MatMenuTrigger;

  private readonly defaultPosition: Position = { x: 0, y: 0 };
  position: Position = this.defaultPosition;
  style: any = {};

  openMenu(position?: Position) {
    this.position = position ? position : this.defaultPosition;
    this.style = {
      top: this.position.y + 'px',
      left: this.position.x + 'px',
      position: position ? 'absolute' : 'relative',
    };
    this.menuTrigger?.openMenu();
  }
}

interface Position {
  x: number
  y: number
}