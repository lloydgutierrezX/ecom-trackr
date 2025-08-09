import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobilePh',
  standalone: true
})
export class MobilePhPipe implements PipeTransform {

  transform(value?: string | null): string {

    if (!value) return '';

    // const cleaned = value.replace(/\D+/g, '');
    // if (!cleaned.startsWith('639')) return value;

    // return cleaned.replace(/^(639)(\d{3})(\d{3})(\d{4})?$/, '+$1 $2 $3 $4').trim();

    return value.slice(0, 3) + ' ' +
      value.slice(3, 6) + ' ' +
      value.slice(6, 9) + ' ' +
      value.slice(9);
  }

}
