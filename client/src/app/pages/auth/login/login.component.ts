import { Component, ViewChild } from '@angular/core';
import { BrandComponent } from '../../../shared/components/brand/brand.component';
import { IAuthAction, ILoginAuthForm } from '../../../core/services/auth/auth-api.model';
import { AuthApiService } from '../../../core/services/auth/auth-api.service';
import { catchError, finalize, tap } from 'rxjs';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { Router } from '@angular/router';
import { AuthLayoutComponent } from "../auth-layout.component";
import { DynamicFormComponent } from '../../../shared/components/forms/dynamic-form.component';
import { NgTemplateOutlet } from '@angular/common';
import { IFormConfig } from '../../../shared/interfaces/form.interface';
import { formConfig } from './config';
import { AlertComponent } from "../../../shared/components/alert/alert.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    DynamicFormComponent,
    BrandComponent,
    AuthLayoutComponent,
    AlertComponent
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  @ViewChild('authForm') authForm!: DynamicFormComponent;

  signInFormConfig: IFormConfig = formConfig;
  errorMessage: string = '';

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
    private router: Router
  ) { }

  login(): void {

    if (!this.authForm.form.valid) {
      return;
    }

    this.isDisabled = true;
    this.errorMessage = '';
    const authFormData: ILoginAuthForm = this.authForm.form.value as ILoginAuthForm;

    this.authApiSrvc.loginAuth(authFormData)
      .pipe(
        tap(response => {
          console.log('Login successful:', response);
          // Handle successful login, e.g., redirect or show a success message
        }),
        catchError(error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
          return [];
        }),
        finalize(() => {
          this.isDisabled = false;
        })
      ).subscribe(response => {
        console.log('Login response:', response);
      });
  }

  redirect(path: IAuthAction): void {
    if (path !== 'register' && path !== 'forgot-password') {
      return;
    }

    const urlTree = this.router.createUrlTree([path], {
      queryParams: { returnUrl: this.router.url }
    });

    this.router.navigateByUrl(urlTree);
  }
}
