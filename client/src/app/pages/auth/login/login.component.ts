import { Component, OnInit, ViewChild } from '@angular/core';
import { BrandComponent } from '../../../shared/components/brand/brand.component';
import { IAuthAction, IRegisterAuthForm } from '../../../core/services/auth/auth-api.model';
import { AuthApiService } from '../../../core/services/auth/auth-api.service';
import { catchError, finalize, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthLayoutComponent } from "../auth-layout.component";
import { DynamicFormComponent } from '../../../shared/components/forms/dynamic-form.component';
import { NgTemplateOutlet } from '@angular/common';
import { IFormConfig } from '../../../shared/interfaces/form.interface';
import { formConfig, forgotPasswordActionConfig, forgotPasswordFormConfig } from './config';
import { AlertComponent } from "../../../shared/components/alert/alert.component";
import { ModalService } from '../../../shared/services/modal/modal.service';

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
export class LoginComponent implements OnInit {

  @ViewChild('authForm') authForm!: DynamicFormComponent;

  forgotPasswordActionConfig = forgotPasswordActionConfig;
  forgotPasswordFormConfig = forgotPasswordFormConfig;

  signInFormConfig: IFormConfig = formConfig;

  successMessage = '';
  errorMessage = '';

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
    private modalSrvc: ModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  private redirectToReturnUrl() {
    const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    this.router.navigateByUrl(returnUrl);
  }

  ngOnInit() {

    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      this.redirectToReturnUrl();
    }

    this.authApiSrvc.forgotPasswordResult$.subscribe(result => {
      if (!result) {
        return;
      }

      if (result?.success) {
        this.successMessage = result?.message ?? 'Reset link sent.';
      } else {
        this.errorMessage = result?.message ?? 'Failed to send reset link';
      }
    });
  }

  login(): void {

    if (!this.authForm.form.valid) {
      return;
    }

    this.isDisabled = true;
    this.errorMessage = '';
    const authFormData: IRegisterAuthForm = this.authForm.form.value as IRegisterAuthForm;

    this.authApiSrvc.loginAuth(authFormData)
      .pipe(
        tap(response => {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.redirectToReturnUrl();

        }),
        catchError(error => {
          console.error('Login failed:', error);
          this.errorMessage = 'Login failed. Please check your credentials and try again.';
          return [];
        }),
        finalize(() => {
          this.isDisabled = false;
        })
      ).subscribe();
  }

  redirect(path: IAuthAction): void {

    if (this._isLoading) {
      return;
    }

    if (path !== 'register' && path !== 'forgot-password') {
      return;
    }

    const urlTree = this.router.createUrlTree([path], {
      queryParams: { returnUrl: this.router.url }
    });

    this.router.navigateByUrl(urlTree);
  }

  forgotPassword() {
    if (this._isLoading) {
      return;
    }

    this.modalSrvc.open('form-modal', {
      handler: this.forgotPasswordActionConfig.forgot_password?.handler,
      formConfig: this.forgotPasswordFormConfig,
      type: 'forgot_password'
    });
  }
}
