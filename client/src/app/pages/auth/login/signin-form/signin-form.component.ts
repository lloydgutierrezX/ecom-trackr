import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { formConfig } from './config';
import { IFormConfig } from '../../../../shared/interfaces/form.interface';
import { DynamicFormComponent } from '../../../../shared/components/forms/dynamic-form.component';
import { NgTemplateOutlet } from '@angular/common';
import { ILoginAuthForm } from '../../../../core/services/auth/auth-api.model';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [DynamicFormComponent, NgTemplateOutlet],
  templateUrl: './signin-form.component.html'
})
export class SigninFormComponent {
  @Output() submitForm = new EventEmitter<ILoginAuthForm>();
  @ViewChild('authForm') authForm!: DynamicFormComponent;

  signInFormConfig: IFormConfig = formConfig;
  reset: boolean = false;

  get isButtonDisabled(): boolean {
    if (!this.authForm || !this.authForm.form) {
      return true;
    }
    return this.authForm.form.invalid || this.authForm.form.pristine;
  }

  login(): void {
    if (this.authForm.form.valid) {
      const authFormData: ILoginAuthForm = this.authForm.form.value as ILoginAuthForm;
      this.submitForm.emit(authFormData);
    }
  }

  redirect(path: string): void {

  }
}
