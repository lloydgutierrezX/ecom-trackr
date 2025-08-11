import { Component, forwardRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IFormFields } from '../../../../interfaces/form.interface';
import { CommonModule } from '@angular/common';
import { BaseFormController } from '../../base-form-control';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    }
  ]
})
export class InputFieldComponent extends BaseFormController<string | number> implements OnChanges {
  @Input() formControl!: FormControl;
  @Input() config!: IFormFields;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }
}
