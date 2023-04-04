import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localDatePipe',
})
export class LocalDatePipe implements PipeTransform {
  constructor(
    private translateService: TranslateService
  ) {

  }
  private readonly options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  transform(value: number): string {
    return new Intl.DateTimeFormat(this.translateService.currentLang, this.options).format(new Date(value));
  }
}