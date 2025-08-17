import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { IFormFields } from '../../../../interfaces/form.interface';
import { CommonModule } from '@angular/common';
import { BaseFormController } from '../../base-form-control';
import { IconsComponent } from "../../../icons/icons.component";
import { ToggleFieldComponent } from '../toggle-field/toggle-field.component';

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsComponent, ToggleFieldComponent],
  templateUrl: './input-field.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    }
  ]
})
export class InputFieldComponent extends BaseFormController<string | number> {
  @Input() formControl!: FormControl;
  @Input() config!: IFormFields;

  showPassword = false;

  get type(): string {
    if (this.config.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }

    return this.config.type ?? 'text';
  }

  get passwordIcon(): string {
    return this.showPassword ? 'eye-off' : 'eye';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
