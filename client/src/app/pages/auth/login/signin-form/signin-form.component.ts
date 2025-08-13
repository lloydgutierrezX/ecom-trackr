import { Component } from '@angular/core';
import { formConfig } from './config';
import { IFormConfig } from '../../../../shared/interfaces/form.interface';
import { DynamicFormComponent } from '../../../../shared/components/forms/dynamic-form.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [DynamicFormComponent, NgTemplateOutlet],
  templateUrl: './signin-form.component.html'
})
export class SigninFormComponent {
  signInFormConfig: IFormConfig = formConfig;
  reset: boolean = false;

  onClick(action: string): void {

  }
}
