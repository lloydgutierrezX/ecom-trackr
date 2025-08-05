import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mobilePh',
  standalone: true
})
export class MobilePhPipe implements PipeTransform {

  transform(value?: string | null): string {

    if (!value) return '';

    const cleaned = value.replace(/\D+/g, '');
    if (!cleaned.startsWith('639')) return value;

    return cleaned.replace(/^(639)(\d{3})(\d{3})(\d{4})?$/, '+$1 $2 $3 $4').trim();
  }

}
