import { Component, OnInit, ViewChild } from '@angular/core';
import { DynamicFormComponent } from "../../../shared/components/forms/dynamic-form.component";
import { formConfig } from './config';
import { AuthLayoutComponent } from '../auth-layout.component';
import { BrandComponent } from '../../../shared/components/brand/brand.component';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegisterAuthForm } from '../../../core/services/auth/auth-api.model';
import { AuthApiService } from '../../../core/services/auth/auth-api.service';
import { catchError, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [DynamicFormComponent, AuthLayoutComponent, BrandComponent, AlertComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  @ViewChild('authForm') authForm!: DynamicFormComponent;

  registerFormConfig = formConfig;
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
    private router: Router,
    private activedRoute: ActivatedRoute,
    private authApiSrvc: AuthApiService
  ) { }

  register() {
    if (!this.authForm.form.valid) {
      return;
    }

    this.isDisabled = true;
    this.errorMessage = '';
    this.successMessage = '';
    const authFormData: IRegisterAuthForm = this.authForm.form.value as IRegisterAuthForm;

    this.authApiSrvc.registerUser(authFormData)
      .pipe(
        tap(response => {
          console.log('Login successful:', response);
          this.successMessage = `Account created successfully! Check your email to verify.`;
        }),
        catchError(error => {
          console.error('Regisration failed:', error);
          this.errorMessage = `Registration failed. ${error.error.message}`;
          return [];
        }),
        finalize(() => {
          this.isDisabled = false;
        })
      ).subscribe(() => { });
  }

  redirect(path: 'login'): void {
    if (path !== 'login') {
      return;
    }

    let returnUrl = '/login';
    const returnUrlQP = this.activedRoute.snapshot.queryParamMap.get('returnUrl');
    if (returnUrlQP) {
      const split = returnUrlQP.split('returnUrl=');
      returnUrl = split[0].startsWith('/login') ? split[1] : returnUrl;
    }

    const urlTree = this.router.createUrlTree([path], {
      queryParams: { returnUrl }
    });

    this.router.navigateByUrl(urlTree);
  }
}
