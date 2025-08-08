import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IFormConfig, IFormData, IFormFields } from '../../interfaces/form.interface';
import { FormGroup, FormBuilder, ReactiveFormsModule, FormControl } from '@angular/forms';
import { InputFieldComponent } from './fields/input-field/input-field.component';
import { SelectFieldComponent } from './fields/select-field/select-field.component';
import { RadioFieldComponent } from './fields/radio-field/radio-field.component';
import { TextAreaFieldComponent } from './fields/text-area-field/text-area-field.component';
import { ToggleFieldComponent } from './fields/toggle-field/toggle-field.component';
import { TelFieldComponent } from './fields/tel-field/tel-field.component';
import { FormErrorComponent } from "./errors/form-error.component";
import { mapValidators } from '../../utils/validators.util';
import { FormService } from '../../services/form/form.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent, TelFieldComponent, FormErrorComponent],
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config!: IFormConfig;
  @Input() reset: boolean = false;
  @Input() data?: IFormData;

  form!: FormGroup;
  commonInputTypes = ['text', 'number', 'password'];

  destroy$ = new Subject<void>();

  get title() {
    if (!this.config) return null;

    return this.data ? 'Update' : 'Add' + ' ' + this.config.moduleName;
  }

  get formGroup(): FormGroup {
    return this.form;
  }

  get formData(): IFormData {
    return this.form.value;
  }

  constructor(
    private fb: FormBuilder,
    private formSrvc: FormService
  ) { }

  ngOnInit(): void {
    this.formSrvc.formError$
      .pipe(takeUntil(this.destroy$))
      .subscribe(errors => {
        console.log(errors)
        if (!this.form || !errors) {
          return;
        }

        Object.entries(errors).forEach(([controlName, controlErrors]) => {
          const control = this.form.get(controlName);
          if (!control) {
            console.warn(`Control with name '${controlName}' not found in form`);
            return;
          }

          control.setErrors(controlErrors);
          control.markAsTouched();
          control.markAsDirty();
        });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && !changes['config'].firstChange) {
      const { fields } = this.config;
      this.form = this.buildForm(fields);
    }

    if (changes['reset'] && changes['reset'].currentValue === true) {
      this.resetForm();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildForm(formFields: IFormFields[]): FormGroup {
    const group: { [key: string]: any } = {};

    formFields.forEach(formField => {
      const validators = mapValidators(formField.field.validators ?? []);
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

  resetForm() {
    this.form.reset();
  }
}
