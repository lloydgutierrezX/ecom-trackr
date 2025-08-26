import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { dedupeReturnUrl } from '../../shared/utils/url.util';

export const tokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = route.queryParamMap.get('token');
  if (token) {
    return true;
  }

  const activatedRoute = { snapshot: route } as ActivatedRoute;
  return dedupeReturnUrl(activatedRoute, router, '/login');
};
