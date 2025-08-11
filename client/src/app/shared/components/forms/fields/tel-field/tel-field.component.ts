import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IFormFields } from '../../../../interfaces/form.interface';
import { CommonModule } from '@angular/common';
import { BaseFormController } from '../../base-form-control';
import { IconsComponent } from '../../../icons/icons.component';

@Component({
  selector: 'app-tel-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsComponent],
  templateUrl: './tel-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TelFieldComponent),
      multi: true,
    }
  ]
})
export class TelFieldComponent extends BaseFormController<string> implements OnChanges {
  @Input() formControl!: FormControl;
  @Input() config!: IFormFields;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  // handleInput(event: Event): void {
  //   const raw = (event.target as HTMLInputElement).value;
  //   let digits = raw.replace(/\D+/g, '');


  //   console.log('digits', digits)

  //   // digits = digits.length === 1 && digits === '6' || digits.startsWith('0') ?
  //   //   digits.slice(1) :
  //   //   digits.slice(2);

  //   if (digits.length > 0) {

  //   }


  //   formatted += digits.slice(0, 10);

  //   this.value = formatted;
  //   (event.target as HTMLInputElement).value = formatted;
  //   // Store value as +63917XXXXXXX
  //   this.onChange('+63' + digits);
  // }
}
