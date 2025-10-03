import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-service/http-client.service';
import { IAuthRegisterResponse, IAuthResponse, ILoginAuthForm, IRegisterAuthForm, IVerifyEmail, IVerifyEmailResponse, IForgotPasswordResponse } from './auth-api.model';
import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';
import { ToastService } from '../../../shared/services/toast/toast.service';

@Injectable({ providedIn: 'root' })
export class AuthApiService {

  private forgotPasswordResultSubject = new BehaviorSubject<IForgotPasswordResponse | null>(null);
  forgotPasswordResult$ = this.forgotPasswordResultSubject.asObservable();

  constructor(
    private httpSrvc: HttpClientService,
    private toastSrvc: ToastService
  ) { }

  loginAuth(payload: ILoginAuthForm) {
    const endpoint = 'api/auth/login';
    return this.httpSrvc.post<IAuthResponse>(endpoint, payload, { withCredentials: true });
  }

  registerUser(payload: IRegisterAuthForm) {
    const endpoint = 'api/auth/register';
    return this.httpSrvc.post<IAuthRegisterResponse>(endpoint, payload);
  }

  verifyEmail(payload: IVerifyEmail) {
    const { token } = payload;
    return this.httpSrvc.get<IVerifyEmailResponse>("api/auth/verify-email", {
      params: { token }
    });
  }

  forgotPassword(email: string) {
    return this.httpSrvc.post("api/auth/forgot-password", { email })
      .pipe(
        tap(() => this.forgotPasswordResultSubject.next({ success: true, message: 'Reset link sent.' })),
        catchError(error => {
          this.forgotPasswordResultSubject.next({ success: false, message: 'Failed to send reset link' });
          return throwError(() => error);
        })
      );
  }

  resetPassword(formData: { token: string, password: string }) {
    return this.httpSrvc.post("api/auth/reset-password", { ...formData });
  }

  refreshAccessToken() {
    return this.httpSrvc.post<{ accessToken: string }>('api/auth/refresh', {}, { withCredentials: true });
  }

  logoutUser() {
    return this.httpSrvc.post<{ message: string }>('api/auth/logout', {}, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Logout error:', error);
        this.toastSrvc.error('Logout failed. Please try again.');
        return throwError(() => error);
      })
    );
  }
}
