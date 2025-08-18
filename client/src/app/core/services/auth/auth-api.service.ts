import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-service/http-client.service';
import { IAuthRegisterResponse, IAuthResponse, ILoginAuthForm, IRegisterAuthForm, IVerifyEmail, IVerifyEmailResponse } from './auth-api.model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private httpSrvc: HttpClientService) { }

  loginAuth(payload: ILoginAuthForm) {
    const endpoint = 'api/auth/login';
    return this.httpSrvc.post<IAuthResponse>(endpoint, payload);
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
}
