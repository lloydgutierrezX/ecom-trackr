import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { formConfig } from './config';
import { IFormConfig } from '../../../../shared/interfaces/form.interface';
import { DynamicFormComponent } from '../../../../shared/components/forms/dynamic-form.component';
import { NgTemplateOutlet } from '@angular/common';
import { IAuthAction, ILoginAuthForm } from '../../../../core/services/auth/auth-api.model';

@Component({
  selector: 'app-signin-form',
  standalone: true,
  imports: [DynamicFormComponent, NgTemplateOutlet],
  templateUrl: './signin-form.component.html'
})
export class SigninFormComponent {
  @Output() redirectEmitter = new EventEmitter<IAuthAction>();
  @Output() submitFormEmitter = new EventEmitter<ILoginAuthForm>();
  @ViewChild('authForm') authForm!: DynamicFormComponent;

  @Input() isLoading!: boolean;

  signInFormConfig: IFormConfig = formConfig;
  reset: boolean = false;

  get isButtonDisabled(): boolean {
    if (!this.authForm || !this.authForm.form) {
      return true;
    }

    return this.authForm.form.invalid || this.authForm.form.pristine || this.isLoading;
  }

  login(): void {
    if (this.authForm.form.valid) {
      const authFormData: ILoginAuthForm = this.authForm.form.value as ILoginAuthForm;
      this.submitFormEmitter.emit(authFormData);
    }
  }

  redirect(path: IAuthAction): void {
    this.redirectEmitter.emit(path);
  }
}
