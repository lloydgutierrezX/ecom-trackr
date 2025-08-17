import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-service/http-client.service';
import { IAuthRegisterResponse, IAuthResponse, ILoginAuthForm, IRegisterAuthForm } from './auth-api.model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private httpSrvc: HttpClientService) { }

  loginAuth(payload: ILoginAuthForm) {
    const loginEndpoint = 'api/auth/login';
    return this.httpSrvc.post<IAuthResponse>(loginEndpoint, payload);
  }

  registerUser(payload: IRegisterAuthForm) {
    const registerEndpoint = 'api/auth/register';
    return this.httpSrvc.post<IAuthRegisterResponse>(registerEndpoint, payload);
  }
}
