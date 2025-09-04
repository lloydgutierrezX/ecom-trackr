import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = await authService.getTokenWithRefreshIfNeeded();

  if (token) {
    return true;
  }

  authService.logout();

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url }
  });
};
