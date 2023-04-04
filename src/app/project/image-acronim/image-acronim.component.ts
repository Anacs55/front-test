import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'image-acronim',
  templateUrl: 'image-acronim.component.html',
  styleUrls: ['image-acronim.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageAcronimComponent {

  private _text: string = '';
  acronim: string = '';

  @Input()
  set text(text: string) {
    this._text = text;
    this.acronim = this.getAcronim();
  }

  getAcronim(): string {
    const words = this._text.split(' ');
    if (words.length > 1) {
      return words[0].charAt(0) + words[1].charAt(0);
    } else {
      return words[0].charAt(0);
    }
  }
}
