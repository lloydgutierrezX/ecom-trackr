import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authSrvc = inject(AuthService);
  const router = inject(Router);

  const token = authSrvc.token;
  if (!token) {
    if (!router.url.startsWith('/login')) {
      return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }

    return false;
  }

  if (!authSrvc.isTokenExpired(token)) {
    return true;
  }

  try {
    const newToken = await authSrvc.getTokenWithRefreshIfNeeded();

    if (!newToken) {
      if (router.url !== '/login') {
        return router.createUrlTree(['/login'], {
          queryParams: { returnUrl: state.url }
        });
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error('Token refresh failed:', error);
    if (router.url !== '/login') {
      return router.createUrlTree(['/login'], {
        queryParams: { returnUrl: state.url }
      });
    }
    return false;
  }
};
