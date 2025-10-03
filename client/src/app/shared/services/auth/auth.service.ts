import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  get token(): string | null {
    return localStorage.getItem('accessToken');
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem('accessToken', value);
    } else {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
    }
  }

  get isLoggedIn(): boolean {
    return !!this.token;
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  clearToken(): void {
    this.token = null;
  }

  async getTokenWithRefreshIfNeeded(): Promise<string | null> {
    const token = this.token;

    if (!token || !this.isTokenExpired(token)) {
      try {

        const res = await firstValueFrom(
          this.httpClient.post<{ accessToken: string }>(
            'api/auth/refresh-token',
            {},
            { withCredentials: true })
        );

        this.token = res.accessToken;
        return res.accessToken;
      } catch (error) {
        this.clearToken();
        return null;
      }
    }
    return token;
  }
}
