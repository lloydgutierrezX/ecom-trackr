import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthApiService } from '../../services/auth/auth-api.service';
import { jwtDecode } from 'jwt-decode';
import { catchError, switchMap, throwError } from 'rxjs';

// interface IJwtPayload {
//   exp: number
// }

// const isTokenExpired = (token: string): boolean => {
//   try {
//     const decoded: IJwtPayload = jwtDecode(token);
//     return Date.now() >= decoded.exp * 1000;
//   } catch {
//     return true;
//   }
// }

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authApiSrvc = inject(AuthApiService);
  let accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.code === 'TOKEN_EXPIRED') {
        return authApiSrvc.refreshAccessToken().pipe(
          switchMap(response => {
            accessToken = response.accessToken;
            localStorage.setItem('accessToken', accessToken);
            const clonedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${accessToken}` }
            });
            return next(clonedReq);
          }),
          catchError(refreshError => throwError(() => refreshError))
        )
      }

      return throwError(() => error);
    })
  );
};
