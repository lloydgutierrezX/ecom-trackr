import { Injectable } from '@angular/core';
import { HttpClientService } from '../../../shared/services/http-service/http-client.service';
import { IAuthResponse, ILoginAuthForm } from './auth-api.model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private httpSrvc: HttpClientService) { }

  loginAuth(authForm: ILoginAuthForm) {
    return this.httpSrvc.post<IAuthResponse>('api/auth/login', authForm);
  }
}
