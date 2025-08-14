import { Component } from '@angular/core';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { BrandComponent } from '../../../shared/components/brand/brand.component';
import { ILoginAuthForm } from '../../../core/services/auth/auth-api.model';
import { AuthApiService } from '../../../core/services/auth/auth-api.service';
import { catchError, tap } from 'rxjs';
import { ToastService } from '../../../shared/services/toast/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SigninFormComponent, BrandComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
    private authApiSrvc: AuthApiService,
    private toastSrvc: ToastService
  ) { }

  submitForm(authForm: ILoginAuthForm): void {
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
        })
      ).subscribe(response => {
        console.log('Login response:', response);
      }
      );
  }
}
