import { Component } from '@angular/core';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { BrandComponent } from '../../../shared/components/brand/brand.component';
import { IAuthAction, ILoginAuthForm } from '../../../core/services/auth/auth-api.model';
import { AuthApiService } from '../../../core/services/auth/auth-api.service';
import { catchError, finalize, tap } from 'rxjs';
import { ToastService } from '../../../shared/services/toast/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SigninFormComponent, BrandComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  isLoading = false;

  constructor(
    private authApiSrvc: AuthApiService,
    private toastSrvc: ToastService,
    private router: Router
  ) { }

  submitForm(authForm: ILoginAuthForm): void {
    this.isLoading = true;
    this.authApiSrvc.loginAuth(authForm)
      .pipe(
        tap(response => {
          console.log('Login successful:', response);
          // Handle successful login, e.g., redirect or show a success message
        }),
        catchError(error => {
          console.error('Login failed:', error);
          this.toastSrvc.error('Login failed. Please check your credentials and try again.')
          return [];
        }),
        finalize(() => {
          this.isLoading = false;
        })
      ).subscribe(response => {
        console.log('Login response:', response);
      }
      );
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
