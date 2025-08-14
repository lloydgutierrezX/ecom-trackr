import { Component } from '@angular/core';
import { DynamicFormComponent } from "../../../shared/components/forms/dynamic-form.component";
import { formConfig } from './config';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DynamicFormComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerFormConfig = formConfig;
}
