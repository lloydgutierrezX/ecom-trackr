import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IFormConfig, IFormFields } from '../../interfaces/form.interface';
import { Validators, ValidatorFn, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from './fields/input-field/input-field.component';
import { SelectFieldComponent } from './fields/select-field/select-field.component';
import { RadioFieldComponent } from './fields/radio-field/radio-field.component';
import { TextAreaFieldComponent } from './fields/text-area-field/text-area-field.component';
import { ToggleFieldComponent } from './fields/toggle-field/toggle-field.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent, SelectFieldComponent, RadioFieldComponent, TextAreaFieldComponent, ToggleFieldComponent],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges {
  @Input() config!: IFormConfig;

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && !changes['config'].firstChange) {
      const { fields } = this.config;
      this.form = this.buildForm(fields);
      console.log(this.form);
    }
  }

  buildForm(formFields: IFormFields[]): FormGroup {
    const group: { [key: string]: any } = {};

    formFields.forEach(formField => {
      const validators = this.mapValidators(formField.field.validators ?? []);
      group[formField.field.name] = this.fb.control('', validators);
    });

    return this.fb.group(group);
  }


  private mapValidators(validatorKeys: string[]): ValidatorFn[] {
    return validatorKeys.map(key => {
      switch (key) {
        case 'required':
          return Validators.required;

        case 'email':
          return Validators.email;

        case 'mobilePH':
          return Validators.pattern(/^(\+639)\d{9}$/);

        default:
          return Validators.nullValidator;
      }
    });
  }
}
