import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { inject } from '@angular/core';

export const unAuthGuard: CanActivateFn = (route, state) => {

  const authSrvc = inject(AuthService);
  const router = inject(Router);

  if (!authSrvc.isLoggedIn) {
    return true;
  }

  const returnUrl = state.url ? state.url : '/dashboard';
  return router.createUrlTree([returnUrl]);
};
