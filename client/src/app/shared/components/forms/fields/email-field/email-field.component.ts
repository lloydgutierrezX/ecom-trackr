import { Component, Input } from '@angular/core';
import { BaseFormController } from '../../base-form-control';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IFormFields } from '../../../../interfaces/form.interface';
import { IconsComponent } from "../../../icons/icons.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconsComponent],
  templateUrl: './email-field.component.html'
})
export class EmailFieldComponent extends BaseFormController<string> {
  @Input() formControl!: FormControl;
  @Input() config!: IFormFields;
}
