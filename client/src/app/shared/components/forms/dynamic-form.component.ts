import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IFormConfig, IFormData, IFormFields } from '../../interfaces/form.interface';
import { Validators, ValidatorFn, FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputFieldComponent } from './fields/input-field/input-field.component';
import { SelectFieldComponent } from './fields/select-field/select-field.component';
import { RadioFieldComponent } from './fields/radio-field/radio-field.component';
import { TextAreaFieldComponent } from './fields/text-area-field/text-area-field.component';
import { ToggleFieldComponent } from './fields/toggle-field/toggle-field.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges {
  @Input() config!: IFormConfig;
  @Input() data?: IFormData;

  form!: FormGroup;

  get title() {
    if (!this.config) return null;

    return this.data ? 'Update' : 'Add' + ' ' + this.config.moduleName;
  }

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

  getControl(name: string): FormControl {
    const control = this.form.get(name);
    if (!control) {
      throw new Error(`FormControl with name '${name}' not found`);
    }
    return control as FormControl;
  }

  private mapValidators(validatorKeys: string[]): ValidatorFn[] {
    return validatorKeys.map(key => {
      switch (key) {
        case 'required':
          return Validators.required;

        case 'number':
          return Validators.pattern(/^\d+$/);

        case 'email':
          return Validators.email;

        case 'mobilePH':
          return Validators.pattern(/^\+639\d{9}$/);

        default:
          return Validators.nullValidator;
      }
    });
  }
}
