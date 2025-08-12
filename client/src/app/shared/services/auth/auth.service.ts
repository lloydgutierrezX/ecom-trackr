import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {

  get token(): string | null {
    return localStorage.getItem('access_token');
  }

  set token(value: string | null) {
    if (value) {
      localStorage.setItem('access_token', value);
    } else {
      localStorage.removeItem('access_token');
    }
  }

  get isLoggedIn(): boolean {
    const token = this.token;
    return !!token && !this.isTokenExpired(token);
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      return true;
    }
  }

  logout(): void {
    this.token = null;
  }

  async getTokenWithRefreshIfNeeded(): Promise<string | null> {
    const token = this.token;
    if (!token || this.isTokenExpired(token)) {
      // Here you would typically call your API to refresh the token
      // For example:
      // const newToken = await this.apiService.refreshToken();
      // this.token = newToken;
      return null; // Placeholder for actual token refresh logic
    }
    return token;
  }
}
