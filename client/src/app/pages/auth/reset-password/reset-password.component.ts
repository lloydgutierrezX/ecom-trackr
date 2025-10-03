import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { BrandComponent } from '../../../shared/components/brand/brand.component';
import { DynamicFormComponent } from '../../../shared/components/forms/dynamic-form.component';
import { AuthLayoutComponent } from '../auth-layout.component';
import { formConfig } from './config';
import { AuthApiService } from '../../../core/services/auth/auth-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IAuthAction, IResetPassword } from '../../../core/services/auth/auth-api.model';
import { catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    DynamicFormComponent,
    BrandComponent,
    AuthLayoutComponent,
    AlertComponent
  ],
  templateUrl: './reset-password.component.html'
})

export class ResetPasswordComponent {

  @ViewChild('authForm') authForm!: DynamicFormComponent;

  resetPasswordFormConfig = formConfig;
  action = formConfig.actions[0];

  errorMessage = '';
  successMessage = '';

  private _isLoading = false;
  get isDisabled() {
    if (!this.authForm || !this.authForm.form) {
      return true;
    }

    return this.authForm.form.invalid || this.authForm.form.pristine || this._isLoading;
  }

  set isDisabled(state: boolean) {
    this._isLoading = state;
  }

  constructor(
    private authApiSrvc: AuthApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  redirect(path: IAuthAction): void {

    if (path !== 'login' || this._isLoading) {
      return;
    }

    this.router.navigateByUrl(path);
  }

  resetPassword() {
    if (!this.authForm.form.valid) {
      return;
    }

    this.isDisabled = true;
    this.errorMessage = '';

    const formData: IResetPassword = this.authForm.form.value as IResetPassword;
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');

    if (!token) {
      this.errorMessage = 'Invalid or expired reset link.';
      this.isDisabled = false;
      return;
    }

    this.authApiSrvc.resetPassword({ ...formData, token })
      .pipe(
        tap(response => {
          console.log('Reset password successfull: ', response);
          this.successMessage = 'Your password has been reset successfully. You can now log in with your new password.';
        }),
        catchError(error => {
          console.error('Reset password failed: ', error);
          this.errorMessage = `Reset password failed. ${error.error.message}`;
          this.isDisabled = false
          return [];
        }),
      ).subscribe();
  }
}